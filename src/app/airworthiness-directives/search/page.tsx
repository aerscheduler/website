import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdList } from "@/components/ad-library/ad-list";
import { AdSearchBox } from "@/components/ad-library/search-box";
import { AD_BASE, checkHref, fmt, isTailNumber, SEARCH_PAGE_SIZE, searchAds, tailKey } from "@/lib/ad-library";

export const metadata: Metadata = {
  title: "Search Airworthiness Directives",
  description: "Search FAA Airworthiness Directives by AD number, maker, model, part or problem.",
  // Every query is its own URL and duplicates the AD pages it lists.
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ q?: string; page?: string }> };

export default async function AdSearchPage({ searchParams }: Props) {
  const { q = "", page = "1" } = await searchParams;
  const n = Math.max(1, Number(page) || 1);
  const results = q.trim() ? await searchAds(q.trim(), n) : null;
  const pages = results ? Math.ceil(results.total / SEARCH_PAGE_SIZE) : 0;
  const link = (p: number) => `${AD_BASE}/search?q=${encodeURIComponent(q)}&page=${p}`;
  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "AD library", href: AD_BASE },
          { name: "Search", href: `${AD_BASE}/search` },
        ]}
      />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand-surface">Search Airworthiness Directives</h1>
      <AdSearchBox defaultValue={q} className="mt-6 max-w-2xl" autoFocus={!q} />
      {/^n/i.test(q.trim()) && isTailNumber(q) && (
        <p className="mt-4 text-[15px]">
          Looking for one aircraft?{" "}
          <Link href={checkHref(q)} className="font-medium text-primary hover:underline">
            Check N{tailKey(q)}&apos;s ADs by its registration
          </Link>
        </p>
      )}
      {results && (
        <div className="mt-8 space-y-4">
          <p className="text-sm text-muted-foreground">
            {results.total === 0
              ? `Nothing found for "${q}". Try fewer words, the model alone ("PA-28"), or a part number.`
              : `${fmt(results.total)} AD${results.total === 1 ? "" : "s"} for "${q}", best matches first.`}
          </p>
          {results.data.length > 0 && <AdList ads={results.data} filters={false} showMaker />}
          {pages > 1 && (
            <nav className="flex items-center gap-3 text-sm" aria-label="Pages">
              {n > 1 && <Link href={link(n - 1)} className="text-primary hover:underline">Previous</Link>}
              <span className="text-muted-foreground">Page {n} of {pages}</span>
              {n < pages && <Link href={link(n + 1)} className="text-primary hover:underline">Next</Link>}
            </nav>
          )}
        </div>
      )}
    </article>
  );
}
