/**
 * Unit tests for the MDX to Markdown converter. Run: `npm run test:llms`
 * (node --test). Inputs are small and invented on purpose: real articles are
 * edited by other writers, and `scripts/check-llms.mjs` converts every one of
 * them on each build anyway.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mdxToMarkdown, assertCleanMarkdown } from "./mdx-markdown.mjs";

const SITE = "https://www.aerscheduler.com";
const shots = { known: { alt: "The board", caption: "A caption", src: "/docs/known.png" }, pending: null };
const md = (source, extra = {}) =>
  mdxToMarkdown(source, {
    file: "test.mdx",
    pageUrl: `${SITE}/docs/s/a`,
    siteUrl: SITE,
    resolveScreenshot: (id) => (id in shots ? shots[id] : undefined),
    ...extra,
  });

test("Callout: each type gets its label, a title replaces it", () => {
  assert.match(md("<Callout>Body.</Callout>"), /^> \*\*Note:\*\* Body\./m);
  assert.match(md('<Callout type="tip">Body.</Callout>'), /\*\*Tip:\*\* Body/);
  assert.match(md('<Callout type="warning">Body.</Callout>'), /\*\*Careful:\*\* Body/);
  assert.match(md('<Callout type="important">Body.</Callout>'), /\*\*Important:\*\* Body/);
  assert.match(md('<Callout type="tip" title="Heads up">Body.</Callout>'), /\*\*Tip: Heads up\.\*\* Body/);
  assert.match(md('<Callout type="warning" title="Mind it">Body.</Callout>'), /\*\*Careful: Mind it\.\*\* Body/);
});

test("Callout: lists and several paragraphs stay inside the blockquote", () => {
  const out = md("<Callout>\nFirst.\n\n- one\n- two\n\nLast.\n</Callout>");
  for (const line of out.trim().split("\n").filter(Boolean)) assert.match(line, /^>/);
});

test("Callout: a wrong prop fails, naming file and line", () => {
  assert.throws(() => md('Text.\n\n<Callout kind="warning">x</Callout>'), /test\.mdx:3:1: <Callout> does not take a "kind" prop/);
  assert.throws(() => md('<Callout type="danger">x</Callout>'), /must be one of/);
});

test("Steps: a numbered list with bold titles and no indented code blocks", () => {
  const out = md('<Steps>\n  <Step n={1} title="Open it">\n    Do this.\n\n    Then that.\n  </Step>\n  <Step n="2" title="Save" />\n</Steps>');
  assert.match(out, /^1\. \*\*Open it\*\*/m);
  assert.match(out, /^2\. \*\*Save\*\*/m);
  assert.match(out, /Do this\./);
  assert.doesNotMatch(out, /^ {4}\S/m, "no 4-space indented code block");
});

test("Steps: gaps, strays and outside steps fail", () => {
  assert.throws(() => md('<Steps>\n<Step n={1} title="a" />\n<Step n={3} title="b" />\n</Steps>'), /without gaps/);
  assert.throws(() => md('<Step n={1} title="a" />'), /must be inside <Steps>/);
  assert.throws(() => md("<Steps>\n<Callout>x</Callout>\n</Steps>"), /may only contain <Step>/);
});

test("Where: web, mobile and none; inline and on its own line; entities decode", () => {
  assert.match(md('Open <Where app="web">You &rarr; Schedule</Where> now.'), /Open `You → Schedule` \(web console\) now\./);
  assert.match(md('<Where app="mobile">Home</Where>'), /^`Home` \(mobile app\)$/m);
  assert.match(md("Go to <Where>Settings</Where>."), /Go to `Settings`\./);
  assert.throws(() => md("<Where app>Settings</Where>"), /must be "web" or "mobile"/);
});

test("Roles and Summary", () => {
  assert.match(md("<Roles>Owners, Admins</Roles>"), /^\*\*Who can do this:\*\* Owners, Admins$/m);
  assert.equal(md("<Summary>\nThe short answer.\n</Summary>").trim(), "The short answer.");
});

