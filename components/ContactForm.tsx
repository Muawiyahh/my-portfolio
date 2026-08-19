"use client";
import { useState, type FormEvent } from "react";

// Formspree endpoint — submissions land in muawiyahalthaf@gmail.com.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdenpvrr";

const inputClass =
  "w-full bg-surface border border-line rounded-lg px-4 py-3 text-base font-sans text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8">
        <p className="font-display font-bold text-2xl text-ink mb-2">Thanks! 🎉</p>
        <p className="text-base text-muted leading-relaxed">
          Your message is on its way — I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot — hidden from people; bots that fill it are silently dropped by Formspree */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name" required placeholder="Your name" className={inputClass} />
        <input name="email" type="email" required placeholder="Email address" className={inputClass} />
      </div>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Tell me about your project..."
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        data-hover
        className="label bg-gradient-to-r from-accent to-accent2 text-cream rounded-full px-8 py-3.5 hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      {status === "error" && (
        <p className="text-[15px] font-sans text-red-400">
          Something went wrong — please email me directly at muawiyahalthaf@gmail.com.
        </p>
      )}
    </form>
  );
}
