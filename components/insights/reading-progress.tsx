"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";

interface ReadingProgressProps {
  children: ReactNode;
}

/**
 * Wraps the article body and paints a very thin gold progress bar fixed at
 * the top of the viewport. Progress tracks scroll through the wrapped region
 * only — empty before the body reaches the top, full once its end clears the
 * bottom.
 *
 * Under reduced motion the bar still tracks position, just without the spring
 * smoothing (the raw scroll value drives it directly, so no easing jank).
 */
export function ReadingProgress({ children }: ReadingProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.3,
  });
  const scaleX = reducedMotion ? scrollYProgress : smooth;

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-(--st-z-nav) h-0.5 origin-left bg-st-accent"
        style={{ scaleX }}
      />
      <div ref={ref}>{children}</div>
    </>
  );
}
