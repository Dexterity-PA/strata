"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

/* This boundary renders only after the root layout itself has failed, so the
   app shell and client router may be gone. The links below intentionally use
   native anchors to force a full document reload rather than client-side
   <Link> navigation, which is not dependable in that state. */
/* eslint-disable @next/next/no-html-link-for-pages */

/**
 * Last-resort boundary for failures in the root layout itself. It replaces the
 * entire document, so it ships no dependency on the app shell, fonts, or
 * globals.css. Everything is inlined with the brand palette so the page still
 * reads as Strata even when nothing else loaded.
 */

// Brand palette (mirrors the tokens in globals.css; inlined because the global
// stylesheet is not guaranteed to be present when this boundary renders).
const BG = "#f7f4ee";
const INK = "#0e1b2c";
const MUTED = "#5f6b78";
const ACCENT = "#84663a";
const LINE = "#e2dccf";
const PAPER = "#f3efe6";

const SERIF = 'Fraunces, Georgia, "Times New Roman", serif';
const SANS =
  'Inter, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundColor: BG,
          color: INK,
          fontFamily: SANS,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <title>Something went wrong, Strata Financial Planning</title>
        <main
          style={{
            width: "100%",
            maxWidth: "44rem",
            margin: "0 auto",
            padding: "6rem 1.5rem",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                height: "1px",
                width: "1.5rem",
                backgroundColor: ACCENT,
              }}
            />
            Something interrupted
          </div>
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2.25rem, 1.35rem + 4vw, 3.5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              fontWeight: 400,
              margin: "1.5rem 0 0",
            }}
          >
            Something went wrong on our end.
          </h1>
          <p
            style={{
              maxWidth: "30rem",
              margin: "1rem 0 0",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: MUTED,
            }}
          >
            The page could not finish loading. Please try again, and if it keeps
            happening, get in touch and we will look into it.
          </p>
          {error.digest ? (
            <p
              style={{
                margin: "0.75rem 0 0",
                fontSize: "0.875rem",
                color: MUTED,
              }}
            >
              Reference: {error.digest}
            </p>
          ) : null}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1rem",
              marginTop: "2.5rem",
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                cursor: "pointer",
                border: "none",
                borderRadius: "2px",
                backgroundColor: INK,
                color: PAPER,
                padding: "0.875rem 1.75rem",
                fontFamily: SANS,
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                borderRadius: "2px",
                border: `1px solid ${INK}40`,
                color: INK,
                padding: "0.875rem 1.75rem",
                fontFamily: SANS,
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                textDecoration: "none",
              }}
            >
              Return home
            </a>
            <a
              href="/contact"
              style={{
                color: INK,
                fontFamily: SANS,
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecorationColor: `${ACCENT}66`,
                textUnderlineOffset: "6px",
              }}
            >
              Contact us
            </a>
          </div>
        </main>
        {/* Hairline anchored to the foot of the viewport, echoing the strata
            motif without depending on the SVG component or its CSS tokens. */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            height: "1px",
            backgroundColor: LINE,
          }}
        />
      </body>
    </html>
  );
}
