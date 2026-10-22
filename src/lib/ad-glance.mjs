/**
 * An AD at a glance, in the FAA's own words: the sentences of its Federal Register summary that
 * say what it requires, why, and what it covers, lifted whole. Nothing here writes about an AD;
 * every function either returns a span of the FAA's text, character for character apart from
 * whitespace, or null. `verbatim` is the guard, and `ad-glance.test.mjs` (run by the build)
 * holds it to that on real ADs.
 *
 * A plain module, not TypeScript, so the build's `node --test` can run it without a compiler.
 */

/** Words whose full stop does not end a sentence: "Inc., Model", "Co. KG", "P/N 123". */
const ABBREVIATION = /\b(?:Inc|Ltd|Co|Corp|No|Nos|St|Mt|approx|e\.g|i\.e|U\.S|etc|Mfg|Div|Bros)\.$/i;

const squash = (s) => s.replace(/\s+/g, " ").trim();

/**
 * The FAA's text split into sentences. A full stop ends one only before whitespace and a capital
 * or an opening bracket, and never after a decimal's digit ("0.25 inch") or a company suffix.
 * @param {string | null | undefined} text
 * @returns {string[]}
 */
export function sentences(text) {
  if (!text) return [];
  const flat = squash(text);
  const out = [];
  let start = 0;
  const end = /[.!?](?=\s+["“(A-Z]|$)/g;
  let m;
  while ((m = end.exec(flat))) {
    const piece = flat.slice(start, m.index + 1);
    if (ABBREVIATION.test(piece)) continue;
    out.push(piece.trim());
    start = m.index + 1;
  }
  const rest = flat.slice(start).trim();
  if (rest) out.push(rest);
  return out.filter(Boolean);
}

/**
 * `span` exactly as it appears in `source`, whitespace aside, or null. The single gate every
 * glance line passes through: a line that is not the FAA's text is never shown.
 * @param {string | null} span
 * @param {...(string | null | undefined)} sources
 * @returns {string | null}
 */
export function verbatim(span, ...sources) {
  if (!span) return null;
  const s = squash(span);
  return sources.some((src) => src && squash(src).includes(s)) ? s : null;
}

/** "This AD requires ...", "This AD also prohibits ...", "This amendment requires ...". */
// A finite verb only: "issuing this AD to require actions" is the boilerplate, not a requirement.
const REQUIRES = /\b(?:this|the) (?:new |final |emergency |superseding )?(?:AD|amendment|action|rule)\b[^.]{0,40}?\b(?:also )?(?:requires|prohibits|mandates)\b/i;

/**
 * What the AD requires: the summary's "This AD requires" sentences, in order, at most three
 * (some add "This AD also requires ..." and "This AD also prohibits ..."). Null when the summary
 * never says it in those words, as many from the 1990s do not.
 * @param {{ summary?: string | null }} ad
 * @returns {string[] | null}
 */
export function faaRequires(ad) {
  const found = sentences(ad.summary)
    .filter((s) => REQUIRES.test(s) && !/\bcurrently requires\b/i.test(s))
    .slice(0, 3)
    .map((s) => verbatim(s, ad.summary))
    .filter(Boolean);
  return found.length ? found : null;
}

/** "issuing this AD to prevent ...", "intended to prevent ...", "to detect and correct ...". */
const WHY = /\b(?:issuing this AD to|intended to|is to|in order to)\s+(?:prevent|detect|correct|address|identify|ensure|preclude|avoid|reduce)\b/i;
/** The modern boilerplate that says nothing on its own: "to address the unsafe condition on these products." */
const GENERIC = /\b(?:address|correct) (?:an|the|all these|this) unsafe conditions?\b/i;

/**
 * Why the AD exists: the sentence that says what it prevents, from the unsafe-condition
 * paragraph first (where the specific one lives since about 2010), else the summary.
 * @param {{ summary?: string | null, unsafeCondition?: string | null }} ad
 * @returns {string | null}
 */
export function faaWhy(ad) {
  for (const src of [ad.unsafeCondition, ad.summary]) {
    const hit = sentences(src).find((s) => WHY.test(s) && !GENERIC.test(s));
    if (hit) return verbatim(hit, src);
  }
  return null;
}

/**
 * Who it covers, as the summary's opening says it: "certain Cessna Aircraft Company (Cessna)
 * 172, ... series airplanes", or the older "applicable to Avco Lycoming ... engines". The full
 * applicability, with serial ranges and exceptions, stays in the AD's own section.
 * @param {{ summary?: string | null }} ad
 * @returns {string | null}
 */
export function faaCovers(ad) {
  // The opening sentence, whole, so "Piper Aircraft, Inc." or "STC No. SA123" do not cut it short.
  const opening = sentences(ad.summary).find((s) => /\bairworthiness directive \(AD\) (?:for|that applies to) (?:certain|all|the)\b/i.test(s));
  const m =
    (opening && /\bairworthiness directive \(AD\) (?:for|that applies to) ((?:certain|all|the)\b.*?)\.?$/i.exec(opening)) ||
    /\bapplicable to ((?:certain|all|the)?\b[^,.;]*?(?:airplanes|helicopters|rotorcraft|engines|propellers|gliders|balloons|products|appliances))\b/i.exec(squash(ad.summary ?? ""));
  const covers = m?.[1] ?? null;
  // "the products listed above" and "the specified helicopters" point at text not shown here.
  if (!covers || /^the (?:products|specified|following|affected|aircraft|airplanes|helicopters|engines)\b/i.test(covers)) return null;
  return verbatim(covers, ad.summary);
}

/**
 * The model families an AD is filed under, most registered first: "Cessna 172M" and "Cessna
 * 172S" are both "172". From the library's own index, not the AD's text.
 * @param {{ pages: { kind: string, name: string, mentioned: boolean }[] }} ad
 * @returns {{ maker: string, families: string[] } | null}
 */
export function filedFamilies(ad) {
  const own = (ad.pages ?? []).filter((p) => !p.mentioned);
  if (!own.length) return null;
  const kind = own[0].kind;
  const same = own.filter((p) => p.kind === kind);
  // The maker's own page is the name most model pages start with ("Cessna", "Rolls-Royce").
  const starts = (n) => same.filter((p) => p.name.startsWith(`${n} `)).length;
  const maker = same
    .map((p) => p.name)
    .filter((n) => !/\d/.test(n))
    .sort((x, y) => starts(y) - starts(x))[0];
  if (!maker || !starts(maker)) return null;
  const families = [];
  for (const p of same) {
    if (!p.name.startsWith(`${maker} `)) continue;
    const model = p.name.slice(maker.length + 1);
    // A model has a digit; "Bell Helicopter Textron" or "Lycoming LYCOMING" is an index label.
    if (!/\d/.test(model)) continue;
    const m = /^([A-Z]?\d{2,4})[A-Z]{0,3}$/.exec(model);
    const family = m ? m[1] : model;
    if (!families.includes(family)) families.push(family);
  }
  return families.length ? { maker, families } : null;
}

/**
 * The page title: number, maker and the first model families, then the system when the AD names
 * one and it fits. "AD 2008-26-10: Cessna 172, 182, 180 and more". Null to keep the old title.
 * @param {{ adNumber: string, pages: { kind: string, name: string, mentioned: boolean }[] }} ad
 * @param {string | null} about the system from the AD's subject line, when it has one
 * @param {number} max characters, before the site name is added
 * @returns {string | null}
 */
export function glanceTitle(ad, about, max = 60) {
  const f = filedFamilies(ad);
  if (!f) return null;
  const lead = `AD ${ad.adNumber}: ${f.maker}`;
  for (const n of [3, 2, 1]) {
    const shown = f.families.slice(0, n).join(", ");
    const more = f.families.length > n ? " and more" : "";
    const withAbout = about ? `${lead} ${shown}${more}, ${about.charAt(0).toLowerCase()}${about.slice(1)}` : null;
    if (withAbout && withAbout.length <= max) return withAbout;
    const plain = `${lead} ${shown}${more}`;
    if (plain.length <= max) return plain;
  }
  return null;
}
