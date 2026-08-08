"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, CornerDownLeft, Loader2, Search, X } from "lucide-react";
import {
  highlight,
  loadSearchIndex,
  parseTypedQuery,
  searchGrouped,
  snippetFor,
  TYPE_CHIP_LABEL,
  TYPE_FILTERS,
  TYPE_LABEL,
  type SearchEngine,
  type SearchGroup,
  type SearchRecord,
  type SearchType,
} from "@/lib/search";
import { cn } from "@/lib/cn";

/**
 * Site-wide search, in the header.
 *
 * Shaped after the console's command palette so the two feel like one product:
 * results grouped by kind under their own heading, keyboard navigation across
 * the groups, the match bolded, and `docs:` style filters promoted into a chip.
 *
 * What is deliberately different is where the work happens. The console queries
 * Postgres because it is searching a school's live records. This is searching a
 * fixed set of pages, so the whole corpus ships as a static asset and the query
 * runs in the browser. No request per keystroke, no debounce, no empty state
 * while the network thinks.
 */

/** Suggested when the field is open and empty. The four things people look for. */
const SUGGESTIONS: { label: string; href: string }[] = [
  { label: "Getting started", href: "/docs/getting-started" },
  { label: "Pricing", href: "/pricing" },
  { label: "Book a flight", href: "/docs/scheduling" },
  { label: "API reference", href: "/docs/api" },
];

