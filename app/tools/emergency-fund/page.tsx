import type { Metadata } from "next";
import { EmergencyFund } from "@/components/tools/emergency-fund";
import { ToolPage } from "@/components/tools/tool-page";

export const metadata: Metadata = {
  title: "Emergency fund target",
  description:
    "Work out how big your emergency fund should be, the gap to get there, and how long it takes to build. An educational estimate, not financial advice.",
};

export default function EmergencyFundPage() {
  return (
    <ToolPage
      eyebrow="Tools for individuals"
      title="Emergency fund target"
      intro="A safety net is just a few months of essentials set aside for when life surprises you. Pick how many months of cushion you want, and see the target, the gap from where you are, and how long it takes to close."
    >
      <EmergencyFund />
    </ToolPage>
  );
}
