import type { ReactNode } from "react";
import { Reveal } from "@/components/animation/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";

/** A short bulleted list with the brand's gold hairline tick. */
function FieldList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 font-st-sans text-st-body text-st-ink-soft"
        >
          <span
            aria-hidden
            className="mt-2.5 h-px w-3 shrink-0 bg-st-accent/70"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const CONTACT_FIELDS = [
  "Your name",
  "Your email address",
  "Whether you are reaching out as an individual or a small business",
  "A short note about what is on your mind",
  "An optional space for anything else you want to add",
] as const;

const NEWSLETTER_FIELDS = ["Your email address"] as const;

function Card({ children }: { children: ReactNode }) {
  return (
    <article className="h-full rounded-st-lg border border-st-line bg-st-surface p-8 shadow-st-sm sm:p-10">
      {children}
    </article>
  );
}

/**
 * The two places a visitor can actually share something with us, each set out
 * with exactly what it asks for and what happens next. Both are wired to
 * Resend in the contact and subscribe API routes.
 */
export function WhatWeCollect() {
  return (
    <Section container="narrow" spacing="base">
      <Reveal variant="fade">
        <Eyebrow>What we collect</Eyebrow>
      </Reveal>

      <Reveal variant="up" delay={0.08}>
        <h2 className="mt-6 max-w-2xl font-st-display text-st-h2 text-st-ink">
          There are two places you can share something with us
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Reveal variant="up" delay={0.12}>
          <Card>
            <h3 className="font-st-display text-st-h3 text-st-ink">
              The contact form
            </h3>
            <p className="mt-4 font-st-sans text-st-body text-st-muted">
              When you get in touch through the contact form, it asks for:
            </p>
            <FieldList items={CONTACT_FIELDS} />
            <p className="mt-6 font-st-sans text-st-body text-st-muted">
              When you send it, that information is delivered to us as an email
              so we can read it and write back. Your email address is used as
              the reply address, and nothing more. No account is created, and
              there is nothing to sign up for.
            </p>
          </Card>
        </Reveal>

        <Reveal variant="up" delay={0.2}>
          <Card>
            <h3 className="font-st-display text-st-h3 text-st-ink">
              The newsletter
            </h3>
            <p className="mt-4 font-st-sans text-st-body text-st-muted">
              The newsletter sign-up in our footer asks for one thing:
            </p>
            <FieldList items={NEWSLETTER_FIELDS} />
            <p className="mt-6 font-st-sans text-st-body text-st-muted">
              We add it to our mailing list so we can send the occasional
              update. You can leave the list whenever you want. Email us and we
              will take you off.
            </p>
          </Card>
        </Reveal>
      </div>

      <Reveal variant="fade" delay={0.24}>
        <p className="mt-8 max-w-2xl font-st-sans text-st-small text-st-muted">
          Both the contact form and the newsletter are handled through Resend, a
          third-party email service that delivers our messages and stores the
          mailing list for us. We do not use your information for anything else.
        </p>
      </Reveal>
    </Section>
  );
}
