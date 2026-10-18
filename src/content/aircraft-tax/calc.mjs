/**
 * What the aircraft tax calculator (/aircraft-tax/calculator) knows about each
 * state: how to estimate the tax on buying or bringing in an aircraft, and the
 * yearly registration fee or tax.
 *
 * Every figure here is also in a quoted source on that state's page, and
 * `scripts/check-aircraft-tax.mjs` fails the build when one is not: the
 * calculator may never know a number the page cannot show the reader. A state
 * whose rule cannot be computed from quoted figures says so (`kind: "unknown"`)
 * rather than guessing, and the calculator explains why.
 *
 * sale.kind
 *   "state-plus-local"  state rate, plus a local rate the reader enters (their
 *                       county or city sets it); `localCap` limits the local
 *                       part to the first N dollars (Florida's $5,000)
 *   "combined"          the reader enters their full combined rate; `max` caps it
 *   "state-only"        one statewide rate, no local tax modeled
 *   "none"              no general sales or use tax
 * sale.credit: tax paid to another state is credited (quoted for the state)
 *
 * annual.kind
 *   "percent-of-value"  `percent` of the aircraft's value, at least `min`
 *   "per-pound"         `cents` per pound of maximum gross weight, `min` to `max`
 *   "by-type"           a flat fee for each aircraft type in `fees`
 *   "by-type-and-age"   Montana's table: `rows` by type, columns by age band
 *   "none" | "unknown"  nothing yearly, or not computable from quoted figures
 */

/** @type {Record<string, { sale: any, annual: any }>} */
export const CALC = {
  arizona: {
    sale: { kind: "state-plus-local", state: 5.6, localLabel: "Your county and city rate" },
    annual: {
      kind: "percent-of-value",
      percent: 0.5,
      min: 20,
      note: "ADOT values the aircraft at the average market value for its make, model and year. The calculator uses your price as a stand-in.",
    },
  },
  california: {
    sale: { kind: "combined", localLabel: "The combined rate where the aircraft is hangared", credit: true },
    annual: { kind: "unknown", note: "Counties assess personal property tax on aircraft at their own rates. Ask the county assessor." },
  },
  florida: {
    sale: { kind: "state-plus-local", state: 6, localLabel: "Your county's discretionary sales surtax", localCap: 5000, credit: true },
    annual: { kind: "none", note: "Florida has no state aircraft registration." },
  },
  idaho: {
    sale: { kind: "state-only", state: 6 },
    annual: { kind: "per-pound", cents: 3, min: 20, max: 600 },
  },
  montana: {
    sale: { kind: "none" },
    annual: {
      kind: "by-type-and-age",
      bands: ["0-5 years", "6-10 years", "11-20 years", "21-30 years", "31-40 years"],
      bandStarts: [0, 6, 11, 21, 31],
      rows: {
        "Single engine, fixed gear, 200 horsepower and under": [450, 262.5, 150, 75, 37.5],
        "Single engine, fixed gear, over 200 horsepower": [750, 375, 225, 112.5, 75],
        "Single engine, retractable gear, 200 horsepower and under": [900, 450, 262.5, 150, 112.5],
        "Single engine, retractable gear, over 200 horsepower": [1050, 600, 300, 187.5, 150],
        "Multi-engine, piston engine": [1200, 750, 375, 262.5, 225],
        "Helicopter, piston engine": [1050, 675, 337.5, 225, 187.5],
        "Single engine jet helicopter, prop jet": [2250, 1050, 675, 450, 262.5],
        "Multi-engine jet helicopter, prop jet": [3000, 1500, 900, 600, 300],
        "Jet engine, no propeller": [4500, 2250, 1200, 750, 375],
      },
      oldAge: 40,
      oldFee: 30,
    },
  },
  oregon: {
    sale: { kind: "none" },
    annual: {
      kind: "by-type",
      fees: {
        "Single engine fixed wing, piston": 65,
        "Single engine fixed wing, turboprop": 250,
        "Multiengine fixed wing, piston": 150,
        "Turbojet fixed wing": 700,
        "Helicopter piston engine": 65,
      },
    },
  },
  texas: {
    sale: { kind: "combined", localLabel: "Your combined rate (state plus local)", max: 8.25, credit: true },
    annual: { kind: "unknown", note: "The Comptroller's aircraft guidance does not cover a yearly registration or property tax." },
  },
  utah: {
    sale: { kind: "combined", localLabel: "The combined rate at the aircraft's FAA registration address" },
    annual: { kind: "unknown", note: "Utah requires yearly registration with the Division of Aeronautics; the fee is not in a source we could quote yet." },
  },
  washington: {
    sale: { kind: "state-plus-local", state: 6.5, localLabel: "Your local rate" },
    annual: {
      kind: "by-type",
      fees: { "Single engine fixed wing": 50 },
      note: "Rises to $120 for a single-engine airplane in 2027. Other types are in RCW 82.48.030.",
    },
  },
};
