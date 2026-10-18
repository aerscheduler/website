"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { adAbout, adDate, adHref, adTitle, PRODUCT_LABEL, type AdRow } from "@/lib/ad-library";
import { cn } from "@/lib/cn";

/**
 * A list of ADs that a mechanic can actually work through: filter by words, hide the ones a
 * later AD replaced, show only those whose required actions repeat. Every row links to the AD.
 */
export function AdList({
  ads,
  filters = true,
  emptyText = "No ADs match.",
  showMaker = false,
}: {
  ads: AdRow[];
  filters?: boolean;
  emptyText?: string;
  showMaker?: boolean;
}) {
  const [q, setQ] = useState("");
  const [hideSuperseded, setHideSuperseded] = useState(true);
  const [onlyRepeat, setOnlyRepeat] = useState(false);
  const [type, setType] = useState<string>("all");

  const types = useMemo(() => [...new Set(ads.map((a) => a.productType))].sort(), [ads]);
  const supersededCount = ads.filter((a) => a.supersededBy.length).length;

  const shown = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return ads.filter((a) => {
      if (filters && hideSuperseded && a.supersededBy.length) return false;
      if (onlyRepeat && !a.repetitive) return false;
      if (type !== "all" && a.productType !== type) return false;
      if (!words.length) return true;
      const hay = `${a.adNumber} ${a.title} ${a.subject ?? ""} ${a.manufacturer} ${a.requires ?? ""}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [ads, q, hideSuperseded, onlyRepeat, type, filters]);

  return (
    <div className="space-y-3">
      {filters && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by number or words"
            aria-label="Filter these ADs"
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-64"
          />
          {types.length > 1 && (
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label="Product type"
              className="h-10 rounded-lg border border-border bg-white px-2.5 text-sm"
            >
              <option value="all">All products</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {PRODUCT_LABEL[t] ?? t}
                </option>
              ))}
            </select>
          )}
          {supersededCount > 0 && (
            <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" checked={hideSuperseded} onChange={(e) => setHideSuperseded(e.target.checked)} className="size-4 accent-[var(--primary)]" />
              Hide {supersededCount} superseded
            </label>
          )}
          <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={onlyRepeat} onChange={(e) => setOnlyRepeat(e.target.checked)} className="size-4 accent-[var(--primary)]" />
            Only repeat actions
          </label>
          <span className="text-sm text-muted-foreground sm:ml-auto">
            {shown.length} of {ads.length}
          </span>
        </div>
      )}

      {shown.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-white">
          {shown.map((a) => (
            <li key={a.adNumber}>
              <Link href={adHref(a.adNumber)} className="group flex flex-col gap-1 px-4 py-3 hover:bg-muted/50 sm:flex-row sm:items-start sm:gap-4">
                <span className="w-28 shrink-0 pt-0.5 font-mono text-sm font-medium text-primary group-hover:underline">{a.adNumber}</span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2 block text-[15px] font-medium text-brand-surface">{a.requires ?? adAbout(a)}</span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {[...new Set([a.requires ? adAbout(a) : null, showMaker ? adTitle(a.title) : PRODUCT_LABEL[a.productType] ?? a.productType].filter(Boolean))].join(" · ")}
                  </span>
                  <span className="mt-1 flex flex-wrap gap-1.5">
                    {a.onPublicInspection && <Chip tone="amber">To be published {adDate(a.publishedOn)}</Chip>}
                    {a.supersededBy.length > 0 && <Chip tone="grey">Superseded by {a.supersededBy.join(", ")}</Chip>}
                    {a.supersedes.length > 0 && <Chip tone="grey">Supersedes {a.supersedes.join(", ")}</Chip>}
                    {a.repetitive && <Chip tone="blue">Repeat action</Chip>}
                  </span>
                </span>
                <span className="shrink-0 text-sm text-muted-foreground tabular-nums sm:pt-0.5 sm:text-right">
                  {a.onPublicInspection ? "Public inspection" : adDate(a.publishedOn)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Chip({ tone, children }: { tone: "grey" | "blue" | "amber" | "green"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        tone === "grey" && "bg-muted text-muted-foreground",
        tone === "blue" && "bg-primary/10 text-primary",
        tone === "amber" && "bg-amber-100 text-amber-900",
        tone === "green" && "bg-emerald-50 text-emerald-800"
      )}
    >
      {children}
    </span>
  );
}
