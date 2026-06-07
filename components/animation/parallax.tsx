"use client";

import type { ReactNode } from "react";
import { gsap } from "@/lib/animation/gsap";
import { useGsapContext } from "@/lib/animation/use-gsap-context";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  /**
   * Parallax intensity. Positive = drifts upward slower than the page
   * (background feel), negative = drifts against the scroll (foreground
   * feel). 0.5 ≈ moves half a typical offset. Keep within -1..1.
   */
  speed?: number;
  className?: string;
}

/**
 * Scroll-linked parallax drift. Transform-only (yPercent), scrubbed by
 * ScrollTrigger which is synced to Lenis. Disabled under reduced motion.
 */
export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const reducedMotion = useReducedMotion();

  const scope = useGsapContext<HTMLDivElement>((_ctx, el) => {
    if (reducedMotion) return;
    const target = el.firstElementChild;
    if (!target) return;

    const drift = 24 * speed; // yPercent travel across the viewport pass

    gsap.fromTo(
      target,
      { yPercent: drift, willChange: "transform" },
      {
        yPercent: -drift,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onLeave: () => gsap.set(target, { willChange: "auto" }),
          onEnterBack: () => gsap.set(target, { willChange: "transform" }),
        },
      },
    );
  }, [speed, reducedMotion]);

  return (
    <div ref={scope} className={cn(className)}>
      <div>{children}</div>
    </div>
  );
}
