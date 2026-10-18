"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { apiBase, pageHref } from "@/lib/ad-library";

/**
 * Confirm or stop a follow, by a button. The email's link only opens this page: mail scanners
 * open links, and a link that confirmed or unsubscribed by itself would do it for them.
 */
export function FollowManage({
  token,
  follow,
}: {
  token: string;
  follow: { email: string; kind: string; slug: string; name: string; confirmed: boolean; stopped: boolean };
}) {
  const [state, setState] = useState<"confirmed" | "stopped" | "pending">(follow.stopped ? "stopped" : follow.confirmed ? "confirmed" : "pending");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function act(path: "confirm" | "stop", body?: object) {
    setBusy(path + JSON.stringify(body ?? {}));
    setError(null);
    try {
      const res = await fetch(`${apiBase}/follow/${encodeURIComponent(token)}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body ?? {}),
      });
      if (!res.ok) throw new Error();
      setState(path === "confirm" ? "confirmed" : "stopped");
    } catch {
      setError("That did not work. Try again in a minute.");
    } finally {
      setBusy(null);
    }
  }

  const page = (
    <Link href={pageHref(follow.kind, follow.slug)} className="font-medium text-primary hover:underline">
      {follow.name}
    </Link>
  );

  return (
    <div className="mt-6 space-y-5 rounded-lg border border-border bg-white p-6">
      {state === "pending" && (
        <>
          <p>
            Email {follow.email} each new Airworthiness Directive filed for the {page}?
          </p>
          <button onClick={() => act("confirm")} disabled={!!busy} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
            {busy && <Loader2 className="size-4 animate-spin" aria-hidden />} Confirm
          </button>
        </>
      )}
      {state === "confirmed" && (
        <>
          <p>
            {follow.email} gets each new AD filed for the {page}, the day the FAA files it.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => act("stop")} disabled={!!busy} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-60">
              Stop emails for the {follow.name}
            </button>
            <button onClick={() => act("stop", { all: true })} disabled={!!busy} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-60">
              Stop every AD library email
            </button>
          </div>
        </>
      )}
      {state === "stopped" && (
        <p>
          No more emails about the {page} to {follow.email}. Follow it again from its page whenever you like.
        </p>
      )}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
