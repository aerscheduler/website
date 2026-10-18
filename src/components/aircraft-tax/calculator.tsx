"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FLAT_OLD_TYPE, OTHER_TYPE, annualTax, annualTypes, formatMoney, saleTax, type CalcRule } from "@/lib/aircraft-tax-calc";

export type CalcState = { slug: string; name: string; href: string; rule: CalcRule };

const field = "h-11 w-full rounded-lg border border-border bg-white px-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
const num = (v: string) => {
  const n = Number(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

/**
 * Estimate the tax on buying or basing an aircraft, and its yearly state fee.
 * Every rule and figure comes from the state's quoted sources, and the result
 * shows its working beside a link to them. A state whose yearly fee cannot be
 * computed from quoted figures says why instead of guessing.
 */
export function AircraftTaxCalculator({ states, year }: { states: CalcState[]; year: number }) {
  const [slug, setSlug] = useState(states[0]?.slug ?? "");
  const [price, setPrice] = useState("185000");
  const [rate, setRate] = useState("");
  const [paid, setPaid] = useState("");
  const [weight, setWeight] = useState("2550");
  const [modelYear, setModelYear] = useState("2004");
  const [type, setType] = useState("");
  const [seats, setSeats] = useState("4");
  const [regYear, setRegYear] = useState("1");
  const [choice, setChoice] = useState("");

  // Deep link: /aircraft-tax/calculator?state=idaho. Read after mount so the
  // page stays fully static.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("state");
    if (wanted && states.some((s) => s.slug === wanted)) setSlug(wanted);
  }, [states]);

  const state = states.find((s) => s.slug === slug) ?? states[0];
  const { sale, annual } = state.rule;
  const types = annualTypes(annual);
  const chosenType = types.includes(type) ? type : (types[0] ?? "");
  const choices = sale.kind === "choice" ? Object.keys(sale.options) : [];
  const chosen = choices.includes(choice) ? choice : (choices[0] ?? "");

  const saleResult = useMemo(
    () => saleTax(sale, { price: num(price), rate: num(rate), paidElsewhere: num(paid), weight: num(weight), choice: chosen }),
    [sale, price, rate, paid, weight, chosen]
  );
  const annualResult = useMemo(
    () =>
      annualTax(annual, {
        price: num(price),
        weight: num(weight),
        seats: num(seats),
        type: chosenType,
        modelYear: num(modelYear),
        year,
        registrationYear: num(regYear),
      }),
    [annual, price, weight, seats, chosenType, modelYear, year, regYear]
  );

  const needsRate = sale.kind === "state-plus-local" || sale.kind === "combined";
  const rateHint =
    sale.kind === "combined"
      ? sale.min !== undefined && sale.max !== undefined
        ? `Percent, from ${sale.min} to ${sale.max}`
        : `Percent${sale.max ? `, at most ${sale.max}` : ""}`
      : sale.kind === "state-plus-local" && sale.localMax
        ? `Percent, at most ${sale.localMax}`
        : "Percent, added to the state rate";
  const credits = "credit" in sale && sale.credit;
  // Flat-fee types (antique, glider) skip the weight, age and seat questions.
  const formula = chosenType === "" || chosenType === OTHER_TYPE;
  const needsWeight =
    ("exemptFromWeight" in sale && !!sale.exemptFromWeight) || annual.kind === "per-pound" || (annual.kind === "by-weight" && formula);
  const needsModelYear =
    (annual.kind === "by-type-and-age" && chosenType !== FLAT_OLD_TYPE) || (annual.kind === "rate-by-age" && annual.countFrom === "model" && formula);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Aircraft tax calculator">
        <Field id="tax-state" label="State">
          <select id="tax-state" value={slug} onChange={(e) => setSlug(e.target.value)} className={field}>
            {states.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>
        <Field id="tax-price" label="Purchase price" hint="US dollars">
          <input id="tax-price" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} className={field} />
        </Field>
        {sale.kind === "choice" && (
          <Field id="tax-choice" label={sale.label}>
            <select id="tax-choice" value={chosen} onChange={(e) => setChoice(e.target.value)} className={field}>
              {choices.map((c) => (
                <option key={c} value={c}>
                  {c} ({sale.options[c]}%)
                </option>
              ))}
            </select>
          </Field>
        )}
        {needsRate && (
          <Field id="tax-rate" label={sale.localLabel} hint={rateHint}>
            <input id="tax-rate" inputMode="decimal" placeholder="0" value={rate} onChange={(e) => setRate(e.target.value)} className={field} />
          </Field>
        )}
        {credits && (
          <Field id="tax-paid" label="Sales tax already paid to another state" hint="Optional, US dollars">
            <input id="tax-paid" inputMode="decimal" placeholder="0" value={paid} onChange={(e) => setPaid(e.target.value)} className={field} />
          </Field>
        )}
        {types.length > 0 && (
          <Field id="tax-type" label="Aircraft type">
            <select id="tax-type" value={chosenType} onChange={(e) => setType(e.target.value)} className={field}>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        )}
        {needsModelYear && (
          <Field id="tax-year" label="Model year">
            <input id="tax-year" inputMode="numeric" value={modelYear} onChange={(e) => setModelYear(e.target.value)} className={field} />
          </Field>
        )}
        {annual.kind === "rate-by-age" && annual.countFrom === "registration" && formula && (
          <Field id="tax-reg" label="Year of registration in this state">
            <select id="tax-reg" value={regYear} onChange={(e) => setRegYear(e.target.value)} className={field}>
              {annual.rates.map((_, i) => (
                <option key={i} value={String(i + 1)}>
                  {i === annual.rates.length - 1 ? `Year ${i + 1} or later` : `Year ${i + 1}`}
                </option>
              ))}
            </select>
          </Field>
        )}
        {annual.kind === "per-seat" && (
          <Field id="tax-seats" label="Seats" hint="Manufacturer's maximum listed seating">
            <input id="tax-seats" inputMode="numeric" value={seats} onChange={(e) => setSeats(e.target.value)} className={field} />
          </Field>
        )}
        {needsWeight && (
          <Field id="tax-weight" label="Maximum certified takeoff weight" hint="Pounds, from the type certificate data sheet">
            <input id="tax-weight" inputMode="numeric" value={weight} onChange={(e) => setWeight(e.target.value)} className={field} />
          </Field>
        )}
      </form>

      <section aria-live="polite" className="space-y-8 border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
        <Result
          title="Tax when you buy or bring it in"
          result={saleResult}
          source={`${state.href}#buying`}
          stateName={state.name}
        />
        <Result title="Every year" result={annualResult} source={`${state.href}#annual`} stateName={state.name} />
        <p className="text-sm leading-relaxed text-muted-foreground">
          An estimate from the figures on{" "}
          <Link href={state.href} className="text-primary hover:underline">
            {state.name}&apos;s page
          </Link>
          , not tax advice. Exemptions (nonresidents, fly-away, carriers, flight training) can bring the tax to zero; read them there.
        </p>
      </section>
    </div>
  );
}

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {label}
        </label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Result({ title, result, source, stateName }: { title: string; result: ReturnType<typeof saleTax>; source: string; stateName: string }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">{title}</h2>
      <p className="text-4xl font-semibold tracking-tight text-brand-surface tabular-nums">
        {result.total === null ? (result.headline ?? "Not computed") : formatMoney(result.total)}
      </p>
      {result.working.length > 0 && (
        <dl className="space-y-1.5 text-sm">
          {result.working.map((w, i) => (
            <div key={i} className="flex justify-between gap-4 border-b border-border/70 pb-1.5 last:border-0">
              <dt className="text-muted-foreground">{w.label}</dt>
              <dd className="shrink-0 text-foreground tabular-nums">{formatMoney(w.amount)}</dd>
            </div>
          ))}
        </dl>
      )}
      {result.note && <p className="text-sm leading-relaxed text-muted-foreground">{result.note}</p>}
      <Link href={source} className="inline-block text-sm text-primary hover:underline">
        The {stateName} sources behind this
      </Link>
    </div>
  );
}
