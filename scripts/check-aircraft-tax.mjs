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
const dataRoot = path.join(root, "src/content/aircraft-tax");
const { COUNTRIES, REGIONS: LISTED, TOPICS } = await import(pathToFileURL(path.join(dataRoot, "registry.mjs")).href);

// `node scripts/check-aircraft-tax.mjs us/alabama.mjs us/alaska.mjs` checks
// those files only, before they are listed in us/index.mjs. With no arguments
// it checks every listed region, which is what the build runs.
const files = process.argv.slice(2);
const REGIONS = files.length
  ? await Promise.all(files.map(async (f) => (await import(pathToFileURL(path.resolve(dataRoot, f)).href)).default))
  : LISTED;

/** Quotes write figures many ways: "6,000", "6.500%", "four per cent". Fold them to one. */
const foldFigures = (text) =>
  text
    .replace(/,(?=\d{3})/g, "")
    .replace(/(\d+)\.(\d*?)0+(?!\d)/g, (_, a, b) => (b ? `${a}.${b}` : a))
    .replace(/per cent/gi, "percent");

/** Statutes often spell numbers out: "ninety (90) days", "one-half percent". */
const WORDS = {
  "0.5": ["one-half percent", "one-half of one percent"],
  "3.25": ["three and one-fourth percent"],
  "5.75": ["five and three-fourths percent"],
  "6.5": ["six and five-tenths percent", "six and one-half percent"],
  4: ["four percent"], 6: ["six percent"], 15: ["fifteen"], 6000: ["six thousand"],
  10: ["ten"], 20: ["twenty"], 21: ["twenty-one"], 30: ["thirty"], 60: ["sixty"], 90: ["ninety"],
};

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
    // Every figure in an answer (a rate, a dollar amount, a day count, a weight)
    // must appear in one of that answer's quotes. This is the rule that stops a
    // plausible number from another state or from memory reaching the page.
    const quoted = foldFigures(f.sources.map((s) => s.quote).join(" "));
    for (const n of figures(f.answer)) {
      const asWords = WORDS[n] ?? [];
      const found =
        new RegExp(`(^|[^\\d.])${n.replace(".", "\\.")}(?![\\d])`).test(quoted) || asWords.some((w) => quoted.toLowerCase().includes(w));
      if (!found) {
        fail(`${where} ${t}: the answer says ${n}, which no quote for this answer contains`);
      }
    }
  }
}

/** Figures worth checking: "6", "5,000", "0.5", "$37.50". Years and FAR part numbers are references, not figures. */
function figures(text) {
  const out = new Set();
  for (const m of text.matchAll(/\$?(\d[\d,]*(?:\.\d+)?)/g)) {
    const n = foldFigures(m[1].replace(/,/g, "").replace(/\.$/, ""));
    const before = text.slice(Math.max(0, m.index - 6), m.index);
    if (/^(19|20)\d\d$/.test(n)) continue; // a year
    if (/Parts? $|Part $|Form $|SB $/.test(before)) continue; // a reference, not an amount
    out.add(n);
  }
  return [...out];
}

// The summary at the top of each page is held to the same rule as the answers:
// every figure in it must be in one of the state's quotes.
for (const r of REGIONS) {
  const all = foldFigures(Object.values(r.facts).flatMap((f) => f.sources.map((s) => s.quote)).join(" "));
  for (const n of figures(r.summary)) {
    const found = new RegExp(`(^|[^\\d.])${n.replace(".", "\\.")}(?![\\d])`).test(all) || (WORDS[n] ?? []).some((w) => all.toLowerCase().includes(w));
    if (!found) fail(`${r.country}/${r.slug} summary: says ${n}, which no quote for the state contains`);
  }
}

// The calculator may only use figures the state's page quotes.
{
  const { CALC } = await import(pathToFileURL(path.join(dataRoot, "calc.mjs")).href);
  const bySlug = new Map(REGIONS.map((r) => [r.slug, r]));
  const norm = (text) => text.replace(/,/g, "").replace(/(\d+)\.(\d*?)0+(?!\d)/g, (_, a, b) => (b ? `${a}.${b}` : a));
  for (const [slug, calc] of Object.entries(CALC)) {
    const r = bySlug.get(slug);
    if (!r) {
      if (!files.length) fail(`calc.mjs has ${slug}, which is not a listed region`);
      continue;
    }
    const sources = Object.values(r.facts).flatMap((f) => f.sources);
    const haystack = norm(sources.map((s) => `${s.title} ${s.quote}`).join(" ")).toLowerCase();
    const numbers = [];
    const walk = (v, key) => {
      if (key === "bandStarts" || key === "note") return;
      if (typeof v === "number") numbers.push(v);
      else if (Array.isArray(v)) v.forEach((x) => walk(x));
      else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, k);
    };
    walk(calc);
    for (const n of numbers) {
      const str = String(n);
      const found =
        new RegExp(`(^|[^\\d.])${str.replace(".", "\\.")}(?![\\d])`).test(haystack) || (WORDS[str] ?? []).some((w) => haystack.includes(w));
      if (!found) fail(`calc.mjs ${slug}: uses ${str}, which no quoted source for ${r.name} contains`);
    }
  }
}

if (failures.length) {
  console.error(`check-aircraft-tax: ${failures.length} problem(s)\n`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`check-aircraft-tax: ok. ${REGIONS.length} regions, every answer sourced or marked unclear.`);
