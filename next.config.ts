import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /**
   * PostHog's endpoints end in a slash (`/e/`, `/decide/`), and Next would
   * redirect `/ingest/e/` to `/ingest/e` before the rewrite below ever saw it,
   * which drops the events. So Next's own trailing-slash redirect is off, and
   * `src/proxy.ts` does the same redirect for every page instead, leaving only
   * `/ingest` alone.
   */
  skipTrailingSlashRedirect: true,
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
  /**
   * `/docs/<section>/<slug>.md`, the Markdown twin of every help article, served
   * by `app/md/docs/[section]/[slug]/route.ts`. A rewrite because App Router
   * cannot name a dynamic segment `[slug].md`, and `beforeFiles` so the HTML
   * article route never sees the `.md` path (it would 404 on slug "x.md").
   */
  async rewrites() {
    return {
      beforeFiles: [
        // PostHog through our own domain. Ad blockers drop requests to
        // us.i.posthog.com, which hid roughly a tenth to a quarter of visitors
        // from every chart; a first-party path is not on their lists. Assets
        // first, because the general rule would also match them.
        { source: "/ingest/static/:path*", destination: "https://us-assets.i.posthog.com/static/:path*" },
        { source: "/ingest/:path*", destination: "https://us.i.posthog.com/:path*" },
        { source: "/docs/:section/:slug([a-z0-9-]+)\\.md", destination: "/md/docs/:section/:slug" },
        // The regulations library's twins: each section and Part page, and the hub.
        { source: "/regulations/:slug([a-z0-9-]+)\\.md", destination: "/md/regulations/:slug" },
        { source: "/regulations.md", destination: "/md/regulations" },
        // Aircraft tax by state: each region page's twin.
        { source: "/aircraft-tax/:country([a-z-]+)/:region([a-z-]+)\\.md", destination: "/md/aircraft-tax/:country/:region" },
        // The aircraft ownership guides and the AD library's AD pages, the same way.
        { source: "/aircraft/compare/:pair([a-z0-9-]+)\\.md", destination: "/md/aircraft-compare/:pair" },
        { source: "/aircraft/:slug([a-z0-9-]+)\\.md", destination: "/md/aircraft/:slug" },
        { source: "/airworthiness-directives/:adNumber([0-9][0-9A-Za-z-]*)\\.md", destination: "/md/airworthiness-directives/:adNumber" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // The Markdown routes' internal path is not a second public URL for the same
      // file. Redirects run on the incoming path only, so this cannot loop with the
      // `.md` rewrite that maps onto it.
      {
        source: "/md/regulations/:slug",
        destination: "/regulations/:slug.md",
        permanent: true,
      },
      {
        source: "/md/aircraft-tax/:country/:region",
        destination: "/aircraft-tax/:country/:region.md",
        permanent: true,
      },
      {
        source: "/md/regulations",
        destination: "/regulations.md",
        permanent: true,
      },
      {
        source: "/md/docs/:section/:slug",
        destination: "/docs/:section/:slug.md",
        permanent: true,
      },
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
