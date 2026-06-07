import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { FaqAccordion, type FaqItem } from "./faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Strata's free, volunteer-led financial education and planning support.",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is this really free?",
    answer:
      "Yes, completely. Strata is a volunteer initiative. There are no fees and nothing is sold.",
  },
  {
    question: "Are you a licensed financial advisor?",
    answer:
      "No. Strata provides financial education and planning support, not regulated financial advice. For decisions that legally require a licensed professional, I'll point you to one.",
  },
  {
    question: "Who do you work with?",
    answer:
      "Local small businesses and individuals, especially people who've struggled to get clear, unbiased financial guidance elsewhere.",
  },
  {
    question: "What does it cost me later?",
    answer: "Nothing. There's no paid tier and no upsell.",
  },
  {
    question: "How do we start?",
    answer:
      "Reach out through the contact form or by email, and we'll set up a first conversation.",
  },
  {
    question: "Is my information private?",
    answer: "Yes. Anything you share is kept confidential.",
  },
];

export default function Page() {
  return (
    <>
      <Section
        spacing="none"
        container="narrow"
        className="pt-44 pb-st-section-sm"
      >
        <Eyebrow>FAQ</Eyebrow>
        <SplitText
          as="h1"
          delay={0.1}
          className="mt-6 font-st-display text-st-h1"
        >
          Frequently asked questions
        </SplitText>
      </Section>

      <Section spacing="none" container="narrow" className="pb-st-section">
        <Reveal variant="fade" delay={0.3}>
          <FaqAccordion items={FAQ_ITEMS} />
        </Reveal>
      </Section>
    </>
  );
}
