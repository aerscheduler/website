"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

export type HubSearchItem = {
  href: string;
  /** What the result is called: "91.409: Annual and 100-hour inspections". */
  title: string;
  /** One line under it, usually the answer. */
  detail: string;
  /** Exact handles that should rank first: "91.409", "far 91.409", "fl". */
  ids: string[];
  /** Everything else worth matching: names, points, questions. */
  text: string;
};

/** Lowercase, with "§", dots and hyphens in cites made equal: "§ 91-409" finds 91.409. */
const fold = (s: string) =>
  s
    .toLowerCase()
    .replace(/§/g, " ")
    .replace(/(\d)[-.](\d)/g, "$1.$2")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Instant search over a hub's own pages: the regulations library or the
 * aircraft tax states. Everything is in the page already, so there is no
 * request; results narrow as you type, and Enter opens the first. An exact
 * cite or state code ranks first, then titles holding more of the words.
 */
export function HubSearch({
  items,
  label,
  placeholder,
  className,
}: {
  items: HubSearchItem[];
  label: string;
  placeholder: string;
  className?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const indexed = useMemo(
    () => items.map((it) => ({ it, ids: it.ids.map(fold), title: fold(it.title), text: fold(`${it.title} ${it.detail} ${it.text}`) })),
    [items]
  );
  const results = useMemo(() => {
    const query = fold(q);
    if (!query) return [];
    const tokens = query.split(" ");
    return indexed
      .map(({ it, ids, title, text }) => {
        if (!tokens.every((t) => text.includes(t) || ids.some((id) => id.includes(t)))) return null;
        // An exact handle wins outright; then the more of the words the title
        // itself contains, so "flight instruction texas" puts "Is flight
        // instruction taxed in Texas?" above the Texas overview.
        const titleWords = tokens.filter((t) => title.includes(t)).length / tokens.length;
        const score = (ids.includes(query) ? 100 : ids.some((id) => id.startsWith(query)) ? 50 : 0) + (title.includes(query) ? 20 : 0) + titleWords * 10;
        return { it, score };
      })
      .filter((x): x is { it: HubSearchItem; score: number } => !!x)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((x) => x.it);
  }, [q, indexed]);

  return (
    <div role="search" className={cn("w-full", className)}>
      <label className="relative block">
        <span className="sr-only">{label}</span>
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results[0]) router.push(results[0].href);
          }}
          placeholder={placeholder}
          aria-controls="hub-search-results"
          className="h-12 w-full rounded-lg border border-border bg-white pr-3 pl-10 text-base text-foreground shadow-sm outline-none placeholder:text-muted-foreground/80 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>
      <div id="hub-search-results" aria-live="polite">
        {q.trim() && (
          <div className="mt-2 overflow-hidden rounded-lg border border-border bg-white shadow-sm">
            {results.length ? (
              <ul className="divide-y divide-border">
                {results.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="block px-4 py-3 hover:bg-muted/40">
                      <span className="block font-medium text-brand-surface">{r.title}</span>
                      <span className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{r.detail}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-3 text-sm text-muted-foreground">Nothing here matches &quot;{q.trim()}&quot;.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
