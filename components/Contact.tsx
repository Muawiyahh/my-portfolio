"use client";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 pt-10 md:pt-20 pb-8 overflow-hidden">
      <Reveal>
        <h2 className="display text-[16vw] md:text-[14vw] lg:text-[11rem] leading-[0.9] text-ink text-center md:text-left">
          Let&apos;s Talk
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-20 mt-6 md:mt-14">
        {/* Form */}
        <Reveal delay={0.1}>
          <div className="space-y-6">
            <p className="text-base md:text-lg text-muted max-w-sm leading-relaxed">
              Got a question, proposal, or project? Drop me a message and I&apos;ll
              get back to you.
            </p>
            <ContactForm />
          </div>
        </Reveal>

        {/* Direct links */}
        <Reveal delay={0.15}>
          <div className="space-y-6 md:pt-2">
            <p className="label text-muted">Or reach me directly</p>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:muawiyahalthaf@gmail.com"
                className="label text-ink border-b border-line pb-3 hover:text-accent transition-colors w-fit"
              >
                muawiyahalthaf@gmail.com
              </a>
              <a
                href="#booking"
                className="label text-ink border-b border-line pb-3 hover:text-accent transition-colors w-fit"
              >
                Book a call
              </a>
              <div className="flex gap-6 pt-2">
                <a
                  href="https://www.linkedin.com/in/muawiyah-althaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-muted hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Muawiyahh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-muted hover:text-accent transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <p className="label text-muted text-center md:text-left mt-8">
        © {new Date().getFullYear()} Muawiyah Althaf
      </p>
    </section>
  );
}
