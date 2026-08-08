#!/usr/bin/env node
/**
 * Builds `public/search-index.json`, the corpus behind site search.
 *
 * Site search is a static file, not a service. Everything a visitor can search
 * is already sitting in this repo: the docs registry, the features record, the
 * OpenAPI document, and the page components themselves. So the index is derived
 * from those at build time and shipped as an asset. No database, no search
 * vendor, no crawl step, and nothing to keep in sync by hand.
 *
 * The thing that makes it stay correct is the GUARD at the bottom: every static
 * route under src/app must produce at least one record, or the build fails. A
 * page that nobody indexed is exactly as invisible as a page that nobody put in
 * the sitemap, and this site has already shipped that bug once (the split
 * billing guide, live for a week, unlisted). "Remember to add it to the index"
 * is not a plan. Failing the build is.
 *
 * Record granularity, and why it varies:
 *
 *   docs      one record per H2, not per page. A 2,000-word reference article
 *             answers a dozen different questions, and a hit should land on the
 *             paragraph that answers yours. The anchors are generated the way
 *             rehype-slug generates them (see slugify), so `#where-hours-come-from`
 *             resolves against the rendered article.
 *   features  one record per feature, from the FEATURES literal.
 *   guides    one record per page: title, description, headings, FAQ. The prose
 *             lives inside JSX rather than MDX, so there is no honest way to
 *             pull body text out of it. See extractFromTsx.
 *   api       one record per tag, from the OpenAPI document.
 *
 * Run: node scripts/build-search-index.mjs   (wired into `npm run build`)
 */

import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appRoot = path.join(root, "src", "app");
const contentRoot = path.join(root, "src", "content", "docs");
const outPath = path.join(root, "public", "search-index.json");

const errors = [];
const records = [];

/**
 * How much body text a record carries.
 *
 * The whole point of splitting docs by heading is that a section is already
 * about one thing, so the text under it is nearly all signal. 1,200 characters
 * covers the great majority of sections whole; the few that run longer lose
 * their tail, which costs a recall edge case and saves the index from doubling.
 */
const MAX_BODY = 1200;

/**
 * How much of an article's own record carries.
 *
 * Its H2 sections are already indexed individually, so repeating the whole
 * article here would store every word of the docs twice and double the download
 * for no extra recall. What this record is FOR is the query that matches the
 * article as a whole ("overnight rentals") rather than one section of it, and
 * the lede answers that. The rest of the article is still searchable, one
 * heading at a time.
 */
const MAX_LEDE = 400;

/* ------------------------------------------------------------------ */
/* Shared text helpers                                                 */
/* ------------------------------------------------------------------ */

