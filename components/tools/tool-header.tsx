import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { SplitText } from "@/components/animation/split-text";

interface ToolHeaderProps {
  /** Small audience / category label above the title. */
  eyebrow?: string;
  title: string;
  /** Plain-language lead paragraph under the title. */
  intro: ReactNode;
}

/**
 * Shared header for a single-tool route: a "back to all tools" link, the
 * eyebrow, the display title (animated to match the site), and a short intro.
 * A server component that renders the site's client-side reveal primitives as
 * children, so each tool page stays a thin shell around its calculator.
 */
export function ToolHeader({
  eyebrow = "Tools",
  title,
  intro,
}: ToolHeaderProps) {
  return (
    <header className="mb-12 max-w-2xl lg:mb-16">
      <Reveal variant="fade">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 font-st-sans text-st-small font-medium text-st-muted transition-colors duration-(--st-dur-fast) hover:text-st-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-st-accent"
        >
          <span aria-hidden>&larr;</span>
          All tools
        </Link>
      </Reveal>
      <div className="mt-6">
        <Reveal variant="fade">
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          className="mt-5 font-st-display text-st-h1 text-st-ink"
        >
          {title}
        </SplitText>
        <Reveal variant="up" delay={0.1}>
          <p className="mt-6 font-st-sans text-st-body-lg leading-relaxed text-st-muted">
            {intro}
          </p>
        </Reveal>
      </div>
    </header>
  );
}
