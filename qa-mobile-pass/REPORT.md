# Mobile QA pass — findings

Review-first audit. No site code changed in this branch yet. Rendered with Playwright
(real Chromium) at three widths; screenshots in `./screenshots/`.

- **375 x 667** — iPhone SE
- **390 x 844** — iPhone 14
- **768 x 1024** — tablet

Every route was checked: `/`, `/how-it-works`, `/prep`, `/contact`, `/tools` + all 7
tool routes, the editorial posts (incl. the two with embedded calculators), `/privacy`,
`/terms`, plus `/about`, `/faq`, `/disclosures`, `/process`, `/services`, `/pricing`,
`/insights`.

## Headline

The site is, overall, in good mobile shape. **Zero horizontal overflow** at any width on
any route (verified by measuring `document.scrollWidth` against the viewport on all 24
routes at all three widths, and by scanning every element's right edge — getBoundingClientRect
ignores clipping, so off-canvas bleed would still be caught). The nav collapses to a working
overlay menu, the 3-step intake works end to end, and the calculators (including the most
complex one) hold up narrow.

The real problems are a small number of **scroll-reveal animations that leave content
invisible at load**, plus a set of **secondary controls under the 44px touch target**.

---

## Issues, by priority

### 🔴 HIGH — `/contact`: the 3-step form is invisible on load on iPhone SE (375)

On a 375 x 667 viewport you land on `/contact`, see the heading + intro paragraph, then a
**tall blank gap** where the form should be. The form only fades in once you start scrolling.

Root cause: the GSAP/ScrollTrigger `Reveal` wrapper around the entire form sits at
`opacity: 0` at scroll position 0. The form's top is ~602px; the reveal trigger fires at
roughly 85% of viewport height (~567px on a 667px screen), so at load the form is just past
the line and never animates in until a scroll event nudges ScrollTrigger.

This is **viewport-height-specific**, not width-specific:

| Device | Viewport | Form top | Trigger (~85%) | Form at load |
|---|---|---|---|---|
| iPhone SE | 375 x 667 | 602px | ~567px | **hidden (blank gap)** |
| iPhone 14 | 390 x 844 | 573px | ~717px | visible ✓ |
| Tablet | 768 x 1024 | ~480px | ~870px | visible ✓ |

Severity is high because the form is the contact page's entire purpose, and the iPhone SE
class (and any short/landscape viewport ≲ ~710px tall) shows it as empty/broken on arrival.

Evidence: `375-03-contact-step1.jpeg` (blank gap at load) vs `375-04-contact-form-revealed.jpeg`
(same page after scroll), and `390-01-contact-atload.jpeg` / `768-02-contact-atload.jpeg`
(form present at load on taller viewports). The full 3-step flow itself works fine —
`375-04/05/06`.

### 🟡 MEDIUM — `/process`: timeline reads as broken on first paint (mobile)

At load on 375/390, only step **"01 Reach out."** is visible, followed by a long empty
vertical rail; steps 02–04+ are `opacity: 0` until scrolled into view (7 reveal blocks
hidden at load, all confirmed to reveal correctly on scroll). On mobile the single-column,
full-width steps make the empty rail very prominent — it looks incomplete on arrival.

Same reveal-on-scroll root cause as the contact form. This one is partly intended
scroll-storytelling, so lower severity — but the at-load impression on a phone is weak.

Evidence: `375-07-process.jpeg` (one step + empty rail at load) vs `375-08-process-scrolled.jpeg`
(02/03/04 rendering correctly once revealed).

### 🟡 LOW–MEDIUM — Touch targets under 44px (WCAG 2.5.5 / Apple HIG 44pt)

Primary CTAs and form inputs are well-sized (Continue/Send 50px, name/email 52–53px, footer
email 53px, Subscribe 50px). The undersized controls are all **secondary/utility**:

| Control | Size | Where |
|---|---|---|
| Nav hamburger toggle | 40 x 40 | every page (borderline) |
| "Copy summary" button | ~22px tall | all 7 calculators + 2 embedded |
| "+ Add a debt" | ~22px tall | `/tools/debt` + embedded debt post |
| Debt row remove (×) | 32 x 32 | `/tools/debt` + embedded debt post |
| Emergency-fund month buttons (3/4/5/6) | 38 x 41 | `/tools/emergency-fund` |
| Contact step-2 preset chips | 40px tall | `/contact` |
| "See how it works" link | 30px tall | home hero |

All usable, but below the guideline; bumping vertical padding / min-height would improve
thumb accuracy. Evidence: `375-10-tools-debt.jpeg`, `375-05-contact-step2.jpeg`, `375-01-home.jpeg`.

---

## Checked and clear (non-issues)

- **Horizontal overflow** — none, any route, any width.
- **StrataMotif** — the concentric-rings motif on home bleeds intentionally off the
  top-right corner at `md:` (768+); it is clipped, creates no scroll, and looks deliberate.
  Hidden below 768. Not an issue. Evidence: `768-01-home.jpeg`.
- **SiteNav mobile menu** — collapses to a full-screen overlay (nav switches to desktop only
  at `lg` = 1024px, so tablet uses the mobile menu too). All 9 links fit on a 667px screen,
  active state + close button work, scroll is frozen while open. Evidence: `375-02-menu-open.jpeg`.
- **3-step intake** — fully usable: large option cards (the 16px radios are wrapped in
  96px-tall label cards, so the whole card is the tap target), textarea, full-width inputs.
  Works end to end.
- **Footer newsletter** — fine. (A raw scan flagged a 24px input on every page; that is the
  hidden anti-spam honeypot at `left: -9999px`, not the real 53px field.)
- **Embedded calculators in posts** — stack to single-column cards on mobile, switch to a
  5-column row at `sm:` (640+), fit at 768. Evidence: `375-12-embedded-calc-body.jpeg`,
  `768-03-debt-row.jpeg`.
- **Fraunces display sizes** — `clamp()` floors keep them controlled on narrow screens
  (display 44px, h1 36px, h2 28px). No clipped headings or text overlap observed.
- The "N" badge bottom-left in screenshots is the Next.js dev overlay (dev-only), not a site element.

---

## Suggested fix order (pending your confirmation — nothing edited yet)

1. **Contact form reveal on short viewports** (HIGH). Make the form visible at load: either
   skip/relax the `Reveal` on the form section, fire it on mount when already near the
   viewport, or set the ScrollTrigger to a start that accounts for short viewports.
2. **Process timeline first paint** (MEDIUM). Same family — show step 01's neighbors or
   reveal the first 1–2 steps immediately.
3. **Touch targets** (LOW–MEDIUM). Raise the small secondary controls toward 44px.
