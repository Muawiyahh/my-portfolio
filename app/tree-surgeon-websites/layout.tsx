import ConsentBanner from "@/components/lp/ConsentBanner";
import MetaPixel from "@/components/lp/MetaPixel";
import { ukContent as c } from "@/lib/lp/uk";

/** UK pages: same design as the US pages, but tracking waits for cookie consent (PECR / UK GDPR). */
export default function UkLeadPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en-GB" className="lp-root min-h-dvh bg-lp-paper font-sans text-lp-ink antialiased selection:bg-lp-accent selection:text-white">
      {children}
      <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} requireConsent />
      {c.consent && <ConsentBanner text={c.consent.text} accept={c.consent.accept} reject={c.consent.reject} />}
    </div>
  );
}
