import { Search } from "lucide-react";
import { AD_BASE } from "@/lib/ad-library";
import { cn } from "@/lib/cn";

/** A plain form: the results are a server-rendered page, so search works without JavaScript. */
export function AdSearchBox({ defaultValue = "", className, autoFocus = false }: { defaultValue?: string; className?: string; autoFocus?: boolean }) {
  return (
    <form action={`${AD_BASE}/search`} method="get" role="search" className={cn("flex w-full gap-2", className)}>
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
      <button type="submit" className="h-12 shrink-0 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90">
        Search
      </button>
    </form>
  );
}
