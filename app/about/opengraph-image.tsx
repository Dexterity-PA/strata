import type { ImageResponse } from "next/og";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  ogAlt,
  renderCard,
} from "../opengraph-image";

// Route-specific OG card. Shares the brand template + stratified motif from
// app/opengraph-image.tsx; only the title and subtitle change. Copy is drawn
// from the page's approved metadata description (education only, no advice).
const TITLE = "Why Strata exists";
const SUBTITLE =
  "A volunteer initiative offering free financial education and planning support.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = ogAlt(TITLE, SUBTITLE);

export default function Image(): Promise<ImageResponse> {
  return renderCard({ title: TITLE, subtitle: SUBTITLE });
}
