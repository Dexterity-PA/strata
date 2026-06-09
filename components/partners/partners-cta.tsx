import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

// Same inbox the contact form delivers to. Reusing the existing pathway here
// rather than adding a new form or backend for partner inquiries.
const CONTACT_EMAIL = "hello@stratafinancialplanning.com";

/**
 * Closing invitation on deep navy. Routes partner inquiries through the
 * existing /contact pathway (and a direct mailto), with no fees, no products,
 * and no promise about timing.
 */
export function PartnersCta() {
  return (
    <Section tone="inverse" className="border-b border-st-line-dark">
      <div className="mx-auto max-w-3xl text-center">
        <SplitText as="h2" className="font-st-display text-st-h1 text-st-paper">
          Start a conversation
        </SplitText>
        <Reveal trigger="mount" variant="fade" delay={0.5}>
          <p className="mt-7 text-st-body-lg text-st-paper/70">
            If you would like to use these materials with your group, or talk
            about a session, get in touch and tell us a little about your school
            or organization. There is no cost and no obligation.
          </p>
        </Reveal>
        <Reveal trigger="mount" variant="fade" delay={0.75}>
          <div className="mt-11">
            <Button
              href="/contact"
              className="bg-st-accent-bright text-st-ink hover:bg-st-accent-bright hover:shadow-st-md"
            >
              Get in touch
            </Button>
          </div>
        </Reveal>
        <Reveal trigger="mount" variant="fade" delay={0.9}>
          <p className="mt-8 text-st-body text-st-paper/70">
            Or email directly:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-st-accent-bright underline decoration-st-accent-bright/40 underline-offset-4 transition-colors duration-(--st-dur-fast) hover:decoration-st-accent-bright"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
