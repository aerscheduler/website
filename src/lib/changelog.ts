import { API_URL } from "@/lib/site";

/**
 * The public changelog: the same "What's new" updates the console and the app show, written
 * as typed files in the API (`server/src/whatsNew/entries`) and served by
 * `GET /whats-new/changelog`, published ones only. The page re-fetches hourly, so publishing an
 * update reaches this page without a website deploy.
 */

export type ChangelogImage = { light: string; dark: string | null; alt: string };

export type ChangelogBlock =
  | { type: "lede"; text: string }
  | { type: "features"; items: { icon: string; title: string; body: string }[] }
  | { type: "screenshot"; image: ChangelogImage; caption: string | null }
  | { type: "steps"; title: string | null; items: string[] }
  | { type: "note"; text: string }
  | { type: "section"; title: string; body: string }
  | { type: "list"; items: string[] };

export type ChangelogEntry = {
  id: string;
  publishedAt: string;
  title: string;
  summary: string;
  audienceLabel: string;
  hero: ChangelogImage | null;
  blocks: ChangelogBlock[];
  readMore: string | null;
};

/** How often the page asks the API again, in seconds. */
export const CHANGELOG_REVALIDATE = 3600;

export async function getChangelog(): Promise<ChangelogEntry[]> {
  try {
    // Fresh on every request in development, so an edited entry shows up on reload.
    const revalidate = process.env.NODE_ENV === "development" ? 0 : CHANGELOG_REVALIDATE;
    const res = await fetch(`${API_URL}/whats-new/changelog`, { next: { revalidate } });
    if (!res.ok) return [];
    const body = (await res.json()) as { data?: ChangelogEntry[] };
    return Array.isArray(body.data) ? body.data : [];
  } catch {
    // The API being unreachable at build time must not fail the whole site; the next
    // revalidation fills the page in.
    return [];
  }
}

/** Publish dates are UTC midnights: format in UTC or Oct 6 reads Oct 5 in America. */
export const changelogDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
