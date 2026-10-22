import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { AD_CACHE_TAG } from "@/lib/ad-library";

/**
 * POST /api/revalidate, called by the API (server/src/services/siteRevalidate.ts) when the
 * AD library's data changes. Marks every page built from it stale: the next visit to each is
 * served the old copy while a fresh one builds, so nothing rebuilds that nobody asks for.
 *
 * Bearer SITE_REVALIDATE_SECRET, the same value on Vercel and on the API box. Without it set,
 * every call is refused.
 */
const TAGS = new Set([AD_CACHE_TAG]);

function authorized(header: string | null) {
  const secret = process.env.SITE_REVALIDATE_SECRET;
  if (!secret || !header?.startsWith("Bearer ")) return false;
  const given = Buffer.from(header.slice(7));
  const want = Buffer.from(secret);
  return given.length === want.length && timingSafeEqual(given, want);
}

export async function POST(request: Request) {
  if (!authorized(request.headers.get("authorization"))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { tag?: unknown } | null;
  const tag = typeof body?.tag === "string" ? body.tag : AD_CACHE_TAG;
  if (!TAGS.has(tag)) return Response.json({ error: `Unknown tag: ${tag}` }, { status: 400 });
  revalidateTag(tag, "max");
  return Response.json({ revalidated: tag, at: new Date().toISOString() });
}
