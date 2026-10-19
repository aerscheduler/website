"use client";

import { useMemo, useState } from "react";

/**
 * What one model costs to own, worked out from the owner's own numbers: fuel, an engine reserve
 * (the overhaul cost spread over the hours to overhaul), a maintenance reserve, and the fixed
 * costs of a year spread over the hours flown. Only fuel burn and the engine maker's published
 * overhaul time arrive filled in, and only for engines where one figure covers the type; every
 * other number is the owner's, because insurance, hangars and overhauls vary too much by
 * pilot, airport and shop for a default to mean anything.
 */
type Field = { key: string; label: string; unit: string; placeholder: string; hint?: string };

const VARIABLE: Field[] = [
  { key: "fuelBurn", label: "Fuel burn", unit: "gal/hr", placeholder: "9.5", hint: "Typical cruise; your POH and how you fly decide it." },
  { key: "fuelPrice", label: "Fuel price", unit: "$/gal", placeholder: "0.00" },
  { key: "overhaulCost", label: "Engine overhaul", unit: "$", placeholder: "0.00", hint: "A quote from an engine shop." },
  { key: "tbo", label: "Hours to overhaul", unit: "hr", placeholder: "2000", hint: "The engine maker's published time between overhauls." },
  { key: "maintenance", label: "Maintenance reserve", unit: "$/hr", placeholder: "0.00", hint: "Everything else that wears: tires, brakes, avionics, the unexpected." },
];

const FIXED: Field[] = [
  { key: "insurance", label: "Insurance", unit: "$/yr", placeholder: "0.00" },
  { key: "hangar", label: "Hangar or tiedown", unit: "$/yr", placeholder: "0.00" },
  { key: "annual", label: "Annual inspection", unit: "$/yr", placeholder: "0.00" },
  { key: "loan", label: "Loan payments", unit: "$/yr", placeholder: "0.00" },
  { key: "other", label: "Everything else", unit: "$/yr", placeholder: "0.00", hint: "Subscriptions, database updates, the property tax some states charge." },
];

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export function CostEstimator({ model, fuelBurn, tbo, engine }: { model: string; fuelBurn: number | null; tbo: number | null; engine: string | null }) {
  const [v, setV] = useState<Record<string, string>>({
    hours: "100",
    fuelBurn: fuelBurn ? String(fuelBurn) : "",
    fuelPrice: "",
    overhaulCost: "",
    tbo: tbo ? String(tbo) : "",
    maintenance: "",
    insurance: "",
    hangar: "",
    annual: "",
    loan: "",
    other: "",
  });
  const num = (k: string) => {
    const n = Number(v[k]);
    return Number.isFinite(n) && n > 0 ? n : 0;
  };

  const r = useMemo(() => {
    const hours = num("hours");
    const fuel = num("fuelBurn") * num("fuelPrice");
    const engineReserve = num("tbo") ? num("overhaulCost") / num("tbo") : 0;
    const variable = fuel + engineReserve + num("maintenance");
    const fixed = FIXED.reduce((t, f) => t + num(f.key), 0);
    return { hours, fuel, engineReserve, variable, fixed, year: variable * hours + fixed, perHour: hours ? variable + fixed / hours : 0 };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v]);

  const input = (f: Field) => (
    <label key={f.key} className="block">
      <span className="text-sm font-medium text-brand-surface">{f.label}</span>
      <span className="mt-1 flex items-center rounded-lg border border-border bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <input
          inputMode="decimal"
          value={v[f.key]}
          placeholder={f.placeholder}
          onChange={(e) => setV({ ...v, [f.key]: e.target.value.replace(/[^\d.]/g, "") })}
          className="h-10 w-full min-w-0 rounded-lg bg-transparent px-3 text-sm tabular-nums outline-none placeholder:text-muted-foreground/70"
        />
        <span className="shrink-0 pr-3 text-xs text-muted-foreground">{f.unit}</span>
      </span>
      {f.hint && <span className="mt-1 block text-xs text-muted-foreground">{f.hint}</span>}
    </label>
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Per hour flown</p>
          {input({ key: "hours", label: "Hours flown a year", unit: "hr/yr", placeholder: "100" })}
          {VARIABLE.map(input)}
        </div>
        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Per year, flown or not</p>
          {FIXED.map(input)}
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-white p-5 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-xs text-muted-foreground">Fuel</dt>
          <dd className="mt-0.5 text-lg font-semibold text-brand-surface tabular-nums">{money(r.fuel)}/hr</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Engine reserve</dt>
          <dd className="mt-0.5 text-lg font-semibold text-brand-surface tabular-nums">{money(r.engineReserve)}/hr</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">A year</dt>
          <dd className="mt-0.5 text-lg font-semibold text-brand-surface tabular-nums">{money(r.year)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">All in, per hour</dt>
          <dd className="mt-0.5 text-lg font-semibold text-brand-surface tabular-nums">{r.hours ? `${money(r.perHour)}/hr` : "Add hours"}</dd>
        </div>
      </dl>
      <p className="text-sm text-muted-foreground">
        {fuelBurn || tbo
          ? `Filled in for a ${model}${engine ? ` with the ${engine}` : ""}: ${[fuelBurn ? "a typical cruise fuel burn" : null, tbo ? "the engine maker's published overhaul time" : null].filter(Boolean).join(" and ")}. `
          : ""}
        Everything else is yours to fill in: insurance, hangar and overhaul prices vary too much by pilot, airport and shop for a default to mean anything. Nothing you type leaves this page.
      </p>
    </div>
  );
}
