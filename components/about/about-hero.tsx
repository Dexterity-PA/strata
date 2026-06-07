import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/layout/section";

/**
 * About opener: headline plus a three-paragraph founder letter. The copy
 * column is offset right of the headline on desktop for an editorial,
 * letter-like rhythm.
 */
export function AboutHero() {
  return (
    <Section spacing="none" className="pt-44 pb-st-section">
      <Reveal variant="fade" duration={0.8}>
        <Eyebrow>About</Eyebrow>
      </Reveal>

      <SplitText
        as="h1"
        delay={0.15}
        className="mt-7 max-w-4xl font-st-display text-st-h1"
      >
        Why Strata exists
      </SplitText>

      <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-x-st-gutter">
        <div className="space-y-8 lg:col-span-7 lg:col-start-5">
          <Reveal variant="fade" delay={0.7} duration={0.9}>
            <p className="text-st-body-lg text-st-ink">
              I started Strata because I kept seeing the same thing: capable
              people and hardworking business owners making major financial
              decisions without anyone in their corner to explain the basics.
              The people who most need clear financial guidance are usually the
              least able to pay for it. That struck me as backwards.
            </p>
          </Reveal>

          <Reveal variant="fade" delay={0.85} duration={0.9}>
            <p className="text-st-body-lg text-st-muted">
              Strata is my attempt to fix a small piece of that. It&rsquo;s a
              volunteer initiative offering free financial education and
              planning support to local businesses and individuals who&rsquo;ve
              been underserved by the usual channels.
            </p>
          </Reveal>

          <Reveal variant="fade" delay={1} duration={0.9}>
            <p className="text-st-body-lg text-st-muted">
              I&rsquo;m Praneeth Annapureddy, a high school student with a
              background in economics and finance and a long-standing interest
              in how financial systems include some people and quietly exclude
              others. Strata is where I put that interest to work for the people
              around me.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
