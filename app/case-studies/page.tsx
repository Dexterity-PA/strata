import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { StrataMotif } from "@/components/strata/StrataMotif";

export const metadata: Metadata = {
  alternates: { canonical: "/case-studies" },
  title: "Case studies",
  description:
    "Two illustrative walkthroughs of how someone might reason through a money question. Made-up people and numbers, shown as education, never as advice.",
};

interface CaseStudyCard {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
}

const CASE_STUDIES: readonly CaseStudyCard[] = [
  {
    eyebrow: "Small business",
    title: "A seasonal business and an uneven year",
    description:
      "A made-up landscaper with a busy summer and a quiet winter, and the questions someone might ask to make a slow season feel less like a cliff.",
    href: "/case-studies/small-business",
  },
  {
    eyebrow: "An individual",
    title: "A first paycheck and a couple of balances",
    description:
      "A made-up new hire with two credit cards, and the questions someone might ask to turn a vague sense of being behind into a plan they understand.",
    href: "/case-studies/individual",
  },
];

export default function CaseStudiesIndexPage() {
  return (
    <>
      {/* Hero */}
      <Section container="none" className="relative overflow-hidden bg-st-bg">
        <StrataMotif
          variant="lines"
          tone="paper"
          density="sparse"
          className="opacity-60"
        />
        <div className="relative mx-auto w-full max-w-5xl px-st-gutter">
          <header className="max-w-2xl">
            <Reveal variant="fade" trigger="mount">
              <Eyebrow>Case studies</Eyebrow>
            </Reveal>
            <SplitText
              as="h1"
              className="mt-5 font-st-display text-st-h1 text-st-ink"
            >
              How someone might think it through
            </SplitText>
            <Reveal variant="up" delay={0.1} trigger="mount">
              <p className="mt-6 font-st-sans text-st-body-lg leading-relaxed text-st-muted">
                Two walkthroughs that follow a made-up person through a money
                question, step by step. They are here to show how to reason
                through a situation: what to ask, what to look at, and which
                concepts and tools apply. The people and every dollar figure are
                invented. This is education and a way of thinking, never
                financial advice.
              </p>
            </Reveal>
          </header>
        </div>
      </Section>

      {/* The two walkthroughs */}
      <Section tone="surface" container="narrow" spacing="sm">
        <ul className="grid gap-6 lg:gap-8">
          {CASE_STUDIES.map((study, i) => (
            <li key={study.href}>
              <Reveal trigger="mount" variant="up" delay={i * 0.05}>
                <Link
                  href={study.href}
                  className="group block rounded-st-lg border border-st-line bg-st-bg p-8 transition-[border-color,box-shadow,transform] duration-(--st-dur-fast) ease-st-out hover:-translate-y-0.5 hover:border-st-accent hover:shadow-st-md sm:p-10"
                >
                  <Eyebrow>{study.eyebrow}</Eyebrow>
                  <h2 className="mt-5 font-st-display text-st-h2 text-st-ink">
                    {study.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-st-body-lg text-st-muted">
                    {study.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-st-sans text-st-small font-medium text-st-accent">
                    Read the walkthrough
                    <span
                      aria-hidden
                      className="transition-transform duration-(--st-dur-fast) ease-st-out group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
