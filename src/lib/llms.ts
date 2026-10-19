import { readFileSync } from "node:fs";
import path from "node:path";
import { COMPETITOR_FAQS, COMPETITOR_LIST, competitorHref } from "@/lib/competitors";
import { allArticles, DOC_SECTIONS, type DocArticle, type DocSection } from "@/lib/docs";
import { resolveRelated } from "@/lib/docs-related";
import { getScreenshot, screenshotExists, screenshotSrc } from "@/lib/docs-screenshots";
import { FEATURE_LANDING } from "@/lib/feature-landing";
import { FEATURES, featureHref, type FeatureSlug } from "@/lib/features";
import { CROSS_CUTTING, MODULES } from "@/lib/modules";
import { AUDIENCES } from "@/lib/audiences";
import { API_BASE_URL, getTagDocs } from "@/lib/openapi";
import { REG_BASE, REGS, TEXT_AS_OF, regHref, regTitle } from "@/lib/regulations";
import { ALL_REGIONS, PUBLISHED as TAX_PUBLISHED, TAX_BASE, regionHref } from "@/lib/aircraft-tax";
import { RESOURCE_GROUPS } from "@/lib/resources";
import { PRICING_FAQS } from "@/lib/seo";
import {
  APP_STORE_URL,
  APP_URL,
  BOOK_DEMO_PATH,
  DEMO_URL,
  ENTERPRISE_FEATURES,
  PLAY_STORE_URL,
  PRICE_PER_AIRCRAFT,
  SIGNUP_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
  TRIAL_DAYS,
} from "@/lib/site";
// Plain ESM shared with scripts/check-llms.mjs and the unit tests.
import { assertCleanMarkdown, mdxToMarkdown } from "@/lib/mdx-markdown.mjs";

/*
 * AI-readable versions of the site (built 2026-10-16): `/llms.txt` (the
 * llmstxt.org index), `/llms-full.txt` (everything in one file) and one
 * Markdown file per help article at `/docs/<section>/<slug>.md`.
 *
 * NOTHING IS WRITTEN TWICE. Lists come from the registries the pages render
 * from (docs, features, modules, competitors, audiences, pricing FAQs, the
 * OpenAPI tags) and every number from the constants in `lib/site.ts`, so a new
 * article, feature, competitor, audience or price change appears here on the
 * next build with no edit. The few sentences written here (the one-paragraph
 * description in `header()`, the inclusions in `keyFacts()`, the API plan line)
 * restate facts the pricing page already makes; change them together.
 * `scripts/check-llms.mjs` fails the build when an output leaves something out,
 * links to a route that does not exist, or states a price or trial length that
 * disagrees with the constants.
 *
 * Server-only: reads MDX from disk at build time (the routes are force-static).
 */

const DOCS_ROOT = path.join(process.cwd(), "src", "content", "docs");

/** Absolute URL for a site path. */
const abs = (href: string) => (href.startsWith("http") ? href : `${SITE_URL}${href}`);

/** The Markdown URL of a help article's page. */
export function markdownUrl(href: string): string {
  return `${abs(href)}.md`;
}

/** One line of a link list, llms.txt style. */
const item = (title: string, href: string, description?: string) =>
  `- [${title}](${href})${description ? `: ${oneLine(description)}` : ""}`;

const oneLine = (text: string) => text.replace(/\s+/g, " ").trim();

/**
 * Text from the OpenAPI spec, synced from production at build time. Its tag
 * descriptions carry " , " where em dashes were once stripped; tidy that, and
 * never let an upstream dash fail the marketing build.
 */
const apiText = (text: string) =>
  oneLine(text)
    .replace(/[\u2014\u2015]/g, ",") // em-dash-ok
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ",");

const API_PLAN = "The public REST API, on the Enterprise plan.";

/* ------------------------------------------------------------------ */
/* One help article as Markdown                                        */
/* ------------------------------------------------------------------ */

/**
 * @param headingOffset 0 for the article's own `.md` file (title is the H1);
 *   2 inside llms-full.txt, where the title is an H3 under its section.
 */
