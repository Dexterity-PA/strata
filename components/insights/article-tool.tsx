import { BufferCalculator } from "@/components/tools/buffer-calculator";
import { DebtComparison } from "@/components/tools/debt-comparison";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/animation/reveal";
import { Section } from "@/components/layout/section";
import type { PostTool } from "@/app/insights/posts";

interface ArticleToolProps {
  tool: PostTool;
}

/**
 * Renders the calculator a post asks for, inline near the end of its body.
 * The components are imported untouched. DebtComparison is self-contained
 * (owns its own section + heading); BufferCalculator is a bare grid, so it
 * gets a surface-toned wrapper here to give it room and a heading without
 * editing the component itself.
 */
export function ArticleTool({ tool }: ArticleToolProps) {
  if (tool === "debt") {
    return <DebtComparison />;
  }

  return (
    <Section tone="surface" container="none" spacing="base">
      <Container size="wide" className="max-w-4xl">
        <header className="mb-10 max-w-2xl">
          <Reveal variant="fade">
            <Eyebrow>Try it with your numbers</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="mt-5 font-st-sans text-st-body-lg leading-relaxed text-st-muted">
              The same calculation from this post, live. Put in your figures and
              watch the buffer target update.
            </p>
          </Reveal>
        </header>
        <Reveal variant="up" delay={0.05}>
          <BufferCalculator />
        </Reveal>
      </Container>
    </Section>
  );
}
