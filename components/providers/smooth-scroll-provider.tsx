"use client";

import Lenis from "lenis";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/animation/gsap";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";

// One Lenis instance per app, held in a tiny external store so consumers
// re-render when it appears/disappears without setState-in-effect churn.
let lenisInstance: Lenis | null = null;
const listeners = new Set<() => void>();

function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Access the live Lenis instance (e.g. `lenis.stop()` while a menu is open,
 * `lenis.scrollTo()` for programmatic scrolling). Returns null before init
 * or when the user prefers reduced motion (native scroll is used instead).
 */
export function useLenis(): Lenis | null {
  return useSyncExternalStore(
    subscribe,
    () => lenisInstance,
    () => null,
  );
}

/**
 * Site-wide smooth scroll. Initializes Lenis and drives it from GSAP's
 * ticker — a single RAF loop shared with every ScrollTrigger animation, so
 * the two never fight. Skipped entirely under prefers-reduced-motion.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      anchors: true,
    });

    // Keep ScrollTrigger in sync with Lenis' virtual scroll position.
    instance.on("scroll", ScrollTrigger.update);

    // One RAF loop for everything: GSAP's ticker drives Lenis.
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    setLenisInstance(instance);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenisInstance(null);
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
