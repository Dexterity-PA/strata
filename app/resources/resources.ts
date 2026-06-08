/**
 * The Resources hub data: downloadable guides and worksheets, grouped by
 * category. Distinct from /insights (written pieces) and /tools (interactive
 * calculators): everything here is a file you take with you.
 *
 * File hrefs point at /resources/files/*. Those asset files are placeholders
 * for now and are tracked as a follow-up; the sizes below are the expected
 * ballpark and should be confirmed once the real files land. Nothing here
 * is financial advice. The materials are educational templates only.
 */

export type ResourceCategory =
  | "Getting Started"
  | "Budgeting"
  | "Cash Flow"
  | "Debt";

/** A common file format for a downloadable resource. */
export type ResourceFormat = "PDF" | "Worksheet (XLSX)";

export interface Resource {
  /** Display title, set in Fraunces on the card. */
  title: string;
  /** One-line, plain-language summary of what the file helps you do. */
  description: string;
  /** File format shown on the download row. */
  format: ResourceFormat;
  /** Approximate file size, e.g. "180 KB". Placeholder until assets land. */
  size: string;
  /** Path to the downloadable file under /resources/files. */
  href: string;
}

export interface ResourceGroup {
  category: ResourceCategory;
  /** Short framing line shown under the category heading. */
  blurb: string;
  resources: Resource[];
}

/**
 * Groups render in this order. "Getting Started" leads so a first-time
 * visitor has an obvious place to begin.
 */
export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    category: "Getting Started",
    blurb: "Gather your numbers and name what you want your money to do.",
    resources: [
      {
        title: "Financial starting-point checklist",
        description:
          "A short list of the accounts, balances, and bills to pull together before you plan.",
        format: "PDF",
        size: "160 KB",
        href: "/resources/files/financial-starting-point-checklist.pdf",
      },
      {
        title: "Money goals worksheet",
        description:
          "Write down your short and long term goals in plain language, with room to set a rough timeline.",
        format: "PDF",
        size: "150 KB",
        href: "/resources/files/money-goals-worksheet.pdf",
      },
    ],
  },
  {
    category: "Budgeting",
    blurb: "Map what comes in against what goes out, month by month.",
    resources: [
      {
        title: "Monthly budget worksheet",
        description:
          "A simple template to lay income against fixed and variable expenses and see what is left.",
        format: "Worksheet (XLSX)",
        size: "32 KB",
        href: "/resources/files/monthly-budget-worksheet.xlsx",
      },
      {
        title: "Spending categories guide",
        description:
          "A reference list of common categories to help you sort where your money actually goes.",
        format: "PDF",
        size: "170 KB",
        href: "/resources/files/spending-categories-guide.pdf",
      },
    ],
  },
  {
    category: "Cash Flow",
    blurb: "Watch money move across the weeks so the patterns show up early.",
    resources: [
      {
        title: "Cash flow tracker",
        description:
          "Record money in and money out week by week so seasonal highs and lows become visible.",
        format: "Worksheet (XLSX)",
        size: "38 KB",
        href: "/resources/files/cash-flow-tracker.xlsx",
      },
      {
        title: "Slow-season planning checklist",
        description:
          "Steps to prepare for the months when income dips, written for seasonal and uneven earners.",
        format: "PDF",
        size: "165 KB",
        href: "/resources/files/slow-season-planning-checklist.pdf",
      },
    ],
  },
  {
    category: "Debt",
    blurb: "See what you owe in one place and lay out a way to clear it.",
    resources: [
      {
        title: "Debt payoff planner",
        description:
          "List your balances, rates, and minimums, then sketch an order to pay them down.",
        format: "Worksheet (XLSX)",
        size: "40 KB",
        href: "/resources/files/debt-payoff-planner.xlsx",
      },
      {
        title: "Debt snapshot worksheet",
        description:
          "A one-page view of every balance, rate, and minimum payment for a quick read of where you stand.",
        format: "PDF",
        size: "155 KB",
        href: "/resources/files/debt-snapshot-worksheet.pdf",
      },
    ],
  },
];
