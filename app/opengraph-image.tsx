import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}. ${SITE.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens, mirrored from globals.css so the card matches the site.
const INK = "#0e1b2c"; // --color-st-ink (navy)
const PAPER = "#f3efe6"; // --color-st-paper
const GOLD = "#c9a86a"; // --color-st-accent-bright

/** Load the display + body faces from the repo for the wordmark and tagline. */
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
 * Default Open Graph card: the Fraunces wordmark on the deep navy field, the
 * approved positioning line beneath, and the strata motif (faint concentric
 * rings bleeding off the right edge, plus a few horizontal hairlines) rendered
 * as inline SVG. Copy is limited to the existing approved tagline; no new
 * claims. The StrataMotif React component can't be reused here because Satori
 * doesn't resolve Tailwind classes or CSS custom properties, so the same motif
 * language is reproduced with literal coordinates and brand colors.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          backgroundColor: INK,
          color: PAPER,
          fontFamily: "Inter",
          overflow: "hidden",
        }}
      >
        {/* Strata motif: faint horizontal hairlines + concentric rings that
            bleed off the right edge. Decorative; sits behind the wordmark. */}
        <svg
          width={1200}
          height={630}
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {[110, 235, 520].map((y) => (
            <line
              key={y}
              x1={0}
              y1={y}
              x2={1200}
              y2={y}
              stroke="rgba(243,239,230,0.05)"
              strokeWidth={1}
            />
          ))}
          <line
            x1={0}
            y1={395}
            x2={1200}
            y2={395}
            stroke="rgba(201,168,106,0.12)"
            strokeWidth={1}
          />
          {[130, 230, 330, 430, 530].map((r) => (
            <circle
              key={r}
              cx={1235}
              cy={315}
              r={r}
              fill="none"
              stroke={
                r === 330 ? "rgba(201,168,106,0.32)" : "rgba(243,239,230,0.07)"
              }
              strokeWidth={r === 330 ? 1.5 : 1}
            />
          ))}
        </svg>

        {/* Foreground content */}
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
                fontSize: 26,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              {SITE.name}
            </div>
          </div>

          <div
            style={{
              marginTop: 36,
              display: "flex",
              fontFamily: "Fraunces",
              fontWeight: 600,
              fontSize: 150,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Strata
            <span style={{ color: GOLD }}>.</span>
          </div>

          <div
            style={{
              marginTop: 34,
              maxWidth: 760,
              fontFamily: "Inter",
              fontSize: 34,
              lineHeight: 1.42,
              color: "rgba(243,239,230,0.82)",
            }}
          >
            {SITE.description}
          </div>

          <div
            style={{
              marginTop: 44,
              fontFamily: "Inter",
              fontSize: 22,
              letterSpacing: "0.04em",
              color: "rgba(201,168,106,0.85)",
            }}
          >
            stratafinancialplanning.com
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await loadFonts() },
  );
}
