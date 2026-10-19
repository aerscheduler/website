import { fmt } from "@/lib/ad-library";
import { defaultTbo, FUEL_BURN, GUIDE_BASE, guideTitle, type Guide } from "@/lib/aircraft-guides";

/**
 * Model-against-model comparisons (www.aerscheduler.com/aircraft/compare/<a>-vs-<b>): two
 * ownership guides side by side. Only pairs people actually weigh against each other, chosen by
 * hand, both of which have a guide; a pair whose guide is missing is simply not built.
 */
export const COMPARE_BASE = `${GUIDE_BASE}/compare`;

export const PAIRS: [string, string][] = [
  // Trainers and four-seat fixed-gear
  ["cessna-172s", "piper-pa-28-181"],
  ["cessna-172n", "piper-pa-28-161"],
  ["cessna-172m", "piper-pa-28-140"],
  ["cessna-152", "piper-pa-38-112"],
  ["cessna-152", "cessna-150m"],
  ["cessna-150l", "cessna-150m"],
  ["cessna-172m", "cessna-172n"],
  ["cessna-172n", "cessna-172p"],
  ["cessna-172r", "cessna-172s"],
  ["piper-pa-28-161", "piper-pa-28-181"],
  ["piper-pa-28-140", "piper-pa-28-180"],
  ["cirrus-sr20", "diamond-da-40"],
  ["cirrus-sr20", "cessna-172s"],
  ["diamond-da-40", "cessna-172s"],
  ["diamond-da-40", "piper-pa-28-181"],
  ["grumman-american-aa-5b", "piper-pa-28-181"],
  ["cessna-177b", "piper-pa-28-181"],
  ["beechcraft-c23", "piper-pa-28-181"],
  ["cessna-172s", "cessna-182t"],
  // Step-up and high-performance
  ["cirrus-sr22", "cirrus-sr22t"],
  ["cirrus-sr22", "beechcraft-a36"],
  ["cirrus-sr22", "cessna-182t"],
  ["cirrus-sr22", "mooney-m20r"],
  ["cirrus-sr22t", "cessna-t206h"],
  ["cessna-182p", "cessna-182q"],
  ["cessna-182s", "cessna-182t"],
  ["cessna-182p", "beechcraft-a36"],
  ["cessna-182t", "cessna-u206g"],
  ["cessna-182q", "piper-pa-32-300"],
  ["cessna-210l", "beechcraft-a36"],
  ["beechcraft-v35b", "beechcraft-a36"],
  ["piper-pa-32r-301", "beechcraft-a36"],
  ["mooney-m20j", "piper-pa-28r-201"],
  ["mooney-m20j", "piper-pa-28r-200"],
  ["mooney-m20c", "mooney-m20j"],
  ["piper-pa-24-250", "mooney-m20c"],
  ["cessna-172rg", "piper-pa-28r-201"],
  ["piper-pa-28r-200", "piper-pa-28r-201"],
  // Classics, taildraggers, backcountry
  ["piper-j3c-65", "aeronca-7ac"],
  ["cessna-140", "aeronca-7ac"],
  ["cessna-140", "cessna-170b"],
  ["cessna-170b", "piper-pa-22-160"],
  ["piper-pa-18-150", "aviat-a-1b"],
  ["cessna-180", "cessna-a185f"],
  // Twins and helicopters
  ["piper-pa-34-200t", "beechcraft-58"],
  ["cessna-310r", "beechcraft-58"],
  ["robinson-r22", "robinson-r44"],
];

export const pairSlug = (a: string, b: string) => `${a}-vs-${b}`;
export const compareHref = (a: string, b: string) => `${COMPARE_BASE}/${pairSlug(a, b)}`;

/** "cessna-172s-vs-piper-pa-28-181" back to its pair, only when it is one of PAIRS. */
export function parsePair(slug: string): [string, string] | null {
  return PAIRS.find(([a, b]) => pairSlug(a, b) === slug) ?? null;
}

/** The pairs a model is in, the other model first. */
export function pairsFor(slug: string): { other: string; href: string }[] {
  return PAIRS.filter(([a, b]) => a === slug || b === slug).map(([a, b]) => ({ other: a === slug ? b : a, href: compareHref(a, b) }));
}

export const pairTitle = (a: Guide, b: Guide) => `${guideTitle(a)} vs ${guideTitle(b)}`;

/** Per 1,000 registered today: a way to set two fleets of different sizes side by side, not a rate per hour flown. */
const per1000 = (n: number, fleet: number) => (fleet ? ((n / fleet) * 1000).toFixed(1) : "0");

export type Row = { label: string; a: string; b: string; note?: string };

