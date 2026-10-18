"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { fmt } from "@/lib/ad-library";
import { guideHref, type GuideSummary } from "@/lib/aircraft-guides";

/** Every guide, by maker (busiest maker first), filterable as you type: "archer", "172", "cub". */
export function GuideGrid({ guides }: { guides: GuideSummary[] }) {
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const shown = words.length ? guides.filter((g) => words.every((w) => `${g.name} ${g.nickname ?? ""}`.toLowerCase().includes(w))) : guides;
    const byMaker = new Map<string, GuideSummary[]>();
    for (const g of shown) byMaker.set(g.maker, [...(byMaker.get(g.maker) ?? []), g]);
    return [...byMaker.entries()].sort((a, b) => b[1].reduce((n, g) => n + g.fleetCount, 0) - a[1].reduce((n, g) => n + g.fleetCount, 0));
  }, [guides, q]);

  return (
    <div className="mt-8 space-y-8">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter, like Archer, 172 or Cub"
        aria-label="Filter the guides"
        className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-80"
      />
      {groups.length === 0 && <p className="text-sm text-muted-foreground">No guide matches. Try the model number alone.</p>}
      {groups.map(([maker, list]) => (
        <section key={maker} className="space-y-3">
          <h2 className="text-xl font-semibold text-brand-surface">{maker}</h2>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((g) => (
              <li key={g.slug} className="min-w-0">
                <Link href={guideHref(g.slug)} className="flex min-w-0 flex-col rounded-lg border border-border bg-white px-4 py-3 hover:border-primary">
                  <span className="truncate font-medium text-brand-surface">
                    {g.name}
                    {g.nickname && <span className="font-normal text-muted-foreground"> {g.nickname}</span>}
                  </span>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {fmt(g.fleetCount)} registered{g.oldest && g.newest ? ` · ${g.oldest === g.newest ? g.oldest : `${g.oldest} to ${g.newest}`}` : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
