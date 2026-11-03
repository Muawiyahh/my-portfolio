import type { LeadPageContent } from "./types";
import { LP_ROUTES } from "./routes";

/** UK lead page: tree surgeons. "Quote", "mobile", £, British spelling. */
export const ukContent: LeadPageContent = {
  market: "uk",
  basePath: LP_ROUTES.uk,
  formLabel: "Tree surgeon websites (UK)",

  meta: {
    title: "Done-for-you 10-page tree surgery websites for £299 | Muawiyah Althaf",
    description:
      "Get a done-for-you 10-page website for your tree surgery business for £299, with automations that send every quote request, with photos, straight to your mobile.",
  },

  headline: { before: "Get a done‑for‑you 10‑page tree surgery website for ", highlight: "£299", after: "" },
  subheadline:
    "Live in about a week, with automations that send every quote request, with photos, straight to your mobile.",
  image: {
    desktop: "/lp/uk-demo-desktop-v2.png",
    mobile: "/lp/uk-demo-mobile-v2.png",
    alt: "A tree surgery website shown on a computer and a mobile",
    caption: "Example: a demo site for a made-up firm.",
  },
  field: {
    label: "Where should I reach you?",
    placeholder: "Email or mobile number",
    error: "Please enter a valid email address or mobile number.",
  },
  button: "Get my website",
  note: "I'll be in touch within 1 working day. Nothing to pay today.",
  bullets: [
    "10 pages built for tree work: home, every service, about, free quote and more",
    "Quote requests with photos land on your mobile, and every customer gets an instant reply",
    "Every week without one, work goes to the tree surgeon with the better website",
  ],
  pricing: {
    heading: "Everything you get for £299",
    name: "Done-for-you website",
    price: "£299",
    cadence: "one-off",
    items: [
      "60-minute consultation call to understand your business",
      "10-page website designed for your tree surgery business",
      "A page for each service and the areas you cover, set up for Google",
      "Built for mobiles, with tap-to-call on every page",
      "Quote request form with photo upload",
      "Instant email reply to every quote request",
      "Every new enquiry emailed straight to you, with the photos",
      "One-tap Google review requests after each job",
      "Google Business Profile setup",
      "Your domain connected, with secure hosting set up",
    ],
    timeline: "Live in about a week",
    cta: "Get my website",
  },
  success: {
    title: "Got it!",
    text: "I'll be in touch within 1 working day to get your website started.",
  },
  sendError: "Sorry, that didn't send. Please try again, or email me at muawiyahalthaf@gmail.com.",

  consent: {
    text: "I'd like to use Meta's cookies to see which of my ads bring enquiries. They only load if you accept.",
    accept: "Accept",
    reject: "Reject",
    settings: "Cookie settings",
  },
};
