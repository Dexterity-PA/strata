"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Input } from "@/components/ui/input";
import { DUR, EASE } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Pure calculation                                                  */
/* ------------------------------------------------------------------ */

// 52 weeks spread across 12 months, the same conversion the
// "planning-for-the-slow-season" post uses to turn a monthly set-aside
// into a weekly one ($2,500/mo → ~$577/wk).
const WEEKS_PER_MONTH = 52 / 12;

interface BufferInputs {
  /** Bare-minimum cost to keep the doors open in a stripped-down month. */
  minCost: number;
  /** How many months the slow season lasts. */
  slowMonths: number;
  /** Expected average monthly income during the slow season. */
  slowIncome: number;
  /** How many busy months you have to build the buffer. */
  busyMonths: number;
}

interface BufferResult {
  /** Shortfall in a single slow month (never negative). */
  monthlyGap: number;
  /** Total to set aside for the whole slow season. */
  totalTarget: number;
  /** Set-aside per busy month to hit the target. */
  perBusyMonth: number;
  /** Set-aside per busy week to hit the target. */
  perWeek: number;
}

/**
 * Slow-season buffer math. All outputs are clamped so empty or partial
 * input never produces a negative figure. When there are no busy months to
 * save across, the per-month / per-week set-asides are 0 (the UI surfaces a
 * gentle hint instead of a misleading number).
 */
export function computeBuffer({
  minCost,
  slowMonths,
  slowIncome,
  busyMonths,
}: BufferInputs): BufferResult {
  const monthlyGap = Math.max(0, minCost - slowIncome);
  const totalTarget = monthlyGap * Math.max(0, slowMonths);
  const perBusyMonth = busyMonths > 0 ? totalTarget / busyMonths : 0;
  const perWeek = perBusyMonth / WEEKS_PER_MONTH;
  return { monthlyGap, totalTarget, perBusyMonth, perWeek };
}

/* ------------------------------------------------------------------ */
/*  Formatting                                                        */
/* ------------------------------------------------------------------ */

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatCurrency(value: number): string {
  // Guard against -0 and any stray NaN so the display always reads cleanly.
  return currency.format(Number.isFinite(value) ? value || 0 : 0);
}

/** Empty string → null; otherwise a non-negative finite number (or null). */
function parseAmount(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, n);
}

function pluralMonths(n: number): string {
  return `${n} ${n === 1 ? "month" : "months"}`;
}

/**
 * "a" vs "an" for a dollar figure, by how the number is spoken: anything
 * led by "eight" (8, 80, 8,000…) or by "eleven"/"eighteen" as the top unit
 * (11, 18, 11,000, 18,000…) takes "an". Keeps the live sentence reading
 * naturally: "an $8,000/mo gap", not "a $8,000/mo gap".
 */
function indefiniteArticle(amount: number): "a" | "an" {
  const digits = String(Math.max(0, Math.round(amount)));
  if (digits === "0") return "a";
  if (digits[0] === "8") return "an";
  const lead = digits.slice(0, 2);
  if ((lead === "11" || lead === "18") && digits.length % 3 === 2) return "an";
  return "a";
}

/* ------------------------------------------------------------------ */
/*  Animated figure: crossfades on change, transform/opacity only    */
/* ------------------------------------------------------------------ */

