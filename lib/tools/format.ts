/**
 * Shared formatting + parsing helpers for the Strata tools.
 *
 * Every tool is educational: each result carries the same disclaimer line and
 * each "Copy summary" ends with it plus the site URL. Keeping that copy here
 * means it reads identically across all of them. No em dashes anywhere in
 * user-facing strings (per the site copy rules).
 */

/** Bare domain used to sign every copied summary. */
export const SITE_URL = "stratafinancialplanning.com";

/** The closing line on every copied summary. */
export const EDU_LINE = `Educational estimate, not financial advice. ${SITE_URL}`;

/** The on-page disclaimer shown under every result panel. */
export const EDU_NOTE =
  "This is an educational estimate to help you plan, not financial advice.";

/** Glyph for a figure that has no meaningful value yet. Never an em dash. */
export const NO_VALUE = "-";

const usd0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const usd2 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

/** Guard a number for display: NaN / Infinity / -0 all read as a clean 0. */
function safe(value: number): number {
  return Number.isFinite(value) ? value || 0 : 0;
}

/** Whole-dollar currency, e.g. "$1,200". */
export function formatUsd(value: number): string {
  return usd0.format(safe(value));
}

/** Currency to the cent, e.g. "$12.50". */
export function formatUsdCents(value: number): string {
  return usd2.format(safe(value));
}

/** Grouped integer, e.g. "1,200". */
export function formatNumber(value: number): string {
  return integer.format(safe(value));
}

/** A percentage to `digits` decimals, e.g. "42.5%". */
export function formatPercent(value: number, digits = 1): string {
  return `${safe(value).toFixed(digits)}%`;
}

/** Month and year of a date, e.g. "March 2027". */
export function formatMonthYear(date: Date): string {
  return monthYear.format(date);
}

/**
 * Parse a user-typed amount. Empty string becomes null (so a field can read as
 * "not filled in yet"); anything non-numeric also becomes null. Valid numbers
 * are clamped to be non-negative.
 */
export function parseAmount(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, n);
}

/** Like {@link parseAmount} but blank / invalid collapses to 0. */
export function toAmount(raw: string): number {
  return parseAmount(raw) ?? 0;
}

/** "1 month" / "2 months". */
export function pluralMonths(n: number): string {
  return `${formatNumber(n)} ${n === 1 ? "month" : "months"}`;
}

/**
 * A month count as a human duration: "8 mo", "1 yr", "2 yr 3 mo". Zero or less
 * reads as the no-value glyph, so an unsolved result never shows "0 mo".
 */
export function formatMonths(months: number): string {
  if (!Number.isFinite(months) || months <= 0) return NO_VALUE;
  const whole = Math.round(months);
  if (whole < 12) return `${whole} mo`;
  const years = Math.floor(whole / 12);
  const rem = whole % 12;
  return rem === 0 ? `${years} yr` : `${years} yr ${rem} mo`;
}

/** A new date `months` whole months after `from` (rounded to the month). */
export function addMonths(from: Date, months: number): Date {
  const next = new Date(from.getTime());
  next.setMonth(next.getMonth() + Math.round(months));
  return next;
}
