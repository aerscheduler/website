import { API_URL } from "@/lib/site";

/**
 * The public AD library (www.aerscheduler.com/airworthiness-directives): every Airworthiness
 * Directive in the library, read from the API's public endpoints
 * (`server/src/routes/publicAds.routes.ts`), no account needed. Pages re-fetch hourly, so a new
 * AD reaches them without a website deploy. The text is the Federal Register's own, a US
 * government work; we lay it out and file it under the aircraft, engine, propeller or
 * appliance it names. Nothing here is written about an AD by us.
 */

export const AD_BASE = "/airworthiness-directives";

/** URL segment to the API's page kind, and how each kind is named. */
export const KINDS = {
  aircraft: { kind: "aircraft", segment: "aircraft", plural: "Aircraft", singular: "aircraft model", lead: "By aircraft model" },
  engines: { kind: "engine", segment: "engines", plural: "Engines", singular: "engine", lead: "By engine" },
  propellers: { kind: "propeller", segment: "propellers", plural: "Propellers", singular: "propeller maker", lead: "By propeller maker" },
  appliances: { kind: "appliance", segment: "appliances", plural: "Appliances and equipment", singular: "equipment maker", lead: "By equipment maker" },
} as const;
export type KindSegment = keyof typeof KINDS;
export type PageKind = (typeof KINDS)[KindSegment]["kind"];
export const segmentFor = (kind: string): KindSegment => (Object.keys(KINDS) as KindSegment[]).find((k) => KINDS[k].kind === kind) ?? "aircraft";
export const pageHref = (kind: string, slug: string) => `${AD_BASE}/${segmentFor(kind)}/${slug}`;
export const adHref = (adNumber: string) => `${AD_BASE}/${adNumber}`;

export type AdBlock =
  | { t: "p"; text: string; level: number }
  | { t: "h"; text: string }
  | { t: "note"; text: string }
  | { t: "table"; title: string | null; head: string[]; rows: string[][] };
export type AdDetails = { v: 1; applicability: AdBlock[]; actions: { heading: string; blocks: AdBlock[] }[] };

export type AdRow = {
  adNumber: string;
  amendment: string | null;
  title: string;
  manufacturer: string;
  productType: string;
  publishedOn: string;
  effectiveOn: string | null;
  subject: string | null;
  supersedes: string[];
  supersededBy: string[];
  repetitive: boolean;
  onPublicInspection: boolean;
  url: string;
  /** "Requires repetitive inspections of ...", from the FAA's summary; null when it has none. */
  requires: string | null;
};

export type AdFull = Omit<AdRow, "requires"> & {
  applicability: string;
  unsafeCondition: string | null;
  summary: string | null;
  details: AdDetails | null;
  frDocumentNumber: string;
  updatedAt: string;
  supersedesInLibrary: string[];
  pages: { kind: PageKind; slug: string; name: string; fleetCount: number; mentioned: boolean }[];
};

export type PageSummary = { slug: string; name: string; maker: string; fleetCount: number; adCount: number; isMaker: boolean };
export type ModelPage = {
  kind: PageKind;
  slug: string;
  name: string;
  maker: string;
  isMaker: boolean;
  fleetCount: number;
  updatedAt: string;
  figures: { total: number; notSuperseded: number; superseded: number; repetitive: number; newest: string | null; byYear: { year: number; count: number }[] };
  ads: AdRow[];
  /** Equipment ADs whose text names this aircraft model (aircraft model pages only). */
  equipment: AdRow[];
};
export type LibraryStats = {
  count: number;
  firstYear: number;
  oldest: string | null;
  newest: string | null;
  onPublicInspection: number;
  pages: Partial<Record<PageKind, number>>;
  lastAddedAt: string | null;
};

/** How often a page asks the API again, in seconds. New ADs arrive hourly. */
export const AD_REVALIDATE = 3600;

async function get<T>(path: string, revalidate = AD_REVALIDATE): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}/public${AD_BASE}${path}`, { next: { revalidate: process.env.NODE_ENV === "development" ? 0 : revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // The API unreachable at build time must not fail the site; the next revalidation fills it.
    return null;
  }
}

const data = <T,>(body: { data: T } | null) => body?.data ?? null;

export const getStats = async () => data(await get<{ data: LibraryStats }>("/stats"));
export const getAd = async (adNumber: string) => data(await get<{ data: AdFull }>(`/ads/${encodeURIComponent(adNumber)}`));
export const getPages = async (kind: PageKind) => data(await get<{ data: PageSummary[] }>(`/pages/${kind}`)) ?? [];
export const getModelPage = async (kind: PageKind, slug: string) => data(await get<{ data: ModelPage }>(`/pages/${kind}/${encodeURIComponent(slug)}`));
export const getRecent = async (days = 30) => data(await get<{ data: AdRow[] }>(`/recent?days=${days}`)) ?? [];
export const getMonths = async () => data(await get<{ data: { month: string; count: number }[] }>("/months")) ?? [];
export const getMonth = async (month: string) => data(await get<{ data: (AdRow & { summary: string | null })[] }>(`/months/${month}`));
export const getSitemap = async () =>
  data(await get<{ data: { ads: { adNumber: string; updatedAt: string; readable: boolean }[]; pages: { kind: PageKind; slug: string; updatedAt: string }[] } }>("/sitemap"));
export async function searchAds(q: string, page = 1, type?: string) {
  const params = new URLSearchParams({ q, page: String(page), pageSize: "25" });
  if (type) params.set("type", type);
  return (await get<{ data: AdRow[]; total: number; page: number; pageSize: number }>(`/search?${params}`, 300)) ?? { data: [], total: 0, page, pageSize: 25 };
}

/** The API's own address for a page's CSV, which needs no account. */
export const csvHref = (kind: string, slug: string) => `${API_URL}/public${AD_BASE}/pages/${kind}/${slug}.csv`;
export const apiBase = `${API_URL}/public${AD_BASE}`;

/** Dates are UTC days: formatted in UTC, or Oct 6 reads Oct 5 in America. */
export const adDate = (iso: string | null | undefined, style: "short" | "long" = "short") =>
  iso ? new Intl.DateTimeFormat("en-US", { month: style === "long" ? "long" : "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(iso)) : null;

/**
 * What an AD is about, in a few words: the subject line's system ("Code 7931, Engine Oil
 * Pressure." is "Engine oil pressure"), else the title without its "Airworthiness Directives;".
 */
export function adAbout(ad: { subject: string | null; title: string }): string {
  const m = ad.subject ? /Code:?\s*\d+(?!\d)\s*[,;:]?\s*([^.;(\d][^.;(]*)/i.exec(ad.subject) : null;
  const words = m?.[1]?.replace(/\s*\/\s*/g, "/").trim();
  if (words) return words.charAt(0).toUpperCase() + words.slice(1).toLowerCase();
  return adTitle(ad.title);
}

/** "Airworthiness Directives; Cessna Aircraft Company Airplanes" is "Cessna Aircraft Company Airplanes". */
export const adTitle = (title: string) => title.replace(/^Airworthiness Directives?[;:]\s*/i, "").replace(/[;,]\s*Correction$/i, "").trim();

export const PRODUCT_LABEL: Record<string, string> = {
  airplane: "Airplane",
  rotorcraft: "Rotorcraft",
  glider: "Glider",
  balloon: "Balloon",
  engine: "Engine",
  propeller: "Propeller",
  appliance: "Appliance",
  various: "Various",
};

export const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);
