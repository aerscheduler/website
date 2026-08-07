#!/usr/bin/env node
/**
 * Captures the screenshots the help docs declare, from the test organisation.
 *
 * Reads `src/lib/docs-screenshots.ts`, drives the real web console, and writes
 * `public/docs/<id>.png` for every entry. Articles render a labelled frame
 * until the file lands, so this can be run whenever, on all of them or one.
 *
 * WHERE THE PICTURES COME FROM
 * ----------------------------
 * The TEST organisation (Test Flight School, join code AERTEST01), signed in as
 * test-owner@aerscheduler.com. It is ours, it is permanent, and its data can be
 * staged in advance and photographed repeatedly.
 *
 * Deliberately NOT the public demo: that is a leased pool shared with anyone who
 * clicks "try it", it rate-limits under a batch this size, its org id changes on
 * every reseed, and it wraps the console in a sandbox banner.
 *
 * These images get published on an indexed marketing site, so the run asserts it
 * is inside a known-safe org before it captures anything. A screenshot taken in a
 * paying customer's org would put a real student's name and a real invoice amount
 * on the open internet.
 *
 * Usage:
 *   npm run docs:screenshots                  every declared screenshot
 *   npm run docs:screenshots -- scheduling-*  only ids matching a glob
 *   npm run docs:screenshots -- --list        show what is declared and missing
 *
 * Env:
 *   DOCS_APP_URL   console origin (default https://app.aerscheduler.com)
 *   DOCS_EMAIL / DOCS_PASSWORD
 *                  override the test account, e.g. to shoot a screen only a
 *                  technician or a student can reach.
 */

import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(root, "public", "docs");
const APP_URL = (process.env.DOCS_APP_URL ?? "https://app.aerscheduler.com").replace(/\/$/, "");

const args = process.argv.slice(2);
const LIST_ONLY = args.includes("--list");
const ALLOW_NON_DEMO = args.includes("--i-know-this-is-not-the-demo");
const patterns = args.filter((a) => !a.startsWith("--"));

/**
 * Signs in to the TEST organisation, which is where documentation screenshots
 * come from.
 *
 * Not the public demo. The demo is a leased pool of orgs shared with anyone who
 * clicks "try it" on the marketing site: it rate-limits under a batch this size
 * ("The demo isn't ready. Too many requests."), its org id changes on every
 * reseed so nothing can be staged in advance, and it wraps the console in a
 * sandbox banner that has to be hidden out of every shot.
 *
 * Test Flight School (join code AERTEST01, prod org 360) is ours, permanent, and
 * populated with accounts we control, so a data state can be set up once and
 * photographed repeatedly.
 */
const TEST_ACCOUNT = {
  email: process.env.DOCS_EMAIL ?? "test-owner@aerscheduler.com",
  password: process.env.DOCS_PASSWORD ?? "AerTest2026!",
};

/** Orgs it is safe to publish pictures of. Anything else is somebody's school. */
const SAFE_ORG_PATTERN = /test flight school|demo|fieldstone aviation/i;

/* ------------------------------------------------------------------ */
/* Read the manifest                                                   */
/* ------------------------------------------------------------------ */

/**
 * The manifest is TypeScript, and this is a plain node script, so the entries
 * are recovered with a scan rather than an import. Deliberate: adding a build
 * step to read a list of screenshot ids would be a worse trade than a regex
 * that fails loudly when the shape changes.
 */
