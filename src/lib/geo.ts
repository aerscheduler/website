/**
 * Approximate visitor country, for consent UX only.
 *
 * Written by `src/middleware.ts` from Vercel's `x-vercel-ip-country` header onto the
 * first-party `aer_country` cookie. IP geolocation is imperfect, so anything unknown
 * returns null and every caller must treat null as "ask for consent" rather than
 * silently tracking.
 *
 * This mirrors `web/src/lib/geo.ts` in the console. The two cannot import from each
 * other (separate repos, separate bundlers), so **if you change the region list here,
 * change it there in the same commit.** A visitor who is prompted on one surface and
 * silently tracked on the other is worse than either policy applied consistently.
 */

export const COUNTRY_COOKIE = "aer_country";

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** ISO 3166-1 alpha-2, or null when unknown. */
export function getVisitorCountry(): string | null {
  const raw = readCookie(COUNTRY_COOKIE);
  return raw && /^[A-Z]{2}$/.test(raw) ? raw : null;
}

/**
 * Where prior opt-in is legally required before analytics or ad cookies load.
 *
 * The EU27 plus the rest of the EEA (Iceland, Liechtenstein, Norway), the UK under UK
 * GDPR, and Switzerland under the revised FADP. In these places the ePrivacy rules mean
 * nothing third-party may run until the visitor says yes.
 */
const OPT_IN_REQUIRED = new Set([
  // EU27
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  // Rest of the EEA
  "IS", "LI", "NO",
  // UK GDPR, and Switzerland's revFADP
  "GB", "CH",
]);

/**
 * True when we may treat analytics as consented without a blocking prompt.
 *
 * Deliberately requires a KNOWN country outside the opt-in list. An unknown country
 * (no cookie, header missing, a proxy Vercel cannot place) falls through to asking,
 * because guessing wrong in the permissive direction is the expensive mistake.
 *
 * Note this is about the blocking banner only. Global Privacy Control is still honoured
 * everywhere, and the footer still offers a way to withdraw, which is what CPRA and the
 * similar state acts ask for.
 */
export function isConsentImpliedRegion(country: string | null): boolean {
  if (!country) return false;
  return !OPT_IN_REQUIRED.has(country);
}
