import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animation/reveal";
import { StrataMotif } from "@/components/strata/StrataMotif";
import { relatedGuides, readingTime, type Guide } from "@/app/resources/guides";

interface GuideFooterProps {
  guide: Guide;
}

/**
 * Closing block for a guide: a short note on who Strata is, a free-conversation
 * CTA, and a couple of related guides to keep learning. A faint "lines" motif
 * sits behind it and a hairline seams it off the body above, mirroring the
 * insights post footer so the two hubs feel of a piece.
 */
export function GuideFooter({ guide }: GuideFooterProps) {
  const keepLearning = relatedGuides(guide, 2);

  return (
    <section className="relative overflow-hidden border-t border-st-line bg-st-bg py-st-section">
      <StrataMotif
        variant="lines"
        tone="paper"
        density="sparse"
        className="opacity-70"
      />

      <Container size="narrow" className="relative">
        <Reveal variant="fade">
          <Eyebrow>From Strata</Eyebrow>
        </Reveal>
        <Reveal variant="fade" delay={0.08}>
          <p className="mt-5 max-w-md font-st-sans text-st-body text-st-muted">
            Strata is a student-led volunteer initiative offering free financial
            education and planning support. No products, no commissions, nothing
            to sign up for.
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.16}>
          <div className="mt-10 rounded-st-lg border border-st-line bg-st-surface p-8 shadow-st-sm sm:p-10">
            <p className="font-st-display text-st-h3 text-st-ink">
              Have a question this guide didn’t answer?
            </p>
            <p className="mt-3 max-w-md font-st-sans text-st-body text-st-muted">
              Bring it to a free conversation. We’ll look at your situation
              together, in plain language, with nothing to pitch.
            </p>
            <div className="mt-7">
              <Button href="/contact">Start a conversation</Button>
            </div>
          </div>
        </Reveal>

        {keepLearning.length > 0 ? (
          <div className="mt-16 border-t border-st-line pt-10">
            <Reveal variant="fade">
              <Eyebrow>Keep learning</Eyebrow>
            </Reveal>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-st-md border border-st-line bg-st-line sm:grid-cols-2">
              {keepLearning.map((other, i) => (
                <li key={other.slug}>
                  <Reveal variant="fade" delay={0.1 + i * 0.1}>
                    <Link
                      href={`/resources/${other.slug}`}
                      className="group flex h-full flex-col bg-st-bg p-7 transition-colors duration-(--st-dur-base) ease-st-out hover:bg-st-surface"
                    >
                      <span className="font-st-sans text-st-eyebrow font-medium uppercase text-st-accent">
                        {other.category} · {readingTime(other)}
                      </span>
                      <span className="mt-3 font-st-display text-st-h3 text-st-ink transition-colors duration-(--st-dur-fast) group-hover:text-st-accent">
                        {other.title}
                      </span>
                      <span className="mt-3 font-st-sans text-st-body text-st-muted">
                        {other.excerpt}
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
