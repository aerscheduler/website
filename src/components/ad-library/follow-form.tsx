"use client";

import { useState } from "react";
import { BellRing, Check, Loader2 } from "lucide-react";
import { apiBase } from "@/lib/ad-library";

/**
 * Follow a page by email: no account. The API emails a confirmation link; only after it is
 * clicked does anything else arrive, and every email after that carries a link that stops it.
 */
export function FollowForm({ kind, slug, name }: { kind: string; slug: string; name: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "already" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError(null);
    try {
      const res = await fetch(`${apiBase}/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, kind, slug }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body?.message ?? "That did not work. Try again in a minute.");
        setState("error");
        return;
      }
      setState(body?.data?.status === "already" ? "already" : "sent");
    } catch {
      setError("That did not work. Try again in a minute.");
      setState("error");
    }
  }

  if (state === "sent" || state === "already") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
        <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
        <p>
          {state === "already"
            ? `${email} already follows the ${name}.`
            : `Check ${email} for a confirmation link. Nothing is sent until you click it.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <p className="flex items-center gap-2 text-sm font-medium text-brand-surface">
        <BellRing className="size-4" aria-hidden />
        Email me new ADs for the {name}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
        >
          {state === "sending" && <Loader2 className="size-4 animate-spin" aria-hidden />}
          Follow
        </button>
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <p className="text-xs text-muted-foreground">Free, no account. Sent the day the FAA files a new AD for publication. Unsubscribe from any email.</p>
    </form>
  );
}
