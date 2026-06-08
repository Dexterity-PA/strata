import { Reveal } from "@/components/animation/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";

/**
 * The principles that keep the mission honest. Pitched at the level of access
 * and intent, distinct from the "clear over complex" craft pairs on /about.
 * Each card animates on its own so a tall stack never hides behind a single
 * scroll threshold.
 */
const PRINCIPLES: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Access comes first",
    body: "Education that only reaches the people who can already pay for it is not really solving the problem. Free is not a promotion here. It is the whole point.",
  },
  {
    title: "Plain language is the work",
    body: "Jargon is usually a barrier, not a necessity. If an explanation cannot be put in words you actually use, it is not finished yet.",
  },
  {
    title: "No products, no pressure",
    body: "There is nothing to sell and no one to convert into a client. That keeps the guidance pointed at your situation and nowhere else.",
  },
  {
    title: "Education, not advice",
    body: "Strata offers financial education and planning support, never licensed advice. When something needs a licensed professional, the honest move is to say so.",
  },
];

export function Principles() {
  return (
    <Section container="narrow">
      <Reveal variant="fade" duration={0.8}>
        <h2>
          <Eyebrow>What we hold to</Eyebrow>
        </h2>
      </Reveal>

      <Reveal variant="fade" delay={0.15} duration={0.9}>
        <p className="mt-6 max-w-2xl text-st-body-lg text-st-muted">
          A mission is only as good as the lines it refuses to cross. These are
          the ones that keep this effort worth doing.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-x-st-gutter">
        {PRINCIPLES.map((principle, i) => (
          <Reveal key={principle.title} variant="up" delay={i * 0.08}>
            <div className="h-full rounded-st-lg border border-st-line bg-st-surface p-8">
              <span aria-hidden className="block h-px w-8 bg-st-accent" />
              <h3 className="mt-6 font-st-display text-st-h3 text-st-ink">
                {principle.title}
              </h3>
              <p className="mt-4 text-st-body text-st-muted">
                {principle.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
