import Link from "next/link";
import { cn } from "@/lib/cn";
import { regHref, shortCite, type Reg } from "@/lib/regulations";

/** A list of regulation pages: the cite, our name for it, and the one-line answer. */
export function RegList({ regs, className }: { regs: Reg[]; className?: string }) {
  return (
    <ul className={cn("divide-y divide-border border-y border-border", className)}>
      {regs.map((r) => (
        <li key={r.slug}>
          <Link href={regHref(r.slug)} className="group grid gap-x-5 gap-y-1 py-4 sm:grid-cols-[7.5rem_1fr]">
            <span className="font-medium text-primary tabular-nums">{shortCite(r)}</span>
            <span className="min-w-0">
              <span className="block font-medium text-brand-surface group-hover:text-primary">{r.name}</span>
              <span className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{r.summary.answer}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
