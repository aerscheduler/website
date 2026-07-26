import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

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
  return (
    <div className={cn("animate-float relative w-full max-w-[560px]", className)}>
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
              <div
                key={i}
                className={cn(
                  "size-6 rounded-md",
                  i === activeNav ? "bg-primary" : "bg-muted"
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
  action,
}: {
  eyebrow: string;
  title: string;
  action?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {eyebrow}
        </p>
        <p className="text-sm font-semibold text-foreground">{title}</p>
      </div>
      {action && (
        <div className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white">
          {action}
        </div>
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
        "absolute -bottom-4 -left-3 hidden rounded-lg border border-border bg-white p-3 shadow-md sm:block",
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
