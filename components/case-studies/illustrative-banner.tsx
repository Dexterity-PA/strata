import { cn } from "@/lib/utils";

interface IllustrativeBannerProps {
  /** The made-up character this page follows, e.g. "Dana". */
  name: string;
  /** A short clause describing the made-up situation. */
  situation: string;
  className?: string;
}

/**
 * The explicit framing block that opens every case study: this is a
 * hypothetical, the figures are invented, and none of it is advice. Kept
 * visually distinct (bordered card with a gold rule) so a reader cannot miss
 * it before reading the walkthrough.
 */
export function IllustrativeBanner({
  name,
  situation,
  className,
}: IllustrativeBannerProps) {
  return (
    <aside
      className={cn(
        "rounded-st-lg border border-st-line bg-st-surface p-7 sm:p-8",
        className,
      )}
    >
      <span aria-hidden className="block h-px w-10 bg-st-accent" />
      <p className="mt-5 font-st-sans text-st-small font-medium uppercase tracking-wide text-st-accent">
        An illustrative example, not advice
      </p>
      <p className="mt-4 text-st-body text-st-ink">
        {name} is a made-up person, and {situation} The names and every dollar
        figure on this page are invented to show a way of thinking through a
        money question. Nothing here is real data, a benchmark, or a
        recommendation, and none of it is financial advice. Your own numbers and
        situation will be different.
      </p>
    </aside>
  );
}
