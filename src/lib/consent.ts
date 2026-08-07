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
 */

import { readCookie, writeSharedCookie } from "./cookies";

export const CONSENT_COOKIE = "aer_consent";

/** A year. Long enough not to nag; short enough that consent is periodically renewed. */
const CONSENT_DAYS = 365;

export type ConsentState = "granted" | "denied" | "unset";

export function readConsent(): ConsentState {
  const raw = readCookie(CONSENT_COOKIE);
  return raw === "granted" || raw === "denied" ? raw : "unset";
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
