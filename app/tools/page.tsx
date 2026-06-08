import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/components/tools/tools-catalog";
import { LegacyToolHashRedirect } from "@/components/tools/legacy-hash-redirect";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { StrataMotif } from "@/components/strata/StrataMotif";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Free, interactive tools to help you plan: breakeven, cash runway, pricing and margin, a slow-season buffer, an emergency fund target, and two ways to look at debt. Educational estimates, not financial advice.",
};

export default function ToolsPage() {
  return (
    <>
      {/* Index: intro + a card per tool. */}
      <Section container="none" className="relative overflow-hidden bg-st-bg">
        <StrataMotif
          variant="lines"
          tone="paper"
          density="sparse"
          className="opacity-60"
        />
        <div className="relative mx-auto w-full max-w-5xl px-st-gutter">
          <header className="mb-12 max-w-2xl lg:mb-16">
            <Reveal variant="fade">
              <Eyebrow>Tools</Eyebrow>
            </Reveal>
            <SplitText
              as="h1"
              className="mt-5 font-st-display text-st-h1 text-st-ink"
            >
              Tools to help you plan
            </SplitText>
            <Reveal variant="up" delay={0.1}>
              <p className="mt-6 font-st-sans text-st-body-lg leading-relaxed text-st-muted">
                A small set of plain-language calculators for the questions that
                come up most: covering your costs, stretching your cash, pricing
                your work, building a cushion, and getting out of debt. Put in a
                few numbers and the answer updates as you go. Nothing is stored,
                and every result is an educational estimate, not financial
                advice.
              </p>
            </Reveal>
          </header>

          <Reveal variant="up" delay={0.05}>
            <ul className="grid gap-px overflow-hidden rounded-st-md border border-st-line bg-st-line sm:grid-cols-2">
              {TOOLS.map((tool) => (
                <li key={tool.href} className="h-full">
                  <Link
                    href={tool.href}
                    className="group flex h-full flex-col bg-st-bg p-7 transition-colors duration-(--st-dur-base) ease-st-out hover:bg-st-surface focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-st-accent"
                  >
                    <span className="font-st-sans text-st-eyebrow font-medium uppercase tracking-[0.16em] text-st-accent">
                      {tool.audience}
                    </span>
                    <span className="mt-3 font-st-display text-st-h3 text-st-ink">
                      {tool.name}
                    </span>
                    <span className="mt-2 font-st-sans text-st-body leading-relaxed text-st-muted">
                      {tool.description}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-2 font-st-sans text-st-small font-medium text-st-accent">
                      Open tool
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
              {/* Fill the trailing cell on a 2-up grid so the odd count never
                  leaves a bare hairline rectangle. */}
              {TOOLS.length % 2 === 1 ? (
                <li aria-hidden className="hidden bg-st-bg sm:block" />
              ) : null}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Forward old /tools#slow-season-buffer and #avalanche-or-snowball
          bookmarks to the per-tool routes they moved to. */}
      <LegacyToolHashRedirect />
    </>
  );
}
