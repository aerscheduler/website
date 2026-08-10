/**
 * Pull the live API description before building the docs.
 *
 * This exists because the drift actually happened, twice, and shipped both times.
 *
 * The docs pages render from `src/content/openapi.json`, a COMMITTED copy. The
 * server's generator writes that file, but it writes it into a different git
 * repo: the two live side by side on a developer's disk and nowhere else. So
 * shipping a server change updated `api.aerscheduler.com/openapi.json` while the
 * copy the site renders stayed at whatever was last hand-committed here.
 *
 * The server's deploy pipeline even fires a rebuild hook when the spec changes.
 * It worked exactly as written and achieved nothing: the rebuild read the same
 * stale file and produced a byte-identical page, then reported success. That is
 * how `/audit` shipped undocumented, and how `/invoices/summary` sat live and
 * undocumented for its whole life before it.
 *
 * So the build now reads the same URL the docs page tells readers to read.
 *
 * The committed copy is kept, and is still the fallback: the original reason for
 * it: that a marketing deploy must not fail because the API is briefly
 * unreachable: is a good one. What it must not be is the *primary* source,
 * because nothing was keeping it honest.
 *
 * A fallback is announced loudly. Silence is what let this run for months.
 *
 * Run: node scripts/sync-openapi.mjs   (wired into `npm run build`)
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const SPEC = path.join(process.cwd(), "src", "content", "openapi.json");
const LIVE = process.env.OPENAPI_URL ?? "https://api.aerscheduler.com/openapi.json";

//Short, and retried: this sits in front of every website build, including the
//marketing pages, so it must not turn a slow API into a five-minute build.
const TIMEOUT_MS = 8000;
const ATTEMPTS = 3;

/** Fetch the published document, or null if it cannot be read as a spec. */
async function fetchLiveSpec() {
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const res = await fetch(LIVE, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const spec = await res.json();
      //A 200 that isn't a spec: a captive portal, an HTML error page, a proxy
      //banner: must not overwrite a good committed copy with junk.
      if (!spec || typeof spec !== "object" || !spec.openapi || !spec.paths) {
        throw new Error("response is not an OpenAPI document");
      }
      return spec;
    } catch (err) {
      const last = attempt === ATTEMPTS;
      console.warn(`[openapi] attempt ${attempt}/${ATTEMPTS} failed: ${err.message}`);
      if (last) return null;
    }
  }
  return null;
}

const committedRaw = readFileSync(SPEC, "utf8");
const committed = JSON.parse(committedRaw);
const live = await fetchLiveSpec();

if (!live) {
  //Not a build failure. The docs being a release behind is bad; the marketing
  //site failing to deploy because the API blipped is worse.
  console.warn(
    `::warning::[openapi] could not read ${LIVE}: building from the committed copy, ` +
      `which may be behind the deployed API.`
  );
  process.exit(0);
}

const next = `${JSON.stringify(live, null, 2)}\n`;
if (next === committedRaw) {
  console.log(`[openapi] committed copy already matches ${LIVE} (${Object.keys(live.paths).length} paths).`);
  process.exit(0);
}

//Say what moved. A build log that only says "updated" gives you no way to tell a
//new endpoint from a typo fix in a description.
const before = new Set(Object.keys(committed.paths ?? {}));
const after = new Set(Object.keys(live.paths));
const added = [...after].filter((p) => !before.has(p));
const removed = [...before].filter((p) => !after.has(p));

writeFileSync(SPEC, next);
console.log(`[openapi] synced from ${LIVE}: ${before.size} → ${after.size} paths.`);
if (added.length) console.log(`[openapi]   + ${added.join(", ")}`);
if (removed.length) console.log(`[openapi]   - ${removed.join(", ")}`);
if (!added.length && !removed.length) console.log(`[openapi]   (same paths, descriptions changed)`);
