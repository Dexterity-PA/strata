"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global Framer Motion config. `reducedMotion="user"` makes every motion.*
 * component automatically drop transform animations (keeping only opacity)
 * when the OS requests reduced motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
