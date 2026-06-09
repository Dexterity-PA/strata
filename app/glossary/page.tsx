import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { StrataMotif } from "@/components/strata/StrataMotif";
import { GlossaryBrowser } from "@/components/glossary/glossary-browser";
import { GLOSSARY_TERMS } from "./terms";

export const metadata: Metadata = {
  alternates: { canonical: "/glossary" },
  title: "Glossary",
  description:
    "A plain-language glossary of personal and small-business finance terms. Search by keyword, filter by category, or browse A to Z. Educational and free.",
};

export default function GlossaryPage() {
  return (
    <>
      {/* Hero */}
      <Section
        spacing="none"
        container="none"
        className="relative overflow-hidden"
      >
        <StrataMotif
          variant="lines"
          tone="paper"
          density="sparse"
          className="opacity-60"
        />
        <Container size="wide" className="relative pt-44 pb-st-section-sm">
          <Reveal variant="fade" duration={0.8}>
            <Eyebrow>Glossary</Eyebrow>
          </Reveal>
          <SplitText
            as="h1"
            delay={0.15}
            className="mt-6 max-w-3xl font-st-display text-st-h1 text-st-ink"
          >
            Money terms, in plain English
          </SplitText>
          <Reveal variant="fade" delay={0.7} duration={0.9}>
            <p className="mt-6 max-w-xl text-st-body-lg text-st-muted">
              A growing, jargon-free glossary of the personal and small-business
              finance words that come up most. Search for a term, filter by
              topic, or browse from A to Z.
            </p>
          </Reveal>
          <Reveal variant="fade" delay={0.85}>
            <p className="mt-6 max-w-xl font-st-sans text-st-small text-st-muted">
              These definitions are educational and general by design. They
              explain what words mean, not what you should do, and they are not
              financial advice or a recommendation for your situation.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Browser: search, filter, and the A to Z list. A fade (no transform)
          keeps the sticky A to Z bar inside working: a transformed ancestor
          would re-anchor position: sticky and break it. */}
      <Section spacing="none" container="wide" className="pb-st-section">
        <Reveal variant="fade" delay={0.1} trigger="mount">
          <GlossaryBrowser terms={GLOSSARY_TERMS} />
        </Reveal>
      </Section>

      {/* Closing prompt so the page never dead-ends. */}
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
        <Container size="narrow" className="relative text-center">
          {/* This CTA sits below the full A to Z list, which makes the page
              many thousands of pixels tall. A scroll trigger here leaves the
              block stuck at opacity:0 on load, so use the mount trigger. */}
          <Reveal variant="fade" duration={0.9} trigger="mount">
            <p className="font-st-display text-st-h2 leading-snug text-st-paper">
              Ran into a word that still feels fuzzy?
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.15} trigger="mount">
            <p className="mx-auto mt-5 max-w-xl text-st-body-lg text-st-paper/80">
              Tell us the term and we will explain it in plain language and add
              it here for the next person.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.25} trigger="mount">
            <div className="mt-8">
              <Button href="/contact">Start a conversation</Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
