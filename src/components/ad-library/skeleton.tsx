import { AdSearchBox } from "@/components/ad-library/search-box";

/**
 * What a library page shows the moment a link or a search is clicked, while the server reads
 * the AD library: the page's shape, so the click visibly did something. Used by the loading.tsx
 * files under app/airworthiness-directives.
 */
export function AdPageSkeleton({ title, search = false }: { title?: string; search?: boolean }) {
  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14" aria-busy="true">
      <span className="sr-only" role="status">
        Loading
      </span>
      <div className="h-4 w-48 animate-pulse rounded bg-muted" />
      {title ? (
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand-surface">{title}</h1>
      ) : (
        <div className="mt-6 h-9 w-3/4 max-w-xl animate-pulse rounded bg-muted" />
      )}
      {search ? <AdSearchBox className="mt-6 max-w-2xl" pending /> : <div className="mt-4 h-5 w-2/3 max-w-lg animate-pulse rounded bg-muted" />}
      <ul className="mt-8 divide-y divide-border overflow-hidden rounded-lg border border-border bg-white">
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i} className="flex gap-4 px-4 py-4">
            <div className="h-4 w-24 shrink-0 animate-pulse rounded bg-muted" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
