import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Every public route on the site. Keep in sync when routes are added. */
const ROUTES = [
  "",
  "/services",
  "/pricing",
  "/about",
  "/process",
  "/insights",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/disclosures",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
