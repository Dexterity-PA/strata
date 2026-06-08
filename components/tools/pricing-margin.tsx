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
  formatPercent,
  formatUsdCents,
  NO_VALUE,
  parseAmount,
} from "@/lib/tools/format";

/* ------------------------------------------------------------------ */
/*  Pure calculation                                                  */
/* ------------------------------------------------------------------ */

export type PricingMode = "price" | "margin";

/**
 * Margin and markup describe the same gap two different ways, so they are
 * easy to mix up:
 *   margin = profit / price  (share of the SALE that is profit)
 *   markup = profit / cost   (how far you mark the COST up)
 * A 50% markup is only a 33% margin, so the tool always labels which is which.
 */
interface PriceFromMargin {
  ok: boolean;
  price: number;
  profit: number;
  markup: number;
}

/** Mode A: given unit cost and a target margin %, what price hits it? */
export function priceFromMargin(
  cost: number,
  targetMargin: number,
): PriceFromMargin {
  // A margin of 100% (or more) implies infinite price, and cost must be real.
  if (cost <= 0 || targetMargin >= 100) {
    return { ok: false, price: 0, profit: 0, markup: 0 };
  }
  const price = cost / (1 - targetMargin / 100);
  const profit = price - cost;
  const markup = (profit / cost) * 100;
  return { ok: true, price, profit, markup };
}

interface MarginFromPrice {
  ok: boolean;
  margin: number;
  markup: number;
  profit: number;
  /** Cost is missing, so markup cannot be expressed (margin still can). */
  markupUnknown: boolean;
}

/** Mode B: given a price and unit cost, what are the actual margin and markup? */
export function marginFromPrice(price: number, cost: number): MarginFromPrice {
  if (price <= 0) {
    return { ok: false, margin: 0, markup: 0, profit: 0, markupUnknown: true };
  }
  const profit = price - cost;
  const margin = (profit / price) * 100;
  const markupUnknown = cost <= 0;
  const markup = markupUnknown ? 0 : (profit / cost) * 100;
  return { ok: true, margin, markup, profit, markupUnknown };
}

interface PricingInputs {
  mode: PricingMode;
  cost: number;
  targetMargin: number;
  price: number;
}

/**
 * Plain-text summary for the "Copy summary" button. No em dashes; always ends
 * with the educational line and the site URL.
 */
