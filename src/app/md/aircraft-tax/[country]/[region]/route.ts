import { ALL_REGIONS, countryOf, getRegion, regionHref, regionMarkdown } from "@/lib/aircraft-tax";
import { SITE_URL } from "@/lib/site";

/** A state's aircraft tax page as Markdown, public at `/aircraft-tax/<country>/<region>.md` (rewrite in next.config.ts). */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_REGIONS.map((r) => ({ country: countryOf(r).slug, region: r.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ country: string; region: string }> }) {
  const { country, region } = await params;
  const r = getRegion(country, region);
  if (!r) return new Response("Not found", { status: 404 });
  return new Response(regionMarkdown(r), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      Link: `<${SITE_URL}${regionHref(r)}>; rel="canonical"`,
    },
  });
}
