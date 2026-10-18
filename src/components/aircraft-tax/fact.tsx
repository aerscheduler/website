import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";
import { STATUS_LABEL, fmtDate, type TaxFact, type TaxStatus } from "@/lib/aircraft-tax";

const TONE: Record<TaxStatus, string> = {
  taxable: "bg-orange-50 text-orange-800 ring-orange-200",
  exempt: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  conditional: "bg-violet-50 text-violet-800 ring-violet-200",
  none: "bg-slate-100 text-slate-700 ring-slate-200",
  unclear: "bg-slate-100 text-slate-700 ring-slate-200",
};

/** The one-word verdict for a topic. Status words are the summary, not decoration. */
export function StatusChip({ status, className }: { status: TaxStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ring-1 ring-inset", TONE[status], className)}>
      {STATUS_LABEL[status]}
    </span>
  );
}

/**
 * One answer with the sentences it rests on underneath. The quote is the
 * point: a reader deciding something that costs money should be able to see
 * exactly what the state says and click through to it.
 */
export function Fact({ id, question, fact }: { id: string; question: string; fact: TaxFact }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-3 border-t border-border pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight text-balance text-brand-surface">{question}</h2>
        <StatusChip status={fact.status as TaxStatus} />
      </div>
      <p className="leading-relaxed text-foreground">{fact.answer}</p>
      {fact.sources.length > 0 ? (
        <ul className="space-y-3">
          {fact.sources.map((s, i) => (
            <li key={i} className="space-y-1">
              <blockquote className="border-l-2 border-border pl-3 font-serif text-[15px] leading-relaxed text-foreground/85">{s.quote}</blockquote>
              <p className="pl-3.5 text-sm text-muted-foreground">
                <a href={s.url} rel="noopener" className="inline-flex items-center gap-1 text-primary hover:underline">
                  {s.publisher}, {s.title} <ExternalLink className="size-3" aria-hidden />
                </a>
                {s.dated ? <> · document dated {s.dated}</> : null} · checked {fmtDate(s.checkedOn)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">The state&apos;s published guidance does not clearly answer this.</p>
      )}
    </section>
  );
}

/** What these pages are not, on every one of them. Plain text under a rule, never a coloured box. */
export function TaxNotice({ className }: { className?: string }) {
  return (
    <aside className={cn("space-y-1.5 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground", className)}>
      <p>
        <span className="font-medium text-brand-surface">Not tax advice.</span>{" "}Each answer is our reading of the state&apos;s own
        publication, statute or rule, quoted underneath with the date we checked it. Rules change, and how they apply depends on your
        facts.
      </p>
      <p>Before buying, basing or pricing an aircraft, confirm with the state&apos;s revenue department or a CPA who knows aviation.</p>
    </aside>
  );
}
