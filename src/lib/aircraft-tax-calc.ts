/**
 * The aircraft tax calculator's arithmetic, kept pure so it can be read, tested
 * and reasoned about apart from the form. The rules come from
 * `content/aircraft-tax/calc.mjs`, whose every figure is quoted on the state's
 * page (the build checks).
 *
 * It returns the working, not just a total: each line says what was multiplied
 * by what, so a reader can check it against the quote it came from.
 */

export type SaleRule =
  | { kind: "none" }
  | { kind: "state-only"; state: number }
  | { kind: "state-plus-local"; state: number; localLabel: string; localCap?: number; credit?: boolean }
  | { kind: "combined"; localLabel: string; max?: number; credit?: boolean };

export type AnnualRule =
  | { kind: "none" | "unknown"; note: string }
  | { kind: "percent-of-value"; percent: number; min: number; note?: string }
  | { kind: "per-pound"; cents: number; min: number; max: number }
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

export type SaleInput = { price: number; rate: number; paidElsewhere: number };
export type AnnualInput = { price: number; weight: number; type: string; modelYear: number; year: number };

export type Working = { label: string; amount: number }[];
/** `headline` replaces the amount when there is none to show: "None" or "Not computed". */
export type Result = { total: number | null; working: Working; note?: string; headline?: string };

/** A label for the homebuilt / antique / over-40 flat fee in the Montana table. */
export const FLAT_OLD_TYPE = "Glider, ultralight, gyrocopter, balloon, homebuilt or antique";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
const pct = (n: number) => `${n}%`;
const round2 = (n: number) => Math.round(n * 100) / 100;

export function saleTax(rule: SaleRule, input: SaleInput): Result {
  const price = Math.max(0, input.price || 0);
  const working: Working = [];
  if (rule.kind === "none") return { total: 0, working, note: "No general sales or use tax." };

  if (rule.kind === "state-only") {
    working.push({ label: `${pct(rule.state)} state tax on ${money(price)}`, amount: round2((price * rule.state) / 100) });
  } else if (rule.kind === "state-plus-local") {
    working.push({ label: `${pct(rule.state)} state tax on ${money(price)}`, amount: round2((price * rule.state) / 100) });
    const rate = Math.max(0, input.rate || 0);
    if (rate > 0) {
      const base = rule.localCap ? Math.min(price, rule.localCap) : price;
      const capNote = rule.localCap && price > rule.localCap ? ` (applies to the first ${money(rule.localCap)} only)` : "";
      working.push({ label: `${pct(rate)} local tax on ${money(base)}${capNote}`, amount: round2((base * rate) / 100) });
    }
  } else {
    const rate = Math.max(0, Math.min(input.rate || 0, rule.max ?? Infinity));
    working.push({ label: `${pct(rate)} combined rate on ${money(price)}`, amount: round2((price * rate) / 100) });
  }

  let total = round2(working.reduce((sum, w) => sum + w.amount, 0));
  const credit = "credit" in rule && rule.credit ? Math.min(total, Math.max(0, input.paidElsewhere || 0)) : 0;
  if (credit > 0) {
    working.push({ label: "Credit for sales tax paid to another state", amount: -credit });
    total = round2(total - credit);
  }
  return { total, working };
}

export function annualTax(rule: AnnualRule, input: AnnualInput): Result {
  switch (rule.kind) {
    case "none":
      return { total: null, working: [], note: rule.note, headline: "None" };
    case "unknown":
      return { total: null, working: [], note: rule.note, headline: "Not computed" };
    case "percent-of-value": {
      const raw = round2(((input.price || 0) * rule.percent) / 100);
      const total = Math.max(rule.min, raw);
      const working: Working = [{ label: `${pct(rule.percent)} of ${money(input.price || 0)}`, amount: raw }];
      if (total !== raw) working.push({ label: `Raised to the ${money(rule.min)} minimum`, amount: round2(total - raw) });
      return { total, working, note: rule.note };
    }
    case "per-pound": {
      const raw = round2(((input.weight || 0) * rule.cents) / 100);
      const total = Math.min(rule.max, Math.max(rule.min, raw));
      const working: Working = [{ label: `${rule.cents} cents per pound on ${(input.weight || 0).toLocaleString("en-US")} lb`, amount: raw }];
      if (total !== raw) working.push({ label: total === rule.min ? `Raised to the ${money(rule.min)} minimum` : `Capped at ${money(rule.max)}`, amount: round2(total - raw) });
      return { total, working };
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
