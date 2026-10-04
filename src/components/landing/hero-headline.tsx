"use client";

import { useEffect, useState } from "react";

/**
 * The home page H1: the category pill, then "The command deck for your flight school."
 *
 * The pill cycles through who the product is for (flight schools, maintenance shops, flying
 * clubs) by CROSSFADING, and nothing else on the page moves. Every label is rendered, stacked
 * in one grid cell, so the pill is always as wide as the longest label and its width never
 * changes; only opacity animates. Tony rejected (2026-10-03) a typed-out noun at the end of the
 * headline: the words reflowed and pushed the page around as it typed. Do not bring back
 * typing, and do not animate anything that changes a line's width.
 *
 * The headline itself never moves. It says "flight school", which is what paid search for
 * "flight school management software" must read first (and what the server renders), except
 * for a visitor who arrives with `?for=shop`, `?for=club` or `?for=maintenance` (the ad groups
 * that land here), who reads "maintenance shop", "flying club" or "fleet" from the first paint:
 * every noun is server-rendered and CSS shows the one matching `<html data-for>`.
 *
 * Reduced motion: the pill stays on its first label.
 */

const LABELS = ["Flight school management software", "Aircraft maintenance software", "Flying club software"] as const;

/** Which pill label a `?for=` audience starts on. The headline noun itself is CSS (see globals.css). */
const START_LABEL: Record<string, number> = { shop: 1, maintenance: 1, club: 2 };

/** The headline's last word per audience, all rendered; `.for-v` shows the one that matches. */
const NOUNS: { v: string; noun: string }[] = [
  { v: "default", noun: "flight school" },
  { v: "shop", noun: "maintenance shop" },
  { v: "club", noun: "flying club" },
  { v: "maintenance", noun: "fleet" },
];

const HOLD_MS = 3600;

export function HeroHeadline() {
  const [label, setLabel] = useState(0);

  useEffect(() => {
    // Set on <html> by the inline script in app/page.tsx before the hero painted.
    const start = START_LABEL[document.documentElement.dataset.for ?? ""] ?? 0;
    setLabel(start);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = start;
    const id = window.setInterval(() => {
      i = (i + 1) % LABELS.length;
      setLabel(i);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <h1 className="animate-fade-up">
      <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-tight text-[#1b1c1f] shadow-sm sm:text-sm">
        <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
        <span className="grid">
          {LABELS.map((text, i) => (
            <span
              key={text}
              // The first label is the real heading text; the others are visual only.
              aria-hidden={i === 0 ? undefined : true}
              className="col-start-1 row-start-1 text-center transition-opacity duration-500 ease-out"
              style={{ opacity: i === label ? 1 : 0 }}
            >
              {text}
            </span>
          ))}
        </span>
      </span>
      <span className="sr-only">: </span>
      <span className="mx-auto mt-6 block max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#0b0b0d] sm:text-6xl lg:text-[5rem]">
        The command deck for your{" "}
        {NOUNS.map(({ v, noun }) => (
          <span key={v} className="for-v" data-v={v}>
            {noun}
          </span>
        ))}
        .
      </span>
    </h1>
  );
}
