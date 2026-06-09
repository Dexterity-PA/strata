import { Reveal } from "@/components/animation/reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Closing statement on inverse ground: why Strata's independence matters,
 * ending in the page's single CTA.
 */
export function DifferentCta() {
  return (
    <Section tone="inverse" container="narrow">
      <Reveal trigger="mount" variant="fade" duration={0.8}>
        <Eyebrow tone="inverse">How we&rsquo;re different</Eyebrow>
      </Reveal>
      <Reveal trigger="mount" variant="clip">
        <p className="mt-8 font-st-display text-st-h2 leading-snug text-st-paper">
          We don&rsquo;t sell anything. We&rsquo;re not paid by banks, funds, or
          anyone else. There&rsquo;s no upsell at the end because there&rsquo;s
          nothing to sell. That independence means the guidance is built around
          you, not a product.
        </p>
      </Reveal>
      <Reveal trigger="mount" variant="fade" delay={0.3} className="mt-12">
        <Button
          href="/contact"
          className="bg-st-paper text-st-ink hover:bg-st-surface hover:shadow-st-md"
        >
          Get in touch
        </Button>
      </Reveal>
    </Section>
  );
}
