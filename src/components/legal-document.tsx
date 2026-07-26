/** Shared chrome for long-form legal pages (privacy, terms). */
export function LegalDocument({
  title,
  updated,
  html,
}: {
  title: string;
  updated: string;
  html: string;
}) {
  return (
    <article className="border-b border-border bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <p className="text-sm font-semibold text-primary">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated {updated}</p>
        <div
          className="legal-prose mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </article>
  );
}
