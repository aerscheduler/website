import { NextResponse, type NextRequest } from "next/server";

import { COUNTRY_COOKIE } from "@/lib/geo";

/**
 * Next 16 renamed the `middleware` file convention to `proxy`; using the old name logs a
 * deprecation warning and, in this project, silently did not run. Keep this file named
 * `proxy.ts` with a default export.
 *
 * Stamp the visitor's country on a first-party cookie so the consent banner can decide
 * whether it needs to block, without an extra round trip or a third-party geo lookup.
 *
 * Mirrors `web/middleware.ts` in the console, which does the same thing for
 * app.aerscheduler.com. The cookie is host-only on each surface, so both need their own.
 *
 * Vercel sets `x-vercel-ip-country` (ISO 3166-1 alpha-2). Anything missing or malformed
 * leaves the cookie unset, and `isConsentImpliedRegion` treats unknown as "ask", so a
 * failure here degrades to the old behaviour rather than to silent tracking.
 */
export default function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const raw = request.headers.get("x-vercel-ip-country");
  const country = raw && /^[A-Za-z]{2}$/.test(raw) ? raw.toUpperCase() : null;
  if (!country) return response;

  response.cookies.set(COUNTRY_COOKIE, country, {
    path: "/",
    // Short: it is a hint for one visit, not a profile. Re-stamped on the next request.
    maxAge: 3600,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    // Deliberately NOT httpOnly. The banner reads it from client JavaScript.
    httpOnly: false,
  });

  return response;
}

export const config = {
  /**
   * Every real page, and nothing else. Skipping `_next`, the API routes and anything
   * with a file extension keeps this off the hot path for hashed assets, images and
   * the sitemap, which have no consent banner to inform.
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.[\\w]+$).*)"],
};
