import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Button } from "@/components/ui/button";
import { POSTS, formatDate, getPost, readingTime } from "../posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Section
        spacing="none"
        container="narrow"
        className="pt-44 pb-st-section-sm"
      >
        <Eyebrow>Insights</Eyebrow>
        <SplitText
          as="h1"
          delay={0.1}
          className="mt-6 max-w-3xl font-st-display text-st-h1"
        >
          {post.title}
        </SplitText>
        <Reveal variant="fade" delay={0.5}>
          <p className="mt-6 font-st-sans text-st-small text-st-muted">
            {formatDate(post.date)} · {readingTime(post)}
          </p>
        </Reveal>
      </Section>

      <Section spacing="none" container="narrow" className="pb-st-section">
        {/* Each block reveals on its own so long articles never stall a
            single viewport-observed wrapper. */}
        <div className="max-w-2xl">
          {post.body.map((block, i) =>
            block.type === "h2" ? (
              <Reveal key={i} variant="fade" duration={0.8}>
                <h2 className="mt-14 font-st-display text-st-h3 text-st-ink">
                  {block.text}
                </h2>
              </Reveal>
            ) : (
              <Reveal key={i} variant="fade" duration={0.8}>
                <p className="mt-6 text-st-body-lg text-st-ink-soft">
                  {block.text}
                </p>
              </Reveal>
            ),
          )}
        </div>

        <Reveal variant="fade" duration={0.8}>
          <div className="mt-16 border-t border-st-line pt-8">
            <Button variant="ghost" href="/insights">
              ← All insights
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
