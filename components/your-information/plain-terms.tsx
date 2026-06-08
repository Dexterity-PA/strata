import { Reveal } from "@/components/animation/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";

/**
 * The short, plain commitments. Every line here is grounded in the existing
 * Privacy Policy and the contact / subscribe API routes, so it stays strictly
 * accurate and never contradicts the formal page.
 */
const TERMS = [
  "We do not sell or rent your information.",
  "We share it only with the email service we use to deliver your message and run the mailing list, and nowhere else.",
  "There are no accounts and no payments. The only information we hold is what you choose to send us.",
  "We keep what you send only as long as we are working with you or might need to follow up.",
  "Like almost every website, our hosting provider may keep routine technical logs, such as IP addresses, to keep the site running.",
  "If you want your information removed, email us and we will delete it.",
] as const;

export function PlainTerms() {
  return (
    <Section tone="surface" container="narrow" spacing="base">
      <Reveal variant="fade">
        <Eyebrow>In plain terms</Eyebrow>
      </Reveal>

      <Reveal variant="up" delay={0.08}>
        <h2 className="mt-6 max-w-2xl font-st-display text-st-h2 text-st-ink">
          The short version
        </h2>
      </Reveal>

      <Reveal variant="up" delay={0.12}>
        <ul className="mt-10 space-y-5">
          {TERMS.map((term) => (
            <li key={term} className="flex gap-4">
              <span
                aria-hidden
                className="mt-3 h-px w-5 shrink-0 bg-st-accent/70"
              />
              <span className="font-st-sans text-st-body-lg text-st-ink-soft">
                {term}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
