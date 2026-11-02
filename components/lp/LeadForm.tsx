"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import type { LeadPageContent } from "@/lib/lp/types";
import { readUtm, rememberUtm, trackLead } from "@/lib/lp/track";

// Leads land in Muawiyah's inbox via Formspree (same account as the portfolio contact form).
const ENDPOINT = process.env.NEXT_PUBLIC_LP_FORM_ENDPOINT ?? "https://formspree.io/f/mdenpvrr";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]{7,24}$/;

/** Email or phone, whichever they typed. Returns null when it's neither. */
function parseContact(raw: string): { email?: string; phone?: string } | null {
  const v = raw.trim();
  if (EMAIL_RE.test(v)) return { email: v };
  if (PHONE_RE.test(v) && v.replace(/\D/g, "").length >= 7) return { phone: v };
  return null;
}

/** One field, one button. On success the form is replaced by a confirmation: no extra page, no extra step. */
export default function LeadForm({ c }: { c: LeadPageContent }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => rememberUtm(), []);
  useEffect(() => {
    if (state === "sent") doneRef.current?.focus();
  }, [state]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const contact = parseContact(value);
    if (!contact) {
      setError(true);
      e.currentTarget.querySelector<HTMLInputElement>("input[name=contact]")?.focus();
      return;
    }
    setState("sending");
    const data = new FormData();
    data.set("_subject", `New website lead (${c.market.toUpperCase()}): ${value.trim()}`);
    data.set("page", c.formLabel);
    data.set("contact", value.trim());
    if (contact.email) data.set("email", contact.email); // lets you hit Reply in your inbox
    data.set("_gotcha", (e.currentTarget.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value ?? "");
    for (const [k, v] of Object.entries(readUtm())) data.set(k, v);

    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      trackLead(contact, { market: c.market, content: c.formLabel });
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-lp-ok/30 bg-lp-ok/8 p-6 text-center outline-none"
      >
        <CircleCheck className="mx-auto h-10 w-10 text-lp-ok" aria-hidden />
        <p className="mt-3 text-[1.35rem] font-bold">{c.success.title}</p>
        <p className="mt-1 text-[1.05rem] text-lp-muted">{c.success.text}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Honeypot: hidden from people; Formspree drops submissions that fill it. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <label htmlFor="contact" className="mb-2 block text-left font-semibold">
        {c.field.label}
      </label>
      <input
        id="contact"
        name="contact"
        autoComplete="email"
        placeholder={c.field.placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (error) setError(false);
        }}
        aria-invalid={error}
        aria-describedby={error ? "contact-error" : undefined}
        className="lp-field !min-h-14 text-center"
      />
      {error && (
        <p id="contact-error" className="mt-2 text-[0.95rem] font-medium text-lp-missed">
          {c.field.error}
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="lp-btn lp-btn-primary mt-3 w-full !min-h-15 !text-[1.15rem]">
        {state === "sending" ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            {c.button} <ArrowRight className="h-5 w-5" aria-hidden />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-[0.95rem] text-lp-muted">{c.note}</p>
      <div aria-live="polite">
        {state === "failed" && (
          <p className="mt-3 rounded-lg bg-[#fdecea] px-4 py-3 text-[0.98rem] font-medium text-lp-missed">{c.sendError}</p>
        )}
      </div>
    </form>
  );
}
