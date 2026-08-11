"use client";
import Reveal from "./Reveal";

// TODO: replace with your real Cal.com link once you create a free account,
// e.g. "https://cal.com/muawiyah/30min". Until then this points to cal.com.
const CAL_LINK = "https://cal.com/";

export default function Booking() {
  return (
    <section id="booking" className="px-6 md:px-12 py-28 md:py-40 max-w-4xl mx-auto w-full text-center">
      <Reveal>
        <h2 className="display text-[10vw] md:text-[6vw] lg:text-7xl text-ink">
          Let&apos;s build something.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-base md:text-lg text-muted max-w-xl mx-auto mt-6 leading-relaxed">
          Have a project in mind? Book a free call and let&apos;s talk through what
          you want to build — no pressure, just a conversation.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-hover
          className="inline-block mt-10 label bg-ink text-cream rounded-full px-8 py-4 hover:opacity-85 transition-opacity"
        >
          Book a call →
        </a>
      </Reveal>
    </section>
  );
}
