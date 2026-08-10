/**
 * Site search: the index contract, and the ranking on top of it.
 *
 * The corpus is `public/search-index.json`, generated at build time by
 * `scripts/build-search-index.mjs` from the same registries the sitemap reads.
 * Nothing here touches the filesystem, so this module is safe to import from a
 * client component. That constraint is real, not theoretical: `lib/docs-toc.ts`
 * had to be split out of `lib/docs.ts` for exactly this reason, because one
 * `node:fs` import anywhere in the header's import chain fails the client
 * bundle.
 *
 * Loading is deliberately lazy. The index is a couple of hundred KB over the
 * wire and the overwhelming majority of visitors never open search, so it is
 * fetched on first intent (focus or the keyboard shortcut), not on page load.
 */

import MiniSearch, { type SearchResult as MiniSearchResult } from "minisearch";

export type SearchType = "docs" | "feature" | "guide" | "api" | "page";

export type SearchRecord = {
  id: string;
  type: SearchType;
  title: string;
  href: string;
  /** Breadcrumb above the title, e.g. ["Documentation", ", Billing", ", Invoices"]. */
  path: string[];
  /** Present when the record has a written summary. Otherwise the UI uses `body`. */
  description?: string;
  keywords?: string;
  body?: string;
};

export type SearchGroup = {
  type: SearchType;
  label: string;
  results: SearchRecord[];
};

/**
 * Group order, which is also priority order when results are trimmed.
 *
 * Documentation first because the visitor who reaches for search is usually
 * stuck rather than shopping: somebody browsing the marketing site clicks the
 * nav, somebody who cannot work out how to close out a flight types into a box.
 */
export const TYPE_ORDER: SearchType[] = ["docs", "feature", "guide", "api", "page"];

export const TYPE_LABEL: Record<SearchType, string> = {
  docs: "Documentation",
  feature: "Features",
  guide: "Guides",
  api: "API reference",
  page: "Pages",
};

/**
 * Short forms, for the filter chip inside the header's search field.
 *
 * The field is 160px at lg, and a chip reading "Documentation" leaves about two
 * characters of room for the query. The full label is still the accessible name
 * on the chip's remove button, so nothing is lost to a screen reader.
 */
export const TYPE_CHIP_LABEL: Record<SearchType, string> = {
  docs: "Docs",
  feature: "Features",
  guide: "Guides",
  api: "API",
  page: "Pages",
};

/**
 * Type filters, mirroring the console's `people:` / `flights:` syntax so the
 * two searches feel like the same product. Typing `docs: hobbs` scopes to
 * documentation, and the prefix is promoted into a chip rather than left in the
 * field.
 */
export const TYPE_FILTERS: { type: SearchType; syntax: string; keywords: string[] }[] = [
  { type: "docs", syntax: "docs:", keywords: ["docs", "doc", "documentation", "help", "guide"] },
  { type: "feature", syntax: "features:", keywords: ["feature", "features"] },
  { type: "guide", syntax: "guides:", keywords: ["guides", "resource", "resources", "article"] },
  { type: "api", syntax: "api:", keywords: ["api", "endpoint", "endpoints", "rest", "developer"] },
  { type: "page", syntax: "pages:", keywords: ["page", "pages", "site"] },
];

/** Parse `docs: hobbs` into a filter plus the remaining text. */
export function parseTypedQuery(raw: string): { typeFilter: SearchType | null; text: string } {
  const match = /^([a-z][\w-]*):\s*(.*)$/i.exec(raw.trim());
  if (!match) return { typeFilter: null, text: raw };

  const prefix = match[1]!.toLowerCase();
  const filter = TYPE_FILTERS.find(
    (f) => f.syntax.replace(":", "") === prefix || f.keywords.includes(prefix)
  );
  return filter ? { typeFilter: filter.type, text: match[2] ?? "" } : { typeFilter: null, text: raw };
}

/* ------------------------------------------------------------------ */
/* The index                                                           */
/* ------------------------------------------------------------------ */

/**
 * Field weights.
 *
 * Title dominates because a heading in this corpus is a question somebody
 * asked ("Why a flight has no Hobbs"), not a label. `keywords` carries the
 * registry's `seoQuery`, which is literally the phrase a person types, so it
 * outranks body text. Body is last: it is the widest net and the weakest
 * signal, and without the gap between them a passing mention in a long
 * reference article outranks the page actually about the thing.
 */
const FIELD_BOOST = { title: 6, path: 2, description: 3, keywords: 4, body: 1 };

/**
 * The loaded corpus: the index for querying, and the records themselves.
 *
 * Records are kept beside the index rather than in MiniSearch's `storeFields`.
 * `storeFields` stores what `extractField` returned, which for `path` is the
 * flattened string it needed for indexing, so a stored `path` comes back as
 * "Documentation Billing Invoices" and no longer behaves like the array it was.
 * Holding the originals keeps the record that comes out of a search identical
 * to the one that went in.
 */
export type SearchEngine = {
  index: MiniSearch<SearchRecord>;
  byId: Map<string, SearchRecord>;
};

