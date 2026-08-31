import { FEATURES, featureHref, type FeatureSlug } from "@/lib/features";

/**
 * The five product modules, which are the spine of the whole site.
 *
 * This is not a marketing invention. The product is sold as five modules, the
 * help documentation is organised into the same five sections
 * (`lib/docs.ts`: scheduling, billing, training, maintenance, reports), and the
 * console's own navigation follows them. Before this registry existed the nav
 * used a fourth taxonomy of its own, "Schedule / Train / Money & MX /
 * Everywhere", so a visitor met one grouping in the menu, a different one in the
 * docs, and a third one once they signed in.
 *
 * Each module has a HUB: the feature page that is that module's landing page and
 * the thing paid traffic points at. The supporting pages under it are narrower
 * commercial pages that link back up.
 *
 * `slug` is the module's identity and matches its `/docs/<section>` slug. It is
 * deliberately allowed to differ from the hub feature's slug: the reporting
 * module's hub page lives at `/features/reports` because that URL is indexed and
 * renaming it would throw away whatever ranking it has.
 */
export type ModuleSlug =
  | "scheduling"
  | "billing"
  | "training"
  | "maintenance"
  | "reporting";

export type ProductModule = {
  slug: ModuleSlug;
  /** Column heading in the mega-menu, and the section heading on /features. */
  title: string;
  /** One line under the hub link. Says what the module is for, not what it has. */
  tagline: string;
  /** The feature page that IS this module's landing page. */
  hub: FeatureSlug;
  /** Narrower pages under the hub, in nav order. Never includes the hub. */
  supporting: FeatureSlug[];
  /** The matching help documentation section, for cross-links. */
  docsSection: string;
};

export const MODULES: ProductModule[] = [
  {
    slug: "scheduling",
    title: "Scheduling",
    tagline: "Fill the board, keep it conflict-free, close every flight out.",
    hub: "scheduling",
    supporting: ["self-booking", "fleet", "compliance"],
    docsSection: "scheduling",
  },
  {
    slug: "billing",
    title: "Billing",
    tagline: "Turn a closed-out flight into money, without a second system.",
    hub: "billing",
    supporting: ["memberships"],
    docsSection: "billing",
  },
  {
    slug: "training",
    title: "Training",
    tagline: "The syllabus, the hours and the endorsements on one record.",
    hub: "training",
    supporting: ["instruction"],
    docsSection: "training",
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    tagline: "Nothing unairworthy leaves the ramp, and nobody has to remember why.",
    hub: "maintenance",
    supporting: ["inspections"],
    docsSection: "maintenance",
  },
  {
    slug: "reporting",
    title: "Reporting",
    tagline: "What the fleet earned, what it flew, and what is still owed.",
    hub: "reports",
    supporting: ["utilization"],
    docsSection: "reports",
  },
];

/**
 * Pages that belong to every module and therefore to none of them.
 *
 * They sit in a strip under the mega-menu's five columns rather than being
 * forced into one of them. The roster gates who can book, who can be billed and
 * who can be graded; the app and the integrations carry all five modules with
 * them. Filing any of the three under a single module would be a lie the nav
 * tells every visitor.
 */
export const CROSS_CUTTING: FeatureSlug[] = [
  "people-roles",
  "mobile",
  "integrations",
];

const MODULE_BY_SLUG = new Map(MODULES.map((module) => [module.slug, module]));

export function getModule(slug: string): ProductModule | undefined {
  return MODULE_BY_SLUG.get(slug as ModuleSlug);
}

/** Hub first, then the supporting pages. The order the nav and /features use. */
export function moduleFeatures(module: ProductModule): FeatureSlug[] {
  return [module.hub, ...module.supporting];
}

/**
 * The module a feature page belongs to, or undefined for a cross-cutting page.
 *
 * Feature pages use this to say which module they are part of and to link across
 * to their siblings, so a visitor who landed deep on /features/self-booking from
 * a search can climb back up to the module rather than bouncing.
 */
export function moduleOf(slug: FeatureSlug): ProductModule | undefined {
  return MODULES.find(
    (module) => module.hub === slug || module.supporting.includes(slug)
  );
}

export function isModuleHub(slug: FeatureSlug): boolean {
  return MODULES.some((module) => module.hub === slug);
}

/** `{ href, label }` for a module's hub, for menus that only need the link. */
export function moduleHubLink(module: ProductModule) {
  return {
    href: featureHref(module.hub),
    label: FEATURES[module.hub].navLabel,
  };
}
