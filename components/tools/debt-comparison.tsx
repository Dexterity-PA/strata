"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { DUR, EASE } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Debt payoff comparator — avalanche vs. snowball.

   Self-contained client component. To surface it, import DebtComparison into
   /tools or a post. It owns its own <Section> so it drops in as a complete
   block.

   The math is a month-by-month amortization. Both strategies keep a constant
   monthly budget (sum of every minimum + the extra); as each debt clears, its
   freed-up minimum rolls onto the next target. Avalanche targets the highest
   APR first; snowball targets the smallest balance first.
--------------------------------------------------------------------------- */

type Strategy = "avalanche" | "snowball";

/** A debt row as edited in the UI — values are raw strings while typing. */
interface DebtRow {
  id: string;
  name: string;
  balance: string;
  apr: string;
  minimum: string;
}

/** A debt parsed into numbers, ready for the simulation. */
interface ParsedDebt {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minimum: number;
}

interface StrategyResult {
  months: number;
  totalInterest: number;
  /** Debt names in the order this strategy attacks them. */
  order: string[];
  neverPaysOff: boolean;
}

const MAX_MONTHS = 1200; // 100 years — past this we call it "never pays off".
const EPS = 0.005; // half a cent: below this a balance is considered cleared.

const DEFAULT_DEBTS: DebtRow[] = [
  { id: "d1", name: "Credit card", balance: "3000", apr: "24", minimum: "90" },
  { id: "d2", name: "Store card", balance: "1500", apr: "18", minimum: "45" },
  { id: "d3", name: "Car loan", balance: "8000", apr: "7", minimum: "160" },
];
const DEFAULT_EXTRA = "200";

