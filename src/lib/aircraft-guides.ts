import { API_URL } from "@/lib/site";
import type { AdRow } from "@/lib/ad-library";

/**
 * The aircraft ownership guides (www.aerscheduler.com/aircraft): one per aircraft model with
 * at least 200 US registrations, read from the API's /public/aircraft (server:
 * services/publicAds.service.ts `guides`, `guide`). The fleet comes from the FAA registry and
 * the ADs from the AD library.
 */
export const GUIDE_BASE = "/aircraft";
export const guideHref = (slug: string) => `${GUIDE_BASE}/${slug}`;

export type AircraftProfile = {
  years: { known: number; oldest: number; newest: number; p25: number; median: number; p75: number } | null;
  engines: { name: string; slug: string | null; count: number }[];
  seats: number | null;
  gear: string | null;
  engineType: string | null;
  category: string | null;
};

export type GuideSummary = { slug: string; name: string; nickname: string | null; maker: string; fleetCount: number; adCount: number; oldest: number | null; newest: number | null };

export type Guide = {
  slug: string;
  name: string;
  nickname: string | null;
  maker: string;
  designation: string;
  family: string;
  fleetCount: number;
  updatedAt: string;
  profile: AircraftProfile | null;
  ads: { listed: number; current: number; superseded: number; repetitive: AdRow[]; newest: AdRow[]; equipment: number };
  engines: { name: string; slug: string | null; count: number; ads: { name: string; current: number; repetitive: number } | null }[];
  variants: { slug: string; name: string; nickname: string | null; fleetCount: number; guide: boolean }[];
  /** The NTSB accident record (server: services/aircraftSafety.service.ts). */
  safety: {
    since: number;
    accidents: number;
    fatal: number;
    fatalities: number;
    destroyed: number;
    events: { name: string; count: number }[];
    phases: { name: string; count: number }[];
    byYear: { year: number; accidents: number; fatal: number }[];
    recent: { ntsbNo: string; date: string; city: string | null; state: string | null; injury: string | null; fatalities: number; damage: string | null; event: string | null; phase: string | null }[];
    asOf: string | null;
  } | null;
  /** The FAA Service Difficulty Reports (server: services/aircraftSdr.service.ts). */
  problems: {
    since: number;
    reports: number;
    systems: { code: string; name: string; count: number }[];
    parts: { name: string; condition: string | null; count: number }[];
    byYear: { year: number; reports: number }[];
    recent: { date: string; system: string | null; part: string | null; condition: string | null; text: string }[];
    asOf: string | null;
  } | null;
};

/**
 * Typical cruise fuel burn (gal/hr) for the common models, a starting figure for the cost
 * estimator, labelled as typical and editable. Only models with one usual engine.
 */
export const FUEL_BURN: Record<string, number> = {
  "cessna-150": 6, "cessna-150f": 6, "cessna-150g": 6, "cessna-150h": 6, "cessna-150j": 6, "cessna-150k": 6, "cessna-150l": 6, "cessna-150m": 6,
  "cessna-152": 6, "cessna-140": 5, "cessna-172m": 8, "cessna-172n": 8, "cessna-172p": 8, "cessna-172r": 8.5, "cessna-172s": 9,
  "cessna-182p": 12.5, "cessna-182q": 12.5, "cessna-182t": 13, "piper-pa-28-140": 8, "piper-pa-28-151": 8, "piper-pa-28-161": 8.5,
  "piper-pa-28-180": 9.5, "piper-pa-28-181": 9.5, "piper-j3c-65": 4, "piper-pa-18-150": 8, "aeronca-7ac": 4.5, "cirrus-sr20": 11,
  "cirrus-sr22": 17, "mooney-m20j": 9.5, "beechcraft-a36": 15, "diamond-da40": 9, "robinson-r44": 15,
};

/**
 * The engine maker's published hours between overhauls, where one figure covers the engine
 * family (Lycoming Service Instruction 1009, Continental's overhaul schedule), and models whose
 * one usual engine has its own. Editable in the estimator; a dash number can differ.
 */
const TBO_BY_ENGINE: Record<string, number> = {
  "Lycoming O-320": 2000,
  "Lycoming O-360": 2000,
  "Continental A65": 1800,
  "Continental A75": 1800,
  "Continental C85": 1800,
  "Continental C90": 1800,
  "Continental O-200": 1800,
};
const TBO_BY_MODEL: Record<string, number> = { "cessna-152": 2400, "cessna-172r": 2000, "cessna-172s": 2000 };

export function defaultTbo(slug: string, engine: string | null): number | null {
  return TBO_BY_MODEL[slug] ?? (engine ? TBO_BY_ENGINE[engine] ?? null : null);
}

/** Rebuilt daily on the server, so a day is plenty. */
export const GUIDE_REVALIDATE = 86400;

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}/public${GUIDE_BASE}${path}`, { next: { revalidate: process.env.NODE_ENV === "development" ? 0 : GUIDE_REVALIDATE } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // The API unreachable at build time must not fail the site; the next revalidation fills it.
    return null;
  }
}

export const getGuides = async () => (await get<{ data: GuideSummary[] }>("?limit=1000"))?.data ?? [];
export const getGuide = async (slug: string) => (await get<{ data: Guide }>(`/${encodeURIComponent(slug)}`))?.data ?? null;

/** "Cessna 172S Skyhawk SP": the model and, when it has one, what pilots call it. */
export const guideTitle = (g: { name: string; nickname: string | null }) => (g.nickname ? `${g.name} ${g.nickname}` : g.name);

/** "Lycoming IO-360 (96%)". */
export const share = (count: number, total: number) => `${Math.round((count / Math.max(total, 1)) * 100)}%`;
