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
        laid out for reading, and for older ADs the FAA&apos;s own index; the original linked on each AD is the legal version, and the
        FAA&apos;s DRS shows the current revision.
      </p>
      {!compact && (
        <p>
          An AD not listed here can still apply; the FAA&apos;s DRS is the complete list. Whether an AD applies to a particular aircraft depends on its serial number,
          installed equipment and records, and is decided by a certificated mechanic, not by this list.
        </p>
      )}
    </aside>
  );
}
