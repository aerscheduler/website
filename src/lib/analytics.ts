/**
 * Analytics and ad-conversion tracking for the marketing site.
 *
 * ## Three destinations, two different jobs
 *
 * **PostHog** is where you go to answer "what happened and why": funnels, drop-off,
 * time on page, session replay. It is the tool for reading behaviour.
 *
 * **Google Ads and Meta** get told about conversions for one reason: their bidding
 * algorithms need a success signal to optimise against. Without it Google is spending
 * the budget on whoever clicks, not whoever signs up. They are write-only destinations;
 * never read a number out of them and believe it (see the note on truth below).
 *
 * ## Which numbers to trust
 *
 * Neither PostHog nor the ad platforms can tell you which campaign produced *revenue*.
 * The sales cycle runs past every attribution window, iOS strips a chunk of it, and a
 * school that signs up in March and pays in April looks like two unrelated events. The
 * campaign attached to the org row in our own database is the ground truth, and that is what
 * the weekly internal report grades campaigns on. These pixels exist to steer the ad
 * platforms' bidding, not to settle the budget argument.
 *
 * ## Loading
 *
 * **PostHog and Meta** load only after consent is granted (`lib/consent.ts`). Events
 * fired before that are dropped, not queued. A visitor who declines should leave no
 * trace, and a queue that flushes on a later "accept" would defeat the point of asking.
 *
 * **Google is different, on purpose.** Its tag loads immediately with Consent Mode v2
 * defaults of `denied`, which means it sets no cookies and stores nothing until the
 * banner is accepted, but it can still send a cookieless conversion ping that Google
 * uses for modelling. Gating the tag itself, which is what this file used to do, meant
 * every visitor who ignored the banner was invisible: three days of paid traffic
 * produced 25+ clicks and exactly zero reported conversions, so Google's bidding was
 * optimising against no success signal at all. Consent Mode is the mechanism designed
 * for this, and it costs the visitor nothing.
 */

import type { PostHog } from "posthog-js";
import { readAttribution, channelOf } from "./attribution";
import { hasConsent } from "./consent";

/**
 * The PostHog project key is a public, write-only ingest token, meant to ship in
 * client bundles, which is why it can be defaulted here rather than living only in
 * Vercel's env. Overridable so a staging deploy can point somewhere else.
 */
const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "phc_mT7orBRFhBnm56BRyhGgtSKjiQvRBZwCoMRSSSbBCDyt";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

/**
 * Whether this build should report to PostHog at all. See the same block in the
 * console: `localhost:3000` contributed 399 pageviews to the marketing site's
 * numbers in a 30-day window where the real site only had 305, so dev traffic
 * was the majority of what the charts showed. Opt back in for local
 * verification with `NEXT_PUBLIC_POSTHOG_DEV=1`.
 */
const IS_DEV = process.env.NODE_ENV === "development";
const DEV_OPT_IN = process.env.NEXT_PUBLIC_POSTHOG_DEV === "1";
const ANALYTICS_ENABLED = !IS_DEV || DEV_OPT_IN;
const ENVIRONMENT = IS_DEV ? "development" : "production";

/**
 * Ad platform ids. Unset until the accounts exist, and every call site degrades to a
 * no-op rather than throwing, because the site must not depend on an ad account being live.
 */
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID; // "AW-XXXXXXXXXX"
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Google Ads conversion labels, one per action worth bidding on. Google identifies a
 * conversion as "AW-123/AbC-D_efGh", so each needs its own label from the Ads UI.
 */
const GOOGLE_CONVERSIONS: Record<ConversionName, string | undefined> = {
  signup_started: process.env.NEXT_PUBLIC_GADS_LABEL_SIGNUP_STARTED,
  signup_completed: process.env.NEXT_PUBLIC_GADS_LABEL_SIGNUP_COMPLETED,
  activated: process.env.NEXT_PUBLIC_GADS_LABEL_ACTIVATED,
  subscribed: process.env.NEXT_PUBLIC_GADS_LABEL_SUBSCRIBED,
  demo_opened: process.env.NEXT_PUBLIC_GADS_LABEL_DEMO_OPENED,
  contact_submitted: process.env.NEXT_PUBLIC_GADS_LABEL_CONTACT,
};

