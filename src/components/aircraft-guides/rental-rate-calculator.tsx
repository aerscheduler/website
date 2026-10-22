"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * What to charge to rent an aircraft: every cost of owning it, per hour rented, then the owner's
 * margin on top, as a wet rate and a dry rate. The rental cousin of the ownership guides'
 * CostEstimator, and it keeps the same rule: only a model's typical fuel burn and its engine
 * maker's published overhaul time arrive filled in. Insurance, hangars, overhauls and fuel
 * prices vary too much by operator, airport and shop for a default to mean anything, so they
 * are the owner's to enter, and nothing typed here leaves the page.
 */
export type RentalModel = { slug: string; label: string; fuelBurn: number | null; tbo: number | null };

type Field = { key: string; label: string; unit: string; placeholder: string; hint?: string };

const USE: Field[] = [
  {
    key: "hours",
    label: "Hours it rents a year",
    unit: "hr/yr",
    placeholder: "300",
    hint: "Hobbs hours. The fixed costs are spread over these hours, so this number moves the rate most.",
  },
];

const PER_HOUR: Field[] = [
  { key: "fuelBurn", label: "Fuel burn", unit: "gal/hr", placeholder: "8.5", hint: "Per Hobbs hour. Typical cruise; check your own fuel records." },
  { key: "fuelPrice", label: "Fuel price", unit: "$/gal", placeholder: "0.00" },
  { key: "overhaulCost", label: "Engine overhaul", unit: "$", placeholder: "0.00", hint: "A quote from an engine shop, including removal and installation." },
  { key: "tbo", label: "Hours to engine overhaul", unit: "hr", placeholder: "2000", hint: "The engine maker's published time between overhauls." },
  { key: "propCost", label: "Propeller overhaul", unit: "$", placeholder: "0.00" },
  { key: "propHours", label: "Hours to propeller overhaul", unit: "hr", placeholder: "0", hint: "The propeller maker's published interval." },
  {
    key: "hundredHour",
    label: "100-hour inspection",
    unit: "$ each",
    placeholder: "0.00",
    hint: "Due every 100 hours when the aircraft carries people for hire or is used for flight instruction for hire (14 CFR 91.409(b)). Leave empty if yours does not.",
  },
  { key: "maintenance", label: "Other maintenance", unit: "$/hr", placeholder: "0.00", hint: "Tires, brakes, oil, avionics repairs, the unexpected." },
];

const PER_YEAR: Field[] = [
  { key: "insurance", label: "Insurance", unit: "$/yr", placeholder: "0.00", hint: "Quoted for rental or instruction use, if that is how it flies." },
  { key: "hangar", label: "Hangar or tiedown", unit: "$/yr", placeholder: "0.00" },
  { key: "annual", label: "Annual inspection", unit: "$/yr", placeholder: "0.00" },
  { key: "loan", label: "Loan payments", unit: "$/yr", placeholder: "0.00" },
  { key: "other", label: "Everything else", unit: "$/yr", placeholder: "0.00", hint: "Database updates, software, cleaning, the property tax some states charge." },
];

const MARGIN: Field[] = [
  { key: "margin", label: "Margin on top of cost", unit: "%", placeholder: "0", hint: "Leave it empty to see the break-even rate." },
  {
    key: "ratio",
    label: "Hobbs hours per tach hour",
    unit: "ratio",
    placeholder: "1.0",
    hint: "Optional. From your logs: Hobbs time divided by tach time over the same flights. Shows the rate to charge if you bill by tach.",
  },
];

const ALL = [...USE, ...PER_HOUR, ...PER_YEAR, ...MARGIN];
const EMPTY = Object.fromEntries(ALL.map((f) => [f.key, ""])) as Record<string, string>;

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const whole = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
/** Hours a year, banded for analytics: what kind of operation, never the figure typed. */
const hoursBand = (h: number) => (h <= 0 ? "none" : h < 100 ? "<100" : h < 250 ? "100-249" : h < 500 ? "250-499" : "500+");

