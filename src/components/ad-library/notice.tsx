import { cn } from "@/lib/cn";

/**
 * What this library is not, said where it matters rather than in a footer. Every AD and every
 * model page carries it: a page somebody relies on has to say what it does not cover. Plain
 * text under a rule, never a coloured box.
 */
export function LibraryNotice({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <aside className={cn("space-y-1.5 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground", className)}>
      <p>
        <span className="font-medium text-brand-surface">Not the official record.</span>{" "}The text is the Federal Register&apos;s,
        laid out for reading; the Federal Register document linked on each AD is the legal version, and the FAA&apos;s DRS shows
        the current revision.
      </p>
      {!compact && (
        <p>
          Only ADs published since 1995 are listed. Whether an AD applies to a particular aircraft depends on its serial number,
          installed equipment and records, and is decided by a certificated mechanic, not by this list.
        </p>
      )}
    </aside>
  );
}

/** The pre-1995 gap, said in the page's opening lines where an older airframe's owner will read it. */
export function Pre1995Note({ className }: { className?: string }) {
  return (
    <p className={cn("max-w-3xl text-sm leading-relaxed text-muted-foreground", className)}>
      <span className="font-medium text-brand-surface">ADs issued before 1995 are not listed.</span>{" "}Many older aircraft have ADs
      from the 1970s and 1980s still in force; check those in the{" "}
      <a href="https://drs.faa.gov/browse/ADFRAWD/doctypeDetails" className="text-primary hover:underline" rel="noopener">
        FAA&apos;s DRS
      </a>
      .
    </p>
  );
}
