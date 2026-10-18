/**
 * US states with researched pages, alphabetical. Adding a state: write
 * `<slug>.mjs` beside this file (see ../README.md), run
 * `node scripts/check-aircraft-tax.mjs us/<slug>.mjs`, then add its line here.
 */
import arizona from "./arizona.mjs";
import california from "./california.mjs";
import florida from "./florida.mjs";
import idaho from "./idaho.mjs";
import montana from "./montana.mjs";
import oregon from "./oregon.mjs";
import texas from "./texas.mjs";
import utah from "./utah.mjs";
import washington from "./washington.mjs";

export const REGIONS = [arizona, california, florida, idaho, montana, oregon, texas, utah, washington];
