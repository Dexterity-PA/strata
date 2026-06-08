import type { GlossaryTerm } from "@/app/glossary/terms";

interface TermCardProps {
  entry: GlossaryTerm;
}

/**
 * A single glossary entry: the term, its category tag, and a plain-language
 * definition. Presentational only; layout and grouping live in the browser.
 */
export function TermCard({ entry }: TermCardProps) {
  return (
    <article className="flex h-full flex-col bg-st-surface p-7 lg:p-8">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-st-display text-st-h3 text-st-ink">{entry.term}</h3>
        <span className="mt-1 shrink-0 font-st-sans text-st-eyebrow font-medium uppercase tracking-[0.16em] text-st-accent">
          {entry.category}
        </span>
      </div>
      <p className="mt-4 text-st-body text-st-muted">{entry.definition}</p>
    </article>
  );
}
