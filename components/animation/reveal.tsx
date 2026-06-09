"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { DUR, EASE } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";
import { cn } from "@/lib/utils";

type RevealVariant = "fade" | "up" | "clip";
type RevealTrigger = "scroll" | "mount";

/**
 * Hard ceiling on how long a scroll reveal may stay hidden. If neither the
 * precise nor the loose in-view detector has fired by now, the reveal "falls
 * open" so content can never be stranded at opacity 0. Kept short enough that
 * a stuck reveal self-heals before a visitor would notice, long enough not to
 * pre-empt a genuine just-below-the-fold scroll reveal that is about to play.
 */
const FALLBACK_MS = 1200;

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
  /**
   * "scroll" (default) plays when the element scrolls into view. "mount" plays
   * once on mount, regardless of scroll position. Use "mount" for critical
   * above/near-fold content that must never be gated behind a scroll on short
   * viewports (e.g. the contact form).
   */
  trigger?: RevealTrigger;
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

const VIEWPORT_MARGIN = "0px 0px -10% 0px";

/**
 * Scroll-in reveal. Animates transform/opacity (plus clip-path for the mask
 * variant) only — never layout properties. Under reduced motion it renders
 * a plain element with no animation at all.
 *
 * Structure note: the outer motion.div is what the viewport observes; the
 * inner one carries the hidden styles. A fully-clipped element has no
 * visible area, so observing it directly would never trigger.
 *
 * Safety net (scroll trigger): framer-motion's `amount: 0.25` threshold can
 * never be satisfied when the wrapped element is taller than ~4× the viewport
 * (25% of its height can't fit on screen at once), which strands tall content
 * at opacity 0 forever. Three guards close that gap, in order of preference:
 *   1. The precise 0.25 detector — unchanged, so normal short reveals animate
 *      exactly as before.
 *   2. A loose "any part visible" detector, used only once the element is
 *      measured as too tall for the 0.25 threshold. This reveals tall content
 *      (already on screen at mount, or scrolled to later) right away.
 *   3. A short post-mount timeout that falls the reveal open if, for any
 *      reason, neither detector has fired — so a never-fired trigger always
 *      ends visible, never hidden. Armed only when the element is on screen at
 *      mount, so genuinely below-the-fold reveals still wait for the scroll.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = DUR.reveal,
  once = true,
  trigger = "scroll",
  className,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Precise threshold — identical to the original behavior for normal reveals.
  const inView = useInView(ref, {
    once,
    amount: 0.25,
    margin: VIEWPORT_MARGIN,
  });
  // Loose threshold — fires as soon as any part enters. Only consulted for
  // elements measured as too tall for the 0.25 threshold to ever be met.
  const looseInView = useInView(ref, {
    once,
    amount: "some",
    margin: VIEWPORT_MARGIN,
  });

  // True when 25% of the element can't fit in the viewport, so the precise
  // detector can never fire. Measured after mount, before paint.
  const [tooTall, setTooTall] = useState(false);
  // Last-resort backstop so content can never stay hidden.
  const [fellOpen, setFellOpen] = useState(false);

  useEffect(() => {
    if (reducedMotion || trigger !== "scroll") return;

    const el = ref.current;
    let onScreen = false;
    if (el) {
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const rect = el.getBoundingClientRect();
      // 25% of the element's height must fit on screen for `amount: 0.25` to
      // ever be satisfied; if it can't, fall back to the loose detector.
      setTooTall(rect.height * 0.25 > viewportHeight);
      onScreen = rect.top < viewportHeight && rect.bottom > 0;
    }

    // Only backstop content that is already on screen. Below-the-fold reveals
    // are correctly waiting for their scroll and must keep their animation.
    if (!onScreen) return;
    const timer = window.setTimeout(() => setFellOpen(true), FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, trigger, once]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const inner = (
    <motion.div
      variants={variants[variant]}
      transition={{ duration, delay, ease: EASE.out }}
    >
      {children}
    </motion.div>
  );

  // Mount trigger: play immediately, no IntersectionObserver. The element is
  // never left hidden when it is already on screen at load.
  if (trigger === "mount") {
    return (
      <motion.div className={cn(className)} initial="hidden" animate="visible">
        {inner}
      </motion.div>
    );
  }

  const shown = inView || (tooTall && looseInView) || fellOpen;

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={shown ? "visible" : "hidden"}
    >
      {inner}
    </motion.div>
  );
}
