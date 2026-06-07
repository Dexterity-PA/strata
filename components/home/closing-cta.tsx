import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

/**
 * Closing CTA on deep navy. The hairline at the bottom seams it against
 * the (also navy) footer. The primary button is re-grounded for the dark
 * surface via class overrides.
 */
export function ClosingCta() {
  return (
    <Section tone="inverse" className="border-b border-st-line-dark">
      {/* Color sits on the wrapper, not on SplitText: its className passes
          through tailwind-merge, which treats the custom text-st-h1 (size)
          and a text-st-* color as conflicting and drops the size. */}
      <div className="mx-auto max-w-3xl text-center text-st-paper">
        <SplitText as="h2" className="font-st-display text-st-h1">
          No fees. No products. No catch.
        </SplitText>
        <Reveal variant="fade" delay={0.5}>
          <p className="mt-7 text-st-body-lg text-st-paper/70">
            Just a clear look at your finances and a plan you can act on.
          </p>
        </Reveal>
        <Reveal variant="fade" delay={0.75}>
          <div className="mt-11">
            <Button
              href="/contact"
              className="bg-st-paper text-st-ink hover:bg-st-surface hover:shadow-st-md"
            >
              Get started
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