let enginePromise: Promise<SearchEngine> | null = null;

function buildEngine(records: SearchRecord[]): SearchEngine {
  const index = new MiniSearch<SearchRecord>({
    fields: ["title", "path", "description", "keywords", "body"],
    extractField: (record, field) => {
      const value = record[field as keyof SearchRecord];
      return Array.isArray(value) ? value.join(" ") : ((value ?? "") as string);
    },
    searchOptions: {
      boost: FIELD_BOOST,
      // Every term must match something. "hobbs meter" should not return every
      // page containing "meter", which is what OR would do.
      combineWith: "AND",
      // Prefix matching makes the palette feel live: "reserv" finds
      // reservations before the word is finished.
      prefix: true,
      /**
       * Fuzziness scaled to term length, and only past four characters.
       *
       * A blanket fuzzy match turns short terms into noise ("sim" matching
       * "sum", ", six", ", sms"). Past four characters a typo is far more likely
       * than a real word one edit away, so 0.2 (one edit per five characters)
       * recovers "reservtion" without inventing matches.
       */
      fuzzy: (term) => (term.length > 4 ? 0.2 : false),
    },
  });
  index.addAll(records);
  return { index, byId: new Map(records.map((record) => [record.id, record])) };
}

/**
 * Fetch and index the corpus, once per page load.
 *
 * The promise is cached rather than the result, so overlapping callers (the
 * palette opening while the /search page is mounting) share one fetch. A
 * failure clears the cache so the next attempt retries rather than serving a
 * permanently broken search.
 */
export function loadSearchIndex(): Promise<SearchEngine> {
  if (!enginePromise) {
    enginePromise = fetch("/search-index.json")
      .then((response) => {
        if (!response.ok) throw new Error(`search index: HTTP ${response.status}`);
        return response.json();
      })
      .then((data: { records: SearchRecord[] }) => buildEngine(data.records))
      .catch((error) => {
        enginePromise = null;
        throw error;
      });
  }
  return enginePromise;
}

/* ------------------------------------------------------------------ */
/* Querying                                                            */
/* ------------------------------------------------------------------ */

/** How many results one group can contribute before the rest are cut. */
const PER_GROUP_LIMIT = 5;

/**
 * Run a query and return results already grouped for display.
 *
 * The per-group cap is what stops documentation burying everything else. There
 * are 981 documentation records against 14 features, so on a term like
 * "billing" an uncapped list is documentation all the way down and the Billing
 * feature page never appears, even though it is the best answer for somebody
 * still deciding whether to buy.
 *
 * Duplicate pages are collapsed to their best-scoring record. Without that, a
 * query matching four headings in one article shows that article four times.
 */
export function searchGrouped(
  engine: SearchEngine,
  query: string,
  options?: { typeFilter?: SearchType | null; perGroup?: number }
): SearchGroup[] {
  const text = query.trim();
  if (!text) return [];

  const hits = engine.index.search(text) as MiniSearchResult[];

  const perGroup = options?.perGroup ?? PER_GROUP_LIMIT;
  const bestPerPage = new Map<string, SearchRecord>();

  for (const hit of hits) {
    const record = engine.byId.get(String(hit.id));
    if (!record) continue;
    if (options?.typeFilter && record.type !== options.typeFilter) continue;
    // Same page, different anchor. Keep the first, which is the best scoring.
    const page = record.href.split("#")[0]!;
    if (!bestPerPage.has(page)) bestPerPage.set(page, record);
  }

  return TYPE_ORDER.map((type) => ({
    type,
    label: TYPE_LABEL[type],
    results: [...bestPerPage.values()].filter((r) => r.type === type).slice(0, perGroup),
  })).filter((group) => group.results.length > 0);
}

/**
 * The one-line summary under a result.
 *
 * Heading and FAQ records ship no description, because it would have been a
 * prefix of their body and storing both doubles the index. So the snippet comes
 * from whichever field the record actually has.
 */
export function snippetFor(record: SearchRecord, max = 150): string {
  const source = record.description ?? record.body ?? "";
  if (source.length <= max) return source;
  const cut = source.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut}...`;
}

/**
 * Split text into matched and unmatched runs, for bolding the hit.
 *
 * Matches on whole query terms rather than the raw string, so "hobbs meter"
 * highlights both words wherever they appear rather than only the exact phrase.
 * Terms are escaped before they reach the RegExp: a query is user input, and
 * "c++" or "(" would otherwise throw and blank the results list.
 */
export function highlight(text: string, query: string): { text: string; match: boolean }[] {
  const terms = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (terms.length === 0) return [{ text, match: false }];

  // Split keeps the captured delimiters, so the odd-numbered parts ARE the
  // matches. Deciding by position rather than by re-testing avoids the classic
  // trap: a /g regex carries `lastIndex` between `.test()` calls, so testing
  // each part against it flips the answer on alternate parts.
  const pattern = new RegExp(`(${terms.join("|")})`, "ig");
  return text
    .split(pattern)
    .map((part, index) => ({ text: part, match: index % 2 === 1 }))
    .filter((part) => part.text !== "");
}
