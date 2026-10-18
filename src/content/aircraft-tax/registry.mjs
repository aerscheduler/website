/**
 * Aircraft tax by jurisdiction (planned public pages at /aircraft-tax). DRAFT:
 * five pilot US states, researched 2026-10-18, awaiting Tony's review before
 * any page is built. Nothing imports this yet.
 *
 * COUNTRY FIRST, so going international adds rows rather than a rewrite:
 *   /aircraft-tax                               every country
 *   /aircraft-tax/<country-slug>                that country's overview
 *   /aircraft-tax/<country-slug>/<region-slug>  one state, province or the
 *                                               whole country if it has no
 *                                               regional taxes
 * The seven topics are generic ("buying", "bringing one in", "renting") and
 * each country names its own taxes for them: US sales and use tax, a VAT or
 * GST elsewhere. A country with only national taxes (most of Europe) gets one
 * region whose slug is the country's, so its URL is /aircraft-tax/<c>/<c>.
 *
 * ACCURACY RULES. Every fact cites a primary source (the tax authority, the
 * statute or the rule) with the exact sentence it rests on and the date it was
 * checked. Secondary sites point to sources; they are never one. When the
 * primary source does not clearly answer, the status is "unclear" and the page
 * says so. A fact whose quote is still a paraphrase has `quoteExact: false`
 * and must be fixed before it ships.
 */

/** Types are in ./types.d.ts. */

/** Flip to true to list the pages: sitemap, nav, search, llms.txt, and indexing. */
export const PUBLISHED = false;

/** The questions every jurisdiction answers, in page order. Labels come from the country. */
export const TOPICS = ["buying", "bringingIn", "exemptions", "rental", "instruction", "maintenance", "annual"];

export const COUNTRIES = [
  {
    code: "US",
    slug: "united-states",
    name: "United States",
    currency: "USD",
    regionKind: "state",
    /** One question per topic, as people search it. {region} is the state's name. */
    questions: {
      buying: "Do you pay sales tax on an aircraft bought in {region}?",
      bringingIn: "Do you owe use tax on an aircraft bought outside {region}?",
      exemptions: "What aircraft sales tax exemptions does {region} have?",
      rental: "Are aircraft rentals taxed in {region}?",
      instruction: "Is flight instruction taxed in {region}?",
      maintenance: "Are aircraft parts and maintenance labor taxed in {region}?",
      annual: "Does {region} register or tax aircraft every year?",
    },
    labels: {
      buying: "Sales tax when you buy an aircraft",
      bringingIn: "Use tax when you bring one into the state",
      exemptions: "Exemptions owners plan around",
      rental: "Tax on aircraft rentals",
      instruction: "Flight instruction",
      maintenance: "Parts and labor for maintenance",
      annual: "Registration and yearly taxes",
    },
  },
  // Next: { code: "CA", slug: "canada", regionKind: "province", labels: { buying: "GST/HST and PST", ... } }
];

/**
 * Every region, one file each under `us/` (and later `ca/`, `gb/`...), listed
 * in `us/index.mjs`. One file per state so several people (or research
 * sessions) can add states at once without touching the same file.
 */
export { REGIONS } from "./us/index.mjs";
