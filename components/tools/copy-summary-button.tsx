"use client";

import { useClipboard } from "@/lib/use-clipboard";
import { cn } from "@/lib/utils";

/**
 * "Copy summary" control for the calculators. Copies a plain-text summary of
 * the current result (built lazily via `getSummary`) and surfaces an
 * aria-live confirmation. No storage, no accounts: text only. Keyboard
 * accessible and reduced-motion safe (the confirmation is a text change, not
 * an animation).
 */
export function CopySummaryButton({
  getSummary,
  label = "Copy summary",
  className,
}: {
  getSummary: () => string;
  label?: string;
  className?: string;
}) {
  const { copied, copy } = useClipboard();

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <button
        type="button"
        onClick={() => void copy(getSummary())}
        className="inline-flex items-center gap-2 rounded-st-sm font-st-sans text-st-small font-medium text-st-accent underline decoration-st-accent/40 decoration-1 underline-offset-4 transition-colors duration-(--st-dur-fast) hover:decoration-st-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-st-accent"
      >
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 5.5V4A1.5 1.5 0 0 0 9 2.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5" />
        </svg>
        {label}
      </button>
      <span
        aria-live="polite"
        className="font-st-sans text-st-small text-st-muted"
      >
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}
