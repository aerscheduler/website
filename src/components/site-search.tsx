"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
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
 * Site-wide search: an icon in the header that opens a dialog.
 *
 * Shaped after the console's command palette so the two feel like one product:
 * results grouped by kind under their own heading, keyboard navigation across
 * the groups, the match bolded, and `docs:` style filters promoted into a chip.
 *
 * An icon rather than a field, and a dialog rather than a dropdown, for two
 * reasons. The bar is full: the comment on NAV_DESKTOP records that Features,
 * Integrations, Resources, Pricing and Docs only stop colliding at lg, and an
 * inline field left about 160px for the query, which a filter chip alone could
 * fill. And a dialog is not bound to the trigger's width, so a result gets the
 * full line rather than two words and an ellipsis. The same dialog serves
 * mobile, where it goes full-screen, so there is one search on the site rather
 * than a real one on desktop and a link somewhere else on phones.
 *
 * What is deliberately different from the console is where the work happens.
 * The console queries Postgres because it is searching a school's live records.
 * This is searching a fixed set of pages, so the whole corpus ships as a static
 * asset and the query runs in the browser. No request per keystroke, no
 * debounce, no empty state while the network thinks.
 */

/** Suggested when the dialog is open and empty. The four things people look for. */
const SUGGESTIONS: { label: string; href: string }[] = [
  { label: "Getting started", href: "/docs/getting-started" },
  { label: "Pricing", href: "/pricing" },
  { label: "Book a flight", href: "/docs/scheduling" },
  { label: "API reference", href: "/docs/api" },
];

/**
 * The header trigger, and the dialog it owns.
 *
 * One component rather than a trigger that a parent wires to a dialog, because
 * the shortcut listener and the open state have to be singular. Two mounted
 * instances (one for the desktop bar, one for the mobile bar) would both answer
 * Cmd-K and both open.
 */
export function SiteSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [primed, setPrimed] = useState(false);

  /**
   * Start the index download on hover or focus, before the click lands.
   *
   * `loadSearchIndex` caches its own promise, so this is free to call often and
   * the dialog's own call joins whatever is already in flight. It buys the few
   * hundred milliseconds between a person deciding to search and finishing the
   * click, which is usually the whole fetch.
   */
  const prime = useCallback(() => {
    if (primed) return;
    setPrimed(true);
    loadSearchIndex().catch(() => {
      // Swallowed on purpose. This is a speculative prefetch; the dialog runs
      // the same call and is the one that reports failure to the reader.
    });
  }, [primed]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        prime();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [prime]);

  return (
    <>
      <button
        type="button"
        aria-label="Search"
        aria-haspopup="dialog"
        aria-expanded={open}
        onMouseEnter={prime}
        onFocus={prime}
        onClick={() => {
          prime();
          setOpen(true);
        }}
        className={cn(
          "inline-flex items-center gap-2 rounded-full text-muted-foreground transition-colors hover:text-foreground",
          // Square on mobile so it sits beside the hamburger as a peer; on
          // desktop it grows a keyboard hint, which is the only way anybody
          // discovers the shortcut.
          "size-10 justify-center border border-border lg:size-auto lg:border-0 lg:px-3 lg:py-1.5",
          className
        )}
      >
        <Search className="size-5 lg:size-4" aria-hidden />
        <span className="hidden text-sm font-medium lg:inline">Search</span>
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] font-medium xl:block">
          <ShortcutHint />
        </kbd>
      </button>

      {open ? <SearchDialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}

/**
 * The shortcut label, rendered only after mount.
 *
 * `navigator.platform` does not exist on the server, so branching on it during
 * render makes the markup depend on where it was produced and React logs a
 * hydration mismatch. Empty on the first client render, correct on the second.
 */
function ShortcutHint() {
  const [label, setLabel] = useState("");
  useEffect(() => {
    setLabel(/Mac|iPhone|iPad/i.test(navigator.platform) ? "\u2318K" : "Ctrl K");
  }, []);
  return <>{label}</>;
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<SearchType | null>(null);
  const [engine, setEngine] = useState<SearchEngine | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Portals need a DOM to portal into, which the server render does not have.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let live = true;
    loadSearchIndex()
      .then((loaded) => live && setEngine(loaded))
      .catch(() => live && setFailed(true))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
  }, []);

  // Focus after the portal has painted the input. The previous rAF-on-mount
  // ran while `mounted` was still false (dialog returns null), so Cmd-K opened
  // an unfocused field and the next keystroke never typed into it.
  useLayoutEffect(() => {
    if (!mounted) return;
    inputRef.current?.focus();
  }, [mounted]);

  // Lock the page while the dialog is up, or the phone scrolls the article
  // behind the keyboard.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

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

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
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

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex justify-center bg-foreground/25 backdrop-blur-sm sm:items-start sm:p-4 sm:pt-[12vh]"
      onMouseDown={(event) => {
        // Backdrop only. mousedown rather than click so a drag that starts on a
        // result and ends on the backdrop does not close it mid-selection.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="flex h-full w-full flex-col overflow-hidden bg-background shadow-2xl sm:h-auto sm:max-h-[70vh] sm:max-w-2xl sm:rounded-xl sm:border sm:border-border"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
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
            aria-expanded
            aria-controls="site-search-results"
            aria-label="Search documentation, features, and guides"
            placeholder="Search docs, features, guides..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            className="w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground sm:text-sm [&::-webkit-search-cancel-button]:hidden"
          />

          {loading ? (
            <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" aria-hidden />
          ) : null}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="shrink-0 rounded p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div id="site-search-results" ref={listRef} role="listbox" className="min-h-0 flex-1 overflow-y-auto">
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
      </div>
    </div>,
    document.body
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
