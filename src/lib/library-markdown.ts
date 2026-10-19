import { adAbout, adHref, adPublished, adTitle, CHECK_BASE, fmt, pageHref, PRODUCT_LABEL, type AdBlock, type AdFull } from "@/lib/ad-library";
import { defaultTbo, FUEL_BURN, guideHref, guideTitle, share, type Guide } from "@/lib/aircraft-guides";
import { SITE_URL } from "@/lib/site";

/**
 * The Markdown copies of an AD page and an aircraft ownership guide, for AI assistants and
 * anything else that reads text rather than HTML: `/airworthiness-directives/<number>.md` and
 * `/aircraft/<model>.md` (rewrites in next.config.ts, routes under app/md). The same facts as the
 * page, from the same API answer, so the two cannot disagree.
 */
const abs = (path: string) => `${SITE_URL}${path}`;
const tidy = (lines: string[]) => lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";

/** One AD text block as Markdown: paragraphs indented by level, notes quoted, tables as tables. */
function blockMarkdown(b: AdBlock): string {
  if (b.t === "h") return `### ${b.text}`;
  if (b.t === "note") return `> ${b.text}`;
  if (b.t === "p") return `${"  ".repeat(Math.max(0, b.level))}${b.text}`;
  const head = `| ${b.head.join(" | ")} |`;
  const rule = `| ${b.head.map(() => "---").join(" | ")} |`;
  const rows = b.rows.map((r) => `| ${r.map((c) => c.replace(/\|/g, "/")).join(" | ")} |`);
  return [b.title ? `**${b.title}**` : "", head, rule, ...rows].filter(Boolean).join("\n");
}

export function adMarkdown(ad: AdFull): string {
  const out = [
    `# AD ${ad.adNumber}: ${adTitle(ad.title)}`,
    "",
    `> ${ad.summary ?? adAbout(ad)}`,
    "",
    `Page: ${abs(adHref(ad.adNumber))}`,
    `Maker: ${ad.manufacturer}`,
    `Product: ${PRODUCT_LABEL[ad.productType] ?? ad.productType}`,
    `${ad.onPublicInspection ? "To be published" : ad.datedByNumber ? "Issued" : "Published"}: ${adPublished(ad, "long")}`,
    `Effective: ${ad.effectiveOn ? adPublished({ publishedOn: ad.effectiveOn }, "long") : "Not stated"}`,
    ad.amendment ? `Amendment: ${ad.amendment}` : "",
    `Supersedes: ${ad.supersedes.length ? ad.supersedes.join(", ") : "nothing"}`,
    ad.supersededBy.length ? `Superseded by: ${ad.supersededBy.join(", ")} (comply with the one in force)` : "",
    "",
    "## Applies to",
    "",
    ...(ad.details?.applicability?.length ? ad.details.applicability.flatMap((b) => [blockMarkdown(b), ""]) : [ad.applicability || "Not given; read the AD at the source below."]),
    "",
  ];
  if (ad.details?.actions.length) {
    out.push("## What it requires", "");
    // A blank line between blocks: a Markdown table only starts after one.
    for (const s of ad.details.actions) out.push(`### ${s.heading}`, "", ...s.blocks.flatMap((b) => [blockMarkdown(b), ""]));
  }
  if (ad.pages.length) {
    out.push("## Filed under", "", ...ad.pages.map((p) => `- [${p.name}](${abs(pageHref(p.kind, p.slug))})${p.mentioned ? " (an equipment AD that names it)" : ""}`), "");
  }
  out.push(
    "## Source",
    "",
    ad.source === "drs" ? `- The AD at the FAA: ${ad.url}` : `- The Federal Register document ${ad.frDocumentNumber}, the legal text: ${ad.url}`,
    "- Current status and corrections: the FAA's Dynamic Regulatory System, https://drs.faa.gov/",
    "",
    "_Not the official record. Whether an AD applies to one aircraft depends on its serial number, installed equipment and records, and is a certificated mechanic's determination._"
  );
  return tidy(out);
}

