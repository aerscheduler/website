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

/**
 * The zone every capture runs in, and the zone the placeholder resolver has to
 * reason about "today" in. One constant, because the two used to disagree: the
 * browser drew the board in Denver while the resolver picked bookings by the
 * clock of whatever machine ran the script.
 */
const BOARD_ZONE = "America/Denver";

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
    // `open` is an array of selectors, so it needs its own reader.
    //
    // Walked rather than matched, because a selector is full of the characters a
    // regex would use as its own landmarks. `[data-doc-shot="x"] button` carries
    // both a `]` and a pair of quotes, so scanning to the first `]` ended the
    // array in the middle of the first selector and reading items with one
    // alternation of quotes ended each item at the first inner one. Neither
    // failed loudly: the step was dropped and the shot timed out on its crop,
    // pointing at the data state rather than at the selector that never ran.
    const list = (name) => {
      const opener = new RegExp(`\\b${name}:\\s*\\[`).exec(block);
      if (!opener) return undefined;
      const items = [];
      let quote = null;
      let current = "";
      for (let i = opener.index + opener[0].length; i < block.length; i++) {
        const ch = block[i];
        if (quote) {
          if (ch === "\\") current += block[++i] ?? "";
          else if (ch === quote) {
            items.push(current);
            current = "";
            quote = null;
          } else current += ch;
        } else if (ch === "/" && block[i + 1] === "/") {
          // A `//` note between two selectors. Skipped whole, or the apostrophe
          // in "the report's own column" opens a string and swallows the rest.
          while (i < block.length && block[i] !== "\n") i++;
        } else if (ch === '"' || ch === "'" || ch === "`") quote = ch;
        else if (ch === "]") break;
      }
      return items.length ? items : undefined;
    };

    const id = field("id");
    if (!id) continue;
    specs.push({
      id,
      screen: field("screen") ?? id,
      route: field("route") ?? "/",
      crop: field("crop"),
      open: list("open"),
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
  timezoneId: BOARD_ZONE,
});
const page = await context.newPage();

let failures = 0;

let placeholders = {};

/**
 * Whether the current spec left the mouse button DOWN.
 *
 * A `drag:` step has to, because the thing it is a picture of only exists while a
 * block is being held: the callout that names the slot, or the reason the drop
 * would be refused. Released after the shot, in a `finally`, so a failed crop
 * cannot leave the pointer stuck down over the next spec.
 */
let held = false;

