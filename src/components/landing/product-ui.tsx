"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";
import { INK } from "@/components/landing/product-tokens";

/**
 * Dark UI primitives for the home page's product composites, in the Linear
 * style Tony picked (2026-09-27): the product drawn in a dark theme, low-contrast
 * greys, hairline borders, colour only where it carries meaning, and panels that
 * fade into the page at their edges. Every name and figure is invented.
 *
 * Motion: `Moment` flips `data-on` once the composite scrolls into view, and the
 * `Enter` / `Grow` children play off it with their own delays. With motion off,
 * or before hydration, the finished state is what renders.
 */

/** Plays its children's moment once the block scrolls into view. */
export function Moment({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "0px 0px -22% 0px" });
  return (
    <div ref={ref} data-on={inView} className={cn("group/m", className)}>
      {children}
    </div>
  );
}

/** Arrives (fades and rises) when its Moment turns on, after `delay` ms. */
export function Enter({
  delay = 0,
  children,
  className,
  from = "up",
}: {
  delay?: number;
  children: ReactNode;
  className?: string;
  from?: "up" | "left" | "scale" | "fade";
}) {
  const start = {
    up: "group-data-[on=false]/m:translate-y-2",
    left: "group-data-[on=false]/m:-translate-x-3",
    scale: "group-data-[on=false]/m:scale-90",
    fade: "",
  }[from];
  return (
    <div
      className={cn(
        "transition-[opacity,translate,scale] duration-500 ease-out group-data-[on=false]/m:opacity-0 motion-reduce:transition-none",
        start,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** A bar that grows along x (or y) to its full size when its Moment turns on. */
export function Grow({
  delay = 0,
  className,
  style,
  axis = "x",
}: {
  delay?: number;
  className?: string;
  style?: CSSProperties;
  axis?: "x" | "y";
}) {
  return (
    <div
      className={cn(
        "transition-[scale] duration-1000 ease-out motion-reduce:transition-none",
        axis === "x" ? "origin-left group-data-[on=false]/m:scale-x-0" : "origin-bottom group-data-[on=false]/m:scale-y-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    />
  );
}

/** A dark app panel: optional title bar, hairline border, soft inner light. */
export function Panel({
  title,
  icon,
  right,
  children,
  className,
}: {
  title?: ReactNode;
  icon?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px] border shadow-[0_24px_60px_-28px_rgba(16,24,40,0.28),0_2px_6px_-2px_rgba(16,24,40,0.06)]",
        INK.panel,
        INK.line,
        INK.text,
        className
      )}
    >
      {title && (
        <div className={cn("flex items-center gap-2.5 border-b px-4 py-3 text-[13px]", INK.line)}>
          {icon}
          <span className="font-medium">{title}</span>
          <span className="ml-auto">{right}</span>
        </div>
      )}
      {children}
    </div>
  );
}

/** A status dot or ring, in one of the status colours. */
export function Dot({ color, ring }: { color: string; ring?: boolean }) {
  return ring ? (
    <span className="inline-block size-3 shrink-0 rounded-full border-[1.5px]" style={{ borderColor: color }} />
  ) : (
    <span className="inline-block size-2 shrink-0 rounded-full" style={{ background: color }} />
  );
}

/** A small tag: dot plus label, like Linear's label chips. */
export function Tag({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] px-2 py-0.5 text-[11px] text-black/60">
      <Dot color={color} />
      {children}
    </span>
  );
}

/**
 * Two panels, one overlapping the other, fading into the page at the edges.
 * The back panel rises slower than the front one as the section scrolls in
 * (`.rise-back` / `.rise-front`), which gives the composite its depth.
 */
export function Composite({
  back,
  front,
  frontSide = "right",
  frontTop = "14%",
  backFade = "55%",
  className,
}: {
  back: ReactNode;
  front: ReactNode;
  frontSide?: "left" | "right";
  /** How far down the back panel the front one starts (desktop). */
  frontTop?: string;
  /** Where the back panel starts fading out at the bottom. Later keeps more of it. */
  backFade?: string;
  className?: string;
}) {
  return (
    <Moment className={cn("relative", className)}>
      <div
        style={{ ["--back-fade" as string]: backFade }}
        className={cn(
          "rise-back relative [mask-image:linear-gradient(to_bottom,black_var(--back-fade),transparent_98%)]",
          frontSide === "right" ? "md:mr-[18%]" : "md:ml-[18%]"
        )}
      >
        <div
          className={cn(
            frontSide === "right"
              ? "[mask-image:linear-gradient(to_right,transparent,black_12%)]"
              : "[mask-image:linear-gradient(to_left,transparent,black_12%)]"
          )}
        >
          {back}
        </div>
      </div>
      <div
        style={{ ["--front-top" as string]: frontTop }}
        className={cn(
          // Phones: the front panel tucks under the back one instead of
          // overlapping a column too narrow to hold both.
          "rise-front relative z-10 -mt-24 w-[92%] [mask-image:linear-gradient(to_bottom,black_80%,transparent)] md:absolute md:mt-0 md:top-[var(--front-top)] md:w-[52%]",
          frontSide === "right" ? "ml-auto md:right-0" : "md:left-0"
        )}
      >
        {front}
      </div>
    </Moment>
  );
}
