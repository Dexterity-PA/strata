"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  GLOSSARY_CATEGORIES,
  termAnchorId,
  type GlossaryCategory,
  type GlossaryTerm,
} from "@/app/glossary/terms";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";
import { AlphabetIndex } from "./alphabet-index";
import { TermCard } from "./term-card";

interface GlossaryBrowserProps {
  terms: readonly GlossaryTerm[];
}

/** Numeric terms (401(k), 1099) sort and group ahead of the letters. */
function groupKey(term: string): string {
  const first = term[0];
  return /[0-9]/.test(first) ? "#" : first.toUpperCase();
}

interface TermGroup {
  key: string;
  anchor: string;
  entries: GlossaryTerm[];
}

/**
 * Searchable, filterable glossary. Filtering and grouping run on the client so
 * results update as you type. The full list renders on first paint (empty
 * query, no category), so no content is hidden behind interactivity.
 */
export function GlossaryBrowser({ terms }: GlossaryBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GlossaryCategory | null>(null);
  const [scrollNonce, setScrollNonce] = useState(0);
  const pendingTargetRef = useRef<string | null>(null);
  const searchId = useId();
  const reducedMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms.filter((entry) => {
      if (category && entry.category !== category) return false;
      if (!q) return true;
      return (
        entry.term.toLowerCase().includes(q) ||
        entry.definition.toLowerCase().includes(q)
      );
    });
  }, [terms, query, category]);

  const groups = useMemo<TermGroup[]>(() => {
    const sorted = [...filtered].sort((a, b) =>
      a.term.localeCompare(b.term, "en"),
    );
    const map = new Map<string, TermGroup>();
    for (const entry of sorted) {
      const key = groupKey(entry.term);
      let group = map.get(key);
      if (!group) {
        group = { key, anchor: key === "#" ? "num" : key, entries: [] };
        map.set(key, group);
      }
      group.entries.push(entry);
    }
    return [...map.values()];
  }, [filtered]);

  const activeLetters = useMemo(
    () => new Set(groups.map((g) => g.key)),
    [groups],
  );

  // A "see also" click clears filters (so the target is always present) and
  // bumps a nonce. The effect then runs after the list has re-rendered and
  // scrolls to the term. The pending term lives in a ref so resolving it never
  // triggers another render, and the nonce guarantees the scroll fires even
  // when no filter was active to change.
  useEffect(() => {
    const target = pendingTargetRef.current;
    if (!target) return;
    pendingTargetRef.current = null;
    const el = document.getElementById(termAnchorId(target));
    el?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [scrollNonce, reducedMotion]);

  function selectTerm(term: string) {
    pendingTargetRef.current = term;
    setQuery("");
    setCategory(null);
    setScrollNonce((n) => n + 1);
  }

  const hasResults = filtered.length > 0;

  function reset() {
    setQuery("");
    setCategory(null);
  }

  return (
    <div>
      {/* Controls: search, then category filter. */}
      <div className="flex flex-col gap-6">
        <div>
          <label
            htmlFor={searchId}
            className="font-st-sans text-st-small font-medium text-st-ink"
          >
            Search the glossary
          </label>
          <Input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try a word like budget, APR, or revenue"
            autoComplete="off"
            className="mt-2"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All terms"
            isActive={category === null}
            onClick={() => setCategory(null)}
          />
          {GLOSSARY_CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              label={cat}
              isActive={category === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* Result count and A to Z jump bar. Sticks below the fixed nav on
          desktop so the index stays reachable while the list scrolls. On
          smaller screens the alphabet wraps to several rows, so it stays in
          flow rather than pinning a tall strip over the content. */}
      <div className="mt-10 flex flex-col gap-6 border-t border-st-line bg-st-bg pt-6 lg:sticky lg:top-16 lg:z-10 lg:flex-row lg:items-center lg:justify-between lg:pb-5">
        <p
          aria-live="polite"
          className="font-st-sans text-st-small text-st-muted"
        >
          Showing {filtered.length} of {terms.length} terms
        </p>
        <AlphabetIndex activeLetters={activeLetters} />
      </div>

      {/* Results, grouped by first letter. */}
      {hasResults ? (
        <div className="mt-12 flex flex-col gap-12">
          {groups.map((group) => (
            <section
              key={group.key}
              id={`g-${group.anchor}`}
              className="scroll-mt-40"
            >
              <div className="flex items-center gap-4">
                <h2 className="font-st-display text-st-h2 text-st-accent">
                  {group.key}
                </h2>
                <span aria-hidden className="h-px flex-1 bg-st-line" />
              </div>
              <div className="mt-6 grid gap-px overflow-hidden rounded-st-md border border-st-line bg-st-line sm:grid-cols-2 lg:grid-cols-3">
                {group.entries.map((entry) => (
                  <TermCard
                    key={entry.term}
                    entry={entry}
                    onSelectTerm={selectTerm}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-st-md border border-st-line bg-st-surface p-10 text-center">
          <p className="font-st-display text-st-h3 text-st-ink">
            No terms match that yet
          </p>
          <p className="mx-auto mt-3 max-w-md text-st-body text-st-muted">
            Try a shorter word or a different category. If a term you were
            hoping for is missing, let us know and we will add it.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 font-st-sans text-st-small font-medium text-st-accent underline decoration-st-accent/40 decoration-1 underline-offset-4 transition-colors duration-(--st-dur-fast) hover:decoration-st-accent"
          >
            Clear search and filters
          </button>
        </div>
      )}
    </div>
  );
}

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={
        "rounded-st-sm px-4 py-2 font-st-sans text-st-small font-medium transition-colors duration-(--st-dur-fast) ease-st-out focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-st-accent " +
        (isActive
          ? "bg-st-ink text-st-paper"
          : "border border-st-line text-st-ink hover:border-st-accent hover:text-st-accent")
      }
    >
      {label}
    </button>
  );
}
