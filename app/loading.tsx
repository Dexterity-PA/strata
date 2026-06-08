import { Section } from "@/components/layout/section";
import { StrataMotif } from "@/components/strata/StrataMotif";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Skeleton } from "@/components/loading/skeleton";

export default function Loading() {
  return (
    <Section
      container="none"
      className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden pt-44"
    >
      <StrataMotif variant="lines" density="sparse" className="opacity-50" />
      <Container className="relative">
        <div role="status" aria-live="polite">
          <span className="sr-only">Loading</span>
          <Eyebrow>One moment</Eyebrow>
          <Skeleton className="mt-6 h-10 w-2/3 max-w-xl sm:h-12" />
          <Skeleton className="mt-6 h-4 w-full max-w-md" />
          <Skeleton className="mt-3 h-4 w-4/5 max-w-md" />
        </div>
      </Container>
    </Section>
  );
}
