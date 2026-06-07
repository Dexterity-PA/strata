import { Reveal } from "@/components/animation/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";

/**
 * The plain-dealing disclosure, set apart on a deep navy band so it reads
 * as deliberate, not buried fine print.
 */
export function HonestPart() {
  return (
    <Section tone="inverse" container="narrow">
      <Reveal variant="fade" duration={0.8}>
        <h2>
          <Eyebrow tone="inverse">The honest part</Eyebrow>
        </h2>
      </Reveal>

      <Reveal delay={0.15} duration={0.9}>
        <p className="mt-8 font-st-display text-st-h3 text-st-paper">
          Strata offers education and planning support, not licensed financial
          advice. I&rsquo;ll always be upfront about what I can and can&rsquo;t
          help with, and when something calls for a licensed professional,
          I&rsquo;ll tell you directly.
        </p>
      </Reveal>
    </Section>
  );
}
