import type { Metadata } from "next";
import LeadPage from "@/components/lp/LeadPage";
import { ukContent as c } from "@/lib/lp/uk";

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: c.basePath },
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    type: "website",
    url: c.basePath,
    locale: "en_GB",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", title: c.meta.title, description: c.meta.description, images: ["/og.png"] },
};

export default function TreeSurgeonWebsitesPage() {
  return <LeadPage c={c} />;
}
