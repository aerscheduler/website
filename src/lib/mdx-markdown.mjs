/**
 * Help article MDX to plain Markdown, for `/docs/<section>/<slug>.md`,
 * `/llms.txt` and `/llms-full.txt` (built 2026-10-16).
 *
 * Why a parser and not regex: step bodies are indented, callouts hold lists,
 * and `<Where>` sits both inline and on its own line. This parses with the
 * same remark-mdx the site's MDX loader uses, so what an AI reads is the same
 * document a person reads, and a sentence that happens to wrap onto a line
 * starting with "export" stays a sentence (the search index regex drops it).
 *
 * FAIL CLOSED. Every component and tag has an explicit mapping below, with its
 * props checked. Anything unknown, any `{expression}`, and any import/export
 * throws an `MdxMarkdownError` naming the file and line, which fails the build.
 * A new docs component therefore cannot leak raw JSX into the Markdown: it has
 * to be given a mapping here first (`HANDLED_COMPONENTS`, checked against
 * `src/mdx-components.tsx` by `scripts/check-llms.mjs`).
 *
 * Plain ESM JavaScript with no `@/` imports, so the Next route handlers, the
 * check script and `node --test` all run this one file.
 */
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";

/** Components the converter knows. Must cover every key `useMDXComponents` injects. */
export const HANDLED_COMPONENTS = [
  "Callout",
  "CardGrid",
  "DocCard",
  "Roles",
  "Screenshot",
  "Step",
  "Steps",
  "Summary",
  "Where",
];

/** The labels `CALLOUTS` in `src/components/docs/blocks.tsx` shows. */
const CALLOUT_LABELS = { note: "Note", tip: "Tip", warning: "Careful", important: "Important" };

const COMMENT_ONLY = /^\s*\/\*[\s\S]*\*\/\s*$/;

export class MdxMarkdownError extends Error {
  /** @param {string} message @param {string} file @param {any} node */
  constructor(message, file, node) {
    const at = node?.position?.start ? `:${node.position.start.line}:${node.position.start.column}` : "";
    super(`${file}${at}: ${message}`);
    this.name = "MdxMarkdownError";
  }
}

/**
 * @typedef {{ alt: string, caption?: string, src: string } | null | undefined} ScreenshotInfo
 * `undefined`: unknown id (fails). `null`: known but not captured yet (dropped).
 */

/**
 * @param {string} source  The raw .mdx text.
 * @param {{
 *   file: string,
 *   pageUrl: string,
 *   siteUrl: string,
 *   headingOffset?: number,
 *   resolveScreenshot: (id: string) => ScreenshotInfo,
 * }} opts
 * @returns {string}
 */
export function mdxToMarkdown(source, opts) {
  let tree;
  try {
    tree = unified().use(remarkParse).use(remarkMdx).use(remarkGfm).parse(source);
  } catch (error) {
    // The MDX parser's own message has a position but not the file.
    const e = /** @type {any} */ (error);
    const at = e?.line ? `:${e.line}:${e.column ?? 1}` : "";
    throw new MdxMarkdownError(`MDX does not parse${at ? ` (at${at})` : ""}: ${e?.reason ?? e?.message ?? e}`, opts.file, e?.place ? { position: { start: e.place.start ?? e.place } } : null);
  }
  const ctx = { ...opts, headingOffset: opts.headingOffset ?? 0 };
  tree.children = flow(tree.children, ctx);
  const out = unified()
    .use(remarkGfm)
    .use(remarkStringify, {
      bullet: "-",
      emphasis: "_",
      strong: "*",
      fences: true,
      listItemIndent: "one",
      rule: "-",
    })
    .stringify(/** @type {any} */ (tree));
  return out.trim() + "\n";
}

/* ------------------------------------------------------------------ */
/* Tree walking                                                        */
/* ------------------------------------------------------------------ */

/** Components that are blocks even when written on one line (`<Callout>Body.</Callout>`). */
const BLOCK_COMPONENTS = new Set(["Callout", "CardGrid", "DocCard", "Roles", "Screenshot", "Step", "Steps", "Summary"]);

const isBlank = (n) => n.type === "text" && !n.value.trim();

/**
 * MDX parses a block component written on one line as a paragraph holding an
 * inline element. Read it as the block it is: a paragraph whose only content is
 * block components becomes those components, written as flow elements, with any
 * loose inline children wrapped in a paragraph of their own.
 */
function asBlock(el) {
  const kids = el.children.filter((c) => !isBlank(c));
  const allBlocks = kids.length > 0 && kids.every((c) => c.type === "mdxJsxTextElement" && BLOCK_COMPONENTS.has(c.name));
  return {
    ...el,
    type: "mdxJsxFlowElement",
    children: allBlocks ? kids.map(asBlock) : kids.length ? [{ type: "paragraph", children: el.children, position: el.position }] : [],
  };
}

