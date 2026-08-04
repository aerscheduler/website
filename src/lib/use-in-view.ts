"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /**
   * Negative bottom margin so a section commits to revealing slightly *before*
   * its top edge lands, otherwise the motion starts under the fold and the
   * visitor scrolls past a finished animation they never saw.
   */
  rootMargin?: string;
  threshold?: number;
  /**
   * Keep reporting after the first entry. Only for cheap always-on decoration
   * (pausing an idle float); reveals must stay once-only — re-firing on every
   * scroll past is what turns a page into a slot machine.
   */
  repeat?: boolean;
};

export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "0px 0px -12% 0px",
  threshold = 0,
  repeat = false,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView && !repeat) return;

    // Without an observer nothing would ever reveal, which would leave the page
    // permanently blank rather than merely unanimated. Show everything instead.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    let delivered = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        delivered = true;
        if (entry.isIntersecting) {
          setInView(true);
          if (!repeat) io.disconnect();
        } else if (repeat) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );

    io.observe(el);

    // The spec guarantees an initial callback on observe. Some environments
    // never service it — a tab the compositor has parked as hidden or occluded
    // is the common one — and there the reveal would leave the page
    // permanently blank. Content must never be hostage to its own animation,
    // so if nothing has arrived by now, show everything and stop waiting.
    const safety = window.setTimeout(() => {
      if (!delivered) setInView(true);
    }, 1200);

    return () => {
      window.clearTimeout(safety);
      io.disconnect();
    };
  }, [inView, repeat, rootMargin, threshold]);

  return { ref, inView };
}
