"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "2+", label: "Extensions\nPublished" },
  { value: "3+", label: "Websites\nBuilt" },
  { value: "1", label: "App\nLive" },
];

export default function About() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-bleed background photo — add /public/photo.jpg to enable */}
      <div className="absolute inset-0 bg-ink">
        <Image
          src="/photo.jpg"
          alt="Muawiyah Althaf"
          fill
          className="object-cover object-center opacity-70"
          sizes="100vw"
        />
      </div>

      {/* Panel */}
      <div className="relative min-h-screen flex items-end md:items-center px-6 pt-32 pb-16 md:py-0">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:max-w-md bg-cream/90 backdrop-blur-sm rounded-2xl p-8 md:p-10"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted mb-3 font-sans">
              About
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4 leading-tight">
              Building things
              <br />
              that work.
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-8 font-sans">
              I&apos;m a web developer specializing in Chrome extensions, web
              applications, and websites. I build fast, functional products from
              the ground up — from design to deployment.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-ink/10 pt-6">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-heading font-bold text-ink">
                    {value}
                  </p>
                  <p className="text-[9px] text-muted font-sans whitespace-pre-line leading-tight mt-1 tracking-widest uppercase">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
