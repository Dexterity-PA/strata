import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animation/reveal";
import { StrataMotif } from "@/components/strata/StrataMotif";
import {
  POSTS,
  formatDate,
  readingTime,
  type Post,
} from "@/app/insights/posts";

interface PostFooterProps {
  post: Post;
}

/**
 * Closing block for an article: author line, a conversation CTA, and two
 * other posts to keep reading. A faint "lines" motif sits behind it and a
 * hairline seams it off the body above, so the page warms as it ends.
 */
export function PostFooter({ post }: PostFooterProps) {
  const keepReading = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <section className="relative overflow-hidden border-t border-st-line bg-st-bg py-st-section">
      <StrataMotif
        variant="lines"
        tone="paper"
        density="sparse"
        className="opacity-70"
      />

      <Container size="narrow" className="relative">
        {/* Author + CTA */}
        <Reveal trigger="mount" variant="fade">
          <Eyebrow>Written by</Eyebrow>
        </Reveal>
        <Reveal trigger="mount" variant="up" delay={0.08}>
          <p className="mt-5 font-st-display text-st-h3 text-st-ink">
            Praneeth Annapureddy
          </p>
        </Reveal>
        <Reveal trigger="mount" variant="fade" delay={0.16}>
          <p className="mt-3 max-w-md font-st-sans text-st-body text-st-muted">
            Strata is a student-led volunteer initiative offering free financial
            education and planning support.
          </p>
        </Reveal>

        <Reveal trigger="mount" variant="up" delay={0.24}>
          <div className="mt-10 rounded-st-lg border border-st-line bg-st-surface p-8 shadow-st-sm sm:p-10">
            <p className="font-st-display text-st-h3 text-st-ink">
              Start a conversation. It&rsquo;s free.
            </p>
            <p className="mt-3 max-w-md font-st-sans text-st-body text-st-muted">
              No products, no pitch, nothing to sign up for. Bring a question
              and we&rsquo;ll look at it together.
            </p>
            <div className="mt-7">
              <Button href="/contact">Start a conversation</Button>
            </div>
          </div>
        </Reveal>

        {/* Keep reading */}
        {keepReading.length > 0 ? (
          <div className="mt-16 border-t border-st-line pt-10">
            <Reveal trigger="mount" variant="fade">
              <Eyebrow>Keep reading</Eyebrow>
            </Reveal>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-st-md border border-st-line bg-st-line sm:grid-cols-2">
              {keepReading.map((other, i) => (
                <li key={other.slug}>
                  <Reveal trigger="mount" variant="fade" delay={0.1 + i * 0.1}>
                    <Link
                      href={`/insights/${other.slug}`}
                      className="group flex h-full flex-col bg-st-bg p-7 transition-colors duration-(--st-dur-base) ease-st-out hover:bg-st-surface"
                    >
                      <span className="font-st-sans text-st-small text-st-muted">
                        {formatDate(other.date)} · {readingTime(other)}
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
