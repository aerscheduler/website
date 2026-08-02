import Link from "next/link";
import { cn } from "@/lib/cn";
import { MethodBadge } from "@/components/api-docs";
import { getTagDocs, type TagDoc } from "@/lib/openapi";

/**
 * Sticky left rail for the API reference.
 *
 * Driven entirely by `getTagDocs()` (the committed OpenAPI document), so the
 * nav cannot drift from the generated reference pages. On the hub it jumps to
 * in-page section anchors; on a tag page it links across areas and, for the
 * active area, to the endpoint anchors on that page.
 */
export function ApiDocsNav({
  activeSlug,
  className,
}: {
  /** Tag slug for the current reference page, or undefined on the hub. */
  activeSlug?: string;
  className?: string;
}) {
  const tags = getTagDocs();

  return (
    <nav className={cn("hidden w-60 shrink-0 lg:block", className)} aria-label="API reference">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-10 pr-3">
        <Link
          href="/docs/api"
          className={cn(
            "block rounded-lg px-2 py-1.5 text-sm font-medium",
            activeSlug
              ? "text-muted-foreground hover:bg-muted hover:text-foreground"
              : "bg-muted text-foreground"
          )}
        >
          Overview
        </Link>

        <p className="mt-6 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Endpoints
        </p>
        <ul className="mt-2 space-y-0.5">
          {tags.map((tag) => (
            <TagNavItem key={tag.slug} tag={tag} activeSlug={activeSlug} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

function TagNavItem({ tag, activeSlug }: { tag: TagDoc; activeSlug?: string }) {
  const isActive = activeSlug === tag.slug;
  // On the hub, jump to the in-page section. On a tag page, go to that area.
  const href = activeSlug === undefined ? `#${tag.slug}` : `/docs/api/${tag.slug}`;

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-baseline justify-between gap-2 rounded-lg px-2 py-1.5 text-sm",
          isActive
            ? "bg-brand-surface font-medium text-white"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <span className="truncate">{tag.name}</span>
        <span className={cn("shrink-0 text-[11px]", isActive ? "text-white/60" : "text-muted-foreground/70")}>
          {tag.endpoints.length}
        </span>
      </Link>

      {isActive && (
        <ul className="mt-0.5 mb-2 space-y-0.5 border-l border-border ml-3 pl-2">
          {tag.endpoints.map((endpoint) => (
            <li key={endpoint.slug}>
              <a
                href={`#${endpoint.slug}`}
                className="flex items-start gap-2 rounded-md px-1.5 py-1 hover:bg-muted"
              >
                <MethodBadge method={endpoint.method} className="mt-0.5 scale-90 origin-left" />
                <span className="min-w-0 text-xs leading-snug text-muted-foreground">
                  {endpoint.summary}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/** Compact mobile stand-in: every area as a chip, since the sticky rail is lg+. */
export function ApiDocsMobileNav({ activeSlug }: { activeSlug?: string }) {
  const tags = getTagDocs();

  return (
    <div className="border-b border-border lg:hidden">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
        <Link
          href="/docs/api"
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium",
            activeSlug
              ? "border border-border bg-white text-muted-foreground"
              : "bg-brand-surface text-white"
          )}
        >
          Overview
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={activeSlug === undefined ? `#${tag.slug}` : `/docs/api/${tag.slug}`}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium",
              activeSlug === tag.slug
                ? "bg-brand-surface text-white"
                : "border border-border bg-white text-muted-foreground"
            )}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
