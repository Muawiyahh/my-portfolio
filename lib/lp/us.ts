import type { LeadPageContent } from "./types";
import { LP_ROUTES } from "./routes";

/** US lead page: tree service companies. "Estimate", $, US spelling. */
export const usContent: LeadPageContent = {
  market: "us",
  basePath: LP_ROUTES.us,
  formLabel: "Tree service websites (US)",

  meta: {
    title: "Done-for-you 10-page tree service websites for $399 | Muawiyah Althaf",
    description:
      "Get a done-for-you 10-page website for your tree service company for $399, with automations that send every estimate request, with photos, straight to your phone.",
  },

  headline: { before: "Get a done‑for‑you 10‑page tree service website for ", highlight: "$399", after: "" },
  subheadline:
    "Live in about a week, with automations that send every estimate request, with photos, straight to your phone.",
  image: {
    desktop: "/lp/us-demo-desktop-v2.png",
    mobile: "/lp/us-demo-mobile-v2.png",
    alt: "A tree service website shown on a computer and a phone",
    caption: "Example: a demo site for a made-up company.",
  },
  field: {
    label: "Where should I reach you?",
    placeholder: "Email or phone number",
    error: "Please enter a valid email address or phone number.",
  },
  button: "Get my website",
  note: "I'll reach out within 1 business day. Nothing to pay today.",
  bullets: [
    "10 pages built for tree work: home, every service, about, free estimate and more",
    "Estimate requests with photos land on your phone, and every customer gets an instant reply",
    "Every week without one, jobs go to the tree service with the better website",
  ],
  pricing: {
    heading: "Everything you get for $399",
    name: "Done-for-you website",
    price: "$399",
    cadence: "one-time",
    items: [
      "10-page website designed for your tree service",
      "A page for each service and the towns you cover, set up for Google",
      "Built for phones, with tap-to-call on every page",
      "Estimate request form with photo upload",
      "Instant email reply to every estimate request",
      "Every new lead emailed straight to you, with the photos",
      "One-tap Google review requests after each job",
      "Google Business Profile setup",
      "Your domain connected, with secure hosting set up",
    ],
    timeline: "Live in about a week",
    cta: "Get my website",
  },
  success: {
    title: "Got it!",
    text: "I'll reach out within 1 business day to get your website started.",
  },
  sendError: "Sorry, that didn't send. Please try again, or email me at muawiyahalthaf@gmail.com.",
};