export function guideMarkdown(g: Guide): string {
  const y = g.profile?.years;
  const main = g.engines[0];
  const t = guideTitle(g);
  const out = [
    `# ${t} ownership guide`,
    "",
    `> ${fmt(g.fleetCount)} registered in the US${y ? `, built from about ${y.oldest} to ${y.newest}, half by ${y.median}` : ""}${g.profile?.seats ? `, ${g.profile.seats} seats` : ""}${main ? `, most with the ${main.name}` : ""}.`,
    "",
    `Page: ${abs(guideHref(g.slug))}`,
    "",
    "## The fleet",
    "",
    `- Registered in the US: ${fmt(g.fleetCount)}`,
    y ? `- Built: about ${y.oldest} to ${y.newest}; half built by ${y.median}` : "",
    g.profile?.seats ? `- Seats: ${g.profile.seats}` : "",
    g.profile?.engineType ? `- Engine type: ${g.profile.engineType}` : "",
    ...g.engines.map((e) => `- Engine: ${e.name}, ${fmt(e.count)} aircraft (${share(e.count, g.fleetCount)})${e.ads ? `, ${e.ads.current} ADs, ${e.ads.repetitive} with a repeat action` : ""}`),
    "",
    "Source: the FAA aircraft registry.",
    "",
    "## Airworthiness Directives",
    "",
    `${g.ads.current} current ADs name the ${g.designation} airframe, ${g.ads.repetitive.length} with a repeat action; ${g.ads.superseded} more were superseded. ${g.ads.equipment} equipment ADs name the model. Every AD: ${abs(pageHref("aircraft", g.slug))}`,
    "",
  ];
  if (g.ads.repetitive.length) {
    out.push("The ones with a repeat action:", "", ...g.ads.repetitive.map((a) => `- [AD ${a.adNumber}](${abs(adHref(a.adNumber))}): ${a.requires ?? adAbout(a)}`), "");
  }
  const p = g.problems;
  if (p && p.reports) {
    out.push(
      "## What gets reported",
      "",
      `${fmt(p.reports)} FAA Service Difficulty Reports since ${p.since}. Counts of what was reported, not failure rates.`,
      "",
      "Systems reported most:",
      "",
      ...p.systems.map((x) => `- ${x.name}: ${fmt(x.count)}`),
      "",
      "Parts reported most:",
      "",
      ...p.parts.map((x) => `- ${x.name}${x.condition ? `, ${x.condition}` : ""}: ${fmt(x.count)}`),
      "",
      "Latest reports:",
      "",
      ...p.recent.slice(0, 4).map((x) => `- ${x.date}, ${[x.system, x.part].filter(Boolean).join(", ")}: ${x.text}`),
      "",
      "Source: the FAA Service Difficulty Reporting System, https://sdrs.faa.gov/",
      ""
    );
  }
  const sf = g.safety;
  if (sf && sf.accidents) {
    out.push(
      "## Accident record",
      "",
      `${fmt(sf.accidents)} accidents since ${sf.since}, ${fmt(sf.fatal)} fatal, ${fmt(sf.destroyed)} aircraft destroyed. Counts, not rates: hours flown per model are not published.`,
      "",
      "What happened:",
      "",
      ...sf.events.map((x) => `- ${x.name}: ${fmt(x.count)}`),
      "",
      "Phase of flight:",
      "",
      ...sf.phases.map((x) => `- ${x.name}: ${fmt(x.count)}`),
      "",
      "Source: the NTSB aviation accident database (accidents only, homebuilts left out).",
      ""
    );
  }
  const burn = FUEL_BURN[g.slug];
  const tbo = defaultTbo(g.slug, main?.name ?? null);
  if (burn || tbo) {
    out.push("## Costs to run", "", burn ? `- Typical cruise fuel burn: ${burn} gal/hr` : "", tbo ? `- Published hours between engine overhauls (${main?.name}): ${fmt(tbo)}` : "", `- Cost estimator: ${abs(guideHref(g.slug))}#costs`, "");
  }
  out.push(
    "## Before you buy one",
    "",
    `1. Run its N-number through the AD check: ${abs(CHECK_BASE)}`,
    "2. For each repeat-action AD, find the last compliance in the logbooks and when the next is due.",
    "3. Compare the engine's time since overhaul with its maker's published overhaul time.",
    ...(p?.systems[0] ? [`4. Have the pre-buy mechanic look hard at the ${p.systems[0].name.toLowerCase()}: it is reported most on this model.`] : []),
    "",
  );
  if (g.variants.length) {
    out.push(`## The rest of the ${g.family} family`, "", ...g.variants.map((v) => `- [${v.nickname ? `${v.name} ${v.nickname}` : v.name}](${abs(v.guide ? guideHref(v.slug) : pageHref("aircraft", v.slug))}): ${fmt(v.fleetCount)} registered`), "");
  }
  return tidy(out);
}
