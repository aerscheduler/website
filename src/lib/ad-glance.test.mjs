import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { faaCovers, faaRequires, faaWhy, glanceTitle, sentences, verbatim } from "./ad-glance.mjs";

/** Ten real ADs as the public API serves them (summary, unsafe condition, filing), 1997 to 2026. */
const ADS = JSON.parse(readFileSync(new URL("./ad-glance.fixtures.json", import.meta.url), "utf8"));
const ad = (n) => ADS.find((a) => a.adNumber === n);
const flat = (s) => (s ?? "").replace(/\s+/g, " ");

test("every glance line is the FAA's own text, character for character", () => {
  for (const a of ADS) {
    const source = `${flat(a.summary)} ${flat(a.unsafeCondition)}`;
    for (const line of [...(faaRequires(a) ?? []), faaWhy(a), faaCovers(a)].filter(Boolean)) {
      assert.ok(source.includes(line), `AD ${a.adNumber}: "${line}" is not in its text`);
    }
  }
});

test("verbatim refuses anything the source does not say", () => {
  assert.equal(verbatim("Inspect the valve.", "You must inspect the valve."), null);
  assert.equal(verbatim("inspect  the\nvalve", "You must inspect the valve."), "inspect the valve");
});

test("sentences survive decimals and company names", () => {
  assert.deepEqual(sentences("Trim 0.25 inch. Piper Aircraft, Inc. (Piper) PA-28 airplanes. STC No. SA03303AT applies."), [
    "Trim 0.25 inch.",
    "Piper Aircraft, Inc. (Piper) PA-28 airplanes.",
    "STC No. SA03303AT applies.",
  ]);
});

test("what it requires: every 'This AD requires' sentence, never the boilerplate", () => {
  assert.deepEqual(faaRequires(ad("2008-26-10")), [
    "This AD requires you to inspect the alternate static air source selector valve to assure that the part number identification placard does not obstruct the alternate static air source selector valve port.",
    "If the part number identification placard obstructs the port, this AD also requires you to remove the placard, assure that the port is unobstructed, and report to the FAA if obstruction is found.",
  ]);
  assert.deepEqual(faaRequires(ad("2024-02-05"))?.length, 2, "the 'also prohibits' sentence counts");
  // "We are issuing this AD to require actions to correct the unsafe condition" says nothing.
  assert.equal(faaRequires(ad("2008-14-06")), null);
  // "an existing AD ... that currently requires" describes the old AD, not this one.
  assert.equal(faaRequires(ad("97-15-11")), null);
});

test("why: the specific hazard, never 'to address the unsafe condition'", () => {
  assert.match(faaWhy(ad("2026-14-07")) ?? "", /^The FAA is issuing this AD to detect and correct a crack in the pilot cyclic stick tube/);
  assert.match(faaWhy(ad("97-15-11")) ?? "", /intended to prevent piston pin failure/);
  assert.equal(faaWhy(ad("2008-14-06")), null);
  assert.equal(faaWhy(ad("2019-08-10")), null);
});

test("who it covers: the opening's own words, not a pointer elsewhere", () => {
  assert.equal(faaCovers(ad("2010-15-10")), "certain Piper Aircraft, Inc. (Piper) PA-28, PA-32, PA-34, and PA-44 series airplanes");
  assert.equal(faaCovers(ad("2026-14-07")), "certain Bell Textron Canada Limited (Bell) Model 407 helicopters");
  // "the products listed above" and "the specified helicopters" mean nothing on their own.
  assert.equal(faaCovers(ad("2010-26-04")), null);
  assert.equal(faaCovers(ad("2008-14-06")), null);
});

test("titles: maker and model families, short enough for a search result", () => {
  assert.equal(glanceTitle(ad("2008-26-10"), null), "AD 2008-26-10: Cessna 172, 182, 180 and more");
  assert.equal(glanceTitle(ad("97-15-11"), null), "AD 97-15-11: Lycoming O-320, O-360, IO-360 and more");
  assert.equal(glanceTitle(ad("2026-14-07"), "Main rotor control"), "AD 2026-14-07: Bell 407, 206, main rotor control");
  // An index label without a model ("Lycoming LYCOMING") gives no title: the old one stays.
  assert.equal(glanceTitle(ad("2017-16-11"), null), null);
  for (const a of ADS) assert.ok((glanceTitle(a, "Engine oil pressure") ?? "").length <= 60, a.adNumber);
});
