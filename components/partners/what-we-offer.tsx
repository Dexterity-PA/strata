import Link from "next/link";
import { Reveal } from "@/components/animation/reveal";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Offering {
  /** Short category label set above the title. */
  kind: string;
  name: string;
  description: string;
  href: string;
}

/**
 * The genuinely available, free materials on this site, framed for classroom
 * and group use. Each card links straight to the existing hub it describes,
 * sharing the hairline-gap grid treatment used across the site indexes.
 */
const OFFERINGS: Offering[] = [
  {
    kind: "Guides and worksheets",
    name: "Printable resources",
    description:
      "Guides and fillable worksheets for budgeting, cash flow, getting ready for a slow season, and paying down debt. Free to download, print, and hand out.",
    href: "/resources",
  },
  {
    kind: "Planning tools",
    name: "Interactive calculators",
    description:
      "Plain-language tools for breakeven, cash runway, pricing and margin, a slow-season buffer, an emergency fund target, compound growth, and two ways to look at debt. Nothing is stored, and every result is an educational estimate.",
    href: "/tools",
  },
  {
    kind: "Glossary",
    name: "Plain-language terms",
    description:
      "A glossary that translates common financial terms into everyday language. A handy reference for a class or a workshop.",
    href: "/glossary",
  },
  {
    kind: "Insights",
    name: "Short, jargon-free writing",
    description:
      "Brief pieces on money topics written without the jargon. Free to read on your own or share with a group.",
    href: "/insights",
  },
];

export function WhatWeOffer() {
  return (
    <Section container="none" className="bg-st-bg">
      <div className="mx-auto w-full max-w-5xl px-st-gutter">
        <div className="max-w-2xl">
          <Reveal variant="fade" duration={0.8}>
            <Eyebrow>What is available</Eyebrow>
          </Reveal>
          <Reveal variant="clip">
            <h2 className="mt-6 font-st-display text-st-h1 text-st-ink">
              Free materials you can use today
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="mt-6 font-st-sans text-st-body leading-relaxed text-st-muted">
              Everything below is already on this site, free to use with a
              class, a club, or a community group. Take what is useful, work
              through it at your own pace, and come back when you need it.
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={0.05} className="mt-12">
          <ul className="grid gap-px overflow-hidden rounded-st-md border border-st-line bg-st-line sm:grid-cols-2">
            {OFFERINGS.map((offering) => (
              <li key={offering.href} className="h-full">
                <Link
                  href={offering.href}
                  className="group flex h-full flex-col bg-st-bg p-7 transition-colors duration-(--st-dur-base) ease-st-out hover:bg-st-surface focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-st-accent"
                >
                  <span className="font-st-sans text-st-eyebrow font-medium uppercase tracking-[0.16em] text-st-accent">
                    {offering.kind}
                  </span>
                  <span className="mt-3 font-st-display text-st-h3 text-st-ink">
                    {offering.name}
                  </span>
                  <span className="mt-2 font-st-sans text-st-body leading-relaxed text-st-muted">
                    {offering.description}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-2 font-st-sans text-st-small font-medium text-st-accent">
                    Explore
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5 transition-transform duration-(--st-dur-fast) ease-st-out group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