/** Meta's standard event names, which its optimiser understands natively. */
const META_EVENTS: Record<ConversionName, string> = {
  signup_started: "InitiateCheckout",
  signup_completed: "CompleteRegistration",
  activated: "Lead",
  subscribed: "Subscribe",
  demo_opened: "ViewContent",
  contact_submitted: "Contact",
};

/**
 * The conversions worth bidding on, in funnel order.
 *
 * Deliberately short. Every extra conversion action dilutes what the ad algorithms
 * optimise for, and one that fires too easily ("scrolled the pricing page") teaches
 * Google to buy tyre-kickers.
 */
export type ConversionName =
  | "signup_started"
  | "signup_completed"
  | "activated"
  | "subscribed"
  | "demo_opened"
  | "contact_submitted";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer?: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: ((...args: any[]) => void) & { queue?: any[]; loaded?: boolean; version?: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _fbq?: any;
  }
}

/**
 * The loaded SDK, or null.
 *
 * Imported dynamically so that declining the banner means no third-party code is ever
 * downloaded, let alone run, rather than "downloaded and asked to keep quiet". On a page you are
 * paying Google to send people to, the ~80 kB it saves on the first paint is worth
 * something too.
 */
let ph: PostHog | null = null;
let started = false;

/** Events fired between consent and the SDK arriving. Only ever filled once consent
 *  exists, so a decline still leaves no trace. */
let pending: Array<(client: PostHog) => void> = [];

/**
 * Load every consented tracker. Idempotent, since the consent listener and the initial mount
 * both call it.
 */
export function startAnalytics(): void {
  if (started || typeof window === "undefined" || !hasConsent()) return;
  started = true;

  // Google is not here any more: `startConsentMode()` loads it unconditionally with
  // denied defaults, and `syncGoogleConsent()` flips it. Only the two platforms with no
  // consent-mode equivalent are gated behind the banner.
  startPostHog();
  startMetaPixel();
}

function startPostHog(): void {
  if (!POSTHOG_KEY || !ANALYTICS_ENABLED) return;

  void import("posthog-js")
    .then(({ default: posthog }) => {
      initPostHog(posthog);
      ph = posthog;
      const queued = pending;
      pending = [];
      for (const run of queued) {
        try {
          run(posthog);
        } catch {
          /* one bad queued event must not drop the rest */
        }
      }
    })
    .catch(() => {
      // An ad blocker, an offline visitor, a CDN hiccup. None are the site's problem.
      pending = [];
    });
}

function initPostHog(posthog: PostHog): void {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // The visitor crosses from aerscheduler.com to app.aerscheduler.com mid-funnel. Without
    // this, PostHog mints a second anonymous id on the console and the signup funnel breaks
    // in half at the most important step.
    cross_subdomain_cookie: true,
    // Pageviews are sent by hand from the pageview hook, which also measures dwell time.
    capture_pageview: false,
    capture_pageleave: true,
    persistence: "cookie",
    autocapture: true,
    session_recording: { maskAllInputs: true },
    // Crash reporting. Off by default in posthog-js. A marketing page that throws
    // renders a blank screen and still reports a healthy pageview, so without this
    // a broken landing page and a working one produce identical analytics.
    capture_exceptions: true,
    // Consent is handled by our own banner; PostHog should just run once started.
    opt_out_capturing_by_default: false,
  });

  // Stamp the campaign onto every event and onto the person, so any chart in PostHog can
  // be split by campaign without repeating the property at each call site.
  // Unconditional: an unattributed visitor is still a visitor, and tagging the
  // environment only for attributed ones would leave dev traffic unlabelled in
  // exactly the case it is hardest to spot.
  posthog.register({ environment: ENVIRONMENT });

  const attribution = readAttribution();
  if (attribution) {
    posthog.register({
      campaign: attribution.utm_campaign ?? attribution.src ?? null,
      channel: channelOf(attribution),
      utm_source: attribution.utm_source ?? null,
      utm_medium: attribution.utm_medium ?? null,
      landing_path: attribution.landingPath ?? null,
    });
    // Person-level, not event-level: "which campaign first brought this person here"
    // must not be overwritten by whatever they clicked on their fourth visit.
    posthog.setPersonProperties(undefined, {
      initial_campaign: attribution.utm_campaign ?? attribution.src ?? null,
      initial_channel: channelOf(attribution),
      initial_referrer: attribution.referrer ?? null,
    });
  }
}

