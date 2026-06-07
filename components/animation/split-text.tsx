"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment, useMemo, type ElementType } from "react";
import { DUR, EASE } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  /** Plain string only — the text is split into words for masking. */
  children: string;
  /** Rendered element (h1, h2, p…). Defaults to span. */
  as?: ElementType;
  /** Delay in seconds before the first word starts. */
  delay?: number;
  /** Stagger between words in seconds. */
  stagger?: number;
  /** Re-animate every time it enters the viewport (default: once). */
  once?: boolean;
  className?: string;
}

// Viewport observation happens on the (un-clipped) block wrapper; the
// clipped word spans inherit the variant state from it. Observing the words
// directly would never fire: a fully-masked element has no visible area for
// IntersectionObserver to intersect.
const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DUR.slow, ease: EASE.out },
  },
};

/**
 * Masked text reveal: each word rises out of an overflow-hidden line mask.
 * Transform-only. Under reduced motion the text renders statically.
 *
 * @example
 * <SplitText as="h1" className="font-st-display text-st-display">
 *   Clarity for every horizon
 * </SplitText>
 */
export function SplitText({
  children,
  as: Tag = "span",
  delay = 0,
  stagger = 0.045,
  once = true,
  className,
}: SplitTextProps) {
  const reducedMotion = useReducedMotion();
  const words = useMemo(
    () => children.split(/\s+/).filter(Boolean),
    [children],
  );
  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      visible: {
        transition: { delayChildren: delay, staggerChildren: stagger },
      },
    }),
    [delay, stagger],
  );

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={cn(className)} aria-label={children}>
      <motion.span
        className="block"
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.3 }}
        variants={containerVariants}
      >
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span className="inline-block" variants={wordVariants}>
                {word}
              </motion.span>
            </span>
            {/* The space must sit between the inline-block masks — trailing
                whitespace inside them is trimmed by the line box. */}
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
