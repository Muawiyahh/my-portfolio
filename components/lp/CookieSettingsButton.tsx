"use client";

import { OPEN_EVENT } from "@/lib/lp/consent";

export default function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className="cursor-pointer hover:text-lp-ink">
      {label}
    </button>
  );
}
