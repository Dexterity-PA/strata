import type { Metadata } from "next";
import { DebtComparison } from "@/components/tools/debt-comparison";
import { ToolPage } from "@/components/tools/tool-page";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/debt" },
  title: "Avalanche or snowball",
  description:
    "Compare two debt payoff orders, highest rate first and smallest balance first, and see how long each takes and what it costs in interest. An educational estimate, not financial advice.",
};

export default function DebtPage() {
  return (
    <ToolPage
      eyebrow="Tools for individuals"
      title="Avalanche or snowball?"
      intro="List your debts and the extra you can put toward them each month. We'll run both payoff orders, highest rate first (avalanche) and smallest balance first (snowball), and show what each one costs you."
    >
      <DebtComparison embedded />
    </ToolPage>
  );
}
