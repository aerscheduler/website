import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * The on-page "On this page" rail, derived from the MDX source at build time.
 *
 * Split out of `lib/docs.ts` rather than living beside the registry because
 * this file reaches for `node:fs`, and the registry is imported by
 * `lib/resources.ts`, which feeds the site header, which is a client component.
 * One `node:fs` import anywhere in that chain fails the client bundle. Keeping
 * the registry pure data means it can be read from either side.
 *
 * Headings are read from the source rather than from rendered output because
 * the rail is a sibling of the article, not a child, so it never sees the
 * article's DOM. The ids are generated the way `rehype-slug` generates them,
 * which is what makes the anchors line up.
 */

export type TocEntry = { id: string; text: string; level: 2 | 3 };

const CONTENT_ROOT = path.join(process.cwd(), "src", "content", "docs");

export function tableOfContents(sectionSlug: string, articleSlug: string): TocEntry[] {
  let source: string;
  try {
    source = readFileSync(path.join(CONTENT_ROOT, sectionSlug, `${articleSlug}.mdx`), "utf8");
  } catch {
    return [];
  }

  const entries: TocEntry[] = [];
  const seen = new Map<string, number>();
  let inFence = false;

  for (const line of source.split("\n")) {
    // A `# comment` inside a shell sample is not a section heading.
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = stripInlineMarkdown(match[2]);
    entries.push({ id: uniqueSlug(slugify(text), seen), text, level });
  }

  return entries;
}

/** Mirrors github-slugger, which is what rehype-slug uses. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\p{M}\p{Pd} _]/gu, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlug(base: string, seen: Map<string, number>): string {
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .trim();
}