function AnimatedFigure({ value }: { value: string }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <span className="tabular-nums">{value}</span>;
  }

  return (
    <span className="relative inline-block tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="inline-block"
          initial={{ opacity: 0, y: "0.45em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-0.45em" }}
          transition={{ duration: DUR.base, ease: EASE.out }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Input field                                                       */
/* ------------------------------------------------------------------ */

interface FieldProps {
  label: string;
  hint: string;
  value: string;
  onChange: (next: string) => void;
  /** Visual adornment: a leading "$" or a trailing unit like "months". */
  prefix?: string;
  suffix?: string;
  step?: number;
}

function Field({
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  step,
}: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-st-sans text-st-small font-medium text-st-ink"
      >
        {label}
      </label>
      <div className="relative">
        {prefix ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-st-sans text-st-body text-st-muted"
          >
            {prefix}
          </span>
        ) : null}
        <Input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={hintId}
          className={cn(prefix && "pl-8", suffix && "pr-20")}
        />
        {suffix ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-st-sans text-st-small text-st-muted"
          >
            {suffix}
          </span>
        ) : null}
      </div>
      <p id={hintId} className="font-st-sans text-st-small text-st-muted">
        {hint}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Result stat                                                       */
/* ------------------------------------------------------------------ */

function Stat({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-st-md border p-5",
        emphasis
          ? "border-st-accent-bright/30 bg-st-ink-soft"
          : "border-st-paper/10",
      )}
    >
      <span className="font-st-sans text-st-eyebrow font-medium uppercase tracking-[0.16em] text-st-paper/60">
        {label}
      </span>
      <span
        className={cn(
          "font-st-display leading-none",
          emphasis
            ? "text-st-h2 text-st-accent-bright"
            : "text-st-h3 text-st-paper",
        )}
      >
        <AnimatedFigure value={value} />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Calculator                                                        */
/* ------------------------------------------------------------------ */

// Defaults mirror the worked example in the source insights post, so the
// tool reads as a finished calculation the moment the page loads.
const DEFAULTS = {
  minCost: "9000",
  slowMonths: "3",
  slowIncome: "4000",
  busyMonths: "6",
};

export function BufferCalculator() {
  const [minCost, setMinCost] = useState(DEFAULTS.minCost);
  const [slowMonths, setSlowMonths] = useState(DEFAULTS.slowMonths);
  const [slowIncome, setSlowIncome] = useState(DEFAULTS.slowIncome);
  const [busyMonths, setBusyMonths] = useState(DEFAULTS.busyMonths);

  const parsed = useMemo(
    () => ({
      minCost: parseAmount(minCost) ?? 0,
      slowMonths: parseAmount(slowMonths) ?? 0,
      slowIncome: parseAmount(slowIncome) ?? 0,
      busyMonths: parseAmount(busyMonths) ?? 0,
    }),
    [minCost, slowMonths, slowIncome, busyMonths],
  );

  const result = useMemo(() => computeBuffer(parsed), [parsed]);

  const hasBusyMonths = parsed.busyMonths > 0;
  const hasGap = result.monthlyGap > 0 && parsed.slowMonths > 0;

  // The plain-language sentence, recomputed from the live inputs.
  const insight = hasGap ? (
    <>
      To cover {indefiniteArticle(result.monthlyGap)}{" "}
      <strong className="font-semibold text-st-ink">
        {formatCurrency(result.monthlyGap)}/mo gap
      </strong>{" "}
      across {pluralMonths(parsed.slowMonths)}, set aside about{" "}
      {hasBusyMonths ? (
        <>
          <strong className="font-semibold text-st-ink">
            {formatCurrency(result.perBusyMonth)}/mo
          </strong>{" "}
          (~{formatCurrency(result.perWeek)}/wk) during your{" "}
          {pluralMonths(parsed.busyMonths)} of busy season.
        </>
      ) : (
        <>
          <strong className="font-semibold text-st-ink">
            {formatCurrency(result.totalTarget)}
          </strong>{" "}
          in total. Add your busy-season length to see the monthly and weekly
          set-aside.
        </>
      )}
    </>
  ) : (
    <>
      Enter your bare-minimum monthly cost and a slow-season length above. If
      your expected income already covers the bare minimum, you have no gap to
      fund, which is its own kind of good news.
    </>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      {/* Inputs */}
      <form
        className="flex flex-col gap-7"
        // Live tool, nothing to submit anywhere.
        onSubmit={(event) => event.preventDefault()}
        aria-label="Slow-season buffer inputs"
      >
        <Field
          label="Bare-minimum monthly cost"
          hint="A stripped-down month: rent, insurance, loan payments, the payroll and draw you'd keep no matter what."
          value={minCost}
          onChange={setMinCost}
          prefix="$"
          step={100}
        />
        <Field
          label="Slow-season length"
          hint="How many months your slow season runs."
          value={slowMonths}
          onChange={setSlowMonths}
          suffix="months"
          step={1}
        />
        <Field
          label="Expected income per slow month"
          hint="What you typically bring in during an average slow-season month."
          value={slowIncome}
          onChange={setSlowIncome}
          prefix="$"
          step={100}
        />
        <Field
          label="Busy-season length"
          hint="How many busy months you have to build the buffer across."
          value={busyMonths}
          onChange={setBusyMonths}
          suffix="months"
          step={1}
        />
      </form>

      {/* Results */}
      <div className="flex flex-col gap-6">
        <div className="rounded-st-lg bg-st-ink p-6 text-st-paper shadow-st-md sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <Eyebrow tone="inverse">Your buffer</Eyebrow>
            <span className="rounded-st-sm border border-st-accent-bright/30 px-2.5 py-1 font-st-sans text-st-eyebrow font-medium uppercase tracking-[0.14em] text-st-accent-bright/90">
              Educational estimate
            </span>
          </div>

          <div
            className="grid gap-4 sm:grid-cols-2"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <Stat
              label="Monthly gap"
              value={formatCurrency(result.monthlyGap)}
            />
            <Stat
              label="Buffer target"
              value={formatCurrency(result.totalTarget)}
              emphasis
            />
            <Stat
              label="Per busy month"
              value={hasBusyMonths ? formatCurrency(result.perBusyMonth) : "-"}
            />
            <Stat
              label="Per busy week"
              value={hasBusyMonths ? formatCurrency(result.perWeek) : "-"}
            />
          </div>
        </div>

        <p className="font-st-sans text-st-body-lg leading-relaxed text-st-ink">
          {insight}
        </p>

        <p className="font-st-sans text-st-small text-st-muted">
          This is an educational estimate to help you plan, not financial
          advice.
        </p>

        <div className="pt-1">
          <Button href="/contact" variant="secondary">
            Find your bare-minimum number
          </Button>
          <p className="mt-3 font-st-sans text-st-small text-st-muted">
            Free, and it usually takes one conversation.
          </p>
        </div>
      </div>
    </div>
  );
}
