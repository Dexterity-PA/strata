import { Reveal } from "@/components/animation/reveal";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";

export interface ServiceItem {
  /** Short lead phrase, set in display type. */
  lead: string;
  /** Optional plain-language elaboration after the lead. */
  detail?: string;
}

interface ServiceListProps {
  id?: string;
  eyebrow: string;
  title: string;
  items: ServiceItem[];
  /** Alternate section ground for visual rhythm between lists. */
  tone?: "default" | "surface";
}

/**
 * Editorial numbered service list. Each row reveals independently as it
 * enters the viewport, staggered by index.
 */
export function ServiceList({
  id,
  eyebrow,
  title,
  items,
  tone = "default",
}: ServiceListProps) {
  return (
    <Section id={id} tone={tone}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Reveal variant="clip">
        <h2 className="mt-6 max-w-2xl font-st-display text-st-h1">{title}</h2>
      </Reveal>
      <ul className="mt-14 border-t border-st-line">
        {items.map((item, i) => (
          <li key={item.lead} className="border-b border-st-line">
            <Reveal variant="up" delay={Math.min(i * 0.08, 0.32)}>
              <div className="grid gap-3 py-8 md:grid-cols-[5rem_minmax(0,18rem)_1fr] md:items-baseline md:gap-8">
                <span
                  aria-hidden
                  className="font-st-sans text-st-small text-st-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-st-display text-st-h3 text-st-ink">
                  {item.lead}
                </h3>
                {item.detail ? (
                  <p className="text-st-body text-st-muted">{item.detail}</p>
                ) : null}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
