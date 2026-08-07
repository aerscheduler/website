#!/usr/bin/env node
/**
 * Guards the help documentation against the two ways it silently rots.
 *
 * 1. A registry entry with no MDX file. The route imports by path, so this is a
 *    build failure, but a confusing one, thrown from inside a generated page
 *    rather than pointing at the entry that is wrong.
 * 2. An MDX file with no registry entry. This one is genuinely silent: the file
 *    sits on disk, is never imported, never routed, never in the sitemap, and
 *    nothing anywhere complains. Somebody wrote a page and it was never
 *    published. That has already happened once on this site with a guide that
 *    was live for a week without a sitemap entry.
 *
 * Also checks the things a reader notices and a compiler does not: duplicate
 * slugs, missing screenshot ids, and screenshot specs nothing references.
 *
 * Runs in `npm run build`, beside check-docs-auth.mjs.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(root, "src", "content", "docs");
const registryPath = path.join(root, "src", "lib", "docs.ts");
const screenshotsPath = path.join(root, "src", "lib", "docs-screenshots.ts");

const errors = [];
const warnings = [];

/* -- what the registry claims ------------------------------------------- */

const registrySource = readFileSync(registryPath, "utf8");

/**
 * Evaluate the DOC_SECTIONS literal rather than scanning it with a regex.
 *
 * It was a regex, and the regex was wrong: article entries have the same
 * `slug:` / `title:` shape as section entries, so a lazy match for the next
 * `articles: [` ran straight past them and filed every report article under the
 * training section. The check still "passed" for a single-section registry and
 * started inventing paths like `training/how-reporting-works.mdx` the moment
 * there was more than one. A guard that mis-parses is worse than no guard.
 *
 * The literal is pure data (strings, arrays, objects) with a TypeScript
 * annotation on the declaration, so stripping the annotation leaves valid
 * JavaScript that the engine can parse correctly, trailing commas and all.
 */
const registered = [];
let sections = [];
{
  const match = /export const DOC_SECTIONS\s*:[^=]*=\s*(\[[\s\S]*?\n\]);/.exec(registrySource);
  if (!match) {
    errors.push(
      "Could not find the DOC_SECTIONS literal in src/lib/docs.ts. The registry format changed and this guard no longer understands it. Fix the guard, do not delete it."
    );
  } else {
    try {
      sections = new Function(`"use strict"; return (${match[1]});`)();
    } catch (error) {
      errors.push(`DOC_SECTIONS in src/lib/docs.ts did not evaluate: ${error.message}`);
    }
    for (const section of sections) {
      for (const article of section.articles ?? []) {
        registered.push({ section: section.slug, slug: article.slug, article, sectionRef: section });
      }
    }
  }
}

if (registered.length === 0 && errors.length === 0) {
  errors.push("Parsed zero articles out of src/lib/docs.ts. That is almost certainly a bug in this guard.");
}

// Field-level checks the TypeScript compiler cannot make, because they are about
// whether a human filled the field in usefully, not whether it typechecks.
const KINDS = new Set(["overview", "task", "reference", "troubleshooting"]);
for (const { section, slug, article } of registered) {
  if (!KINDS.has(article.kind)) {
    errors.push(`${section}/${slug} has kind "${article.kind}", which is not a DocKind.`);
  }
  if (!article.description || article.description.length < 20) {
    errors.push(`${section}/${slug} has no usable description. It is the meta description and the nav subtitle.`);
  }
  if (!Array.isArray(article.audience) || article.audience.length === 0) {
    errors.push(`${section}/${slug} lists no audience.`);
  }
}

for (const section of sections) {
  if (!section.articles || section.articles.length === 0) {
    errors.push(`Section "${section.slug}" has no articles, so it renders an empty page in the nav.`);
  }
}

/* -- what is actually on disk ------------------------------------------- */

const onDisk = [];
let sectionDirs = [];
try {
  sectionDirs = readdirSync(contentRoot).filter((entry) =>
    statSync(path.join(contentRoot, entry)).isDirectory()
  );
} catch {
  errors.push(`No content directory at ${path.relative(root, contentRoot)}`);
}

