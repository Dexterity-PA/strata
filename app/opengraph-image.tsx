import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

/*
 * OG brand palette. ImageResponse (Satori) renders without a browser, so it
 * cannot read the CSS custom properties in app/globals.css. The brand tokens
 * are therefore hardcoded here and must be kept in sync with globals.css by
 * hand:
 *
 *   NAVY  #0e1b2c  ->  --color-st-ink     (card background)
 *   PAPER #f7f4ee  ->  --color-st-bg      (primary text on navy)
 *   GOLD  #84663a  ->  --color-st-accent  (eyebrow, hairlines, accents)
 *
 * Display face is Fraunces, body face is Inter, both loaded from assets/fonts.
 */
const NAVY = "#0e1b2c";
const PAPER = "#f7f4ee";
const GOLD = "#84663a";

// Pre-mixed tints (Satori has no color-mix()). PAPER and GOLD as rgba so the
// motif can sit faintly behind the type without washing it out.
const PAPER_FAINT = "rgba(247,244,238,0.05)";
const PAPER_STRONG = "rgba(247,244,238,0.11)";
const PAPER_SOFT = "rgba(247,244,238,0.82)";
const GOLD_HAIR = "rgba(132,102,58,0.55)";
const GOLD_SOFT = "rgba(132,102,58,0.92)";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// Root (home) card metadata.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${SITE.name}. ${SITE.description}`;

/** Build the alt string for a route card from its title and subtitle. */
export function ogAlt(title: string, subtitle: string): string {
  return `${SITE.name}. ${title}. ${subtitle}`;
}

/** Load the display + body faces from the repo for the wordmark and copy. */
async function loadFonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [fraunces, inter] = await Promise.all([
    readFile(join(dir, "Fraunces-SemiBold.ttf")),
    readFile(join(dir, "Inter-Medium.ttf")),
  ]);
  return [
    {
      name: "Fraunces",
      data: fraunces,
      weight: 600 as const,
      style: "normal" as const,
    },
    {
      name: "Inter",
      data: inter,
      weight: 500 as const,
      style: "normal" as const,
    },
  ];
}

/**
 * Catmull-Rom-ish smoothing through a set of points. Mirrors the smoothing in
 * components/strata/StrataMotif.tsx so the cards share its hand.
 */
function smoothPath(points: ReadonlyArray<readonly [number, number]>): string {
  if (points.length === 0) return "";
  let d = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
  for (let i = 1; i < points.length; i += 1) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const dx = (x1 - x0) / 3;
    d +=
      ` C ${(x0 + dx).toFixed(2)} ${y0.toFixed(2)}` +
      ` ${(x1 - dx).toFixed(2)} ${y1.toFixed(2)}` +
      ` ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }
  return d;
}

interface Stroke {
  d: string;
  color: string;
  width: number;
}

/**
 * Reproduce the StrataMotif "lines" variant (stratified contour waves) as
 * literal stroke data for the 1200x630 card. The component itself cannot be
 * reused here: Satori resolves neither Tailwind classes nor the CSS variables
 * the component's palette depends on. One layer is the gold accent; the lowest
 * is the heavier anchoring line; the rest are faint paper hairlines.
 */
function buildStrata(): Stroke[] {
  const W = 1200;
  const top = 92;
  const bottom = 560;
  const count = 11;
  const span = bottom - top;
  const goldIndex = 4;
  const segs = 6;
  const strokes: Stroke[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const wobble = Math.sin(i * 1.4) * 6 + Math.sin(i * 0.6) * 6;
    const baseY = top + span * t + wobble;
    const amp = 7 + (i % 3) * 4;
    const phase = i * 0.9;
    const points: Array<readonly [number, number]> = [];
    for (let s = 0; s <= segs; s += 1) {
      const x = (W * s) / segs;
      const y = baseY + Math.sin(phase + (s / segs) * Math.PI * 1.6) * amp;
      points.push([x, y]);
    }
    const isLast = i === count - 1;
    const isGold = i === goldIndex;
    strokes.push({
      d: smoothPath(points),
      color: isGold ? GOLD_HAIR : isLast ? PAPER_STRONG : PAPER_FAINT,
      width: isGold ? 1.5 : isLast ? 1.25 : 1,
    });
  }
  return strokes;
}

const STRATA = buildStrata();

export interface CardSpec {
  /** Small uppercase line above the title. Defaults to the brand name. */
  eyebrow?: string;
  /** The route-specific headline, set in Fraunces. */
  title: string;
  /** Render a gold period after the title (used for the home wordmark). */
  accentDot?: boolean;
  /** Title type size in px. */
  titleSize?: number;
  /** Supporting education line beneath the title. */
  subtitle: string;
}

/**
 * Shared renderer for every Strata OG card. Route cards import this and pass
 * their own eyebrow/title/subtitle so the whole set stays on one template:
 * gold eyebrow lockup, Fraunces headline, paper subhead, gold domain, and the
 * stratified motif bleeding faintly across the navy field.
 */
export async function renderCard(spec: CardSpec): Promise<ImageResponse> {
  const {
    eyebrow = SITE.name,
    title,
    accentDot = false,
    titleSize = 84,
    subtitle,
  } = spec;

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        backgroundColor: NAVY,
        color: PAPER,
        fontFamily: "Inter",
        overflow: "hidden",
      }}
    >
      {/* Stratified contour motif. Decorative; sits behind the type. */}
      <svg
        width={1200}
        height={630}
        viewBox="0 0 1200 630"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {STRATA.map((stroke, i) => (
          <path
            key={i}
            d={stroke.d}
            fill="none"
            stroke={stroke.color}
            strokeWidth={stroke.width}
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Foreground content, left aligned and vertically centered. */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 56, height: 2, backgroundColor: GOLD }} />
          <div
            style={{
              fontFamily: "Inter",
              fontSize: 25,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: GOLD_SOFT,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            marginTop: 34,
            display: "flex",
            maxWidth: 1000,
            fontFamily: "Fraunces",
            fontWeight: 600,
            fontSize: titleSize,
            letterSpacing: "-0.02em",
            lineHeight: 1.04,
            color: PAPER,
          }}
        >
          {title}
          {accentDot ? <span style={{ color: GOLD }}>.</span> : null}
        </div>

        <div
          style={{
            marginTop: 32,
            maxWidth: 780,
            fontFamily: "Inter",
            fontSize: 33,
            lineHeight: 1.42,
            color: PAPER_SOFT,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            marginTop: 44,
            fontFamily: "Inter",
            fontSize: 22,
            letterSpacing: "0.04em",
            color: GOLD_SOFT,
          }}
        >
          stratafinancialplanning.com
        </div>
      </div>
    </div>,
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}

/**
 * Default Open Graph card (home): the Fraunces wordmark on the deep navy
 * field, the approved positioning line beneath, and the stratified motif. Copy
 * is limited to the existing approved tagline; no new claims.
 */
export default function Image(): Promise<ImageResponse> {
  return renderCard({
    eyebrow: SITE.name,
    title: "Strata",
    accentDot: true,
    titleSize: 150,
    subtitle: SITE.description,
  });
}
