import type { ImageResponse } from "next/og";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  ogAlt,
  renderCard,
} from "../opengraph-image";

// Route-specific OG card. Shares the brand template + stratified motif from
// app/opengraph-image.tsx; only the title and subtitle change. Framed as
// education and planning support (never advice), and free.
const TITLE = "How we help";
const SUBTITLE =
  "Free financial education and planning support, from cash flow to the bigger decisions.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = ogAlt(TITLE, SUBTITLE);

export default function Image(): Promise<ImageResponse> {
  return renderCard({ title: TITLE, subtitle: SUBTITLE });
}
