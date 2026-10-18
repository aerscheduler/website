import { cn } from "@/lib/cn";

/**
 * What the library is not, on every page, the way the AD library carries its
 * own notice. Plain text under a rule, never a coloured box.
 */
export function RegNotice({ className }: { className?: string }) {
  return (
    <aside className={cn("space-y-1.5 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground", className)}>
      <p>
        <span className="font-medium text-brand-surface">Not legal advice.</span> The plain-English summary is our reading of the rule.
        The official text shown with it is the eCFR&apos;s, published by the Office of the Federal Register, and the eCFR is where the current
        text lives.
      </p>
      <p>
        A rule can have exceptions in other sections, FAA legal interpretations and advisory circulars that change how it applies to you.
        When it matters, ask your FSDO, your mechanic or an aviation attorney.
      </p>
    </aside>
  );
}
