import { Reveal } from "@/components/animation/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";

const PAIRS = [
  { first: "Clear", second: "complex." },
  { first: "Honest", second: "polished." },
  { first: "Useful", second: "impressive." },
];

/**
 * Philosophy section: the three "X over Y" pairs as stacked display lines,
 * each wiped in with the clip variant, followed by the plain-language
 * commitment.
 */
export function Philosophy() {
  return (
    <Section tone="surface">
      <Reveal trigger="mount" variant="fade" duration={0.8}>
        <h2>
          <Eyebrow>Philosophy</Eyebrow>
        </h2>
      </Reveal>

      <div className="mt-12 space-y-3">
        {PAIRS.map((pair, i) => (
          <Reveal
            trigger="mount"
            key={pair.first}
            variant="clip"
            delay={i * 0.12}
            once
          >
            <p className="font-st-display text-st-h2 text-st-ink">
              {pair.first} <span className="text-st-accent">over</span>{" "}
              {pair.second}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal trigger="mount" variant="fade" delay={0.2} duration={0.9}>
        <p className="mt-12 max-w-2xl text-st-body-lg text-st-muted">
          Every plan should be something you actually understand and can act on,
          written in plain language, with no jargon used to make simple things
          sound hard.
        </p>
      </Reveal>
    </Section>
  );
}
