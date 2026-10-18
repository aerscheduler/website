/**
 * Every plain-English summary, one file per topic. Plain ESM so the build
 * scripts can read the same data the pages render.
 */
import owning from "./owning-an-aircraft.mjs";
import inspections from "./inspections.mjs";
import records from "./maintenance-records.mjs";
import ads from "./airworthiness-directives.mjs";
import pilots from "./pilots-and-renters.mjs";
import instructors from "./instructors-and-students.mjs";
import schools from "./running-a-flight-school.mjs";

/** @type {import("../types").RegSummary[]} */
export const SUMMARIES = [...owning, ...inspections, ...records, ...ads, ...pilots, ...instructors, ...schools];
