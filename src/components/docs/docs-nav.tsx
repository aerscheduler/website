import Link from "next/link";
import { BookOpen, Code2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { DOC_SECTIONS, articleHref } from "@/lib/docs";
import type { TocEntry } from "@/lib/docs-toc";

/**
 * Sticky left rail for the help docs.
 *
 * Deliberately the same shape as `ApiDocsNav`: every section always listed,
 * the active section expanded to its articles. Readers who bounce between the
 * help docs and the API reference should not have to relearn the furniture,
 * and a reader who lands on one article from search should be able to see the
 * whole product without going back to a hub first.
 *
 * Pure links over the registry, so it cannot drift from the pages that exist.
 */
export function DocsNav({
  activeSection,
  activeArticle,
  className,
}: {
  activeSection?: string;
  activeArticle?: string;
  className?: string;
}) {
  return (
    <nav className={cn("hidden w-64 shrink-0 lg:block", className)} aria-label="Documentation">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-10 pr-3">
        <Link
          href="/docs"
          className={cn(
            "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium",
            activeSection
              ? "text-muted-foreground hover:bg-muted hover:text-foreground"
              : "bg-muted text-foreground"
          )}
        >
          <BookOpen className="size-4" aria-hidden />
          Documentation home
        </Link>

        <p className="mt-6 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Guides
        </p>
        <ul className="mt-2 space-y-0.5">
          {DOC_SECTIONS.map((section) => {
            const isActive = activeSection === section.slug;
            return (
              <li key={section.slug}>
                <Link
                  href={`/docs/${section.slug}`}
                  className={cn(
                    "flex items-baseline justify-between gap-2 rounded-lg px-2 py-1.5 text-sm",
                    isActive
                      ? "bg-brand-surface font-medium text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="truncate">{section.navLabel}</span>
                  <span
                    className={cn(
                      "shrink-0 text-[11px]",
                      isActive ? "text-white/60" : "text-muted-foreground/70"
                    )}
                  >
                    {section.articles.length}
                  </span>
                </Link>

                {isActive && (
                  <ul className="mt-0.5 mb-2 ml-3 space-y-0.5 border-l border-border pl-2">
                    {section.articles.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={articleHref(section.slug, article.slug)}
                          aria-current={activeArticle === article.slug ? "page" : undefined}
                          className={cn(
                            "block rounded-md px-2 py-1 text-[13px] leading-snug",
                            activeArticle === article.slug
                              ? "bg-primary/[0.08] font-medium text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-6 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Developers
        </p>
        <Link
          href="/docs/api"
          className="mt-2 flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Code2 className="size-4" aria-hidden />
          API reference
        </Link>
      </div>
    </nav>
  );
}

/** Chips, for viewports below the sticky rail's lg breakpoint. */
export function DocsMobileNav({ activeSection }: { activeSection?: string }) {
  return (
    <div className="border-b border-border lg:hidden">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
        <Link
          href="/docs"
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium",
            activeSection
              ? "border border-border bg-white text-muted-foreground"
              : "bg-brand-surface text-white"
          )}
        >
          All docs
        </Link>
        {DOC_SECTIONS.map((section) => (
          <Link
            key={section.slug}
            href={`/docs/${section.slug}`}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium",
              activeSection === section.slug
                ? "bg-brand-surface text-white"
                : "border border-border bg-white text-muted-foreground"
            )}
          >
            {section.navLabel}
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Right-hand "On this page" rail.
 *
 * Static anchors rather than a scroll-spy: these pages are read top to bottom
 * or jumped into from a search result, and a highlight that chases the scroll
 * position would need a client component on every otherwise-static article.
 */
export function DocsToc({ entries }: { entries: TocEntry[] }) {
  if (entries.length < 3) return null;

  return (
    <aside className="hidden w-56 shrink-0 xl:block" aria-label="On this page">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-10 pl-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          On this page
        </p>
        <ul className="mt-3 space-y-1.5 border-l border-border">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={cn(
                  "-ml-px block border-l border-transparent text-[13px] leading-snug text-muted-foreground hover:border-primary hover:text-foreground",
                  entry.level === 2 ? "pl-3" : "pl-6"
                )}
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
