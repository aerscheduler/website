"use client";

import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { Panel, Tag } from "@/components/landing/product-ui";
import { STATUS } from "@/components/landing/product-tokens";
import { PRICE_PER_AIRCRAFT } from "@/lib/site";

/**
 * The comparison page hero's visual (2026-10-16): the price a school would pay,
 * worked out live from its fleet size, laid over what the other product publishes
 * about its own price. Two overlapping panels like the home composites (without
 * their scroll motion: this sits in the hero), so it reads as
 * the product rather than a pricing table.
 *
 * Every line on our side is in every plan (see INCLUDED in home-blocks.tsx). The
 * other side is whatever `competitors.ts` records for that product, never a guess.
 */

const OURS = ["Scheduling", "Billing", "Maintenance", "Work orders", "Reporting", "iOS and Android apps"];

const MIN = 1;
const MAX = 60;

export function PriceQuote({
  competitor,
  theirLines,
  theirTotal,
  theirTag,
}: {
  competitor: string;
  /** What the other product sells, one line each (e.g. its hubs). Optional. */
  theirLines?: string[];
  /** What it publishes about the price. */
  theirTotal: string;
  /** A tag on its panel, only when the record supports one ("Quote on request"). */
  theirTag?: string;
}) {
  const [aircraft, setAircraft] = useState(8);
  const total = aircraft * PRICE_PER_AIRCRAFT;
  const step = (d: number) => setAircraft((n) => Math.min(MAX, Math.max(MIN, n + d)));

  return (
    <div className="relative text-left">
      {/* Theirs, behind and to the left, fading out like a composite's back panel. */}
      {/* Its price comes first, above where our card overlaps it. */}
      <div className="hidden w-[64%] [mask-image:linear-gradient(to_bottom,black_60%,transparent)] md:block">
        <Panel title={competitor} right={theirTag ? <Tag color={STATUS.grey}>{theirTag}</Tag> : undefined}>
          <div className="text-[13px]">
            <div className="border-b border-black/[0.05] px-5 py-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-black/35">Price</p>
              <p className="mt-1 text-[15px] text-black/60">{theirTotal}</p>
            </div>
            {(theirLines ?? []).map((line) => (
              <div key={line} className="flex items-center justify-between border-b border-black/[0.05] px-5 py-3">
                <span className="text-black/55">{line}</span>
                <span className="text-black/30">Quote</span>
              </div>
            ))}
            <div className="h-28" />
          </div>
        </Panel>
      </div>

      {/* Ours, in front. */}
      <div className="relative z-10 md:absolute md:right-0 md:top-[132px] md:w-[66%]">
        <Panel title="AerScheduler" right={<Tag color={STATUS.green}>Published</Tag>}>
          <div className="p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[13px] text-black/55">Aircraft in your fleet</span>
              <div className="flex items-center gap-1 rounded-full border border-black/[0.08] p-0.5">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={aircraft <= MIN}
                  aria-label="One fewer aircraft"
                  className="inline-flex size-7 items-center justify-center rounded-full text-black/60 transition hover:bg-black/[0.05] disabled:opacity-30"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-semibold tabular-nums text-[#0b0b0d]">{aircraft}</span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={aircraft >= MAX}
                  aria-label="One more aircraft"
                  className="inline-flex size-7 items-center justify-center rounded-full text-black/60 transition hover:bg-black/[0.05] disabled:opacity-30"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            <p className="mt-5 flex items-baseline gap-2" aria-live="polite">
              <span className="text-5xl font-semibold tracking-[-0.03em] tabular-nums text-[#0b0b0d]">
                ${total.toLocaleString("en-US")}
              </span>
              <span className="text-sm text-black/45">a month</span>
            </p>
            <p className="mt-1 text-[13px] text-black/45">
              {aircraft} {aircraft === 1 ? "aircraft" : "aircraft"} × ${PRICE_PER_AIRCRAFT}. Every instructor, student and renter included.
            </p>

            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-black/[0.06] pt-4 text-[13px] text-black/65">
              {OURS.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0" style={{ color: STATUS.green }} />
                  {item}
                </li>
              ))}
            </ul>

            {/* Phones do not get the back panel, so the other side is said here. */}
            <p className="mt-5 border-t border-black/[0.06] pt-4 text-[13px] text-black/45 md:hidden">
              <span className="font-medium text-black/60">{competitor}:</span> {theirTotal}
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
