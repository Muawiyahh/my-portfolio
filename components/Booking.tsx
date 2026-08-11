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
          Partner with me. Launch fast.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-[17px] md:text-lg text-muted max-w-xl mx-auto mt-6 leading-relaxed">
          I help <span className="text-ink">founders</span>{" "}
          go from idea to launch —
          I build your product from scratch, end to end: automations, web apps &amp;
          AI tools, shipped fast and ready to grow.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-hover
          className="inline-block mt-10 label bg-gradient-to-r from-accent to-accent2 text-cream rounded-full px-8 py-4 hover:opacity-90 transition-opacity"
        >
          Book a call →
        </a>
      </Reveal>
    </section>
  );
}
