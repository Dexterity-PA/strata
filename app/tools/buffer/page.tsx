import type { Metadata } from "next";
import { BufferCalculator } from "@/components/tools/buffer-calculator";
import { ToolPage } from "@/components/tools/tool-page";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/buffer" },
  title: "Slow-season buffer",
  description:
    "Size the cushion for a slow season: the monthly shortfall, the target to cover it, and what to set aside each busy month. Educational estimate.",
};

export default function BufferPage() {
  return (
    <ToolPage
      eyebrow="Tools for business"
      title="Slow-season buffer"
      intro="If your business has a slow season, you already know when it starts. Put in four numbers and see the buffer that gets you through it: the gap, the season's target, and what to set aside each busy month and week to reach it."
    >
      <BufferCalculator />
    </ToolPage>
  );
}
