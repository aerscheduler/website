import Link from "next/link";
import { StatusChip } from "@/components/aircraft-tax/fact";
import { TOPICS, regionHref, type TaxCountry, type TaxRegion, type TaxStatus } from "@/lib/aircraft-tax";

/**
 * Regions down, topics across: the comparison people want before they read one
 * state's page. Each chip links to that answer and its sources.
 */
export function TaxMatrix({ country, regions }: { country: TaxCountry; regions: TaxRegion[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-white">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-4 py-3 font-medium text-muted-foreground">{country.regionKind === "state" ? "State" : "Region"}</th>
            {TOPICS.map((t) => (
              <th key={t} className="px-3 py-3 align-bottom font-medium text-muted-foreground">
                {country.labels[t]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {regions.map((r) => (
            <tr key={r.slug} className="border-b border-border last:border-0">
              <th scope="row" className="px-4 py-3 text-left font-medium">
                <Link href={regionHref(r)} className="text-primary hover:underline">
                  {r.name}
                </Link>
              </th>
              {TOPICS.map((t) => (
                <td key={t} className="px-3 py-3">
                  <Link href={`${regionHref(r)}#${t}`} aria-label={`${r.name}: ${country.labels[t]}`}>
                    <StatusChip status={r.facts[t].status as TaxStatus} />
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