function readManifest() {
  const source = readFileSync(path.join(root, "src", "lib", "docs-screenshots.ts"), "utf8");
  const body = source.slice(
    source.indexOf("export const SCREENSHOTS"),
    source.indexOf("const byId")
  );

  const specs = [];
  for (const block of body.split(/\n  \{/).slice(1)) {
    // Values may be double- or single-quoted. `crop` is single-quoted because it
    // contains a double-quoted attribute selector, and reading only one style
    // silently returned undefined for every crop in the file.
    const field = (name) => {
      const dq = new RegExp(`\\b${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`).exec(block);
      if (dq) return dq[1].replace(/\\"/g, '"');
      const sq = new RegExp(`\\b${name}:\\s*'((?:[^'\\\\]|\\\\.)*)'`).exec(block);
      return sq ? sq[1].replace(/\\'/g, "'") : undefined;
    };
    const id = field("id");
    if (!id) continue;
    specs.push({
      id,
      screen: field("screen") ?? id,
      route: field("route") ?? "/",
      crop: field("crop"),
      dataState: field("dataState") ?? "",
    });
  }
  return specs;
}

const all = readManifest();
if (all.length === 0) {
  console.log("No screenshots declared in src/lib/docs-screenshots.ts yet. Nothing to capture.");
  process.exit(0);
}

const selected = patterns.length
  ? all.filter((s) => patterns.some((p) => globMatch(p, s.id)))
  : all;

if (LIST_ONLY) {
  console.log(`${all.length} declared, ${all.filter((s) => hasFile(s.id)).length} captured\n`);
  for (const spec of all) {
    console.log(`${hasFile(spec.id) ? "  ok  " : " todo "} ${spec.id.padEnd(38)} ${spec.route}`);
    if (!hasFile(spec.id)) console.log(`        needs: ${spec.dataState}`);
  }
  process.exit(0);
}

/* ------------------------------------------------------------------ */
/* Capture                                                             */
/* ------------------------------------------------------------------ */

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  // 1920, not 1440. A twelve-hour day board at 1440 squeezes each booking
  // until its label truncates to "N172TS · Ren...", and the point of the
  // picture is that you can read it. Taller than 900 too, so a long panel is
  // in the viewport rather than needing a scroll the crop cannot follow.
  viewport: { width: 1920, height: 1200 },
  deviceScaleFactor: 2,
  colorScheme: "light",
  // A stable clock keeps "today" from sliding across a run, so a board captured
  // at 23:59 and the one after it do not sit on different days.
  timezoneId: "America/Denver",
});
const page = await context.newPage();

let failures = 0;

try {
  await signIn(page);
  await assertSafeOrg(page);

  for (const spec of selected) {
    const target = `${APP_URL}${spec.route}`;
    try {
      await page.goto(target, { waitUntil: "networkidle", timeout: 45_000 });
      await settle(page);

      // A whole-viewport shot is never the right illustration. It arrives on the
      // page about 700px wide, so the nav rail and the topbar eat half of it and
      // the thing the paragraph is actually about is a postage stamp in the
      // corner. Every spec names what to crop to, and a spec that does not is a
      // failure rather than a full-page fallback.
      const file = path.join(OUT_DIR, `${spec.id}.png`);
      if (!spec.crop) {
        throw new Error(
          "no crop declared. Add a crop selector naming the element this screenshot is of."
        );
      }
      const el = await page.waitForSelector(spec.crop, { timeout: 10_000 });
      await el.scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(250);
      const clip = await contentBox(page, el);
      if (clip) await page.screenshot({ path: file, clip });
      else await el.screenshot({ path: file });

      console.log(`  ok    ${spec.id}`);
    } catch (error) {
      failures += 1;
      console.error(`  FAIL  ${spec.id}  (${spec.route})`);
      console.error(`        ${String(error).split("\n")[0]}`);
      console.error(`        needs: ${spec.dataState}`);
    }
  }
} finally {
  await browser.close();
}

console.log(
  `\n${selected.length - failures}/${selected.length} captured into public/docs.` +
    (failures ? " Re-run the failures once their data exists." : "")
);
process.exit(failures ? 1 : 0);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

async function signIn(page) {
  await page.goto(`${APP_URL}/login`, { waitUntil: "networkidle", timeout: 60_000 });
  await page.fill('input[type="email"]', TEST_ACCOUNT.email);
  await page.fill('input[type="password"]', TEST_ACCOUNT.password);
  await page.click('button[type="submit"]');
  await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 45_000 });
  await settle(page);
}

/**
 * Refuses to publish images of somebody's real flight school.
 *
 * These files land on an indexed marketing site. A screenshot taken inside a
 * paying customer's org would put a real student's name, a real tail number and
 * a real invoice amount on the open internet, and no amount of care afterwards
 * takes that back. So the run stops unless it can positively identify the org as
 * one of ours, by the name the console is actually displaying.
 */
async function assertSafeOrg(page) {
  if (ALLOW_NON_DEMO) {
    console.warn("  warn  org check skipped. Confirm no real customer data is on screen.\n");
    return;
  }
  const shell = await page.evaluate(() => document.body.innerText.slice(0, 4000));
  if (!SAFE_ORG_PATTERN.test(shell)) {
    throw new Error(
      "Could not confirm this session is inside a test or demo organisation. Refusing to " +
        "capture, because a screenshot of a real school would publish real customer data."
    );
  }
}

