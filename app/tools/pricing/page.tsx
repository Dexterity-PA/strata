import type { Metadata } from "next";
import { PricingMargin } from "@/components/tools/pricing-margin";
import { ToolPage } from "@/components/tools/tool-page";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/pricing" },
  title: "Pricing and margin checker",
  description:
    "Set a price from a target margin, or check the margin and markup a price gives you. An educational estimate, not financial advice.",
};

export default function PricingPage() {
  return (
    <ToolPage
      eyebrow="Tools for business"
      title="Pricing and margin checker"
      intro="Margin and markup sound alike and mean different things, which is how good products end up underpriced. Work a price back from the margin you want, or check the margin and markup a price actually gives you."
    >
      <PricingMargin />
    </ToolPage>
  );
}
