/**
 * Conversion tracking for the lead pages.
 * A lead goes to the Meta Pixel (browser) and to /api/meta (Conversions API, server)
 * with the same event ID, so Meta counts it once even when both arrive.
 * Does nothing until the Pixel is configured, and on the UK page until cookies are accepted.
 */

import { trackingAllowed } from "./consent";

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

function eventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function trackLead(contact: { email?: string; phone?: string }, meta: { market: string; content: string }) {
  if (!trackingAllowed(meta.market)) return;
  const id = eventId();
  try {
    window.fbq?.("track", "Lead", { content_name: meta.content }, { eventID: id });
  } catch {
    /* tracking must never break the page */
  }
  try {
    void fetch("/api/meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "Lead", eventId: id, sourceUrl: window.location.href, market: meta.market, ...contact }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const UTM_STORE = "lp_utm";

/** Remembers which ad brought this visitor, so it reaches your inbox with the lead. */
export function rememberUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 120);
    }
    if (params.get("fbclid")) found.from_meta_ad = "yes";
    if (Object.keys(found).length) sessionStorage.setItem(UTM_STORE, JSON.stringify(found));
  } catch {
    /* storage can be blocked */
  }
}

export function readUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORE) ?? "{}") as Record<string, string>;
  } catch {
    return {};
  }
}
