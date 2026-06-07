"use client";

import type { ReactNode } from "react";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { Button } from "@/components/ui/button";

interface ScrollToButtonProps {
  /** CSS selector of the scroll target, e.g. "#process". */
  target: string;
  children: ReactNode;
}

/**
 * Ghost button that scrolls to an on-page section. Goes through Lenis so
 * the travel matches the site's smooth scroll; falls back to a native jump
 * under reduced motion (when Lenis is not mounted).
 */
export function ScrollToButton({ target, children }: ScrollToButtonProps) {
  const lenis = useLenis();

  const handleClick = () => {
    if (lenis) {
      lenis.scrollTo(target, { offset: -64 });
    } else {
      document.querySelector(target)?.scrollIntoView();
    }
  };

  return (
    <Button variant="ghost" onClick={handleClick}>
      {children}
    </Button>
  );
}
