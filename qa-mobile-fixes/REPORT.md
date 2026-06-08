# Mobile fixes — #1 (contact reveal) and #3 (tap targets)

Fixes for two issues from the mobile audit (PR #31). Issue #2 (process timeline) was
left untouched, as requested. Every result below was measured in real Chromium against
the dev server, not assumed.

## Fix #1 — contact form invisible at load on short viewports (HIGH)

**Root cause:** `app/contact/page.tsx` wrapped `<GuidedIntake />` in a `Reveal` that uses
Framer Motion `whileInView` (`amount: 0.25`, `margin: "0px 0px -10% 0px"`). On a 375x667
viewport the form sat just past that trigger line at scroll 0, so it stayed `opacity: 0`
until a scroll event fired — a blank gap where the form should be.

**Fix (not a trigger nudge):** added a `trigger` prop to the `Reveal` primitive. `trigger="mount"`
plays the entrance once on mount with `animate` instead of `whileInView`, so the element is
never gated behind a scroll when it is already on screen. The contact form now uses
`trigger="mount"`. This removes the scroll dependency entirely rather than moving the
breakpoint. The reduced-motion branch is unchanged (it still returns a plain `<div>`, no
animation, always visible).

Separately, the contact hero used a fixed `pt-44` (176px) top padding. Even with the
reveal fixed, that pushed the first option card below a 375x667 fold. Reduced it to
`pt-28` on mobile, restored to `pt-44` at `sm:` and up (`pt-28 ... sm:pt-44`) — a
width-responsive change, no viewport-height dependency. It clears the fixed nav with
margin (nav bottom 93px vs content start ~112px).

### Before / after — contact reveal wrapper opacity at load (scroll 0)

| Viewport | Before | After |
|---|---|---|
| 375 x 667 (iPhone SE) | **opacity 0 (blank gap)** | opacity 1, form rendered |
| 390 x 844 (iPhone 14) | opacity 1 | opacity 1 |
| 768 x 1024 (tablet) | opacity 1 | opacity 1 |
| 1440 x 900 (desktop) | opacity 1 | opacity 1 |
| 375 x 667, reduced-motion | (plain div) opacity 1 | opacity 1, form rendered |

### First option card ("For a business") at load

| Viewport | Before top | After top | Fully in fold after |
|---|---|---|---|
| 375 x 667 | 701px (below fold, only heading visible) | 637px (label visible) | start visible* |
| 390 x 844 | ~602px | 640px | yes (bottom 736) |
| 768 x 1024 | ~480px | 665px | yes |
| 1440 x 900 | — | 685px | yes |

\* On a 667px-tall viewport a 420px three-step form cannot sit entirely above the fold with
a headline + intro above it; that is inherent to the content, not the bug. The defect — the
form rendering as a blank gap that needs a scroll to appear — is resolved: at load the user
sees the progress bar, "STEP 1 OF 3", "Who is this for?", and the start of the first option.

## Fix #3 — touch targets to a 44x44 minimum (LOW–MEDIUM)

All expanded via hit area (min-height / min-width / flex centering), keeping the visual
icon/text size the same. Primary CTAs and inputs were left alone (already 50–53px).

### Before / after — hit area at 375x667

| Control | Before | After |
|---|---|---|
| Nav toggle | 40 x 40 | 44 x 44 |
| "Copy summary" (all calculators) | ~22 tall | 44 x 125 |
| "+ Add a debt" | ~22 tall | 44 x 92 |
| Debt row remove (x) | 32 x 32 | 44 x 44 |
| Emergency-fund month buttons (3/4/5/6) | 38 x 41 | 44 x 44 |
| Pricing segmented buttons (same control) | <44 | >=44 |
| Contact step-2 chips | 40 tall | 44 (137–231 wide) |
| Contact "Back" step button † | ~22 x 33 | 44 x 44 |
| "See how it works" (ghost variant) | 30 tall | 44 x 128 |

† "Back" was not on the original list, but it sits in the same intake flow next to the
chips and was the same sub-44 pattern; fixed for consistency.

## Files changed

| File | Change |
|---|---|
| `components/animation/reveal.tsx` | New `trigger?: "scroll" \| "mount"` prop; `"mount"` plays via `animate` (no IntersectionObserver). Reduced-motion path unchanged. |
| `app/contact/page.tsx` | Form `Reveal` now `trigger="mount"`; hero padding `pt-44` → `pt-28 ... sm:pt-44`. |
| `components/layout/site-nav.tsx` | Mobile toggle `h-10 w-10` → `h-11 w-11`. |
| `components/ui/button.tsx` | `ghost` variant gains `min-h-11` (covers "See how it works" + 4 other ghost links). |
| `components/tools/copy-summary-button.tsx` | Button gains `min-h-11`. |
| `components/tools/tool-kit.tsx` | `SegmentedControl` label → `inline-flex min-h-11 min-w-11 items-center justify-center`. |
| `components/tools/debt-comparison.tsx` | "Add a debt" gains `min-h-11`; row remove `p-2` → `h-11 w-11` centered. |
| `components/contact/guided-intake.tsx` | Step-2 chips gain `min-h-11`; "Back" gains `min-h-11 min-w-11` centered. |

## Verification

- tsc `--noEmit`: clean
- eslint (changed files): clean
- prettier `--check` (changed files): clean
- next build: clean (exit 0, compiled successfully)
- Real Chromium renders at 375x667 / 390x844 / 768x1024 / 1440x900: form visible at load
  on all four; reduced-motion emulated and confirmed; every listed control measures >=44px.

No copy was changed. No advice/advisor/fiduciary language, no em dashes introduced.
