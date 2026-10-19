import type { MetadataRoute } from "next";
import { getGuides, GUIDE_BASE, guideHref } from "@/lib/aircraft-guides";
import { COMPARE_BASE, compareHref, PAIRS } from "@/lib/aircraft-compare";
import { SITE_URL } from "@/lib/site";

/** The ownership guides' own sitemap (/aircraft/sitemap.xml): read from the API, so not in the site's static one. */
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getGuides();
  const now = new Date();
  return [
    { url: `${SITE_URL}${GUIDE_BASE}`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    ...guides.map((g) => ({ url: `${SITE_URL}${guideHref(g.slug)}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.75 })),
    { url: `${SITE_URL}${COMPARE_BASE}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...PAIRS.filter(([a, b]) => guides.some((g) => g.slug === a) && guides.some((g) => g.slug === b)).map(([a, b]) => ({ url: `${SITE_URL}${compareHref(a, b)}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.75 })),
  ];
}
