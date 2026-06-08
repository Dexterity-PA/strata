"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopySummaryButton } from "@/components/tools/copy-summary-button";
import {
  EstimateNote,
  NumberField,
  ResultPanel,
  Stat,
  useMounted,
} from "@/components/tools/tool-kit";
import {
  addMonths,
  EDU_LINE,
  formatMonthYear,
  formatUsd,
  NO_VALUE,
  parseAmount,
} from "@/lib/tools/format";

/* ------------------------------------------------------------------ */
/*  Pure calculation                                                  */
/* ------------------------------------------------------------------ */

interface RunwayInputs {
  /** Cash you have available right now. */
  cash: number;
  /** Average monthly net burn: money out minus money in, as a positive figure. */
  burn: number;
}

interface RunwayResult {
  /** Months of runway, or 0 when there is no burn to divide by. */
  months: number;
  /** True when money out exceeds money in, so there is a runway to measure. */
  isBurning: boolean;
}

/**
 * Cash runway: how many months the cash lasts at the current net burn. When
 * burn is zero or negative the business is at least breaking even, so there is
 * no runway to count down (we say so plainly instead of dividing by zero).
 */
export function computeRunway({ cash, burn }: RunwayInputs): RunwayResult {
  if (burn <= 0) return { months: 0, isBurning: false };
  return { months: cash / burn, isBurning: true };
}

/** Months to one decimal, e.g. "8.5 mo". */
function formatRunwayMonths(months: number): string {
  return `${months.toFixed(1)} mo`;
}

/**
 * Plain-text summary for the "Copy summary" button. The rough zero-date is
 * passed in (it depends on today's date, which is read on the client). No em
 * dashes; always ends with the educational line and the site URL.
 */
export function buildRunwaySummary(
  { cash, burn }: RunwayInputs,
  result: RunwayResult,
  zeroDate: string | null,
): string {
  const lines = [
    "Strata cash runway estimate",
    "",
    `Cash on hand: ${formatUsd(cash)}`,
    `Average monthly burn: ${formatUsd(burn)}`,
  ];

  if (result.isBurning) {
    const around = zeroDate ? `, around ${zeroDate}` : "";
    lines.push(
      `Runway: about ${formatRunwayMonths(result.months)}${around} before the cash runs out.`,
    );
  } else {
    lines.push(
      "There is no burn to run down: money in covers money out, so the cash is not shrinking.",
    );
  }

  lines.push("", EDU_LINE);
  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const DEFAULTS = {
  cash: "30000",
  burn: "4000",
};

export function CashRunway() {
  const [cash, setCash] = useState(DEFAULTS.cash);
  const [burn, setBurn] = useState(DEFAULTS.burn);

  // Today's date is read only on the client, after mount, so the server and
  // first client render agree (no hydration mismatch on the zero-date).
  const mounted = useMounted();
  const now = mounted ? new Date() : null;

  const parsed = useMemo<RunwayInputs>(
    () => ({
      cash: parseAmount(cash) ?? 0,
      burn: parseAmount(burn) ?? 0,
    }),
    [cash, burn],
  );

  const result = useMemo(() => computeRunway(parsed), [parsed]);

  const zeroDate =
    now && result.isBurning
      ? formatMonthYear(addMonths(now, result.months))
      : null;

  const insight = result.isBurning ? (
    <>
      At{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(parsed.burn)}
      </strong>{" "}
      a month of net burn, your{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(parsed.cash)}
      </strong>{" "}
      lasts about{" "}
      <strong className="font-semibold text-st-ink">
        {formatRunwayMonths(result.months)}
      </strong>
      {zeroDate ? (
        <>
          , putting the rough zero point around{" "}
          <strong className="font-semibold text-st-ink">{zeroDate}</strong>
        </>
      ) : null}
      . That is the window you have to grow income or trim costs.
    </>
  ) : (
    <>
      Your money in covers your money out, so the cash is not drawing down.
      There is no runway to run out, which is its own kind of good news. Enter a
      net burn above if a slow stretch is putting you in the red.
    </>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      <form
        className="flex flex-col gap-7"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Cash runway inputs"
      >
        <NumberField
          label="Cash on hand"
          hint="What you can actually draw on today: checking, savings, anything liquid."
          value={cash}
          onChange={setCash}
          prefix="$"
          step={1000}
        />
        <NumberField
          label="Average monthly burn"
          hint="Money out minus money in, in a typical month. Enter it as a positive number."
          value={burn}
          onChange={setBurn}
          prefix="$"
          step={100}
        />
      </form>

      <div className="flex flex-col gap-6">
        <ResultPanel eyebrow="Your runway">
          <Stat
            label="Months of runway"
            value={
              result.isBurning ? formatRunwayMonths(result.months) : NO_VALUE
            }
            emphasis
          />
          <Stat label="Rough zero point" value={zeroDate ?? NO_VALUE} />
        </ResultPanel>

        <p className="font-st-sans text-st-body-lg leading-relaxed text-st-ink">
          {insight}
        </p>

        <EstimateNote />

        <CopySummaryButton
          getSummary={() => buildRunwaySummary(parsed, result, zeroDate)}
        />

        <div className="pt-1">
          <Button href="/contact" variant="secondary">
            Make the runway longer
          </Button>
          <p className="mt-3 font-st-sans text-st-small text-st-muted">
            Free, and it usually takes one conversation.
          </p>
        </div>
      </div>
    </div>
  );
}
