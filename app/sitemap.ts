import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { POSTS } from "@/app/insights/posts";

/**
 * Static, non-post routes. Insights articles are NOT listed here — they are
 * derived from POSTS below so new posts appear in the sitemap automatically.
 * Keep this list in sync when a new non-post page is added.
 */
const STATIC_ROUTES = [
  "",
  "/services",
  "/pricing",
  "/about",
  "/process",
  "/how-it-works",
  "/prep",
  "/insights",
  "/faq",
  "/glossary",
  "/resources",
  "/contact",
  "/tools",
  "/tools/breakeven",
  "/tools/buffer",
  "/tools/runway",
  "/tools/pricing",
  "/tools/emergency-fund",
  "/tools/debt",
  "/tools/debt-cost",
  "/privacy",
  "/terms",
  "/disclosures",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE.url}/insights/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
