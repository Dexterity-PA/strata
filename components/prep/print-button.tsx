"use client";

import { Button } from "@/components/ui/button";

/**
 * Triggers the browser's print dialog (which doubles as "save as PDF"). Marked
 * `.no-print` so it never appears in the printed sheet itself.
 */
export function PrintButton() {
  return (
    <div className="no-print">
      <Button type="button" onClick={() => window.print()}>
        Print or save as PDF
      </Button>
    </div>
  );
}
