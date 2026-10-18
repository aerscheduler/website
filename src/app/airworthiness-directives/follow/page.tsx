import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FollowManage } from "@/components/ad-library/follow-manage";
import { AD_BASE, apiBase } from "@/lib/ad-library";

export const metadata: Metadata = {
  title: "Your AD library emails",
  description: "Confirm or stop the emails the AerScheduler AD library sends about new Airworthiness Directives.",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ token?: string }> };

export default async function FollowPage({ searchParams }: Props) {
  const { token = "" } = await searchParams;
  let follow: { email: string; kind: string; slug: string; name: string; confirmed: boolean; stopped: boolean } | null = null;
  if (token) {
    try {
      const res = await fetch(`${apiBase}/follow/${encodeURIComponent(token)}`, { cache: "no-store" });
      if (res.ok) follow = (await res.json()).data;
    } catch {
      follow = null;
    }
  }
  return (
    <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "AD library", href: AD_BASE },
          { name: "Your emails", href: `${AD_BASE}/follow` },
        ]}
      />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand-surface">Your AD library emails</h1>
      {follow ? (
        <FollowManage token={token} follow={follow} />
      ) : (
        <p className="mt-4 text-muted-foreground">
          That link is not valid any more. Follow a page again from its follow box, and use the link in the newest email.
        </p>
      )}
    </article>
  );
}