/** Parse a user string to a non-negative number; blank / invalid becomes 0. */
function toNum(value: string): number {
  const n = parseFloat(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Order comparator for a strategy. Falls back to a stable secondary key. */
function comparator(strategy: Strategy) {
  return (a: ParsedDebt, b: ParsedDebt) =>
    strategy === "avalanche"
      ? b.apr - a.apr || a.balance - b.balance
      : a.balance - b.balance || b.apr - a.apr;
}

/**
 * Simulate paying off `debts` under one strategy. Returns months to debt-free
 * and total interest paid, or a never-pays-off flag when the budget can't
 * outrun the interest (so we warn instead of looping forever).
 */
function simulate(
  debts: ParsedDebt[],
  extra: number,
  strategy: Strategy,
): StrategyResult {
  const order = [...debts].sort(comparator(strategy)).map((d) => d.name);

  // Work on a mutable copy of the balances.
  const working = debts.map((d) => ({ ...d }));
  const budget = working.reduce((sum, d) => sum + d.minimum, 0) + extra;

  let totalInterest = 0;
  let month = 0;
  let prevTotal = working.reduce((sum, d) => sum + d.balance, 0);

  for (;;) {
    const active = working.filter((d) => d.balance > EPS);
    if (active.length === 0) break;

    month += 1;
    if (month > MAX_MONTHS) {
      return { months: 0, totalInterest, order, neverPaysOff: true };
    }

    // 1. Accrue one month of interest on every active debt.
    for (const d of active) {
      const interest = d.balance * (d.apr / 100 / 12);
      d.balance += interest;
      totalInterest += interest;
    }

    // 2. Pay the minimum on every active debt (never more than it owes).
    let available = budget;
    for (const d of active) {
      const pay = Math.min(d.minimum, d.balance, available);
      d.balance -= pay;
      available -= pay;
    }

    // 3. Throw everything left at the targets in strategy order. Freed-up
    //    minimums from already-cleared debts are part of `available`, so they
    //    roll forward automatically.
    const targets = working
      .filter((d) => d.balance > EPS)
      .sort(comparator(strategy));
    for (const d of targets) {
      if (available <= EPS) break;
      const pay = Math.min(d.balance, available);
      d.balance -= pay;
      available -= pay;
    }

    // Clamp sub-cent residuals so a debt counts as cleared.
    for (const d of working) if (d.balance < EPS) d.balance = 0;

    const total = working.reduce((sum, d) => sum + d.balance, 0);
    // Guard: if the balances aren't shrinking, the minimums don't cover the
    // interest and this never ends. Stop and report it.
    if (total >= prevTotal - EPS) {
      return { months: 0, totalInterest, order, neverPaysOff: true };
    }
    prevTotal = total;
  }

  return { months: month, totalInterest, order, neverPaysOff: false };
}

const usd0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatMonths(months: number): string {
  if (months <= 0) return "—";
  if (months < 12) return `${months} mo`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem === 0 ? `${years} yr` : `${years} yr ${rem} mo`;
}

/** A number that springs to its new value on change; static if reduced-motion. */
function AnimatedCurrency({ value }: { value: number }) {
  const reducedMotion = useReducedMotion();
  const spring = useSpring(value, { stiffness: 130, damping: 26, mass: 0.7 });
  const [shown, setShown] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useMotionValueEvent(spring, "change", (latest) => setShown(latest));

  return <>{usd0.format(reducedMotion ? value : Math.max(0, shown))}</>;
}

export function DebtComparison() {
  const [debts, setDebts] = useState<DebtRow[]>(DEFAULT_DEBTS);
  const [extra, setExtra] = useState<string>(DEFAULT_EXTRA);
  const nextId = useRef(DEFAULT_DEBTS.length + 1);
  const headingId = useId();
  const reducedMotion = useReducedMotion();

  function updateDebt(
    id: string,
    field: keyof Omit<DebtRow, "id">,
    value: string,
  ) {
    setDebts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)),
    );
  }

  function addDebt() {
    const id = `d${nextId.current++}`;
    setDebts((prev) => [
      ...prev,
      { id, name: "", balance: "", apr: "", minimum: "" },
    ]);
  }

  function removeDebt(id: string) {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }

  const parsed = useMemo<ParsedDebt[]>(
    () =>
      debts
        .map((d, i) => ({
          id: d.id,
          name: d.name.trim() || `Debt ${i + 1}`,
          balance: toNum(d.balance),
          apr: toNum(d.apr),
          minimum: toNum(d.minimum),
        }))
        .filter((d) => d.balance > 0),
    [debts],
  );

  const extraNum = toNum(extra);

  const results = useMemo(() => {
    if (parsed.length === 0) return null;
    return {
      avalanche: simulate(parsed, extraNum, "avalanche"),
      snowball: simulate(parsed, extraNum, "snowball"),
    };
  }, [parsed, extraNum]);

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: DUR.base, ease: EASE.out };

  return (
    <Section spacing="base" container="none" aria-labelledby={headingId}>
      <Container size="wide" className="max-w-4xl">
        <header className="max-w-2xl">
          <Eyebrow>Interactive tool</Eyebrow>
          <h2
            id={headingId}
            className="mt-5 font-st-display text-st-h2 text-st-ink"
          >
            Avalanche or snowball?
          </h2>
          <p className="mt-4 text-st-body-lg text-st-muted">
            List your debts and the extra you can put toward them each month.
            We&apos;ll run both payoff orders — highest rate first (avalanche)
            and smallest balance first (snowball) — and show what each one costs
            you.
          </p>
        </header>

        {/* ---- Inputs ------------------------------------------------------ */}
        <div className="mt-12">
          {/* Column headers — desktop only; each input carries its own label. */}
          <div className="hidden gap-3 px-1 pb-2 sm:grid sm:grid-cols-[1.4fr_1fr_0.8fr_1fr_auto]">
            <span className="font-st-sans text-st-small font-medium text-st-muted">
              Debt
            </span>
            <span className="font-st-sans text-st-small font-medium text-st-muted">
              Balance
            </span>
            <span className="font-st-sans text-st-small font-medium text-st-muted">
              APR
            </span>
            <span className="font-st-sans text-st-small font-medium text-st-muted">
              Min. / mo
            </span>
            <span className="sr-only">Remove</span>
          </div>

          <ul className="grid gap-4 sm:gap-3">
            <AnimatePresence initial={false}>
              {debts.map((debt, index) => (
                <motion.li
                  key={debt.id}
                  layout={!reducedMotion}
                  initial={
                    reducedMotion ? false : { opacity: 0, height: 0, y: -8 }
                  }
                  animate={
                    reducedMotion ? {} : { opacity: 1, height: "auto", y: 0 }
                  }
                  exit={reducedMotion ? {} : { opacity: 0, height: 0, y: -8 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { duration: DUR.fast, ease: EASE.out }
                  }
                  className="overflow-hidden rounded-st-md border border-st-line bg-st-surface p-4 sm:border-0 sm:bg-transparent sm:p-0"
                >
                  <DebtFields
                    debt={debt}
                    index={index}
                    canRemove={debts.length > 1}
                    onChange={updateDebt}
                    onRemove={removeDebt}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="mt-4">
            <button
              type="button"
              onClick={addDebt}
              className="inline-flex items-center gap-2 font-st-sans text-st-small font-medium text-st-accent underline decoration-st-accent/40 decoration-1 underline-offset-4 transition-colors duration-(--st-dur-fast) hover:decoration-st-accent"
            >
              <span aria-hidden className="text-st-body leading-none">
                +
              </span>
              Add a debt
            </button>
          </div>

          {/* Extra monthly payment */}
          <div className="mt-8 flex flex-col gap-2 border-t border-st-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <label
              htmlFor={`${headingId}-extra`}
              className="font-st-sans text-st-body font-medium text-st-ink"
            >
              Extra you can pay each month
              <span className="mt-0.5 block font-normal text-st-small text-st-muted">
                On top of every minimum above.
              </span>
            </label>
            <div className="sm:w-48">
              <AdornedInput
                id={`${headingId}-extra`}
                prefix="$"
                value={extra}
                onValueChange={setExtra}
                aria-label="Extra monthly payment in dollars"
              />
            </div>
          </div>
        </div>

        {/* ---- Results ----------------------------------------------------- */}
        <div className="mt-12" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {results === null ? (
              <motion.p
                key="empty"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reducedMotion ? {} : { opacity: 0 }}
                transition={transition}
                className="rounded-st-md border border-dashed border-st-line bg-st-surface px-6 py-10 text-center text-st-body text-st-muted"
              >
                Add at least one debt with a balance to see the comparison.
              </motion.p>
            ) : (
              <motion.div
                key="results"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? {} : { opacity: 0 }}
                transition={transition}
              >
                <Results
                  avalanche={results.avalanche}
                  snowball={results.snowball}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ---- Disclaimer -------------------------------------------------- */}
        <p className="mt-10 text-st-small text-st-muted">
          This is an educational estimate, not personalized financial advice.
          Real statements round to the cent and may add fees this tool
          can&apos;t see. Want to run your own numbers both ways, free?{" "}
          <Button href="/contact" variant="ghost" className="text-st-small">
            Get in touch
          </Button>
          .
        </p>
      </Container>
    </Section>
  );
}

/* ---- Sub-components ------------------------------------------------------- */

interface DebtFieldsProps {
  debt: DebtRow;
  index: number;
  canRemove: boolean;
  onChange: (
    id: string,
    field: keyof Omit<DebtRow, "id">,
    value: string,
  ) => void;
  onRemove: (id: string) => void;
}

function DebtFields({
  debt,
  index,
  canRemove,
  onChange,
  onRemove,
}: DebtFieldsProps) {
  const label = debt.name.trim() || `Debt ${index + 1}`;
  return (
    <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_0.8fr_1fr_auto] sm:items-center">
      <Field label="Debt name" srOnly htmlFor={`${debt.id}-name`}>
        <Input
          id={`${debt.id}-name`}
          type="text"
          placeholder={`Debt ${index + 1}`}
          value={debt.name}
          onChange={(e) => onChange(debt.id, "name", e.target.value)}
        />
      </Field>

      <Field label={`${label} balance`} srOnly htmlFor={`${debt.id}-balance`}>
        <AdornedInput
          id={`${debt.id}-balance`}
          prefix="$"
          placeholder="0"
          value={debt.balance}
          onValueChange={(v) => onChange(debt.id, "balance", v)}
        />
      </Field>

      <Field label={`${label} APR`} srOnly htmlFor={`${debt.id}-apr`}>
        <AdornedInput
          id={`${debt.id}-apr`}
          suffix="%"
          placeholder="0"
          value={debt.apr}
          onValueChange={(v) => onChange(debt.id, "apr", v)}
        />
      </Field>

      <Field
        label={`${label} minimum payment`}
        srOnly
        htmlFor={`${debt.id}-minimum`}
      >
        <AdornedInput
          id={`${debt.id}-minimum`}
          prefix="$"
          placeholder="0"
          value={debt.minimum}
          onValueChange={(v) => onChange(debt.id, "minimum", v)}
        />
      </Field>

      <div className="flex justify-end sm:block">
        <button
          type="button"
          onClick={() => onRemove(debt.id)}
          disabled={!canRemove}
          aria-label={`Remove ${label}`}
          className="rounded-st-sm p-2 text-st-muted transition-colors duration-(--st-dur-fast) hover:text-st-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-st-accent disabled:pointer-events-none disabled:opacity-30"
        >
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  srOnly?: boolean;
  children: ReactNode;
}

function Field({ label, htmlFor, srOnly, children }: FieldProps) {
  return (
    <div className="grid gap-1.5">
      <label
        htmlFor={htmlFor}
        className={cn(
          "font-st-sans text-st-small font-medium text-st-ink",
          srOnly && "sr-only",
        )}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

interface AdornedInputProps {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  "aria-label"?: string;
}

/** Numeric input with an inline $ prefix or % suffix. Filters to digits/dot. */
function AdornedInput({
  id,
  value,
  onValueChange,
  prefix,
  suffix,
  placeholder,
  "aria-label": ariaLabel,
}: AdornedInputProps) {
  return (
    <div className="relative">
      {prefix && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-st-sans text-st-body text-st-muted"
        >
          {prefix}
        </span>
      )}
      <Input
        id={id}
        type="text"
        inputMode="decimal"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          // Keep only digits and a single decimal point.
          const cleaned = e.target.value.replace(/[^\d.]/g, "");
          const parts = cleaned.split(".");
          const next =
            parts.length > 2
              ? `${parts[0]}.${parts.slice(1).join("")}`
              : cleaned;
          onValueChange(next);
        }}
        aria-label={ariaLabel}
        className={cn(prefix && "pl-7", suffix && "pr-8")}
      />
      {suffix && (
        <span
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-st-sans text-st-body text-st-muted"
        >
          {suffix}
        </span>
      )}
    </div>
  );
}

/** Builds the honest, gap-aware summary line from the two results. */
function buildVerdict(
  avalanche: StrategyResult,
  snowball: StrategyResult,
): { tone: "warn" | "neutral"; text: string } {
  if (avalanche.neverPaysOff && snowball.neverPaysOff) {
    return {
      tone: "warn",
      text: "With these minimums and extra, the balances don't shrink — the interest is outrunning the payments, so the debt never clears. Try a larger monthly payment, or check that each minimum is right.",
    };
  }
  if (avalanche.neverPaysOff || snowball.neverPaysOff) {
    const winner = avalanche.neverPaysOff ? "Snowball" : "Avalanche";
    return {
      tone: "warn",
      text: `Only the ${winner.toLowerCase()} order clears these debts with this budget — the other lets a high-rate balance outgrow its payment. Here, ${winner.toLowerCase()} isn't just cheaper, it's the one that actually finishes.`,
    };
  }

  const interestSaved = snowball.totalInterest - avalanche.totalInterest;
  const monthsSaved = snowball.months - avalanche.months;
  const savedUsd = usd0.format(Math.round(interestSaved));
  const closeThreshold = Math.max(100, snowball.totalInterest * 0.04);

  const timePhrase =
    monthsSaved > 0
      ? ` and finishes ${monthsSaved} month${monthsSaved === 1 ? "" : "s"} sooner`
      : monthsSaved < 0
        ? ` (snowball actually finishes ${-monthsSaved} month${monthsSaved === -1 ? "" : "s"} sooner, though it pays more interest)`
        : "";

  if (interestSaved < 1 && monthsSaved === 0) {
    return {
      tone: "neutral",
      text: "These two come out essentially identical for your numbers. Pick the one you'll actually stick with — for a lot of people that's the snowball, because closing a whole account early is a real motivator.",
    };
  }

  if (interestSaved < closeThreshold && monthsSaved <= 1) {
    return {
      tone: "neutral",
      text: `Avalanche saves about ${savedUsd} in interest${timePhrase} — a slim margin. If the snowball's quick wins help you keep going, that's an easy trade to justify.`,
    };
  }

  return {
    tone: "neutral",
    text: `Avalanche saves about ${savedUsd} in interest${timePhrase}. That's a real gap — but it only counts if you stay with the plan. If you've started a payoff before and stopped, the snowball's early wins may be worth more to you than the interest.`,
  };
}

function Results({
  avalanche,
  snowball,
}: {
  avalanche: StrategyResult;
  snowball: StrategyResult;
}) {
  const verdict = buildVerdict(avalanche, snowball);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <StrategyCard
          title="Avalanche"
          subtitle="Highest rate first"
          result={avalanche}
          highlight={!avalanche.neverPaysOff && !snowball.neverPaysOff}
        />
        <StrategyCard
          title="Snowball"
          subtitle="Smallest balance first"
          result={snowball}
        />
      </div>

      <div
        className={cn(
          "rounded-st-md border px-6 py-5",
          verdict.tone === "warn"
            ? "border-st-accent/40 bg-st-accent/5"
            : "border-st-line bg-st-surface",
        )}
        role={verdict.tone === "warn" ? "alert" : undefined}
      >
        <p className="text-st-body text-st-ink">{verdict.text}</p>
      </div>
    </div>
  );
}

