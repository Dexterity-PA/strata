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
  useMounted,
} from "@/components/tools/tool-kit";
import {
  addMonths,
  EDU_LINE,
  formatMonths,
  formatMonthYear,
  formatUsd,
  NO_VALUE,
  parseAmount,
  pluralMonths,
} from "@/lib/tools/format";

/* ------------------------------------------------------------------ */
/*  Pure calculation                                                  */
/* ------------------------------------------------------------------ */

interface EmergencyInputs {
  /** Essential monthly expenses: the bills you cannot skip. */
  essential: number;
  /** Desired months of cushion. */
  months: number;
  /** What you already have saved toward it. */
  current: number;
  /** Optional monthly contribution toward the gap. */
  contribution: number;
}

interface EmergencyResult {
  /** Full target: essentials times months of cushion. */
  target: number;
  /** What is still left to save (never negative). */
  gap: number;
  /** Whole months to close the gap at the given contribution, or 0 if N/A. */
  monthsToTarget: number;
  /** True once the gap is fully funded. */
  funded: boolean;
}

/**
 * Emergency-fund target: essentials times the chosen months of cushion, minus
 * what is already saved. The gap is floored at zero (a surplus is not a
 * negative goal). Time-to-target only applies when there is both a gap and a
 * monthly contribution to chip away at it.
 */
export function computeEmergencyFund({
  essential,
  months,
  current,
  contribution,
}: EmergencyInputs): EmergencyResult {
  const target = essential * months;
  const gap = Math.max(0, target - current);
  const funded = gap <= 0 && target > 0;
  const monthsToTarget =
    gap > 0 && contribution > 0 ? Math.ceil(gap / contribution) : 0;
  return { target, gap, monthsToTarget, funded };
}

/**
 * Plain-text summary for the "Copy summary" button. The rough finish date is
 * passed in (it depends on today's date, read on the client). No em dashes;
 * always ends with the educational line and the site URL.
 */
export function buildEmergencySummary(
  inputs: EmergencyInputs,
  result: EmergencyResult,
  reachDate: string | null,
): string {
  const lines = [
    "Strata emergency fund estimate",
    "",
    `Essential monthly expenses: ${formatUsd(inputs.essential)}`,
    `Cushion: ${pluralMonths(inputs.months)}`,
    `Target: ${formatUsd(result.target)}`,
    `Already saved: ${formatUsd(inputs.current)}`,
  ];

  if (result.funded) {
    lines.push(
      "You are fully funded for this cushion. Nothing left to set aside.",
    );
  } else {
    lines.push(`Still to save: ${formatUsd(result.gap)}`);
    if (result.monthsToTarget > 0) {
      const around = reachDate ? `, around ${reachDate}` : "";
      lines.push(
        `At ${formatUsd(inputs.contribution)} a month, you reach it in about ${formatMonths(result.monthsToTarget)}${around}.`,
      );
    }
  }

  lines.push("", EDU_LINE);
  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const DEFAULTS = {
  essential: "3200",
  months: "3",
  current: "1500",
  contribution: "400",
};

const MONTH_OPTIONS = [
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
];

export function EmergencyFund() {
  const [essential, setEssential] = useState(DEFAULTS.essential);
  const [months, setMonths] = useState(DEFAULTS.months);
  const [current, setCurrent] = useState(DEFAULTS.current);
  const [contribution, setContribution] = useState(DEFAULTS.contribution);

  const mounted = useMounted();
  const now = mounted ? new Date() : null;

  const inputs = useMemo<EmergencyInputs>(
    () => ({
      essential: parseAmount(essential) ?? 0,
      months: parseAmount(months) ?? 0,
      current: parseAmount(current) ?? 0,
      contribution: parseAmount(contribution) ?? 0,
    }),
    [essential, months, current, contribution],
  );

  const result = useMemo(() => computeEmergencyFund(inputs), [inputs]);

  const reachDate =
    now && result.monthsToTarget > 0
      ? formatMonthYear(addMonths(now, result.monthsToTarget))
      : null;

  const insight = result.funded ? (
    <>
      Your{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(inputs.current)}
      </strong>{" "}
      already covers a {pluralMonths(inputs.months)} cushion on{" "}
      {formatUsd(inputs.essential)} of essentials. You are funded. The next
      dollar can go toward a different goal.
    </>
  ) : (
    <>
      A {pluralMonths(inputs.months)} cushion on{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(inputs.essential)}
      </strong>{" "}
      of essentials is{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(result.target)}
      </strong>
      . You have {formatUsd(inputs.current)}, so you are{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(result.gap)}
      </strong>{" "}
      short.{" "}
      {result.monthsToTarget > 0 ? (
        <>
          At {formatUsd(inputs.contribution)} a month, you close it in about{" "}
          <strong className="font-semibold text-st-ink">
            {formatMonths(result.monthsToTarget)}
          </strong>
          {reachDate ? (
            <>
              , around{" "}
              <strong className="font-semibold text-st-ink">{reachDate}</strong>
            </>
          ) : null}
          .
        </>
      ) : (
        <>Add a monthly contribution to see how long reaching it takes.</>
      )}
    </>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      <form
        className="flex flex-col gap-7"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Emergency fund inputs"
      >
        <NumberField
          label="Essential monthly expenses"
          hint="Housing, food, utilities, minimum payments. The costs you cannot pause."
          value={essential}
          onChange={setEssential}
          prefix="$"
          step={100}
        />
        <SegmentedControl
          legend="Months of cushion"
          name="emergency-months"
          value={months}
          onChange={setMonths}
          options={MONTH_OPTIONS}
        />
        <NumberField
          label="Already saved (optional)"
          hint="What you have set aside toward this fund so far."
          value={current}
          onChange={setCurrent}
          prefix="$"
          step={100}
        />
        <NumberField
          label="Monthly contribution (optional)"
          hint="What you can add each month. Fill this in to see a time to target."
          value={contribution}
          onChange={setContribution}
          prefix="$"
          step={50}
        />
      </form>

      <div className="flex flex-col gap-6">
        <ResultPanel eyebrow="Your target">
          <Stat label="Fund target" value={formatUsd(result.target)} emphasis />
          <Stat
            label="Still to save"
            value={result.funded ? formatUsd(0) : formatUsd(result.gap)}
          />
          <Stat
            label="Time to target"
            value={
              result.monthsToTarget > 0
                ? formatMonths(result.monthsToTarget)
                : NO_VALUE
            }
            span
          />
        </ResultPanel>

        <p className="font-st-sans text-st-body-lg leading-relaxed text-st-ink">
          {insight}
        </p>

        <EstimateNote />

        <CopySummaryButton
          getSummary={() => buildEmergencySummary(inputs, result, reachDate)}
        />

        <div className="pt-1">
          <Button href="/contact" variant="secondary">
            Build the plan to get there
          </Button>
          <p className="mt-3 font-st-sans text-st-small text-st-muted">
            Free, and it usually takes one conversation.
          </p>
        </div>
      </div>
    </div>
  );
}
