import type { Metadata } from "next";
import { YourInformationHero } from "@/components/your-information/your-information-hero";
import { WhatWeCollect } from "@/components/your-information/what-we-collect";
import { PlainTerms } from "@/components/your-information/plain-terms";
import { FormalPointer } from "@/components/your-information/formal-pointer";

export const metadata: Metadata = {
  alternates: { canonical: "/your-information" },
  title: "How we handle your information",
  description:
    "A plain-English explanation of what information Strata collects and what happens to it.",
};

export default function Page() {
  return (
    <>
      <YourInformationHero />
      <WhatWeCollect />
      <PlainTerms />
      <FormalPointer />
    </>
  );
}
