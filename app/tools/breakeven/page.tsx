import type { Metadata } from "next";
import { BreakevenCalculator } from "@/components/tools/breakeven-calculator";
import { ToolPage } from "@/components/tools/tool-page";

export const metadata: Metadata = {
  title: "Breakeven calculator",
  description:
    "Work out how many units, and how much in sales, you need to cover your costs. An educational estimate, not financial advice.",
};

export default function BreakevenPage() {
  return (
    <ToolPage
      eyebrow="Tools for business"
      title="Breakeven calculator"
      intro="Every fixed cost has to be paid before you keep a dollar. Put in your monthly fixed costs, your price, and what each unit costs you to make, and see the point where sales finally cover the bills."
    >
      <BreakevenCalculator />
    </ToolPage>
  );
}
