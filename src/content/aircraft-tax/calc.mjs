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
 *                       part to the first N dollars (Florida's $5,000) and
 *                       `localMax` caps the rate the reader may enter
 *   "combined"          the reader enters their full combined rate; `min`/`max` bound it
 *   "state-only"        one statewide rate, no local tax modeled
 *   "choice"            the reader picks from named rates (Pennsylvania's three)
 *   "none"              no general sales or use tax
 *   "exempt"            a sales tax exists, but aircraft are exempt
 * Any taxing kind may add: `credit` (tax paid to another state is credited),
 * `cap` (the most the tax can be), `exemptUnder` (a price below it owes
 * nothing), `exemptFromWeight` (that takeoff weight or more is exempt),
 * `taxedShare` (percent of the price taxed), `surtax` (a second statewide
 * rate), `tier` (a rate on the `next` dollars after the first `after`), `note`.
 *
 * annual.kind
 *   "flat"              one fee, `label` says for what
 *   "per-seat"          `perSeat` dollars times the seats
 *   "percent-of-value"  `percent` of the aircraft's value, at least `min`
 *   "per-pound"         `cents` per pound of maximum weight, `min` to `max`
 *   "by-weight"         `tiers` of [up to pounds, fee], `over` above the last;
 *                       `flatTypes` for types with their own fee
 *   "rate-by-age"       `rates` (percent or mills of the value) for year 1, 2,
 *                       and so on, the last for every later year; `countFrom`
 *                       is the model's age or the registration count
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
  alabama: {
    sale: { kind: "state-plus-local", state: 2, localLabel: "Your city and county rate", credit: true },
    annual: { kind: "unknown", note: "Alabama taxes aircraft as property at local rates, so the yearly amount depends on the county." },
  },
  alaska: {
    sale: {
      kind: "combined",
      localLabel: "Your city or borough sales tax rate, if any",
      note: "Alaska has no state sales or use tax. Some cities and boroughs levy their own.",
    },
    annual: { kind: "unknown", note: "No state aircraft registration fee is in force. Cities and boroughs may tax aircraft as property." },
  },
  arkansas: {
    sale: { kind: "state-plus-local", state: 6.5, localLabel: "Your city and county rate", localCap: 2500, exemptUnder: 2000, credit: true },
    annual: { kind: "unknown", note: "County assessors tax aircraft each year as personal property, at local rates." },
  },
  colorado: {
    sale: {
      kind: "state-plus-local",
      state: 2.9,
      localLabel: "State-administered local rate where you are",
      credit: true,
      note: "Home-rule cities collect their own sales tax under their own rules.",
    },
    annual: { kind: "none", note: "Personal aircraft pay a fuel excise tax instead of property tax, and no state registration fee was found." },
  },
  connecticut: {
    sale: { kind: "state-only", state: 6.35, exemptFromWeight: 6000 },
    annual: { kind: "none", note: "Towns must exempt aircraft from property tax, and there is no state aircraft registration fee." },
  },
  delaware: {
    sale: { kind: "none", note: "Delaware has no sales or use tax." },
    annual: { kind: "none", note: "Delaware has no personal property tax and no state aircraft registration fee." },
  },
  "district-of-columbia": {
    sale: { kind: "state-only", state: 7, note: "The rate is 7.0% from October 1, 2026, and was 6.0% before." },
    annual: { kind: "unknown", note: "No District aircraft registration or yearly aircraft tax was found." },
  },
  georgia: {
    sale: { kind: "state-plus-local", state: 4, localLabel: "Your local sales tax rate", credit: true },
    annual: { kind: "unknown", note: "Counties tax aircraft as personal property, at local rates." },
  },
  hawaii: {
    sale: {
      kind: "state-plus-local",
      state: 4,
      localLabel: "County surcharge",
      localMax: 0.5,
      note: "The general excise tax is on the seller, who usually passes it on.",
    },
    annual: { kind: "flat", fee: 10, label: "Registration for an aircraft operated at a state-owned airport" },
  },
  illinois: {
    sale: { kind: "state-only", state: 6.25, credit: true },
    annual: { kind: "flat", fee: 20, label: "Registration with the Department of Transportation", note: "Paid every two years, not every year." },
  },
  indiana: {
    sale: { kind: "state-only", state: 7, credit: true, note: "Indiana taxes the price less any trade-in." },
    annual: {
      kind: "unknown",
      note: "A $10 registration plus an excise tax per pound that depends on the aircraft's class and age. The full rate table is not in a source we quote yet.",
    },
  },
  iowa: {
    sale: { kind: "state-only", state: 6, note: "Iowa charges this as use tax when the aircraft is registered." },
    annual: {
      kind: "rate-by-age",
      unit: "percent",
      rates: [1, 0.75, 0.5, 0.25],
      countFrom: "registration",
      valueLabel: "Manufacturer's list price",
      min: 35,
      max: 5000,
      flatTypes: { "Antique, noncommercial only": 35 },
      note: "Iowa uses the manufacturer's list price. The calculator uses your price as a stand-in.",
    },
  },
  kansas: {
    sale: { kind: "state-only", state: 6.5, note: "An occasional sale between private owners is exempt." },
    annual: { kind: "unknown", note: "Counties tax aircraft as personal property, unless at least 80% of their use earns income in the owner's business." },
  },
  kentucky: {
    sale: { kind: "state-only", state: 6, credit: true },
    annual: {
      kind: "percent-of-value",
      percent: 0.015,
      note: "The state rate of $0.015 per $100 of value, with your price as the value. Local property tax applies too, unless the locality exempts the aircraft.",
    },
  },
  louisiana: {
    sale: {
      kind: "state-plus-local",
      state: 5,
      localLabel: "Your parish and local rate",
      credit: true,
      note: "Louisiana credits tax paid to another state only if that state does the same for Louisiana.",
    },
    annual: { kind: "unknown", note: "Light personal aircraft flown under Part 91 owe no property tax. Parishes may assess heavier or commercial aircraft." },
  },
  maine: {
    sale: { kind: "exempt", note: "Aircraft are exempt from Maine sales and use tax through June 30, 2033." },
    annual: {
      kind: "rate-by-age",
      unit: "mills",
      rates: [9, 7, 5, 4, 3],
      countFrom: "model",
      valueLabel: "Maker's average equipped price",
      min: 10,
      note: "An excise tax paid to the town where the aircraft is based, on the maker's average equipped price; the calculator uses your price. Antique and experimental aircraft are exempt.",
    },
  },
  maryland: {
    sale: { kind: "state-only", state: 6, credit: true },
    annual: { kind: "unknown", note: "We found no primary source on a yearly state aircraft fee or on property tax on aircraft." },
  },
  massachusetts: {
    sale: { kind: "exempt", note: "Aircraft are exempt from Massachusetts sales and use tax." },
    annual: { kind: "by-weight", tiers: [[2000, 100], [3500, 165], [12500, 230]], over: 300, note: "Half the fee for an aircraft acquired on or after July 1." },
  },
  michigan: {
    sale: { kind: "state-only", state: 6, credit: true, note: "Due on the greater of the price or the aircraft's retail value." },
    annual: {
      kind: "per-pound",
      cents: 1,
      note: "Michigan uses the greater of maximum gross or takeoff weight, and halves a first registration after July 1. The fee replaces property tax.",
    },
  },
  minnesota: {
    sale: {
      kind: "state-plus-local",
      state: 6.5,
      surtax: { label: "constitutional addition", rate: 0.375 },
      localLabel: "Your local sales tax rate",
      credit: true,
    },
    annual: {
      kind: "unknown",
      note: "A yearly registration tax set by list price, from $100 up to $75,000. The full table is not in a source we quote yet.",
    },
  },
  mississippi: {
    sale: { kind: "state-only", state: 3, credit: true },
    annual: { kind: "unknown", note: "We found no primary source on a yearly state aircraft fee or on how counties tax aircraft." },
  },
  missouri: {
    sale: { kind: "state-plus-local", state: 4.225, localLabel: "Your city, county and district rate", credit: true },
    annual: { kind: "unknown", note: "County assessors assess aircraft as personal property, taxed at local rates." },
  },
  nebraska: {
    sale: { kind: "state-plus-local", state: 5.5, localLabel: "Your local sales tax rate", credit: true },
    annual: { kind: "unknown", note: "We found no primary source on a yearly state aircraft fee or on property tax on aircraft." },
  },
  nevada: {
    sale: { kind: "combined", localLabel: "Your county's rate", min: 6.85, max: 8.375, note: "An occasional sale by a private owner is generally exempt." },
    annual: { kind: "unknown", note: "We found no primary source on a yearly state aircraft fee or on how counties tax aircraft." },
  },
  "new-hampshire": {
    sale: { kind: "none", note: "New Hampshire has no general sales or use tax." },
    annual: {
      kind: "by-weight",
      tiers: [[3000, 100], [8000, 250], [12500, 2500]],
      over: 3500,
      flatTypes: { "Antique, glider or experimental": 100 },
    },
  },
  "new-jersey": {
    sale: { kind: "state-only", state: 6.625, note: "A sale by an owner who used the aircraft personally is an exempt casual sale." },
    annual: { kind: "none", note: "New Jersey has no state aircraft registration fee." },
  },
  "new-mexico": {
    sale: {
      kind: "combined",
      localLabel: "The gross receipts tax rate where it is sold",
      min: 4.875,
      max: 10.8125,
      taxedShare: 50,
      credit: true,
      note: "Gross receipts tax is on the seller, who usually passes it on. Half of the receipts from selling an aircraft are deducted.",
    },
    annual: {
      kind: "unknown",
      note: "A per-pound registration fee that falls with the model's age, capped per engine. The middle years are not in a source we quote yet.",
    },
  },
  "new-york": {
    sale: { kind: "exempt", note: "General aviation aircraft are exempt from New York state and local sales and use tax." },
    annual: { kind: "unknown", note: "We found no primary source on a yearly state aircraft fee or on property tax on aircraft." },
  },
  "north-carolina": {
    sale: { kind: "state-only", state: 4.75, cap: 2500, credit: true, note: "An occasional sale by an owner not in the business is not taxed." },
    annual: { kind: "unknown", note: "Counties tax aircraft each year as personal property, at local rates." },
  },
  "north-dakota": {
    sale: { kind: "state-only", state: 5, credit: true, note: "3% for agricultural aircraft used only for aerial application. A trade-in is deducted." },
    annual: {
      kind: "unknown",
      note: "Registration by maximum takeoff weight, from $15 to $3,000. The full table is not in a source we quote yet.",
    },
  },
  ohio: {
    sale: {
      kind: "state-plus-local",
      state: 5.75,
      localLabel: "Your county rate",
      credit: true,
      note: "A one-time sale by a private owner, with no broker or dealer, is not taxed.",
    },
    annual: { kind: "per-seat", perSeat: 15, note: "Gliders and balloons pay $15. The license tax replaces all other taxes on owning an aircraft." },
  },
  oklahoma: {
    sale: { kind: "state-only", state: 3.25, credit: true },
    annual: {
      kind: "unknown",
      note: "Fees by weight and engine type, from $30 to $2,250 for single-engine piston aircraft and multiples of that for others, falling with age. The full table is not in a source we quote yet.",
    },
  },
  pennsylvania: {
    sale: {
      kind: "choice",
      label: "Where the aircraft is addressed or used",
      options: { "Elsewhere in Pennsylvania": 6, "Allegheny County": 7, Philadelphia: 8 },
      credit: true,
      note: "Helicopters and similar rotorcraft are exempt.",
    },
    annual: { kind: "unknown", note: "We found no yearly aircraft fee or tax in the state's published material." },
  },
  "rhode-island": {
    sale: { kind: "exempt", note: "No sales or use tax applies to aircraft in Rhode Island." },
    annual: {
      kind: "by-weight",
      tiers: [[2000, 30], [3000, 60], [4500, 110], [12500, 160]],
      over: 250,
      note: "Half the fee after the first six months of the registration period. The fee replaces personal property tax.",
    },
  },
  "south-carolina": {
    sale: { kind: "state-only", state: 5, cap: 500, credit: true, note: "In a private sale the buyer pays a casual excise tax at the same rate and cap." },
    annual: { kind: "unknown", note: "Counties tax aircraft each year as personal property, at local rates." },
  },
  "south-dakota": {
    sale: {
      kind: "state-only",
      state: 4,
      note: "An original registration tax in place of sales tax, 3% for agricultural aircraft. A South Dakota-registered trade-in is deducted.",
    },
    annual: {
      kind: "unknown",
      note: "Registration by maximum takeoff weight, from $25 to $300, half for aircraft ten years or older. The full table is not in a source we quote yet.",
    },
  },
  tennessee: {
    sale: {
      kind: "state-plus-local",
      state: 7,
      localLabel: "Your local rate",
      localCap: 1600,
      tier: { label: "state single article tax", rate: 2.75, after: 1600, next: 1600 },
      credit: true,
    },
    annual: { kind: "unknown", note: "No state registration fee. The Department's guidance does not say whether counties tax aircraft as property." },
  },
  vermont: {
    sale: { kind: "state-plus-local", state: 6, localLabel: "Local option tax, if your town levies it", localMax: 1, credit: true },
    annual: { kind: "unknown", note: "We found no yearly state aircraft fee in the statutes or the Department's guidance." },
  },
  virginia: {
    sale: { kind: "state-only", state: 2, credit: true, note: "No deduction for trade-ins." },
    annual: {
      kind: "flat",
      fee: 30,
      label: "Noncommercial registration, at most",
      note: "Localities also tax aircraft as personal property, at their own rates.",
    },
  },
  "west-virginia": {
    sale: { kind: "state-only", state: 6, credit: true },
    annual: { kind: "unknown", note: "Counties tax aircraft as personal property, at local rates." },
  },
  wisconsin: {
    sale: { kind: "state-plus-local", state: 5, localLabel: "County tax, if your county adopted it", localMax: 0.5, credit: true },
    annual: {
      kind: "unknown",
      note: "Registration by weight in place of property tax: every two years up to 3,000 pounds, yearly above. The full table is not in a source we quote yet.",
    },
  },
  wyoming: {
    sale: { kind: "state-only", state: 4, credit: true },
    annual: { kind: "unknown", note: "No state registration fee. Whether aircraft pay property tax was not settled in the sources we found." },
  },
};