export function articleMarkdown(section: DocSection, article: DocArticle, headingOffset = 0): string {
  const href = `/docs/${section.slug}/${article.slug}`;
  const file = `src/content/docs/${section.slug}/${article.slug}.mdx`;
  const source = readFileSync(path.join(DOCS_ROOT, section.slug, `${article.slug}.mdx`), "utf8");
  const body = mdxToMarkdown(source, {
    file,
    pageUrl: abs(href),
    siteUrl: SITE_URL,
    headingOffset,
    resolveScreenshot: (id) => {
      const spec = getScreenshot(id);
      if (!spec) return undefined;
      if (!screenshotExists(id)) return null;
      return { alt: spec.alt, caption: spec.caption, src: screenshotSrc(id) };
    },
  });

  const h = (depth: number) => "#".repeat(Math.min(6, depth + headingOffset));
  const out: string[] = [
    `${h(1)} ${article.title}`,
    "",
    `> ${oneLine(article.description)}`,
    "",
    `Source: ${abs(href)}`,
    `Section: ${section.title}. For: ${article.audience.join(", ")}.`,
    "",
    body.trim(),
  ];

  if (article.faqs?.length) {
    out.push("", `${h(2)} Common questions`, "");
    for (const faq of article.faqs) out.push(`**${oneLine(faq.q)}**`, "", oneLine(faq.a), "");
  }
  const related = resolveRelated(article);
  if (related.length) {
    out.push("", `${h(2)} Related`, "");
    for (const link of related) out.push(item(link.label, abs(link.href), link.description));
  }

  const text = out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  assertCleanMarkdown(text, href);
  return text;
}

/* ------------------------------------------------------------------ */
/* Shared blocks                                                       */
/* ------------------------------------------------------------------ */

function header(): string[] {
  const modules = MODULES.map((m) => m.title.toLowerCase());
  const moduleList = `${modules.slice(0, -1).join(", ")} and ${modules[modules.length - 1]}`;
  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `${SITE_NAME} runs ${moduleList} for flight schools, flying clubs, aircraft rental operations and maintenance shops, in one system: a web console at ${APP_URL} and native iOS and Android apps for students, renters, instructors and mechanics.`,
  ];
}

function keyFacts(): string[] {
  const live = ENTERPRISE_FEATURES.filter((f) => !f.soon).map((f) => f.title);
  const soon = ENTERPRISE_FEATURES.filter((f) => f.soon).map((f) => f.title);
  return [
    "Key facts:",
    "",
    `- Price: $${PRICE_PER_AIRCRAFT} per aircraft per month, self-serve, with every instructor, student and renter included and simulators and classrooms free: [Pricing](${abs("/pricing")})`,
    `- Free trial: ${TRIAL_DAYS} days: [Start a trial](${SIGNUP_URL})`,
    `- Live demo, no signup: [Open the demo](${DEMO_URL})`,
    `- Apps: [iOS](${APP_STORE_URL}), [Android](${PLAY_STORE_URL}), [Web console](${APP_URL})`,
    `- Enterprise, quoted per account: ${live.join(", ")}${soon.length ? `. Coming: ${soon.join(", ")}` : ""}`,
    `- Who it is for: ${AUDIENCES.map((a) => `[${a.title}](${abs(a.href)})`).join(", ")}`,
    `- Support: ${SUPPORT_EMAIL}. [Book a call](${abs(BOOK_DEMO_PATH)})`,
  ];
}

/** Features in the order the site presents them: each module's hub, then its supporting pages, then the cross-cutting ones. */
function featureOrder(): FeatureSlug[] {
  const order: FeatureSlug[] = [];
  for (const m of MODULES) for (const slug of [m.hub, ...m.supporting]) if (!order.includes(slug)) order.push(slug);
  for (const slug of CROSS_CUTTING) if (!order.includes(slug)) order.push(slug);
  for (const slug of Object.keys(FEATURES) as FeatureSlug[]) if (!order.includes(slug)) order.push(slug);
  return order;
}

/** Guides worth listing: everything in RESOURCE_GROUPS that is not docs, help articles or comparisons, once each. */
function guides(): { href: string; label: string; description: string }[] {
  const seen = new Set<string>();
  const out: { href: string; label: string; description: string }[] = [];
  for (const group of RESOURCE_GROUPS) {
    if (/documentation|help articles|compare|switching|developers/i.test(group.title)) continue;
    for (const link of group.items) {
      if (link.href.startsWith("/docs") || link.href.startsWith("/compare") || seen.has(link.href)) continue;
      seen.add(link.href);
      out.push(link);
    }
  }
  return out;
}

