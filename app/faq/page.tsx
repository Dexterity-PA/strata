import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { FaqAccordion, type FaqItem } from "./faq-accordion";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "FAQ",
  description:
    "Answers to common questions about Strata's free, volunteer-led financial education and planning support.",
};

interface FaqSection {
  title: string;
  items: FaqItem[];
}

const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "About the service",
    items: [
      {
        question: "What is Strata?",
        answer:
          "Strata is a free, student-led volunteer initiative offering financial education and planning support. We help you understand your own money situation and the options in front of you, so you can make decisions with more confidence.",
      },
      {
        question: "Is this really free?",
        answer:
          "Yes, completely. There are no fees, no paid tier, and nothing is sold. We are volunteers, so there is no bill now and none later.",
      },
      {
        question: "Who runs Strata?",
        answer:
          "Strata is run by students who care about making financial information clearer and easier to reach. We volunteer our time because good guidance is too often locked behind cost or jargon, and we think it should not be.",
      },
      {
        question: "Why do you offer this for free?",
        answer:
          "We started Strata to close a gap. Many people never get a plain, unbiased explanation of their finances without a sales pitch attached. Volunteering lets us help without anyone wondering what we are really selling.",
      },
      {
        question: "Are you licensed financial professionals?",
        answer:
          "No. Strata is an education and planning resource, not a licensed professional service, and we do not provide regulated financial advice. When a decision legally requires a licensed professional, we will point you toward one.",
      },
    ],
  },
  {
    title: "What to expect",
    items: [
      {
        question: "How do we get started?",
        answer:
          "Reach out through the contact form or by email and tell us a little about what you are hoping to sort out. We will arrange a first conversation from there.",
      },
      {
        question: "What happens in a first conversation?",
        answer:
          "We listen first. You tell us what is on your mind, whether that is a budget, debt, savings, or simply where to begin. We ask questions, walk through the numbers with you, and help you see the picture more clearly. There is no script and no pressure.",
      },
      {
        question: "What should I prepare beforehand?",
        answer:
          "Nothing formal is required. If you have them handy, a rough sense of your income, regular expenses, and any debts helps us be useful sooner. If you do not have those yet, we can work through it together.",
      },
      {
        question: "What do you help with?",
        answer:
          "We help you understand budgeting, saving, debt, and how everyday financial choices fit together. We explain terms, walk through trade-offs, and help you build a plan you understand and own.",
      },
      {
        question: "What do you not do?",
        answer:
          "We do not sell products, manage your money, earn commissions, or make decisions for you. We are here to teach and to help you plan, not to act as a licensed professional service.",
      },
      {
        question: "Will you tell me what to do with my money?",
        answer:
          "No. We help you understand your options and the trade-offs, but the choices are always yours. When something calls for a licensed professional, we will say so and point you toward the right kind of help.",
      },
      {
        question: "How often can we talk?",
        answer:
          "As often as is helpful. Some people come once to get unstuck, while others check in over time as things change. We will find a rhythm that fits you.",
      },
      {
        question: "How long is a typical conversation?",
        answer:
          "Usually around an hour, though it depends on what you want to cover. We would rather move at a pace that makes sense than rush through it.",
      },
    ],
  },
  {
    title: "Cost",
    items: [
      {
        question: "Are there any hidden fees?",
        answer:
          "None. Strata is free from start to finish. There is no upsell, no premium version, and no point where we ask for payment.",
      },
      {
        question: "What does it cost me later?",
        answer:
          "Nothing. There is no paid tier and nothing we will try to sell you down the line.",
      },
      {
        question: "Do I need to buy anything to use what you teach?",
        answer:
          "No. Everything we walk through uses tools and accounts you already have or can set up for free. We will never steer you toward a product we benefit from.",
      },
    ],
  },
  {
    title: "Privacy and data",
    items: [
      {
        question: "Is my information private?",
        answer:
          "Yes. Anything you share with us is kept confidential and used only to help you. We do not post it, sell it, or pass it to anyone else.",
      },
      {
        question: "What information do you need from me?",
        answer:
          "Only what helps us understand your situation. You decide how much to share, and you can leave anything out. We will never push for more than you are comfortable giving.",
      },
      {
        question: "How is my data handled?",
        answer:
          "We keep what you share to the minimum we need and treat it carefully. If you ask us to delete your information, we will.",
      },
      {
        question: "Can I stay anonymous?",
        answer:
          "Largely, yes. You can ask general questions without sharing personal details. A fuller conversation about your own numbers works better with some specifics, but you stay in control of what you reveal.",
      },
    ],
  },
  {
    title: "Who it's for",
    items: [
      {
        question: "Who is this for?",
        answer:
          "Anyone who wants to understand their finances better without a sales pitch. That includes individuals, families, and local small businesses, especially people who have struggled to find clear, unbiased guidance elsewhere.",
      },
      {
        question: "Is this only for people who are already good with money?",
        answer:
          "Not at all. Many people we talk with feel behind or overwhelmed. There is no level you need to reach first, and no question is too basic.",
      },
      {
        question: "I run a small business. Can you help?",
        answer:
          "Yes. We can walk through the basics of separating personal and business finances, budgeting, and understanding cash flow, all in plain language.",
      },
      {
        question: "What if my situation needs a licensed professional?",
        answer:
          "We will be honest about that. If your situation calls for someone licensed, such as a tax or legal specialist, we will tell you and help you figure out where to turn next.",
      },
    ],
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
        <Reveal variant="fade" duration={0.8}>
          <Eyebrow>FAQ</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          delay={0.15}
          className="mt-6 font-st-display text-st-h1"
        >
          Frequently asked questions
        </SplitText>
      </Section>

      <Section spacing="none" container="narrow" className="pb-st-section">
        <Reveal variant="fade" delay={0.3}>
          <div className="space-y-16">
            {FAQ_SECTIONS.map((section, i) => (
              <div key={section.title}>
                <h2 className="mb-2 font-st-display text-st-h2 text-st-ink">
                  {section.title}
                </h2>
                <FaqAccordion
                  items={section.items}
                  headingLevel={3}
                  initialOpenIndex={i === 0 ? 0 : null}
                />
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal variant="up" delay={0.15}>
          <div className="mt-16">
            <p className="font-st-display text-st-h3 text-st-ink">
              Still have a question?
            </p>
            <div className="mt-8">
              <Button href="/contact">Start a conversation</Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
