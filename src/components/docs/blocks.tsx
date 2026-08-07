import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Image as ImageIcon,
  Info,
  Lightbulb,
  ShieldAlert,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { getScreenshot, screenshotExists, screenshotSrc } from "@/lib/docs-screenshots";

/**
 * The authoring vocabulary for help articles.
 *
 * These are injected globally by `mdx-components.tsx`, so an article uses them
 * without an import line. Kept deliberately small: a writer who has to choose
 * between nine callout variants writes inconsistent pages, and a reader who
 * meets nine of them stops reading any of them.
 */

/**
 * Wrapper class for any slot that receives MDX children.
 *
 * MDX wraps block content in `<p>`, so a component that puts its children
 * inside a `<p>` (or a `<span>`) of its own emits `<p><p>`, invalid HTML that
 * React reports as a hydration failure at runtime and nowhere at build time.
 * Every slot below is therefore a `<div>`, and this class pulls the first
 * paragraph's top margin off so the box does not gain a blank first line.
 */
const MDX_BODY = "[&>*:first-child]:mt-0 [&_p]:leading-relaxed";

/* ------------------------------------------------------------------ */
/* Callout                                                             */
/* ------------------------------------------------------------------ */

const CALLOUTS = {
  note: { icon: Info, label: "Note", tone: "border-border bg-[#fafbfc]", accent: "text-muted-foreground" },
  tip: { icon: Lightbulb, label: "Tip", tone: "border-primary/20 bg-primary/[0.04]", accent: "text-primary" },
  warning: {
    icon: AlertTriangle,
    label: "Careful",
    tone: "border-amber-300/60 bg-amber-50",
    accent: "text-amber-700",
  },
  important: {
    icon: ShieldAlert,
    label: "Important",
    tone: "border-rose-200 bg-rose-50",
    accent: "text-rose-700",
  },
} as const;

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof CALLOUTS;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, label, tone, accent } = CALLOUTS[type];
  return (
    <aside className={cn("mt-6 rounded-xl border p-4", tone)}>
      <p className={cn("flex items-center gap-2 text-[13px] font-semibold", accent)}>
        <Icon className="size-4 shrink-0" aria-hidden />
        {title ?? label}
      </p>
      <div className={cn(MDX_BODY, "mt-1.5 text-[14px] text-muted-foreground [&_p]:mt-3")}>
        {children}
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Steps                                                               */
/* ------------------------------------------------------------------ */

/**
 * A numbered walkthrough.
 *
 * The number sits in the gutter on a connecting rule rather than as a list
 * marker, so a step can hold a screenshot, a callout, or a table without the
 * numbering collapsing, which is exactly what happens with a plain `<ol>` the
 * moment a step contains a block element.
 */
export function Steps({ children }: { children: ReactNode }) {
  return <div className="mt-6 space-y-0">{children}</div>;
}

export function Step({
  n,
  title,
  children,
}: {
  /** Explicit, so a step can be referenced from prose ("back at step 3"). */
  n: number;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      <div className="relative flex flex-col items-center">
        <span className="z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-white text-[13px] font-semibold text-brand-surface shadow-sm">
          {n}
        </span>
        {/* Connector, hidden on the last step by the parent's last:pb-0 plus this
            element's own absolute inset. A rule that ends in mid-air reads as a
            missing step. */}
        <span className="absolute top-7 bottom-0 w-px bg-border [div:last-child_&]:hidden" aria-hidden />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-[15px] font-semibold text-foreground">{title}</p>
        {/* Not MDX_BODY: a step's body should sit just below its title rather
            than flush against it, so the first child keeps a small margin. */}
        <div className="[&>*:first-child]:mt-1.5">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* UI location + audience chips                                        */
/* ------------------------------------------------------------------ */

/**
 * Where in the product something lives, e.g. `<Where>Settings → Billing</Where>`.
 * Always written as the real menu path, so a reader can follow it without
 * translating our vocabulary into theirs.
 */
export function Where({ children, app }: { children: ReactNode; app?: "web" | "mobile" }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2 py-0.5 align-middle font-mono text-[12.5px] text-foreground">
      {app && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {app === "web" ? "Web" : "App"}
        </span>
      )}
      {children}
    </span>
  );
}

/** Who this article is for, or who can perform the action being described. */
export function Roles({ children }: { children: string }) {
  const roles = children.split(",").map((r) => r.trim()).filter(Boolean);
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        Who can do this
      </span>
      {roles.map((role) => (
        <span
          key={role}
          className="rounded-full border border-border bg-white px-2.5 py-0.5 text-[12.5px] font-medium text-foreground"
        >
          {role}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screenshot                                                          */
/* ------------------------------------------------------------------ */

/**
 * Renders a captured screenshot, or a labelled frame if it has not been taken
 * yet. Never a broken image: an article ships before its pictures do.
 */
export function Screenshot({ id, className }: { id: string; className?: string }) {
  const spec = getScreenshot(id);

  if (!spec) {
    // A typo in an id is a silent hole in a published page, so say so loudly in
    // the one place a writer will see it: on the page itself, in dev and prod.
    return (
      <figure className={cn("mt-6 rounded-xl border border-dashed border-rose-300 bg-rose-50 p-6", className)}>
        <p className="text-[13px] font-medium text-rose-700">
          Unknown screenshot id <code className="font-mono">{id}</code>. Add it to
          <code className="ml-1 font-mono">src/lib/docs-screenshots.ts</code>.
        </p>
      </figure>
    );
  }

  const captured = screenshotExists(id);

  return (
    <figure className={cn("mt-6", className)}>
      {captured ? (
        <div
          className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
        >
          <Image
            src={screenshotSrc(id)}
            alt={spec.alt}
            // Intrinsic size is only an aspect-ratio hint for the layout: every
            // capture is a cropped element, so the real dimensions vary per shot.
            width={2560}
            height={1600}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-[#fafbfc] px-6 py-12 text-center"
        >
          <ImageIcon className="size-5 text-muted-foreground/60" aria-hidden />
          <p className="text-[13px] font-medium text-foreground">{spec.screen}</p>
          {/* Only when the alt says something the screen name does not. Many
              specs were generated with alt mirroring screen, and printing both
              renders the same sentence twice. */}
          {spec.alt !== spec.screen && (
            <p className="max-w-sm text-[12.5px] text-muted-foreground">{spec.alt}</p>
          )}
        </div>
      )}
      {spec.caption && (
        <figcaption className="mt-2 text-[13px] text-muted-foreground">{spec.caption}</figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Card grids                                                          */
/* ------------------------------------------------------------------ */

export function CardGrid({ children, columns = 2 }: { children: ReactNode; columns?: 2 | 3 }) {
  return (
    <div
      className={cn(
        "mt-6 grid gap-3",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {children}
    </div>
  );
}

export function DocCard({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-border bg-white p-4 transition-shadow hover:shadow-md"
    >
      <span className="flex items-center justify-between gap-2 text-[15px] font-semibold text-foreground">
        {title}
        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </span>
      {children && (
        <div className={cn(MDX_BODY, "mt-1 text-[13.5px] text-muted-foreground")}>{children}</div>
      )}
    </Link>
  );
}

/**
 * The one-line answer, pinned at the top of an article.
 *
 * Someone who already knows the product and just needs reminding which screen
 * it was should be able to stop reading here.
 */
export function Summary({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-[#fafbfc] p-4">
      <ArrowRight className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
      <div className={cn(MDX_BODY, "text-[14.5px] text-foreground [&_p]:text-foreground")}>
        {children}
      </div>
    </div>
  );
}
