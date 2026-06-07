"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// Server snapshot: assume motion is fine; the global CSS guard in
// globals.css covers anything that renders before hydration.
function getServerSnapshot() {
  return false;
}

/**
 * True when the user prefers reduced motion. Correct on the first client
 * render (no post-mount flip), updates live if the OS setting changes.
 * Every animation utility in this codebase must consult this guard.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