try {
  await signIn(page);
  await assertSafeOrg(page);
  placeholders = await resolvePlaceholders(page);

  for (const spec of selected) {
    const route = fillPlaceholders(spec.route, placeholders);
    if (route === null) {
      failures += 1;
      console.error(`  FAIL  ${spec.id}  (${spec.route})`);
      console.error(`        route needs a record this org does not have`);
      continue;
    }
    const target = `${APP_URL}${route}`;
    try {
      await page.goto(target, { waitUntil: "networkidle", timeout: 45_000 });
      await settle(page);

      // Roughly a third of the shots are of a dialog, a dropdown or a sheet, and
      // navigation alone never reaches one. Each step is a selector to click, in
      // order, with the page allowed to settle between them. See `runStep` for the
      // two steps that are not a click.
      //
      // Steps carry placeholders too, so a step can name a record the org actually
      // has: `[role="option"]:has-text("{airworthinessTail}")` picks whichever tail
      // is grounded here rather than one that only exists in one database.
      held = false;
      for (const raw of spec.open ?? []) {
        const step = fillPlaceholders(raw, placeholders);
        if (step === null) throw new Error(`step needs a record this org does not have: ${raw}`);
        held = (await runStep(page, step)) || held;
      }
      if (spec.open?.length) await settle(page);

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
    } finally {
      if (held) {
        await page.mouse.up().catch(() => {});
        held = false;
      }
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
 * One `open` step. Returns true when it left the mouse button down.
 *
 * A click reaches most of these screens, but not all of them, and the two that it
 * cannot reach are not exotic: a number typed into a field, and a block held over
 * another one.
 *
 *   `fill:<selector>=<value>`   type into an input
 *   `drag:<from> => <to>`       press on one element, move onto another, and HOLD
 *   anything else               click it
 *
 * WHY `fill` EXISTS. Several of these images are of a figure the screen computes
 * from what was just typed: the live "Hours flown" line under a ramp-in reading,
 * or the overnight-minimum notice saying what that reading will actually bill. The
 * field arrives prefilled with the ramp-OUT reading, so a click-only path always
 * photographs a flight of 0.0 hours and a notice comparing 4.0 against nothing.
 *
 * WHY `drag` EXISTS, AND WHY IT HOLDS. The drag callout is deliberately built to
 * live only while a block is held (see drag-affordances.tsx), because the question
 * it answers is "why won't this move" and the answer has to be readable with the
 * block still over the bad slot. Letting go before the crop is taken photographs
 * an ordinary board.
 */
async function runStep(page, step) {
  const fill = /^fill:(.+?)=(.*)$/s.exec(step);
  if (fill) {
    const field = page.locator(fill[1]).first();
    await field.waitFor({ state: "visible", timeout: 10_000 });
    await field.fill(fill[2]);
    // A blur, so anything computed on change has run before the next step. Not a
    // Tab: that moves focus into the next field and can open its popover.
    await field.evaluate((el) => el.blur());
    await page.waitForTimeout(500);
    return false;
  }

  const drag = /^drag:(.+?)\s*=>\s*(.+)$/s.exec(step);
  if (drag) {
    const from = page.locator(drag[1]).first();
    const to = page.locator(drag[2]).first();
    await from.waitFor({ state: "visible", timeout: 10_000 });
    await to.waitFor({ state: "visible", timeout: 10_000 });
    const a = await from.boundingBox();
    const b = await to.boundingBox();
    if (!a || !b) throw new Error(`drag endpoints have no box: ${step}`);
    await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
    await page.mouse.down();
    // In steps, and past the drag threshold: one jump can be read as a click, and
    // the callout does not appear until the pointer has actually moved.
    for (let i = 1; i <= 6; i += 1) {
      await page.mouse.move(
        a.x + a.width / 2 + ((b.x + b.width / 2 - (a.x + a.width / 2)) * i) / 6,
        a.y + a.height / 2 + ((b.y + b.height / 2 - (a.y + a.height / 2)) * i) / 6
      );
      await page.waitForTimeout(60);
    }
    await page.waitForTimeout(400);
    return true;
  }

  const control = page.locator(step).first();
  await control.waitFor({ state: "visible", timeout: 10_000 });
  await control.click();
  await page.waitForTimeout(500);
  return false;
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
 * Real record ids for the routes that need one.
 *
 * Specs write `/schedule?reservation={reservationId}`. Hardcoding an id would
 * pin the manifest to one database, and these run against local and could run
 * against the test org on prod, where the ids differ. So each placeholder is
 * resolved once per run against whatever this org actually has.
 *
 * A placeholder that cannot be resolved leaves its spec failing with a clear
 * reason, rather than requesting `/billing?invoice=undefined`.
 */
async function resolvePlaceholders(page) {
  const get = async (path) => {
    try {
      const body = await page.evaluate(async (p) => {
        // The console authenticates with a bearer token out of localStorage, not
        // with a cookie, so a bare same-origin fetch is an ANONYMOUS request and
        // every one of these answered 401 "Not logged in." Nothing threw: each
        // list came back empty, every placeholder went unresolved, and the specs
        // that use one failed claiming the org has no such record.
        const token = localStorage.getItem("aer.token");
        const res = await fetch(p, {
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) return null;
        return res.json();
      }, path);
      const data = body?.data ?? body;
      return Array.isArray(data) ? data : data ? [data] : [];
    } catch {
      return [];
    }
  };

  const today = new Date();
  const from = new Date(today.getTime() - 90 * 864e5).toISOString();
  const to = new Date(today.getTime() + 90 * 864e5).toISOString();

  const [reservations, invoices, resources, people, squawks, enrollments, ledgerAccounts] =
    await Promise.all([
      get(
        `/api/reservations?startDate=${encodeURIComponent(from)}&endDate=${encodeURIComponent(to)}`
      ),
      get("/api/invoices"),
      get("/api/resources"),
      get("/api/orgUsers"),
      get("/api/maintenance/squawks?open=true"),
      get("/api/training/enrollments"),
      // Ledger-mode only, and admin only. Answers 403 or 404 in an invoice-mode org,
      // which `get` turns into an empty list rather than a throw.
      get("/api/organizations/ledger/accounts?pageSize=200"),
    ]);

  const planes = resources.filter((r) => r?.type?.plane);
  const live = (r) => (r?.invoices ?? []).filter((i) => !i?.voidedAt).length;
  const open = reservations.filter((r) => r && !r.cancelledAt);
  const at = (r, which) => (r?.review ?? {})[which] != null;
  /** Mirrors `usesBriefingNotMeters`: no aircraft to read a meter off. */
  const noMeters = (r) =>
    r?.type === "ground" || r?.resource == null || r?.resource?.type?.room != null;
  /**
   * Where a booking sits in the close-out pipeline. A copy of `closeOutStep` in
   * web/src/components/schedule/close-out.ts, and it has to stay one: a picture of
   * the ramp-in dialog can only be taken on a booking the CONSOLE thinks is at the
   * ramp-in step, so a resolver that disagreed would hand every such spec a booking
   * whose button is not on screen.
   */
  const step = (r) => {
    if (live(r)) return "invoiced";
    const out = noMeters(r) ? at(r, "briefing") : at(r, "hobbsTimeOut") || at(r, "tachTimeOut");
    if (!out) return "rampOut";
    const back = noMeters(r) ? at(r, "briefing") : at(r, "hobbsTimeIn") || at(r, "tachTimeIn");
    if (!back) return "rampIn";
    if (r.type === "guest") return r.completedByForGuest ? "reviewed" : "confirmGuest";
    const p = r.personnel ?? {};
    const pilots = new Set(
      [...(p.instructors ?? []), ...(p.students ?? []), ...(p.renters ?? [])].map((o) => o.id)
    );
    if (pilots.size === 0) return "reviewed";
    return (r.review?.reviewConfirmations ?? []).length >= pilots.size ? "reviewed" : "confirm";
  };
  // Nights away, judged at the AIRPORT. Comparing the two ISO strings instead calls a
  // 6pm-to-11pm evening flight a two-day trip anywhere west of Greenwich.
  const spansDays = (r) => dayKey(r.start) !== dayKey(new Date(new Date(r.end).getTime() - 1));
  const billable = (r) => {
    const p = r.personnel ?? {};
    return (p.students ?? []).length + (p.renters ?? []).length + (p.guests ?? []).length;
  };
  /** Newest first, so a re-run photographs the state that was staged most recently. */
  const pick = (predicate) =>
    [...open].sort((a, b) => String(b.start).localeCompare(String(a.start))).find(predicate);

  // How many bookings each person is on. The Personnel facet dims everything that is
  // not theirs, and pinning the FIRST person in the roster (an owner who flies
  // nothing) dims the whole board and reads as a broken filter rather than a filter.
  const appearances = new Map();
  for (const r of open) {
    const p = r.personnel ?? {};
    for (const ou of [...(p.instructors ?? []), ...(p.students ?? []), ...(p.renters ?? [])]) {
      appearances.set(ou.id, (appearances.get(ou.id) ?? 0) + 1);
    }
  }
  const busiestPerson = [...appearances.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

  // The day the board opens on, read in the zone the browser is running in rather
  // than the zone of the machine running the script.
  const dayKey = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: BOARD_ZONE });
  const todayKey = dayKey(today);
  const tomorrowKey = dayKey(new Date(today.getTime() + 864e5));
  const onToday = open.filter((r) => dayKey(r.start) === todayKey);

  // A tail with no room left on it TWO DAYS OUT, so a time picker stepped forward to
  // that day has nothing to offer and falls back to its "next available" link.
  //
  // Not today, and not tomorrow. A booking that runs midnight to midnight stretches the
  // day board's hour ruler across a full 24 hours: on today's board that squeezes every
  // other shot of it, and on tomorrow's it pushes the pair of blocks the drag shot picks
  // up off the right-hand edge, out of reach of a real pointer. Measured as a booking
  // that runs nearly a whole day rather than one starting at a particular instant, so a
  // midnight boundary a few minutes either side of the local one still counts.
  const blockedDayKey = dayKey(new Date(today.getTime() + 2 * 864e5));
  const bookedSolid = open.find(
    (r) =>
      r.resource?.type?.plane &&
      dayKey(r.start) === blockedDayKey &&
      !spansDays(r) &&
      new Date(r.end) - new Date(r.start) >= 20 * 3600e3
  );

  // Two bookings sharing one aircraft lane TOMORROW, for the drag callout. Dragging the
  // later one back over the earlier one is what makes the board answer with the clash
  // instead of a landing time.
  //
  // Tomorrow rather than today, because the board refuses to move a booking whose window
  // has already closed ("already passed, and it never ramped out") and answers a drag
  // attempt on one with a toast instead of the callout. On today's board that rules out
  // every pair from the moment the earlier one ends, which is most of the working day.
  const laneMates = (() => {
    const byResource = new Map();
    for (const r of open) {
      if (dayKey(r.start) !== tomorrowKey) continue;
      // A trip that runs into the next day is drawn clipped at the edge of the board and
      // is refused a move anyway, so it makes a poor thing to pick up.
      if (!r.resource?.type?.plane || spansDays(r)) continue;
      byResource.set(r.resource.id, [...(byResource.get(r.resource.id) ?? []), r]);
    }
    for (const items of byResource.values()) {
      if (items.length < 2) continue;
      const sorted = [...items].sort((a, b) => String(a.start).localeCompare(String(b.start)));
      return { from: sorted[sorted.length - 1], to: sorted[0] };
    }
    return null;
  })();

  // The grounded aircraft that also carries open squawks, so the airworthiness notice
  // has both halves to show: the red grounding line and the amber squawk list.
  const openByResource = new Map();
  // The squawk list is paged on some deployments, so unwrap a page before reading it.
  const openSquawks = Array.isArray(squawks?.[0]?.items) ? squawks[0].items : squawks;
  for (const sq of openSquawks) {
    const id = sq?.resource?.id;
    if (id == null || sq.resolvedAt) continue;
    openByResource.set(id, (openByResource.get(id) ?? 0) + 1);
  }
  const airworthiness =
    [...planes]
      .filter((p) => p.type.plane.grounded)
      .sort((a, b) => (openByResource.get(b.id) ?? 0) - (openByResource.get(a.id) ?? 0))[0] ?? null;

  // The tail to pick when the picture is of the FORM rather than of the aircraft: on the
  // line, nothing to say about its airworthiness, and with room left on today's board.
  // Taking whichever tail happens to be first instead gives a form headed by a squawk
  // notice, and a start-time dropdown that is disabled because that aeroplane is out all
  // day, which is what made two of these shots time out on a control nobody could click.
  const bookingsToday = new Map();
  for (const r of onToday) {
    if (r.resource?.id == null) continue;
    bookingsToday.set(r.resource.id, (bookingsToday.get(r.resource.id) ?? 0) + 1);
  }
  const freePlane =
    [...planes]
      .filter((p) => !p.type.plane.grounded)
      .sort(
        (a, b) =>
          (openByResource.get(a.id) ?? 0) - (openByResource.get(b.id) ?? 0) ||
          (bookingsToday.get(a.id) ?? 0) - (bookingsToday.get(b.id) ?? 0)
      )[0] ?? null;

  // Somebody the training strip will actually say something about. It renders nothing at
  // all for a student on no course, which is most of a roster, and one line per course
  // for a student on several. The fullest record wins: a student one course in shows a
  // single line reading "0 of 16 done", which illustrates the strip without illustrating
  // what it is for.
  const enrolledCount = new Map();
  for (const e of enrollments) {
    if (e?.status !== "enrolled" || !e?.student?.user?.name || e.student.grounded) continue;
    enrolledCount.set(e.student.user.name, (enrolledCount.get(e.student.user.name) ?? 0) + 1);
  }
  const enrolledStudent = [...enrolledCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

  // The thread only comes back on the single-squawk read, so the list cannot be sorted by
  // it. A handful of details is enough to find one worth photographing without walking a
  // board that can run to a hundred rows.
  const squawkCandidates = openSquawks.filter((sq) => sq?.id).slice(0, 12);
  const squawkDetails = await Promise.all(
    squawkCandidates.map((sq) => get(`/api/maintenance/squawks/${sq.id}`))
  );
  const squawkWithMostNotes =
    squawkDetails
      .map((d) => d[0])
      .filter(Boolean)
      .sort((a, b) => (b.comments?.length ?? 0) - (a.comments?.length ?? 0))[0]?.id ??
    squawkCandidates[0]?.id;

  const found = {
    reservationId: reservations.find((r) => r?.id)?.id,
    // A booking that has ramped in, for the close-out and who-pays-what shots. Reads
    // the review relation, which is where the stamp actually lives: the list payload
    // has no top-level `rampedInAt`, so the old test was never once true and this
    // silently resolved to the first booking of the window whatever state it was in.
    rampedReservationId:
      pick((r) => at(r, "rampedInAt"))?.id ?? reservations.find((r) => r?.id)?.id,
    invoiceId: invoices.find((i) => i?.id)?.id,
    aircraftId: planes.find((p) => !p?.type?.plane?.grounded)?.id ?? planes[0]?.id,
    groundedAircraftId: planes.find((p) => p?.type?.plane?.grounded)?.id,
    // The squawk with the fullest thread, resolved just below. The picture is OF the
    // thread, so the first open squawk is the wrong answer: it reliably has no notes at
    // all, which is a photograph of an empty state under an article about reading a
    // conversation. Two shots have already shipped that way.
    openSquawkId: squawkWithMostNotes,
    personId: people.find((p) => p?.id)?.id,
    // Somebody whose ledger is worth photographing. `personId` is just the first
    // member on the roster, and on a roster this size that is reliably an account
    // with no entries at all: an empty table under an article about reading one.
    // A prepaid account is preferred over an owing one. Both are worth documenting,
    // but the owing accounts in this org are the ones the end-to-end suites bill
    // against, so their memos read `E2E-SMOKE-invoice-void-after-pay` and the picture
    // published on the marketing site is of our test litter. Largest balance breaks
    // the tie.
    ledgerPersonId:
      [...ledgerAccounts]
        .filter((a) => a?.orgUserId && a.balanceCents !== 0)
        .sort(
          (a, b) =>
            (a.balanceCents > 0 ? 0 : 1) - (b.balanceCents > 0 ? 0 : 1) ||
            Math.abs(b.balanceCents) - Math.abs(a.balanceCents)
        )[0]?.orgUserId ??
      people.find((p) => p?.id)?.id,
    /* Each step of the close-out pipeline, so a spec can ask for the one booking
       whose panel actually shows the button or the notice it is a picture of. */
    // Notes preferred: this one is also the detail panel's own shot, and a panel with
    // an empty Notes row is a thinner illustration of the panel than one without.
    scheduledReservationId:
      pick((r) => step(r) === "rampOut" && r.resource?.type?.plane && billable(r) > 0 && r.notes)
        ?.id ??
      pick((r) => step(r) === "rampOut" && r.resource?.type?.plane && billable(r) > 0)?.id,
    rampedOutReservationId: pick((r) => step(r) === "rampIn" && !spansDays(r))?.id,
    overnightRampedOutReservationId: pick((r) => step(r) === "rampIn" && spansDays(r))?.id,
    groundReservationId: pick((r) => noMeters(r) && r.resource != null && step(r) === "rampOut")
      ?.id,
    awaitingReviewReservationId: pick(
      (r) => step(r) === "confirm" && (r.review?.reviewConfirmations ?? []).length > 0
    )?.id ?? pick((r) => step(r) === "confirm")?.id,
    guestReservationId: pick((r) => step(r) === "confirmGuest")?.id,
    // More than one person billed, and still open, which is when the shares can be
    // edited at all. The server refuses to change them once the invoices exist.
    splitReservationId: pick((r) => step(r) !== "invoiced" && billable(r) > 1)?.id,
    // Billed, and preferably split, so the summary carries its "one of N shares" line.
    invoicedReservationId: pick((r) => live(r) > 1)?.id ?? pick((r) => live(r) === 1)?.id,
    // Instruction with a student on it, far enough along that the close-out has
    // figures to prefill the training record from.
    trainingReservationId: pick(
      (r) =>
        ["dual", "ground", "sim", "solo"].includes(r.type) &&
        (r.personnel?.students ?? []).length > 0 &&
        (step(r) === "confirm" || step(r) === "reviewed")
    )?.id,
    // A trip that spans nights and has not been dispatched, so its form still opens.
    multiDayReservationId: pick((r) => spansDays(r) && step(r) === "rampOut")?.id,
    // One occurrence of a repeating booking, so cancelling it offers the three scopes.
    repeatingReservationId: pick((r) => r.series != null && step(r) === "rampOut")?.id,
    /* Tails, for the steps that have to pick an aircraft out of a combo box. Resolved
       rather than written into the manifest: which tail is grounded, and which is
       booked solid, differs between the local database and the test org on prod. */
    airworthinessTail: airworthiness?.type?.plane?.tailNumber,
    flyableTail: planes.find((p) => !p.type.plane.grounded)?.type?.plane?.tailNumber,
    freeTail: freePlane?.type?.plane?.tailNumber,
    enrolledStudentName: enrolledStudent,
    fullyBookedTail: bookedSolid?.resource?.type?.plane?.tailNumber,
    /* Two blocks in one lane on today's board, named by title because that is what a
       block's accessible name starts with. */
    dragSourceTitle: laneMates?.from?.title,
    dragTargetTitle: laneMates?.to?.title,
    /* Ramp-in readings, already advanced past the recorded ramp-OUT reading. The field
       arrives prefilled with the out reading, so without these every ramp-in shot is of
       a flight of 0.0 hours and the overnight notice compares its minimum against
       nothing. Hours, not tenths: the modal works in decimal hours. */
    rampInHobbs: hobbsAfter(pick((r) => step(r) === "rampIn" && !spansDays(r)), 1.4),
    overnightRampInHobbs: hobbsAfter(pick((r) => step(r) === "rampIn" && spansDays(r)), 1.5),
    /** Somebody who is actually on a dozen bookings, for the Personnel facet. */
    boardPersonId: busiestPerson,
  };

  const resolved = Object.entries(found).filter(([, v]) => v !== undefined);
  console.log(
    `  ids   ${resolved.map(([k, v]) => `${k}=${v}`).join(" ") || "none resolved"}\n`
  );
  return Object.fromEntries(resolved);
}

/** A ramp-in reading `hours` above what a booking ramped out at, as the field wants it. */
function hobbsAfter(reservation, hours) {
  const out = reservation?.review?.hobbsTimeOut;
  if (out == null) return undefined;
  return (out / 10 + hours).toFixed(1);
}

/** Substitute `{name}` in a route. Returns null if any placeholder is unknown. */
function fillPlaceholders(route, values) {
  let missing = false;
  const filled = route.replace(/\{(\w+)\}/g, (_, key) => {
    if (values[key] === undefined) {
      missing = true;
      return "";
    }
    return String(values[key]);
  });
  return missing ? null : filled;
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
 * The result is then padded on all four sides (see INNER and OUTER below). A crop cut flush
 * to a card's border reads as a mistake; a little of the page around it reads as a decision.
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

    // TWO KINDS OF BREATHING ROOM, and only the first one used to exist.
    //
    // INNER is slack inside the element, for the case this function is really for: content
    // that occupies a fraction of a wrapper reserving space for more. It is clamped to the
    // element's own rect, because growing past it there would pull in a neighbour.
    //
    // OUTER is the margin AROUND the element, and it is why the early captures looked
    // cramped. The old code had a `pad` of 8 that was clamped to `own` on every side, so on
    // any card with a border (which is most of them) the painted bounds already reached the
    // element edge and the padding resolved to nothing at all. Every image was cut flush to
    // the border, which reads as a crop that went slightly wrong rather than a deliberate one.
    //
    // Clamped to the viewport rather than to the element, so a card at the very edge of the
    // page still yields a valid clip instead of one Playwright refuses.
    const own = root.getBoundingClientRect();
    const INNER = 8;
    // 16 rather than something more generous on purpose. The console stacks cards with a 20px
    // gap, so anything above 20 reaches into the neighbour and the image ends on a sliver of
    // somebody else's rounded corner, which reads as a crop that slipped. 16 clears the gap and
    // still gives the subject room to sit in.
    const OUTER = 16;

    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    const left = Math.max(0, Math.max(own.left, bounds.left - INNER) - OUTER);
    const top = Math.max(0, Math.max(own.top, bounds.top - INNER) - OUTER);
    const right = Math.min(vw, Math.min(own.right, bounds.right + INNER) + OUTER);
    const bottom = Math.min(vh, Math.min(own.bottom, bounds.bottom + INNER) + OUTER);
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
