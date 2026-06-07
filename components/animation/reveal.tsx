"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { DUR, EASE } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";
import { cn } from "@/lib/utils";

type RevealVariant = "fade" | "up" | "clip";

interface RevealProps {
  children: ReactNode;
  /** fade = opacity only; up = fade + rise; clip = mask wipe upward. */
  variant?: RevealVariant;
  /** Delay in seconds (use to stagger siblings). */
  delay?: number;
  /** Duration in seconds. Defaults to the site reveal duration. */
  duration?: number;
  /** Re-animate every time it enters the viewport (default: once). */
  once?: boolean;
  className?: string;
}

const variants: Record<RevealVariant, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  up: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  clip: {
    hidden: { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" },
    visible: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
  },
};

/**
 * Scroll-in reveal. Animates transform/opacity (plus clip-path for the mask
 * variant) only — never layout properties. Under reduced motion it renders
 * a plain element with no animation at all.
 *
 * Structure note: the outer motion.div is what the viewport observes; the
 * inner one carries the hidden styles. A fully-clipped element has no
 * visible area, so observing it directly would never trigger.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = DUR.reveal,
  once = true,
  className,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25, margin: "0px 0px -10% 0px" }}
    >
      <motion.div
        variants={variants[variant]}
        transition={{ duration, delay, ease: EASE.out }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
