"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  highlight,
  loadSearchIndex,
  searchGrouped,
  snippetFor,
  TYPE_LABEL,
  TYPE_ORDER,
  type SearchEngine,
  type SearchType,
} from "@/lib/search";
import { cn } from "@/lib/cn";

/**
 * The results body of /search.
 *
 * Split from the page so the page itself stays a server component with real
 * metadata, and only this part ships to the browser. Same index and same
 * ranking as the header palette (see lib/search.ts); what differs is the cap,
 * which is raised from five per group to twenty, and the type filter, which is
 * a visible row of tabs here rather than a syntax prefix.
 */

/** Deep enough to be a real answer, shallow enough that nobody scrolls forever. */
const PER_GROUP = 20;

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("q") ?? "";

  const [query, setQuery] = useState(initial);
  const [typeFilter, setTypeFilter] = useState<SearchType | null>(null);
  const [engine, setEngine] = useState<SearchEngine | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    loadSearchIndex().then(setEngine).catch(() => setFailed(true));
  }, []);

  // Follow the URL when it changes underneath us: arriving from the header
  // palette is a client-side navigation, so this component may already be
  // mounted with the previous query in state.
  useEffect(() => setQuery(initial), [initial]);

  // Keep ?q= in step with the field so the URL stays pasteable, without
  // stacking a history entry per keystroke.
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed === initial) return;
    const id = setTimeout(() => {
      router.replace(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search", {
        scroll: false,
      });
    }, 400);
    return () => clearTimeout(id);
  }, [query, initial, router]);

  const groups = useMemo(() => {
    if (!engine) return [];
    return searchGrouped(engine, query, { typeFilter, perGroup: PER_GROUP });
  }, [engine, query, typeFilter]);

  const total = groups.reduce((sum, group) => sum + group.results.length, 0);
  const trimmed = query.trim();

  // Counts per type, from an unfiltered run, so the tabs can show what is there
  // and a tab with nothing behind it can be hidden rather than dead.
  const counts = useMemo(() => {
    if (!engine || !trimmed) return null;
    const all = searchGrouped(engine, trimmed, { perGroup: PER_GROUP });
    return new Map(all.map((group) => [group.type, group.results.length]));
  }, [engine, trimmed]);

  return (
    <div className="mt-6">
      <label className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 focus-within:ring-2 focus-within:ring-brand/35">
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search docs, features, guides..."
          aria-label="Search"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
        />
      </label>

      {counts && counts.size > 1 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <FilterTab active={typeFilter === null} onClick={() => setTypeFilter(null)}>
            All
          </FilterTab>
          {TYPE_ORDER.filter((type) => counts.get(type)).map((type) => (
            <FilterTab
              key={type}
              active={typeFilter === type}
              onClick={() => setTypeFilter(type)}
            >
              {TYPE_LABEL[type]}{" "}
              <span className="text-muted-foreground">{counts.get(type)}</span>
            </FilterTab>
          ))}
        </div>
      ) : null}

      {failed ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Search is unavailable right now. Browse the{" "}
          <Link href="/docs" className="underline">
            documentation
          </Link>{" "}
          instead.
        </p>
      ) : !engine ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading search...</p>
      ) : !trimmed ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Type to search every documentation article, feature, guide, and API reference page.
        </p>
      ) : total === 0 ? (
        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            No results for <span className="font-medium text-foreground">{trimmed}</span>.
          </p>
          <p className="mt-2">
            Try fewer words, or{" "}
            <Link href="/contact" className="underline">
              ask us
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {groups.map((group) => (
            <section key={group.type}>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {group.label}
              </h2>
              <ul className="mt-2 divide-y divide-border border-t border-border">
                {group.results.map((result) => (
                  <li key={result.id}>
                    <Link href={result.href} className="block py-3 hover:bg-muted/50">
                      {result.path.length > 0 ? (
                        <div className="text-[11px] text-muted-foreground">
                          {result.path.join(" › ")}
                        </div>
                      ) : null}
                      <div className="text-sm font-medium">
                        <Highlighted text={result.title} query={trimmed} />
                      </div>
                      <div className="mt-0.5 text-sm text-muted-foreground">
                        <Highlighted text={snippetFor(result, 220)} query={trimmed} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1 text-xs transition",
        active
          ? "border-foreground/20 bg-muted font-medium text-foreground"
          : "border-border text-muted-foreground hover:border-foreground/25 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function Highlighted({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlight(text, query).map((part, index) =>
        part.match ? (
          <mark key={index} className="bg-transparent font-semibold text-foreground">
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </>
  );
}
