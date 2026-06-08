import type { ReactNode } from "react";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/animation/reveal";
import { ToolHeader } from "@/components/tools/tool-header";

interface ToolPageProps {
  /** Audience / category label above the title. */
  eyebrow?: string;
  title: string;
  intro: ReactNode;
  /** The interactive tool. */
  children: ReactNode;
}

/**
 * Shared shell for a single-tool route: the standard section + gutter, the
 * {@link ToolHeader}, and a revealed slot for the calculator. Keeps every tool
 * page a thin, consistent wrapper.
 */
export function ToolPage({ eyebrow, title, intro, children }: ToolPageProps) {
  return (
    <Section container="none" className="bg-st-bg">
      <div className="mx-auto w-full max-w-5xl px-st-gutter">
        <ToolHeader eyebrow={eyebrow} title={title} intro={intro} />
        <Reveal variant="up" delay={0.05}>
          {children}
        </Reveal>
      </div>
    </Section>
  );
}
