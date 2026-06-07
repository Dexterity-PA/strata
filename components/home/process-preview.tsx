import { Reveal } from "@/components/animation/reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

const STEPS = [
  "Reach out",
  "We listen and review",
  "You get a clear, written plan you actually understand.",
];

/**
 * Three-step process preview. `id="process"` is the scroll target of the
 * hero's "See how it works" button. Steps reveal in sequence, left to right.
 */
export function ProcessPreview() {
  return (
    // scroll-mt matches the Lenis offset so the native (reduced-motion)
    // anchor jump also clears the fixed nav.
    <Section
      id="process"
      tone="surface"
      className="scroll-mt-16 border-y border-st-line"
    >
      <Reveal variant="fade">
        <Eyebrow>How it works</Eyebrow>
      </Reveal>

      <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
        {STEPS.map((step, i) => (
          <Reveal key={step} variant="up" delay={0.15 + i * 0.18}>
            <div className="flex h-full flex-col">
              <span className="font-st-sans text-st-small font-medium tracking-[0.18em] text-st-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-4 h-px w-10 bg-st-accent/40" aria-hidden />
              <p className="mt-6 max-w-xs font-st-display text-st-h3 text-st-ink">
                {step}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal variant="fade" delay={0.35}>
        <div className="mt-16">
          <Button variant="ghost" href="/process">
            Our full process
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
