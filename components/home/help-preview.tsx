import { Reveal } from "@/components/animation/reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

// The provided copy is one long sentence; the key phrases stagger in as
// editorial lines so it reads as a single thought arriving in beats.
const KEY_PHRASES = [
  "where the money is actually going,",
  "how to plan for slow seasons,",
  "when it’s safe to invest in growth,",
  "and how to build a buffer that holds.",
];

/** Preview of services: staggered reveal of the everyday questions. */
export function HelpPreview() {
  return (
    <Section>
      <div className="max-w-4xl">
        <Reveal variant="fade">
          <Eyebrow>What we help with</Eyebrow>
        </Reveal>

        <Reveal variant="up" delay={0.1}>
          <p className="mt-7 max-w-2xl text-st-body-lg text-st-ink-soft">
            We work with owners and individuals on the everyday financial
            questions that rarely get good answers:
          </p>
        </Reveal>

        <div className="mt-12 space-y-4 border-l border-st-accent/30 pl-7 md:pl-10">
          {KEY_PHRASES.map((phrase, i) => (
            <Reveal key={phrase} variant="clip" delay={0.15 + i * 0.14}>
              <p className="font-st-display text-st-h2 text-st-ink">{phrase}</p>
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" delay={0.2}>
          <p className="mt-12 max-w-2xl text-st-body-lg text-st-muted">
            Nothing is sold. Nothing is marked up. The work is free because
            access is the point.
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.3}>
          <div className="mt-10">
            <Button variant="ghost" href="/services">
              See all services
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