const isPrimaryDoc = (article: DocArticle) => article.kind === "overview" || article.kind === "reference";

/**
 * The regulations library in llms.txt: the hub, then every section's Markdown
 * twin with its one-line answer. Its first four lines (heading, blank, intro,
 * blank) open the same section in llms-full.txt.
 */
function regulationsIndex(): string[] {
  return [
    "## FAA regulations in plain English",
    "",
    `${item("Regulations hub", abs(REG_BASE), `The ${REGS.length} sections of 14 CFR owners, flight schools and pilots look up most, each explained beside the official eCFR text (current as of ${TEXT_AS_OF}).`)}`,
    "",
    ...REGS.map((r) => item(regTitle(r), markdownUrl(regHref(r.slug)), r.summary.answer)),
  ];
}

/** Aircraft tax by state in llms.txt, once published: each state's Markdown twin and summary. */
function aircraftTaxIndex(): string[] {
  if (!TAX_PUBLISHED) return [];
  return [
    "## Aircraft tax by state",
    "",
    item("Aircraft tax hub", abs(TAX_BASE), "Sales and use tax, rentals, flight instruction, maintenance and yearly taxes by state, each answer quoted from the state's own source."),
    "",
    ...ALL_REGIONS.map((r) => item(`${r.name} aircraft tax`, markdownUrl(regionHref(r)), r.summary)),
    "",
  ];
}

/* ------------------------------------------------------------------ */
/* /llms.txt                                                           */
/* ------------------------------------------------------------------ */

export function llmsTxt(): string {
  const out: string[] = [
    ...header(),
    "",
    `Everything on this page in one file, with every help article in full: [llms-full.txt](${abs("/llms-full.txt")})`,
    "",
    ...keyFacts(),
    "",
    "Pricing questions:",
    "",
    ...PRICING_FAQS.map((f) => `- **${oneLine(f.q)}** ${oneLine(f.a)}`),
    "",
    "## Features",
    "",
    ...featureOrder().map((slug) => item(FEATURES[slug].title, abs(featureHref(slug)), FEATURES[slug].summary)),
    "",
    "## Comparisons",
    "",
    ...COMPETITOR_LIST.map((c) => item(`${SITE_NAME} vs ${c.name}`, abs(competitorHref(c.slug)), c.seoDescription)),
  ];

  for (const section of DOC_SECTIONS) {
    out.push("", `## Docs: ${section.title}`, "", item(`${section.title} docs`, abs(`/docs/${section.slug}`), section.blurb));
    for (const article of section.articles.filter(isPrimaryDoc)) {
      out.push(item(article.title, markdownUrl(`/docs/${section.slug}/${article.slug}`), article.description));
    }
  }

  out.push(
    "",
    "## API reference",
    "",
    item("API documentation", abs("/docs/api"), API_PLAN),
    ...getTagDocs().map((tag) => item(tag.name, abs(`/docs/api/${tag.slug}`), apiText(tag.description))),
    item("OpenAPI document", `${API_BASE_URL}/openapi.json`, "Machine-readable description of the API."),
    "",
    "## Guides",
    "",
    ...guides().map((g) => item(g.label, abs(g.href), g.description)),
    "",
    "Every aircraft ownership guide and every page of the AD library reads as Markdown too: add `.md` to its address, as in `/aircraft/<model>.md` or `/airworthiness-directives/<AD number>.md`.",
    "",
    ...regulationsIndex(),
    "",
    ...aircraftTaxIndex(),
    "## Optional",
    ""
  );
  for (const section of DOC_SECTIONS) {
    for (const article of section.articles.filter((a) => !isPrimaryDoc(a))) {
      out.push(item(`${section.title}: ${article.title}`, markdownUrl(`/docs/${section.slug}/${article.slug}`), article.description));
    }
  }
  out.push(
    item("Changelog", abs("/changelog"), "What shipped, by date."),
    item("About", abs("/about"), `Who builds ${SITE_NAME}.`)
  );

  const text = out.join("\n").trim() + "\n";
  assertCleanMarkdown(text, "/llms.txt");
  return text;
}

/* ------------------------------------------------------------------ */
/* /llms-full.txt                                                      */
/* ------------------------------------------------------------------ */

