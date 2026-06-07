import { Reveal } from "@/components/animation/reveal";
import { Section } from "@/components/layout/section";

/**
 * Mission strip — one large editorial statement on deep navy. No heading,
 * no UI: the type is the section.
 */
export function Mission() {
  return (
    <Section tone="inverse">
      <div className="mx-auto max-w-4xl">
        <Reveal variant="up">
          <p className="font-st-display text-st-h2 text-st-paper/85">
            Most small businesses never get a straight answer about their own
            numbers. Accountants file taxes. Banks sell products. Almost no one
            sits down with an owner and explains what their cash flow is
            actually telling them.
          </p>
        </Reveal>
        <Reveal variant="up" delay={0.2}>
          <p className="mt-10 font-st-display text-st-h2 text-st-accent-bright">
            Strata exists to close that gap, at no cost.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