/**
 * Mirrors github-slugger, which is what rehype-slug uses.
 *
 * Duplicated from src/lib/docs-toc.ts rather than imported: that file is
 * TypeScript compiled by Next, and this is a plain node script that runs before
 * Next does. If one changes the other has to.
 */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\p{M}\p{Pd} _]/gu, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlug(base, seen) {
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

const collapse = (text) => text.replace(/\s+/g, " ").trim();

/** Trim to a whole word rather than mid-syllable. */
function truncate(text, max = MAX_BODY) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut}...`;
}

/**
 * MDX prose, as plain text.
 *
 * Custom components keep their CHILDREN and lose their tags, which matters more
 * than it sounds. `<Callout>` wraps the warning paragraphs, `<Where>` wraps the
 * literal menu path ("Settings, then Booking preferences"), and `<Step>` wraps
 * the instructions. Stripping those elements whole rather than just their tags
 * would throw away the exact sentences somebody is searching for.
 *
 * Code fences go. A shell sample is not prose, and its tokens (curl, -H,
 * application/json) are common enough across the API docs to blur every result.
 */
function mdxToText(source) {
  return collapse(
    source
      // Import/export lines. MDX allows them at any depth.
      .replace(/^\s*(import|export)\s.+$/gm, " ")
      // Fenced code, including the fence markers.
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/~~~[\s\S]*?~~~/g, " ")
      // Self-closing components carry no prose: <Screenshot id="..." />.
      .replace(/<[A-Za-z][\w.]*\b[^>]*\/>/g, " ")
      // Opening and closing tags, keeping whatever sat between them.
      .replace(/<\/?[A-Za-z][\w.]*\b[^>]*>/g, " ")
      // HTML comments.
      .replace(/<!--[\s\S]*?-->/g, " ")
      // Markdown syntax that is punctuation rather than words.
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
      .replace(/^\s{0,3}>\s?/gm, " ")
      .replace(/^\s*[-*+]\s+/gm, " ")
      .replace(/^\s*\d+\.\s+/gm, " ")
      .replace(/^\s*[-:| ]{3,}\s*$/gm, " ")
      .replace(/\|/g, " ")
  );
}

/**
 * Evaluate an `export const NAME: Type = <literal>;` declaration.
 *
 * Same trick as scripts/check-docs.mjs, and the same reasoning: the literals in
 * these registries are pure data, so stripping the type annotation leaves valid
 * JavaScript. Scanning them with a regex instead is how check-docs.mjs filed
 * every report article under the training section for a while.
 */
function readLiteral(source, name, opener, file) {
  const closer = opener === "[" ? "\\]" : "\\}";
  const pattern = new RegExp(
    `export const ${name}\\s*(?::[^=]*)?=\\s*(\\${opener}[\\s\\S]*?\\n${closer})\\s*;`
  );
  const match = pattern.exec(source);
  if (!match) {
    errors.push(
      `Could not find the ${name} literal in ${file}. The registry format changed and the search index builder no longer understands it. Fix the builder, do not delete it.`
    );
    return null;
  }
  try {
    return new Function(`"use strict"; return (${match[1]});`)();
  } catch (error) {
    errors.push(`${name} in ${file} did not evaluate: ${error.message}`);
    return null;
  }
}

function push(record) {
  records.push(record);
}

/* ------------------------------------------------------------------ */
/* Help documentation                                                  */
/* ------------------------------------------------------------------ */

const docsSource = readFileSync(path.join(root, "src", "lib", "docs.ts"), "utf8");
const sections = readLiteral(docsSource, "DOC_SECTIONS", "[", "src/lib/docs.ts") ?? [];

push({
  id: "docs",
  type: "docs",
  title: "Documentation",
  href: "/docs",
  path: ["Documentation"],
  description: "How to use every part of AerScheduler, step by step.",
  body: sections.map((s) => `${s.title}. ${s.blurb}`).join(" "),
});

for (const section of sections) {
  push({
    id: `docs:${section.slug}`,
    type: "docs",
    title: section.title,
    href: `/docs/${section.slug}`,
    path: ["Documentation"],
    description: section.blurb,
    body: truncate(
      collapse(`${section.intro} ${section.articles.map((a) => a.title).join(". ")}`),
      MAX_LEDE
    ),
  });

  for (const article of section.articles) {
    const file = path.join(contentRoot, section.slug, `${article.slug}.mdx`);
    const href = `/docs/${section.slug}/${article.slug}`;
    if (!existsSync(file)) {
      // check-docs.mjs owns this failure and explains it better. Skip quietly so
      // two guards do not shout the same thing at a reader who has one problem.
      continue;
    }
    const source = readFileSync(file, "utf8");

    // Keywords the registry already carries. `seoQuery` is literally the phrase
    // somebody types, which makes it the single most valuable field here.
    const keywords = [
      article.seoQuery,
      ...(article.keywords ?? []),
      ...(article.audience ?? []),
      article.kind,
    ]
      .filter(Boolean)
      .join(" ");

    // The article itself, so a query matching the lede finds the page rather
    // than an arbitrary section of it.
    push({
      id: `docs:${section.slug}/${article.slug}`,
      type: "docs",
      title: article.title,
      href,
      path: ["Documentation", section.navLabel],
      description: article.description,
      keywords,
      body: truncate(mdxToText(source.split(/^##\s+/m)[0] ?? ""), MAX_LEDE),
    });

    // FAQs live in the registry rather than the MDX, and they are phrased as
    // questions, which is how people search.
    //
    // No `description` on these or on the heading records below: it would be a
    // prefix of `body`, and storing the same sentence twice across a thousand
    // records is most of a megabyte. The UI shows the head of `body` when a
    // record has no description of its own.
    for (const [index, faq] of (article.faqs ?? []).entries()) {
      push({
        id: `docs:${section.slug}/${article.slug}#faq-${index}`,
        type: "docs",
        title: faq.q,
        href: `${href}#faq`,
        path: ["Documentation", section.navLabel, article.title],
        body: collapse(faq.a),
      });
    }

    // One record per H2. Anchors match rehype-slug's, so these deep-link.
    for (const heading of splitByHeading(source)) {
      push({
        id: `docs:${section.slug}/${article.slug}#${heading.id}`,
        type: "docs",
        title: heading.text,
        href: `${href}#${heading.id}`,
        path: ["Documentation", section.navLabel, article.title],
        body: truncate(heading.body),
      });
    }
  }
}