function StrategyCard({
  title,
  subtitle,
  result,
  highlight = false,
}: {
  title: string;
  subtitle: string;
  result: StrategyResult;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-st-md border bg-st-surface p-6",
        highlight ? "border-st-accent/50 shadow-st-sm" : "border-st-line",
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-st-display text-st-h3 text-st-ink">{title}</h3>
        <span className="font-st-sans text-st-small text-st-muted">
          {subtitle}
        </span>
      </div>

      {result.neverPaysOff ? (
        <p className="mt-6 text-st-body text-st-accent">
          Doesn&apos;t pay off — the payments don&apos;t cover the interest.
        </p>
      ) : (
        <>
          <dl className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <dt className="font-st-sans text-st-small text-st-muted">
                Time to debt-free
              </dt>
              <dd className="mt-1 font-st-display text-st-h3 text-st-ink">
                {formatMonths(result.months)}
              </dd>
            </div>
            <div>
              <dt className="font-st-sans text-st-small text-st-muted">
                Total interest
              </dt>
              <dd className="mt-1 font-st-display text-st-h3 text-st-ink">
                <AnimatedCurrency value={result.totalInterest} />
              </dd>
            </div>
          </dl>

          <div className="mt-5 border-t border-st-line pt-4">
            <p className="font-st-sans text-st-small text-st-muted">
              Payoff order
            </p>
            <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
              {result.order.map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  className="flex items-center gap-2 font-st-sans text-st-small text-st-ink"
                >
                  <span className="text-st-muted">{i + 1}.</span>
                  {name}
                  {i < result.order.length - 1 && (
                    <span aria-hidden className="text-st-muted/60">
                      ›
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
}
