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
};

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
