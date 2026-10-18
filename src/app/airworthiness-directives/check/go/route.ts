import { NextResponse, type NextRequest } from "next/server";
import { CHECK_BASE, checkHref, isTailNumber } from "@/lib/ad-library";

/**
 * The N-number form without JavaScript posts here (GET ?n=N172SP): on to the aircraft's check,
 * or back to the tool. Kept off the tool's own page so that page can be prerendered.
 */
export function GET(req: NextRequest) {
  const n = req.nextUrl.searchParams.get("n")?.trim() ?? "";
  return NextResponse.redirect(new URL(n && isTailNumber(n) ? checkHref(n) : CHECK_BASE, req.url), 303);
}