/** The side-by-side table, every figure from the two guides. */
export function compareRows(a: Guide, b: Guide): Row[] {
  const y = (g: Guide) => g.profile?.years;
  const engine = (g: Guide) => g.engines[0]?.name ?? "Not recorded";
  const burn = (g: Guide) => (FUEL_BURN[g.slug] ? `${FUEL_BURN[g.slug]} gal/hr` : "Not set");
  const tbo = (g: Guide) => {
    const t = defaultTbo(g.slug, g.engines[0]?.name ?? null);
    return t ? `${fmt(t)} hr` : "Not set";
  };
  const engineAds = (g: Guide) => (g.engines[0]?.ads ? `${g.engines[0].ads.current}` : "Not recorded");
  return [
    { label: "Registered in the US", a: fmt(a.fleetCount), b: fmt(b.fleetCount) },
    { label: "Built", a: y(a) ? `${y(a)!.oldest} to ${y(a)!.newest}` : "Not recorded", b: y(b) ? `${y(b)!.oldest} to ${y(b)!.newest}` : "Not recorded" },
    { label: "Half built by", a: y(a) ? String(y(a)!.median) : "Not recorded", b: y(b) ? String(y(b)!.median) : "Not recorded" },
    { label: "Seats", a: a.profile?.seats ? String(a.profile.seats) : "Not recorded", b: b.profile?.seats ? String(b.profile.seats) : "Not recorded" },
    { label: "Most common engine", a: engine(a), b: engine(b) },
    { label: "Typical cruise fuel burn", a: burn(a), b: burn(b) },
    { label: "Engine overhaul interval", a: tbo(a), b: tbo(b), note: "The engine maker's published hours between overhauls." },
    { label: "Current airframe ADs", a: String(a.ads.current), b: String(b.ads.current) },
    { label: "Airframe ADs with a repeat action", a: String(a.ads.repetitive.length), b: String(b.ads.repetitive.length) },
    { label: "Current ADs on the main engine", a: engineAds(a), b: engineAds(b) },
    {
      label: "Service Difficulty Reports",
      a: a.problems ? `${fmt(a.problems.reports)} (${per1000(a.problems.reports, a.fleetCount)} per 1,000)` : "None",
      b: b.problems ? `${fmt(b.problems.reports)} (${per1000(b.problems.reports, b.fleetCount)} per 1,000)` : "None",
      note: "Since the year shown in each guide; per 1,000 registered today.",
    },
    { label: "Most-reported system", a: a.problems?.systems[0]?.name ?? "None", b: b.problems?.systems[0]?.name ?? "None" },
    {
      label: "Accidents since 2008",
      a: a.safety ? `${fmt(a.safety.accidents)} (${per1000(a.safety.accidents, a.fleetCount)} per 1,000)` : "None",
      b: b.safety ? `${fmt(b.safety.accidents)} (${per1000(b.safety.accidents, b.fleetCount)} per 1,000)` : "None",
      note: "Per 1,000 registered today, not per hour flown: a training fleet flies far more than a private one.",
    },
    { label: "Fatal accidents since 2008", a: a.safety ? fmt(a.safety.fatal) : "None", b: b.safety ? fmt(b.safety.fatal) : "None" },
    { label: "Most common accident", a: a.safety?.events[0]?.name ?? "None", b: b.safety?.events[0]?.name ?? "None" },
  ];
}

/** The differences worth a sentence, each stated from the figures. */
export function differences(a: Guide, b: Guide): string[] {
  const out: string[] = [];
  const ya = a.profile?.years;
  const yb = b.profile?.years;
  if (ya && yb && Math.abs(ya.median - yb.median) >= 5) {
    const [newer, older] = ya.median > yb.median ? [a, b] : [b, a];
    out.push(`The ${newer.name} fleet is younger: half of those registered were built by ${newer.profile!.years!.median}, against ${older.profile!.years!.median} for the ${older.name}.`);
  }
  if (Math.max(a.fleetCount, b.fleetCount) >= 1.5 * Math.min(a.fleetCount, b.fleetCount)) {
    const [more, fewer] = a.fleetCount > b.fleetCount ? [a, b] : [b, a];
    out.push(`There are more ${more.name}s to choose from: ${fmt(more.fleetCount)} registered against ${fmt(fewer.fleetCount)}.`);
  }
  if (a.engines[0] && b.engines[0] && a.engines[0].name !== b.engines[0].name) {
    out.push(`Most ${a.name}s have the ${a.engines[0].name}; most ${b.name}s the ${b.engines[0].name}.`);
  }
  const fa = FUEL_BURN[a.slug];
  const fb = FUEL_BURN[b.slug];
  if (fa && fb && fa !== fb) {
    const [thirsty, frugal] = fa > fb ? [a, b] : [b, a];
    out.push(`The ${thirsty.name} burns more fuel in a typical cruise: about ${Math.max(fa, fb)} gallons an hour against ${Math.min(fa, fb)}.`);
  }
  if (a.ads.repetitive.length !== b.ads.repetitive.length) {
    const [more, fewer] = a.ads.repetitive.length > b.ads.repetitive.length ? [a, b] : [b, a];
    out.push(`The ${more.name} carries more airframe ADs with a repeat action, ${more.ads.repetitive.length} against ${fewer.ads.repetitive.length}: inspections that come back for as long as the AD applies.`);
  }
  const sa = a.problems?.systems[0]?.name;
  const sb = b.problems?.systems[0]?.name;
  if (sa && sb && sa !== sb) out.push(`Mechanics report the ${a.name}'s ${sa.toLowerCase()} most, and the ${b.name}'s ${sb.toLowerCase()}.`);
  return out;
}
