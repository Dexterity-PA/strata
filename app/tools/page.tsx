import type { Metadata } from "next";
import { BufferCalculator } from "@/components/tools/buffer-calculator";
import { DebtComparison } from "@/components/tools/debt-comparison";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Free, interactive tools to help you plan — a slow-season buffer estimator and an avalanche-vs-snowball debt payoff comparator. Educational estimates, not financial advice.",
};

export default function ToolsPage() {
  return (
    <>
      <Section container="none" className="bg-st-bg">
        <div className="mx-auto w-full max-w-5xl px-st-gutter">
          <header className="mb-12 max-w-2xl lg:mb-16">
            <Reveal variant="fade">
              <Eyebrow>Tools</Eyebrow>
            </Reveal>
            <SplitText
              as="h1"
              className="mt-5 font-st-display text-st-h1 text-st-ink"
            >
              Slow-season buffer estimator
            </SplitText>
            <Reveal variant="up" delay={0.1}>
              <p className="mt-6 font-st-sans text-st-body-lg leading-relaxed text-st-muted">
                If your business has a slow season, you already know when it
                starts. Put in four numbers and see the buffer that gets you
                through it — the gap, the season&rsquo;s target, and what to set
                aside each busy month and week to reach it.
              </p>
            </Reveal>
          </header>

          <Reveal variant="up" delay={0.05}>
            <BufferCalculator />
          </Reveal>
        </div>
      </Section>

      {/* Second tool — self-contained block (owns its Section + heading). */}
      <DebtComparison />
    </>
  );
}
