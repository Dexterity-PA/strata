"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { EASE_CSS } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";

/**
 * One-time branded intro: the Strata wordmark rises out of a line mask on
 * the navy ground, a gold hairline draws in, then the whole curtain wipes
 * up (clip-path) to reveal the page already painted beneath it.
 *
 * Robustness model:
 * - The overlay is server-rendered, so it is part of the very first paint
 *   and never delays the page underneath — content renders behind it.
 * - The animation is pure CSS (transform / opacity / clip-path only), so it
 *   plays and completes even if hydration is slow or never happens.
 * - An inline script right after the overlay runs before paint and hides it
 *   when the intro already played this session (sessionStorage) or the user
 *   prefers reduced motion — no flash on reloads, nothing gated for
 *   reduced-motion users (a CSS media-query rule backstops the no-JS case).
 * - React only manages the scroll lock (native overflow + Lenis) and the
 *   final unmount.
 */

const SESSION_KEY = "strata-intro-shown";
const WORDMARK = "Strata.";

/* Timeline (ms). Total ≈ 1.6s: letters rise, rule draws, curtain wipes. */
const LETTER_DELAY = 100;
const LETTER_STAGGER = 45;
const LETTER_DUR = 650;
const RULE_DELAY = 500;
const RULE_DUR = 550;
const EXIT_DELAY = 950;
const EXIT_DUR = 500;
const WIPE_DELAY = 1000;
const WIPE_DUR = 600;
const TOTAL_MS = WIPE_DELAY + WIPE_DUR;

/* Runs before first paint (parser-blocking, placed right after the overlay
   in the DOM). Skips the intro for repeat loads this session and for
   reduced motion; otherwise marks the session as shown and locks scroll
   immediately — hydration can land mid-intro, too late to stop a wheel or
   the browser's scroll restoration. The lock lives on <body> (it propagates
   to the viewport because <html> overflow is visible) — NOT on <html>,
   which the nav's menu effect owns and resets on mount. The failsafe
   timeout only releases the lock if the overlay is still in the DOM
   (i.e. hydration never took over); otherwise React owns the release. */
const SKIP_SCRIPT = `(function(){try{var e=document.getElementById("strata-intro");if(!e)return;if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("${SESSION_KEY}")){e.dataset.stIntroSkip="true";e.style.display="none"}else{sessionStorage.setItem("${SESSION_KEY}","1");document.body.style.overflow="hidden";setTimeout(function(){if(document.getElementById("strata-intro"))document.body.style.overflow=""},${TOTAL_MS + 800})}}catch(t){var n=document.getElementById("strata-intro");if(n){n.dataset.stIntroSkip="true";n.style.display="none"}}})();`;

/* Keyframes use transform / opacity / clip-path only — compositor work, no
   layout. The reduced-motion rule backstops the inline script (the global
   guard in globals.css zeroes durations but not delays). */
const INTRO_CSS = `
@keyframes st-intro-letter{from{transform:translateY(110%)}to{transform:translateY(0)}}
@keyframes st-intro-rule{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes st-intro-exit{to{transform:translateY(-1.25rem);opacity:0}}
@keyframes st-intro-wipe{from{clip-path:inset(0 0 0 0)}to{clip-path:inset(0 0 100% 0)}}
@media (prefers-reduced-motion: reduce){#strata-intro{display:none}}
`;

export function IntroReveal() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = overlayRef.current;
    if (done || !el) return;

    // The CSS animation has been running since first paint; if hydration
    // arrived after the wipe already finished, don't re-lock scroll.
    const wipeFinished =
      typeof el.getAnimations === "function" &&
      (() => {
        const wipe = el
          .getAnimations()
          .find((a) => (a as CSSAnimation).animationName === "st-intro-wipe");
        return !wipe || wipe.playState === "finished";
      })();

    // The pre-paint script already hid the overlay (repeat load / reduced
    // motion / storage error) — just drop it from the tree.
    if (el.dataset.stIntroSkip === "true" || reducedMotion || wipeFinished) {
      setDone(true);
      return;
    }

    // Keep scroll locked while the curtain is up (the pre-paint script set
    // it): <body> overflow covers native (touch, keyboard) scrolling and is
    // deliberately a separate channel from the <html> overflow the nav menu
    // owns — its effect resets that one on mount. lenis.stop() parks the
    // smooth-scroll loop so its virtual position can't drift behind the
    // lock; it's deferred a tick because the nav's menu effect runs after
    // this one in the same commit and calls lenis.start() on mount.
    document.body.style.overflow = "hidden";
    const stopLenis = setTimeout(() => lenis?.stop(), 0);

    // Unmount when the wipe finishes; the timeout covers the case where the
    // CSS animation already ended before hydration attached this listener.
    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "st-intro-wipe") setDone(true);
    };
    el.addEventListener("animationend", onAnimationEnd);
    const fallback = setTimeout(() => setDone(true), TOTAL_MS + 500);

    return () => {
      el.removeEventListener("animationend", onAnimationEnd);
      clearTimeout(stopLenis);
      clearTimeout(fallback);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [done, lenis, reducedMotion]);

  if (done) return null;

  return (
    <>
      <div
        ref={overlayRef}
        id="strata-intro"
        aria-hidden
        suppressHydrationWarning
        // z-[400]: above every layer token (--st-z-toast is 300) — the
        // curtain must cover nav, menu, and toasts for its 1.6s lifetime.
        className="pointer-events-none fixed inset-0 z-[400] flex items-center justify-center bg-st-ink"
        style={{
          animation: `st-intro-wipe ${WIPE_DUR}ms ${EASE_CSS.inOut} ${WIPE_DELAY}ms both`,
          willChange: "clip-path",
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{
            animation: `st-intro-exit ${EXIT_DUR}ms ${EASE_CSS.inOut} ${EXIT_DELAY}ms both`,
          }}
        >
          <span className="font-st-display text-st-display tracking-tight text-st-paper">
            {WORDMARK.split("").map((letter, i) => (
              <span
                key={i}
                className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
              >
                <span
                  className={
                    letter === "."
                      ? "inline-block text-st-accent-bright"
                      : "inline-block"
                  }
                  style={{
                    animation: `st-intro-letter ${LETTER_DUR}ms ${EASE_CSS.out} ${LETTER_DELAY + i * LETTER_STAGGER}ms both`,
                  }}
                >
                  {letter}
                </span>
              </span>
            ))}
          </span>
          <span
            className="mt-6 h-px w-12 origin-center bg-st-accent-bright"
            style={{
              animation: `st-intro-rule ${RULE_DUR}ms ${EASE_CSS.out} ${RULE_DELAY}ms both`,
            }}
          />
        </div>
      </div>
      <style>{INTRO_CSS}</style>
      <script dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }} />
    </>
  );
}
