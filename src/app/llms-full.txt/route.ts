import { llmsFullTxt } from "@/lib/llms";

/**
 * `/llms-full.txt`: everything in `/llms.txt` in full, then every help article
 * as Markdown, ordered so a reader that truncates still keeps the facts first.
 * Generated at build time (`lib/llms.ts`); `scripts/check-llms.mjs` caps its size.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
