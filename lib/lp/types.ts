/**
 * Lead page content, one object per market. The page follows Alex Hormozi's simple layouts:
 * headline → subheadline → (image) → one contact field → button → (3 bullets).
 */

export type Market = "us" | "uk";

/** 1 = headline + form, 2 = adds the image, 3 = adds the image and three bullets. */
export type Layout = 1 | 2 | 3;

export type LeadPageContent = {
  market: Market;
  /** Route, e.g. "/tree-service-websites". */
  basePath: string;
  /** Sent with each lead so you can tell which page it came from. */
  formLabel: string;
  meta: { title: string; description: string };
  /** Headline restating "the thing they said they wanted"; the highlight gets the accent colour. */
  headline: { before: string; highlight: string; after: string };
  subheadline: string;
  image: { desktop: string; mobile: string; alt: string; caption: string };
  field: { label: string; placeholder: string; error: string };
  button: string;
  /** One reassuring line under the button. */
  note: string;
  /** You should get it / why / you'll regret not getting it. */
  bullets: [string, string, string];
  /** The single price card at the bottom of the page. */
  pricing: {
    heading: string;
    name: string;
    price: string;
    cadence: string;
    items: string[];
    extra: string;
    timeline: string;
    cta: string;
  };
  success: { title: string; text: string };
  sendError: string;
  /** UK only: the Pixel and Conversions API wait for cookie consent (PECR / UK GDPR). */
  consent?: { text: string; accept: string; reject: string; settings: string };
};
