"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * The two original calculators used to live as inline sections on /tools,
 * reachable by hash (e.g. /tools#slow-season-buffer). They now have their own
 * routes. URL fragments never reach the server, so a next.config redirect
 * can't catch these; this client shim runs on the index and forwards any old
 * bookmark to the matching route. A normal /tools visit has no hash, so it is
 * a no-op.
 */
const LEGACY_HASHES: Record<string, string> = {
  "#slow-season-buffer": "/tools/buffer",
  "#avalanche-or-snowball": "/tools/debt",
};

export function LegacyToolHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const target = LEGACY_HASHES[window.location.hash];
    if (target) {
      router.replace(target);
    }
  }, [router]);

  return null;
}
