import { Reveal } from "@/components/animation/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";
import { StrataMotif } from "@/components/strata/StrataMotif";

/**
 * Closing band. For visitors who do not fit neatly into either path, a single
 * education-framed CTA into the conversation. Mount-triggered so nothing on
 * the band can be left stuck hidden on short viewports.
 */
export function StartCta() {
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
        <Reveal variant="fade" duration={0.8} trigger="mount">
          <h2>
            <Eyebrow tone="inverse">Still deciding</Eyebrow>
          </h2>
        </Reveal>

        <Reveal variant="fade" delay={0.15} duration={0.9} trigger="mount">
          <p className="mt-8 max-w-2xl font-st-display text-st-h3 text-st-paper">
            Not sure which path fits? That&rsquo;s completely fine. Start a
            conversation and we will help you understand your options, at no
            cost.
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.3} className="mt-10" trigger="mount">
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
