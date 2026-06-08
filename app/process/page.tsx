import type { Metadata } from "next";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";
import { ProcessSteps } from "./process-steps";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Five simple steps. Every step is free, and you're never under any obligation to continue.",
};

export default function Page() {
  return (
    <>
      <Section spacing="none" className="pt-44 pb-st-section">
        <Reveal variant="fade" duration={0.8}>
          <Eyebrow>Process</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          delay={0.15}
          className="mt-7 max-w-4xl font-st-display text-st-h1"
        >
          Simple, transparent, and built around you
        </SplitText>
      </Section>

      <Section spacing="none" container="narrow" className="pb-st-section">
        <ProcessSteps />
      </Section>

      <Section tone="surface" container="narrow">
        <Reveal duration={0.9}>
          <p className="font-st-display text-st-h3 text-st-ink">
            Every step is free, and you&rsquo;re never under any obligation to
            continue.
          </p>
        </Reveal>
        <Reveal variant="fade" delay={0.2} duration={0.9}>
          <div className="mt-10">
            <Button href="/contact">Reach out</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
