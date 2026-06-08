import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The two original calculators moved to their own routes. Forward the
      // slugs earlier code/comments pointed at so no prior link 404s. (The
      // old in-page hashes, e.g. /tools#slow-season-buffer, are handled
      // client-side by LegacyToolHashRedirect, since fragments never reach
      // the server.)
      {
        source: "/tools/slow-season-buffer",
        destination: "/tools/buffer",
        permanent: true,
      },
      {
        source: "/tools/debt-payoff",
        destination: "/tools/debt",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
