import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LibraryNotice } from "@/components/ad-library/notice";
import { AD_BASE, adAbout, adDate, adHref, adTitle, getMonth, PRODUCT_LABEL } from "@/lib/ad-library";

/**
 * Every AD published in one month, grouped by the kind of product it is for, with the FAA's own
 * summary of each: the monthly roundup. Written by nobody, so it is always exactly the record.
 */
export const revalidate = 3600;
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ month: string }> };
const monthName = (ym: string) => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${ym}-01T00:00:00Z`));
const ORDER = ["airplane", "rotorcraft", "engine", "propeller", "appliance", "glider", "balloon", "various"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { month } = await params;
  if (!/^\d{4}-\d{2}$/.test(month)) return { robots: { index: false } };
  const ads = await getMonth(month);
  const title = `Airworthiness Directives published in ${monthName(month)}`;
  return {
    title,
    description: `All ${ads?.length ?? ""} FAA Airworthiness Directives published in ${monthName(month)}, with the FAA's summary of each, grouped by airplanes, rotorcraft, engines, propellers and equipment.`,
    alternates: { canonical: `${AD_BASE}/monthly/${month}` },
    robots: ads && ads.length ? undefined : { index: false },
  };
}

export default async function MonthPage({ params }: Props) {
  const { month } = await params;
  if (!/^\d{4}-\d{2}$/.test(month)) notFound();
  const ads = await getMonth(month);
  if (!ads) notFound();
  const groups = ORDER.map((t) => ({ t, ads: ads.filter((a) => a.productType === t) })).filter((g) => g.ads.length);
  const [y, m] = month.split("-").map(Number);
  const prev = `${m === 1 ? y - 1 : y}-${String(m === 1 ? 12 : m - 1).padStart(2, "0")}`;
  const next = `${m === 12 ? y + 1 : y}-${String(m === 12 ? 1 : m + 1).padStart(2, "0")}`;
  const nowYm = new Date().toISOString().slice(0, 7);
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "AD library", href: AD_BASE },
          { name: "By month", href: `${AD_BASE}/monthly` },
          { name: monthName(month), href: `${AD_BASE}/monthly/${month}` },
        ]}
      />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">ADs published in {monthName(month)}</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        {ads.length} Airworthiness Directive{ads.length === 1 ? "" : "s"}
        {groups.length > 1 && `: ${groups.map((g) => `${g.ads.length} ${(PRODUCT_LABEL[g.t] ?? g.t).toLowerCase()}`).join(", ")}`}.
      </p>
      <nav className="mt-4 flex gap-4 text-sm" aria-label="Months">
        <Link href={`${AD_BASE}/monthly/${prev}`} className="text-primary hover:underline">{monthName(prev)}</Link>
        {next <= nowYm && <Link href={`${AD_BASE}/monthly/${next}`} className="text-primary hover:underline">{monthName(next)}</Link>}
      </nav>
      <div className="mt-10 space-y-12">
        {groups.map((g) => (
          <section key={g.t} className="space-y-5">
            <h2 className="text-xl font-semibold text-brand-surface">{PRODUCT_LABEL[g.t] ?? g.t}</h2>
            {g.ads.map((a) => (
              <div key={a.adNumber} className="space-y-1 border-b border-border pb-5 last:border-0">
                <p className="text-sm text-muted-foreground">
                  <Link href={adHref(a.adNumber)} className="font-mono font-medium text-primary hover:underline">AD {a.adNumber}</Link>
                  {" · "}published {adDate(a.publishedOn)}
                  {a.effectiveOn ? `, effective ${adDate(a.effectiveOn)}` : ""}
                </p>
                <h3 className="font-semibold text-brand-surface">
                  <Link href={adHref(a.adNumber)} className="hover:underline">{adAbout(a)}</Link>
                </h3>
                <p className="text-sm text-muted-foreground">{adTitle(a.title)}</p>
                {a.summary && <p className="text-[15px] leading-relaxed">{a.summary}</p>}
              </div>
            ))}
          </section>
        ))}
      </div>
      <LibraryNotice className="mt-10" compact />
    </article>
  );
}
