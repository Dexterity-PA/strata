"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DUR, EASE } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

/**
 * Animated accordion. Per the animation rules, only transform/opacity are
 * animated: the answer fades/slides in and the icon rotates, while the
 * row's height change is instant (no height/layout animation).
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();
  const baseId = useId();

  return (
    <div className="divide-y divide-st-line border-y border-st-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const buttonId = `${baseId}-button-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={item.question}>
            <h2>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="font-st-display text-st-h3 text-st-ink transition-colors duration-(--st-dur-fast) group-hover:text-st-accent">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={`relative h-4 w-4 shrink-0 transition-transform duration-(--st-dur-base) ease-(--ease-st-out) ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-st-accent" />
                  <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-st-accent" />
                </span>
              </button>
            </h2>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={
                    reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { duration: DUR.base, ease: EASE.out }
                  }
                >
                  <p className="max-w-2xl pb-8 text-st-body-lg text-st-muted">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
