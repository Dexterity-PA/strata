import type { ImageResponse } from "next/og";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  ogAlt,
  renderCard,
} from "../opengraph-image";

// Route-specific OG card. Shares the brand template + stratified motif from
// app/opengraph-image.tsx; only the title and subtitle change. Copy mirrors
// the page's approved pricing description (no fabricated figures).
const TITLE = "Always free";
const SUBTITLE =
  "No fees, no tiers, and no paid version waiting behind a door.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = ogAlt(TITLE, SUBTITLE);

export default function Image(): Promise<ImageResponse> {
  return renderCard({ title: TITLE, subtitle: SUBTITLE });
}
