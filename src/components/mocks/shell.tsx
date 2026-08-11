"use client";

import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

/** Shared browser chrome + sidebar rail for feature demos. */
export function AppMockShell({
  path,
  activeNav = 2,
  children,
  className,
  float,
}: {
  path: string;
  /** 0-based index of the active rail item */
  activeNav?: number;
  children: ReactNode;
  className?: string;
  float?: ReactNode;
}) {
  const [nav, setNav] = useState(activeNav);
  // `repeat` so the float stops again on the way back out of view; it is idle
  // decoration, not an entrance, so it is safe to re-trigger.
  const { ref, inView } = useInView<HTMLDivElement>({ repeat: true, rootMargin: "10% 0px" });

  return (
    <div
      ref={ref}
      data-inview={inView ? "" : undefined}
      // `min-w-0` because the board inside is wider than a phone: without it the
      // shell's min-content width props open the grid track that holds it, and the
      // whole page picks up a horizontal scroll. Narrow viewports crop the card at
      // its own rounded edge instead, which reads as a narrow browser window.
      className={cn("animate-float relative w-full min-w-0 max-w-[720px]", className)}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-lg">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#e3e5ea]" />
            <span className="size-2.5 rounded-full bg-[#e3e5ea]" />
            <span className="size-2.5 rounded-full bg-[#e3e5ea]" />
          </div>
          <div className="ml-2 flex-1 truncate rounded-md bg-muted px-3 py-1 text-[11px] text-muted-foreground">
            app.aerscheduler.com{path}
          </div>
        </div>

        <div className="flex min-h-[300px]">
          <aside className="hidden w-[52px] shrink-0 flex-col items-center gap-3 border-r border-border py-3 sm:flex">
            <div className="size-7 rounded-md bg-primary/10" />
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                type="button"
                aria-label={`Navigate ${i + 1}`}
                onClick={() => setNav(i)}
                className={cn(
                  "size-6 rounded-md transition-all duration-150",
                  i === nav
                    ? "bg-primary shadow-sm"
                    : "bg-muted hover:bg-muted-foreground/20 active:scale-95"
                )}
              />
            ))}
          </aside>
          <div className="flex min-w-0 flex-1 flex-col">{children}</div>
        </div>
      </div>
      {float}
    </div>
  );
}

export function MockHeader({
  eyebrow,
  title,
  meta,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  /** Optional third line, e.g. the live "2 flown · 1 out · 2 to go" tally. */
  meta?: ReactNode;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {eyebrow}
        </p>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {meta && <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{meta}</p>}
      </div>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white transition-all duration-150 hover:bg-primary/90 active:scale-95"
        >
          {action}
        </button>
      )}
    </div>
  );
}

export function MockFloat({
  label,
  value,
  meta,
  className,
}: {
  label: string;
  value: string;
  meta: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute -bottom-4 -left-3 hidden rounded-lg border border-border bg-white p-3 shadow-md transition-shadow duration-200 hover:shadow-lg sm:block",
        className
      )}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold tabular-nums text-foreground">{value}</p>
      <p className="text-[11px] text-muted-foreground">{meta}</p>
    </div>
  );
}

/** Clickable filter / status pill used across demos. */
export function MockPill({
  active,
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all duration-150 active:scale-95",
        active
          ? "bg-primary text-white shadow-sm"
          : "bg-muted text-muted-foreground hover:bg-[#e8eaef] hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/** Row with hover + selected states. */
export function MockRow({
  selected,
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150",
        selected ? "bg-primary/[0.06]" : "hover:bg-[#f7f8fa] active:bg-muted/80",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
