import type { Metadata } from "next";
import LeadPage from "@/components/lp/LeadPage";
import { usContent as c } from "@/lib/lp/us";

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: c.basePath },
  openGraph: { title: c.meta.title, description: c.meta.description, type: "website", url: c.basePath, images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: c.meta.title, description: c.meta.description, images: ["/og.png"] },
};

export default function TreeServiceWebsitesPage() {
  return <LeadPage c={c} />;
}
