import { Parallax } from "@/components/animation/parallax";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Home placeholder. Real page content arrives in a later phase — the demo
 * blocks below exist only to prove the animation system end-to-end
 * (SplitText, Reveal variants, Parallax, Section tones) and will be
 * replaced wholesale.
 */
export default function HomePage() {
  return (
    <>
      <Section className="pt-44">
        <Eyebrow>Phase 0 — Foundation</Eyebrow>
        <SplitText
          as="h1"
          className="mt-6 max-w-3xl font-st-display text-st-display"
        >
          Home
        </SplitText>
        <Reveal variant="fade" delay={0.3} className="mt-6 max-w-xl">
          <p className="text-st-body-lg text-st-muted">
            Placeholder page. The blocks below are an animation-system demo, not
            site content.
          </p>
        </Reveal>
      </Section>

      {/* ---- DEMO: Reveal variants -------------------------------------- */}
      <Section spacing="sm">
        <Eyebrow>Demo — Reveal</Eyebrow>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {(["fade", "up", "clip"] as const).map((variant, i) => (
            <Reveal key={variant} variant={variant} delay={i * 0.12}>
              <div className="rounded-st-md border border-st-line bg-st-surface p-8 shadow-st-sm">
                <p className="font-st-display text-st-h3 text-st-ink">
                  variant=&quot;{variant}&quot;
                </p>
                <p className="mt-2 text-st-small text-st-muted">
                  Transform and opacity only. Respects reduced motion.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- DEMO: SplitText on inverse ground -------------------------- */}
      <Section tone="inverse">
        <Eyebrow tone="inverse">Demo — SplitText</Eyebrow>
        <SplitText as="p" className="mt-8 max-w-4xl font-st-display text-st-h1">
          Headlines rise out of a masked line, word by word.
        </SplitText>
      </Section>

      {/* ---- DEMO: Parallax depth --------------------------------------- */}
      <Section spacing="base">
        <Eyebrow>Demo — Parallax</Eyebrow>
        <div className="mt-10 grid items-center gap-6 md:grid-cols-3">
          <Parallax speed={0.6}>
            <div className="flex h-72 items-end rounded-st-md bg-st-ink p-6">
              <p className="text-st-small text-st-paper/70">speed 0.6</p>
            </div>
          </Parallax>
          <Parallax speed={-0.4}>
            <div className="flex h-72 items-end rounded-st-md border border-st-accent/40 bg-st-surface p-6 shadow-st-md">
              <p className="text-st-small text-st-muted">speed −0.4</p>
            </div>
          </Parallax>
          <Parallax speed={1}>
            <div className="flex h-72 items-end rounded-st-md bg-st-accent/15 p-6">
              <p className="text-st-small text-st-accent">speed 1.0</p>
            </div>
          </Parallax>
        </div>
        <Reveal variant="up" className="mt-16">
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/contact">Primary button</Button>
            <Button href="/services" variant="secondary">
              Secondary button
            </Button>
            <Button href="/about" variant="ghost">
              Ghost button
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
