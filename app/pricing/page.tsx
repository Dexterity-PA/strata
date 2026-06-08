import type { Metadata } from "next";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Strata is a volunteer initiative. There are no fees, no tiers, and no paid version waiting behind a door.",
};

/**
 * Deliberately a single statement: one headline, one paragraph, one button,
 * and a lot of room. The emptiness is the point.
 */
export default function PricingPage() {
  return (
    <Section container="narrow" className="flex min-h-svh items-center pt-44">
      <div>
        <Reveal variant="fade" duration={0.8}>
          <Eyebrow>Pricing</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          className="mt-8 font-st-display text-st-display"
          delay={0.15}
        >
          It&rsquo;s free. That&rsquo;s the whole model.
        </SplitText>
        <Reveal variant="fade" delay={0.7} duration={0.9}>
          <p className="mt-10 max-w-xl text-st-body-lg leading-relaxed text-st-muted">
            Strata is a volunteer initiative. There are no fees, no tiers, and
            no paid version waiting behind a door. We believe basic financial
            guidance is something everyone deserves access to, regardless of
            budget. If you&rsquo;re wondering where the catch is, there
            isn&rsquo;t one.
          </p>
        </Reveal>
        <Reveal variant="fade" delay={0.95} duration={0.9} className="mt-12">
          <Button href="/contact">Start your free conversation</Button>
        </Reveal>
      </div>
    </Section>
  );
}
