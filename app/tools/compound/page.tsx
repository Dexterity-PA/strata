import type { Metadata } from "next";
import { CompoundVisualizer } from "@/components/tools/compound-visualizer";
import { ToolPage } from "@/components/tools/tool-page";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/compound" },
  title: "Compound growth visualizer",
  description:
    "See how a starting amount and regular contributions could grow over time at a rate you set, and what starting earlier instead of later looks like. An educational illustration, not a prediction or advice.",
};

export default function CompoundPage() {
  return (
    <ToolPage
      eyebrow="Tools for individuals"
      title="Compound growth visualizer"
      intro="Pick a starting amount, a monthly contribution, an assumed growth rate, and a number of years, and watch how the balance could build. The rate is an assumption you choose for illustration, not a predicted or guaranteed return. Then see the cost of waiting: what starting a few years later, on the same assumptions, would leave on the table."
    >
      <CompoundVisualizer />
    </ToolPage>
  );
}
