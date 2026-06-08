"use client";

import { useCallback, useState } from "react";

/**
 * Writes `text` to the clipboard, preferring the async Clipboard API and
 * falling back to a hidden-textarea + execCommand path for older or
 * non-secure-context browsers. Returns whether the copy succeeded.
 */
async function writeToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Permission denied or non-secure context: fall through to the legacy path.
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Clipboard copy with a brief "copied" flag for an aria-live confirmation.
 * `copied` flips true on success and resets after `resetMs`.
 */
export function useClipboard(resetMs = 2400): {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
} {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      const ok = await writeToClipboard(text);
      if (ok) {
        setCopied(true);
        window.setTimeout(() => setCopied(false), resetMs);
      }
      return ok;
    },
    [resetMs],
  );

  return { copied, copy };
}
