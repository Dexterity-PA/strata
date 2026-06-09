import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { GuidedIntake } from "@/components/contact/guided-intake";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description:
    "The first step is just a few short questions. Tell me what is on your mind and I'll get back to you to find a time to talk.",
};

const CONTACT_EMAIL = "hello@stratafinancialplanning.com";

export default function Page() {
  return (
    <>
      <Section
        spacing="none"
        container="narrow"
        className="pt-28 pb-st-section-sm sm:pt-44"
      >
        <Reveal variant="fade" duration={0.8}>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          delay={0.15}
          className="mt-6 font-st-display text-st-h1"
        >
          Let&apos;s talk about your finances, free of charge
        </SplitText>
        <Reveal variant="fade" delay={0.7} duration={0.9}>
          <p className="mt-6 max-w-xl text-st-body-lg text-st-muted">
            The first step is just a few short questions, no pressure and no
            obligation. Tell me what is on your mind and I&apos;ll get back to
            you to find a time to talk.
          </p>
        </Reveal>
      </Section>

      <Section spacing="none" container="narrow" className="pb-st-section">
        <Reveal variant="up" delay={0.2} trigger="mount">
          <GuidedIntake />
          <p className="mt-10 border-t border-st-line pt-8 text-st-body text-st-muted">
            Or email directly:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-st-accent underline decoration-st-accent/40 underline-offset-4 transition-colors duration-(--st-dur-fast) hover:decoration-st-accent"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Reveal>
      </Section>
    </>
  );
}
