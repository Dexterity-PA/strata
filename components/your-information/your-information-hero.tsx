import Link from "next/link";
import { Reveal } from "@/components/animation/reveal";
import { StrataMotif } from "@/components/strata/StrataMotif";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";

/**
 * Opener for the plain-English information page. Uses the mount trigger so the
 * copy is never gated behind a scroll on short viewports. A faint "lines"
 * motif sits behind it, matching the rest of the site.
 */
export function YourInformationHero() {
  return (
    <Section
      container="none"
      spacing="none"
      className="relative overflow-hidden pt-44 pb-st-section"
    >
      <StrataMotif
        variant="lines"
        tone="paper"
        density="sparse"
        className="opacity-60"
      />
      <Container size="narrow" className="relative">
        <Reveal variant="fade" duration={0.8} trigger="mount">
          <Eyebrow>Your information</Eyebrow>
        </Reveal>

        <Reveal variant="up" delay={0.1} duration={0.9} trigger="mount">
          <h1 className="mt-7 max-w-3xl font-st-display text-st-h1 text-st-ink">
            How we handle your information
          </h1>
        </Reveal>

        <Reveal variant="fade" delay={0.25} duration={0.9} trigger="mount">
          <p className="mt-8 max-w-2xl text-st-body-lg text-st-ink-soft">
            Strata is a free, student-led volunteer initiative offering
            financial education and planning support. We collect as little
            information as possible, and only what you choose to send us. This
            is the plain explanation of what happens to it. For the formal
            version, see our{" "}
            <Link
              href="/privacy"
              className="font-medium text-st-accent underline underline-offset-4 transition-colors duration-(--st-dur-fast) hover:text-st-ink"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
