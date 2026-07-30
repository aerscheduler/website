import type { MetadataRoute } from "next";
import { FEATURE_LIST } from "@/lib/features";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.95, changeFrequency: "monthly" },
    { path: "/features", priority: 0.95, changeFrequency: "monthly" },
    { path: "/product", priority: 0.9, changeFrequency: "monthly" },
    { path: "/app", priority: 0.9, changeFrequency: "monthly" },
    { path: "/integrations", priority: 0.85, changeFrequency: "monthly" },
    { path: "/login", priority: 0.85, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.85, changeFrequency: "weekly" },
    { path: "/resources/myfbo-alternative", priority: 0.85, changeFrequency: "monthly" },
    {
      path: "/resources/flight-school-scheduling-software",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      path: "/resources/quickbooks-integration",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    { path: "/compare/flight-schedule-pro", priority: 0.8, changeFrequency: "monthly" },
    { path: "/migrating/my-fbo", priority: 0.85, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "monthly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const featureRoutes: MetadataRoute.Sitemap = FEATURE_LIST.filter(
    (f) => f.slug !== "integrations"
  ).map((f) => ({
    url: `${SITE_URL}/features/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...featureRoutes];
}
