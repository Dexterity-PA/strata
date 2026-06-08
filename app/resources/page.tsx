import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { GUIDES, readingTime } from "./guides";

export const metadata: Metadata = {
  alternates: { canonical: "/resources" },
  title: "Resources",
  description:
    "Plain-English guides to the financial basics: budgeting, saving, credit, interest, and banking. Free educational reading, with no jargon and nothing to sell.",
};

export default function Page() {
  return (
    <>
      <Section
        spacing="none"
        container="narrow"
        className="pt-44 pb-st-section-sm"
      >
        <Reveal variant="fade" duration={0.8}>
          <Eyebrow>Resources</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          delay={0.15}
          className="mt-6 font-st-display text-st-h1"
        >
          The basics, explained plainly
        </SplitText>
        <Reveal variant="fade" delay={0.7} duration={0.9}>
          <p className="mt-6 max-w-xl text-st-body-lg text-st-muted">
            Short, jargon-free guides to the financial fundamentals. Learning
            material you can read at your own pace, written to teach rather than
            to sell. This is general education, not personalized financial
            guidance.
          </p>
        </Reveal>
      </Section>

      <Section spacing="none" className="pb-st-section">
        <ul className="grid gap-px overflow-hidden rounded-st-md border border-st-line bg-st-line sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide, i) => (
            <li key={guide.slug} className="bg-st-surface">
              <Reveal variant="up" delay={i * 0.08} className="h-full">
                <Link
                  href={`/resources/${guide.slug}`}
                  className="group flex h-full flex-col p-8"
                >
                  <p className="font-st-sans text-st-eyebrow font-medium uppercase text-st-accent">
                    {guide.category}
                  </p>
                  <h2 className="mt-4 font-st-display text-st-h3 text-st-ink transition-colors duration-(--st-dur-fast) group-hover:text-st-accent">
                    {guide.title}
                  </h2>
                  <p className="mt-3 text-st-body text-st-muted">
                    {guide.excerpt}
                  </p>
                  <span className="mt-auto flex items-center justify-between pt-8 font-st-sans text-st-small font-medium text-st-accent">
                    <span>
                      Read the guide
                      <span
                        aria-hidden
                        className="ml-2 inline-block transition-transform duration-(--st-dur-fast) ease-st-out group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                    <span className="font-normal text-st-muted">
                      {readingTime(guide)}
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal variant="fade" delay={0.15}>
          <p className="mt-10 text-center font-st-sans text-st-small text-st-muted">
            Is there a topic you’d like covered? Send it over and we’ll add it.
          </p>
          <div className="mt-6 text-center">
            <Button href="/contact">Start a conversation</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
