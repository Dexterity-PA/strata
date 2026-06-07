import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "The first step is just a conversation. Tell me a bit about your situation and I'll get back to you.",
};

const CONTACT_EMAIL = "praneeth.a2027@gmail.com";

export default function Page() {
  return (
    <>
      <Section
        spacing="none"
        container="narrow"
        className="pt-44 pb-st-section-sm"
      >
        <Eyebrow>Contact</Eyebrow>
        <SplitText
          as="h1"
          delay={0.1}
          className="mt-6 font-st-display text-st-h1"
        >
          Let&apos;s talk about your finances, free of charge
        </SplitText>
        <Reveal variant="fade" delay={0.5}>
          <p className="mt-6 max-w-xl text-st-body-lg text-st-muted">
            The first step is just a conversation. Tell me a bit about your
            situation and I&apos;ll get back to you.
          </p>
        </Reveal>
      </Section>

      <Section spacing="none" container="narrow" className="pb-st-section">
        <Reveal variant="up" delay={0.2}>
          <ContactForm />
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
