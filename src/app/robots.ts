import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal search results are thin pages that duplicate the ones they
      // link to, and every `?q=` is a distinct URL, so left alone they become
      // an unbounded set of near-duplicates competing with the real pages. The
      // route also carries a noindex header; this stops the crawl earlier.
      // The AD library's search results are the same thin, unbounded set.
      disallow: ["/search", "/airworthiness-directives/search", "/airworthiness-directives/follow"],
    },
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/airworthiness-directives/sitemap.xml`],
    host: SITE_URL,
  };
}
