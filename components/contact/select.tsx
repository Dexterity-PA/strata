import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/*
 * Field styles mirror the Input/Textarea primitives in components/ui/input.tsx.
 * Phase 0 doesn't export them (or a Select), and ui/* is owned by the
 * foundation — worth promoting this into components/ui in a later phase.
 */
const fieldClasses =
  "w-full rounded-st-sm border border-st-line bg-st-surface px-4 py-3 font-st-sans text-st-body text-st-ink " +
  "transition-colors duration-(--st-dur-fast) " +
  "focus:border-st-accent focus:outline-none focus-visible:outline-none " +
  "disabled:cursor-not-allowed disabled:opacity-50";

/** Styled native select matching the Input/Textarea field styling. */
export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="relative block">
      <select
        className={cn(fieldClasses, "appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 12 8"
        className="pointer-events-none absolute top-1/2 right-4 h-2 w-3 -translate-y-1/2 text-st-muted"
      >
        <path
          d="M1 1.5 6 6.5 11 1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  );
}