/** A block's children, with one-line block components unwrapped from their paragraphs. */
function blockChildren(nodes) {
  return nodes.flatMap((node) => {
    if (node.type === "paragraph") {
      const kids = node.children.filter((c) => !isBlank(c));
      if (kids.length > 0 && kids.every((c) => c.type === "mdxJsxTextElement" && BLOCK_COMPONENTS.has(c.name))) return kids.map(asBlock);
    }
    return [node];
  });
}

/** Transform a list of flow (block) nodes. */
function flow(nodes, ctx) {
  return nodes.flatMap((node) => {
    if (node.type === "paragraph") {
      const kids = node.children.filter((c) => !isBlank(c));
      if (kids.length > 0 && kids.every((c) => c.type === "mdxJsxTextElement" && BLOCK_COMPONENTS.has(c.name))) {
        return kids.flatMap((c) => transform(asBlock(c), ctx));
      }
    }
    return transform(node, ctx);
  });
}

/** Transform a list of phrasing (inline) nodes. */
function phrasing(nodes, ctx) {
  return nodes.flatMap((node) => transform(node, ctx));
}

/** @returns {any[]} replacement nodes */
function transform(node, ctx) {
  switch (node.type) {
    case "mdxjsEsm":
      throw new MdxMarkdownError("import/export statements are not allowed in an article; components are injected globally", ctx.file, node);
    case "mdxFlowExpression":
    case "mdxTextExpression":
      if (COMMENT_ONLY.test(node.value)) return [];
      throw new MdxMarkdownError(`JavaScript expression {${node.value.trim().slice(0, 40)}} is not allowed in an article`, ctx.file, node);
    case "mdxJsxFlowElement":
    case "mdxJsxTextElement":
      return element(node, ctx, node.type === "mdxJsxFlowElement" ? "flow" : "phrasing");
    case "heading": {
      const depth = Math.min(6, Math.max(2, node.depth) + ctx.headingOffset);
      return [{ ...node, depth, children: phrasing(node.children, ctx) }];
    }
    case "link":
      return [{ ...node, url: absolute(node.url, ctx), children: phrasing(node.children, ctx) }];
    case "image":
      return [{ ...node, url: absolute(node.url, ctx) }];
    case "html":
      throw new MdxMarkdownError("raw HTML is not allowed in an article", ctx.file, node);
    case "code":
    case "inlineCode":
    case "text":
    case "thematicBreak":
    case "break":
      return [node];
    default:
      if (Array.isArray(node.children)) return [{ ...node, children: flow(node.children, ctx) }];
      return [node];
  }
}

/* ------------------------------------------------------------------ */
/* Components                                                          */
/* ------------------------------------------------------------------ */