export function RentalRateCalculator({ models }: { models: RentalModel[] }) {
  const [model, setModel] = useState("");
  const [v, setV] = useState<Record<string, string>>(EMPTY);
  const touched = useRef(false);

  const pick = (slug: string) => {
    setModel(slug);
    const m = models.find((x) => x.slug === slug);
    if (m) setV((cur) => ({ ...cur, fuelBurn: m.fuelBurn ? String(m.fuelBurn) : "", tbo: m.tbo ? String(m.tbo) : "" }));
  };

  // A guide page links here with ?model=<slug>; read once, after the static page hydrates.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("model");
    if (slug && models.some((m) => m.slug === slug)) pick(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const num = (k: string) => {
    const n = Number(v[k]);
    return Number.isFinite(n) && n > 0 ? n : 0;
  };

  const r = useMemo(() => {
    const hours = num("hours");
    const lines = [
      { label: "Fuel", perHour: num("fuelBurn") * num("fuelPrice"), how: "fuel burn times fuel price", fuel: true },
      { label: "Engine reserve", perHour: num("tbo") ? num("overhaulCost") / num("tbo") : 0, how: "overhaul cost divided by hours to overhaul" },
      { label: "Propeller reserve", perHour: num("propHours") ? num("propCost") / num("propHours") : 0, how: "overhaul cost divided by hours to overhaul" },
      { label: "100-hour inspections", perHour: num("hundredHour") / 100, how: "one inspection every 100 hours" },
      { label: "Other maintenance", perHour: num("maintenance"), how: "as entered" },
      {
        label: "Fixed costs",
        perHour: hours ? PER_YEAR.reduce((t, f) => t + num(f.key), 0) / hours : 0,
        how: hours ? `a year's insurance, hangar, annual, loan and the rest over ${hours.toLocaleString("en-US")} hours` : "add hours a year",
      },
    ];
    const wetCost = lines.reduce((t, l) => t + l.perHour, 0);
    const fuel = lines[0].perHour;
    const dryCost = wetCost - fuel;
    const markup = 1 + num("margin") / 100;
    const wetRate = wetCost * markup;
    const dryRate = dryCost * markup;
    const ratio = num("ratio");
    return {
      hours,
      lines,
      wetCost,
      dryCost,
      wetRate,
      dryRate,
      margin: num("margin"),
      ratio,
      yearRevenue: wetRate * hours,
      yearCost: wetCost * hours,
      fixedEntered: PER_YEAR.some((f) => num(f.key) > 0),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v]);

  // One event per settled estimate after the reader has typed something; banded, never the figures.
  useEffect(() => {
    if (!touched.current) return;
    const timer = setTimeout(
      () =>
        track("rate_estimate", {
          model: model || null,
          hours_band: hoursBand(r.hours),
          entered_fixed: r.fixedEntered,
          entered_margin: r.margin > 0,
          entered_ratio: r.ratio > 0,
          has_rate: r.wetRate > 0,
        }),
      1500
    );
    return () => clearTimeout(timer);
  }, [model, r]);

  const input = (f: Field) => (
    <label key={f.key} className="block">
      <span className="text-sm font-medium text-brand-surface">{f.label}</span>
      <span className="mt-1 flex items-center rounded-lg border border-border bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <input
          id={`rate-${f.key}`}
          inputMode="decimal"
          value={v[f.key]}
          placeholder={f.placeholder}
          onChange={(e) => {
            touched.current = true;
            setV({ ...v, [f.key]: e.target.value.replace(/[^\d.]/g, "") });
          }}
          className="h-10 w-full min-w-0 rounded-lg bg-transparent px-3 text-sm tabular-nums outline-none placeholder:text-muted-foreground/70"
        />
        <span className="shrink-0 pr-3 text-xs text-muted-foreground">{f.unit}</span>
      </span>
      {f.hint && <span className="mt-1 block text-xs text-muted-foreground">{f.hint}</span>}
    </label>
  );

  const group = (title: string, fields: Field[]) => (
    <div className="space-y-4">
      <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">{title}</p>
      {fields.map(input)}
    </div>
  );

  const chosen = models.find((m) => m.slug === model);
  const rateLabel = r.margin ? `with a ${r.margin.toLocaleString("en-US")}% margin` : "break-even";

  return (
    <div className="space-y-8">
      <label className="block max-w-md">
        <span className="text-sm font-medium text-brand-surface">Aircraft</span>
        <select
          id="rate-model"
          value={model}
          onChange={(e) => {
            touched.current = true;
            pick(e.target.value);
          }}
          className="mt-1 h-10 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Another aircraft (enter everything yourself)</option>
          {models.map((m) => (
            <option key={m.slug} value={m.slug}>
              {m.label}
            </option>
          ))}
        </select>
        <span className="mt-1 block text-xs text-muted-foreground">
          {chosen
            ? `Filled in for the ${chosen.label}: ${[chosen.fuelBurn ? "a typical cruise fuel burn" : null, chosen.tbo ? "the engine maker's published overhaul time" : null].filter(Boolean).join(" and ") || "nothing, so far"}. Check both against yours.`
            : "Picking a model fills in its typical fuel burn and, where one figure covers its engine, the published overhaul time."}
        </span>
      </label>

      <div className="grid gap-x-8 gap-y-8 lg:grid-cols-3">
        <div className="space-y-8">
          {group("How much it flies", USE)}
          {group("Your rate", MARGIN)}
        </div>
        {group("Per hour flown", PER_HOUR)}
        {group("Per year, flown or not", PER_YEAR)}
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-white p-5 sm:p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Wet rate (fuel included), {rateLabel}</dt>
            <dd className="mt-0.5 text-3xl font-semibold text-brand-surface tabular-nums">{r.wetRate ? `${money(r.wetRate)}/hr` : "Add your costs"}</dd>
            {r.ratio > 0 && r.wetRate > 0 && <dd className="mt-0.5 text-sm text-muted-foreground tabular-nums">{money(r.wetRate * r.ratio)} per tach hour</dd>}
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Dry rate (renter buys fuel), {rateLabel}</dt>
            <dd className="mt-0.5 text-3xl font-semibold text-brand-surface tabular-nums">{r.dryRate ? `${money(r.dryRate)}/hr` : "Add your costs"}</dd>
            {r.ratio > 0 && r.dryRate > 0 && <dd className="mt-0.5 text-sm text-muted-foreground tabular-nums">{money(r.dryRate * r.ratio)} per tach hour</dd>}
          </div>
        </dl>

        <div className="overflow-x-auto">
          <table className="w-full text-sm tabular-nums">
            <caption className="sr-only">Cost per hour, line by line</caption>
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Cost</th>
                <th className="py-2 pr-4 font-medium">How it is worked out</th>
                <th className="py-2 text-right font-medium">Per hour</th>
              </tr>
            </thead>
            <tbody>
              {r.lines.map((l) => (
                <tr key={l.label} className="border-b border-border/70">
                  <td className="py-2 pr-4 font-medium text-brand-surface">{l.label}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{l.how}</td>
                  <td className="py-2 text-right">{money(l.perHour)}</td>
                </tr>
              ))}
              <tr className="border-b border-border/70">
                <td className="py-2 pr-4 font-semibold text-brand-surface">Cost per hour, wet</td>
                <td className="py-2 pr-4 text-muted-foreground">every line above</td>
                <td className="py-2 text-right font-semibold">{money(r.wetCost)}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-brand-surface">Cost per hour, dry</td>
                <td className="py-2 pr-4 text-muted-foreground">without fuel</td>
                <td className="py-2 text-right font-semibold">{money(r.dryCost)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {r.hours > 0 && r.wetRate > 0 && (
          <p className="text-sm text-muted-foreground">
            At {r.hours.toLocaleString("en-US")} hours a year on the wet rate, it brings in {whole(r.yearRevenue)} against {whole(r.yearCost)} of cost
            {r.margin ? `, ${whole(r.yearRevenue - r.yearCost)} left over` : ""}. Fewer hours than planned raises the cost of every hour, because the
            fixed costs are still owed.
          </p>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        Aircraft only: instruction is priced separately. Every hour here is a Hobbs hour; if you bill by tach, add your Hobbs-to-tach ratio and use the
        per tach hour figure. Nothing you type leaves this page.
      </p>
    </div>
  );
}
