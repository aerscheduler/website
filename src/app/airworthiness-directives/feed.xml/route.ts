import { AD_BASE, adAbout, adHref, adTitle, getRecent } from "@/lib/ad-library";
import { SITE_URL } from "@/lib/site";

/** RSS 2.0: the newest ADs, including those on public inspection, refreshed as they arrive. */
export const revalidate = 604800; // A week; the API refreshes it the moment ADs change (AD_CACHE_TAG in lib/ad-library.ts).

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const ads = (await getRecent(30)).slice(0, 100);
  const items = ads
    .map((a) => {
      const link = `${SITE_URL}${adHref(a.adNumber)}`;
      const when = new Date(a.publishedOn).toUTCString();
      const title = `${a.onPublicInspection ? "[Public inspection] " : ""}AD ${a.adNumber}: ${adTitle(a.title).trim()}`;
      return `    <item>
      <title>${esc(title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      <pubDate>${when}</pubDate>
      <description>${esc([a.requires ? `${a.requires}.` : `${adAbout(a)}.`, a.supersedes.length ? `Supersedes AD ${a.supersedes.join(", AD ")}.` : ""].filter(Boolean).join(" "))}</description>
    </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>New FAA Airworthiness Directives (AerScheduler AD library)</title>
    <link>${SITE_URL}${AD_BASE}/new</link>
    <atom:link href="${SITE_URL}${AD_BASE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Airworthiness Directives as the FAA files them, checked against the Federal Register every hour.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=900" } });
}