const cell = (text: string) => oneLine(text).replace(/\|/g, "\\|");

export function llmsFullTxt(): string {
  const out: string[] = [...header(), "", ...keyFacts()];

  out.push("", "## Pricing", "");
  for (const f of PRICING_FAQS) out.push(`**${oneLine(f.q)}**`, "", oneLine(f.a), "");
  out.push("### Enterprise", "");
  for (const f of ENTERPRISE_FEATURES) out.push(`- **${f.title}**${f.soon ? " (not yet available)" : ""}: ${oneLine(f.body)}`);

  out.push("", "## Features", "");
  for (const slug of featureOrder()) {
    const f = FEATURES[slug];
    const landing = FEATURE_LANDING[slug];
    out.push(`### ${f.title}`, "", `Page: ${abs(featureHref(slug))}`, "", oneLine(f.summary), "");
    if (landing) out.push(oneLine(landing.statement), "");
    out.push(...f.bullets.map((b) => `- ${oneLine(b)}`), "");
    for (const faq of landing?.faqs ?? []) out.push(`**${oneLine(faq.q)}** ${oneLine(faq.a)}`, "");
  }

  out.push("## Comparisons", "");
  for (const c of COMPETITOR_LIST) {
    out.push(`### ${SITE_NAME} vs ${c.name}`, "", `Page: ${abs(competitorHref(c.slug))}`, "", oneLine(c.seoDescription), "");
    out.push(`| Topic | ${SITE_NAME} | ${cell(c.name)} |`, "| --- | --- | --- |");
    for (const [topic, ours, theirs] of c.rows) out.push(`| ${cell(topic)} | ${cell(ours)} | ${cell(theirs)} |`);
    out.push("", `**${oneLine(c.notFitTitle)}**`, "", ...c.notFit.map((n) => `- ${oneLine(n)}`), "");
    for (const faq of COMPETITOR_FAQS[c.slug] ?? []) out.push(`**${oneLine(faq.q)}** ${oneLine(faq.a)}`, "");
    out.push(`_${oneLine(c.disclaimer)}_`, "");
  }

  out.push("## API reference", "", item("API documentation", abs("/docs/api"), API_PLAN));
  out.push(...getTagDocs().map((tag) => item(tag.name, abs(`/docs/api/${tag.slug}`), apiText(tag.description))));
  out.push(item("OpenAPI document", `${API_BASE_URL}/openapi.json`), "");

  out.push("## Guides", "", ...guides().map((g) => item(g.label, abs(g.href), g.description)), "", "Every aircraft ownership guide and every page of the AD library reads as Markdown too: add `.md` to its address, as in `/aircraft/<model>.md` or `/airworthiness-directives/<AD number>.md`.", "");

  // The regulations library: each section's answer and plain-English points.
  // The official text stays on the pages and their .md twins; repeating 52
  // sections of the CFR here would triple the file for text the eCFR already
  // serves.
  out.push(...regulationsIndex().slice(0, 4), "");
  for (const r of REGS) {
    out.push(`### ${regTitle(r)}`, "", `Page: ${abs(regHref(r.slug))} (Markdown: ${markdownUrl(regHref(r.slug))})`, "", oneLine(r.summary.answer), "");
    out.push(...r.summary.points.map((p) => `- ${oneLine(p.text)}`), "");
    for (const faq of r.summary.faqs) out.push(`**${oneLine(faq.q)}** ${oneLine(faq.a)}`, "");
  }

  for (const { section, article } of groupBySection()) {
    if (article === null) {
      out.push(`## Docs: ${section.title}`, "", oneLine(section.blurb), "");
      continue;
    }
    out.push(articleMarkdown(section, article, 2), "");
  }

  const text = out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  assertCleanMarkdown(text, "/llms-full.txt");
  return text;
}

/** Each section header, then its articles, in registry order. */
function groupBySection(): { section: DocSection; article: DocArticle | null }[] {
  const out: { section: DocSection; article: DocArticle | null }[] = [];
  for (const section of DOC_SECTIONS) {
    out.push({ section, article: null });
    for (const article of section.articles) out.push({ section, article });
  }
  return out;
}

/** Every article, for `generateStaticParams` on the Markdown route. */
export function markdownArticles() {
  return allArticles();
}
