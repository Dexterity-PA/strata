import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Start-here opener. One honest line on what Strata is (free education, not
 * licensed advice) before the page routes the visitor onward. Mount-triggered
 * reveals so the above-fold copy paints on first load, never gated on scroll.
 */
export function StartHero() {
  return (
    <Section spacing="none" container="narrow" className="pt-44 pb-st-section">
      <Reveal variant="fade" duration={0.8} trigger="mount">
        <Eyebrow>Start here</Eyebrow>
      </Reveal>

      <SplitText
        as="h1"
        delay={0.15}
        className="mt-6 max-w-3xl font-st-display text-st-h1"
      >
        Find your starting point
      </SplitText>

      <Reveal variant="fade" delay={0.7} duration={0.9} trigger="mount">
        <p className="mt-7 max-w-xl text-st-body-lg text-st-muted">
          Strata is a free, student-led volunteer project offering
          plain-language financial education, not licensed advice. Tell us
          roughly where you are and we will point you to the part that fits.
        </p>
      </Reveal>
    </Section>
  );
}
