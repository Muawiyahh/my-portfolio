"use client";
import Reveal from "./Reveal";

const services = [
  {
    n: "01",
    title: "Automations",
    desc: "Custom automation tools that kill repetitive work — form fillers, data scrapers, workflow automations, and integrations that run without you.",
  },
  {
    n: "02",
    title: "Chrome Extensions",
    desc: "Custom browser extensions (Manifest V3) — automation tools, form fillers, and features that extend the web to fit your workflow.",
  },
  {
    n: "03",
    title: "Web Applications",
    desc: "Full-stack apps with authentication, databases, role-based access, and dashboards. Fast, secure, and scalable.",
  },
  {
    n: "04",
    title: "AI-Powered Tools",
    desc: "AI apps, chatbots, and integrations using Claude, GPT & Gemini — analyzers, generators, and smart automations.",
  },
  {
    n: "05",
    title: "Websites",
    desc: "Modern, responsive websites built from scratch — no bloated templates. Fast-loading, SEO-ready, and deployed live.",
  },
];

export default function Services() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-28 md:py-40 max-w-6xl mx-auto w-full">
      <Reveal>
        <p className="label text-muted mb-6">What I do</p>
      </Reveal>
      <div className="border-t border-line">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06}>
            <div
              data-hover
              className="group grid grid-cols-1 md:grid-cols-[80px_1fr_1.2fr] gap-3 md:gap-10 items-start border-b border-line py-9 md:py-12 transition-colors hover:bg-surface/40"
            >
              <span className="label pt-2 bg-gradient-to-br from-accent to-accent2 bg-clip-text text-transparent">
                {s.n}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-4xl text-ink tracking-tight">
                {s.title}
              </h3>
              <p className="text-base md:text-base text-muted leading-relaxed md:pt-2">
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
