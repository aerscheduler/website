import ecfr from "@/content/regulations/ecfr.json";
import { PARTS, REGULATIONS, TOPICS } from "@/content/regulations/registry.mjs";
import { SUMMARIES } from "@/content/regulations/sections/index.mjs";
import type { RegSummary } from "@/content/regulations/types";
import { SITE_URL } from "@/lib/site";

/**
 * The plain-English regulations library (www.aerscheduler.com/regulations).
 *
 * Three sources joined here:
 *   - `content/regulations/registry.mjs`: which sections, their topic and name
 *   - `content/regulations/ecfr.json`: the official text, from `scripts/sync-ecfr.mjs`
 *   - `content/regulations/sections/*.mjs`: our plain-English summary of each
 *
 * The official text is the eCFR's, a US government work, shown verbatim under
 * every summary so a reader can check us in one click. The summaries are ours,
 * written against a specific version of the text (`textHash`);
 * `scripts/check-regulations.mjs` fails the build when the two drift apart.
 *
 * Everything is static: no API, no request-time reads. A new section is a line
 * in the registry, a summary, and a sync.
 */

export const REG_BASE = "/regulations";

export type RegTopic = (typeof TOPICS)[number];
export type RegPart = (typeof PARTS)[number];

export type RegBlock =
  | { type: "para"; id: string; label: string; text: string }
  | { type: "text"; text: string; id?: string }
  | { type: "heading"; text: string }
  | { type: "table"; head: string[]; rows: string[][]; id?: string };

export type RegText = {
  cite: string;
  heading: string;
  part: string;
  partTitle: string | null;
  subpart: { label: string; title: string } | null;
  amendedOn: string | null;
  hash: string;
  blocks: RegBlock[];
};

export type Reg = {
  cite: string;
  slug: string;
  kind: "section" | "appendix";
  part: string;
  topic: string;
  /** Our short name for the page: "Annual and 100-hour inspections". */
  name: string;
  ecfrId?: string;
  official: RegText;
  summary: RegSummary;
};

const TEXT = (ecfr as unknown as { upToDateAsOf: string; sections: Record<string, RegText> }).sections;
/** The date the eCFR said Title 14 was current as of when the snapshot was taken. */
export const TEXT_AS_OF = (ecfr as unknown as { upToDateAsOf: string }).upToDateAsOf;
const SUMMARY_BY_CITE = new Map(SUMMARIES.map((s) => [s.cite, s]));

/**
 * Every section that has both its official text and a summary, in registry
 * order. A section missing either is left off the site here and fails the build
 * in check-regulations.mjs, so it is never silently half-published.
 */
export const REGS: Reg[] = REGULATIONS.flatMap((r) => {
  const official = TEXT[r.cite];
  const summary = SUMMARY_BY_CITE.get(r.cite);
  return official && summary ? [{ ...r, official, summary } as Reg] : [];
});

const BY_SLUG = new Map(REGS.map((r) => [r.slug, r]));
const BY_CITE = new Map(REGS.map((r) => [r.cite, r]));

export const regHref = (slug: string) => `${REG_BASE}/${slug}`;
export const partSlug = (part: string) => `part-${part}`;
export const partHref = (part: string) => `${REG_BASE}/${partSlug(part)}`;
export const getReg = (slug: string) => BY_SLUG.get(slug);
export const regByCite = (cite: string) => BY_CITE.get(cite);
export const getPart = (slug: string) => PARTS.find((p) => partSlug(p.part) === slug);
export const getTopic = (slug: string) => TOPICS.find((t) => t.slug === slug);
export const regsInTopic = (topic: string) => REGS.filter((r) => r.topic === topic);
export const regsInPart = (part: string) =>
  REGS.filter((r) => r.part === part).sort((a, b) => sortKey(a).localeCompare(sortKey(b), "en", { numeric: true }));
/** Parts that have at least one page, in registry order. */
export const PARTS_WITH_PAGES = PARTS.filter((p) => REGS.some((r) => r.part === p.part));

/** Sections before appendices, then by section number. */
const sortKey = (r: Reg) => (r.kind === "appendix" ? `z ${r.cite}` : r.cite.padStart(12, "0"));

/** "Appendix A" from "Appendix A to Part 43". */
const appendixLetter = (r: Reg) => /Appendix ([A-Z])/.exec(r.ecfrId ?? "")?.[1] ?? "";

/** "14 CFR 91.409" or "14 CFR Part 43, Appendix A". */
export function fullCite(r: Reg): string {
  return r.kind === "appendix" ? `14 CFR Part ${r.part}, Appendix ${appendixLetter(r)}` : `14 CFR ${r.cite}`;
}

/** "91.409" or "Part 43 App. A", for lists and breadcrumbs. */
export function shortCite(r: Reg): string {
  return r.kind === "appendix" ? `Part ${r.part} App. ${appendixLetter(r)}` : r.cite;
}

