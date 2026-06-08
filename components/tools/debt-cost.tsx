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
  formatMonths,
  formatUsd,
  NO_VALUE,
  parseAmount,
} from "@/lib/tools/format";

/* ------------------------------------------------------------------ */
/*  Pure calculation                                                  */
/* ------------------------------------------------------------------ */

const MAX_MONTHS = 1200; // 100 years; past this we call it "never pays off".
const EPS = 0.005; // half a cent: below this the balance is cleared.

interface DebtCostInputs {
  /** Current balance owed. */
  balance: number;
  /** Annual percentage rate. */
  apr: number;
  /** Fixed payment made each month. */
  payment: number;
}

interface DebtCostResult {
  months: number;
  totalInterest: number;
  /** Interest that accrues in the first month, for the never-payoff hint. */
  firstMonthInterest: number;
  /** True when the payment cannot outrun the interest, so it never clears. */
  neverPaysOff: boolean;
}

/**
 * Standard month-by-month amortization for a single debt. Each month interest
 * accrues, then the payment is applied (never more than the balance owes). If
 * the payment cannot cover even the first month's interest the balance holds
 * or grows, so we flag "never pays off" rather than loop forever.
 */
export function computeDebtCost({
  balance,
  apr,
  payment,
}: DebtCostInputs): DebtCostResult {
  const monthlyRate = apr / 100 / 12;
  const firstMonthInterest = balance * monthlyRate;

  if (balance <= 0) {
    return {
      months: 0,
      totalInterest: 0,
      firstMonthInterest,
      neverPaysOff: false,
    };
  }
  // No payment, or a payment that does not clear the first month's interest,
  // means the balance never shrinks.
  if (payment <= 0 || payment <= firstMonthInterest) {
    return {
      months: 0,
      totalInterest: 0,
      firstMonthInterest,
      neverPaysOff: true,
    };
  }

  let working = balance;
  let totalInterest = 0;
  let month = 0;

  while (working > EPS) {
    month += 1;
    if (month > MAX_MONTHS) {
      return {
        months: 0,
        totalInterest,
        firstMonthInterest,
        neverPaysOff: true,
      };
    }
    const interest = working * monthlyRate;
    working += interest;
    totalInterest += interest;
    const pay = Math.min(payment, working);
    working -= pay;
  }

  return {
    months: month,
    totalInterest,
    firstMonthInterest,
    neverPaysOff: false,
  };
}

/**
 * Plain-text summary for the "Copy summary" button. No em dashes; always ends
 * with the educational line and the site URL.
 */
export function buildDebtCostSummary(
  { balance, apr, payment }: DebtCostInputs,
  result: DebtCostResult,
): string {
  const lines = [
    "Strata single-debt cost estimate",
    "",
    `Balance: ${formatUsd(balance)}`,
    `APR: ${apr}%  |  Monthly payment: ${formatUsd(payment)}`,
  ];

  if (result.neverPaysOff) {
    lines.push(
      `This payment does not cover the interest (about ${formatUsd(result.firstMonthInterest)} in the first month), so the balance never clears. Increase the payment to make progress.`,
    );
  } else {
    lines.push(
      `Time to payoff: ${formatMonths(result.months)}`,
      `Total interest paid: ${formatUsd(result.totalInterest)}`,
    );
  }

  lines.push("", EDU_LINE);
  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const DEFAULTS = {
  balance: "5000",
  apr: "22",
  payment: "200",
};

export function DebtCost() {
  const [balance, setBalance] = useState(DEFAULTS.balance);
  const [apr, setApr] = useState(DEFAULTS.apr);
  const [payment, setPayment] = useState(DEFAULTS.payment);

  const parsed = useMemo<DebtCostInputs>(
    () => ({
      balance: parseAmount(balance) ?? 0,
      apr: parseAmount(apr) ?? 0,
      payment: parseAmount(payment) ?? 0,
    }),
    [balance, apr, payment],
  );

  const result = useMemo(() => computeDebtCost(parsed), [parsed]);

  const insight = result.neverPaysOff ? (
    <>
      At{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(parsed.payment)}
      </strong>{" "}
      a month, you are not covering the interest on {formatUsd(parsed.balance)}{" "}
      at {parsed.apr}%. About{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(result.firstMonthInterest)}
      </strong>{" "}
      of interest accrues in the first month alone, so the balance holds or
      grows. Lift the payment above that to start making real progress.
    </>
  ) : (
    <>
      Paying{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(parsed.payment)}
      </strong>{" "}
      a month, you clear{" "}
      <strong className="font-semibold text-st-ink">
        {formatUsd(parsed.balance)}
      </strong>{" "}
      in{" "}
      <strong className="font-semibold text-st-ink">
        {formatMonths(result.months)}
      </strong>
      , paying {formatUsd(result.totalInterest)} in interest along the way.
      Adding even a little each month cuts both numbers down.
    </>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      <form
        className="flex flex-col gap-7"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Single debt inputs"
      >
        <NumberField
          label="Balance"
          hint="What you owe on this debt right now."
          value={balance}
          onChange={setBalance}
          prefix="$"
          step={100}
        />
        <NumberField
          label="APR"
          hint="The annual interest rate on the debt."
          value={apr}
          onChange={setApr}
          suffix="%"
          step={1}
        />
        <NumberField
          label="Monthly payment"
          hint="The fixed amount you put toward it each month."
          value={payment}
          onChange={setPayment}
          prefix="$"
          step={25}
        />
      </form>

      <div className="flex flex-col gap-6">
        <ResultPanel eyebrow="Your payoff">
          <Stat
            label="Time to payoff"
            value={result.neverPaysOff ? NO_VALUE : formatMonths(result.months)}
            emphasis
          />
          <Stat
            label="Total interest"
            value={
              result.neverPaysOff ? NO_VALUE : formatUsd(result.totalInterest)
            }
          />
        </ResultPanel>

        <p className="font-st-sans text-st-body-lg leading-relaxed text-st-ink">
          {insight}
        </p>

        <EstimateNote />

        <CopySummaryButton
          getSummary={() => buildDebtCostSummary(parsed, result)}
        />

        <div className="pt-1">
          <Button href="/contact" variant="secondary">
            Find a faster payoff
          </Button>
          <p className="mt-3 font-st-sans text-st-small text-st-muted">
            Free, and it usually takes one conversation.
          </p>
        </div>
      </div>
    </div>
  );
}