test("CardGrid and DocCard become absolute links", () => {
  const out = md('<CardGrid>\n<DocCard href="/docs/x/y" title="Y">The y page.</DocCard>\n<DocCard href="/docs/x/z" title="Z" />\n</CardGrid>');
  assert.match(out, /^- \[Y\]\(https:\/\/www\.aerscheduler\.com\/docs\/x\/y\): The y page\.$/m);
  assert.match(out, /^- \[Z\]\(https:\/\/www\.aerscheduler\.com\/docs\/x\/z\)$/m);
});

test("Screenshot: captured, pending and unknown", () => {
  assert.match(md('<Screenshot id="known" />'), /!\[The board\]\(https:\/\/www\.aerscheduler\.com\/docs\/known\.png\)\n\n_A caption_/);
  assert.equal(md('Before.\n\n<Screenshot id="pending" />\n\nAfter.').trim(), "Before.\n\nAfter.");
  assert.throws(() => md('<Screenshot id="nope" />'), /unknown screenshot id "nope"/);
});

test("A block-level strong keeps its own paragraph", () => {
  const out = md("Para one.\n\n<strong>\nBold block\n</strong>\n\nAfter.");
  assert.match(out, /Para one\.\n\n\*\*Bold block\*\*\n\nAfter\./);
});

test("A parse error names the file", () => {
  assert.throws(() => md("Text <!-- a comment --> here."), /test\.mdx.*MDX does not parse/);
});

test("HTML: strong, kbd, div allowed; anything else fails", () => {
  assert.match(md("Press <kbd>Enter</kbd> and <strong>save</strong>."), /Press `Enter` and \*\*save\*\*\./);
  assert.match(md("<div>\nInside.\n</div>"), /Inside\./);
  assert.throws(() => md("A <span>b</span>."), /<span> has no Markdown mapping/);
});

test("Fail closed: unknown components, expressions and imports", () => {
  assert.throws(() => md("Text.\n\n<Foo />"), /test\.mdx:3:1: <Foo> has no Markdown mapping/);
  assert.throws(() => md("Two is {1+1}."), /JavaScript expression/);
  assert.throws(() => md('import X from "y"\n\nText.'), /import\/export/);
  assert.equal(md("Kept.\n\n{/* a writer's note */}").trim(), "Kept.");
});

test("A sentence that wraps onto a line starting with 'export' is kept", () => {
  assert.match(md("You can download a CSV and\nexport it to your accountant."), /export it to your accountant/);
});

test("Code, inline code and tables are left alone", () => {
  const out = md("Use `<name>` here.\n\n```\n<Tag>\n```\n\n| a | b |\n| - | - |\n| 1 | 2 |");
  assert.match(out, /`<name>`/);
  assert.match(out, /```\n<Tag>\n```/);
  assert.match(out, /\| a +\| b +\|/);
});

test("Headings: H1 becomes H2, and the offset pushes them down", () => {
  assert.match(md("# Top\n\n## Sub"), /^## Top$/m);
  assert.match(md("## Sub", { headingOffset: 2 }), /^#### Sub$/m);
});

test("Links: site-relative and hash links become absolute", () => {
  assert.match(md("[a](/pricing) and [b](#faq)"), /\(https:\/\/www\.aerscheduler\.com\/pricing\).*\(https:\/\/www\.aerscheduler\.com\/docs\/s\/a#faq\)/);
});

test("Guard: catches leftover tags and artifacts, allows escaped placeholders", () => {
  assert.throws(() => assertCleanMarkdown("Hello <Callout>", "x"), /leftover JSX tag/);
  assert.throws(() => assertCleanMarkdown("value: undefined", "x"), /artifact/);
  assert.doesNotThrow(() => assertCleanMarkdown("It reads \\<Course name> enrollment fee", "x"));
  assert.doesNotThrow(() => assertCleanMarkdown("Code `<Callout>` is fine", "x"));
});
