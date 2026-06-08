import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { Philosophy } from "@/components/about/philosophy";
import { HonestPart } from "@/components/about/honest-part";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Strata exists. A volunteer initiative offering free financial education and planning support.",
};

export default function Page() {
  return (
    <>
      <AboutHero />
      <Philosophy />
      <HonestPart />
    </>
  );
}