/** How pilots search for it: "FAR 91.409", "FAR 43 Appendix A". */
export function farCite(r: Reg): string {
  return r.kind === "appendix" ? `FAR Part ${r.part} Appendix ${appendixLetter(r)}` : `FAR ${r.cite}`;
}

/** The section on ecfr.gov, current version. */
export function ecfrUrl(r: Reg): string {
  if (r.kind === "appendix") return `https://www.ecfr.gov/current/title-14/part-${r.part}/appendix-${encodeURIComponent(r.ecfrId ?? "")}`;
  return `https://www.ecfr.gov/current/title-14/section-${r.cite}`;
}

/** The page title: "14 CFR 91.409: Annual and 100-hour inspections". */
export const regTitle = (r: Reg) => `${fullCite(r)}: ${r.name}`;

/* ------------------------------------------------------------------ */
/* The one line about AerScheduler                                     */
/* ------------------------------------------------------------------ */

/**
 * One sentence per topic naming the feature that tracks the rule, linking to its
 * feature page. A summary overrides it with `product`, or sets `product: null`
 * for a rule the product does not track: claiming a feature for 91.17 would be
 * the kind of overreach that makes a reference page read as an ad.
 *
 * Every claim here is checked against the feature copy in `lib/features.ts`.
 */
const PRODUCT_BY_TOPIC: Record<string, { text: string; href: string }> = {
  "owning-an-aircraft": {
    text: "AerScheduler keeps each aircraft's inspections and squawks in one place, and a grounded aircraft comes off the schedule.",
    href: "/features/maintenance",
  },
  inspections: {
    text: "AerScheduler tracks the annual, 100-hour, transponder, pitot-static, ELT and VOR checks by hours and calendar months, and takes an aircraft off the schedule when its annual lapses.",
    href: "/features/inspections",
  },
  "maintenance-records": {
    text: "AerScheduler keeps inspections, squawks and work orders on each aircraft. It tracks the status; the signed logbook stays the record.",
    href: "/features/maintenance",
  },
  "airworthiness-directives": {
    text: "AerScheduler lists the ADs that name each of your aircraft, records who decided each one, and tracks the repeat inspections that follow.",
    href: "/features/inspections",
  },
  "pilots-and-renters": {
    text: "AerScheduler tracks each member's medical, flight review and checkouts, and can refuse a booking when one has lapsed.",
    href: "/features/compliance",
  },
  "instructors-and-students": {
    text: "AerScheduler grades lessons off the flights already booked and keeps the endorsements an instructor signs with the student's record.",
    href: "/features/training",
  },
  "running-a-flight-school": {
    text: "AerScheduler enrolls each student against a version of your syllabus and keeps their lessons, grades and endorsements together.",
    href: "/features/training",
  },
};

export function productFor(r: Reg): { text: string; href: string } | null {
  if (r.summary.product === null) return null;
  return r.summary.product ?? PRODUCT_BY_TOPIC[r.topic] ?? null;
}

/* ------------------------------------------------------------------ */
/* Official text helpers                                               */
/* ------------------------------------------------------------------ */

/** Nesting depth of a paragraph anchor: "b" is 0, "b-1-i" is 2. */
export const depthOf = (id: string) => id.split("-").length - 1;

/** "(b)(1)(i)" from "b-1-i", for citing a paragraph in prose. */
export const paraLabel = (id: string) =>
  id
    .split("-")
    .map((p) => `(${p})`)
    .join("");

/** The anchor a point cites, or the first paragraph under it (a run-in heading like Appendix A's (a) has no anchor of its own). */
export function resolvePara(r: Reg, para: string): string | null {
  const ids = r.official.blocks.flatMap((b) => (b.type === "para" ? [b.id] : []));
  if (ids.includes(para)) return para;
  return ids.find((id) => id.startsWith(`${para}-`)) ?? null;
}

/* ------------------------------------------------------------------ */
/* Markdown                                                            */
/* ------------------------------------------------------------------ */

const abs = (href: string) => (href.startsWith("http") ? href : `${SITE_URL}${href}`);

