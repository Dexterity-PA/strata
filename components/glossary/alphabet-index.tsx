const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface AlphabetIndexProps {
  /** Letters that currently have at least one matching term. */
  activeLetters: ReadonlySet<string>;
}

/**
 * A to Z jump bar. Letters with matching terms link to their group. Letters
 * with none render in the same active color but as plain, non-interactive
 * text: no link, not focusable, and not announced as actionable. Numeric
 * terms (such as 401(k) or 1099) group under the "#" anchor at the top.
 */
export function AlphabetIndex({ activeLetters }: AlphabetIndexProps) {
  const items = ["#", ...LETTERS];

  return (
    <nav aria-label="Jump to letter" className="flex flex-wrap gap-1">
      {items.map((letter) => {
        const isActive = activeLetters.has(letter);
        const label = letter === "#" ? "number terms" : letter;

        if (!isActive) {
          return (
            <span
              key={letter}
              className="inline-flex h-9 w-9 items-center justify-center rounded-st-sm font-st-sans text-st-small font-medium text-st-ink"
            >
              {letter}
            </span>
          );
        }

        return (
          <a
            key={letter}
            href={`#g-${letter === "#" ? "num" : letter}`}
            aria-label={`Jump to ${label}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-st-sm font-st-sans text-st-small font-medium text-st-ink transition-colors duration-(--st-dur-fast) hover:bg-st-ink hover:text-st-paper focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-st-accent"
          >
            {letter}
          </a>
        );
      })}
    </nav>
  );
}
