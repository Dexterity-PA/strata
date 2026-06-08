import type { ImageResponse } from "next/og";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  ogAlt,
  renderCard,
} from "../opengraph-image";

// Route-specific OG card. Shares the brand template + stratified motif from
// app/opengraph-image.tsx; only the title and subtitle change. Copy adapted
// from the page's approved metadata description.
const TITLE = "Plain writing on money";
const SUBTITLE =
  "Short, practical notes on the financial questions people actually face. No jargon, nothing to sell.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = ogAlt(TITLE, SUBTITLE);

export default function Image(): Promise<ImageResponse> {
  return renderCard({ title: TITLE, subtitle: SUBTITLE });
}
