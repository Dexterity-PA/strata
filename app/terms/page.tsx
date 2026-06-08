import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The plain-language terms for using Strata's free, educational website.",
};

const SECTIONS = [
  {
    heading: "What Strata is",
    body: [
      "Strata is a student-led volunteer initiative offering free financial education and planning support. There are no fees, no paid tier, and nothing for sale. Using this site costs you nothing, now or later.",
    ],
  },
  {
    heading: "Education, not regulated advice",
    body: [
      "Strata is not a registered investment adviser, broker-dealer, or licensed financial advisory firm. Everything on this site, and everything shared in conversations with Strata, is general and educational. It is not regulated financial, investment, legal, or tax advice.",
      "Financial decisions are yours to make. For decisions that require a licensed professional, consult a qualified advisor. Where that's the case, we'll say so and point you to one.",
    ],
  },
  {
    heading: "Using this site",
    body: [
      "The site and its content are provided as-is, free of charge, and without warranties of any kind. We work to keep information accurate and current, but we may change, add, or remove content at any time without notice.",
      "To the extent permitted by law, Strata isn't liable for losses arising from decisions made on the basis of the general educational information provided here.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "If these terms change, we'll update this page and the date above. Continuing to use the site after a change means you accept the updated terms.",
    ],
  },
  {
    heading: "Questions",
    body: ["If anything here is unclear, email praneeth.a2027@gmail.com."],
  },
];

export default function Page() {
  return (
    <Section container="narrow" className="pt-44">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-6 font-st-display text-st-h1">Terms of Service</h1>
      <p className="mt-4 font-st-sans text-st-small text-st-muted">
        Last updated: June 6, 2026
      </p>
      <p className="mt-8 text-st-body-lg text-st-ink-soft">
        These terms are short because the site is simple: Strata is a free,
        educational, volunteer-run project. Here&apos;s what that means for you.
      </p>
      <div className="mt-12 space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.heading}>
            <h2 className="font-st-display text-st-h3 text-st-ink">
              {section.heading}
            </h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-st-body text-st-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </Section>
  );
}
