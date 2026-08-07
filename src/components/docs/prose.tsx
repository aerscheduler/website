import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Element mappings for MDX article bodies.
 *
 * Written out element by element rather than pulled in with a typography
 * plugin, because the docs have to sit inside the same visual system as the
 * rest of the marketing site (same border, same muted, same 8px radius) and a
 * plugin's defaults fight that on every second element. It is a hundred lines
 * once, and then every article is consistent for free.
 *
 * Headings get no styling for their `id`. `rehype-slug` puts it there, and the
 * table of contents in `lib/docs.ts` derives the same slug from the source.
 */

function Anchored({
  as: Tag,
  className,
  children,
  id,
  ...rest
}: {
  as: "h2" | "h3" | "h4";
  className?: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("group scroll-mt-28", className)} {...rest}>
      {children}
      {id && (
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="ml-2 align-middle text-base font-normal text-muted-foreground/0 transition-colors group-hover:text-muted-foreground/70"
        >
          #
        </a>
      )}
    </Tag>
  );
}

export const proseComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    // Articles never author an h1. The page shell owns it, so the document
    // keeps exactly one. If one slips into the MDX it renders as an h2 rather
    // than quietly producing a second h1 for a crawler to trip over.
    <Anchored as="h2" className="mt-12 text-2xl font-semibold text-brand-surface" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <Anchored
      as="h2"
      className="mt-12 border-t border-border pt-8 text-2xl font-semibold tracking-tight text-brand-surface first:mt-0 first:border-0 first:pt-0"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <Anchored as="h3" className="mt-8 text-lg font-semibold text-foreground" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <Anchored as="h4" className="mt-6 text-base font-semibold text-foreground" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-4 leading-[1.75] text-[15px] text-muted-foreground" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-muted-foreground marker:text-border" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-[1.7] text-muted-foreground marker:text-muted-foreground/60" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: ({ href = "", ...rest }: ComponentPropsWithoutRef<"a">) => {
    const external = href.startsWith("http");
    const className = "font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary";
    return external ? (
      <a href={href} className={className} target="_blank" rel="noreferrer" {...rest} />
    ) : (
      <Link href={href} className={className} {...rest} />
    );
  },
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mt-5 overflow-x-auto rounded-xl border border-border bg-brand-surface p-4 text-[13px] leading-relaxed text-white/90 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-5 border-l-2 border-border pl-4 text-[15px] italic leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    // Wide reference tables scroll inside their own box rather than pushing the
    // page sideways on a phone.
    <div className="mt-5 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[14px]" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-[#fafbfc] text-[13px] uppercase tracking-[0.06em] text-muted-foreground" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-border px-4 py-2.5 font-semibold" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-border px-4 py-3 align-top text-muted-foreground last:border-b-0 [tbody_tr:last-child_&]:border-b-0" {...props} />
  ),
  img: ({ alt = "", ...rest }: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} className="mt-5 w-full rounded-xl border border-border" {...rest} />
  ),
};
