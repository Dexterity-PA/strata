/**
 * The tools index: one entry per card on /tools.
 *
 * The five new tools each link to their own route. The two original
 * calculators (slow-season buffer, avalanche vs. snowball) still live on the
 * /tools page itself for now, so their cards link to anchors there. A later
 * session migrates those two into /tools/<slug> routes; when it does, only the
 * `href` values below need to change.
 */

export interface ToolCard {
  /** Display name, set in Fraunces on the card. */
  name: string;
  /** Where the card links: a route for new tools, an anchor for the originals. */
  href: string;
  /** One-line, plain-language description of what the tool does. */
  description: string;
  /** Who it is mainly for. */
  audience: "Business" | "Individuals" | "Business or you";
}

export const TOOLS: ToolCard[] = [
  {
    name: "Breakeven calculator",
    href: "/tools/breakeven",
    description:
      "How many units, and how much in sales, you need to cover your costs.",
    audience: "Business",
  },
  {
    name: "Cash runway",
    href: "/tools/runway",
    description: "How many months your cash lasts at your current burn.",
    audience: "Business or you",
  },
  {
    name: "Pricing and margin checker",
    href: "/tools/pricing",
    description:
      "Set a price from a target margin, or check the margin a price gives you.",
    audience: "Business",
  },
  {
    name: "Slow-season buffer",
    href: "/tools#slow-season-buffer",
    description: "Size the cushion that carries you through a slow season.",
    audience: "Business",
  },
  {
    name: "Emergency fund target",
    href: "/tools/emergency-fund",
    description: "How big your safety net should be, and how long to build it.",
    audience: "Individuals",
  },
  {
    name: "Single-debt cost",
    href: "/tools/debt-cost",
    description: "What one debt costs you, and how long it takes to clear.",
    audience: "Individuals",
  },
  {
    name: "Avalanche or snowball",
    href: "/tools#avalanche-or-snowball",
    description: "Compare two debt payoff orders and see what each one costs.",
    audience: "Individuals",
  },
];