/**
 * Split MDX into its H2 sections, with the text under each.
 *
 * H3s stay inside their parent H2 rather than becoming records of their own.
 * Three levels of result for one article turns a search into an outline, and
 * the H2 is the level at which a section is still about one question.
 */
function splitByHeading(source) {
  const lines = source.split("\n");
  const seen = new Map();
  const out = [];
  let current = null;
  let inFence = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      if (current) current.lines.push(line);
      continue;
    }
    if (!inFence) {
      const match = /^##\s+(.+?)\s*$/.exec(line);
      if (match) {
        if (current) out.push(current);
        const text = collapse(mdxToText(match[1]));
        current = { text, id: uniqueSlug(slugify(text), seen), lines: [] };
        continue;
      }
      // An H3 keeps its text as part of the parent section's body.
      if (/^###\s+/.test(line) && current) {
        current.lines.push(line.replace(/^###\s+/, ""));
        continue;
      }
    }
    if (current) current.lines.push(line);
  }
  if (current) out.push(current);

  return out
    .map((entry) => ({ ...entry, body: mdxToText(entry.lines.join("\n")) }))
    .filter((entry) => entry.text.length > 0);
}

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

const featuresSource = readFileSync(path.join(root, "src", "lib", "features.ts"), "utf8");
const features = readLiteral(featuresSource, "FEATURES", "{", "src/lib/features.ts") ?? {};

for (const feature of Object.values(features)) {
  // Mirrors featureHref() in lib/features.ts: integrations has its own page.
  const href = feature.slug === "integrations" ? "/integrations" : `/features/${feature.slug}`;
  push({
    id: `feature:${feature.slug}`,
    type: "feature",
    title: feature.title,
    href,
    path: ["Features"],
    description: feature.summary,
    keywords: [feature.eyebrow, ...(feature.personas ?? [])].join(" "),
    body: collapse(`${feature.headline} ${feature.summary} ${(feature.bullets ?? []).join(". ")}`),
  });
}

/* ------------------------------------------------------------------ */
/* API reference                                                       */
/* ------------------------------------------------------------------ */

const spec = JSON.parse(readFileSync(path.join(root, "src", "content", "openapi.json"), "utf8"));

/** Mirrors slugifyTag() in lib/openapi.ts. */
const slugifyTag = (tag) => tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

push({
  id: "api",
  type: "api",
  title: "API documentation",
  href: "/docs/api",
  path: ["API reference"],
  description: spec.info?.summary ?? "REST API reference.",
  keywords: "api rest openapi developers integration webhook key",
  body: truncate(collapse(String(spec.info?.description ?? ""))),
});

