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
const TITLE = "Start the conversation";
const SUBTITLE =
  "A few short questions to begin. Tell me what is on your mind and I will get back to you.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = ogAlt(TITLE, SUBTITLE);

export default function Image(): Promise<ImageResponse> {
  return renderCard({ title: TITLE, subtitle: SUBTITLE });
}
