/**
 * Cookie consent, shared between the marketing site and the console.
 *
 * Stored on `.aerscheduler.com` so a decision made on a feature page still holds when the
 * visitor lands in the console two clicks later. Being asked twice reads as the banner
 * being broken.
 *
 * ## What is and isn't gated
 *
 * Gated: PostHog, the Google Ads tag, the Meta Pixel. All third-party, all capable of
 * following someone across sites.
 *
 * Not gated: `lib/attribution.ts`. That is a first-party cookie recording how somebody
 * reached our own site, nobody else can read it, and it is what makes the setup checklist
 * open on the topic they were reading about. If that line ever needs to move, it moves in
 * one place: call `hasConsent()` at the top of `captureAttribution`.
 *
 * ## Until they answer
 *
 * Undecided is treated as "no". Nothing third-party loads, so a visitor who ignores the
 * banner is never tracked. That does cost some measured traffic, which is the deliberate
 * trade.
 *
 * ## Global Privacy Control
 *
 * A browser sending GPC is making a legally recognised opt-out request under the CPRA and
 * the Colorado and Connecticut acts, which require it to be honoured without asking the
 * visitor to do anything else. So GPC is read as a standing "denied" and, unlike the
 * banner default, it is not merely the absence of consent: the banner does not appear at
 * all, because putting an Accept button in front of someone who has already opted out is
 * the dark pattern the rule exists to stop.
 *
 * An explicit Accept still wins. Someone who deliberately clicks Accept on this site has
 * made a more specific choice than their browser-wide default, and the regulations allow
 * that, so the cookie is checked first.
 */

import { readCookie, writeSharedCookie } from "./cookies";

export const CONSENT_COOKIE = "aer_consent";

/** A year. Long enough not to nag; short enough that consent is periodically renewed. */
const CONSENT_DAYS = 365;

export type ConsentState = "granted" | "denied" | "unset";

/**
 * True when the browser is sending Global Privacy Control.
 *
 * `navigator.globalPrivacyControl` is the standard surface. Guarded for SSR, where there
 * is no navigator at all, and typed locally because it is not yet in the DOM lib.
 */
export function hasGlobalPrivacyControl(): boolean {
  if (typeof navigator === "undefined") return false;
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function readConsent(): ConsentState {
  const raw = readCookie(CONSENT_COOKIE);
  if (raw === "granted" || raw === "denied") return raw;
  // No stored decision: a GPC signal is one, and it is a "no".
  if (hasGlobalPrivacyControl()) return "denied";
  return "unset";
}

export function hasConsent(): boolean {
  return readConsent() === "granted";
}

export function setConsent(state: "granted" | "denied"): void {
  writeSharedCookie(CONSENT_COOKIE, state, CONSENT_DAYS);
  notify(state);
}

// ---------------------------------------------------------------- subscription

/**
 * Consent changes after the page has loaded, which is the whole point of the banner, so
 * the analytics loader has to hear about it rather than only reading once at boot.
 */
type Listener = (state: ConsentState) => void;
const listeners = new Set<Listener>();

export function onConsentChange(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(state: ConsentState): void {
  for (const listener of listeners) {
    try {
      listener(state);
    } catch {
      // One misbehaving listener must not stop the others, and must never surface as a
      // page error over something as peripheral as analytics.
    }
  }
}
