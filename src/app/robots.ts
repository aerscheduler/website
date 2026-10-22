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
      // So are its N-number checks (/check/N172SP): noindex already, one per registered
      // aircraft, and every crawl of one was a server render. The /check form itself stays.
      disallow: ["/search", "/airworthiness-directives/search", "/airworthiness-directives/follow", "/airworthiness-directives/check/", "/api/"],
    },
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/airworthiness-directives/sitemap.xml`, `${SITE_URL}/aircraft/sitemap.xml`],
    host: SITE_URL,
  };
}
