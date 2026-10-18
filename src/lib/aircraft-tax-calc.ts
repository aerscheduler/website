/**
 * The aircraft tax calculator's arithmetic, kept pure so it can be read, tested
 * and reasoned about apart from the form. The rules come from
 * `content/aircraft-tax/calc.mjs`, whose every figure is quoted on the state's
 * page (the build checks).
 *
 * It returns the working, not just a total: each line says what was multiplied
 * by what, so a reader can check it against the quote it came from.
 */

/** Optional parts any taxing sale rule can carry. */
type SaleExtras = {
  /** Tax paid to another state is credited. */
  credit?: boolean;
  /** The most the tax can be, before any credit (North Carolina's $2,500). */
  cap?: number;
  /** A price under this owes nothing (Arkansas's $2,000). */
  exemptUnder?: number;
  /** An aircraft of this maximum takeoff weight or more is exempt (Connecticut's 6,000 lb). */
  exemptFromWeight?: number;
  /** Only this percent of the price is taxed (New Mexico deducts half). */
  taxedShare?: number;
  /** A second statewide rate on the whole price (Minnesota's constitutional 0.375%). */
  surtax?: { label: string; rate: number };
  /** A rate on a slice of the price above the first `after` dollars (Tennessee's single article tax). */
  tier?: { label: string; rate: number; after: number; next: number };
  note?: string;
};

export type SaleRule =
  | { kind: "none"; note?: string }
  | { kind: "exempt"; note: string }
  | ({ kind: "state-only"; state: number } & SaleExtras)
  | ({ kind: "state-plus-local"; state: number; localLabel: string; localCap?: number; localMax?: number } & SaleExtras)
  | ({ kind: "combined"; localLabel: string; min?: number; max?: number } & SaleExtras)
  | ({ kind: "choice"; label: string; options: Record<string, number> } & SaleExtras);

export type AnnualRule =
  | { kind: "none" | "unknown"; note: string }
  | { kind: "flat"; fee: number; label: string; note?: string }
  | { kind: "per-seat"; perSeat: number; note?: string }
  | { kind: "percent-of-value"; percent: number; min?: number; note?: string }
  | { kind: "per-pound"; cents: number; min?: number; max?: number; note?: string }
  | { kind: "by-weight"; tiers: [number, number][]; over: number; flatTypes?: Record<string, number>; note?: string }
  | {
      kind: "rate-by-age";
      /** "mills" are thousandths of the value; "percent" hundredths. */
      unit: "percent" | "mills";
      /** rates[0] for the first year, rates[1] the second, and the last for every year after. */
      rates: number[];
      /** What the years count: the model's age, or how many times it has registered in the state. */
      countFrom: "model" | "registration";
      valueLabel: string;
      min?: number;
      max?: number;
      flatTypes?: Record<string, number>;
      note?: string;
    }
  | { kind: "by-type"; fees: Record<string, number>; note?: string }
  | {
      kind: "by-type-and-age";
      bands: string[];
      bandStarts: number[];
      rows: Record<string, number[]>;
      oldAge: number;
      oldFee: number;
    };

export type CalcRule = { sale: SaleRule; annual: AnnualRule };

export type SaleInput = { price: number; rate: number; paidElsewhere: number; weight: number; choice: string };
export type AnnualInput = {
  price: number;
  weight: number;
  seats: number;
  type: string;
  modelYear: number;
  year: number;
  /** 1 for the first registration, 2 for the second, and so on. */
  registrationYear: number;
};

export type Working = { label: string; amount: number }[];
/** `headline` replaces the amount when there is none to show: "None", "Exempt" or "Not computed". */
export type Result = { total: number | null; working: Working; note?: string; headline?: string };

/** A label for the homebuilt / antique / over-40 flat fee in the Montana table. */
export const FLAT_OLD_TYPE = "Glider, ultralight, gyrocopter, balloon, homebuilt or antique";
/** The choice beside a rule's flat-fee types: the ordinary aircraft the formula covers. */
export const OTHER_TYPE = "Any other aircraft";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
const pct = (n: number) => `${n}%`;
const lb = (n: number) => `${n.toLocaleString("en-US")} lb`;
const round2 = (n: number) => Math.round(n * 100) / 100;

