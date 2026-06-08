import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { StrataMotif } from "@/components/strata/StrataMotif";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Exactly what Strata is, what happens when you reach out, and why it is free. Education and planning support, never licensed financial advice.",
};

/* ------------------------------------------------------------------ */
/*  Content (real, production copy in the founder's voice)            */
/* ------------------------------------------------------------------ */

const STEPS: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "You send a message",
    body: "Use the contact form or email me directly. Tell me a little about your situation and the one thing that is on your mind. A sentence or two is plenty. You do not need anything prepared.",
  },
  {
    title: "I read it and reply",
    body: "I will get back to you myself, usually within a few days, to find a time to talk. That might be a short call or a back-and-forth over email, whichever is easier for you. There is no cost and no obligation to keep going.",
  },
  {
    title: "We talk it through",
    body: "You bring your real numbers and I will listen. We go through what is actually happening in plain language, with no jargon and no judgment. If it helps to gather a few things first, there is a short prep sheet you can use.",
  },
  {
    title: "You leave with something you can use",
    body: "I will help you see what your numbers are telling you, lay out the options in front of you, and name a clear next step or two you can act on. If anything calls for a licensed professional, I will say so and point you toward one.",
  },
  {
    title: "We stay in touch if it helps",
    body: "You are welcome to come back with follow-up questions whenever they come up. Nothing about this turns into a bill later. It stays free, every time.",
  },
];

const DOES: readonly string[] = [
  "Explain how your money works in plain language, so the numbers stop feeling like a black box.",
  "Help you read your own numbers: cash flow, a slow season, debts, the cost of a decision you are weighing.",
  "Offer planning support: budgets, savings targets, payoff orders, and the trade-offs between your options.",
  "Point you toward the right kind of licensed professional when your situation genuinely calls for one.",
];

