import { COUNTRIES, PUBLISHED, REGIONS, TOPICS as RAW_TOPICS } from "@/content/aircraft-tax/registry.mjs";
import type { TaxRegion as RegionData } from "@/content/aircraft-tax/types";
import { SITE_URL } from "@/lib/site";

/**
 * Aircraft tax by jurisdiction (www.aerscheduler.com/aircraft-tax), from
 * `content/aircraft-tax/registry.mjs`. Country first in every address so other
 * countries slot in beside the US states: /aircraft-tax/<country>/<region>.
 *
 * Every answer on these pages rests on a quoted primary source with the date
 * it was checked. Until `PUBLISHED` is true the pages are reachable by URL but
 * unlisted: noindex, and absent from the sitemap, nav, search and llms.txt.
 */

export { PUBLISHED };
export const TAX_BASE = "/aircraft-tax";

export type TaxCountry = (typeof COUNTRIES)[number];
export type TaxRegion = RegionData;
/** The seven topics, typed as the keys every country labels. */
export type TaxTopic = keyof TaxCountry["labels"];
export const TOPICS = RAW_TOPICS as TaxTopic[];
export type { TaxFact } from "@/content/aircraft-tax/types";
export type TaxStatus = "taxable" | "exempt" | "conditional" | "none" | "unclear";

export const COUNTRY_LIST: TaxCountry[] = COUNTRIES.filter((c) => REGIONS.some((r) => r.country === c.code));

export const countryHref = (c: TaxCountry) => `${TAX_BASE}/${c.slug}`;
export const regionHref = (r: TaxRegion) => `${TAX_BASE}/${countryOf(r).slug}/${r.slug}`;
export const countryOf = (r: TaxRegion) => COUNTRIES.find((c) => c.code === r.country)!;
export const getCountry = (slug: string) => COUNTRY_LIST.find((c) => c.slug === slug);
export const regionsIn = (c: TaxCountry) => REGIONS.filter((r) => r.country === c.code).sort((a, b) => a.name.localeCompare(b.name));
export const getRegion = (country: string, slug: string) => {
  const c = getCountry(country);
  return c ? REGIONS.find((r) => r.country === c.code && r.slug === slug) : undefined;
};
export const ALL_REGIONS: TaxRegion[] = REGIONS;

export const STATUS_LABEL: Record<TaxStatus, string> = {
  taxable: "Taxed",
  exempt: "Exempt",
  conditional: "Depends",
  none: "None",
  unclear: "Not clearly published",
};

/** For the comparison table, where "Not clearly published" would wrap every cell. */
export const SHORT_LABEL: Record<TaxStatus, string> = { ...STATUS_LABEL, unclear: "Unclear" };

export const question = (c: TaxCountry, t: TaxTopic, r: TaxRegion) => c.questions[t].replace("{region}", r.name);

/** The latest date any fact on the page was checked. */
export function lastChecked(r: TaxRegion): string {
  const dates = TOPICS.flatMap((t) => r.facts[t].sources.map((s) => s.checkedOn));
  return dates.sort().at(-1) ?? "";
}

export const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

const abs = (href: string) => `${SITE_URL}${href}`;

/** The Markdown twin of a region page. */
export function regionMarkdown(r: TaxRegion): string {
  const c = countryOf(r);
  const out = [`# ${r.name} aircraft tax`, "", `> ${r.summary}`, "", `Source: ${abs(regionHref(r))}`, `Checked: ${lastChecked(r)}`, ""];
  for (const t of TOPICS) {
    const f = r.facts[t];
    out.push(`## ${question(c, t, r)}`, "", `**${STATUS_LABEL[f.status as TaxStatus]}.** ${f.answer}`, "");
    for (const s of f.sources) out.push(`> "${s.quote}"`, ">", `> ${s.publisher}, [${s.title}](${s.url})${s.dated ? `, dated ${s.dated}` : ""}. Checked ${s.checkedOn}.`, "");
  }
  out.push("_Not tax advice. Confirm with the state's revenue department or a CPA before a purchase or a pricing decision._");
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
