import { getArticle } from "@/lib/docs";
import { articleMarkdown, markdownArticles } from "@/lib/llms";
import { SITE_URL } from "@/lib/site";

/**
 * One help article as plain Markdown. Public at `/docs/<section>/<slug>.md`
 * through the `beforeFiles` rewrite in `next.config.ts` (App Router cannot name a
 * dynamic segment `[slug].md`). Every article is prerendered here, and nothing
 * else: `dynamicParams = false` means an unknown path is a 404, never a request-
 * time read of `src/content`, which does not exist on the server.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return markdownArticles().map(({ section, article }) => ({ section: section.slug, slug: article.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ section: string; slug: string }> }) {
  const { section: sectionSlug, slug } = await params;
  const found = getArticle(sectionSlug, slug);
  if (!found) return new Response("Not found", { status: 404 });
  return new Response(articleMarkdown(found.section, found.article), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      // The HTML article is the page to index and cite; this is its plain twin.
      Link: `<${SITE_URL}/docs/${sectionSlug}/${slug}>; rel="canonical"`,
    },
  });
}
