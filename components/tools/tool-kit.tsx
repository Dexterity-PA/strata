"use client";

import { useId, useSyncExternalStore, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Input } from "@/components/ui/input";
import { DUR, EASE } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";
import { EDU_NOTE } from "@/lib/tools/format";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Client-only mount flag                                            */
/* ------------------------------------------------------------------ */

const emptySubscribe = () => () => {};

/**
 * Returns false on the server and on the first client render (so hydration
 * matches), then true once mounted. The idiomatic way to gate client-only
 * values like "today's date" without a setState-in-effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/* ------------------------------------------------------------------ */
/*  Animated figure: crossfades on change, transform/opacity only     */
/* ------------------------------------------------------------------ */

/**
 * A result figure that crossfades when its text changes. Mirrors the existing
 * buffer calculator so every tool's numbers move the same way. Under reduced
 * motion it is a plain, static span.
 */
export function AnimatedFigure({ value }: { value: string }) {
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
/*  Number field                                                      */
/* ------------------------------------------------------------------ */

interface NumberFieldProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (next: string) => void;
  /** A leading "$" or a trailing unit like "%" / "months". */
  prefix?: string;
  suffix?: string;
  step?: number;
  placeholder?: string;
}

/**
 * Labeled numeric input with an optional "$" prefix or unit suffix and a hint
 * line. Every field is properly labeled and described for assistive tech.
 */
export function NumberField({
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  step,
  placeholder,
}: NumberFieldProps) {
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
          inputMode="decimal"
          min={0}
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={hint ? hintId : undefined}
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
      {hint ? (
        <p id={hintId} className="font-st-sans text-st-small text-st-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Segmented radio control                                           */
/* ------------------------------------------------------------------ */

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  legend: string;
  name: string;
  value: T;
  onChange: (next: T) => void;
  options: ReadonlyArray<SegmentedOption<T>>;
  className?: string;
}

/**
 * A segmented choice built from native radio inputs, so arrow-key navigation
 * and screen-reader semantics come for free. The visible label is the styled
 * pill; the radio itself is visually hidden but fully focusable.
 */
export function SegmentedControl<T extends string>({
  legend,
  name,
  value,
  onChange,
  options,
  className,
}: SegmentedControlProps<T>) {
  return (
    <fieldset className={cn("flex flex-col gap-2", className)}>
      <legend className="font-st-sans text-st-small font-medium text-st-ink">
        {legend}
      </legend>
      <div className="inline-flex flex-wrap gap-1 rounded-st-sm border border-st-line bg-st-surface p-1">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                "cursor-pointer rounded-st-sm px-4 py-2 text-center font-st-sans text-st-small font-medium transition-colors duration-(--st-dur-fast)",
                "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-st-accent",
                selected
                  ? "bg-st-ink text-st-paper"
                  : "text-st-muted hover:text-st-ink",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ------------------------------------------------------------------ */
/*  Result panel + stat                                               */
/* ------------------------------------------------------------------ */

/**
 * The navy result panel shared by every tool: an inverse eyebrow, the
 * "Educational estimate" badge, and a polite live region wrapping the figures
 * so changes are announced once, atomically.
 */
export function ResultPanel({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-st-lg bg-st-ink p-6 text-st-paper shadow-st-md sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
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
        {children}
      </div>
    </div>
  );
}

/** A single figure inside {@link ResultPanel}. `emphasis` makes it the gold hero number. */
export function Stat({
  label,
  value,
  emphasis = false,
  span = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
  /** Stretch across both columns (for a wide value like a date). */
  span?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-st-md border p-5",
        span && "sm:col-span-2",
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
/*  Disclaimer note                                                   */
/* ------------------------------------------------------------------ */

/** The standard educational-estimate line shown under each result. */
export function EstimateNote({ className }: { className?: string }) {
  return (
    <p className={cn("font-st-sans text-st-small text-st-muted", className)}>
      {EDU_NOTE}
    </p>
  );
}