for (const section of sectionDirs) {
  for (const file of readdirSync(path.join(contentRoot, section))) {
    if (!file.endsWith(".mdx")) continue;
    onDisk.push({ section, slug: file.replace(/\.mdx$/, "") });
  }
}

const key = (entry) => `${entry.section}/${entry.slug}`;
const diskKeys = new Set(onDisk.map(key));
const registeredKeys = new Set(registered.map(key));

for (const entry of registered) {
  if (!diskKeys.has(key(entry))) {
    errors.push(
      `Registered in src/lib/docs.ts but has no MDX file: src/content/docs/${key(entry)}.mdx`
    );
  }
}

for (const entry of onDisk) {
  if (!registeredKeys.has(key(entry))) {
    errors.push(
      `src/content/docs/${key(entry)}.mdx exists but is not in DOC_SECTIONS, so it is not routed, not linked, and not in the sitemap.`
    );
  }
}

const seen = new Set();
for (const entry of registered) {
  if (seen.has(key(entry))) errors.push(`Duplicate article slug: ${key(entry)}`);
  seen.add(key(entry));
}

/* -- screenshots -------------------------------------------------------- */

const screenshotSource = readFileSync(screenshotsPath, "utf8");
const declared = new Set(
  [...screenshotSource.matchAll(/^\s{4}id:\s*"([^"]+)"/gm)].map((m) => m[1])
);

const used = new Map();
for (const entry of onDisk) {
  const source = readFileSync(path.join(contentRoot, entry.section, `${entry.slug}.mdx`), "utf8");
  for (const m of source.matchAll(/<Screenshot\s+id="([^"]+)"/g)) {
    if (!used.has(m[1])) used.set(m[1], []);
    used.get(m[1]).push(key(entry));
  }
}

for (const [id, pages] of used) {
  if (!declared.has(id)) {
    errors.push(
      `Screenshot id "${id}" is used by ${pages.join(", ")} but is not declared in src/lib/docs-screenshots.ts, so those pages render an error frame.`
    );
  }
}

for (const id of declared) {
  if (!used.has(id)) {
    warnings.push(`Screenshot "${id}" is declared but no article uses it.`);
  }
}

/* -- in-product links --------------------------------------------------- */

/**
 * The web console links into these docs from its info tooltips. Those links
 * live in a different git repo, so nothing on either side notices when an
 * article is renamed and every hint in the product starts landing on a 404.
 *
 * This build knows which articles exist, so it is the right place to check.
 * The console sits beside this repo on disk; if it is not there (CI, a fresh
 * clone), the check is skipped rather than failed, since it cannot be verified.
 */
const consoleLinksPath = path.join(root, "..", "web", "src", "lib", "docs-links.ts");
if (existsSync(consoleLinksPath)) {
  const source = readFileSync(consoleLinksPath, "utf8");
  const hrefs = [...source.matchAll(/^\s*href:\s*"([^"]+)"/gm)].map((m) => m[1]);
  const known = new Set(registered.map(key));
  let checked = 0;

  for (const href of hrefs) {
    const normalized = href.replace(/^\/+/, "").replace(/^docs\//, "");
    checked += 1;
    if (!known.has(normalized)) {
      errors.push(
        `The web console links to /docs/${normalized} (web/src/lib/docs-links.ts) but no such article exists. That tooltip sends users to a 404.`
      );
    }
  }
  if (checked > 0) console.log(`  ok    ${checked} in-product docs links resolve`);
}

/* -- report ------------------------------------------------------------- */

for (const warning of warnings) console.warn(`  warn  ${warning}`);

if (errors.length > 0) {
  console.error("\nDocumentation check failed:\n");
  for (const error of errors) console.error(`  •  ${error}`);
  console.error("");
  process.exit(1);
}

console.log(
  `  ok    docs: ${registered.length} articles across ${sectionDirs.length} sections, ${declared.size} screenshots declared`
);