export function buildPricingSummary(inputs: PricingInputs): string {
  const lines = ["Strata pricing and margin estimate", ""];

  if (inputs.mode === "price") {
    const r = priceFromMargin(inputs.cost, inputs.targetMargin);
    lines.push(
      `Unit cost: ${formatUsdCents(inputs.cost)}`,
      `Target margin: ${formatPercent(inputs.targetMargin)}`,
    );
    if (r.ok) {
      lines.push(
        `Price to hit that margin: ${formatUsdCents(r.price)}`,
        `That is a ${formatPercent(r.markup)} markup on cost, ${formatUsdCents(r.profit)} profit per unit.`,
      );
    } else {
      lines.push(
        "No price works for those numbers: enter a unit cost above 0 and a target margin under 100%.",
      );
    }
  } else {
    const r = marginFromPrice(inputs.price, inputs.cost);
    lines.push(
      `Price: ${formatUsdCents(inputs.price)}`,
      `Unit cost: ${formatUsdCents(inputs.cost)}`,
    );
    if (r.ok) {
      lines.push(
        `Margin (share of the sale that is profit): ${formatPercent(r.margin)}`,
        `Markup (how far cost is marked up): ${r.markupUnknown ? "needs a unit cost above 0" : formatPercent(r.markup)}`,
        `Profit per unit: ${formatUsdCents(r.profit)}`,
      );
    } else {
      lines.push("Enter a price above 0 to see the margin and markup.");
    }
  }

  lines.push("", EDU_LINE);
  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const DEFAULTS = {
  cost: "15",
  targetMargin: "40",
  price: "40",
};

const MODE_OPTIONS = [
  { value: "price" as const, label: "Find the price" },
  { value: "margin" as const, label: "Check a price" },
];

export function PricingMargin() {
  const [mode, setMode] = useState<PricingMode>("price");
  const [cost, setCost] = useState(DEFAULTS.cost);
  const [targetMargin, setTargetMargin] = useState(DEFAULTS.targetMargin);
  const [price, setPrice] = useState(DEFAULTS.price);

  const inputs = useMemo<PricingInputs>(
    () => ({
      mode,
      cost: parseAmount(cost) ?? 0,
      targetMargin: parseAmount(targetMargin) ?? 0,
      price: parseAmount(price) ?? 0,
    }),
    [mode, cost, targetMargin, price],
  );

  const priceResult = useMemo(
    () => priceFromMargin(inputs.cost, inputs.targetMargin),
    [inputs.cost, inputs.targetMargin],
  );
  const marginResult = useMemo(
    () => marginFromPrice(inputs.price, inputs.cost),
    [inputs.price, inputs.cost],
  );

  const insight =
    mode === "price" ? (
      priceResult.ok ? (
        <>
          To keep{" "}
          <strong className="font-semibold text-st-ink">
            {formatPercent(inputs.targetMargin)}
          </strong>{" "}
          of each sale as profit, price it at{" "}
          <strong className="font-semibold text-st-ink">
            {formatUsdCents(priceResult.price)}
          </strong>
          . That is a {formatPercent(priceResult.markup)} markup on your{" "}
          {formatUsdCents(inputs.cost)} cost, and{" "}
          {formatUsdCents(priceResult.profit)} of profit per unit.
        </>
      ) : (
        <>
          A price only exists when the unit cost is above 0 and the target
          margin is under 100%. A 100% margin would mean charging an infinite
          price, so aim lower.
        </>
      )
    ) : marginResult.ok ? (
      <>
        At{" "}
        <strong className="font-semibold text-st-ink">
          {formatUsdCents(inputs.price)}
        </strong>{" "}
        on a {formatUsdCents(inputs.cost)} cost, your{" "}
        <strong className="font-semibold text-st-ink">margin</strong> is{" "}
        <strong className="font-semibold text-st-ink">
          {formatPercent(marginResult.margin)}
        </strong>{" "}
        (the share of the sale you keep), which is a{" "}
        {marginResult.markupUnknown
          ? "markup you can see once you add a unit cost"
          : `${formatPercent(marginResult.markup)} markup on cost`}
        . The two are not the same number, so it pays to be clear which you
        mean.
      </>
    ) : (
      <>
        Enter a price above 0 to see the margin and the markup it works out to.
      </>
    );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      <form
        className="flex flex-col gap-7"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Pricing and margin inputs"
      >
        <SegmentedControl
          legend="What do you want to work out?"
          name="pricing-mode"
          value={mode}
          onChange={setMode}
          options={MODE_OPTIONS}
        />

        <NumberField
          label="Unit cost"
          hint="What one unit costs you to make or deliver."
          value={cost}
          onChange={setCost}
          prefix="$"
          step={1}
        />

        {mode === "price" ? (
          <NumberField
            label="Target margin"
            hint="The share of each sale you want to keep as profit. Margin, not markup."
            value={targetMargin}
            onChange={setTargetMargin}
            suffix="%"
            step={1}
          />
        ) : (
          <NumberField
            label="Price"
            hint="What you charge for one unit."
            value={price}
            onChange={setPrice}
            prefix="$"
            step={1}
          />
        )}
      </form>

      <div className="flex flex-col gap-6">
        <ResultPanel eyebrow={mode === "price" ? "Your price" : "Your margin"}>
          {mode === "price" ? (
            <>
              <Stat
                label="Price"
                value={
                  priceResult.ok ? formatUsdCents(priceResult.price) : NO_VALUE
                }
                emphasis
              />
              <Stat
                label="Markup on cost"
                value={
                  priceResult.ok ? formatPercent(priceResult.markup) : NO_VALUE
                }
              />
              <Stat
                label="Profit per unit"
                value={
                  priceResult.ok ? formatUsdCents(priceResult.profit) : NO_VALUE
                }
                span
              />
            </>
          ) : (
            <>
              <Stat
                label="Margin (of the sale)"
                value={
                  marginResult.ok
                    ? formatPercent(marginResult.margin)
                    : NO_VALUE
                }
                emphasis
              />
              <Stat
                label="Markup (on cost)"
                value={
                  marginResult.ok && !marginResult.markupUnknown
                    ? formatPercent(marginResult.markup)
                    : NO_VALUE
                }
              />
              <Stat
                label="Profit per unit"
                value={
                  marginResult.ok
                    ? formatUsdCents(marginResult.profit)
                    : NO_VALUE
                }
                span
              />
            </>
          )}
        </ResultPanel>

        <p className="font-st-sans text-st-body-lg leading-relaxed text-st-ink">
          {insight}
        </p>

        <EstimateNote />

        <CopySummaryButton getSummary={() => buildPricingSummary(inputs)} />

        <div className="pt-1">
          <Button href="/contact" variant="secondary">
            Sanity-check your pricing
          </Button>
          <p className="mt-3 font-st-sans text-st-small text-st-muted">
            Free, and it usually takes one conversation.
          </p>
        </div>
      </div>
    </div>
  );
}
