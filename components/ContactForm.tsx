"use client";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-line bg-surface p-8 md:p-10"
      >
        {/* soft accent glow in the corner */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br from-accent/25 to-accent2/25 blur-3xl" />

        {/* gradient check badge */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.12, type: "spring", stiffness: 260, damping: 18 }}
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent2 shadow-[0_0_30px_-6px_rgba(79,125,240,0.6)]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="h-7 w-7 text-cream"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        <h3 className="display text-4xl md:text-5xl text-ink">Message sent</h3>
        <p className="mt-4 max-w-sm text-[17px] text-muted leading-relaxed">
          Thanks for reaching out — it just landed in my inbox. I&apos;ll get
          back to you within a few hours.
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          data-hover
          className="label mt-7 inline-flex items-center gap-2 text-accent hover:text-ink transition-colors"
        >
          <span aria-hidden>↩</span> Send another
        </button>
      </motion.div>
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
