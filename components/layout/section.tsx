import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  /** default = warm off-white; inverse = deep navy; surface = card white. */
  tone?: "default" | "inverse" | "surface";
  /** Vertical rhythm. base = standard section padding, sm = tighter. */
  spacing?: "base" | "sm" | "none";
  /** narrow = prose width. Set to "none" to manage your own container. */
  container?: "wide" | "narrow" | "none";
  className?: string;
}

const tones = {
  default: "bg-st-bg text-st-ink",
  inverse: "bg-st-ink text-st-paper",
  surface: "bg-st-surface text-st-ink",
};

const spacings = {
  base: "py-st-section",
  sm: "py-st-section-sm",
  none: "",
};

/**
 * Standard section wrapper: consistent vertical rhythm + max-width
 * container. Every page section should use this for layout consistency.
 */
export function Section({
  children,
  id,
  tone = "default",
  spacing = "base",
  container = "wide",
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn(tones[tone], spacings[spacing], className)}>
      {container === "none" ? (
        children
      ) : (
        <Container size={container}>{children}</Container>
      )}
    </section>
  );
}
