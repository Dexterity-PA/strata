"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { DUR, EASE } from "@/lib/animation/motion";
import { isNavGroup, NAV_LINKS, type NavGroup, SITE } from "@/lib/site";
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

/** Shared underline accent used by inline links and the dropdown trigger. */
function NavUnderline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute -bottom-1.5 left-0 h-px bg-st-accent transition-[width] duration-(--st-dur-base) ease-st-out",
        active ? "w-full" : "w-0",
      )}
    />
  );
}

/**
 * Desktop "Learn" dropdown. Opens on hover and on keyboard focus; closes on
 * Escape, outside click, and when focus leaves the group. Keyboard model:
 * Enter/Space/ArrowDown open and move into the menu, arrows (or Tab) move
 * between items, Escape closes and returns focus to the trigger.
 */
function NavDropdown({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  // Suppresses the focus-to-open handler for the programmatic refocus that
  // follows an Escape, so closing stays closed.
  const suppressFocusOpen = useRef(false);
  const panelId = useId();

  const groupActive = group.children.some((child) =>
    pathname.startsWith(child.href),
  );

  // Close when the route changes (adjust-during-render pattern).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Close on outside pointer interaction.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function focusItemAt(index: number) {
    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    if (items.length === 0) return;
    const next = (index + items.length) % items.length;
    items[next]?.focus();
  }

  // Open, then move focus into the panel once it has mounted.
  function openInto(index: number) {
    setOpen(true);
    requestAnimationFrame(() => focusItemAt(index));
  }

  // Close, returning focus to the trigger without letting onFocus reopen it.
  function closeToTrigger() {
    suppressFocusOpen.current = true;
    setOpen(false);
    triggerRef.current?.focus();
    requestAnimationFrame(() => {
      suppressFocusOpen.current = false;
    });
  }

  function onTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
        event.preventDefault();
        openInto(0);
        break;
      case "ArrowUp":
        event.preventDefault();
        openInto(group.children.length - 1);
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  }

  function onItemKeyDown(
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number,
  ) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusItemAt(index + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusItemAt(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusItemAt(0);
        break;
      case "End":
        event.preventDefault();
        focusItemAt(group.children.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        closeToTrigger();
        break;
    }
  }

  return (
    <li
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        // Keep open while a child is keyboard-focused.
        if (containerRef.current?.contains(document.activeElement)) return;
        setOpen(false);
      }}
      onFocus={() => {
        if (suppressFocusOpen.current) return;
        setOpen(true);
      }}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "relative inline-flex items-center gap-1 font-st-sans text-st-small font-medium tracking-wide transition-colors duration-(--st-dur-fast)",
          groupActive || open
            ? "text-st-ink"
            : "text-st-muted hover:text-st-ink",
        )}
      >
        {group.label}
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className={cn(
            "h-2.5 w-2.5 transition-transform duration-(--st-dur-fast) ease-st-out motion-reduce:transition-none",
            open && "rotate-180",
          )}
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <NavUnderline active={groupActive} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={panelId}
            role="menu"
            aria-label={group.label}
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{
              duration: prefersReducedMotion ? 0 : DUR.fast,
              ease: EASE.out,
            }}
            className="absolute left-0 top-full z-50 mt-3 min-w-[13rem] overflow-hidden rounded-st-sm border border-st-line/70 bg-st-bg p-1.5 shadow-xl shadow-st-ink/10 backdrop-blur-md"
          >
            {group.children.map((child, index) => {
              const active = pathname.startsWith(child.href);
              return (
                <li key={child.href} role="none">
                  <Link
                    ref={(element) => {
                      itemRefs.current[index] = element;
                    }}
                    href={child.href}
                    role="menuitem"
                    onKeyDown={(event) => onItemKeyDown(event, index)}
                    className={cn(
                      "block rounded-st-sm px-3.5 py-2 font-st-sans text-st-small font-medium transition-colors duration-(--st-dur-fast)",
                      "hover:bg-st-accent/10 hover:text-st-ink focus-visible:bg-st-accent/10 focus-visible:text-st-ink focus-visible:outline-none",
                      active ? "text-st-accent" : "text-st-muted",
                    )}
                  >
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Flattened mobile rows: links plus group labels and their indented children. */
type MobileRow =
  | { kind: "link"; label: string; href: string }
  | { kind: "group-label"; label: string }
  | { kind: "child"; label: string; href: string };

function buildMobileRows(): MobileRow[] {
  const rows: MobileRow[] = [];
  for (const item of NAV_LINKS) {
    if (isNavGroup(item)) {
      rows.push({ kind: "group-label", label: item.label });
      for (const child of item.children) {
        rows.push({ kind: "child", label: child.label, href: child.href });
      }
    } else {
      rows.push({ kind: "link", label: item.label, href: item.href });
    }
  }
  return rows;
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
  const mobileRows = buildMobileRows();

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
        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.filter(
            (item) => isNavGroup(item) || item.href !== "/",
          ).map((item) => {
            if (isNavGroup(item)) {
              return (
                <NavDropdown
                  key={item.label}
                  group={item}
                  pathname={pathname}
                />
              );
            }
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative whitespace-nowrap font-st-sans text-st-small font-medium tracking-wide transition-colors duration-(--st-dur-fast)",
                    active ? "text-st-ink" : "text-st-muted hover:text-st-ink",
                  )}
                >
                  {item.label}
                  <NavUnderline active={active} />
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className={cn(
                "inline-flex shrink-0 items-center whitespace-nowrap rounded-st-sm border border-st-ink/25 px-5 font-st-sans text-st-small font-medium text-st-ink",
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
            className="fixed inset-0 z-(--st-z-menu) flex flex-col justify-center overflow-y-auto bg-st-bg px-st-gutter py-24 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.base, ease: EASE.out }}
          >
            <ul className="flex flex-col gap-2">
              {mobileRows.map((row, i) => {
                const reveal = {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0 },
                  transition: {
                    duration: DUR.base,
                    delay: 0.05 + i * 0.05,
                    ease: EASE.out,
                  },
                };

                if (row.kind === "group-label") {
                  return (
                    <motion.li key={`group-${row.label}`} {...reveal}>
                      <span className="font-st-display text-st-h3 text-st-muted">
                        {row.label}
                      </span>
                    </motion.li>
                  );
                }

                const isChild = row.kind === "child";
                return (
                  <motion.li
                    key={row.href}
                    {...reveal}
                    className={isChild ? "ml-4 border-l border-st-line" : ""}
                  >
                    <Link
                      href={row.href}
                      className={cn(
                        "block font-st-display transition-colors duration-(--st-dur-fast)",
                        isChild ? "pl-4 text-st-h3" : "text-st-h2",
                        pathname === row.href
                          ? "text-st-accent"
                          : "text-st-ink hover:text-st-accent",
                      )}
                    >
                      {row.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
