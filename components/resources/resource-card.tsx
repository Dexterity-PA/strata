import type { Resource } from "@/app/resources/resources";

/**
 * One downloadable resource, rendered as a card with a download row.
 *
 * Uses a plain anchor (not next/link) with the download attribute because the
 * target is a static file, not an app route. The format and size sit on the
 * action row so a visitor knows what they are getting before they click.
 */
export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.href}
      download
      className="group flex h-full flex-col bg-st-bg p-7 transition-colors duration-(--st-dur-base) ease-st-out hover:bg-st-surface focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-st-accent"
    >
      <span className="font-st-display text-st-h3 text-st-ink">
        {resource.title}
      </span>
      <span className="mt-2 font-st-sans text-st-body leading-relaxed text-st-muted">
        {resource.description}
      </span>
      <span className="mt-6 flex items-center gap-3 pt-1">
        <span className="inline-flex items-center gap-2 font-st-sans text-st-small font-medium text-st-accent">
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-4 w-4 transition-transform duration-(--st-dur-fast) ease-st-out group-hover:translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10" />
          </svg>
          Download
        </span>
        <span aria-hidden className="h-3 w-px bg-st-line" />
        <span className="font-st-sans text-st-small text-st-muted">
          {resource.format} · {resource.size}
        </span>
      </span>
    </a>
  );
}
