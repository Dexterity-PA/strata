"use client";

import { Reveal } from "@/components/animation/reveal";
import { gsap, ScrollTrigger } from "@/lib/animation/gsap";
import { DUR, EASE_CSS } from "@/lib/animation/motion";
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
 * The five steps as a connected vertical sequence beside a hairline rail.
 *
 * A gold progress line is scrubbed (scaleY, transform-only) to scroll
 * position via ScrollTrigger, which is already synced to the Lenis ticker.
 * Each step's marker scales in as it enters the viewport and then "fills"
 * gold as the rail passes it, so the markers read as a progress meter rather
 * than static bullets. Title/body rise in via <Reveal>.
 *
 * Reduced motion: the rail renders complete, every marker renders filled and
 * in place, and <Reveal> renders its children statically — the whole flow is
 * visible with no dependence on scroll animation.
 */
export function ProcessSteps() {
  const reduced = useReducedMotion();

  const scope = useGsapContext<HTMLDivElement>(
    (ctx, el) => {
      const markers = gsap.utils.toArray<HTMLElement>(".js-marker");

      if (reduced) {
        // Static fallback: completed rail, every marker filled and visible.
        gsap.set(".js-progress", { scaleY: 1 });
        gsap.set(markers, { autoAlpha: 1, scale: 1 });
        markers.forEach((m) => m.setAttribute("data-active", "true"));
        return;
      }

      // Scrubbed gold rail fill — the visual spine of the flow.
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

      // Per-marker: a transform-only entrance, plus an activation toggle that
      // fills the dot gold roughly as the scrubbed rail reaches it.
      markers.forEach((m) => {
        gsap.from(m, {
          scale: 0,
          autoAlpha: 0,
          duration: DUR.base,
          ease: EASE_CSS.out,
          scrollTrigger: { trigger: m, start: "top 85%" },
        });

        ScrollTrigger.create({
          trigger: m,
          start: "top 62%",
          onEnter: () => m.setAttribute("data-active", "true"),
          onLeaveBack: () => m.setAttribute("data-active", "false"),
        });
      });
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
            {/* Marker, centered on the rail. The group flag lets the inner
                dot + halo react to the data-active state ScrollTrigger sets.
                will-change-transform keeps the entrance scale on the GPU. */}
            <span
              aria-hidden
              data-active="false"
              className="js-marker group/marker absolute top-1 left-0 block h-4 w-4 will-change-transform"
            >
              {/* Soft halo — fades in only while the step is active. */}
              <span className="absolute -inset-1 rounded-full bg-st-accent/15 opacity-0 transition-opacity duration-500 ease-st-out group-data-[active=true]/marker:opacity-100" />
              {/* The dot itself: hollow → filled gold as the rail passes. */}
              <span className="relative block h-full w-full rounded-full border border-st-accent bg-st-bg transition-colors duration-500 ease-st-out group-data-[active=true]/marker:bg-st-accent" />
            </span>

            <Reveal>
              <span className="font-st-sans text-st-eyebrow font-medium tracking-[0.18em] text-st-accent uppercase">
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
