import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Strata handles the small amount of information you share with us.",
};

const SECTIONS = [
  {
    heading: "What we collect",
    body: [
      "The only personal information Strata collects is what you choose to send us: your name, email address, whether you're reaching out as an individual or a small business, and your message — through the contact form or by emailing us directly.",
      "There are no accounts, no payments, and no forms beyond the contact form. Our hosting provider may keep routine technical logs (like IP addresses) to operate the site, as virtually all websites do.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "We use your contact information for one thing: replying to you and setting up a conversation. We don't sell it, rent it, or share it with anyone else.",
      "Anything you share with us is kept confidential.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "We keep messages only as long as we're actually working with you or might need to follow up. If you'd like your information deleted, email us and we'll remove it.",
    ],
  },
  {
    heading: "Questions",
    body: [
      "If anything here is unclear, or you want to know what information we have about you, email praneeth.a2027@gmail.com.",
    ],
  },
];

export default function Page() {
  return (
    <Section container="narrow" className="pt-44">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-6 font-st-display text-st-h1">Privacy Policy</h1>
      <p className="mt-4 font-st-sans text-st-small text-st-muted">
        Last updated: June 6, 2026
      </p>
      <p className="mt-8 text-st-body-lg text-st-ink-soft">
        Strata is a free, student-led volunteer initiative. We collect as little
        information as possible — only what you send us when you get in touch —
        and this page explains plainly what happens to it.
      </p>
      <div className="mt-12 space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.heading}>
            <h2 className="font-st-display text-st-h3 text-st-ink">
              {section.heading}
            </h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-st-body text-st-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </Section>
  );
}
