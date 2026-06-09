import Link from "next/link";
import { Reveal } from "@/components/animation/reveal";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";

interface PathLink {
  label: string;
  href: string;
}

interface Path {
  /** Small numbered label above the heading. */
  marker: string;
  heading: string;
  blurb: string;
  links: PathLink[];
}

/**
 * The two visitor paths. Each is a few words plus a small set of forward
 * links into the pages that already explain the detail. We point, we do not
 * re-explain.
 */
const PATHS: Path[] = [
  {
    marker: "Path 01",
    heading: "You run a small business",
    blurb:
      "Get a clearer read on cash flow, pricing, and what your numbers are actually telling you.",
    links: [
      { label: "What we can cover", href: "/services#small-businesses" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Start a conversation", href: "/contact" },
    ],
  },
  {
    marker: "Path 02",
    heading: "You are looking at your own money",
    blurb:
      "Budgeting, paying down debt, saving toward a goal, or just making sense of where it all goes.",
    links: [
      { label: "What we can cover", href: "/services#individuals-families" },
      { label: "Free tools to try", href: "/tools" },
      { label: "Start a conversation", href: "/contact" },
    ],
  },
];

export function StartPaths() {
  return (
    <Section tone="surface">
      <Reveal variant="fade" duration={0.8} trigger="mount">
        <Eyebrow>Two ways in</Eyebrow>
      </Reveal>
      <Reveal variant="up" delay={0.1} trigger="mount">
        <h2 className="mt-6 max-w-2xl font-st-display text-st-h2 text-st-ink">
          Which sounds more like you?
        </h2>
      </Reveal>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-st-md border border-st-line bg-st-line md:grid-cols-2">
        {PATHS.map((path, i) => (
          <li key={path.heading} className="h-full">
            <Reveal
              variant="up"
              delay={Math.min(i * 0.1, 0.2)}
              trigger="mount"
              className="h-full"
            >
              <div className="flex h-full flex-col bg-st-surface p-8 lg:p-10">
                <span className="font-st-sans text-st-eyebrow font-medium uppercase tracking-[0.16em] text-st-accent">
                  {path.marker}
                </span>
                <h3 className="mt-4 font-st-display text-st-h3 text-st-ink">
                  {path.heading}
                </h3>
                <p className="mt-3 font-st-sans text-st-body leading-relaxed text-st-muted">
                  {path.blurb}
                </p>
                <ul className="mt-7 border-t border-st-line">
                  {path.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between gap-4 border-b border-st-line py-4 font-st-sans text-st-small font-medium text-st-ink transition-colors duration-(--st-dur-fast) ease-st-out hover:text-st-accent focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-st-accent"
                      >
                        <span>{link.label}</span>
                        <svg
                          aria-hidden
                          viewBox="0 0 16 16"
                          className="h-3.5 w-3.5 shrink-0 text-st-accent transition-transform duration-(--st-dur-fast) ease-st-out group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
