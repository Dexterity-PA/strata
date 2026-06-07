/** Central site config — single source of truth for nav/footer/meta. */

export const SITE = {
  name: "Strata Financial Planning",
  shortName: "Strata",
  url: "https://stratafinancialplanning.com",
  description:
    "Independent financial planning for people who want clarity, structure, and a long view.",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclosures", href: "/disclosures" },
] as const;

export const FOOTER_EXPLORE_LINKS = [
  ...NAV_LINKS.filter((l) => l.href !== "/"),
  { label: "FAQ", href: "/faq" },
] as const;
