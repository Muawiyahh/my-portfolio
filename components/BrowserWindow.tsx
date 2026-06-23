"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const TABS = ["acadewin.com", "hirerchy.com", "extension"];
const LINES = [
  { w: "w-3/4", o: "opacity-40" },
  { w: "w-1/2", o: "opacity-25" },
  { w: "w-5/6", o: "opacity-30" },
  { w: "w-2/5", o: "opacity-20" },
  { w: "w-3/5", o: "opacity-25" },
  { w: "w-1/3", o: "opacity-15" },
];

export default function BrowserWindow() {
  const { scrollY } = useScroll();

  // Scroll-driven transforms
  const rawX    = useTransform(scrollY, [0, 600], [0, 180]);
  const rawY    = useTransform(scrollY, [0, 600], [0, 120]);
  const rawRot  = useTransform(scrollY, [0, 600], [0, 14]);
  const rawScale = useTransform(scrollY, [0, 600], [1, 0.72]);

  // Spring-smooth them so motion feels physical
  const x     = useSpring(rawX,    { stiffness: 60, damping: 18 });
  const y     = useSpring(rawY,    { stiffness: 60, damping: 18 });
  const rot   = useSpring(rawRot,  { stiffness: 60, damping: 18 });
  const scale = useSpring(rawScale,{ stiffness: 60, damping: 18 });

  if (typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  return (
    <motion.div
      // Entrance: slides in from right, fades in
      initial={{ opacity: 0, x: 120, rotate: -6 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      // Scroll-driven motion layered on top via style
      style={{ x, y, rotate: rot, scale }}
      className="absolute right-[-60px] md:right-[-20px] lg:right-[40px] top-1/2 -translate-y-1/2 w-[320px] sm:w-[380px] md:w-[440px] z-0 pointer-events-none select-none"
    >
      {/* Drop shadow glow */}
      <div className="absolute inset-0 rounded-xl blur-2xl bg-gold/10 scale-105" />

      {/* Browser chrome */}
      <div className="relative rounded-xl overflow-hidden border border-gold/20 bg-[#111111]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] border-b border-gold/10">
          {/* Traffic lights */}
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />

          {/* Address bar */}
          <div className="flex-1 mx-3 bg-[#0D0D0D] rounded-md px-3 py-1 flex items-center gap-2 border border-gold/10">
            <div className="w-2 h-2 rounded-full border border-gold/30 shrink-0" />
            <span className="text-[10px] font-sans text-muted truncate tracking-wide">
              acadewin.com
            </span>
          </div>
        </div>

        {/* Tabs row */}
        <div className="flex border-b border-gold/10 bg-[#161616]">
          {TABS.map((tab, i) => (
            <div
              key={tab}
              className={`px-3 py-1.5 text-[9px] font-sans tracking-wide truncate border-r border-gold/10 ${
                i === 0
                  ? "text-gold border-b-2 border-b-gold bg-[#111111]"
                  : "text-muted"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Page content mock */}
        <div className="p-5 space-y-3 bg-[#0F0F0F]">
          {/* Hero banner placeholder */}
          <div className="rounded-lg bg-[#1A1A1A] h-24 flex items-center justify-center border border-gold/10">
            <span className="text-[10px] font-sans text-gold/60 tracking-[0.25em] uppercase">
              acadewin.com
            </span>
          </div>
          {/* Content skeleton lines */}
          {LINES.map((l, i) => (
            <div
              key={i}
              className={`h-2 rounded-full bg-gold/20 ${l.w} ${l.o}`}
            />
          ))}
          {/* CTA button mock */}
          <div className="mt-4 w-24 h-6 rounded-md bg-gold/30 border border-gold/40" />
        </div>
      </div>
    </motion.div>
  );
}
