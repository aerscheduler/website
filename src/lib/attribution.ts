/**
 * Which campaign sent this visitor, captured on the marketing site and handed to the
 * console.
 *
 * ## The problem this exists to solve
 *
 * An ad lands somebody on `aerscheduler.com/?utm_campaign=spring-schools`. They read,
 * they click "Start free trial", and that CTA points at `app.aerscheduler.com/signup`, which is
 * a different origin, with none of the query string. The console has always had
 * attribution capture (`web/src/lib/attribution.ts`), but it could only ever see params
 * that survived the hop, and none of them did. Every paid signup would have been
 * recorded as organic.
 *
 * ## Why a cookie rather than decorating the links
 *
 * The obvious fix is to append the params to every CTA href. That means every one of the
 * ~30 hard-coded `SIGNUP_URL` links has to remember to do it forever, and it still loses
 * anyone who reaches the console any other way: typing the URL, a bookmark, the emailed
 * verification link, an OAuth round trip through Google.
 *
 * A cookie scoped to `.aerscheduler.com` is set by the marketing site and read by
 * `app.aerscheduler.com` for free, on every one of those paths, with no link to maintain.
 * The console reads it as one more source alongside its own URL params.
 *
 * ## First touch wins
 *
 * Somebody who arrives from an ad, leaves, and comes back a week later via a Google
 * search should still be credited to the ad, because that is the click that was paid for. So an
 * existing unexpired record is never overwritten.
 *
 * This is first-party only: no third party sees it, and it records how somebody reached
 * our own site. It is therefore captured regardless of the cookie banner, which gates the
 * third-party analytics and ad scripts (see `lib/consent.ts`). Move the `hasConsent()`
 * check into `captureAttribution` if that line ever needs to move.
 */

/** Shared with app.aerscheduler.com. The name is part of the contract, so don't rename it. */
export const ATTRIBUTION_COOKIE = "aer_attr";

/** How long a landing still counts as the reason they signed up. */
const WINDOW_DAYS = 30;

/**
 * Ad-platform params worth keeping.
 *
 * `gclid` and `fbclid` are appended by Google and Meta themselves, so unlike the utm
 * tags, which also appear on hand-written newsletter and forum links, their presence
 * is proof the click was paid.
 */
const PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

export type Attribution = {
  /** Our own campaign slug from `?src=`, which orders the setup checklist. */
  src?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  /** Where they were immediately before, when the browser tells us. */
  referrer?: string;
  /** The first page of ours they saw, i.e. the ad's landing page. */
  landingPath?: string;
  /** ISO timestamp of the landing, used to expire the record. */
  at: string;
};

/**
 * Query strings are attacker-controlled and end up in a DB column and in analytics
 * dimensions, so keep the values small and boring.
 *
 * Click ids are long (a `gclid` runs well past 100 characters), hence the generous cap.
 */
function clean(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().slice(0, 255);
  return /^[\w .:/@%+=-]+$/.test(trimmed) ? trimmed : undefined;
}

/**
 * The domain to scope the cookie to, so the console on `app.` can read it.
 *
 * Returns undefined off production hosts (localhost, Vercel previews), where a
 * host-only cookie is correct and a `.aerscheduler.com` attribute would simply be
 * rejected by the browser.
 */
function cookieDomain(): string | undefined {
  const host = window.location.hostname;
  return host === "aerscheduler.com" || host.endsWith(".aerscheduler.com")
    ? ".aerscheduler.com"
    : undefined;
}

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function writeCookie(name: string, value: string, days: number): void {
  const domain = cookieDomain();
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "path=/",
    `max-age=${Math.round(days * 86_400)}`,
    // Lax, not Strict: an ad click is a cross-site navigation, and Strict would
    // withhold the cookie on exactly the arrival we care about.
    "SameSite=Lax",
    ...(domain ? [`domain=${domain}`] : []),
    ...(window.location.protocol === "https:" ? ["Secure"] : []),
  ];
  document.cookie = parts.join("; ");
}

/** The stored landing, or null when there isn't one or it has aged out. */
export function readAttribution(): Attribution | null {
  if (typeof document === "undefined") return null;
  try {
    const raw = readCookie(ATTRIBUTION_COOKIE);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    if (!parsed?.at) return null;
    const age = Date.now() - new Date(parsed.at).getTime();
    if (!Number.isFinite(age) || age > WINDOW_DAYS * 86_400_000) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Read campaign params off the current URL and remember them for the console.
 *
 * Safe to call on every navigation, since it returns early once a record exists.
 */
export function captureAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const existing = readAttribution();
    if (existing) return existing; // first touch wins

    const params = new URLSearchParams(window.location.search);
    const src = clean(params.get("src") ?? params.get("ref"));
    const tagged = Object.fromEntries(
      PARAM_KEYS.map((k) => [k, clean(params.get(k))]).filter(([, v]) => v)
    );

    // An untagged visit from another site is still worth attributing, because that is how
    // organic search, forums and word of mouth show up. An untagged visit with no
    // referrer is someone typing the address in, which tells us nothing worth a cookie.
    const referrer = externalReferrer();
    if (!src && Object.keys(tagged).length === 0 && !referrer) return null;

    const record: Attribution = {
      ...(src ? { src } : {}),
      ...tagged,
      ...(referrer ? { referrer } : {}),
      landingPath: window.location.pathname.slice(0, 255),
      at: new Date().toISOString(),
    };

    writeCookie(ATTRIBUTION_COOKIE, JSON.stringify(record), WINDOW_DAYS);
    return record;
  } catch {
    // Private browsing, disabled storage, a cookie over the size limit. Attribution
    // is never worth breaking a page load over.
    return null;
  }
}

/** The referring site, when it is a site and not one of ours. */
function externalReferrer(): string | undefined {
  if (!document.referrer) return undefined;
  try {
    const host = new URL(document.referrer).hostname;
    if (host === window.location.hostname || host.endsWith("aerscheduler.com")) {
      return undefined;
    }
  } catch {
    return undefined;
  }
  return document.referrer.slice(0, 255);
}

/**
 * The channel this visit belongs to, for reporting.
 *
 * Deliberately coarse: "paid-search", "paid-social", "organic", "referral", "direct".
 * The campaign name answers which ad; this answers which budget.
 */
export function channelOf(a: Attribution | null): string {
  if (!a) return "direct";
  if (a.gclid) return "paid-search";
  if (a.fbclid) return "paid-social";

  const medium = a.utm_medium?.toLowerCase();
  if (medium === "cpc" || medium === "ppc" || medium === "paid") return "paid-search";
  if (medium === "paid-social" || medium === "paid_social") return "paid-social";
  if (medium === "email") return "email";

  if (a.referrer) {
    const host = a.referrer.replace(/^https?:\/\//, "").split("/")[0];
    return /google\.|bing\.|duckduckgo\.|yahoo\./.test(host) ? "organic" : "referral";
  }

  return a.src ? "referral" : "direct";
}
