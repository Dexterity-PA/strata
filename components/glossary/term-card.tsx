import { type GlossaryTerm, termAnchorId } from "@/app/glossary/terms";

interface TermCardProps {
  entry: GlossaryTerm;
  /**
   * Called when a "see also" link is chosen. The browser clears any active
   * filters and scrolls to the related term, so the link resolves even when a
   * category filter or search would otherwise hide it.
   */
  onSelectTerm?: (term: string) => void;
}

/**
 * A single glossary entry: the term, its category tag, a plain-language
 * definition, and any "see also" cross-links. Presentational only; layout,
 * grouping, and the cross-link behavior live in the browser.
 *
 * scroll-mt clears the fixed site nav plus the sticky A to Z bar so a term
 * jumped to from the index or a cross-link is never tucked under them.
 */
export function TermCard({ entry, onSelectTerm }: TermCardProps) {
  return (
    <article
      id={termAnchorId(entry.term)}
      className="flex h-full scroll-mt-40 flex-col bg-st-surface p-7 lg:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-st-display text-st-h3 text-st-ink">{entry.term}</h3>
        <span className="mt-1 shrink-0 font-st-sans text-st-eyebrow font-medium uppercase tracking-[0.16em] text-st-accent">
          {entry.category}
        </span>
      </div>
      <p className="mt-4 text-st-body text-st-muted">{entry.definition}</p>

      {entry.seeAlso && entry.seeAlso.length > 0 ? (
        <div className="mt-auto pt-6">
          <p className="font-st-sans text-st-eyebrow font-medium uppercase tracking-[0.16em] text-st-muted">
            See also
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {entry.seeAlso.map((related) => (
              <button
                key={related}
                type="button"
                onClick={() => onSelectTerm?.(related)}
                className="text-left font-st-sans text-st-small font-medium text-st-accent underline decoration-st-accent/40 decoration-1 underline-offset-4 transition-colors duration-(--st-dur-fast) hover:decoration-st-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-st-accent"
              >
                {related}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
