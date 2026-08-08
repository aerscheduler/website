import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "./search-results";

/**
 * The full results page, behind "See all results" and the Enter key.
 *
 * It exists for the two things a dropdown cannot do: show more than five hits
 * per group, and be a link. `/search?q=hobbs` can be pasted into a support
 * reply, which is the whole reason support-facing search is worth having.
 *
 * `noindex` because a results page is thin content that competes with the pages
 * it lists. Google has been de-ranking internal search results for years, and
 * the site's own SEO split (features vs guides vs docs) is careful enough that
 * feeding it a fourth kind of page which duplicates all three would be
 * self-inflicted.
 */
export const metadata: Metadata = {
  title: "Search",
  description: "Search AerScheduler documentation, features, and guides.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Search</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Documentation, features, guides, and the API reference.
      </p>

      {/*
        useSearchParams suspends during prerender, so the boundary is required
        rather than defensive: without it `next build` fails this route outright.
      */}
      <Suspense fallback={<p className="mt-8 text-sm text-muted-foreground">Loading search...</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