/** The types a reader picks from for this yearly rule, if any. */
export function annualTypes(rule: AnnualRule): string[] {
  if (rule.kind === "by-type") return Object.keys(rule.fees);
  if (rule.kind === "by-type-and-age") return [...Object.keys(rule.rows), FLAT_OLD_TYPE];
  if ((rule.kind === "by-weight" || rule.kind === "rate-by-age") && rule.flatTypes) return [OTHER_TYPE, ...Object.keys(rule.flatTypes)];
  return [];
}

export function saleTax(rule: SaleRule, input: SaleInput): Result {
  const price = Math.max(0, input.price || 0);
  const working: Working = [];
  if (rule.kind === "none") return { total: 0, working, note: rule.note ?? "No general sales or use tax." };
  if (rule.kind === "exempt") return { total: null, working, headline: "Exempt", note: rule.note };

  if (rule.exemptUnder && price < rule.exemptUnder) {
    return { total: 0, working, note: `A sale under ${money(rule.exemptUnder)} owes no tax.` };
  }
  if (rule.exemptFromWeight && (input.weight || 0) >= rule.exemptFromWeight) {
    return { total: null, working, headline: "Exempt", note: `Aircraft of ${lb(rule.exemptFromWeight)} maximum takeoff weight or more are exempt.` };
  }

  const share = rule.taxedShare ?? 100;
  const base = round2((price * share) / 100);
  const on = share === 100 ? money(price) : `${money(base)} (${pct(share)} of ${money(price)})`;
  const rate = Math.max(0, input.rate || 0);

  if (rule.kind === "state-only") {
    working.push({ label: `${pct(rule.state)} state tax on ${on}`, amount: round2((base * rule.state) / 100) });
  } else if (rule.kind === "state-plus-local") {
    working.push({ label: `${pct(rule.state)} state tax on ${on}`, amount: round2((base * rule.state) / 100) });
    const local = Math.min(rate, rule.localMax ?? Infinity);
    if (local > 0) {
      const localBase = rule.localCap ? Math.min(base, rule.localCap) : base;
      const capNote = rule.localCap && base > rule.localCap ? ` (applies to the first ${money(rule.localCap)} only)` : "";
      working.push({ label: `${pct(local)} local tax on ${money(localBase)}${capNote}`, amount: round2((localBase * local) / 100) });
    }
  } else if (rule.kind === "combined") {
    const r = Math.min(Math.max(rate, rule.min ?? 0), rule.max ?? Infinity);
    working.push({ label: `${pct(r)} combined rate on ${on}`, amount: round2((base * r) / 100) });
  } else {
    const r = rule.options[input.choice] ?? Object.values(rule.options)[0];
    working.push({ label: `${pct(r)} tax on ${on}`, amount: round2((base * r) / 100) });
  }

  if (rule.surtax) {
    working.push({ label: `${pct(rule.surtax.rate)} ${rule.surtax.label} on ${on}`, amount: round2((base * rule.surtax.rate) / 100) });
  }
  if (rule.tier) {
    const slice = Math.max(0, Math.min(base - rule.tier.after, rule.tier.next));
    if (slice > 0) working.push({ label: `${pct(rule.tier.rate)} ${rule.tier.label} on ${money(slice)}`, amount: round2((slice * rule.tier.rate) / 100) });
  }

  let total = round2(working.reduce((sum, w) => sum + w.amount, 0));
  if (rule.cap && total > rule.cap) {
    working.push({ label: `Capped at ${money(rule.cap)}`, amount: round2(rule.cap - total) });
    total = rule.cap;
  }
  const credit = rule.credit ? Math.min(total, Math.max(0, input.paidElsewhere || 0)) : 0;
  if (credit > 0) {
    working.push({ label: "Credit for sales tax paid to another state", amount: -credit });
    total = round2(total - credit);
  }
  return { total, working, note: rule.note };
}

