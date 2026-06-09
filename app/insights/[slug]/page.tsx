import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Button } from "@/components/ui/button";
import { ReadingProgress } from "@/components/insights/reading-progress";
import { ArticleTool } from "@/components/insights/article-tool";
import { PostFooter } from "@/components/insights/post-footer";
import { ProseLink } from "@/components/case-studies/prose-link";
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
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
  };
}

// Drop cap on the opening paragraph for typographic rhythm; the rest of the
// body keeps an even, comfortable measure.
const DROP_CAP =
  "first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 " +
  "first-letter:font-st-display first-letter:text-[3.25rem] " +
  "first-letter:leading-[0.7] first-letter:text-st-accent";

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const firstParagraph = post.body.findIndex((block) => block.type === "p");

  return (
    <>
      <Section
        spacing="none"
        container="narrow"
        className="pt-44 pb-st-section-sm"
      >
        <Reveal variant="fade">
          <Eyebrow>Insights</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          delay={0.1}
          className="mt-6 max-w-3xl font-st-display text-st-h1"
        >
          {post.title}
        </SplitText>
        <Reveal variant="fade" delay={0.45}>
          <p className="mt-6 font-st-sans text-st-small text-st-muted">
            {formatDate(post.date)} · {readingTime(post)}
          </p>
        </Reveal>
        <Reveal variant="fade" delay={0.55}>
          <div className="mt-8 h-px w-16 bg-st-accent/40" />
        </Reveal>
      </Section>

      <ReadingProgress>
        <Section spacing="none" container="narrow" className="pb-st-section-sm">
          {/* Each block reveals on its own so long articles never stall a
              single viewport-observed wrapper. */}
          <div className="max-w-[68ch]">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <Reveal key={i} variant="fade" duration={0.8}>
                    <h2 className="mt-16 scroll-mt-28 font-st-display text-st-h3 tracking-tight text-st-ink">
                      {block.text}
                    </h2>
                  </Reveal>
                );
              }
              if (block.type === "quote") {
                return (
                  <Reveal key={i} variant="fade" duration={0.8}>
                    <blockquote className="mt-10 border-l-2 border-st-accent/50 pl-6 font-st-display text-st-h3 leading-snug text-st-ink">
                      {block.text}
                    </blockquote>
                  </Reveal>
                );
              }
              return (
                <Reveal key={i} variant="fade" duration={0.8}>
                  <p
                    className={
                      "mt-7 text-st-body-lg leading-relaxed text-st-ink-soft" +
                      (i === firstParagraph ? ` ${DROP_CAP}` : "")
                    }
                  >
                    {typeof block.text === "string"
                      ? block.text
                      : block.text.map((span, j) =>
                          typeof span === "string" ? (
                            span
                          ) : (
                            <ProseLink key={j} href={span.href}>
                              {span.text}
                            </ProseLink>
                          ),
                        )}
                  </p>
                </Reveal>
              );
            })}
          </div>

          <Reveal variant="fade" duration={0.8}>
            <div className="mt-12">
              <Button variant="ghost" href="/insights">
                ← All insights
              </Button>
            </div>
          </Reveal>
        </Section>

        {post.tool ? <ArticleTool tool={post.tool} /> : null}
      </ReadingProgress>

      <PostFooter post={post} />
    </>
  );
}
