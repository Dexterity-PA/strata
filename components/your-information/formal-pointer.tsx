import { Reveal } from "@/components/animation/reveal";
import { StrataMotif } from "@/components/strata/StrataMotif";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";

/**
 * Closing band, set on deep navy, pointing to the formal Privacy Policy. It
 * states plainly that the legal page is the authoritative one, so this plain
 * page can never be read as contradicting it.
 */
export function FormalPointer() {
  return (
    <Section
      tone="inverse"
      container="none"
      spacing="none"
      className="relative overflow-hidden py-st-section"
    >
      <StrataMotif
        variant="lines"
        tone="navy"
        density="sparse"
        className="opacity-80"
      />
      <Container size="narrow" className="relative">
        <Reveal variant="fade">
          <h2>
            <Eyebrow tone="inverse">The formal version</Eyebrow>
          </h2>
        </Reveal>

        <Reveal delay={0.12} duration={0.9}>
          <p className="mt-8 max-w-2xl font-st-display text-st-h3 text-st-paper">
            This page is written to be read. Our Privacy Policy is the complete,
            legal version, and if the two ever seem to differ, the Privacy
            Policy is the one that counts.
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.25} className="mt-10">
          <Button
            href="/privacy"
            className="bg-st-paper text-st-ink hover:bg-st-surface hover:shadow-st-md"
          >
            Read the Privacy Policy
          </Button>
        </Reveal>

        <Reveal variant="fade" delay={0.35}>
          <p className="mt-8 font-st-sans text-st-small text-st-paper/70">
            Questions about your information? Email{" "}
            <a
              href="mailto:hello@stratafinancialplanning.com"
              className="underline underline-offset-4 transition-colors duration-(--st-dur-fast) hover:text-st-paper"
            >
              hello@stratafinancialplanning.com
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