function element(node, ctx, where) {
  const name = node.name;
  if (!name) throw new MdxMarkdownError("JSX fragments are not allowed in an article", ctx.file, node);
  const attrs = readAttributes(node, ctx);

  switch (name) {
    case "Summary": {
      onlyProps(attrs, [], node, ctx);
      return where === "flow" ? flow(node.children, ctx) : phrasing(node.children, ctx);
    }

    case "Roles": {
      onlyProps(attrs, [], node, ctx);
      const roles = plainText(node).replace(/\s+/g, " ").trim();
      if (!roles) throw new MdxMarkdownError("<Roles> is empty", ctx.file, node);
      const inline = [
        { type: "strong", children: [{ type: "text", value: "Who can do this:" }] },
        { type: "text", value: ` ${roles}` },
      ];
      return where === "flow" ? [{ type: "paragraph", children: inline }] : inline;
    }

    case "Where": {
      onlyProps(attrs, ["app"], node, ctx);
      if ("app" in attrs && attrs.app !== "web" && attrs.app !== "mobile") {
        throw new MdxMarkdownError(`<Where app> must be "web" or "mobile", got ${JSON.stringify(attrs.app)}`, ctx.file, node);
      }
      const path = plainText(node).replace(/\s+/g, " ").trim();
      /** @type {any[]} */
      const inline = [{ type: "inlineCode", value: path }];
      if (attrs.app) inline.push({ type: "text", value: attrs.app === "web" ? " (web console)" : " (mobile app)" });
      return where === "flow" ? [{ type: "paragraph", children: inline }] : inline;
    }

    case "Callout": {
      if (where !== "flow") throw new MdxMarkdownError("<Callout> must be on its own lines", ctx.file, node);
      onlyProps(attrs, ["type", "title"], node, ctx);
      const type = attrs.type ?? "note";
      if (!(type in CALLOUT_LABELS)) {
        throw new MdxMarkdownError(`<Callout type> must be one of ${Object.keys(CALLOUT_LABELS).join(", ")}, got ${JSON.stringify(type)}`, ctx.file, node);
      }
      // A titled callout keeps its kind, so a warning still reads as one: "Careful: None means you invoice by hand."
      const kind = CALLOUT_LABELS[/** @type {keyof typeof CALLOUT_LABELS} */ (type)];
      const label = attrs.title ? `${kind}: ${attrs.title}.` : `${kind}:`;
      const body = flow(node.children, ctx);
      const lead = { type: "strong", children: [{ type: "text", value: label }] };
      if (body[0]?.type === "paragraph") {
        body[0] = { ...body[0], children: [lead, { type: "text", value: " " }, ...body[0].children] };
      } else {
        body.unshift({ type: "paragraph", children: [lead] });
      }
      return [{ type: "blockquote", children: body }];
    }

    case "Steps": {
      if (where !== "flow") throw new MdxMarkdownError("<Steps> must be on its own lines", ctx.file, node);
      onlyProps(attrs, [], node, ctx);
      const steps = blockChildren(node.children).filter((c) => !(c.type === "mdxFlowExpression" && COMMENT_ONLY.test(c.value)));
      const items = steps.map((child, i) => {
        if (child.type !== "mdxJsxFlowElement" || child.name !== "Step") {
          throw new MdxMarkdownError("<Steps> may only contain <Step> elements", ctx.file, child);
        }
        const s = readAttributes(child, ctx);
        onlyProps(s, ["n", "title"], child, ctx);
        if (Number(s.n) !== i + 1) {
          throw new MdxMarkdownError(`<Step n> must count 1, 2, 3 without gaps; expected ${i + 1}, got ${JSON.stringify(s.n)}`, ctx.file, child);
        }
        if (!s.title || s.title === true) throw new MdxMarkdownError("<Step> needs a title", ctx.file, child);
        return {
          type: "listItem",
          spread: true,
          children: [
            { type: "paragraph", children: [{ type: "strong", children: [{ type: "text", value: s.title }] }] },
            ...flow(child.children, ctx),
          ],
        };
      });
      return [{ type: "list", ordered: true, start: 1, spread: true, children: items }];
    }

    case "Step":
      throw new MdxMarkdownError("<Step> must be inside <Steps>", ctx.file, node);

    case "Screenshot": {
      onlyProps(attrs, ["id", "className"], node, ctx);
      if (!attrs.id || attrs.id === true) throw new MdxMarkdownError("<Screenshot> needs an id", ctx.file, node);
      const shot = ctx.resolveScreenshot(attrs.id);
      if (shot === undefined) {
        throw new MdxMarkdownError(`unknown screenshot id "${attrs.id}"; add it to src/lib/docs-screenshots.ts`, ctx.file, node);
      }
      // Known but not captured yet: the page shows a placeholder frame, the Markdown says nothing.
      if (shot === null) return [];
      /** @type {any[]} */
      const nodes = [{ type: "paragraph", children: [{ type: "image", url: absolute(shot.src, ctx), alt: shot.alt, title: null }] }];
      if (shot.caption) nodes.push({ type: "paragraph", children: [{ type: "emphasis", children: [{ type: "text", value: shot.caption }] }] });
      return where === "flow" ? nodes : nodes.flatMap((p) => p.children);
    }

    case "CardGrid": {
      if (where !== "flow") throw new MdxMarkdownError("<CardGrid> must be on its own lines", ctx.file, node);
      onlyProps(attrs, ["columns"], node, ctx);
      const items = blockChildren(node.children).map((child) => {
        if (child.type !== "mdxJsxFlowElement" || child.name !== "DocCard") {
          throw new MdxMarkdownError("<CardGrid> may only contain <DocCard> elements", ctx.file, child);
        }
        return { type: "listItem", spread: false, children: [docCard(child, ctx)] };
      });
      return [{ type: "list", ordered: false, spread: false, children: items }];
    }

    case "DocCard":
      return where === "flow" ? [docCard(node, ctx)] : docCard(node, ctx).children;

    case "strong": {
      onlyProps(attrs, [], node, ctx);
      const strong = { type: "strong", children: phrasing(blockChildren(node.children).flatMap((c) => (c.type === "paragraph" ? c.children : [c])), ctx) };
      // On its own lines it is a block: keep it in a paragraph so it cannot run into its neighbours.
      return where === "flow" ? [{ type: "paragraph", children: [strong] }] : [strong];
    }

    case "kbd": {
      onlyProps(attrs, [], node, ctx);
      const code = { type: "inlineCode", value: plainText(node).trim() };
      return where === "flow" ? [{ type: "paragraph", children: [code] }] : [code];
    }

    case "div":
      onlyProps(attrs, ["className"], node, ctx);
      return where === "flow" ? flow(node.children, ctx) : phrasing(node.children, ctx);

    default:
      throw new MdxMarkdownError(
        `<${name}> has no Markdown mapping; add one in src/lib/mdx-markdown.mjs (and to HANDLED_COMPONENTS if it is a docs component)`,
        ctx.file,
        node
      );
  }
}

