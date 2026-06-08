"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { DUR, EASE } from "@/lib/animation/motion";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

// Scroll-aware state as an external store (native scroll events fire under
// Lenis too, since Lenis animates window scroll).
function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function useScrolled(threshold = 24): boolean {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}

/**
 * Sticky, scroll-aware site navigation. Transparent over the top of the
 * page; gains a translucent backdrop + hairline and tightens once scrolled.
 * Mobile: full-screen overlay menu with staggered link reveal.
 */
export function SiteNav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the menu when the route changes (adjust-during-render pattern).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // Freeze scrolling while the overlay menu is open.
  useEffect(() => {
    if (menuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-(--st-z-nav)",
        "transition-[background-color,border-color,backdrop-filter] duration-(--st-dur-base) ease-st-out",
        scrolled && !menuOpen
          ? "border-b border-st-line/70 bg-st-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between px-st-gutter",
          "transition-[padding] duration-(--st-dur-base) ease-st-out",
          scrolled ? "py-3.5" : "py-6",
        )}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-st-display text-2xl tracking-tight text-st-ink"
          aria-label={`${SITE.name}, home`}
        >
          Strata
          <span aria-hidden className="text-st-accent">
            .
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.filter((l) => l.href !== "/").map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative font-st-sans text-st-small font-medium tracking-wide transition-colors duration-(--st-dur-fast)",
                    active ? "text-st-ink" : "text-st-muted hover:text-st-ink",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-st-accent transition-[width] duration-(--st-dur-base) ease-st-out",
                      active ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center rounded-st-sm border border-st-ink/25 px-5 font-st-sans text-st-small font-medium text-st-ink",
                "transition-[padding,border-color,color,transform] duration-(--st-dur-base) ease-st-out",
                "hover:-translate-y-0.5 hover:border-st-accent hover:text-st-accent",
                scrolled ? "py-2" : "py-2.5",
              )}
            >
              Start a conversation
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative z-(--st-z-nav) flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            aria-hidden
            className={cn(
              "h-px w-6 bg-st-ink transition-transform duration-(--st-dur-base) ease-st-out",
              menuOpen && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "h-px w-6 bg-st-ink transition-transform duration-(--st-dur-base) ease-st-out",
              menuOpen && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-(--st-z-menu) flex flex-col justify-center bg-st-bg px-st-gutter lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.base, ease: EASE.out }}
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: DUR.base,
                    delay: 0.05 + i * 0.06,
                    ease: EASE.out,
                  }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-st-display text-st-h2 transition-colors duration-(--st-dur-fast)",
                      pathname === link.href
                        ? "text-st-accent"
                        : "text-st-ink hover:text-st-accent",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
