import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { cn } from "@/lib/utils";

interface ThinkingStepProps {
  /** Two-digit step marker shown in display type, e.g. "01". */
  step: string;
  /** Short eyebrow label for the step, e.g. "The first question". */
  label: string;
  /** The heading: usually the question being asked at this step. */
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * One stage in a case-study walkthrough: a numbered marker, a short label,
 * the question being worked through as the heading, then the reasoning.
 *
 * Each piece is wrapped in its own short scroll reveal. Nothing here wraps a
 * tall block in a single reveal, so the long page never hides behind a scroll
 * threshold the way a 9000px wrapper once did.
 */
export function ThinkingStep({
  step,
  label,
  title,
  children,
  className,
}: ThinkingStepProps) {
  return (
    <article className={cn("max-w-3xl", className)}>
      <Reveal variant="fade">
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="font-st-display text-st-h3 leading-none text-st-accent/40"
          >
            {step}
          </span>
          <Eyebrow>{label}</Eyebrow>
        </div>
      </Reveal>
      <Reveal variant="fade" delay={0.1}>
        <h2 className="mt-5 font-st-display text-st-h2 text-st-ink">{title}</h2>
      </Reveal>
      <Reveal variant="fade" delay={0.15}>
        <div className="mt-6 space-y-5 text-st-body-lg text-st-muted">
          {children}
        </div>
      </Reveal>
    </article>
  );
}
