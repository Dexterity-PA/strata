import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}. ${SITE.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default Open Graph card: the wordmark on the site's deep navy, with the
 * positioning line beneath. Colors mirror the st-* tokens in globals.css.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        backgroundColor: "#0e1b2c", // --color-st-ink
        color: "#f3efe6", // --color-st-paper
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 56,
            height: 2,
            backgroundColor: "#c9a86a", // --color-st-accent-bright
          }}
        />
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c9a86a",
          }}
        >
          {SITE.name}
        </div>
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 96,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          display: "flex",
        }}
      >
        Strata
        <span style={{ color: "#c9a86a" }}>.</span>
      </div>
      <div
        style={{
          marginTop: 32,
          maxWidth: 820,
          fontSize: 34,
          lineHeight: 1.4,
          color: "#f3efe6CC",
        }}
      >
        {SITE.description}
      </div>
    </div>,
    size,
  );
}
