import { hubMarkdown } from "@/lib/regulations";
import { SITE_URL } from "@/lib/site";

/** The regulations hub as Markdown, public at `/regulations.md` (rewrite in next.config.ts). */
export const dynamic = "force-static";

export function GET() {
  return new Response(hubMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      Link: `<${SITE_URL}/regulations>; rel="canonical"`,
    },
  });
}
