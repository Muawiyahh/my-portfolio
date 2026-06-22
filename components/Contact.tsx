"use client";
import { motion } from "framer-motion";

const links = [
  { label: "Email", href: "mailto:muawiyahalthaf@gmail.com" },
  { label: "Fiverr", href: "#" }, // TODO: replace with your Fiverr profile URL
  { label: "GitHub", href: "https://github.com/Muawiyahh" },
  { label: "LinkedIn", href: "#" }, // TODO: replace with your LinkedIn profile URL
];

export default function Contact() {
  return (
    <section className="px-6 py-28 md:py-44 text-center">
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.3em] uppercase text-muted mb-4 font-sans"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-ink mb-12 leading-tight"
        >
          Let&apos;s work
          <br />
          together.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") || href === "#" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase font-sans text-ink border-b border-ink pb-0.5 hover:text-muted hover:border-muted transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24 text-xs text-muted font-sans"
        >
          © {new Date().getFullYear()} Muawiyah Althaf
        </motion.p>
      </div>
    </section>
  );
}
