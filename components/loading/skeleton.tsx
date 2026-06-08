import { cn } from "@/lib/utils";

/**
 * Quiet loading primitive: a hairline-toned block that breathes via
 * `animate-pulse`. The global reduced-motion guard in globals.css freezes the
 * pulse, so it degrades to a still placeholder for those who ask for less
 * motion. Decorative only, so it is hidden from assistive tech.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "block animate-pulse rounded-st-sm bg-st-line/70",
        className,
      )}
    />
  );
}

/**
 * A grid of card-shaped placeholders, matching the surface cards used across
 * the heavier index routes (insights, tools) while their content streams in.
 */
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-st-md border border-st-line bg-st-surface p-7 shadow-st-sm"
        >
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="mt-6 h-6 w-3/4" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}
