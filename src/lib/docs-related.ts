import { allArticles, type DocArticle } from "@/lib/docs";
import { RESOURCE_LINKS } from "@/lib/resources";

/**
 * An article's "Related" links, resolved by href against whatever they point at,
 * so a retitled guide cannot leave a stale label behind. Shared by the article
 * page and its Markdown version (`lib/llms.ts`), so the two list the same links.
 *
 * Only help articles and guides (`RESOURCE_LINKS`) resolve; anything else is
 * dropped rather than rendered as a link to nowhere. Not in `lib/docs.ts`
 * because `resources.ts` imports that file, and this one imports `resources.ts`.
 */
export function resolveRelated(article: DocArticle): { href: string; label: string; description: string }[] {
  return (article.related ?? [])
    .map((target) => {
      const doc = allArticles().find((entry) => entry.href === target);
      if (doc) return { href: target, label: doc.article.title, description: doc.article.description };
      const resource = RESOURCE_LINKS.find((link) => link.href === target);
      if (resource) return resource;
      return null;
    })
    .filter((link): link is { href: string; label: string; description: string } => link !== null);
}
