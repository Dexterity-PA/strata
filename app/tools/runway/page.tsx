import type { Metadata } from "next";
import { CashRunway } from "@/components/tools/cash-runway";
import { ToolPage } from "@/components/tools/tool-page";

export const metadata: Metadata = {
  title: "Cash runway",
  description:
    "See how many months your cash lasts at your current burn, and roughly when it runs out. An educational estimate, not financial advice.",
};

export default function RunwayPage() {
  return (
    <ToolPage
      eyebrow="Tools for business or you"
      title="Cash runway"
      intro="When more goes out than comes in, your cash is a countdown. Put in what you have and what you burn through in a typical month, and see how long the runway is and roughly when it ends."
    >
      <CashRunway />
    </ToolPage>
  );
}
