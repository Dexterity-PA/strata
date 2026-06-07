import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  /** Tone for light vs. dark (inverse) sections. */
  tone?: "default" | "inverse";
  className?: string;
}

/** Small uppercase label above headings, with a gold tick. */
export function Eyebrow({
  children,
  tone = "default",
  className,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-st-sans text-st-eyebrow font-medium uppercase",
        tone === "inverse" ? "text-st-accent-bright" : "text-st-accent",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-current" />
      {children}
    </span>
  );
}
