import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: false,
    /**
     * AVIF first, WebP second, original last.
     *
     * The photography behind the statement bands is the heaviest thing the
     * marketing site ships. Next already transcoded the source JPEGs to WebP,
     * which took a 243KB source down to about 64KB on the wire; AVIF takes the
     * same images down again by roughly a third for any browser that asks for
     * it, and everything else silently falls back to WebP.
     *
     * The cost is build-time encoding, paid once per size per image on a set of
     * five static files, and never by the visitor. The bands are below the fold
     * and lazily loaded, so none of this is on the critical path either way.
     */
    formats: ["image/avif", "image/webp"],
    /**
     * Next 16 refuses any `quality` not on this list, so 60 has to be declared
     * before a component can ask for it.
     *
     * 60 is for the statement bands. Those photographs sit under two gradients
     * at between 45% and 85% opacity, so the detail that quality 75 is
     * protecting is not detail anybody can see. 75 stays for everything else.
     */
    qualities: [60, 75],
  },
  async headers() {
    return [
      /**
       * The search index is readable cross-origin, because the console reads it.
       *
       * app.aerscheduler.com's command palette searches the help documentation
       * from the same corpus this site searches, so a signed-in member looking
       * for "close out a flight" finds the article without leaving the console.
       * There is one index rather than two, so the two searches cannot drift.
       *
       * `*` rather than the console's origin: the file is a build artifact made
       * of published marketing and documentation copy, served to anyone who asks
       * for it here, so an allowlist would protect nothing and would silently
       * break the console the day a preview deployment gets its own origin.
       */
      {
        source: "/search-index.json",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
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
      // MyFBO had two pages competing for the same search: an "alternative"
      // guide and a migration playbook. They split the ranking and the paid
      // traffic. Merged into the migration page, which had the stronger content
      // and every internal link, so the guide URL redirects into it.
      {
        source: "/resources/myfbo-alternative",
        destination: "/migrating/my-fbo",
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
