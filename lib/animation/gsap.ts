import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single registration point for GSAP plugins. Always import gsap and
 * ScrollTrigger from this module — never from "gsap" directly — so plugin
 * registration is guaranteed and consistent.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
