"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopySummaryButton } from "@/components/tools/copy-summary-button";
import {
  EstimateNote,
  NumberField,
  ResultPanel,
  SegmentedControl,
  Stat,
} from "@/components/tools/tool-kit";
import {
  EDU_LINE,
  formatNumber,
  formatPercent,
  formatUsd,
  NO_VALUE,
  parseAmount,
} from "@/lib/tools/format";

/* ------------------------------------------------------------------ */
/*  Pure calculation                                                  */
/* ------------------------------------------------------------------ */

/** Largest horizon the tool will model, so a typo can't build a giant table. */
const MAX_YEARS = 40;

interface CompoundInputs {
  /** Starting amount already set aside today. */
  principal: number;
  /** Amount added at the end of every month. */
  monthly: number;
  /**
   * The annual growth rate the user assumes, as a percent (e.g. 5 for 5%).
   * This is an illustrative assumption, never a predicted or guaranteed return.
   */
  ratePercent: number;
  /** Whole years to project, clamped to a sane range. */
  years: number;
}

interface CompoundResult {
  /** Projected balance at the end of the horizon. */
  balance: number;
  /** Total of the starting amount plus every monthly contribution. */
  contributed: number;
  /** Balance minus what was put in: the part that came from growth. */
  growth: number;
}

/**
 * The effective monthly rate that compounds to exactly the assumed annual rate
 * over twelve months: (1 + a)^(1/12) - 1. Using this (rather than a/12) means a
 * one-year, contribution-free projection equals principal x (1 + a), so the
 * headline figure matches the simple "annual compounding" mental model.
 */
function monthlyRate(ratePercent: number): number {
  const annual = ratePercent / 100;
  return Math.pow(1 + annual, 1 / 12) - 1;
}

/**
 * Future value of a starting amount plus a fixed end-of-month contribution,
 * after `months` months at monthly rate `g`:
 *
 *   principal x (1 + g)^months  +  monthly x ((1 + g)^months - 1) / g
 *
 * The second term is the future value of an ordinary annuity; as g approaches
 * zero it collapses to monthly x months (no growth, just the deposits).
 */
function futureValue(
  principal: number,
  monthly: number,
  g: number,
  months: number,
): number {
  if (months <= 0) return principal;
  const grown = principal * Math.pow(1 + g, months);
  const fromContrib =
    g === 0 ? monthly * months : monthly * ((Math.pow(1 + g, months) - 1) / g);
  return grown + fromContrib;
}

/**
 * Project a balance forward. Pure math: a starting amount and a level monthly
 * contribution growing at one assumed, user-set rate, compounded monthly. No
 * assumption about whether that rate is realistic. That is the user's to set.
 */
export function computeCompound({
  principal,
  monthly,
  ratePercent,
  years,
}: CompoundInputs): CompoundResult {
  const months = Math.max(0, years) * 12;
  const g = monthlyRate(ratePercent);
  const balance = futureValue(principal, monthly, g, months);
  const contributed = principal + monthly * months;
  const growth = balance - contributed;
  return { balance, contributed, growth };
}

export interface ScheduleRow {
  /** Year number, 1-based. */
  year: number;
  /** Total put in by the end of this year (principal plus deposits to date). */
  contributed: number;
  /** Projected balance at the end of this year. */
  balance: number;
  /** Balance minus contributed: the growth portion, never below zero here. */
  growth: number;
}

/**
 * One row per year up to the horizon, sampled so the table never grows past
 * `maxRows`. The final year is always included, so the last row matches the
 * headline balance. Used for the year-by-year table.
 */
export function buildSchedule(
  inputs: CompoundInputs,
  maxRows = 12,
): ScheduleRow[] {
  const years = Math.max(0, Math.floor(inputs.years));
  if (years <= 0) return [];

  const g = monthlyRate(inputs.ratePercent);
  const step = Math.max(1, Math.ceil(years / maxRows));

  const yearSet = new Set<number>();
  for (let y = step; y <= years; y += step) yearSet.add(y);
  yearSet.add(years);

  return Array.from(yearSet)
    .sort((a, b) => a - b)
    .map((year) => {
      const balance = futureValue(
        inputs.principal,
        inputs.monthly,
        g,
        year * 12,
      );
      const contributed = inputs.principal + inputs.monthly * year * 12;
      return {
        year,
        contributed,
        balance,
        growth: Math.max(0, balance - contributed),
      };
    });
}

/**
 * The "cost of waiting": the same plan started `delayYears` later finishes at
 * the same date with fewer years to grow. We return both ending balances and
 * the gap between them. Never frames either number as expected; both rest on
 * the user's assumed rate.
 */
export function computeWaitingCost(
  inputs: CompoundInputs,
  delayYears: number,
): { now: number; later: number; cost: number } {
  const now = computeCompound(inputs).balance;
  const laterYears = Math.max(0, inputs.years - delayYears);
  const later = computeCompound({ ...inputs, years: laterYears }).balance;
  return { now, later, cost: Math.max(0, now - later) };
}

