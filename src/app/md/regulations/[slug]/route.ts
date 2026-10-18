import { PARTS_WITH_PAGES, REGS, getPart, getReg, partMarkdown, partSlug, regMarkdown } from "@/lib/regulations";
import { SITE_URL } from "@/lib/site";

/**
 * A regulation page, or a Part's index, as plain Markdown. Public at
 * `/regulations/<slug>.md` through the `beforeFiles` rewrite in
 * `next.config.ts`, the same arrangement as the help articles' twins. Every one
 * is prerendered; an unknown slug is a 404.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [...REGS.map((r) => ({ slug: r.slug })), ...PARTS_WITH_PAGES.map((p) => ({ slug: partSlug(p.part) }))];
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const reg = getReg(slug);
  const part = reg ? undefined : getPart(slug);
  const body = reg ? regMarkdown(reg) : part ? partMarkdown(part) : null;
  if (!body) return new Response("Not found", { status: 404 });
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      // The HTML page is the one to index and cite; this is its plain twin.
      Link: `<${SITE_URL}/regulations/${slug}>; rel="canonical"`,
    },
  });
}
