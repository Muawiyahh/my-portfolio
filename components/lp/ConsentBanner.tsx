"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getConsent, OPEN_EVENT, setConsent } from "@/lib/lp/consent";

/**
 * UK cookie banner. Accept and Reject are equally easy (ICO guidance); nothing tracks until Accept.
 * "Cookie settings" in the footer reopens it, so people can change their mind.
 */
export default function ConsentBanner({ text, accept, reject }: { text: string; accept: string; reject: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    // Ask once per browser; reading storage has to wait until we're in the browser.
    if (getConsent() === null) queueMicrotask(show);
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  if (!open) return null;

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie choice"
      className="fixed inset-x-0 bottom-0 z-50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-5"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-lp-line bg-lp-surface p-5 shadow-[0_20px_60px_-20px_rgba(20,22,26,0.45)] sm:flex-row sm:items-center">
        <p className="flex-1 text-[0.98rem] leading-relaxed text-lp-ink">
          {text}{" "}
          <Link href="/privacy" className="font-semibold text-lp-accent underline underline-offset-2">
            Privacy policy
          </Link>
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2.5">
          {/* Identical styling on purpose: rejecting must be as easy and as visible as accepting. */}
          <button type="button" onClick={() => choose("denied")} className="lp-btn lp-btn-ghost !min-h-12 !border-lp-ink !px-5">
            {reject}
          </button>
          <button type="button" onClick={() => choose("granted")} className="lp-btn lp-btn-ghost !min-h-12 !border-lp-ink !px-5">
            {accept}
          </button>
        </div>
      </div>
    </div>
  );
}
