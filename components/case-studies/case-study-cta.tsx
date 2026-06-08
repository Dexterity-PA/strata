import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animation/reveal";
import { StrataMotif } from "@/components/strata/StrataMotif";

interface CaseStudyCtaProps {
  /** The large closing line, in display type. */
  headline: string;
}

/**
 * Closing block for a case study. Restates that the walkthrough was one way of
 * thinking, not a recommendation, then points to /contact. The motif and
 * inverse tone match the closing CTA used elsewhere on the site.
 */
export function CaseStudyCta({ headline }: CaseStudyCtaProps) {
  return (
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
            <Eyebrow tone="inverse">One way of thinking, not advice</Eyebrow>
          </h2>
        </Reveal>
        <Reveal variant="fade" delay={0.15} duration={0.9}>
          <p className="mt-8 font-st-display text-st-h3 text-st-paper">
            {headline}
          </p>
        </Reveal>
        <Reveal variant="fade" delay={0.25} duration={0.9}>
          <p className="mt-6 max-w-2xl text-st-body text-st-paper/70">
            This walkthrough used made-up numbers to show how someone might
            reason through a situation like this. It is education, not financial
            advice. If you want to think through your own real numbers with
            someone, that is what a conversation is for.
          </p>
        </Reveal>
        <Reveal variant="fade" delay={0.35} className="mt-10">
          <Button
            href="/contact"
            className="bg-st-paper text-st-ink hover:bg-st-surface hover:shadow-st-md"
          >
            Start a conversation
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
