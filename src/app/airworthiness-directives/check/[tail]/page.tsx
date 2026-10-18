import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Chip } from "@/components/ad-library/ad-list";
import { LibraryNotice } from "@/components/ad-library/notice";
import { PrintButton } from "@/components/ad-library/print-button";
import { TailCheckForm } from "@/components/ad-library/tail-check-form";
import {
  AD_BASE,
  adAbout,
  adHref,
  adPublished,
  CHECK_BASE,
  checkHref,
  fmt,
  getRegistration,
  isTailNumber,
  pageHref,
  tailKey,
  type AdMatchInfo,
  type AdRow,
} from "@/lib/ad-library";
import { signupUrl } from "@/lib/site";

/**
 * One aircraft's AD check: its registry record, the ADs that name its airframe and engine, and
 * the equipment ADs that name its model, laid out to read on screen and to print as a pre-buy
 * or annual checklist. Not indexed: it is a tool's answer about somebody's aeroplane.
 */
export const revalidate = 3600;

type Props = { params: Promise<{ tail: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tail } = await params;
  const n = `N${tailKey(decodeURIComponent(tail))}`;
  return { title: `${n} Airworthiness Directives Check`, robots: { index: false, follow: true }, alternates: { canonical: checkHref(n) } };
}

function matchLabel(m: AdMatchInfo) {
  return m.strength === "family" ? `Names the ${m.token} family` : m.strength === "range" ? `Covers it: ${m.token}` : `Names the ${m.token}`;
}

function titleCase(s: string) {
  return s.toLowerCase().replace(/\b([a-z])/g, (c) => c.toUpperCase()).replace(/\bInc\b\.?/g, "Inc.");
}

export default async function TailCheckResult({ params }: Props) {
  const { tail } = await params;
  const raw = decodeURIComponent(tail);
  if (!isTailNumber(raw)) redirect(CHECK_BASE);
  const n = `N${tailKey(raw)}`;
  // One address per registration: /check/n172sp becomes /check/N172SP.
  if (raw !== n) redirect(checkHref(n));
  const check = await getRegistration(n);

  const crumbs = [
    { name: "AD library", href: AD_BASE },
    { name: "Check by N-number", href: CHECK_BASE },
    { name: n, href: checkHref(n) },
  ];

  if (!check) {
    return (
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand-surface">No US registration {n}</h1>
        <p className="mt-3 text-muted-foreground">
          The FAA registry has no aircraft registered as {n}. Check the number, or look up the model instead in{" "}
          <Link href={`${AD_BASE}/aircraft`} className="text-primary hover:underline">
            ADs by aircraft model
          </Link>
          .
        </p>
        <TailCheckForm className="mt-8" />
      </article>
    );
  }

  const { aircraft: a, counts } = check;
  const airframe = check.ads.filter((x) => x.match.on === "airframe");
  const engine = check.ads.filter((x) => x.match.on !== "airframe");
  const name = [a.year, titleCase(a.make), a.model].filter(Boolean).join(" ");
  // The library's name for the engine ("Continental C90") over the registry's ("CONT MOTOR C90 SERIES").
  const engineName = a.pages.engine?.name ?? (a.engineMake || a.engineModel ? [a.engineMake ? titleCase(a.engineMake) : null, a.engineModel].filter(Boolean).join(" ") : null);
  const printed = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date());

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14 print:max-w-none print:p-0">
      {/* On paper: the checklist alone, without the site around it. */}
      <style>{"@media print { body > header, body footer, .site-chrome { display: none !important } a { color: inherit !important; text-decoration: none !important } }"}</style>
      <div className="print:hidden">
        <Breadcrumbs items={crumbs} />
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium tracking-wide text-primary uppercase print:text-foreground">AD check</p>
          <h1 className="mt-1 font-mono text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">{n}</h1>
          <p className="mt-1 text-lg text-muted-foreground">{name}</p>
        </div>
        <PrintButton />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-border bg-white p-4 text-sm sm:grid-cols-4">
        <Fact label="Serial number">{a.serialNumber ?? "Not in the registry"}</Fact>
        <Fact label="Engine">{engineName ?? "Not in the registry"}</Fact>
        <Fact label="Propeller">Not in the registry</Fact>
        <Fact label="Checked">{printed}</Fact>
      </dl>

      <p className="mt-6 text-[15px] text-brand-surface">
        {counts.listed === 0
          ? "No AD in the library names this aircraft's airframe or engine."
          : `${fmt(counts.listed)} AD${counts.listed === 1 ? "" : "s"} name this aircraft's airframe or engine${counts.repetitive ? `, ${fmt(counts.repetitive)} with a repeat action` : ""}.`}
        {counts.superseded > 0 && ` ${fmt(counts.superseded)} superseded AD${counts.superseded === 1 ? " is" : "s are"} left out.`}
        {counts.equipment > 0 && ` ${fmt(counts.equipment)} equipment AD${counts.equipment === 1 ? " names" : "s name"} the model.`}
      </p>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
        A list to read, not a determination: check each AD&apos;s serial number range against {a.serialNumber ? `serial ${a.serialNumber}` : "the aircraft's serial"},
        and the logbooks for how and when it was complied with.
      </p>

      <div className="mt-8 space-y-10">
        <CheckSection title={`Airframe${a.pages.aircraft ? `: ${a.pages.aircraft.name}` : ""}`} ads={airframe} empty="No AD names the airframe." pageLink={a.pages.aircraft ? pageHref("aircraft", a.pages.aircraft.slug) : null} />
        <CheckSection title={`Engine${a.pages.engine ? `: ${a.pages.engine.name}` : engineName ? `: ${engineName}` : ""}`} ads={engine} empty={engineName ? "No AD names the engine." : "The registry gives no engine for this aircraft."} pageLink={a.pages.engine ? pageHref("engine", a.pages.engine.slug) : null} />
        {check.equipment.length > 0 && (
          <CheckSection
            title="Equipment ADs that name the model"
            note="Written for a part (a muffler, a seat belt, a display) and naming this model. Each applies only if that part is installed."
            ads={check.equipment}
            empty=""
            pageLink={null}
          />
        )}
        <section className="space-y-2 print:break-inside-avoid">
          <h2 className="text-xl font-semibold text-brand-surface">Propeller and installed equipment</h2>
          <p className="max-w-3xl text-[15px] text-muted-foreground">
            The FAA registry does not record the propeller or what is installed, so their ADs are not found from the N-number. Check the
            propeller maker&apos;s ADs on{" "}
            <Link href={`${AD_BASE}/propellers`} className="text-primary hover:underline">
              the propeller pages
            </Link>
            , and search the library for the part numbers of installed equipment.
          </p>
        </section>
      </div>

      <aside className="mt-12 flex flex-col gap-4 rounded-xl bg-brand-surface p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8 print:hidden">
        <div className="max-w-xl">
          <p className="text-lg font-semibold">Track these on {n}</p>
          <p className="mt-1 text-white/75">
            AerScheduler lists these ADs on the aircraft, records who decided each one and why, tracks the repeat inspections, and tells
            you the day the FAA files a new one.
          </p>
        </div>
        <a href={signupUrl("maintenance")} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-medium text-brand-surface hover:bg-white/90">
          Try it free <ArrowRight className="size-4" aria-hidden />
        </a>
      </aside>

      <div className="print:hidden">
        <p className="mt-10 text-sm text-muted-foreground">Check another aircraft</p>
        <TailCheckForm className="mt-2 max-w-xl" />
      </div>
      <LibraryNotice className="mt-10" compact />
    </article>
  );
}

