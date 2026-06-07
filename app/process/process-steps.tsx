"use client";

import { Reveal } from "@/components/animation/reveal";
import { gsap } from "@/lib/animation/gsap";
import { useGsapContext } from "@/lib/animation/use-gsap-context";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";

const STEPS = [
  {
    title: "Reach out.",
    body: "Send a message through the form or by email. Tell me a little about your situation, no detail too small or too messy.",
  },
  {
    title: "We talk.",
    body: "A relaxed conversation to understand where you are, what’s worrying you, and what you want to be true a year from now.",
  },
  {
    title: "I review.",
    body: "I take time with your numbers and situation, carefully and confidentially.",
  },
  {
    title: "You get a plan.",
    body: "A clear, written plan in plain language, with specific next steps you can actually take.",
  },
  {
    title: "Follow up.",
    body: "Questions afterward are welcome. This isn’t a one-and-done transaction.",
  },
];

/**
 * The five steps as a vertical sequence beside a hairline rail. A gold
 * progress line is scrubbed (scaleY, transform-only) to scroll position via
 * ScrollTrigger, which is already synced to the Lenis ticker. Under reduced
 * motion the gold line renders complete and static.
 */
export function ProcessSteps() {
  const reduced = useReducedMotion();

  const scope = useGsapContext<HTMLDivElement>(
    (ctx, el) => {
      if (reduced) {
        // Static fallback: show the completed line, no scrub.
        gsap.set(".js-progress", { scaleY: 1 });
        return;
      }
      gsap.fromTo(
        ".js-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 65%",
            scrub: true,
          },
        },
      );
    },
    [reduced],
  );

  return (
    <div ref={scope} className="relative">
      {/* Rail track + scrubbed gold fill (decorative, transform-only) */}
      <div
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-[2px] bg-st-line"
      />
      <div
        aria-hidden
        className="js-progress absolute top-2 bottom-2 left-[7px] w-[2px] origin-top bg-st-accent will-change-transform"
        // Identical on server and client first render (no hydration drift);
        // GSAP owns the transform from mount onward.
        style={{ transform: "scaleY(0)" }}
      />

      <ol className="space-y-16 sm:space-y-20">
        {STEPS.map((step, i) => (
          <li key={step.title} className="relative pl-12 sm:pl-16">
            {/* Step marker, centered on the rail */}
            <span
              aria-hidden
              className="absolute top-1 left-0 block h-4 w-4 rounded-full border border-st-accent bg-st-bg"
            />
            <Reveal>
              <span className="font-st-sans text-st-eyebrow font-medium text-st-accent uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-st-display text-st-h3 text-st-ink">
                {step.title}
              </h2>
              <p className="mt-3 max-w-xl text-st-body-lg text-st-muted">
                {step.body}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
