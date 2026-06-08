import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CardGridSkeleton, Skeleton } from "@/components/loading/skeleton";

export default function Loading() {
  return (
    <Section spacing="none" className="pt-44 pb-st-section">
      <div role="status" aria-live="polite">
        <span className="sr-only">Loading insights</span>
        <Eyebrow>Insights</Eyebrow>
        <Skeleton className="mt-6 h-10 w-2/3 max-w-xl sm:h-12" />
        <Skeleton className="mt-6 h-4 w-full max-w-lg" />
        <div className="mt-14">
          <CardGridSkeleton count={6} />
        </div>
      </div>
    </Section>
  );
}
