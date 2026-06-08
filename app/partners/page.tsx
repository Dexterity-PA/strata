import type { Metadata } from "next";
import { PartnersHero } from "@/components/partners/partners-hero";
import { WhatWeOffer } from "@/components/partners/what-we-offer";
import { Sessions } from "@/components/partners/sessions";
import { PartnersCta } from "@/components/partners/partners-cta";

export const metadata: Metadata = {
  alternates: { canonical: "/partners" },
  title: "For schools and partners",
  description:
    "Strata is a free, volunteer-led financial education initiative. Educators and community organizations can use the free guides, tools, and glossary, or ask about a volunteer-led session.",
};

export default function PartnersPage() {
  return (
    <>
      <PartnersHero />
      <WhatWeOffer />
      <Sessions />
      <PartnersCta />
    </>
  );
}
