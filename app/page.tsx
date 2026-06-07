import { ClosingCta } from "@/components/home/closing-cta";
import { HelpPreview } from "@/components/home/help-preview";
import { Hero } from "@/components/home/hero";
import { Mission } from "@/components/home/mission";
import { ProcessPreview } from "@/components/home/process-preview";
import { WhoFor } from "@/components/home/who-for";

/**
 * Home — the long-scroll centerpiece. Sections alternate ground (off-white
 * -> navy -> off-white -> surface -> off-white -> navy) so the page breathes
 * on the way down and lands on the dark closing CTA, which seams into the
 * footer.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
      <HelpPreview />
      <ProcessPreview />
      <WhoFor />
      <ClosingCta />
    </>
  );
}
