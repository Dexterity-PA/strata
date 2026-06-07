import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom `st-*` text tokens (app/globals.css) registered with tailwind-merge.
 *
 * tailwind-merge cannot infer the group of unknown `text-*` classes, so
 * without this a custom font-size (`text-st-h1`) and a custom text color
 * (`text-st-paper`) on the same element are treated as conflicting and one
 * is silently dropped. Any new `--text-st-*` or `--color-st-*` token that
 * produces a `text-*` utility MUST be added here (see README "Design
 * tokens").
 */
const ST_FONT_SIZES = [
  "display",
  "h1",
  "h2",
  "h3",
  "body-lg",
  "body",
  "small",
  "eyebrow",
];

const ST_COLORS = [
  "ink",
  "ink-soft",
  "bg",
  "surface",
  "muted",
  "line",
  "line-dark",
  "accent",
  "accent-bright",
  "paper",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ST_FONT_SIZES.map((n) => `st-${n}`) }],
      "text-color": [{ text: ST_COLORS.map((n) => `st-${n}`) }],
    },
  },
});

/** Merge class names with Tailwind-aware conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
