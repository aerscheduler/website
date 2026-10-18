import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";
import { SHORT_LABEL, STATUS_LABEL, fmtDate, type TaxFact, type TaxStatus } from "@/lib/aircraft-tax";

/**
 * The one-word verdict for a topic, as plain text. Tony, 2026-10-18: coloured
 * badges "scream AI slop", so the status is a word in the type, weighted, never
 * a pill or a colour.
 */
export function StatusText({ status, short = false, className }: { status: TaxStatus; short?: boolean; className?: string }) {
  return <span className={cn("text-sm font-medium whitespace-nowrap text-brand-surface", className)}>{short ? SHORT_LABEL[status] : STATUS_LABEL[status]}</span>;
}

/**
 * One answer with the sentences it rests on underneath. The quote is the
 * point: a reader deciding something that costs money should be able to see
 * exactly what the state says and click through to it.
 */
export function Fact({ id, question, fact }: { id: string; question: string; fact: TaxFact }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-3 border-t border-border pt-8">
      <h2 className="text-xl font-semibold tracking-tight text-balance text-brand-surface">{question}</h2>
      <p className="leading-relaxed text-foreground">
        <StatusText status={fact.status as TaxStatus} className="text-base font-semibold" />. {fact.answer}
      </p>
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
