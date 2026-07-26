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
      // Canonical integrations page (avoid duplicate with /features/integrations).
      {
        source: "/features/integrations",
        destination: "/integrations",
        permanent: true,
      },
      // Friendly aliases for sitelink-style URLs.
      {
        source: "/download",
        destination: "/app",
        permanent: true,
      },
      {
        source: "/signin",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/sign-in",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
