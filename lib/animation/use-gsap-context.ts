"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type DependencyList,
  type RefObject,
} from "react";
import { gsap } from "@/lib/animation/gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scoped gsap.context with automatic cleanup.
 *
 * Returns a ref to attach to the animation root. `setup` receives the gsap
 * context and the scope element itself. All GSAP selectors and tweens
 * created inside `setup` are scoped to that element and reverted
 * (including their ScrollTriggers) on unmount / dependency change.
 *
 * @example
 * const scope = useGsapContext<HTMLDivElement>((ctx, el) => {
 *   gsap.from(".card", { opacity: 0, y: 24, stagger: 0.1 }); // scoped to el
 * });
 * return <div ref={scope}>…</div>;
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: gsap.Context, el: T) => void,
  deps: DependencyList = [],
): RefObject<T | null> {
  const scope = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const ctx = gsap.context((self) => setup(self, el), scope);
    return () => ctx.revert();
  }, deps);

  return scope;
}
