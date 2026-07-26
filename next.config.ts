import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: false,
  },
  async redirects() {
    return [
      // Canonical terms URL referenced by the mobile app / store listings.
      {
        source: "/terms",
        destination: "/terms-and-conditions",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
