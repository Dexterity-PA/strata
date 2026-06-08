import type { Metadata } from "next";
import { MissionHero } from "@/components/mission/mission-hero";
import { TheGap } from "@/components/mission/the-gap";
import { Principles } from "@/components/mission/principles";
import { WhyVolunteer } from "@/components/mission/why-volunteer";
import { MissionCta } from "@/components/mission/mission-cta";

export const metadata: Metadata = {
  alternates: { canonical: "/mission" },
  title: "Mission",
  description:
    "Why Strata exists: the gap in access to clear financial education, and the belief that it should be free. A student-led volunteer initiative.",
};

export default function Page() {
  return (
    <>
      <MissionHero />
      <TheGap />
      <Principles />
      <WhyVolunteer />
      <MissionCta />
    </>
  );
}
