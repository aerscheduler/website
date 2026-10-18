#!/usr/bin/env node
/**
 * Pulls the official text of every regulation in the plain-English library
 * (`/regulations`) from the eCFR API and writes one committed snapshot,
 * `src/content/regulations/ecfr.json`.
 *
 * WHY A COMMITTED SNAPSHOT AND NOT A FETCH AT BUILD TIME. The eCFR rate-limits
 * hard (a burst of parallel requests gets 429s within a second), and the pages
 * have no reason to depend on a government API being up when Vercel builds. The
 * rules change a few times a year, so a snapshot refreshed weekly is current
 * enough, and every page says the date its text is current as of.
 *
 * WHY EACH SECTION CARRIES A HASH. Every plain-English summary in
 * `src/content/regulations/sections/*.mjs` records the hash of the official text
 * it was written against (`textHash`). When the FAA amends a section, this
 * script writes a new hash, `scripts/check-regulations.mjs` sees the summary no
 * longer matches, and the build fails until someone rereads the rule and updates
 * the summary. A summary cannot quietly outlive the text it explains.
 *
 * Usage:
 *   node scripts/sync-ecfr.mjs            fetch everything, write the snapshot,
 *                                         and list the sections whose text changed
 *   node scripts/sync-ecfr.mjs 91.409     fetch only these, keep the rest
 *
 * The weekly workflow (.github/workflows/sync-ecfr.yml) runs this and opens a
 * pull request when anything changed, never a commit to main: a commit on main
 * is a deploy, and a changed hash fails the build until a person rereads it.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "src/content/regulations/ecfr.json");
const API = "https://www.ecfr.gov/api/versioner/v1";
const TITLE = 14;
/** The eCFR answers 429 to bursts; one request at a time, spaced. */
const SPACING_MS = 1200;

const { REGULATIONS } = await import(pathToFileURL(path.join(root, "src/content/regulations/registry.mjs")).href);

const only = process.argv.slice(2);
const wanted = only.length ? REGULATIONS.filter((r) => only.includes(r.cite)) : REGULATIONS;
if (only.length && wanted.length !== only.length) {
  console.error(`Unknown cite in ${only.join(", ")}. Known: ${REGULATIONS.map((r) => r.cite).join(", ")}`);
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let last = 0;

/** Optional on-disk cache (ECFR_CACHE=<dir>) so iterating on the parser does not refetch. */
const CACHE = process.env.ECFR_CACHE;

/** GET with spacing and patient retries on 429 and 5xx. */
async function get(url, as = "text") {
  const cached = CACHE && path.join(CACHE, createHash("sha1").update(url).digest("hex"));
  if (cached && existsSync(cached)) {
    const body = readFileSync(cached, "utf8");
    return as === "json" ? JSON.parse(body) : body;
  }
  const body = await fetchText(url);
  if (cached) {
    mkdirSync(CACHE, { recursive: true });
    writeFileSync(cached, body);
  }
  return as === "json" ? JSON.parse(body) : body;
}

async function fetchText(url) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const wait = last + SPACING_MS - Date.now();
    if (wait > 0) await sleep(wait);
    last = Date.now();
    const res = await fetch(url, {
      headers: { "Accept-Encoding": "gzip", "User-Agent": "AerScheduler regulations library (www.aerscheduler.com/regulations)" },
    });
    if (res.ok) return res.text();
    if (res.status === 429 || res.status >= 500) {
      const backoff = 5000 * (attempt + 1);
      console.warn(`  ${res.status} on ${url}, retrying in ${backoff / 1000}s`);
      await sleep(backoff);
      continue;
    }
    throw new Error(`${res.status} ${res.statusText} for ${url}`);
  }
  throw new Error(`Gave up on ${url}`);
}

/* ------------------------------------------------------------------ */
/* XML to blocks                                                       */
/* ------------------------------------------------------------------ */

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

/**
 * The eCFR puts a long dash after run-in headings ("(b) Exceptions." then the
 * dash). House style bans the character everywhere we publish, and a colon
 * reads the same in that position. Built from char codes so this file carries
 * none of the banned characters itself.
 */
const LONG_DASH = new RegExp(`\\.?\\s*[${String.fromCharCode(0x2014, 0x2015)}]\\s*`, "g");

