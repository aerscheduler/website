import { cn } from "@/lib/cn";
import { depthOf, type RegBlock } from "@/lib/regulations";

/**
 * The eCFR's text, verbatim, with an anchor on every labelled paragraph so
 * `/regulations/91-409#b` lands on (b). Nesting is shown by indent only: the
 * labels already carry the structure, and a rule or box per level would turn a
 * page of law into a page of furniture.
 */
export function OfficialText({ blocks }: { blocks: RegBlock[] }) {
  return (
    <div className="space-y-3 font-serif text-[15.5px] leading-relaxed text-foreground/90">
      {blocks.map((b, i) => {
        if (b.type === "heading") {
          return (
            <h3 key={i} className="pt-3 font-sans text-base font-semibold text-brand-surface">
              {b.text}
            </h3>
          );
        }
        const depth = "id" in b && b.id ? depthOf(b.id) : 0;
        const indent = { paddingLeft: `${Math.min(depth, 4) * 1.25}rem` };
        if (b.type === "table") {
          return (
            <div key={i} className="overflow-x-auto rounded-md border border-border font-sans text-sm" style={indent}>
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr>
                    {b.head.map((h, j) => (
                      <th key={j} className="border-b border-border bg-muted/40 px-3 py-2 text-left align-bottom font-medium text-brand-surface">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, j) => (
                    <tr key={j} className="border-b border-border last:border-0">
                      {row.map((c, k) => (
                        <td key={k} className="px-3 py-2 align-top">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (b.type === "text") {
          return (
            <p key={i} style={indent}>
              {b.text}
            </p>
          );
        }
        return (
          <p key={i} id={b.id} className={cn("scroll-mt-24 rounded-sm target:bg-primary/10")} style={indent}>
            <a href={`#${b.id}`} className="mr-1.5 font-sans text-sm font-medium text-primary tabular-nums hover:underline">
              {b.label}
            </a>
            {b.text}
          </p>
        );
      })}
    </div>
  );
}
