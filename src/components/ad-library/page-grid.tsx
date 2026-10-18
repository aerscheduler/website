"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { fmt, pageHref, type PageSummary } from "@/lib/ad-library";

/** Every page of one kind, filterable as you type. */
export function PageGrid({ pages, kind }: { pages: PageSummary[]; kind: string }) {
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return words.length ? pages.filter((p) => words.every((w) => p.name.toLowerCase().includes(w))) : pages;
  }, [pages, q]);
  return (
    <div className="mt-8 space-y-4">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter, for example 172 or PA-28"
        aria-label="Filter"
        className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-80"
      />
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {shown.slice(0, 600).map((p) => (
          <li key={p.slug} className="min-w-0">
            <Link href={pageHref(kind, p.slug)} className="flex min-w-0 items-baseline justify-between gap-3 rounded-lg border border-border bg-white px-4 py-3 hover:border-primary">
              <span className="min-w-0 truncate font-medium text-brand-surface">{p.name}</span>
              <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
                {fmt(p.adCount)} AD{p.adCount === 1 ? "" : "s"}
                {p.fleetCount > 0 && <span className="hidden sm:inline"> · {fmt(p.fleetCount)} reg.</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {shown.length > 600 && <p className="text-sm text-muted-foreground">Showing 600 of {fmt(shown.length)}. Filter to find the rest.</p>}
      {shown.length === 0 && <p className="text-sm text-muted-foreground">Nothing matches. Try the model number alone, or search the whole library.</p>}
    </div>
  );
}
