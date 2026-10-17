import { llmsTxt } from "@/lib/llms";

/**
 * `/llms.txt`, the llmstxt.org index for AI assistants: what AerScheduler is,
 * the facts a buyer asks for, and links to every feature, comparison and help
 * article. Generated at build time from the site's registries (`lib/llms.ts`).
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
