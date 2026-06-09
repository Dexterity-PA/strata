import type { Metadata } from "next";
import { StartHero } from "@/components/start/start-hero";
import { StartPaths } from "@/components/start/start-paths";
import { StartCta } from "@/components/start/start-cta";

export const metadata: Metadata = {
  alternates: { canonical: "/start" },
  title: "Start here",
  description:
    "New to Strata? Find your starting point. Free, student-led financial education for small businesses and individuals, not licensed advice.",
};

export default function Page() {
  return (
    <>
      <StartHero />
      <StartPaths />
      <StartCta />
    </>
  );
}
