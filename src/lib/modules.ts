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

/**
 * The photograph behind a module's statement band.
 *
 * Photography earns its place on these pages for one reason: the pages are long,
 * and a reader scrolling through five card grids in a row stops reading. A
 * full-bleed image is a breath, and it is the only thing on the page that is not
 * asking to be read.
 *
 * All of them are from Pexels, whose licence allows commercial use with no
 * attribution required. They live in `public/photos` rather than being hotlinked
 * so the pages do not depend on somebody else's CDN staying up, and every one is
 * general aviation rather than an airliner, because a school owner can tell the
 * difference in about a tenth of a second.
 */
export type ModulePhoto = {
  /** Path under /public. */
  src: string;
  /** Describes the photograph, not the module. It is decorative but not hidden. */
  alt: string;
};

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
  /** Shared by the hub and its supporting pages, so a module reads as one thing. */
  photo: ModulePhoto;
};

/** For the three cross-cutting pages, which belong to no module. */
export const DEFAULT_PHOTO: ModulePhoto = {
  src: "/photos/billing-cessna.jpg",
  alt: "A Cessna 172 parked on a mountain airstrip",
};

export const MODULES: ProductModule[] = [
  {
    slug: "scheduling",
    title: "Scheduling",
    tagline: "Fill the board, keep it conflict-free, close every flight out.",
    hub: "scheduling",
    supporting: ["self-booking", "fleet", "compliance"],
    docsSection: "scheduling",
    photo: {
      src: "/photos/scheduling-ramp.jpg",
      alt: "A single-engine aircraft parked on the ramp in front of the hangars",
    },
  },
  {
    slug: "billing",
    title: "Billing",
    tagline: "Turn a closed-out flight into money, without a second system.",
    hub: "billing",
    supporting: ["memberships"],
    docsSection: "billing",
    photo: {
      src: "/photos/billing-cessna.jpg",
      alt: "A Cessna 172 parked on a mountain airstrip",
    },
  },
  {
    slug: "training",
    title: "Training",
    tagline: "The syllabus, the hours and the endorsements on one record.",
    hub: "training",
    supporting: ["instruction"],
    docsSection: "training",
    photo: {
      src: "/photos/training-preflight.jpg",
      alt: "An instructor and a student talking beside a light aircraft in a hangar",
    },
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    tagline: "Nothing unairworthy leaves the ramp, and nobody has to remember why.",
    hub: "maintenance",
    supporting: ["inspections"],
    docsSection: "maintenance",
    photo: {
      src: "/photos/maintenance-hangar.jpg",
      alt: "An aircraft engine and propeller under work in a hangar",
    },
  },
  {
    slug: "reporting",
    title: "Reporting",
    tagline: "What the fleet earned, what it flew, and what is still owed.",
    hub: "reports",
    supporting: ["utilization"],
    docsSection: "reports",
    photo: {
      src: "/photos/reporting-panel.jpg",
      alt: "A pilot at the controls with the instrument panel lit",
    },
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