export function SiteSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<SearchType | null>(null);
  const [engine, setEngine] = useState<SearchEngine | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /**
   * Pull the index down on first intent rather than on page load.
   *
   * Called on focus and on the shortcut, so by the time anybody has typed two
   * characters the fetch is usually already done and the results appear with
   * the keystroke. Re-callable: `loadSearchIndex` caches its own promise, so
   * repeated focus costs nothing.
   */
  const ensureIndex = useCallback(() => {
    if (engine || loading) return;
    setLoading(true);
    loadSearchIndex()
      .then((loaded) => {
        setEngine(loaded);
        setFailed(false);
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [engine, loading]);

  // Cmd-K / Ctrl-K from anywhere, and Escape to get out.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        ensureIndex();
        setOpen(true);
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && open) {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ensureIndex, open]);

  // Click outside closes. Pointerdown rather than click so it fires before the
  // link under the cursor navigates.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Promote `docs: hobbs` into a chip plus the text, so the prefix is not left
  // sitting in the field duplicating the chip beside it.
  useEffect(() => {
    if (typeFilter) return;
    const { typeFilter: parsed, text } = parseTypedQuery(query);
    if (!parsed) return;
    setTypeFilter(parsed);
    setQuery(text);
  }, [query, typeFilter]);

  const groups: SearchGroup[] = useMemo(() => {
    if (!engine) return [];
    return searchGrouped(engine, query, { typeFilter });
  }, [engine, query, typeFilter]);

  /** Flattened for arrow-key traversal, which crosses group boundaries. */
  const flat = useMemo(() => groups.flatMap((group) => group.results), [groups]);

  useEffect(() => setActive(0), [query, typeFilter]);

  // Keep the highlighted row in view when the arrows walk past the fold.
  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setTypeFilter(null);
  };

  const go = (href: string) => {
    close();
    router.push(href);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (flat.length === 0 ? 0 : (i + 1) % flat.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (flat.length === 0 ? 0 : (i - 1 + flat.length) % flat.length));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = flat[active];
      // Enter with nothing highlighted goes to the full results page, which is
      // also the only way to see past the five-per-group cap.
      if (target) go(target.href);
      else if (query.trim()) go(`/search?q=${encodeURIComponent(query.trim())}`);
    } else if (event.key === "Backspace" && query === "" && typeFilter) {
      // Backspacing off the front of an empty field removes the chip, which is
      // what every chip-input in the console does.
      setTypeFilter(null);
    }
  };

  /**
   * Open means open, including while the index is still downloading.
   *
   * This was gated on the fetch having finished, which meant pressing the
   * shortcut on a cold page did nothing visible for as long as the download
   * took. The panel knows how to render a loading state; withholding it just
   * makes the shortcut feel broken.
   */
  const showPanel = open;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 transition",
          open ? "ring-2 ring-brand/35" : "hover:border-foreground/25"
        )}
      >
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />

        {typeFilter ? (
          <span className="flex shrink-0 items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs font-medium">
            {TYPE_CHIP_LABEL[typeFilter]}
            <button
              type="button"
              onClick={() => {
                setTypeFilter(null);
                inputRef.current?.focus();
              }}
              aria-label={`Remove ${TYPE_LABEL[typeFilter]} filter`}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" aria-hidden />
            </button>
          </span>
        ) : null}

        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="site-search-results"
          aria-label="Search documentation, features, and guides"
          placeholder="Search docs, features, guides..."
          value={query}
          onFocus={() => {
            ensureIndex();
            setOpen(true);
          }}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
        />

        {loading ? (
          <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" aria-hidden />
        ) : (
          // Hidden until xl. At lg the field is 160px wide, and the badge eats
          // enough of it to cut the placeholder mid-word.
          <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground xl:block">
            {typeof navigator !== "undefined" && /Mac/i.test(navigator.platform) ? "⌘K" : "Ctrl K"}
          </kbd>
        )}
      </div>

      {showPanel ? (
        <div
          id="site-search-results"
          ref={listRef}
          role="listbox"
          className="absolute right-0 z-50 mt-2 max-h-[70vh] w-[min(34rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-border bg-background shadow-xl"
        >
          <SearchPanel
            query={query}
            typeFilter={typeFilter}
            groups={groups}
            flat={flat}
            active={active}
            failed={failed}
            loading={loading}
            onHover={setActive}
            onPick={go}
            onFilter={(type) => {
              setTypeFilter(type);
              inputRef.current?.focus();
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

function SearchPanel({
  query,
  typeFilter,
  groups,
  flat,
  active,
  failed,
  loading,
  onHover,
  onPick,
  onFilter,
}: {
  query: string;
  typeFilter: SearchType | null;
  groups: SearchGroup[];
  flat: SearchRecord[];
  active: number;
  failed: boolean;
  loading: boolean;
  onHover: (index: number) => void;
  onPick: (href: string) => void;
  onFilter: (type: SearchType) => void;
}) {
  const trimmed = query.trim();

  if (failed) {
    return (
      <p className="px-4 py-6 text-sm text-muted-foreground">
        Search is unavailable right now. Try the{" "}
        <Link href="/docs" className="underline">
          documentation index
        </Link>{" "}
        instead.
      </p>
    );
  }

  // Empty field: offer the destinations rather than an empty box, and the
  // filters, which are otherwise undiscoverable.
  if (!trimmed) {
    return (
      <div className="p-2">
        <GroupLabel>Jump to</GroupLabel>
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion.href}
            type="button"
            onClick={() => onPick(suggestion.href)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
          >
            {suggestion.label}
            <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
          </button>
        ))}
        {typeFilter ? null : (
          <>
            <GroupLabel>Filter by</GroupLabel>
            <div className="flex flex-wrap gap-1.5 px-3 pb-2 pt-1">
              {TYPE_FILTERS.map((filter) => (
                <button
                  key={filter.type}
                  type="button"
                  onClick={() => onFilter(filter.type)}
                  className="rounded border border-border px-2 py-1 text-xs text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                >
                  {filter.syntax}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  if (loading) {
    return <p className="px-4 py-6 text-sm text-muted-foreground">Searching...</p>;
  }

  if (flat.length === 0) {
    return (
      <div className="px-4 py-6 text-sm text-muted-foreground">
        <p>
          No results for <span className="font-medium text-foreground">{trimmed}</span>
          {typeFilter ? ` in ${TYPE_LABEL[typeFilter]}` : ""}.
        </p>
        <p className="mt-2">
          Try fewer words, or{" "}
          <Link href="/contact" className="underline">
            ask us
          </Link>
          .
        </p>
      </div>
    );
  }

  // Running index across groups, so the arrow keys and the rendered rows agree
  // on which row is which.
  let cursor = -1;

  return (
    <div className="p-2">
      {groups.map((group) => (
        <div key={group.type}>
          <GroupLabel>{group.label}</GroupLabel>
          {group.results.map((result) => {
            cursor += 1;
            const index = cursor;
            return (
              <ResultRow
                key={result.id}
                result={result}
                query={trimmed}
                active={index === active}
                onHover={() => onHover(index)}
                onPick={() => onPick(result.href)}
              />
            );
          })}
        </div>
      ))}

      <Link
        href={`/search?q=${encodeURIComponent(trimmed)}`}
        className="mt-1 flex items-center justify-between rounded-lg border-t border-border px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        See all results for &ldquo;{trimmed}&rdquo;
        <CornerDownLeft className="size-3.5" aria-hidden />
      </Link>
    </div>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </div>
  );
}

function ResultRow({
  result,
  query,
  active,
  onHover,
  onPick,
}: {
  result: SearchRecord;
  query: string;
  active: boolean;
  onHover: () => void;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      data-active={active}
      onMouseMove={onHover}
      onClick={onPick}
      className={cn(
        "block w-full rounded-lg px-3 py-2 text-left transition",
        active ? "bg-muted" : "hover:bg-muted/60"
      )}
    >
      {result.path.length > 0 ? (
        <div className="truncate text-[11px] text-muted-foreground">{result.path.join(" › ")}</div>
      ) : null}
      <div className="truncate text-sm font-medium">
        <Highlighted text={result.title} query={query} />
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        <Highlighted text={snippetFor(result)} query={query} />
      </div>
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
