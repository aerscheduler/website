import { API_BASE_URL, getTagDocs, endpointCount } from "@/lib/openapi";
import type { ResourceLink } from "@/lib/resources";


/**
 * Developer-facing links, shared by the Features menu, the Resources menu, and
 * the footer, so the API is reachable from the nav in more than one plausible
 * place: somebody looking for it will try "Resources" or "Developers" first,
 * and it costs nothing to be in both.
 *
 * Kept separate from FEATURES because the API is not a feature detail page: it
 * has its own route tree under /docs/api rather than /features/[slug].
 */
export const DEVELOPER_LINKS: ResourceLink[] = [
  {
    href: "/docs/api",
    label: "API documentation",
    description: `${endpointCount()} REST endpoints. Included on every plan.`,
  },
  {
    href: "/docs/api/reservations",
    label: "Scheduling API",
    description: "Book, reschedule, and close out flights.",
  },
  {
    href: "/docs/api/reports",
    label: "Reporting API",
    description: "Pull utilization and revenue into your own tools.",
  },
  {
    href: `${API_BASE_URL}/openapi.json`,
    label: "OpenAPI spec",
    description: "Machine-readable 3.1 document for SDK generation.",
  },
];

/** Every reference page, for the sitemap and the docs index. */
export const apiDocRoutes = (): string[] => [
  "/docs/api",
  ...getTagDocs().map((tag) => `/docs/api/${tag.slug}`),
];
