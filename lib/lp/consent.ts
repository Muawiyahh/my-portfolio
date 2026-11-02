/**
 * Cookie consent for the UK lead page. The US page doesn't need it, so it never asks.
 * The choice is kept in this browser only; if storage is blocked we treat it as "not given".
 */

export type Consent = "granted" | "denied" | null;

const KEY = "lp_consent";
const EVENT = "lp:consent";
export const OPEN_EVENT = "lp:consent-open";

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "granted" | "denied") {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* storage blocked: the choice lasts for this page view only */
  }
  memo = value;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

let memo: Consent | undefined;
export function currentConsent(): Consent {
  if (memo === undefined) memo = getConsent();
  return memo;
}

export function onConsentChange(cb: (value: Consent) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<Consent>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

/** Tracking is allowed on the US page always, and on the UK page only after "Accept". */
export function trackingAllowed(market: string) {
  return market !== "uk" || currentConsent() === "granted";
}
