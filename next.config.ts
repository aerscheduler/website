import createMDX from "@next/mdx";
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

/**
 * MDX powers the help documentation under /docs, and nothing else.
 *
 * `pageExtensions` is deliberately NOT widened to include `mdx`: articles are
 * *content* imported by one shared route (`/docs/[section]/[slug]`), not routes
 * of their own. Keeping them out of the routing tree is what lets a single
 * layout own the sticky nav, the table of contents, breadcrumbs, and the
 * TechArticle JSON-LD for every article at once.
 *
 * - remark-gfm: tables and strikethrough, which the reference articles use.
 * - rehype-slug: stable `id`s on every heading, so the on-page table of
 *   contents in `lib/docs.ts` can link to them. The TOC is derived by reading
 *   the same headings out of the file, so the two agree by construction.
 *
 * Plugins are named as STRINGS, not imported. Turbopack serialises loader
 * options across a process boundary and rejects a function outright ("does not
 * have serializable options"), so importing the plugin and passing the value
 * fails the build even though it is what every webpack example shows.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [["rehype-slug", {}]],
  },
});

export default withMDX(nextConfig);