/** Inline markup to plain text. Italics and emphasis keep their words. */
function text(xml) {
  return xml
    // Line breaks inside table headings separate words ("date of<LI>examination").
    .replace(/<(?:LI|br)\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, e) => {
      if (e[0] === "#") return String.fromCodePoint(e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
      return ENTITIES[e] ?? whole;
    })
    .replace(LONG_DASH, ": ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Lowercase roman numerals, i to xl. Appendix A to Part 43 runs to (xxviii). */
const ROMAN = Array.from({ length: 40 }, (_, i) => {
  let n = i + 1;
  let out = "";
  for (const [v, r] of [[10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"]]) while (n >= v) { out += r; n -= v; }
  return out;
});
const nextRoman = (r) => ROMAN[ROMAN.indexOf(r) + 1];

/**
 * Paragraph labels to a stable anchor: (b)(1)(i) becomes "b-1-i".
 *
 * The CFR nests (a) letters, (1) digits, (i) roman numerals, (A) capitals. The
 * one ambiguity is a lowercase letter that is also a numeral, (i), (v), (x): it
 * is a numeral when it opens a list under a digit or continues one, and a
 * letter otherwise. "(i)" straight after "(h)(4)" could be either, so what
 * comes next decides. A numeral (i) is followed by (ii) or by its own (A); a
 * letter (i) is followed by its (1), in the next paragraph or run in.
 */
function labeler() {
  let stack = [];
  return function label(tokens, following, opensDigit) {
    for (const t of tokens) {
      let level;
      // Digits under a capital are the fifth level, (e)(1)(iv)(C)(1), printed in
      // italics in the CFR: "(1)" opens that list and the next digit continues it.
      if (/^\d+$/.test(t)) level = stack.length >= 4 && (t === "1" || (stack[4] && Number(stack[4]) + 1 === Number(t))) ? 4 : 1;
      else if (/^[A-Z]+$/.test(t)) level = 3;
      else {
        // A numeral list opens with (i) directly under a digit, or continues the
        // one already open. After (h)(2)(ii), "(i)" is the next letter: a new
        // numeral list would need a new digit first.
        const letterNext = stack[0] && String.fromCharCode(stack[0].charCodeAt(0) + 1) === t;
        const opens = t === "i" && stack.length === 2 && (!letterNext || (!opensDigit && /^(ii|[A-Z]+)$/.test(following[0] ?? "")));
        const asRoman = ROMAN.includes(t) && (opens || (stack[2] && nextRoman(stack[2]) === t));
        level = asRoman ? 2 : 0;
      }
      stack = [...stack.slice(0, level), t];
    }
    return stack.filter(Boolean).join("-");
  };
}

const LABELS = /^((?:\s*\((?:[a-z]{1,2}|[ivxl]{1,7}|\d{1,3}|[A-Z]{1,2})\))+)\s*/;
/**
 * A run-in heading that opens the next level inside the same paragraph, as in
 * Appendix A, "(a) Major alterations: (1) Airframe major alterations.", or 61.3,
 * "(j) Age limitation for certain operations. (1) Age limitation." The (1)
 * belongs to the anchor even though it is not at the start.
 */
const RUN_IN = /^[^():]{1,160}[:.]\s\((\d{1,3}|[ivx]{1,6})\)\s/;

/** The section's body as typed blocks: labelled paragraphs, run-on text, headings, tables. */
function blocks(xml) {
  const out = [];
  const label = labeler();
  let current = "";
  const re = /<(P|FP|HD|GPOTABLE|TABLE|NOTE|EXTRACT)\b([^>]*)>([\s\S]*?)<\/\1>/g;
  const all = [...xml.matchAll(re)];
  // The first label token of each labelled paragraph, for the lookahead above.
  const firsts = all.map(([, tag, , inner]) => (tag === "P" ? /^\s*\(([^)]+)\)/.exec(text(inner))?.[1] : undefined));
  for (const [index, m] of all.entries()) {
    const [, tag, , inner] = m;
    if (tag === "HD") {
      const t = text(inner);
      if (t) out.push({ type: "heading", text: t });
      continue;
    }
    if (tag === "GPOTABLE" || tag === "TABLE") {
      const rows = [...inner.matchAll(/<(?:ROW|TR)\b[^>]*>([\s\S]*?)<\/(?:ROW|TR)>/gi)].map((r) =>
        [...r[1].matchAll(/<(?:ENT|TD|TH)\b[^>]*>([\s\S]*?)<\/(?:ENT|TD|TH)>/gi)].map((c) => text(c[1]))
      );
      const head = [...inner.matchAll(/<CHED\b[^>]*>([\s\S]*?)<\/CHED>/g)].map((c) => text(c[1]));
      out.push({ type: "table", head: head.length ? head : (rows.shift() ?? []), rows, ...(current ? { id: current } : {}) });
      continue;
    }
    const t = text(inner);
    if (!t) continue;
    if (tag === "NOTE" || tag === "EXTRACT") {
      out.push({ type: "text", text: t, ...(current ? { id: current } : {}) });
      continue;
    }
    const lead = tag === "P" ? LABELS.exec(t) : null;
    if (lead) {
      const tokens = [...lead[1].matchAll(/\(([^)]+)\)/g)].map((x) => x[1]);
      const runIn = RUN_IN.exec(t.slice(lead[0].length));
      const opensDigit = !!runIn && /^\d/.test(runIn[1]);
      current = label(tokens, firsts.slice(index + 1).filter(Boolean), opensDigit);
      if (runIn) current = label([runIn[1]], [], false);
      out.push({ type: "para", id: current, label: lead[1].replace(/\s+/g, ""), text: t.slice(lead[0].length) });
    } else {
      out.push({ type: "text", text: t, ...(current ? { id: current } : {}) });
    }
  }
  return out;
}

/** Catch an anchor scheme gone wrong: two paragraphs claiming one id. */
function assertUniqueIds(cite, list) {
  const seen = new Set();
  for (const b of list) {
    if (b.type !== "para") continue;
    if (seen.has(b.id)) {
      const ids = list.filter((x) => x.type === "para").map((x) => `${x.label}=${x.id}`);
      throw new Error(`${cite}: two paragraphs parsed as #${b.id}. The labeler misread the nesting.\n${ids.join(" ")}`);
    }
    seen.add(b.id);
  }
}

/**
 * The fingerprint a summary is reviewed against. It covers the words of the
 * rule only (labels, text, table cells), never the anchors this script derives,
 * so improving the parser does not invalidate every summary.
 */
const hashOf = (list) =>
  createHash("sha256")
    .update(JSON.stringify(list.map((b) => (b.type === "table" ? [b.head, b.rows] : [b.label ?? "", b.text]))))
    .digest("hex")
    .slice(0, 16);

/* ------------------------------------------------------------------ */
/* Fetch                                                               */
/* ------------------------------------------------------------------ */

const titles = await get(`${API}/titles.json`, "json");
const date = titles.titles.find((t) => t.number === TITLE).up_to_date_as_of;
console.log(`eCFR title ${TITLE} is up to date as of ${date}. Fetching ${wanted.length} regulation(s).`);

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : { sections: {} };
const sections = only.length ? { ...previous.sections } : {};
const changed = [];

for (const reg of wanted) {
  const q = reg.kind === "appendix" ? `part=${reg.part}&appendix=${encodeURIComponent(reg.ecfrId)}` : `part=${reg.part}&section=${reg.cite}`;
  const xml = await get(`${API}/full/${date}/title-${TITLE}.xml?${q}`);
  if (!/<DIV[89]\b/.test(xml)) throw new Error(`${reg.cite}: the eCFR returned no section: ${xml.slice(0, 200)}`);

  const heading = text(/<HEAD>([\s\S]*?)<\/HEAD>/.exec(xml)?.[1] ?? "")
    .replace(/^§\s*[\d.]+\s*/, "")
    .replace(/^Appendix [A-Z] to Part \d+:?\s*/, "")
    .replace(/\.$/, "");
  const body = blocks(xml);
  assertUniqueIds(reg.cite, body);
  if (!body.length) throw new Error(`${reg.cite}: parsed no text`);

  const ancestry = await get(`${API}/ancestry/${date}/title-${TITLE}.json?${q}`, "json");
  const subpart = ancestry.ancestors?.find((a) => a.type === "subpart");
  const partNode = ancestry.ancestors?.find((a) => a.type === "part");

  const versions = await get(`${API}/versions/title-${TITLE}.json?${q}`, "json");
  const id = reg.kind === "appendix" ? reg.ecfrId : reg.cite;
  const amendedOn = (versions.content_versions ?? []).filter((v) => v.identifier === id).map((v) => v.amendment_date).sort().at(-1) ?? null;

  const entry = {
    cite: reg.cite,
    heading,
    part: reg.part,
    partTitle: partNode?.label_description ?? null,
    // `identifier` is the bare letter. `label` is "Subpart E" plus a long dash and the title.
    subpart: subpart ? { label: subpart.identifier, title: subpart.label_description } : null,
    amendedOn,
    hash: hashOf(body),
    blocks: body,
  };
  if (previous.sections[reg.cite]?.hash !== entry.hash) changed.push(reg.cite);
  sections[reg.cite] = entry;
  console.log(`  ${reg.cite.padEnd(10)} ${entry.hash}  ${String(body.length).padStart(3)} blocks  amended ${amendedOn ?? "?"}  ${heading}`);
}

mkdirSync(path.dirname(OUT), { recursive: true });
const ordered = Object.fromEntries(REGULATIONS.filter((r) => sections[r.cite]).map((r) => [r.cite, sections[r.cite]]));
writeFileSync(OUT, JSON.stringify({ source: "eCFR, Office of the Federal Register", upToDateAsOf: date, sections: ordered }, null, 1) + "\n");

if (changed.length) {
  console.log(`\nText changed in ${changed.length}: ${changed.join(", ")}`);
  console.log("Reread each summary against the new text, then set its textHash. check-regulations.mjs fails until you do.");
} else {
  console.log("\nNo text changed.");
}
