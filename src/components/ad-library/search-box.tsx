"use client";

import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { AD_BASE } from "@/lib/ad-library";
import { cn } from "@/lib/cn";

/**
 * The library search. A plain GET form underneath, so it works without JavaScript; with it, the
 * search is a client navigation and the button says it is searching until the results arrive.
 */
export function AdSearchBox({
  defaultValue = "",
  className,
  autoFocus = false,
  pending: forcedPending = false,
}: {
  defaultValue?: string;
  className?: string;
  autoFocus?: boolean;
  /** Shown already searching: the loading page's copy of the box. */
  pending?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pending = isPending || forcedPending;
  return (
    <form
      action={`${AD_BASE}/search`}
      method="get"
      role="search"
      className={cn("flex w-full gap-2", className)}
      onSubmit={(e) => {
        const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
        e.preventDefault();
        if (!q) return;
        startTransition(() => router.push(`${AD_BASE}/search?q=${encodeURIComponent(q)}`));
      }}
    >
      <label className="relative flex-1">
        <span className="sr-only">Search Airworthiness Directives</span>
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          placeholder="AD number, aircraft, engine, part or problem"
          className="h-12 w-full rounded-lg border border-border bg-white pr-3 pl-10 text-base text-foreground shadow-sm outline-none placeholder:text-muted-foreground/80 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>
      <button
        type="submit"
        aria-busy={pending}
        className="inline-flex h-12 shrink-0 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
      >
        {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {pending ? "Searching" : "Search"}
      </button>
    </form>
  );
}
