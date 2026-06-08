import type { Metadata } from "next";
import { DebtCost } from "@/components/tools/debt-cost";
import { ToolPage } from "@/components/tools/tool-page";

export const metadata: Metadata = {
  title: "Single-debt cost",
  description:
    "See how long one debt takes to pay off and how much interest it costs at your current payment. An educational estimate, not financial advice.",
};

export default function DebtCostPage() {
  return (
    <ToolPage
      eyebrow="Tools for individuals"
      title="Single-debt cost"
      intro="One balance, one rate, one payment. Put in the numbers and see how long it takes to clear and how much of it is interest. For a plan across several debts at once, try the avalanche or snowball comparison."
    >
      <DebtCost />
    </ToolPage>
  );
}
