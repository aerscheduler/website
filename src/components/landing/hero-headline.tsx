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
 * for a visitor who arrives with `?for=shop` (the maintenance ad group), who reads "maintenance
 * shop" from the start. That swap happens once, on load, before anything is animated.
 *
 * Reduced motion: the pill stays on its first label.
 */

const LABELS = ["Flight school management software", "Aircraft maintenance software", "Flying club software"] as const;

const NOUN_FOR: Record<string, { noun: string; label: number }> = {
  shop: { noun: "maintenance shop", label: 1 },
  club: { noun: "flying club", label: 2 },
};

const HOLD_MS = 3600;

export function HeroHeadline() {
  const [label, setLabel] = useState(0);
  const [noun, setNoun] = useState("flight school");

  useEffect(() => {
    let start = 0;
    try {
      const want = new URLSearchParams(window.location.search).get("for");
      const pick = want ? NOUN_FOR[want] : undefined;
      if (pick) {
        setNoun(pick.noun);
        setLabel(pick.label);
        start = pick.label;
      }
    } catch {
      // No readable URL: keep what the server rendered.
    }
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
        The command deck for your {noun}.
      </span>
    </h1>
  );
}
