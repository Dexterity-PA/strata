# Strata Financial Planning

High-end financial planning consultancy site — [stratafinancialplanning.com](https://stratafinancialplanning.com).

**Stack:** Next.js 16 (App Router, TS strict) · Tailwind CSS v4 · Framer Motion · GSAP + ScrollTrigger · Lenis · Vercel

```bash
npm run dev      # local dev (Turbopack)
npm run build    # production build
npm run lint     # ESLint
npm run format   # Prettier
```

## Status: Phase 0 complete

The foundation is built: design tokens, fonts, smooth scroll, animation utilities, shared layout/UI components, and all routes as placeholders. **Page content does not exist yet** — every `app/*/page.tsx` (except the layout chrome) is a placeholder to be replaced in later phases.

---

## Environment variables

The contact form (`app/api/contact/route.ts`) sends mail through [Resend](https://resend.com) and needs `RESEND_API_KEY` (see `.env.example`):

- **Locally:** copy `.env.example` to `.env.local` and paste a key from [resend.com/api-keys](https://resend.com/api-keys).
- **Vercel:** add `RESEND_API_KEY` under Project → Settings → Environment Variables.

The key is read server-side only. The from-address is currently the Resend sandbox sender (`onboarding@resend.dev`), which only delivers to the Resend account owner's inbox — once the domain is verified in Resend, swap `FROM_ADDRESS` in `app/api/contact/route.ts` to a domain sender.

---

## Design tokens

All tokens live in `app/globals.css` under `@theme` and are prefixed `st`. Tailwind v4 generates utilities from them:

| Token group            | Examples                                                                                                                                                                                                                                                                                   | Utilities                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| Color                  | `--color-st-ink` (deep navy), `--color-st-bg` (warm off-white), `--color-st-accent` (muted gold), `--color-st-accent-bright` (gold on dark), `--color-st-paper` (text on dark), `--color-st-muted`, `--color-st-line`, `--color-st-line-dark`, `--color-st-surface`, `--color-st-ink-soft` | `bg-st-ink`, `text-st-muted`, `border-st-line` |
| Type scale (fluid)     | `--text-st-display`, `--text-st-h1/h2/h3`, `--text-st-body-lg/body/small/eyebrow` (each with built-in line-height/tracking)                                                                                                                                                                | `text-st-h1`                                   |
| Fonts                  | `--font-st-display` (Fraunces serif), `--font-st-sans` (Inter)                                                                                                                                                                                                                             | `font-st-display`, `font-st-sans`              |
| Spacing                | `--spacing-st-section`, `--spacing-st-section-sm`, `--spacing-st-gutter`                                                                                                                                                                                                                   | `py-st-section`, `px-st-gutter`                |
| Radius / shadow        | `--radius-st-sm/md/lg`, `--shadow-st-sm/md/lg`                                                                                                                                                                                                                                             | `rounded-st-md`, `shadow-st-md`                |
| Easing                 | `--ease-st-out`, `--ease-st-in-out`                                                                                                                                                                                                                                                        | `ease-st-out`                                  |
| Z-index (plain vars)   | `--st-z-menu` (90), `--st-z-nav` (100), `--st-z-modal` (200), `--st-z-toast` (300)                                                                                                                                                                                                         | `z-(--st-z-nav)`                               |
| Durations (plain vars) | `--st-dur-fast/base/slow/reveal` (200/450/800/1100ms)                                                                                                                                                                                                                                      | `duration-(--st-dur-base)`                     |

**Rules:**

- Never hard-code colors, easings, or durations — always use tokens.
- **Register new `text-*` tokens with tailwind-merge.** `cn()` (`lib/utils.ts`) uses `extendTailwindMerge` to classify the custom `st-*` utilities: `--text-st-*` font sizes go in `ST_FONT_SIZES`, `--color-st-*` colors in `ST_COLORS`. Without this, tailwind-merge can't tell a custom size from a custom color (both render as `text-st-*`) and silently drops one when both are applied to an element. If you add a token in `globals.css`, add it to the matching list in `lib/utils.ts`.
- JS animation code uses the mirrors in `lib/animation/motion.ts` (`EASE`, `EASE_CSS`, `DUR`, `STAGGER`). If you change a motion token, update both files.
- The accent is **muted gold** and it is rationed: hairlines, eyebrows, the wordmark dot, hover states. Never large fills.

## Animation system

### Hard rules (60fps non-negotiables)

1. Animate **transform and opacity only** (clip-path allowed for mask reveals). Never width/height/top/left/margin.
2. All scroll-driven animation goes through GSAP ScrollTrigger, which is synced to Lenis via a single `gsap.ticker` RAF loop in `SmoothScrollProvider`. **Never create your own RAF loop or scroll listener for animation.**
3. `will-change` only while animating (see `Parallax` for the pattern: set on enter, remove on leave).
4. Every animation must respect reduced motion — use `useReducedMotion()` from `lib/animation/use-reduced-motion.ts`. There are three layers of protection: this hook (skips Lenis/GSAP work), `MotionConfig reducedMotion="user"` (Framer), and a global CSS kill-switch in `globals.css`.

### Utilities

```tsx
import { Reveal } from "@/components/animation/reveal";
import { Parallax } from "@/components/animation/parallax";
import { SplitText } from "@/components/animation/split-text";
import { useGsapContext } from "@/lib/animation/use-gsap-context";

// Scroll-in reveal — variants: "fade" | "up" | "clip" (mask wipe)
<Reveal variant="clip" delay={0.1}>…</Reveal>

// Scroll-scrubbed parallax — speed -1..1; negative drifts against scroll
<Parallax speed={0.4}>…</Parallax>

// Word-by-word masked headline reveal (plain string children only)
<SplitText as="h1" className="font-st-display text-st-display">
  Clarity for every horizon
</SplitText>

// Custom GSAP work — scoped context, auto cleanup, selectors scoped to el
const scope = useGsapContext<HTMLDivElement>((ctx, el) => {
  gsap.from(".card", { opacity: 0, y: 24, scrollTrigger: { trigger: el } });
});
return <div ref={scope}>…</div>;
```

**Gotchas learned in Phase 0:**

- Always import gsap/ScrollTrigger from `@/lib/animation/gsap` (plugin registration lives there).
- IntersectionObserver never fires for an element fully hidden by its _own_ clip/mask. If a hidden state fully clips the element, observe an un-clipped parent and propagate variants (see `Reveal`/`SplitText` internals).
- `useLenis()` (from `components/providers/smooth-scroll-provider`) returns the live Lenis instance — use `lenis.stop()/start()` for scroll locks, `lenis.scrollTo()` for programmatic scrolling. It is `null` under reduced motion; always fall back gracefully.

## Layout & UI components

- `<Section tone spacing container>` — every page section uses this. Tones: `default` (off-white) / `inverse` (navy) / `surface` (white). It wraps children in `<Container>` unless `container="none"`.
- `<Container size>` — `wide` (max-w-7xl) or `narrow` (prose).
- `<SiteNav>` / `<SiteFooter>` — already wired in `app/layout.tsx`. Don't add them to pages.
- `<Button variant href?>` — `primary` / `secondary` / `ghost`; renders a Link when `href` is set.
- `<Eyebrow tone>` — small-caps label with gold tick, above headings.
- `<Input>` / `<Textarea>` — styled primitives; form logic comes in a later phase.
- Nav/footer/legal links and site metadata are centralized in `lib/site.ts`.

## File ownership (for parallel page-building sessions)

**Shared infrastructure — do NOT edit without coordination** (changes ripple everywhere):

```
app/globals.css          app/layout.tsx           lib/**
components/animation/**  components/layout/**     components/providers/**
components/ui/**
```

**Per-page ownership — safe to edit in parallel**, one session per route directory:

```
app/page.tsx (Home)      app/services/**   app/about/**     app/process/**
app/insights/**          app/faq/**        app/contact/**   app/privacy/**
app/terms/**             app/disclosures/**
```

Conventions for page sessions:

- Build page sections from `<Section>` + the animation utilities; put page-specific components in `app/<route>/_components/` (route-private, underscore-prefixed).
- Need a new _shared_ component or token? Add it in your page first, flag it for promotion — don't edit shared dirs ad hoc.
- Export `metadata` per page (`title` feeds the root template `%s — Strata Financial Planning`).
- The Home page currently contains labeled animation demos — replace them entirely when building the real page.