for (const tag of spec.tags ?? []) {
  // Every operation carrying this tag, so "cancel a reservation" finds the
  // Reservations page through the endpoint summary rather than the tag name.
  const operations = [];
  for (const [route, item] of Object.entries(spec.paths ?? {})) {
    for (const [method, op] of Object.entries(item ?? {})) {
      if (!op || typeof op !== "object" || !Array.isArray(op.tags)) continue;
      if (!op.tags.includes(tag.name)) continue;
      operations.push(`${method.toUpperCase()} ${route} ${op.summary ?? ""}`);
    }
  }
  push({
    id: `api:${slugifyTag(tag.name)}`,
    type: "api",
    title: `${tag.name} API`,
    href: `/docs/api/${slugifyTag(tag.name)}`,
    path: ["API reference"],
    description: truncate(collapse(String(tag.description ?? "")), 300),
    keywords: "api endpoint rest",
    body: truncate(collapse(`${tag.description ?? ""} ${operations.join(". ")}`)),
  });
}

/* ------------------------------------------------------------------ */
/* Guides and marketing pages                                          */
/* ------------------------------------------------------------------ */

/**
 * Where each static route files itself in the results, and what it is called
 * when its own metadata title is a search-engine headline rather than a name.
 *
 * A metadata title reads "QuickBooks Online Integration for Flight Schools"
 * because that is what wins the query. In a result list under a heading that
 * already says Guides, it should read "QuickBooks integration".
 */
const PAGE_META = {
  "/": { group: "Pages", title: "Home" },
  // The results page itself. Indexed as a destination so "search" finds it, but
  // it carries no content of its own, which is why it has no metadata body.
  "/search": { group: "Pages", title: "Search" },
  "/pricing": { group: "Pages", title: "Pricing" },
  "/product": { group: "Pages", title: "Product overview" },
  "/features": { group: "Features", title: "All features" },
  "/integrations": { group: "Features", title: "Integrations" },
  "/app": { group: "Pages", title: "iPhone app" },
  "/demo": { group: "Pages", title: "Live demo" },
  "/about": { group: "Pages", title: "About" },
  "/contact": { group: "Pages", title: "Contact" },
  "/login": { group: "Pages", title: "Log in" },
  "/resources": { group: "Guides", title: "All guides" },
  "/privacy": { group: "Pages", title: "Privacy policy" },
  "/terms-and-conditions": { group: "Pages", title: "Terms and conditions" },
  "/migrating/my-fbo": { group: "Guides", title: "Migrating from MyFBO" },
  "/compare/flight-schedule-pro": { group: "Guides", title: "vs Flight Schedule Pro" },
  "/compare/flight-circle": { group: "Guides", title: "vs Flight Circle" },
  "/resources/myfbo-alternative": { group: "Guides", title: "MyFBO alternative" },
  "/resources/flight-school-scheduling-software": { group: "Guides", title: "Scheduling software" },
  "/resources/quickbooks-integration": { group: "Guides", title: "QuickBooks integration" },
  "/resources/split-billing-shared-flights": { group: "Guides", title: "Split billing and shared flights" },
  "/resources/overnight-and-multi-day-rentals": { group: "Guides", title: "Overnight and multi-day rentals" },
  "/resources/flying-club-dues-and-fees": { group: "Guides", title: "Flying club dues and fees" },
  "/resources/flight-training-records": { group: "Guides", title: "Flight training records" },
  "/resources/flight-school-reports": { group: "Guides", title: "Flight school reports" },
  "/resources/aircraft-utilization-report": { group: "Guides", title: "Aircraft utilization" },
  "/resources/flight-school-revenue-reporting": { group: "Guides", title: "Revenue reporting" },
};