function CheckSection({ title, note, ads, empty, pageLink }: { title: string; note?: string; ads: (AdRow & { match?: AdMatchInfo })[]; empty: string; pageLink: string | null }) {
  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold text-brand-surface">
          {title} <span className="text-base font-normal text-muted-foreground">({ads.length})</span>
        </h2>
        {pageLink && (
          <Link href={pageLink} className="text-sm text-primary hover:underline print:hidden">
            Every AD for the model
          </Link>
        )}
      </div>
      {note && <p className="max-w-3xl text-sm text-muted-foreground">{note}</p>}
      {ads.length === 0 ? (
        empty && <p className="text-[15px] text-muted-foreground">{empty}</p>
      ) : (
        <ol className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-white">
          {ads.map((ad) => (
            <li key={ad.adNumber} className="px-4 py-3 print:break-inside-avoid">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-4">
                <Link href={adHref(ad.adNumber)} className="w-28 shrink-0 pt-0.5 font-mono text-sm font-medium text-primary hover:underline">
                  {ad.adNumber}
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium text-brand-surface">{ad.requires ?? adAbout(ad)}</p>
                  <p className="text-sm text-muted-foreground">
                    {[ad.requires ? adAbout(ad) : null, ad.match ? matchLabel(ad.match) : null].filter(Boolean).join(" · ")}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {ad.repetitive && <Chip tone="blue">Repeat action</Chip>}
                    {ad.supersedes.length > 0 && <Chip tone="grey">Supersedes {ad.supersedes.join(", ")}</Chip>}
                  </div>
                </div>
                <span className="shrink-0 text-sm text-muted-foreground tabular-nums sm:pt-0.5 sm:text-right">
                  {ad.effectiveOn ? `Effective ${adPublished({ publishedOn: ad.effectiveOn })}` : adPublished(ad)}
                </span>
              </div>
              {/* Paper only: the line a mechanic fills in. */}
              <div className="mt-2 hidden gap-6 text-xs text-foreground print:flex">
                <span>&#9744; Complied &nbsp; &#9744; Not applicable</span>
                <span>Date ______________</span>
                <span>Method ________________________</span>
                <span>Next due ______________</span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium [overflow-wrap:anywhere] text-brand-surface">{children}</dd>
    </div>
  );
}
