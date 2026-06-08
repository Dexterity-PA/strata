"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopySummaryButton } from "@/components/tools/copy-summary-button";
import {
  EstimateNote,
  NumberField,
  ResultPanel,
  Stat,
} from "@/components/tools/tool-kit";
import {
  EDU_LINE,
  formatNumber,
  formatUsd,
  NO_VALUE,
  parseAmount,
} from "@/lib/tools/format";

/* ------------------------------------------------------------------ */
/*  Pure calculation                                                  */
/* ------------------------------------------------------------------ */

interface BreakevenInputs {
  /** Fixed costs you pay every month no matter how much you sell. */
  fixedMonthly: number;
  /** Price per unit (or your average sale). */
  price: number;
  /** Variable cost to make or deliver one unit. */
  variableCost: number;
}

interface BreakevenResult {
  /** Price minus variable cost: what each sale contributes to fixed costs. */
  margin: number;
  /** Whole units you must sell to cover fixed costs (rounded up). */
  units: number;
  /** Sales those units represent. */
  revenue: number;
  /** True once each sale contributes something toward fixed costs. */
  hasBreakeven: boolean;
}

/**
 * Breakeven math. Until the price clears the variable cost, each sale loses
 * money and there is no breakeven, so the unit / revenue figures are left
 * unset (the UI shows a plain note instead of a misleading number). Units are
 * rounded up, since a partial unit does not finish covering the costs.
 */
export function computeBreakeven({
  fixedMonthly,
  price,
  variableCost,
}: BreakevenInputs): BreakevenResult {
  const margin = price - variableCost;
  if (margin <= 0) {
    return { margin, units: 0, revenue: 0, hasBreakeven: false };
  }
  const exactUnits = fixedMonthly / margin;
  const units = Math.ceil(exactUnits);
  const revenue = exactUnits * price;
  return { margin, units, revenue, hasBreakeven: true };
}

/**
 * Plain-text summary for the "Copy summary" button. No em dashes; always ends
 * with the educational line and the site URL.
 */
export function buildBreakevenSummary(
  { fixedMonthly, price, variableCost }: BreakevenInputs,
  result: BreakevenResult,
): string {
  const lines = [
    "Strata breakeven estimate",
    "",
    `Fixed monthly costs: ${formatUsd(fixedMonthly)}`,
    `Price per unit: ${formatUsd(price)}  |  Variable cost per unit: ${formatUsd(variableCost)}`,
  ];

  if (result.hasBreakeven) {
    lines.push(
      `Contribution margin: ${formatUsd(result.margin)} per unit`,
      `Breakeven: about ${formatNumber(result.units)} units (${formatUsd(result.revenue)} in sales) to cover costs.`,
    );
  } else {
    lines.push(
      "There is no breakeven yet: the price does not exceed the variable cost, so each sale adds to the loss. Raise the price or lower the cost per unit.",
    );
  }

  lines.push("", EDU_LINE);
  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

// A small worked example so the tool reads as a finished calculation on load.
const DEFAULTS = {
  fixedMonthly: "6000",
  price: "40",
  variableCost: "15",
};

export function BreakevenCalculator() {
  const [fixedMonthly, setFixedMonthly] = useState(DEFAULTS.fixedMonthly);
  const [price, setPrice] = useState(DEFAULTS.price);
  const [variableCost, setVariableCost] = useState(DEFAULTS.variableCost);

  const parsed = useMemo<BreakevenInputs>(
    () => ({
      fixedMonthly: parseAmount(fixedMonthly) ?? 0,
      price: parseAmount(price) ?? 0,
      variableCost: parseAmount(variableCost) ?? 0,
    }),
    [fixedMonthly, price, variableCost],
  );

  const result = useMemo(() => computeBreakeven(parsed), [parsed]);

  const insight = result.hasBreakeven ? (
    <>
      Each sale puts{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(result.margin)}
      </strong>{" "}
      toward your fixed costs. To cover{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(parsed.fixedMonthly)}
      </strong>{" "}
      a month, you need to sell about{" "}
      <strong className="font-semibold text-st-ink">
        {formatNumber(result.units)} units
      </strong>{" "}
      ({formatUsd(result.revenue)} in sales). Everything past that point is
      profit.
    </>
  ) : (
    <>
      There is no breakeven until the price clears the variable cost. Right now
      each sale adds to the loss instead of chipping away at your fixed costs.
      Raise the price, or bring the cost per unit down, to find the point where
      the numbers turn.
    </>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      <form
        className="flex flex-col gap-7"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Breakeven inputs"
      >
        <NumberField
          label="Fixed monthly costs"
          hint="Rent, insurance, salaries, the bills you pay whether you sell one unit or a thousand."
          value={fixedMonthly}
          onChange={setFixedMonthly}
          prefix="$"
          step={100}
        />
        <NumberField
          label="Price per unit"
          hint="What you charge for one unit, or your average sale."
          value={price}
          onChange={setPrice}
          prefix="$"
          step={1}
        />
        <NumberField
          label="Variable cost per unit"
          hint="What one unit costs you to make or deliver: materials, shipping, payment fees."
          value={variableCost}
          onChange={setVariableCost}
          prefix="$"
          step={1}
        />
      </form>

      <div className="flex flex-col gap-6">
        <ResultPanel eyebrow="Your breakeven">
          <Stat
            label="Margin per unit"
            value={result.hasBreakeven ? formatUsd(result.margin) : NO_VALUE}
          />
          <Stat
            label="Breakeven units"
            value={result.hasBreakeven ? formatNumber(result.units) : NO_VALUE}
            emphasis
          />
          <Stat
            label="Breakeven revenue"
            value={result.hasBreakeven ? formatUsd(result.revenue) : NO_VALUE}
            span
          />
        </ResultPanel>

        <p className="font-st-sans text-st-body-lg leading-relaxed text-st-ink">
          {insight}
        </p>

        <EstimateNote />

        <CopySummaryButton
          getSummary={() => buildBreakevenSummary(parsed, result)}
        />

        <div className="pt-1">
          <Button href="/contact" variant="secondary">
            Pressure-test your numbers
          </Button>
          <p className="mt-3 font-st-sans text-st-small text-st-muted">
            Free, and it usually takes one conversation.
          </p>
        </div>
      </div>
    </div>
  );
}