const DOES_NOT: readonly string[] = [
  "Give regulated or licensed financial advice. Strata is education and planning support, not advice.",
  "Sell you anything. There are no products, no commissions, and nothing waiting to be upsold.",
  "Manage your money or your accounts. I never touch your funds and will never ask for account access.",
  "Replace a licensed professional, an accountant, an attorney, or a tax pro when one is truly needed.",
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <Section
        spacing="none"
        container="narrow"
        className="pt-44 pb-st-section"
      >
        <Reveal variant="fade" duration={0.8}>
          <Eyebrow>How this works</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          delay={0.15}
          className="mt-6 max-w-3xl font-st-display text-st-h1"
        >
          How this works, and why it is free
        </SplitText>
        <Reveal variant="fade" delay={0.7} duration={0.9}>
          <p className="mt-6 max-w-xl text-st-body-lg text-st-muted">
            No catch, no sales, no fine print buried at the bottom. Here is
            exactly what Strata is, what happens when you reach out, and why
            none of it costs anything.
          </p>
        </Reveal>
      </Section>

      {/* What happens after you reach out */}
      <Section tone="surface">
        <Reveal variant="fade" duration={0.8}>
          <h2>
            <Eyebrow>What happens after you reach out</Eyebrow>
          </h2>
        </Reveal>
        <Reveal variant="fade" delay={0.15} duration={0.9}>
          <p className="mt-6 max-w-2xl text-st-body-lg text-st-muted">
            Reaching out is the whole first step. You do not need to prepare
            anything or have your finances figured out. Here is what follows, in
            order.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-st-lg border border-st-line bg-st-line">
          {STEPS.map((step, i) => (
            <li key={step.title} className="bg-st-surface">
              <Reveal variant="up" delay={i * 0.06}>
                <div className="flex flex-col gap-4 p-7 sm:flex-row sm:gap-8 sm:p-9">
                  <span
                    aria-hidden
                    className="font-st-display text-st-h3 leading-none text-st-accent/70 sm:w-16"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="max-w-2xl">
                    <h3 className="font-st-display text-st-h3 text-st-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-st-body leading-relaxed text-st-muted">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Pull-quote */}
      <Section spacing="sm" container="narrow">
        <Reveal variant="fade" duration={0.9}>
          <figure className="mx-auto max-w-3xl text-center">
            <span
              aria-hidden
              className="mx-auto block h-px w-12 bg-st-accent/50"
            />
            <blockquote className="mt-8 font-st-display text-st-h2 leading-snug text-st-ink">
              You do not need your finances figured out before you reach out.
              That is the part I can help with.
            </blockquote>
          </figure>
        </Reveal>
      </Section>

      {/* What Strata does, and what it doesn't */}
      <Section tone="surface">
        <Reveal variant="fade" duration={0.8}>
          <h2>
            <Eyebrow>What Strata does, and what it does not</Eyebrow>
          </h2>
        </Reveal>
        <Reveal variant="fade" delay={0.15} duration={0.9}>
          <p className="mt-6 max-w-2xl text-st-body-lg text-st-muted">
            Being useful means being clear about my own limits. Here is the
            honest line, in both directions.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal variant="up">
            <div className="h-full rounded-st-lg border border-st-line bg-st-bg p-8">
              <h3 className="font-st-display text-st-h3 text-st-ink">
                What it does
              </h3>
              <ul className="mt-6 grid gap-4">
                {DOES.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-st-body text-st-ink"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 h-px w-4 shrink-0 bg-st-accent"
                    />
                    <span className="text-st-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal variant="up" delay={0.1}>
            <div className="h-full rounded-st-lg border border-st-line bg-st-bg p-8">
              <h3 className="font-st-display text-st-h3 text-st-ink">
                What it does not
              </h3>
              <ul className="mt-6 grid gap-4">
                {DOES_NOT.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-st-body text-st-ink"
                  >
                    <span
                      aria-hidden
                      className="mt-2 shrink-0 font-st-sans text-st-muted/70"
                    >
                      &times;
                    </span>
                    <span className="text-st-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The honest line (canonical education-not-advice, in plain English) */}
      <Section
        tone="inverse"
        container="none"
        className="relative overflow-hidden"
      >
        <StrataMotif
          variant="lines"
          tone="navy"
          density="sparse"
          className="opacity-70"
        />
        <Container size="narrow" className="relative">
          <Reveal variant="fade" duration={0.9}>
            <p className="font-st-display text-st-h2 leading-snug text-st-paper">
              Strata offers education and planning support, not licensed
              financial advice. When something calls for a licensed
              professional, I will tell you directly and help you find one.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Who you'll be talking to */}
      <Section container="narrow">
        <Reveal variant="fade" duration={0.8}>
          <h2>
            <Eyebrow>Who you will be talking to</Eyebrow>
          </h2>
        </Reveal>
        <div className="mt-8 space-y-6">
          <Reveal variant="fade" delay={0.1} duration={0.9}>
            <p className="text-st-body-lg text-st-ink">
              I am Praneeth Annapureddy, and Strata is just me. I am a high
              school student with a background in economics and finance, and I
              have spent a lot of time in competitions and coursework learning
              how money and financial systems actually work, including the parts
              that quietly leave people out.
            </p>
          </Reveal>
          <Reveal variant="fade" delay={0.2} duration={0.9}>
            <p className="text-st-body-lg text-st-muted">
              I will be upfront about the obvious: I am young, and I am not a
              licensed professional. What I can offer is a real grasp of the
              fundamentals, the patience to explain them clearly, and the time
              to actually look at your situation with you. What I cannot offer
              is licensed advice, and I will not pretend otherwise. When your
              situation needs someone licensed, I will say so plainly and help
              you find them.
            </p>
          </Reveal>
          <Reveal variant="fade" delay={0.3} duration={0.9}>
            <p className="text-st-body-lg text-st-muted">
              I would rather tell you exactly what I am than oversell it. That
              honesty is part of the point.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Why it's free */}
      <Section tone="surface" container="narrow">
        <Reveal variant="fade" duration={0.8}>
          <h2>
            <Eyebrow>Why it is free</Eyebrow>
          </h2>
        </Reveal>
        <div className="mt-8 space-y-6">
          <Reveal variant="fade" delay={0.1} duration={0.9}>
            <p className="text-st-body-lg text-st-ink">
              The short answer: clear financial guidance is expensive, and the
              people who most need it are usually the least able to pay for it.
              That always struck me as backwards.
            </p>
          </Reveal>
          <Reveal variant="fade" delay={0.2} duration={0.9}>
            <p className="text-st-body-lg text-st-muted">
              Strata is a volunteer effort. I am not doing this to build a
              client list, collect leads, or sell you something down the road.
              There is no catch, because access is the whole point. If a
              plain-language conversation about your money saves you a bad
              decision or a little stress, that is the entire return I am
              looking for.
            </p>
          </Reveal>
          <Reveal variant="fade" delay={0.3} duration={0.9}>
            <p className="text-st-body-lg text-st-muted">
              So when you read &ldquo;free&rdquo; here, it means free. No trial,
              no tier, and no upsell waiting at the end.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Closing CTA */}
      <Section
        tone="inverse"
        container="none"
        className="relative overflow-hidden"
      >
        <StrataMotif
          variant="rings"
          tone="navy"
          density="sparse"
          className="opacity-80"
        />
        <Container size="narrow" className="relative">
          <Reveal variant="fade" duration={0.8}>
            <h2>
              <Eyebrow tone="inverse">Ready when you are</Eyebrow>
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={0.15} duration={0.9}>
            <p className="mt-8 max-w-2xl font-st-display text-st-h3 text-st-paper">
              Start with a sentence about what is on your mind. We can take it
              from there, at no cost and with no obligation.
            </p>
          </Reveal>
          <Reveal variant="fade" delay={0.3} className="mt-10">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button
                href="/contact"
                className="bg-st-paper text-st-ink hover:bg-st-surface hover:shadow-st-md"
              >
                Start a conversation
              </Button>
              <LinkPrep />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

/**
 * Small inline link to the prep sheet (added in the prep-sheet branch). Kept
 * as a plain anchor so it reads as a quiet secondary action beside the CTA.
 */
function LinkPrep() {
  return (
    <a
      href="/prep"
      className="font-st-sans text-st-small font-medium text-st-paper underline decoration-st-accent-bright/50 underline-offset-4 transition-colors duration-(--st-dur-fast) hover:decoration-st-accent-bright"
    >
      Or grab the prep sheet first
    </a>
  );
}
