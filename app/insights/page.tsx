import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Short, practical writing on the financial questions small businesses and individuals actually face, with no jargon and nothing to sell.",
};

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
}

/**
 * Published posts render into the grid below. Empty for now — drop real
 * entries here (or swap in a data source) once the first pieces are ready.
 */
const POSTS: Post[] = [];

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
        {POSTS.length > 0 ? (
          <ul className="grid gap-px overflow-hidden rounded-st-md border border-st-line bg-st-line sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post, i) => (
              <li key={post.slug} className="bg-st-surface">
                <Reveal variant="up" delay={i * 0.08} className="h-full">
                  <article className="flex h-full flex-col p-8">
                    <p className="font-st-sans text-st-small text-st-muted">
                      {post.date} · {post.readingTime}
                    </p>
                    <h2 className="mt-4 font-st-display text-st-h3 text-st-ink">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-st-body text-st-muted">
                      {post.excerpt}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal variant="up">
            <div className="flex min-h-72 flex-col items-center justify-center rounded-st-md border border-st-line bg-st-surface px-st-gutter py-16 text-center">
              <span aria-hidden className="h-px w-10 bg-st-accent" />
              <p className="mt-8 font-st-display text-st-h3 text-st-ink">
                First pieces coming soon
              </p>
            </div>
          </Reveal>
        )}
        <Reveal variant="fade" delay={0.15}>
          <div className="mt-12 text-center">
            <Button href="/contact">Start a conversation</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
