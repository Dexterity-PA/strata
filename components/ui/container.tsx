import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  /** wide = full content width; narrow = prose/reading width. */
  size?: "wide" | "narrow";
  className?: string;
}

/** Max-width wrapper with the site's responsive gutter. */
export function Container({
  children,
  as: Tag = "div",
  size = "wide",
  className,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-st-gutter",
        size === "wide" ? "max-w-7xl" : "max-w-3xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
