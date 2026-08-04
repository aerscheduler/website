"use client";

import { Children, type ElementType, type ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";

/**
 * Scroll-gated entrance. The transition itself lives in `globals.css` on
 * `[data-reveal]`; this only decides *when* to flip the attribute, so there is
 * one place to tune the curve for the whole site.
 *
 * Elements start hidden in the stylesheet so the server HTML and the first
 * client paint agree. Without JS nothing ever flips `data-revealed`, so the
 * `<noscript>` block in `layout.tsx` forces every section visible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Milliseconds. Keep a whole group under ~250ms or it reads as sluggish. */
  delay?: number;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-revealed={inView ? "" : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Reveals direct children in sequence off a single observer.
 *
 * The stagger is CSS `nth-child` rather than wrapper elements, so this drops
 * straight onto an existing grid or flex container without adding a layout box
 * that would break `grid-cols-*` or stretch alignment.
 */
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-reveal-group=""
      data-revealed={inView ? "" : undefined}
      className={className}
    >
      {Children.toArray(children)}
    </Tag>
  );
}