/**
 * Plain-text summary for the "Copy summary" button. No em dashes; always ends
 * with the educational line and the site URL. Mirrors the other tools.
 */
export function buildCompoundSummary(
  inputs: CompoundInputs,
  result: CompoundResult,
  delayYears: number,
  waiting: { cost: number },
): string {
  const lines = [
    "Strata compound growth projection",
    "",
    `Starting amount: ${formatUsd(inputs.principal)}`,
    `Monthly contribution: ${formatUsd(inputs.monthly)}`,
    `Assumed annual growth rate: ${formatPercent(inputs.ratePercent, rateDigits(inputs.ratePercent))} (an illustration, not a predicted or guaranteed return)`,
    `Length: ${inputs.years} ${inputs.years === 1 ? "year" : "years"}`,
    "",
    `Projected balance: ${formatUsd(result.balance)}`,
    `Total you put in: ${formatUsd(result.contributed)}`,
    `Growth on top: ${formatUsd(result.growth)}`,
  ];

  if (delayYears > 0 && delayYears < inputs.years) {
    lines.push(
      "",
      `Starting ${delayYears} ${delayYears === 1 ? "year" : "years"} later instead of now would leave about ${formatUsd(waiting.cost)} less at the same end date, on the same assumptions.`,
    );
  }

  lines.push(
    "",
    "These figures are an illustrative projection on a rate you chose, not a prediction. Real returns vary and can be negative.",
    EDU_LINE,
  );
  return lines.join("\n");
}

