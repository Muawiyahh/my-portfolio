"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-dvh overflow-hidden flex flex-col">
      {/* Smoky cloud-gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          animate={{ x: [0, 50, 0], y: [0, -20, 0], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-[8%] top-[2%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(240,234,214,0.20),transparent_62%)] blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -45, 0], y: [0, 30, 0], opacity: [0.85, 0.55, 0.85] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-6%] top-[18%] h-[52vw] w-[52vw] rounded-full bg-[radial-gradient(circle,rgba(79,125,240,0.16),transparent_62%)] blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, 30, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/4 bottom-[-12%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.15),transparent_62%)] blur-3xl"
        />
      </div>

      {/* Top nav */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="flex items-center justify-between px-6 md:px-12 py-7"
      >
        <a
          href="#booking"
          className="label border border-line rounded-full px-5 py-2.5 text-ink hover:bg-gradient-to-r hover:from-accent hover:to-accent2 hover:text-cream hover:border-transparent transition-colors duration-200"
        >
          Book a call
        </a>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Muawiyahh"
            target="_blank"
            rel="noopener noreferrer"
            className="label text-muted hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/muawiyah-althaf"
            target="_blank"
            rel="noopener noreferrer"
            className="label text-muted hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </motion.nav>

      {/* Center: status pill + giant name */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center pb-[12vh] md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/40 px-4 py-2 label text-ink backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
            </span>
            Available for work
          </span>
        </motion.div>

        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="display text-[17vw] md:text-[13.5vw] lg:text-[11.5rem] leading-[0.92] text-ink"
          >
            Muawiyah
            <br />
            Althaf
          </motion.h1>

          {/* Memoji avatar overlapping the name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {/* gentle floating loop */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="h-16 w-16 sm:h-28 sm:w-28 md:h-40 md:w-40 rounded-2xl md:rounded-3xl overflow-hidden border border-line shadow-2xl"
            >
              <Image
                src="/memoji-color-v2.png"
                alt="Muawiyah Althaf"
                width={400}
                height={400}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom intro lines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-12 pb-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="text-sm md:text-base text-muted max-w-xs"
        >
          Full-stack developer building{" "}
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent font-medium">
            automations, extensions, web apps &amp; AI tools
          </span>{" "}
          — currently available for work.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="text-sm md:text-base text-muted max-w-xs md:justify-self-end md:text-right"
        >
          Focused on clean, functional products — from idea to live deployment.
        </motion.p>
      </div>
    </section>
  );
}
