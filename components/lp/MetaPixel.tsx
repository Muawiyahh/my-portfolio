"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { currentConsent, onConsentChange } from "@/lib/lp/consent";

/**
 * Meta Pixel for the lead gen pages only (the rest of the portfolio stays tracker-free).
 * Renders nothing until NEXT_PUBLIC_META_PIXEL_ID is set.
 * With requireConsent (UK page) it loads only after the visitor accepts cookies, and stops if they later reject.
 */
export default function MetaPixel({ pixelId, requireConsent = false }: { pixelId?: string; requireConsent?: boolean }) {
  const id = pixelId && /^\d{5,20}$/.test(pixelId) ? pixelId : undefined;
  const pathname = usePathname();
  const firstView = useRef(true);
  const [allowed, setAllowed] = useState(!requireConsent);

  useEffect(() => {
    if (!requireConsent) return;
    // Pick up a choice made on an earlier visit, then follow any change.
    if (currentConsent() === "granted") queueMicrotask(() => setAllowed(true));
    return onConsentChange((value) => {
      if (value === "granted") {
        window.fbq?.("consent", "grant");
        setAllowed(true);
      } else {
        window.fbq?.("consent", "revoke");
        setAllowed(false);
      }
    });
  }, [requireConsent]);

  // The snippet sends the first PageView; client-side moves (page → thank-you page) send the rest.
  useEffect(() => {
    if (!id || !allowed) return;
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname, id, allowed]);

  if (!id || !allowed) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`}
      </Script>
      {!requireConsent && (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element -- Meta's no-JS fallback pixel (not used where consent is required) */}
          <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`} />
        </noscript>
      )}
    </>
  );
}
