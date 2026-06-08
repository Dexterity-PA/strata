/** Central site config — single source of truth for nav/footer/meta. */

export const SITE = {
  name: "Strata Financial Planning",
  shortName: "Strata",
  url: "https://stratafinancialplanning.com",
  email: "hello@stratafinancialplanning.com",
  description:
    "Free financial education and planning support for people who want clarity and a long view.",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Mission", href: "/mission" },
  { label: "Process", href: "/process" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Tools", href: "/tools" },
  { label: "Resources", href: "/resources" },
  { label: "Glossary", href: "/glossary" },
  { label: "Contact", href: "/contact" },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclosures", href: "/disclosures" },
  { label: "Your information", href: "/your-information" },
] as const;

export const FOOTER_EXPLORE_LINKS = [
  ...NAV_LINKS.filter((l) => l.href !== "/"),
  { label: "For schools", href: "/partners" },
  { label: "FAQ", href: "/faq" },
] as const;
