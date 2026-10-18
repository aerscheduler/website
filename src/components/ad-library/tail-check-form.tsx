"use client";

import { Loader2, Plane } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CHECK_BASE, checkHref, isTailNumber } from "@/lib/ad-library";
import { cn } from "@/lib/cn";

/** An N-number in, the aircraft's AD check out. A plain GET form underneath, for no JavaScript. */
export function TailCheckForm({ defaultValue = "", className, autoFocus = false }: { defaultValue?: string; className?: string; autoFocus?: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      action={`${CHECK_BASE}/go`}
      method="get"
      className={cn("w-full", className)}
      onSubmit={(e) => {
        e.preventDefault();
        const raw = String(new FormData(e.currentTarget).get("n") ?? "").trim();
        if (!isTailNumber(raw)) {
          setError("An N-number is N and up to five letters and digits, such as N172SP.");
          return;
        }
        setError(null);
        startTransition(() => router.push(checkHref(raw)));
      }}
    >
      <div className="flex gap-2">
        <label className="relative flex-1">
          <span className="sr-only">N-number</span>
          <Plane className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            name="n"
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            placeholder="N-number, like N172SP"
            aria-invalid={error ? true : undefined}
            className="h-12 w-full rounded-lg border border-border bg-white pr-3 pl-10 font-mono text-base text-foreground uppercase shadow-sm outline-none placeholder:font-sans placeholder:normal-case placeholder:text-muted-foreground/80 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <button
          type="submit"
          aria-busy={pending}
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {pending ? "Checking" : "Check ADs"}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-foreground">{error}</p>}
    </form>
  );
}
