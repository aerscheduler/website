import { getGuide, guideHref } from "@/lib/aircraft-guides";
import { guideMarkdown } from "@/lib/library-markdown";
import { SITE_URL } from "@/lib/site";

/** An ownership guide as Markdown, public at `/aircraft/<model>.md` (rewrite in next.config.ts). */
export const revalidate = 86400;

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = await getGuide(slug);
  if (!g) return new Response("Not found", { status: 404 });
  return new Response(guideMarkdown(g), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Content-Type-Options": "nosniff", Link: `<${SITE_URL}${guideHref(g.slug)}>; rel="canonical"` },
  });
}
