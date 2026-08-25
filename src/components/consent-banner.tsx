"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bootstrapConsent, setConsent } from "@/lib/consent";

/**
 * The cookie banner.
 *
 * Renders nothing until it has read the cookie on the client, which is deliberate: the
 * page is statically generated, so anything decided at render time on the server would be
 * baked into the HTML and shown to people who already answered.
 *
 * Sits bottom-left as a small card rather than a full-width bar across the top. The top
 * is already occupied by the migration banner and the sticky header, and a modal overlay
 * on a marketing page you are paying Google to send people to is a conversion tax.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Client-side only, so the banner never flashes at somebody who already decided or
    // who is outside the opt-in regions. bootstrapConsent() writes "granted" in those
    // regions, which notifies the analytics loader for us.
    setVisible(bootstrapConsent().shouldPrompt);
  }, []);

  if (!visible) return null;

  function decide(state: "granted" | "denied") {
    // setConsent notifies the analytics loader, so accepting starts tracking immediately
    // rather than only on the next page.
    setConsent(state);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-4 z-50 w-[min(24rem,calc(100vw-2rem))] rounded-2xl border border-border bg-white p-5 shadow-lg"
    >
      <p className="text-sm font-semibold tracking-tight text-foreground">
        Cookies
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
        We use cookies to understand how the site is used and which ads bring people here.
        Decline and we&apos;ll only keep what the site needs to work.{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          Privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="inline-flex h-9 flex-1 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[#1557b0]"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="inline-flex h-9 flex-1 items-center justify-center rounded-full border border-border bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
