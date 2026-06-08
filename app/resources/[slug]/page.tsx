import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";
import { Button } from "@/components/ui/button";
import { ReadingProgress } from "@/components/insights/reading-progress";
import { GuideFooter } from "@/components/resources/guide-footer";
import { GUIDES, formatDate, getGuide, readingTime } from "../guides";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/resources/${guide.slug}` },
  };
}

// Drop cap on the opening paragraph for typographic rhythm; the rest of the
// body keeps an even, comfortable measure. Mirrors the insights article page.
const DROP_CAP =
  "first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 " +
  "first-letter:font-st-display first-letter:text-[3.25rem] " +
  "first-letter:leading-[0.7] first-letter:text-st-accent";

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const firstParagraph = guide.body.findIndex((block) => block.type === "p");

  return (
    <>
      <Section
        spacing="none"
        container="narrow"
        className="pt-44 pb-st-section-sm"
      >
        <Reveal variant="fade">
          <Eyebrow>{guide.category}</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          delay={0.1}
          className="mt-6 max-w-3xl font-st-display text-st-h1"
        >
          {guide.title}
        </SplitText>
        <Reveal variant="fade" delay={0.45}>
          <p className="mt-6 font-st-sans text-st-small text-st-muted">
            Updated {formatDate(guide.updated)} · {readingTime(guide)}
          </p>
        </Reveal>

        {/* What you'll learn: a short orientation panel, since these pages are
            learning material rather than narrative essays. */}
        <Reveal variant="up" delay={0.55}>
          <div className="mt-10 rounded-st-lg border border-st-line bg-st-surface p-7 shadow-st-sm sm:p-8">
            <p className="font-st-sans text-st-eyebrow font-medium uppercase text-st-accent">
              What you’ll learn
            </p>
            <ul className="mt-5 space-y-3">
              {guide.takeaways.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 font-st-sans text-st-body text-st-ink-soft"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-st-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <ReadingProgress>
        <Section spacing="none" container="narrow" className="pb-st-section-sm">
          {/* Each block reveals on its own so long guides never stall a single
              viewport-observed wrapper. */}
          <div className="max-w-[68ch]">
            {guide.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <Reveal key={i} variant="fade" duration={0.8}>
                    <h2 className="mt-16 scroll-mt-28 font-st-display text-st-h3 tracking-tight text-st-ink">
                      {block.text}
                    </h2>
                  </Reveal>
                );
              }
              if (block.type === "list") {
                return (
                  <Reveal key={i} variant="fade" duration={0.8}>
                    <ul className="mt-7 space-y-4">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-st-body-lg leading-relaxed text-st-ink-soft"
                        >
                          <span
                            aria-hidden
                            className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-st-accent"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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
                    {block.text}
                  </p>
                </Reveal>
              );
            })}
          </div>

          {/* Education disclaimer. Keeps the framing explicit on every guide. */}
          <Reveal variant="fade" duration={0.8}>
            <p className="mt-12 border-t border-st-line pt-6 font-st-sans text-st-small text-st-muted">
              This guide is general educational information, not personalized
              financial guidance. For decisions that turn on your specific
              circumstances, consider speaking with a qualified licensed
              professional. See our{" "}
              <Link
                href="/disclosures"
                className="underline decoration-st-accent/40 underline-offset-4 hover:text-st-accent hover:decoration-st-accent"
              >
                disclosures
              </Link>
              .
            </p>
          </Reveal>

          <Reveal variant="fade" duration={0.8}>
            <div className="mt-10">
              <Button variant="ghost" href="/resources">
                ← All guides
              </Button>
            </div>
          </Reveal>
        </Section>
      </ReadingProgress>

      <GuideFooter guide={guide} />
    </>
  );
}
