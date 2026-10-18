import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * What this library is not, said where it matters rather than in a footer. Every AD and every
 * model page carries it: a page somebody relies on has to say what it does not cover.
 */
export function LibraryNotice({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <aside className={cn("flex gap-3 rounded-lg border border-border bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground", className)}>
      <Info className="mt-0.5 size-4 shrink-0 text-brand-surface" aria-hidden />
      <div className="space-y-1.5">
        <p>
          <span className="font-medium text-brand-surface">Not the official record.</span>{" "}The text is the Federal Register&apos;s,
          laid out for reading; the Federal Register document linked on each AD is the legal version, and the FAA&apos;s DRS
          shows the current revision.
        </p>
        {!compact && (
          <p>
            Only ADs published since 1995 are listed. Whether an AD applies to a particular aircraft depends on its serial
            number, installed equipment and records, and is decided by a certificated mechanic, not by this list.
          </p>
        )}
      </div>
    </aside>
  );
}

/** The pre-1995 gap, at the top of a model page where an older airframe's owner will look. */
export function Pre1995Note() {
  return (
    <p className="rounded-lg border border-amber-300/70 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
      <span className="font-semibold">ADs issued before 1995 are not listed.</span>{" "}Many older aircraft have ADs from the 1970s and
      1980s still in force; check those in the FAA&apos;s DRS.
    </p>
  );
}
