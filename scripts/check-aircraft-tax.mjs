#!/usr/bin/env node
/**
 * Guards for the aircraft tax pages (/aircraft-tax). Runs in the build.
 *
 * These pages answer questions that cost readers money, so the data has to
 * prove itself: every answer cites a primary source with the exact sentence it
 * rests on, every source was checked within the last 12 months, and an answer
 * with no source must say the state does not clearly publish one. A stale or
 * paraphrased fact fails the build rather than shipping looking authoritative.
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { COUNTRIES, REGIONS, TOPICS } = await import(pathToFileURL(path.join(root, "src/content/aircraft-tax/registry.mjs")).href);

const failures = [];
const fail = (m) => failures.push(m);
const BANNED = new RegExp(`[${String.fromCharCode(0x2014, 0x2015)}]| ${String.fromCharCode(0x2013)} `);
const STATUSES = ["taxable", "exempt", "conditional", "none", "unclear"];
const MAX_AGE_DAYS = 366;
const today = new Date();

for (const c of COUNTRIES) {
  for (const t of TOPICS) {
    if (!c.labels?.[t]) fail(`${c.code}: no label for topic ${t}`);
    if (!c.questions?.[t]?.includes("{region}")) fail(`${c.code}: question for ${t} must name {region}`);
  }
}

const seen = new Set();
for (const r of REGIONS) {
  const where = `${r.country}/${r.slug}`;
  if (seen.has(where)) fail(`${where} appears twice`);
  seen.add(where);
  if (!COUNTRIES.some((c) => c.code === r.country)) fail(`${where}: unknown country`);
  if (!r.summary || r.summary.length < 80) fail(`${where}: summary missing or too short`);
  for (const t of TOPICS) {
    const f = r.facts?.[t];
    if (!f) { fail(`${where}: no answer for ${t}`); continue; }
    if (!STATUSES.includes(f.status)) fail(`${where} ${t}: unknown status ${f.status}`);
    if (!f.answer || f.answer.length < 40) fail(`${where} ${t}: answer missing or too short`);
    if (!f.sources.length && f.status !== "unclear") fail(`${where} ${t}: no source, so the status must be "unclear"`);
    for (const s of f.sources) {
      if (!s.quoteExact) fail(`${where} ${t}: a quote from ${s.title} is a paraphrase; copy the exact sentence`);
      if (!/^https?:\/\//.test(s.url)) fail(`${where} ${t}: source URL ${s.url} is not a link`);
      const age = (today - new Date(`${s.checkedOn}T00:00:00Z`)) / 86_400_000;
      if (!(age >= 0)) fail(`${where} ${t}: checkedOn ${s.checkedOn} is not a past date`);
      else if (age > MAX_AGE_DAYS) fail(`${where} ${t}: ${s.title} was last checked ${s.checkedOn}, over a year ago; recheck it`);
    }
    for (const text of [f.answer, r.summary]) if (BANNED.test(text)) fail(`${where} ${t}: banned dash in "${text.slice(0, 60)}"`);
  }
}

if (failures.length) {
  console.error(`check-aircraft-tax: ${failures.length} problem(s)\n`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`check-aircraft-tax: ok. ${REGIONS.length} regions, every answer sourced or marked unclear.`);
