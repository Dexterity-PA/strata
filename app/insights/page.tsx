import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { POSTS, formatDate, readingTime } from "./posts";

export const metadata: Metadata = {
  alternates: { canonical: "/insights" },
  title: "Insights",
  description:
    "Short, practical writing on the financial questions small businesses and individuals actually face, with no jargon and nothing to sell.",
};

export default function Page() {
  return (
    <>
      <Section
        spacing="none"
        container="narrow"
        className="pt-44 pb-st-section-sm"
      >
        <Reveal variant="fade" duration={0.8}>
          <Eyebrow>Insights</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          delay={0.15}
          className="mt-6 font-st-display text-st-h1"
        >
          Notes on money, made readable
        </SplitText>
        <Reveal variant="fade" delay={0.7} duration={0.9}>
          <p className="mt-6 max-w-xl text-st-body-lg text-st-muted">
            Short, practical writing on the financial questions small businesses
            and individuals actually face, with no jargon and nothing to sell.
            New pieces added regularly.
          </p>
        </Reveal>
      </Section>

      <Section spacing="none" className="pb-st-section">
        {/* Hairlines are drawn by each cell's own top/left border (pulled over
            its neighbor with negative margins), and the container background is
            paper. So an incomplete final row reads as paper rather than the
            border color, for any number of posts. */}
        <ul className="grid overflow-hidden rounded-st-md border border-st-line bg-st-surface sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <li
              key={post.slug}
              className="-mt-px -ml-px border-t border-l border-st-line bg-st-surface"
            >
              <Reveal variant="up" delay={i * 0.08} className="h-full">
                <Link
                  href={`/insights/${post.slug}`}
                  className="group flex h-full flex-col p-8"
                >
                  <p className="font-st-sans text-st-small text-st-muted">
                    {formatDate(post.date)} · {readingTime(post)}
                  </p>
                  <h2 className="mt-4 font-st-display text-st-h3 text-st-ink transition-colors duration-(--st-dur-fast) group-hover:text-st-accent">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-st-body text-st-muted">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-8 font-st-sans text-st-small font-medium text-st-accent">
                    Read the piece
                    <span
                      aria-hidden
                      className="ml-2 inline-block transition-transform duration-(--st-dur-fast) ease-st-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
          {/* "More on the way" cell. It is just another card; any unused
              slots after it in the final row stay paper, so the count of
              posts never matters. */}
          <li className="-mt-px -ml-px border-t border-l border-st-line bg-st-surface">
            <Reveal variant="up" delay={POSTS.length * 0.08} className="h-full">
              <div className="flex h-full flex-col justify-center p-8">
                <span aria-hidden className="h-px w-8 bg-st-accent" />
                <p className="mt-6 font-st-display text-st-h3 text-st-ink">
                  More on the way
                </p>
                <p className="mt-3 text-st-body text-st-muted">
                  New pieces are added regularly. If there&rsquo;s a question
                  you&rsquo;d like covered, send it over.
                </p>
              </div>
            </Reveal>
          </li>
        </ul>
        <Reveal variant="fade" delay={0.15}>
          <div className="mt-12 text-center">
            <Button href="/contact">Start a conversation</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