/** Show whole-percent rates with no decimal, fractional ones with one. */
function rateDigits(ratePercent: number): number {
  return Number.isInteger(ratePercent) ? 0 : 1;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const DEFAULTS = {
  principal: "5000",
  monthly: "250",
  rate: "5",
  years: "20",
};

const DELAY_OPTIONS = [
  { value: "1", label: "1 yr" },
  { value: "3", label: "3 yr" },
  { value: "5", label: "5 yr" },
  { value: "10", label: "10 yr" },
];

export function CompoundVisualizer() {
  const [principal, setPrincipal] = useState(DEFAULTS.principal);
  const [monthly, setMonthly] = useState(DEFAULTS.monthly);
  const [rate, setRate] = useState(DEFAULTS.rate);
  const [years, setYears] = useState(DEFAULTS.years);
  const [delay, setDelay] = useState("5");

  const inputs = useMemo<CompoundInputs>(() => {
    const rawYears = parseAmount(years) ?? 0;
    return {
      principal: parseAmount(principal) ?? 0,
      monthly: parseAmount(monthly) ?? 0,
      ratePercent: parseAmount(rate) ?? 0,
      years: Math.min(MAX_YEARS, Math.floor(rawYears)),
    };
  }, [principal, monthly, rate, years]);

  const result = useMemo(() => computeCompound(inputs), [inputs]);
  const schedule = useMemo(() => buildSchedule(inputs), [inputs]);

  const delayYears = parseAmount(delay) ?? 0;
  const waiting = useMemo(
    () => computeWaitingCost(inputs, delayYears),
    [inputs, delayYears],
  );

  const hasHorizon = inputs.years > 0;
  const waitingApplies = delayYears > 0 && delayYears < inputs.years;
  const growthShare = result.balance > 0 ? result.growth / result.balance : 0;

  const insight = !hasHorizon ? (
    <>Enter a number of years to see how the balance could grow.</>
  ) : (
    <>
      Putting in{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(result.contributed)}
      </strong>{" "}
      over {formatNumber(inputs.years)} {inputs.years === 1 ? "year" : "years"}{" "}
      could grow to about{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(result.balance)}
      </strong>{" "}
      if it earned a steady{" "}
      {formatPercent(inputs.ratePercent, rateDigits(inputs.ratePercent))} every
      year. That puts roughly{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(result.growth)}
      </strong>{" "}
      of the total down to growth rather than deposits.{" "}
      {waitingApplies ? (
        <>
          Waiting {formatNumber(delayYears)}{" "}
          {delayYears === 1 ? "year" : "years"} to start, then running to the
          same end date, would leave about{" "}
          <strong className="font-semibold text-st-ink">
            {formatUsd(waiting.cost)}
          </strong>{" "}
          less. The early years do a lot of the work, because they have the
          longest to compound.
        </>
      ) : (
        <>
          The earlier years matter most, because they have the longest left to
          compound.
        </>
      )}
    </>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      <form
        className="flex flex-col gap-7"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Compound growth inputs"
      >
        <NumberField
          label="Starting amount"
          hint="What you already have set aside today. Leave at zero to start from nothing."
          value={principal}
          onChange={setPrincipal}
          prefix="$"
          step={100}
        />
        <NumberField
          label="Monthly contribution"
          hint="What you add at the end of each month, kept level for the whole projection."
          value={monthly}
          onChange={setMonthly}
          prefix="$"
          step={50}
        />
        <NumberField
          label="Assumed annual growth rate"
          hint="An assumption you choose, for illustration only. Not a predicted or guaranteed return, and real returns vary and can be negative."
          value={rate}
          onChange={setRate}
          suffix="% a year"
          step={0.5}
        />
        <NumberField
          label="Number of years"
          hint={`How long the money stays invested. Up to ${MAX_YEARS} years.`}
          value={years}
          onChange={setYears}
          suffix="years"
          step={1}
        />
        <SegmentedControl
          legend="Cost of waiting: start this many years later"
          name="compound-delay"
          value={delay}
          onChange={setDelay}
          options={DELAY_OPTIONS}
        />
      </form>

      <div className="flex flex-col gap-6">
        <ResultPanel eyebrow="Your projection">
          <Stat
            label="Projected balance"
            value={hasHorizon ? formatUsd(result.balance) : NO_VALUE}
            emphasis
          />
          <Stat
            label="Total you put in"
            value={hasHorizon ? formatUsd(result.contributed) : NO_VALUE}
          />
          <Stat
            label="Growth on top (estimate)"
            value={hasHorizon ? formatUsd(result.growth) : NO_VALUE}
          />
          <Stat
            label={`Cost of waiting ${formatNumber(delayYears)} ${delayYears === 1 ? "yr" : "yrs"}`}
            value={waitingApplies ? formatUsd(waiting.cost) : NO_VALUE}
          />
        </ResultPanel>

        <p className="font-st-sans text-st-body-lg leading-relaxed text-st-ink">
          {insight}
        </p>

        {hasHorizon ? (
          <ProjectionTable rows={schedule} growthShare={growthShare} />
        ) : null}

        <p className="font-st-sans text-st-small text-st-muted">
          This is an illustrative projection on a rate you set, not a prediction
          and not advice. It assumes the same return every year with no fees or
          taxes. Real returns move around year to year and can be negative.
        </p>

        <EstimateNote />

        <CopySummaryButton
          getSummary={() =>
            buildCompoundSummary(inputs, result, delayYears, waiting)
          }
        />

        <div className="pt-1">
          <Button href="/contact" variant="secondary">
            Talk through a plan that fits you
          </Button>
          <p className="mt-3 font-st-sans text-st-small text-st-muted">
            Free, and it usually takes one conversation.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Year-by-year table                                                */
/* ------------------------------------------------------------------ */

/**
 * The simple year-by-year picture: what you put in, the growth on top, and the
 * running balance, with a static proportion bar showing how much of each year's
 * balance is growth. Pure layout, no animation, so it is reduced-motion safe by
 * construction. A real <table> with a caption keeps it readable to assistive
 * tech.
 */
function ProjectionTable({
  rows,
  growthShare,
}: {
  rows: ScheduleRow[];
  growthShare: number;
}) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-st-md border border-st-line bg-st-surface">
      <table className="w-full border-collapse text-left font-st-sans text-st-small">
        <caption className="px-5 pt-5 text-left font-st-sans text-st-eyebrow font-medium uppercase tracking-[0.14em] text-st-muted">
          Projected balance by year (estimate)
        </caption>
        <thead>
          <tr className="border-b border-st-line text-st-eyebrow uppercase tracking-[0.1em] text-st-muted">
            <th scope="col" className="px-5 py-3 font-medium">
              Year
            </th>
            <th scope="col" className="px-5 py-3 text-right font-medium">
              You put in
            </th>
            <th scope="col" className="px-5 py-3 text-right font-medium">
              Growth
            </th>
            <th scope="col" className="px-5 py-3 text-right font-medium">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const share = row.balance > 0 ? row.growth / row.balance : 0;
            return (
              <tr
                key={row.year}
                className="border-b border-st-line/60 last:border-b-0"
              >
                <td className="px-5 py-3 align-middle tabular-nums text-st-ink">
                  {formatNumber(row.year)}
                </td>
                <td className="px-5 py-3 text-right align-middle tabular-nums text-st-muted">
                  {formatUsd(row.contributed)}
                </td>
                <td className="px-5 py-3 text-right align-middle tabular-nums text-st-muted">
                  {formatUsd(row.growth)}
                </td>
                <td className="px-5 py-3 align-middle">
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="tabular-nums font-medium text-st-ink">
                      {formatUsd(row.balance)}
                    </span>
                    <span
                      aria-hidden
                      className="flex h-1 w-full max-w-28 overflow-hidden rounded-full bg-st-accent/15"
                    >
                      <span
                        className="block h-full rounded-full bg-st-accent"
                        style={{ width: `${Math.round(share * 100)}%` }}
                      />
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="px-5 pb-4 pt-3 font-st-sans text-st-eyebrow text-st-muted">
        The gold bar shows the share of each year&rsquo;s balance that is growth
        rather than money you put in
        {growthShare > 0
          ? `, ${formatPercent(growthShare * 100, 0)} by the final year`
          : ""}
        .
      </p>
    </div>
  );
}
