import type { Metadata } from "next";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

/** Placeholder — page content is built in a later phase. */
export default function Page() {
  return (
    <Section className="min-h-[60vh] pt-44">
      <h1 className="font-st-display text-st-h1">Privacy Policy</h1>
    </Section>
  );
}
