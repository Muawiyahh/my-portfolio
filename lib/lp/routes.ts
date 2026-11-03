/** Where each market's lead page lives. Shared by the content files and the privacy page's back link. */
export const LP_ROUTES = {
  us: "/tree-service-websites",
  uk: "/tree-surgeon-websites",
} as const;

/** Privacy link that remembers which lead page sent the visitor, so "Back" returns there. */
export const privacyHref = (market: keyof typeof LP_ROUTES) => `/privacy?from=${market}`;