/** A DocCard as one paragraph: `[title](url): description`. */
function docCard(node, ctx) {
  const a = readAttributes(node, ctx);
  onlyProps(a, ["href", "title"], node, ctx);
  if (!a.href || !a.title || a.href === true || a.title === true) {
    throw new MdxMarkdownError("<DocCard> needs href and title", ctx.file, node);
  }
  const description = plainText(node).replace(/\s+/g, " ").trim();
  /** @type {any[]} */
  const children = [{ type: "link", url: absolute(a.href, ctx), title: null, children: [{ type: "text", value: a.title }] }];
  if (description) children.push({ type: "text", value: `: ${description}` });
  return { type: "paragraph", children };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/**
 * Attributes as plain strings. A bare attribute (`<Where app>`) reads as
 * `true`, which the per-component checks reject; an expression value is only
 * allowed when it is a plain number (`n={1}`).
 */
function readAttributes(node, ctx) {
  /** @type {Record<string, any>} */
  const out = {};
  for (const attr of node.attributes ?? []) {
    if (attr.type !== "mdxJsxAttribute") throw new MdxMarkdownError(`spread props are not allowed on <${node.name}>`, ctx.file, node);
    if (attr.value === null || attr.value === undefined) out[attr.name] = true;
    else if (typeof attr.value === "string") out[attr.name] = attr.value;
    else if (/^\s*-?\d+(\.\d+)?\s*$/.test(attr.value.value)) out[attr.name] = attr.value.value.trim();
    else throw new MdxMarkdownError(`<${node.name} ${attr.name}={...}> must be a string or a plain number`, ctx.file, node);
  }
  return out;
}

function onlyProps(attrs, allowed, node, ctx) {
  for (const key of Object.keys(attrs)) {
    if (!allowed.includes(key)) {
      const hint = allowed.length ? ` (allowed: ${allowed.join(", ")})` : "";
      throw new MdxMarkdownError(`<${node.name}> does not take a "${key}" prop${hint}`, ctx.file, node);
    }
  }
}

/** Text content of a node and its descendants. */
function plainText(node) {
  if (node.type === "text" || node.type === "inlineCode") return node.value;
  if (node.type === "mdxTextExpression" || node.type === "mdxFlowExpression") return "";
  if (Array.isArray(node.children)) return node.children.map(plainText).join(node.type === "mdxJsxFlowElement" ? " " : "");
  return "";
}

/** Site-relative and hash links become absolute, so the Markdown stands alone. */
function absolute(url, ctx) {
  if (!url) return url;
  if (url.startsWith("#")) return `${ctx.pageUrl}${url}`;
  if (url.startsWith("/")) return `${ctx.siteUrl}${url}`;
  return url;
}

/* ------------------------------------------------------------------ */
/* Output guard                                                        */
/* ------------------------------------------------------------------ */

const EM_DASH = new RegExp("[\\u2014\\u2015\\u2E3A\\u2E3B]"); // em-dash-ok (the pattern names the banned characters)
const DOUBLE_HYPHEN = /[A-Za-z]--[A-Za-z]/;
const SPACED_EN_DASH = new RegExp(" \\u2013 "); // em-dash-ok

/**
 * Throws if converted text still carries markup or a banned dash. Code spans and
 * fences are ignored, because a docs article may legitimately show `<name>`.
 * @param {string} text @param {string} label
 */
export function assertCleanMarkdown(text, label) {
  const prose = text.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
  /** @type {[RegExp, string][]} */
  const checks = [
    // An escaped `\<Course name>` is prose (a placeholder the article spells out), not markup.
    [/(?<!\\)<[A-Z][A-Za-z]*[\s/>]/, "a leftover JSX tag"],
    [/\{\/\*/, "a leftover MDX comment"],
    [EM_DASH, "an em dash"],
    [SPACED_EN_DASH, "a spaced en dash"],
    [DOUBLE_HYPHEN, "a double hyphen used as a dash"],
    [/\bundefined\b|\[object Object\]|\bNaN\b|\$\{/, "a template or rendering artifact"],
  ];
  for (const [re, what] of checks) {
    const m = prose.match(re);
    if (m) {
      const i = m.index ?? 0;
      const at = prose.slice(Math.max(0, i - 40), i + 40).replace(/\n/g, " ");
      throw new Error(`${label}: output contains ${what}: "...${at}..."`);
    }
  }
}
