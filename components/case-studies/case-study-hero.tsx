import type { ReactNode } from "react";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { IllustrativeBanner } from "./illustrative-banner";

interface CaseStudyHeroProps {
  /** Short uppercase eyebrow, e.g. "Case study, small business". */
  eyebrow: string;
  /** The h1. Plain string so the word-mask reveal can split it. */
  title: string;
  /** Intro paragraph under the title. */
  intro: ReactNode;
  /** Made-up character name for the framing banner. */
  name: string;
  /** Short clause describing the made-up situation, ends with a period. */
  situation: string;
}

/**
 * Shared hero for both case studies: eyebrow, masked title, intro, then the
 * illustrative-example framing banner. Reveals use the mount trigger because
 * this block sits at the top of a long page and must never wait on a scroll.
 */
export function CaseStudyHero({
  eyebrow,
  title,
  intro,
  name,
  situation,
}: CaseStudyHeroProps) {
  return (
    <Section spacing="none" container="narrow" className="pt-44 pb-st-section">
      <Reveal variant="fade" duration={0.8} trigger="mount">
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <SplitText
        as="h1"
        delay={0.15}
        className="mt-6 font-st-display text-st-h1 text-st-ink"
      >
        {title}
      </SplitText>
      <Reveal variant="fade" delay={0.5} duration={0.9} trigger="mount">
        <p className="mt-6 max-w-xl text-st-body-lg text-st-muted">{intro}</p>
      </Reveal>
      <Reveal
        variant="fade"
        delay={0.65}
        duration={0.9}
        trigger="mount"
        className="mt-12"
      >
        <IllustrativeBanner name={name} situation={situation} />
      </Reveal>
    </Section>
  );
}
