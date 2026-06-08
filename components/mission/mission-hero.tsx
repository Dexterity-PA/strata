import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";

/**
 * Mission opener. States the belief up front, then frames Strata as the
 * small, free, student-led answer to it. Uses mount-triggered reveals so the
 * above-fold copy paints on first load rather than waiting on a scroll.
 */
export function MissionHero() {
  return (
    <Section spacing="none" container="narrow" className="pt-44 pb-st-section">
      <Reveal variant="fade" duration={0.8} trigger="mount">
        <Eyebrow>Mission</Eyebrow>
      </Reveal>

      <SplitText
        as="h1"
        delay={0.15}
        className="mt-6 max-w-3xl font-st-display text-st-h1"
      >
        Financial clarity should not be a luxury
      </SplitText>

      <Reveal variant="fade" delay={0.7} duration={0.9} trigger="mount">
        <p className="mt-7 max-w-xl text-st-body-lg text-st-muted">
          Strata exists for a simple reason: the people who would gain the most
          from a clear explanation of their money are often the least able to
          pay for one. This is a free, student-led volunteer effort built to
          close a little of that gap.
        </p>
      </Reveal>
    </Section>
  );
}