let consentModeStarted = false;

/**
 * The four Consent Mode v2 signals, all denied. `ad_user_data` and `ad_personalization`
 * are the two v2 added; omitting them is the usual way a v2 migration silently stays on
 * v1 behaviour in the EEA.
 */
const DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

const GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
} as const;

/**
 * Load the Google tag with everything denied.
 *
 * Deliberately NOT gated on consent. With all four signals denied the tag writes no
 * cookies and stores no identifiers; a conversion still reaches Google as a cookieless
 * ping it can model from. Call this on mount, before the banner is answered.
 *
 * The default MUST be pushed before the tag script runs, hence the ordering below:
 * dataLayer, then the consent default, then the script element.
 */
export function startConsentMode(): void {
  if (consentModeStarted || typeof window === "undefined" || !GOOGLE_ADS_ID) return;
  consentModeStarted = true;

  window.dataLayer = window.dataLayer || [];
  // gtag must push `arguments` itself, not a copy, because the tag reads the Arguments object.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  // Before the script, always. A default arriving after the tag has initialised is
  // ignored, and the visitor is then tracked under the platform default instead.
  window.gtag("consent", "default", {
    ...DENIED,
    // Give the banner a moment to answer before the first ping leaves, so a visitor who
    // accepts immediately is measured properly rather than modelled.
    wait_for_update: 500,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID, {
    // Keeps the gclid on the click through to the console on app.aerscheduler.com.
    conversion_linker: true,
  });
}

/**
 * Tell Google the answer once the banner is answered, in either direction. Safe to call
 * repeatedly, and safe to call when consent is later withdrawn.
 */
export function syncGoogleConsent(): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", hasConsent() ? { ...GRANTED } : { ...DENIED });
}

function startMetaPixel(): void {
  if (!META_PIXEL_ID || window.fbq) return;

  // Meta's standard loader, transcribed. It installs a queueing stub so events fired
  // before the real script arrives are replayed rather than lost. Typed loosely on
  // purpose: the stub mutates itself (`callMethod` is bolted on by fbevents.js once it
  // loads), which no honest static type describes.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fbq: any = function () {
    // eslint-disable-next-line prefer-rest-params
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
  };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
}

// ---------------------------------------------------------------- events

/** Queue or run, depending on whether the SDK chunk has arrived yet. */
function withClient(run: (client: PostHog) => void): void {
  if (!started) return; // no consent: drop, never queue
  if (ph) {
    try {
      run(ph);
    } catch {
      // Analytics must never break a page.
    }
    return;
  }
  if (pending.length < 50) pending.push(run);
}

/** A product-analytics event. Goes to PostHog only; ad platforms get conversions. */
export function track(event: string, props?: AnyProps): void {
  withClient((client) => client.capture(event, props));
}

/** A pageview, with the campaign already attached by `register` above. */
export function trackPageview(path: string, props?: AnyProps): void {
  track("$pageview", { $current_url: window.location.href, path, ...props });
}

/**
 * A funnel milestone: recorded in PostHog *and* reported to the ad platforms so their
 * bidding can optimise for it.
 */
export function trackConversion(name: ConversionName, props?: AnyProps): void {
  track(name, props);

  try {
    // Sent whether or not the banner was accepted. Under denied consent this is a
    // cookieless ping: no identifier, no cookie, still a signal Google can model from.
    // This is the entire reason zero conversions were reported for the first three days.
    const label = GOOGLE_CONVERSIONS[name];
    if (window.gtag && GOOGLE_ADS_ID && label) {
      window.gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS_ID}/${label}`,
        ...(props?.value ? { value: props.value, currency: "USD" } : {}),
      });
    }

    // Meta has no consent-mode equivalent, so the pixel stays fully gated.
    if (hasConsent() && started && window.fbq) {
      window.fbq("track", META_EVENTS[name], props);
    }
  } catch {
    // As above: a missing ad account is not an error worth surfacing.
  }
}

/** Tie the person to a real user once they identify themselves. */
export function identify(distinctId: string, props?: AnyProps): void {
  withClient((client) => client.identify(distinctId, props));
}
