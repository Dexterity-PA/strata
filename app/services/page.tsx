import type { Metadata } from "next";
import { DifferentCta } from "@/components/services/different-cta";
import { ServiceList } from "@/components/services/service-list";
import { ServicesHero } from "@/components/services/services-hero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strata offers financial education and planning support, not regulated financial advice. It's all free.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceList
        id="small-businesses"
        eyebrow="01"
        title="For small businesses"
        tone="surface"
        items={[
          {
            lead: "Cash flow clarity",
            detail: "understand what's coming in, going out, and when",
          },
          {
            lead: "Seasonal planning",
            detail: "prepare for slow months before they arrive",
          },
          {
            lead: "Pricing and margin basics",
            detail: "know whether the numbers actually work",
          },
          {
            lead: "Growth readiness",
            detail: "figure out when it's safe to hire, expand, or invest",
          },
          { lead: "Simple, plain-language financial reviews" },
        ]}
      />
      <ServiceList
        id="individuals-families"
        eyebrow="02"
        title="For individuals & families"
        items={[
          {
            lead: "Budgeting and cash flow that fits real life",
            detail: "a simple system you'll actually keep using",
          },
          {
            lead: "Debt payoff strategy",
            detail: "a clear order of attack so progress feels real",
          },
          {
            lead: "Saving and goal planning",
            detail: "turn vague intentions into specific, reachable targets",
          },
          {
            lead: "Education and college funding basics",
            detail: "understand the options before the bills arrive",
          },
          {
            lead: "Foundational investing concepts",
            detail: "the core ideas explained without the jargon",
          },
        ]}
      />
      <DifferentCta />
    </>
  );
}