export function annualTax(rule: AnnualRule, input: AnnualInput): Result {
  switch (rule.kind) {
    case "none":
      return { total: null, working: [], note: rule.note, headline: "None" };
    case "unknown":
      return { total: null, working: [], note: rule.note, headline: "Not computed" };
    case "flat":
      return { total: rule.fee, working: [{ label: rule.label, amount: rule.fee }], note: rule.note };
    case "per-seat": {
      const seats = Math.max(0, Math.round(input.seats || 0));
      const total = round2(seats * rule.perSeat);
      return { total, working: [{ label: `${money(rule.perSeat)} a seat for ${seats} ${seats === 1 ? "seat" : "seats"}`, amount: total }], note: rule.note };
    }
    case "percent-of-value": {
      const raw = round2(((input.price || 0) * rule.percent) / 100);
      const total = Math.max(rule.min ?? 0, raw);
      const working: Working = [{ label: `${pct(rule.percent)} of ${money(input.price || 0)}`, amount: raw }];
      if (total !== raw) working.push({ label: `Raised to the ${money(rule.min ?? 0)} minimum`, amount: round2(total - raw) });
      return { total, working, note: rule.note };
    }
    case "per-pound": {
      const raw = round2(((input.weight || 0) * rule.cents) / 100);
      const total = Math.min(rule.max ?? Infinity, Math.max(rule.min ?? 0, raw));
      const working: Working = [{ label: `${rule.cents} ${rule.cents === 1 ? "cent" : "cents"} per pound on ${lb(input.weight || 0)}`, amount: raw }];
      if (total !== raw) working.push({ label: total === rule.min ? `Raised to the ${money(rule.min)} minimum` : `Capped at ${money(rule.max ?? 0)}`, amount: round2(total - raw) });
      return { total, working, note: rule.note };
    }
    case "by-weight": {
      const flat = rule.flatTypes?.[input.type];
      if (flat !== undefined) return { total: flat, working: [{ label: input.type, amount: flat }], note: rule.note };
      const w = input.weight || 0;
      const tier = rule.tiers.find(([upTo]) => w <= upTo);
      const fee = tier ? tier[1] : rule.over;
      const top = rule.tiers[rule.tiers.length - 1][0];
      const label = tier ? `${lb(w)}, in the band up to ${lb(tier[0])}` : `${lb(w)}, over ${lb(top)}`;
      return { total: fee, working: [{ label, amount: fee }], note: rule.note };
    }
    case "rate-by-age": {
      const flat = rule.flatTypes?.[input.type];
      if (flat !== undefined) return { total: flat, working: [{ label: input.type, amount: flat }], note: rule.note };
      const index =
        rule.countFrom === "model" ? Math.max(0, input.year - (input.modelYear || input.year)) : Math.max(0, (input.registrationYear || 1) - 1);
      const rate = rule.rates[Math.min(index, rule.rates.length - 1)];
      const per = rule.unit === "mills" ? 1000 : 100;
      const raw = round2(((input.price || 0) * rate) / per);
      const total = Math.min(rule.max ?? Infinity, Math.max(rule.min ?? 0, raw));
      const unit = rule.unit === "mills" ? `${rate} mills per dollar` : pct(rate);
      const when = rule.countFrom === "model" ? `model year ${index + 1}` : `registration year ${index + 1}`;
      const working: Working = [{ label: `${unit} of ${money(input.price || 0)} (${when})`, amount: raw }];
      if (total !== raw) working.push({ label: total === rule.min ? `Raised to the ${money(rule.min)} minimum` : `Capped at ${money(rule.max ?? 0)}`, amount: round2(total - raw) });
      return { total, working, note: rule.note };
    }
    case "by-type": {
      const fee = rule.fees[input.type];
      if (fee === undefined) return { total: null, working: [], note: rule.note ?? "Choose an aircraft type." };
      return { total: fee, working: [{ label: input.type, amount: fee }], note: rule.note };
    }
    case "by-type-and-age": {
      const age = Math.max(0, input.year - (input.modelYear || input.year));
      if (input.type === FLAT_OLD_TYPE || age > rule.oldAge) {
        const why = input.type === FLAT_OLD_TYPE ? input.type : `Over ${rule.oldAge} years old`;
        return { total: rule.oldFee, working: [{ label: why, amount: rule.oldFee }] };
      }
      const row = rule.rows[input.type];
      if (!row) return { total: null, working: [], note: "Choose an aircraft type." };
      let band = 0;
      rule.bandStarts.forEach((start, i) => {
        if (age >= start) band = i;
      });
      return { total: row[band], working: [{ label: `${input.type}, ${rule.bands[band]} old`, amount: row[band] }] };
    }
  }
}

export const formatMoney = money;
