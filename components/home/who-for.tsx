import { Reveal } from "@/components/animation/reveal";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";

/** Quiet, narrow editorial section — who Strata is for. */
export function WhoFor() {
  return (
    <Section container="narrow">
      <Reveal variant="fade">
        <Eyebrow>Who this is for</Eyebrow>
      </Reveal>
      <Reveal variant="up" delay={0.15}>
        <p className="mt-8 font-st-display text-st-h3 leading-relaxed text-st-ink-soft">
          Local restaurants, family shops, first-time savers, anyone who&rsquo;s
          been talked past instead of talked to. If money decisions feel heavier
          than they should, that&rsquo;s exactly who we&rsquo;re here for.
        </p>
      </Reveal>
    </Section>
  );
}