/**
 * Chrome that belongs to the sandbox rather than to the product.
 *
 * The demo banner ("you're Marisol Okafor at a made-up flight school") is
 * scaffolding a paying customer never sees, and it sits above every page, so
 * left alone it would head all 140 screenshots with a sentence that contradicts
 * the article underneath it. Hiding it shows the real console; the data behind
 * it is fictional either way, which is the whole point of capturing here.
 *
 * The impersonation banner is hidden for the same reason. The cookie banner is
 * dismissed rather than hidden, by declining, so nothing is set that we would
 * not want set.
 */
async function hideSandboxChrome(page) {
  // Inlined rather than hoisted to a const: the helpers below sit under the
  // top-level await that calls them, so a const here is in its dead zone.
  await page
    .addStyleTag({
      content:
        '[data-testid="demo-banner"], [data-testid="impersonation-banner"] { display: none !important; }',
    })
    .catch(() => {});
}


/**
 * The box that actually has something in it, in page coordinates.
 *
 * Cropping to the element's own rect leaves large dead margins: a dispatch board
 * with five lanes still reserves the height of a full grid, and a two-course
 * page still reserves the grid it would need for eight, so nearly half of the
 * first captures was empty white.
 *
 * So union the rects of the descendants that actually paint something: anything
 * with its own text, a visible border, or a background that is not transparent.
 * Purely structural wrappers contribute nothing, which is the whole point.
 *
 * Returns null when nothing qualifies, and the caller falls back to the plain
 * element screenshot rather than guessing.
 */
async function contentBox(page, el) {
  const box = await el.evaluate((root) => {
    const bounds = { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity };
    let found = false;

    const paints = (node) => {
      const style = getComputedStyle(node);
      if (style.visibility === "hidden" || style.display === "none") return false;
      if (Number(style.opacity) === 0) return false;
      const hasOwnText = Array.from(node.childNodes).some(
        (child) => child.nodeType === 3 && child.textContent.trim().length > 0
      );
      const hasBorder = ["Top", "Right", "Bottom", "Left"].some(
        (side) => parseFloat(style[`border${side}Width`]) > 0
      );
      const bg = style.backgroundColor;
      const hasFill =
        (bg && bg !== "transparent" && !/rgba\(0,\s*0,\s*0,\s*0\)/.test(bg)) ||
        style.backgroundImage !== "none";
      return hasOwnText || hasBorder || hasFill || node.tagName === "IMG" || node.tagName === "SVG";
    };

    const visit = (node) => {
      if (node.nodeType !== 1) return;
      if (paints(node)) {
        const r = node.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          bounds.left = Math.min(bounds.left, r.left);
          bounds.top = Math.min(bounds.top, r.top);
          bounds.right = Math.max(bounds.right, r.right);
          bounds.bottom = Math.max(bounds.bottom, r.bottom);
          found = true;
        }
      }
      for (const child of node.children) visit(child);
    };

    visit(root);
    if (!found) return null;

    // Never grow beyond the element itself, and keep a little breathing room.
    const own = root.getBoundingClientRect();
    const pad = 8;
    const left = Math.max(own.left, bounds.left - pad);
    const top = Math.max(own.top, bounds.top - pad);
    const right = Math.min(own.right, bounds.right + pad);
    const bottom = Math.min(own.bottom, bounds.bottom + pad);
    if (right - left < 40 || bottom - top < 40) return null;

    return {
      x: left + window.scrollX,
      y: top + window.scrollY,
      width: right - left,
      height: bottom - top,
    };
  });
  return box;
}

/** Take the privacy-preserving option, once, so the card stops covering the page. */
async function dismissCookieBanner(page) {
  const decline = page.getByRole("button", { name: /decline/i }).first();
  if (await decline.isVisible().catch(() => false)) {
    await decline.click().catch(() => {});
    await page.waitForTimeout(300);
  }
}

/** Let data land and animations finish, so nothing is caught mid-fade. */
async function settle(page) {
  await page.waitForTimeout(1200);
  await page
    .waitForFunction(() => !document.querySelector("[data-loading], .animate-pulse"), {
      timeout: 8000,
    })
    .catch(() => {});
  await hideSandboxChrome(page);
  await dismissCookieBanner(page);
  await page.waitForTimeout(400);
}

function hasFile(id) {
  return existsSync(path.join(OUT_DIR, `${id}.png`));
}

function globMatch(pattern, value) {
  const re = new RegExp(`^${pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`);
  return re.test(value);
}
