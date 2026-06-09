/** Central site config: single source of truth for nav/footer/meta. */

export const SITE = {
  name: "Strata Financial Planning",
  shortName: "Strata",
  url: "https://stratafinancialplanning.com",
  email: "hello@stratafinancialplanning.com",
  description:
    "Free financial education and planning support for people who want clarity and a long view.",
};

/** A single navigable destination. */
export type NavLink = { label: string; href: string };

/** A labelled group of links rendered as a dropdown (desktop) or sublist (mobile). */
export type NavGroup = { label: string; children: readonly NavLink[] };

/** A top-level nav entry: either a direct link or a dropdown group. */
export type NavItem = NavLink | NavGroup;

/** Narrows a nav entry to a dropdown group. */
export function isNavGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

/**
 * Primary navigation. Top-level entries stay inline; the "Learn" group
 * collapses the educational pages into a single dropdown so the bar fits
 * one line. "Home" is rendered only in the mobile menu (the wordmark is the
 * home link on desktop).
 */
export const NAV_LINKS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Mission", href: "/mission" },
  { label: "Process", href: "/process" },
  { label: "How it works", href: "/how-it-works" },
  {
    label: "Learn",
    children: [
      { label: "Insights", href: "/insights" },
      { label: "Glossary", href: "/glossary" },
      { label: "Tools", href: "/tools" },
      { label: "Resources", href: "/resources" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclosures", href: "/disclosures" },
  { label: "Your information", href: "/your-information" },
] as const;

/** Flattens nav entries, expanding any group into its child links. */
function flattenNavItems(items: readonly NavItem[]): NavLink[] {
  return items.flatMap((item) =>
    isNavGroup(item) ? [...item.children] : [item],
  );
}

/**
 * Footer "Explore" list: every page flattened so dropdown items stay
 * discoverable here regardless of how the top nav groups them.
 */
export const FOOTER_EXPLORE_LINKS: readonly NavLink[] = [
  ...flattenNavItems(NAV_LINKS).filter((l) => l.href !== "/"),
  { label: "For schools", href: "/partners" },
  { label: "FAQ", href: "/faq" },
];
