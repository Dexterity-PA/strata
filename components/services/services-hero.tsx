import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";

/** Services page opener: page title plus the plain-language framing of what Strata is (and isn't). */
export function ServicesHero() {
  return (
    <Section className="pt-44">
      <Eyebrow>Services</Eyebrow>
      <SplitText
        as="h1"
        className="mt-6 font-st-display text-st-display"
        delay={0.1}
      >
        Services
      </SplitText>
      <Reveal variant="fade" delay={0.4} className="mt-8 max-w-2xl">
        <p className="text-st-body-lg leading-relaxed text-st-muted">
          Strata offers financial education and planning support, not regulated
          financial advice. Everything here is designed to help you understand
          your own situation and make confident decisions. It&rsquo;s all free.
        </p>
      </Reveal>
    </Section>
  );
}
