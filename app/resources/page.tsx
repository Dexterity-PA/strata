import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { StrataMotif } from "@/components/strata/StrataMotif";
import { ResourceCard } from "@/components/resources/resource-card";
import { RESOURCE_GROUPS } from "./resources";

export const metadata: Metadata = {
  alternates: { canonical: "/resources" },
  title: "Resources",
  description:
    "Free guides and worksheets: budget and cash flow templates, a slow-season planning checklist, and debt payoff worksheets. Download and use on your own.",
};

export default function ResourcesPage() {
  return (
    <>
      {/* Intro: what the hub is, and how it differs from reading or tools. */}
      <Section container="none" className="relative overflow-hidden bg-st-bg">
        <StrataMotif
          variant="lines"
          tone="paper"
          density="sparse"
          className="opacity-60"
        />
        <div className="relative mx-auto w-full max-w-5xl px-st-gutter">
          <header className="max-w-2xl">
            <Reveal variant="fade">
              <Eyebrow>Resources</Eyebrow>
            </Reveal>
            <SplitText
              as="h1"
              className="mt-5 font-st-display text-st-h1 text-st-ink"
            >
              Guides and worksheets to take with you
            </SplitText>
            <Reveal variant="up" delay={0.1}>
              <p className="mt-6 font-st-sans text-st-body-lg leading-relaxed text-st-muted">
                A curated set of printable guides and fillable worksheets for
                the everyday work of planning: building a budget, watching your
                cash flow, getting ready for a slow season, and paying down
                debt. Download what is useful, work through it at your own pace,
                and come back when you need it. Everything here is an
                educational template, not financial advice.
              </p>
            </Reveal>
          </header>
        </div>
      </Section>

      {/* One block per category: heading, framing line, then a grid of
          downloadable cards sharing the hairline-gap treatment used across
          the site index grids. */}
      <Section spacing="none" className="pb-st-section">
        <div className="flex flex-col gap-16 lg:gap-20">
          {RESOURCE_GROUPS.map((group) => (
            <div key={group.category}>
              <Reveal variant="up">
                <div className="max-w-2xl">
                  <h2 className="font-st-display text-st-h2 text-st-ink">
                    {group.category}
                  </h2>
                  <p className="mt-3 font-st-sans text-st-body leading-relaxed text-st-muted">
                    {group.blurb}
                  </p>
                </div>
              </Reveal>
              <Reveal variant="up" delay={0.05} className="mt-8">
                <ul className="grid gap-px overflow-hidden rounded-st-md border border-st-line bg-st-line sm:grid-cols-2">
                  {group.resources.map((resource) => (
                    <li key={resource.href} className="h-full">
                      <ResourceCard resource={resource} />
                    </li>
                  ))}
                  {/* Keep a 2-up row complete if a category ever has an odd
                      count, so the hairline gap never shows as a bare block. */}
                  {group.resources.length % 2 === 1 ? (
                    <li aria-hidden className="hidden bg-st-bg sm:block" />
                  ) : null}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* Closing CTA on deep navy. No fees, no products, just an invitation
          to talk things through if a worksheet raises a question. */}
      <Section tone="inverse" className="border-b border-st-line-dark">
        <div className="mx-auto max-w-3xl text-center">
          <SplitText
            as="h2"
            className="font-st-display text-st-h1 text-st-paper"
          >
            Want a second set of eyes?
          </SplitText>
          <Reveal variant="fade" delay={0.5}>
            <p className="mt-7 text-st-body-lg text-st-paper/70">
              These templates are yours to use freely. If working through one
              raises a question, start a conversation and we can look at it
              together.
            </p>
          </Reveal>
          <Reveal variant="fade" delay={0.75}>
            <div className="mt-11">
              <Button
                href="/contact"
                className="bg-st-accent-bright text-st-ink hover:bg-st-accent-bright hover:shadow-st-md"
              >
                Start a conversation
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