/** Constants interpolated into page copy, so `${SITE_NAME}` does not reach the index. */
const SUBSTITUTIONS = (() => {
  const siteSource = readFileSync(path.join(root, "src", "lib", "site.ts"), "utf8");
  const grab = (name, fallback) => {
    const match = new RegExp(`export const ${name}\\s*(?::[^=]*)?=\\s*("[^"]*"|\\d+)`).exec(siteSource);
    if (!match) return fallback;
    return match[1].startsWith('"') ? match[1].slice(1, -1) : match[1];
  };
  return {
    SITE_NAME: grab("SITE_NAME", "AerScheduler"),
    PRICE_PER_AIRCRAFT: grab("PRICE_PER_AIRCRAFT", "20"),
    TRIAL_DAYS: grab("TRIAL_DAYS", "14"),
    SUPPORT_EMAIL: grab("SUPPORT_EMAIL", "support@aerscheduler.com"),
  };
})();

const interpolate = (text) =>
  text
    .replace(/\$\{([A-Za-z_$][\w$]*)\}/g, (whole, name) => SUBSTITUTIONS[name] ?? " ")
    // Anything left is a call or a member expression we cannot resolve.
    .replace(/\$\{[^}]*\}/g, " ");

/**
 * What can honestly be pulled out of a page component.
 *
 * These pages are hand-written JSX, so their prose is interleaved with class
 * names, icon imports, and layout wrappers. Rather than half-parse that and
 * index "flex items-center gap-2", this takes the three places real language
 * lives: the metadata title and description, every h1/h2/h3 whose child is a
 * plain string, and any FAQ array of { q, a } pairs.
 *
 * That is deliberately shallower than the docs treatment. Nobody searches for a
 * sentence from the fourth paragraph of a landing page; they search for its
 * topic, and the topic is in those three places. If deep body search on a guide
 * ever matters, the fix is to move the guide to MDX, not to write a better
 * regex here.
 */
