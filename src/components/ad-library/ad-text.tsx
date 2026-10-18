import type { AdBlock } from "@/lib/ad-library";

/**
 * An AD's text laid out as the Federal Register prints it: numbered paragraphs indented by
 * level, notes set apart, serial and model tables as real tables. The same reading the console
 * shows (web/src/components/maintenance/ad-text.tsx).
 */
export function AdText({ blocks }: { blocks: AdBlock[] }) {
  return (
    <div className="space-y-3 text-[15px] leading-relaxed text-foreground">
      {blocks.map((b, i) => {
        if (b.t === "h") return <h4 key={i} className="pt-2 font-semibold text-brand-surface">{b.text}</h4>;
        if (b.t === "note")
          return (
            <p key={i} className="border-l-2 border-border pl-4 text-muted-foreground">
              {b.text}
            </p>
          );
        if (b.t === "table") return <AdTable key={i} table={b} />;
        return (
          <p key={i} style={{ paddingLeft: `${Math.min(b.level, 3) * 1.5}rem` }}>
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

function AdTable({ table }: { table: Extract<AdBlock, { t: "table" }> }) {
  const width = Math.max(table.head.length, ...table.rows.map((r) => r.length));
  return (
    <figure className="space-y-1.5">
      {table.title && <figcaption className="text-sm font-medium text-muted-foreground">{table.title}</figcaption>}
      {/* Wide tables scroll inside themselves; the page never scrolls sideways. */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          {table.head.length > 0 && (
            <thead className="bg-muted">
              <tr>
                {table.head.map((h, i) => (
                  <th key={i} className="border-b border-border px-3 py-2 text-left font-medium whitespace-nowrap text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {table.rows.map((r, i) => (
              <tr key={i} className="border-b border-border align-top last:border-0">
                {Array.from({ length: width }, (_, j) => (
                  <td key={j} className="px-3 py-2">
                    {r[j] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
