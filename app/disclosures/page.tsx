import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  alternates: { canonical: "/disclosures" },
  title: "Disclosures",
  description:
    "Legal disclosures for Strata: a student-led volunteer initiative providing free financial education and planning support, not regulated advice.",
};

export default function Page() {
  return (
    <Section container="narrow" className="min-h-[60vh] pt-44">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-6 font-st-display text-st-h1">Disclosures</h1>
      <p className="mt-8 text-st-body-lg text-st-ink-soft">
        Strata is a student-led volunteer initiative providing financial
        education and planning support. It is not a registered investment
        adviser, broker-dealer, or licensed financial advisory firm, and nothing
        provided by Strata constitutes regulated financial, investment, legal,
        or tax advice. Information is general and educational. For decisions
        requiring a licensed professional, consult a qualified advisor.
      </p>
    </Section>
  );
}
