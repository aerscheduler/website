#!/usr/bin/env node
/**
 * Guards for the plain-English regulations library (/regulations). Runs in the
 * build command before `next build`.
 *
 * The one that matters most: every summary records the hash of the official
 * text it was written against (`textHash`), and that must equal the hash in the
 * current snapshot (`src/content/regulations/ecfr.json`). When the weekly sync
 * pulls an amended section, the hashes stop matching and the build fails until
 * someone rereads the new text and updates the summary. A plain-English page
 * that quietly describes last year's rule is the failure this library cannot
 * afford, because the page looks just as authoritative either way.
 *
 * Also checked: every registry entry has text and exactly one summary, every
 * cited paragraph exists, every related cite resolves, descriptions fit a
 * search snippet, and no banned dash reached the copy.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = (p) => import(pathToFileURL(path.join(root, p)).href);
const { REGULATIONS, TOPICS, PARTS } = await load("src/content/regulations/registry.mjs");
const { SUMMARIES } = await load("src/content/regulations/sections/index.mjs");
const ecfr = JSON.parse(readFileSync(path.join(root, "src/content/regulations/ecfr.json"), "utf8"));

const failures = [];
const fail = (m) => failures.push(m);
// Long dashes, plus a spaced en dash: the house style bans both.
const BANNED = new RegExp(`[${String.fromCharCode(0x2014, 0x2015)}]| ${String.fromCharCode(0x2013)} `);

const cites = new Set(REGULATIONS.map((r) => r.cite));
const slugs = new Set();
for (const r of REGULATIONS) {
  if (slugs.has(r.slug)) fail(`registry: duplicate slug ${r.slug}`);
  slugs.add(r.slug);
  if (!TOPICS.some((t) => t.slug === r.topic)) fail(`registry: ${r.cite} has unknown topic ${r.topic}`);
  if (!PARTS.some((p) => p.part === r.part)) fail(`registry: ${r.cite} has unknown part ${r.part}`);
  if (!ecfr.sections[r.cite]) fail(`${r.cite} has no official text. Run: node scripts/sync-ecfr.mjs ${r.cite}`);
}

const seen = new Map();
for (const s of SUMMARIES) {
  if (seen.has(s.cite)) fail(`summary for ${s.cite} appears twice`);
  seen.set(s.cite, s);
  if (!cites.has(s.cite)) fail(`summary for ${s.cite}, which is not in registry.mjs`);
}
for (const r of REGULATIONS) if (!seen.has(r.cite)) fail(`${r.cite} has no plain-English summary in src/content/regulations/sections/`);

for (const s of SUMMARIES) {
  const text = ecfr.sections[s.cite];
  if (!text) continue;
  const where = `${s.cite}:`;

  if (s.textHash !== text.hash) {
    fail(
      `${where} the official text changed (summary written against ${s.textHash}, snapshot is ${text.hash}). Reread the summary against the new text on the page, fix anything it now gets wrong, then set textHash to "${text.hash}".`
    );
  }

  const ids = text.blocks.filter((b) => b.type === "para").map((b) => b.id);
  for (const p of s.points) {
    if (!p.para) {
      // Allowed for a section with no lettered paragraphs, or one that opens with
      // unlettered lead-in text (91.103) that the point is about.
      if (ids.length && text.blocks[0]?.type !== "text") fail(`${where} a point cites no paragraph, but the section has lettered paragraphs: "${p.text.slice(0, 60)}"`);
      continue;
    }
    if (!ids.includes(p.para) && !ids.some((id) => id.startsWith(`${p.para}-`))) {
      fail(`${where} a point cites (${p.para.split("-").join(")(")}), which is not in the official text`);
    }
  }
  if (s.points.length < 2) fail(`${where} needs at least 2 points`);
  if (s.faqs.length < 1) fail(`${where} needs at least 1 question`);

  if (!s.description) fail(`${where} has no description`);
  else if (s.description.length > 160) fail(`${where} description is ${s.description.length} characters; keep it to 160 so search shows all of it`);
  if (!s.answer || s.answer.length < 60) fail(`${where} the answer is missing or too short to answer anything`);

  for (const c of s.related) {
    if (c === s.cite) fail(`${where} lists itself as related`);
    else if (!cites.has(c)) fail(`${where} related cite ${c} is not in the library`);
  }
  for (const l of s.links ?? []) if (!l.href.startsWith("/")) fail(`${where} link ${l.href} must be a site path`);
  if (s.product && !s.product.href.startsWith("/features/")) fail(`${where} product line must link to a feature page`);

  const copy = [s.description, s.answer, ...s.points.map((p) => p.text), ...s.faqs.flatMap((f) => [f.q, f.a]), s.product?.text ?? ""];
  for (const c of copy) if (BANNED.test(c)) fail(`${where} banned dash in "${c.slice(0, 60)}"`);
}

if (failures.length) {
  console.error(`check-regulations: ${failures.length} problem(s)\n`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`check-regulations: ok. ${SUMMARIES.length} summaries match the eCFR text as of ${ecfr.upToDateAsOf}.`);
