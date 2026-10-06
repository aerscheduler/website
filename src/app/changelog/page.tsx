import type { Metadata } from "next";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SITE_NAME } from "@/lib/site";
import { changelogDate, getChangelog, type ChangelogBlock } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: `What is new in ${SITE_NAME}: the features we ship for flight schools, flying clubs and maintenance shops, newest first.`,
  alternates: { canonical: "/changelog" },
  openGraph: {
    title: `${SITE_NAME} changelog`,
    description: "New features in AerScheduler, newest first.",
    url: "/changelog",
  },
};

// Hourly, matching the API's own cache, so a newly published update appears without a deploy.
export const revalidate = 3600;

export default async function ChangelogPage() {
  const entries = await getChangelog();

  return (
    <>
      <section className="relative border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
          <Breadcrumbs items={[{ name: "Changelog", href: "/changelog" }]} />
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">Changelog</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            New features in {SITE_NAME}, newest first. The same updates appear in the console and the app as a
            What&apos;s new card for the people they are for.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          {entries.length === 0 ? (
            <p className="text-muted-foreground">Nothing here yet. Check back soon.</p>
          ) : (
            <ol className="space-y-20">
              {entries.map((entry) => (
                <li key={entry.id} id={entry.id} className="grid scroll-mt-24 gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
                  {/* Only the date, and it stays in view while the update scrolls past (Tony). */}
                  <div className="md:sticky md:top-24 md:self-start md:pt-1">
                    <time dateTime={entry.publishedAt} className="text-sm font-medium text-brand-surface">
                      {changelogDate(entry.publishedAt)}
                    </time>
                  </div>
                  <article className="min-w-0">
                    <h2 className="text-2xl font-semibold tracking-tight text-balance text-brand-surface">
                      <a href={`#${entry.id}`} className="hover:underline">
                        {entry.title}
                      </a>
                    </h2>
                    {entry.hero && (
                      // A plain img, not next/image: the picture lives on the API's host.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={entry.hero.light}
                        alt={entry.hero.alt}
                        width={1280}
                        height={640}
                        loading="lazy"
                        className="mt-6 w-full rounded-xl border border-border"
                      />
                    )}
                    <div className="mt-2">
                      {entry.blocks.map((block, i) => (
                        <Block key={i} block={block} />
                      ))}
                    </div>
                    {entry.readMore && (
                      <a
                        href={entry.readMore}
                        className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                      >
                        Read the guide
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </article>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}

/** The console's blocks, drawn for the marketing site. Unknown types are left out. */
function Block({ block }: { block: ChangelogBlock }) {
  switch (block.type) {
    case "lede":
      return <p className="mt-5 text-base leading-relaxed text-muted-foreground">{block.text}</p>;
    case "features":
      return (
        <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {block.items.map((f) => (
            <li key={f.title}>
              <p className="font-medium text-brand-surface">{f.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </li>
          ))}
        </ul>
      );
    case "screenshot":
      return (
        <figure className="mt-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.image.light} alt={block.image.alt} loading="lazy" className="w-full rounded-lg border border-border" />
          {block.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{block.caption}</figcaption>}
        </figure>
      );
    case "steps":
      return (
        <div className="mt-7">
          {block.title && <p className="font-medium text-brand-surface">{block.title}</p>}
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
            {block.items.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      );
    case "note":
      return (
        <p className="mt-6 flex gap-2 rounded-lg bg-[#f5f7fa] px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" />
          {block.text}
        </p>
      );
    case "section":
      return (
        <div className="mt-7">
          <h3 className="font-medium text-brand-surface">{block.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{block.body}</p>
        </div>
      );
    case "list":
      return (
        <ul className="mt-6 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}
