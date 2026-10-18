import type { Metadata } from "next";
import Link from "next/link";
import { Rss } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdList } from "@/components/ad-library/ad-list";
import { LibraryNotice } from "@/components/ad-library/notice";
import { AD_BASE, adDate, getRecent } from "@/lib/ad-library";

// Hourly is the point of this page: it lists what the FAA filed in the last hour or two.
export const revalidate = 900;

export const metadata: Metadata = {
  title: "New FAA Airworthiness Directives: This Month and Tomorrow's",
  description:
    "Airworthiness Directives published in the last 30 days, and the ones the FAA has filed for publication tomorrow, checked every hour. With an RSS feed.",
  alternates: { canonical: `${AD_BASE}/new`, types: { "application/rss+xml": `${AD_BASE}/feed.xml` } },
};

export default async function NewAdsPage() {
  const recent = await getRecent(30);
  const upcoming = recent.filter((a) => a.onPublicInspection);
  const published = recent.filter((a) => !a.onPublicInspection);
  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "AD library", href: AD_BASE },
          { name: "New ADs", href: `${AD_BASE}/new` },
        ]}
      />
      <header className="mt-6 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">New Airworthiness Directives</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Checked against the Federal Register every hour, including its public-inspection desk, where ADs are filed the day before they
          are published.
        </p>
        <Link href={`${AD_BASE}/feed.xml`} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          <Rss className="size-4" aria-hidden /> RSS feed
        </Link>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-brand-surface">To be published{upcoming[0] ? ` ${adDate(upcoming[0].publishedOn, "long")}` : ""}</h2>
        <AdList
          ads={upcoming}
          filters={false}
          emptyText="Nothing is on public inspection right now. ADs are usually filed on weekday mornings, Eastern time."
        />
      </section>

      <section className="mt-12 space-y-3">
        <h2 className="text-xl font-semibold text-brand-surface">Published in the last 30 days</h2>
        <AdList ads={published} emptyText="No ADs were published in the last 30 days." />
      </section>

      <LibraryNotice className="mt-10" />
    </article>
  );
}
