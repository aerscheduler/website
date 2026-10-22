import { adHref, getAd } from "@/lib/ad-library";
import { adMarkdown } from "@/lib/library-markdown";
import { SITE_URL } from "@/lib/site";

/** One AD as Markdown, public at `/airworthiness-directives/<number>.md` (rewrite in next.config.ts). */
export const revalidate = 604800; // A week; the API refreshes it the moment ADs change (AD_CACHE_TAG in lib/ad-library.ts).

export async function GET(_request: Request, { params }: { params: Promise<{ adNumber: string }> }) {
  const { adNumber } = await params;
  const ad = await getAd(decodeURIComponent(adNumber));
  if (!ad) return new Response("Not found", { status: 404 });
  return new Response(adMarkdown(ad), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Content-Type-Options": "nosniff", Link: `<${SITE_URL}${adHref(ad.adNumber)}>; rel="canonical"` },
  });
}
