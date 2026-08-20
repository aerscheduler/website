"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";
import { hasConsent, onConsentChange } from "@/lib/consent";
import {
  startAnalytics,
  startConsentMode,
  syncGoogleConsent,
  track,
  trackPageview,
} from "@/lib/analytics";

/**
 * Boots analytics and reports pageviews and dwell time.
 *
 * Mounted once in the root layout, below everything else, and it renders nothing.
 *
 * Two things happen here that are easy to get subtly wrong:
 *
 * 1. **Attribution is captured before anything else and on every navigation.** Before,
 *    because a visitor may click a CTA off to the console within a second of landing.
 *    On every navigation, because Next's client router can land someone on the tagged
 *    URL after the first mount has already run.
 *
 * 2. **Dwell time is measured per path, not per session.** "How long are they on the
 *    pricing page" is the question worth answering, and a session-level average buries
 *    it. The timer resets on every route change and reports the previous path on the way
 *    out, including the final one, via `pagehide`, which fires reliably on mobile where
 *    `beforeunload` does not.
 */
export function Analytics() {
  return (
    // useSearchParams forces client rendering of everything above it unless it sits
    // inside Suspense. Without this the whole site opts out of static generation.
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}

function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Boot once, then again if they answer the banner later in the visit.
  //
  // `startConsentMode()` is unconditional and must run before anything reads consent:
  // it installs the Google tag with all four v2 signals denied, so a visitor who never
  // touches the banner still produces a cookieless conversion ping. `startAnalytics()`
  // is the consent-gated half (PostHog and Meta).
  //
  // The listener fires in BOTH directions, so withdrawing consent pushes an update of
  // denied rather than leaving the tag granted for the rest of the visit.
  // The path a pageview has actually been RECORDED for, which is not the same as
  // the path we tried to send one for. `track()` drops events outright when consent
  // is absent (analytics.ts, "no consent: drop, never queue"), so a visitor who
  // lands and only then accepts the banner had their landing pageview thrown away,
  // and no route change ever comes along to send another. Their whole visit shows
  // up as page_time and $pageleave against a page PostHog never saw them open.
  //
  // Found on 2026-08-20: both of the only two consenting paid visitors we have had
  // were in exactly this state, so a funnel built on $pageview counted zero of them.
  const recordedFor = useRef<string | null>(null);
  const currentKey = useRef<string>("");

  useEffect(() => {
    captureAttribution();
    startConsentMode();
    syncGoogleConsent();
    startAnalytics();
    return onConsentChange(() => {
      syncGoogleConsent();
      startAnalytics();
      // Accepting the banner is the moment the dropped landing pageview becomes
      // sendable. Only the current page is replayed, never a backlog: declining
      // must still leave no trace, and re-sending everything they did while
      // undecided would defeat the point of asking.
      if (hasConsent() && recordedFor.current !== currentKey.current) {
        recordedFor.current = currentKey.current;
        const [path, search] = currentKey.current.split("?");
        trackPageview(path, { search: search || undefined });
      }
    });
  }, []);

  const enteredAt = useRef<number>(Date.now());
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    // A client-side navigation can be the first time the tagged URL is visible.
    captureAttribution();

    const now = Date.now();
    if (previousPath.current && previousPath.current !== pathname) {
      reportDwell(previousPath.current, now - enteredAt.current);
    }

    previousPath.current = pathname;
    enteredAt.current = now;
    const search = searchParams.toString();
    currentKey.current = search ? `${pathname}?${search}` : pathname;
    trackPageview(pathname, { search: search || undefined });
    // Only claim it landed if it could have. Without consent `track()` dropped it,
    // and the consent listener above is what will send it later.
    if (hasConsent()) recordedFor.current = currentKey.current;
  }, [pathname, searchParams]);

  // The last page of the visit never gets a route change, so it needs its own exit hook.
  useEffect(() => {
    const onHide = () => {
      if (previousPath.current) {
        reportDwell(previousPath.current, Date.now() - enteredAt.current);
        // Prevent a double count if the tab is restored from bfcache and hidden again.
        enteredAt.current = Date.now();
      }
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, []);

  return null;
}

/** Report time on a page, ignoring the noise of an instant bounce or a forgotten tab. */
function reportDwell(path: string, ms: number): void {
  const seconds = Math.round(ms / 1000);
  // Under a second is a redirect, not a read. Over an hour is a tab left open overnight,
  // including it would wreck every average on the page-performance chart.
  if (seconds < 1 || seconds > 3600) return;
  track("page_time", { path, seconds });
}
