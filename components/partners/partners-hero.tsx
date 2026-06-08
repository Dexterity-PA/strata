import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StrataMotif } from "@/components/strata/StrataMotif";

/**
 * Partners page opener: who Strata is and an open invitation for educators
 * and community organizations to use the free materials or work with us.
 */
export function PartnersHero() {
  return (
    <Section
      container="none"
      className="relative overflow-hidden bg-st-bg pt-44"
    >
      <StrataMotif
        variant="lines"
        tone="paper"
        density="sparse"
        className="opacity-60"
      />
      <div className="relative mx-auto w-full max-w-5xl px-st-gutter">
        <header className="max-w-2xl">
          <Reveal variant="fade" duration={0.8}>
            <Eyebrow>For schools and partners</Eyebrow>
          </Reveal>
          <SplitText
            as="h1"
            delay={0.15}
            className="mt-6 font-st-display text-st-h1 text-st-ink"
          >
            Free financial education for your school or group
          </SplitText>
          <Reveal variant="up" delay={0.1} className="mt-7">
            <p className="font-st-sans text-st-body-lg leading-relaxed text-st-muted">
              Strata is a student-led volunteer initiative offering free,
              plain-language financial education. Everything we make is open for
              educators and community organizations to use, and we would be glad
              to work with your group directly. This is education and planning
              support, not financial advice, and there is never a fee.
            </p>
          </Reveal>
        </header>
      </div>
    </Section>
  );
}
