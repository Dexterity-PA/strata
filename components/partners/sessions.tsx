import { Reveal } from "@/components/animation/reveal";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";

/** Example topics a volunteer-led session might cover. Illustrative, not a
 *  fixed syllabus, so a group can shape a session around what it wants. */
const TOPICS = [
  {
    lead: "Building a budget",
    detail: "a simple system a group can start and actually keep using",
  },
  {
    lead: "Understanding a paycheck",
    detail: "what the lines on a pay stub mean and where the money goes",
  },
  {
    lead: "The basics of saving",
    detail: "setting a goal and a first cushion, without the jargon",
  },
  {
    lead: "Reading the numbers",
    detail: "a plain-language look at cash flow for a club or small project",
  },
];

/**
 * The volunteer-led sessions concept: what working with a group can look like,
 * framed as an invitation with honest limits. No advice claims, no promises
 * about availability or turnaround.
 */
export function Sessions() {
  return (
    <Section tone="surface" container="narrow">
      <Reveal trigger="mount" variant="fade" duration={0.8}>
        <Eyebrow>Volunteer-led sessions</Eyebrow>
      </Reveal>
      <Reveal trigger="mount" variant="clip">
        <h2 className="mt-6 font-st-display text-st-h1 text-st-ink">
          Sessions for classes and community groups
        </h2>
      </Reveal>
      <Reveal trigger="mount" variant="up" delay={0.1} className="mt-7">
        <p className="font-st-sans text-st-body-lg leading-relaxed text-st-muted">
          Beyond the materials you can use on your own, our volunteers can meet
          with a class or a community group to walk through a financial topic
          together. We shape each session around what your group wants to
          understand, drawing on the same free materials found across this site.
        </p>
      </Reveal>

      <ul className="mt-12 border-t border-st-line">
        {TOPICS.map((topic, i) => (
          <li key={topic.lead} className="border-b border-st-line">
            <Reveal
              trigger="mount"
              variant="up"
              delay={Math.min(i * 0.08, 0.32)}
            >
              <div className="grid gap-2 py-6 md:grid-cols-[minmax(0,16rem)_1fr] md:items-baseline md:gap-8">
                <h3 className="font-st-display text-st-h3 text-st-ink">
                  {topic.lead}
                </h3>
                <p className="font-st-sans text-st-body text-st-muted">
                  {topic.detail}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal trigger="mount" variant="up" delay={0.1} className="mt-10">
        <p className="font-st-sans text-st-body leading-relaxed text-st-muted">
          Because Strata is run by student volunteers, sessions are arranged as
          people and time allow. A session is education and planning support,
          not personalized financial advice, and we are not licensed advisors.
          When a question genuinely needs a licensed professional, we will say
          so and help point you in the right direction.
        </p>
      </Reveal>
    </Section>
  );
}