/** The Markdown twin of a regulation page, served at /regulations/<slug>.md. */
export function regMarkdown(r: Reg): string {
  const product = productFor(r);
  const out: string[] = [
    `# ${regTitle(r)}`,
    "",
    `> ${r.summary.answer}`,
    "",
    `Source: ${abs(regHref(r.slug))}`,
    `Official text: ${ecfrUrl(r)} (eCFR, current as of ${TEXT_AS_OF}${r.official.amendedOn ? `; section last amended ${r.official.amendedOn}` : ""})`,
    "",
    "## In plain English",
    "",
    ...r.summary.points.map((p) =>
      p.para ? `- ${p.text} [${paraLabel(p.para)}](${abs(regHref(r.slug))}#${resolvePara(r, p.para) ?? p.para})` : `- ${p.text}`
    ),
    "",
    "## Common questions",
    "",
  ];
  for (const f of r.summary.faqs) out.push(`**${f.q}**`, "", f.a, "");
  out.push(`## Official text of ${fullCite(r)}`, "", `${r.official.heading}.`, "");
  for (const b of r.official.blocks) {
    if (b.type === "para") out.push(`${"  ".repeat(depthOf(b.id))}${b.label} ${b.text}`, "");
    else if (b.type === "text") out.push(b.text, "");
    else if (b.type === "heading") out.push(`### ${b.text}`, "");
    else {
      const cell = (t: string) => t.replace(/\|/g, "\\|");
      out.push(`| ${b.head.map(cell).join(" | ")} |`, `| ${b.head.map(() => "---").join(" | ")} |`);
      for (const row of b.rows) out.push(`| ${row.map(cell).join(" | ")} |`);
      out.push("");
    }
  }
  const related = r.summary.related.map(regByCite).filter((x): x is Reg => !!x);
  if (related.length || r.summary.links?.length) {
    out.push("## Related", "");
    for (const x of related) out.push(`- [${regTitle(x)}](${abs(regHref(x.slug))}.md)`);
    for (const l of r.summary.links ?? []) out.push(`- [${l.label}](${abs(l.href)})`);
    out.push("");
  }
  if (product) out.push(`${product.text} [${abs(product.href)}](${abs(product.href)})`, "");
  out.push(
    "_The plain-English summary is AerScheduler's reading of the rule, not legal advice. The official text above is the eCFR's, published by the Office of the Federal Register; the eCFR is the current text._"
  );
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

/** The Markdown twin of a Part's index page, served at /regulations/part-<n>.md. */
export function partMarkdown(part: RegPart): string {
  const out = [
    `# 14 CFR Part ${part.part}: ${part.title}`,
    "",
    `> ${part.blurb}`,
    "",
    `Source: ${abs(partHref(part.part))}`,
    `Full text of Part ${part.part}: https://www.ecfr.gov/current/title-14/part-${part.part}`,
    "",
    ...regsInPart(part.part).map((r) => `- [${regTitle(r)}](${abs(regHref(r.slug))}.md): ${r.summary.answer}`),
  ];
  return out.join("\n").trim() + "\n";
}

/** The Markdown twin of the hub, served at /regulations.md. */
export function hubMarkdown(): string {
  const out = [
    "# FAA regulations in plain English",
    "",
    `> The ${REGS.length} sections of 14 CFR (the FARs) that aircraft owners, flight schools, mechanics, instructors and renters look up most, each explained in plain English beside the official eCFR text. Text current as of ${TEXT_AS_OF}.`,
    "",
    `Source: ${abs(REG_BASE)}`,
    `Data: ${abs(`${REG_BASE}/data.json`)}`,
  ];
  for (const t of TOPICS) {
    const regs = regsInTopic(t.slug);
    if (!regs.length) continue;
    out.push("", `## ${t.title}`, "", `${t.blurb} For: ${t.audience}.`, "");
    for (const r of regs) out.push(`- [${regTitle(r)}](${abs(regHref(r.slug))}.md): ${r.summary.answer}`);
  }
  out.push(
    "",
    "_The plain-English summaries are AerScheduler's reading of the rules, not legal advice. The official text on each page is the eCFR's, published by the Office of the Federal Register._"
  );
  return out.join("\n").trim() + "\n";
}

/** Every summary and citation, for /regulations/data.json. */
export function regData() {
  return {
    name: "AerScheduler plain-English FAA regulations",
    url: abs(REG_BASE),
    textAsOf: TEXT_AS_OF,
    textSource: "eCFR (Office of the Federal Register), https://www.ecfr.gov",
    note: "Summaries are AerScheduler's reading of each rule, not legal advice. Free to reuse with a link back.",
    sections: REGS.map((r) => ({
      cite: fullCite(r),
      farCite: farCite(r),
      name: r.name,
      topic: r.topic,
      part: r.part,
      heading: r.official.heading,
      lastAmended: r.official.amendedOn,
      url: abs(regHref(r.slug)),
      markdown: `${abs(regHref(r.slug))}.md`,
      ecfr: ecfrUrl(r),
      answer: r.summary.answer,
      points: r.summary.points.map((p) => ({ text: p.text, paragraph: p.para ? paraLabel(p.para) : null })),
      questions: r.summary.faqs.map((f) => ({ question: f.q, answer: f.a })),
      related: r.summary.related.map((c) => regByCite(c)).filter((x): x is Reg => !!x).map(fullCite),
    })),
  };
}
