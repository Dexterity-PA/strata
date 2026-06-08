import { Reveal } from "@/components/animation/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";
import { StrataMotif } from "@/components/strata/StrataMotif";

/**
 * Closing CTA on a deep navy band with the strata motif behind it. Leads to
 * the services overview, with the conversation as the quieter second step.
 */
export function MissionCta() {
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
            <Eyebrow tone="inverse">Put it to use</Eyebrow>
          </h2>
        </Reveal>

        <Reveal variant="fade" delay={0.15} duration={0.9}>
          <p className="mt-8 max-w-2xl font-st-display text-st-h3 text-st-paper">
            If any of this is the kind of help you have been looking for, the
            door is open and there is no cost to walk through it.
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.3} className="mt-10">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              href="/services"
              className="bg-st-paper text-st-ink hover:bg-st-surface hover:shadow-st-md"
            >
              See what Strata offers
            </Button>
            <a
              href="/contact"
              className="font-st-sans text-st-small font-medium text-st-paper underline decoration-st-accent-bright/50 underline-offset-4 transition-colors duration-(--st-dur-fast) hover:decoration-st-accent-bright"
            >
              Or start a conversation
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