function extractFromTsx(source) {
  const metaBlock = /export const metadata\s*(?::[^=]*)?=\s*\{([\s\S]*?)\n\};/.exec(source)?.[1] ?? "";
  const string = (field, from) => {
    const match = new RegExp(
      `\\b${field}:\\s*(?:"((?:[^"\\\\]|\\\\.)*)"|\`((?:[^\`\\\\]|\\\\.)*)\`)`
    ).exec(from);
    return match ? interpolate(match[1] ?? match[2] ?? "") : "";
  };

  const title = collapse(string("title", metaBlock));
  const description = collapse(string("description", metaBlock));

  const headings = [];
  for (const match of source.matchAll(/<h([123])\b[^>]*>\s*([^<>{}]+?)\s*<\/h\1>/g)) {
    const text = collapse(interpolate(match[2]));
    if (text) headings.push(text);
  }

  const faqs = [];
  for (const match of source.matchAll(
    /\{\s*q:\s*(?:"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)\s*,\s*a:\s*(?:"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)/g
  )) {
    const q = collapse(interpolate(match[1] ?? match[2] ?? ""));
    const a = collapse(interpolate(match[3] ?? match[4] ?? ""));
    if (q) faqs.push({ q, a });
  }

  return { title, description, headings, faqs };
}

/** Every static route with a page.tsx, dynamic segments excluded. */
function staticRoutes(dir = appRoot, prefix = "") {
  const out = [];
  if (existsSync(path.join(dir, "page.tsx"))) out.push(prefix === "" ? "/" : prefix);
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    // [slug] is expanded from a registry above; (group) and _private are not routes.
    if (/^[[(_]/.test(entry)) continue;
    out.push(...staticRoutes(full, `${prefix}/${entry}`));
  }
  return out;
}

const routes = staticRoutes();
const indexedRoutes = new Set(records.map((r) => r.href.split("#")[0]));

for (const route of routes) {
  if (indexedRoutes.has(route)) continue;

  const file = path.join(appRoot, route === "/" ? "" : route, "page.tsx");
  const { title, description, headings, faqs } = extractFromTsx(readFileSync(file, "utf8"));
  const meta = PAGE_META[route];

  if (!meta) {
    errors.push(
      `New route ${route} has no entry in PAGE_META in scripts/build-search-index.mjs. Add one (group plus a short human title) so it is searchable, and add it to sitemap.ts while you are here.`
    );
    continue;
  }
  if (!title && !description) {
    errors.push(
      `${route} has no metadata title or description, so there is nothing to index and nothing for Google either. Add an \`export const metadata\` to src/app${
        route === "/" ? "" : route
      }/page.tsx.`
    );
    continue;
  }

  const type = meta.group === "Guides" ? "guide" : meta.group === "Features" ? "feature" : "page";
  push({
    id: `page:${route}`,
    type,
    title: meta.title,
    href: route,
    path: [meta.group],
    description,
    // The SEO headline is not the display title, but it is exactly the phrase
    // people search, so it belongs in the haystack rather than on the row.
    keywords: title,
    body: truncate(collapse([...headings, ...faqs.map((f) => `${f.q} ${f.a}`)].join(". "))),
  });

  for (const [index, faq] of faqs.entries()) {
    push({
      id: `page:${route}#faq-${index}`,
      type,
      title: faq.q,
      href: `${route}#faq`,
      path: [meta.group, meta.title],
      body: faq.a,
    });
  }
}

/* ------------------------------------------------------------------ */
/* Guards                                                              */
/* ------------------------------------------------------------------ */

// A route producing nothing is the failure this whole script exists to prevent.
for (const route of routes) {
  if (!records.some((r) => r.href.split("#")[0] === route)) {
    errors.push(`Route ${route} produced no search records. It exists and nobody can find it.`);
  }
}

// A stale PAGE_META entry means a page was deleted or moved and the map still
// claims it. Harmless at runtime, but it is how the map rots into fiction.
for (const route of Object.keys(PAGE_META)) {
  if (!routes.includes(route)) {
    errors.push(
      `PAGE_META in scripts/build-search-index.mjs lists ${route}, which has no page.tsx. Remove it.`
    );
  }
}

const seenIds = new Set();
for (const record of records) {
  if (seenIds.has(record.id)) errors.push(`Duplicate search record id: ${record.id}`);
  seenIds.add(record.id);
}

// Sanity floors. If a source silently stops yielding, the index still "builds"
// and search quietly gets worse, which nobody notices for months.
const countOf = (type) => records.filter((r) => r.type === type).length;
if (countOf("docs") < 100)
  errors.push(
    `Only ${countOf("docs")} documentation records. Expected hundreds, so the MDX extraction is probably broken.`
  );
if (countOf("feature") < 10)
  errors.push(`Only ${countOf("feature")} feature records. The FEATURES literal probably did not parse.`);
if (countOf("api") < 5)
  errors.push(`Only ${countOf("api")} API records. The OpenAPI tags probably did not parse.`);

if (errors.length > 0) {
  console.error("\nSearch index build failed:\n");
  for (const error of errors) console.error(`  x ${error}`);
  console.error("");
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* Emit                                                                */
/* ------------------------------------------------------------------ */

// Drop empty fields rather than shipping `"keywords": ""` a few thousand times.
const slim = records.map((record) =>
  Object.fromEntries(
    Object.entries(record).filter(([, value]) =>
      Array.isArray(value) ? value.length > 0 : value !== undefined && value !== ""
    )
  )
);

writeFileSync(outPath, JSON.stringify({ version: 1, records: slim }));

const bytes = statSync(outPath).size;
console.log(
  `search index: ${records.length} records (${countOf("docs")} docs, ${countOf("feature")} feature, ${countOf(
    "guide"
  )} guide, ${countOf("api")} api, ${countOf("page")} page) -> public/search-index.json, ${(
    bytes / 1024
  ).toFixed(0)} KB`
);
