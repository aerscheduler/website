import type { MetadataRoute } from "next";
import { AD_BASE, getMonths, getSitemap, pageHref } from "@/lib/ad-library";
import { SITE_URL } from "@/lib/site";

/**
 * The AD library's own sitemap (/airworthiness-directives/sitemap.xml), separate from the
 * site's: about 14,000 addresses that change hourly, read from the API. An AD whose layout could
 * not be read is left out, as its page is noindex.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [data, months] = await Promise.all([getSitemap(), getMonths()]);
  const now = new Date();
  const hubs = ["", "/new", "/aircraft", "/engines", "/propellers", "/appliances", "/monthly", "/data"].map((p) => ({
    url: `${SITE_URL}${AD_BASE}${p}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: p === "" ? 0.9 : 0.75,
  }));
  if (!data) return hubs;
  return [
    ...hubs,
    ...data.pages.map((p) => ({ url: `${SITE_URL}${pageHref(p.kind, p.slug)}`, lastModified: new Date(p.updatedAt), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...months.map((m) => ({ url: `${SITE_URL}${AD_BASE}/monthly/${m.month}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...data.ads.filter((a) => a.readable).map((a) => ({ url: `${SITE_URL}${AD_BASE}/${a.adNumber}`, lastModified: new Date(a.updatedAt), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
