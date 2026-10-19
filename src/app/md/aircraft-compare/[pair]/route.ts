import { compareHref, parsePair } from "@/lib/aircraft-compare";
import { getGuide } from "@/lib/aircraft-guides";
import { compareMarkdown } from "@/lib/library-markdown";
import { SITE_URL } from "@/lib/site";

/** A comparison as Markdown, public at `/aircraft/compare/<a>-vs-<b>.md` (rewrite in next.config.ts). */
export const revalidate = 86400;

export async function GET(_request: Request, { params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  const p = parsePair(pair);
  const [a, b] = p ? await Promise.all([getGuide(p[0]), getGuide(p[1])]) : [null, null];
  if (!p || !a || !b) return new Response("Not found", { status: 404 });
  return new Response(compareMarkdown(a, b), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Content-Type-Options": "nosniff", Link: `<${SITE_URL}${compareHref(p[0], p[1])}>; rel="canonical"` },
  });
}
