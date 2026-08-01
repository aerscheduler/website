/**
 * Fail the build if the API docs advertise anything but API keys.
 *
 * This exists because the drift actually happened. The API moved to API keys and
 * the spec was updated, but the docs hub page kept its own hand-written
 * "POST your email and password to /auth" copy — in the quickstart, in the FAQ,
 * and in the summary tiles. It sat on the public site for a day telling
 * integrators to authenticate a way we no longer advertise.
 *
 * The underlying cause is that the hub page restates things the spec already
 * says. Where that could be removed it was (see AUTH_SCHEME in lib/openapi.ts);
 * where prose genuinely has to be written by hand, this is the backstop.
 *
 * Password sign-in still WORKS — the app and console use it, and there are plans
 * for personal-credential access later. It is simply not what we point people
 * at, so it must not appear in the docs.
 *
 * Run: node scripts/check-docs-auth.mjs   (wired into `npm run build`)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const DOCS = path.join(process.cwd(), "src", "app", "docs");
const SPEC = path.join(process.cwd(), "src", "content", "openapi.json");

/** Phrases that mean we are pointing somebody at password auth. */
const FORBIDDEN = [
  { pattern: /email and password/i, why: "points at password sign-in" },
  { pattern: /"password"\s*:/, why: "a password in an example request" },
  { pattern: /POST\s+\S*\/auth\b/i, why: "tells the reader to call the sign-in endpoint" },
  { pattern: /accessToken/i, why: "the session-token envelope; keys are the published credential" },
  { pattern: /AERSCHEDULER_TOKEN/, why: "stale env var name — keys use AERSCHEDULER_KEY" },
  { pattern: /\bsign in for a token\b/i, why: "describes the session flow" },
];

const walk = (dir, out = []) => {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|mdx?)$/.test(entry)) out.push(full);
  }
  return out;
};

const problems = [];

for (const file of walk(DOCS)) {
  const src = readFileSync(file, "utf8");
  src.split("\n").forEach((line, i) => {
    for (const { pattern, why } of FORBIDDEN) {
      if (pattern.test(line)) {
        problems.push({ file: path.relative(process.cwd(), file), line: i + 1, why, text: line.trim().slice(0, 100) });
      }
    }
  });
}

// The spec is the source these pages render, so check it says keys too.
const spec = JSON.parse(readFileSync(SPEC, "utf8"));
const scheme = spec.components?.securitySchemes?.bearerAuth ?? {};
if (!/api key/i.test(`${scheme.description ?? ""} ${scheme.bearerFormat ?? ""}`)) {
  problems.push({
    file: "src/content/openapi.json",
    line: 0,
    why: "the spec's security scheme no longer describes an API key",
    text: String(scheme.bearerFormat ?? scheme.description ?? "").slice(0, 100),
  });
}
for (const forbidden of ["/auth", "/auth/session"]) {
  if (spec.paths?.[forbidden]) {
    problems.push({ file: "src/content/openapi.json", line: 0, why: `${forbidden} is published`, text: forbidden });
  }
}

if (problems.length) {
  console.error(`\n✗ API docs advertise something other than API keys (${problems.length}):\n`);
  for (const p of problems) {
    console.error(`  ${p.file}:${p.line}  — ${p.why}`);
    console.error(`      ${p.text}`);
  }
  console.error(
    "\n  API keys are the only credential the docs should point at. Password sign-in\n" +
      "  still works for our own app and console; it is just not advertised.\n"
  );
  process.exit(1);
}

console.log("✓ API docs point only at API keys");
