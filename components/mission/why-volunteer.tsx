import { Reveal } from "@/components/animation/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";

const LINK_CLASS =
  "text-st-accent underline decoration-st-accent/40 underline-offset-4 transition-colors duration-(--st-dur-fast) hover:decoration-st-accent";

/**
 * Why the volunteer, student-led model is a feature rather than a caveat.
 * Defers the founder bio to /about and the free-of-charge mechanics to
 * /how-it-works so this page stays about the mission, not the logistics.
 */
export function WhyVolunteer() {
  return (
    <Section tone="surface" container="narrow">
      <Reveal variant="fade" duration={0.8}>
        <h2>
          <Eyebrow>Why student-led, why volunteer</Eyebrow>
        </h2>
      </Reveal>

      <div className="mt-8 space-y-6">
        <Reveal variant="fade" delay={0.1} duration={0.9}>
          <p className="text-st-body-lg text-st-ink">
            Strata is run by a high school student, on a volunteer basis. That
            is not a disclaimer to apologize for. It is the part that keeps the
            help free and keeps it honest.
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.2} duration={0.9}>
          <p className="text-st-body-lg text-st-muted">
            With no fees to collect and no products to place, there is nothing
            quietly steering the conversation away from your interests. The
            return is the work itself: learning this material well enough to
            explain it clearly, and putting that to use for people who have been
            underserved by the usual channels.
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.3} duration={0.9}>
          <p className="text-st-body-lg text-st-muted">
            You can read more about who is behind Strata on the{" "}
            <a href="/about" className={LINK_CLASS}>
              about page
            </a>
            , and exactly why none of it costs anything on{" "}
            <a href="/how-it-works" className={LINK_CLASS}>
              how it works
            </a>
            .
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
