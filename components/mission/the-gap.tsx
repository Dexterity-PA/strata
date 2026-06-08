import { Reveal } from "@/components/animation/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";

/**
 * The "why" at altitude: the uneven distribution of good financial guidance.
 * Kept qualitative and grounded. No impact figures, no claims about how many
 * people are affected, because those would need real data to stand behind.
 */
export function TheGap() {
  return (
    <Section tone="surface" container="narrow">
      <Reveal variant="fade" duration={0.8}>
        <h2>
          <Eyebrow>The gap</Eyebrow>
        </h2>
      </Reveal>

      <div className="mt-8 space-y-6">
        <Reveal variant="fade" delay={0.1} duration={0.9}>
          <p className="text-st-body-lg text-st-ink">
            Good financial guidance has long been organized around people who
            already have money to manage. Most of it is sold as a service, which
            means the clearest explanations tend to reach the people who can
            most afford to pay for them. The result is a quiet kind of
            unfairness: help flows toward those who need it least.
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.2} duration={0.9}>
          <p className="text-st-body-lg text-st-muted">
            At the same time, ordinary money decisions have not gotten any
            simpler. Choosing a repayment order, sizing a savings buffer,
            reading the fine print on a loan: none of it is beyond anyone, but
            most of us were never walked through it. The gap is rarely a
            shortage of information. It is the shortage of someone to make sense
            of that information with you, in plain language, with nothing to
            sell at the end.
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.3} duration={0.9}>
          <p className="text-st-body-lg text-st-muted">
            Strata does not pretend to fix that gap at any scale. It is one
            person offering to sit on the same side of the table as you and work
            through the numbers, for free, for the people around them who have
            been left to figure it out alone.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
