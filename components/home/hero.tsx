import { Parallax } from "@/components/animation/parallax";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ScrollToButton } from "@/components/home/scroll-to-button";
import { StrataMotif } from "@/components/strata/StrataMotif";

/**
 * Full-viewport hero. The background carries two slow parallax layers —
 * faint horizontal "strata" rules and a thin gold ring — for depth without
 * noise. Both are transform-only and hidden from assistive tech.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-st-bg pt-36 pb-24">
      {/* -- Background depth (decorative, transform-only) ---------------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Layered hairlines — the "strata" motif, drifting with the page */}
        <Parallax speed={0.5} className="absolute inset-x-0 top-[14%]">
          <div className="space-y-28 md:space-y-36">
            <div className="h-px w-full bg-st-ink/[0.05]" />
            <div className="h-px w-full bg-st-ink/[0.07]" />
            <div className="h-px w-full bg-st-accent/[0.14]" />
            <div className="h-px w-full bg-st-ink/[0.05]" />
          </div>
        </Parallax>
        {/* Concentric strata rings, drifting against the scroll for depth —
            the same motif system used across the site, not a one-off circle */}
        <Parallax
          speed={-0.35}
          className="absolute top-[2%] -right-40 hidden md:block lg:-right-24"
        >
          <div className="relative h-[34rem] w-[34rem]">
            <StrataMotif variant="rings" tone="paper" density="sparse" />
          </div>
        </Parallax>
      </div>

      <Container className="relative">
        <Reveal variant="fade" duration={0.8}>
          <Eyebrow>A student-led initiative</Eyebrow>
        </Reveal>

        <SplitText
          as="h1"
          delay={0.15}
          className="mt-7 max-w-5xl font-st-display text-st-display"
        >
          Good financial guidance shouldn&rsquo;t depend on who you can afford.
        </SplitText>

        <Reveal variant="fade" delay={0.7} duration={0.9}>
          <p className="mt-8 max-w-xl text-st-body-lg text-st-muted">
            Strata is a volunteer effort offering free financial education and
            planning support to local small businesses and the people who keep
            them running.
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.95} duration={0.9}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="/start">Start here</Button>
            <ScrollToButton target="#process">See how it works</ScrollToButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
