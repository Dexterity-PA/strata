/**
 * JS mirror of the CSS motion tokens in globals.css (--ease-st-*, --st-dur-*).
 * Use these in GSAP / Framer Motion so the whole site shares one motion
 * vocabulary. Keep both files in sync if you change a value.
 */

/** Easing as cubic-bezier points (Framer Motion format). */
export const EASE = {
  /** --ease-st-out — the default reveal ease. Decisive start, long settle. */
  out: [0.16, 1, 0.3, 1] as const,
  /** --ease-st-in-out — for symmetric transitions. */
  inOut: [0.65, 0, 0.35, 1] as const,
};

/** Easing as CSS strings (GSAP accepts these directly). */
export const EASE_CSS = {
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
};

/** Durations in seconds (GSAP / Framer Motion units). */
export const DUR = {
  fast: 0.2, // --st-dur-fast
  base: 0.45, // --st-dur-base
  slow: 0.8, // --st-dur-slow
  reveal: 1.1, // --st-dur-reveal
};

/** Default stagger between sibling reveals (seconds). */
export const STAGGER = 0.08;
