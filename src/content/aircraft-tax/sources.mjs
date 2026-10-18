/**
 * The one way to cite a source in the aircraft tax data. `checkedOn` defaults
 * to the date this file says; a state researched on another day passes its own
 * `{ checkedOn }` in `extra`.
 */
export const CHECKED = "2026-10-18";

/**
 * @param {string} publisher  the tax authority, legislature or code: "Florida Department of Revenue"
 * @param {string} title      the document and section: "Rule 12A-1.071(22)"
 * @param {string} url        a link straight to it
 * @param {string} quote      the exact sentence, copied, never paraphrased
 * @param {{ dated?: string, checkedOn?: string, quoteExact?: boolean }} [extra]
 */
export const src = (publisher, title, url, quote, extra = {}) => ({ publisher, title, url, quote, quoteExact: true, checkedOn: CHECKED, ...extra });
