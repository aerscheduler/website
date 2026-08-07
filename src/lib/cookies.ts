/**
 * Cookies scoped to the whole product, not just the marketing site.
 *
 * AerScheduler is two apps on two hosts: `aerscheduler.com` (this Next site) and
 * `app.aerscheduler.com` (the console). A visitor crosses between them mid-funnel: they
 * read a feature page, click a CTA, and land in the console to sign up. Anything that has
 * to survive that hop, meaning which campaign sent them and whether they accepted the cookie
 * banner, is stored on the shared parent `.aerscheduler.com` so both apps see it.
 *
 * localStorage cannot do this. It is scoped per origin, so the console would read an
 * empty store and every paid signup would look organic.
 */

/**
 * The domain to scope a shared cookie to.
 *
 * Undefined off production hosts (localhost, Vercel preview deploys), where a host-only
 * cookie is the correct behaviour and a `.aerscheduler.com` attribute would be rejected
 * by the browser outright, silently dropping the cookie rather than erroring.
 */
export function sharedCookieDomain(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const host = window.location.hostname;
  return host === "aerscheduler.com" || host.endsWith(".aerscheduler.com")
    ? ".aerscheduler.com"
    : undefined;
}

export function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function writeSharedCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return;
  const domain = sharedCookieDomain();
  document.cookie = [
    `${name}=${encodeURIComponent(value)}`,
    "path=/",
    `max-age=${Math.round(days * 86_400)}`,
    // Lax rather than Strict: an ad click is a cross-site navigation, and Strict would
    // withhold the cookie on exactly the arrival being measured.
    "SameSite=Lax",
    ...(domain ? [`domain=${domain}`] : []),
    ...(window.location.protocol === "https:" ? ["Secure"] : []),
  ].join("; ");
}

export function deleteSharedCookie(name: string): void {
  if (typeof document === "undefined") return;
  const domain = sharedCookieDomain();
  document.cookie = [
    `${name}=`,
    "path=/",
    "max-age=0",
    ...(domain ? [`domain=${domain}`] : []),
  ].join("; ");
}
