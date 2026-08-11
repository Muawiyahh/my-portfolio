"use client";
import type { ReactNode, MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";

/** Wraps a child so it tilts toward the cursor and lifts on hover (desktop). */
function TiltCard({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["6deg", "-6deg"]), {
    stiffness: 250,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-6deg", "6deg"]), {
    stiffness: 250,
    damping: 22,
  });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      whileHover={{ scale: 1.015, y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      className="[transform-style:preserve-3d] will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  image: string;
  url?: string;
  live?: string;
  github?: string;
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2 0 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 5 18 5.3 18 5.3c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-2.5 w-2.5 shrink-0" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "l" | "r" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5" aria-hidden>
      <path d={dir === "l" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
      <path d="M12 15V4M8.5 7.5 12 4l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 12v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TabsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
      <rect x="4" y="7" width="12" height="12" rx="2.5" />
      <path d="M9 7V6.5A2.5 2.5 0 0 1 11.5 4H18a2 2 0 0 1 2 2v6.5A2.5 2.5 0 0 1 17.5 15H17" strokeLinecap="round" />
    </svg>
  );
}

/**
 * A minimal dark browser window that holds a site screenshot.
 * Traffic lights + a centered URL pill signal "live web product"; the chrome
 * stays dark to match the theme.
 */
function BrowserFrame({ src, alt, url }: { src?: string; alt: string; url?: string }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-line bg-[#0b0c0f] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]">
      {/* Safari (dark mode) chrome bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#2c2c2e] border-b border-[#1b1b1d]">
        {/* window controls */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
        </div>
        {/* back / forward */}
        <div className="hidden sm:flex items-center gap-4 text-[#8a8a8f] shrink-0">
          <Chevron dir="l" />
          <Chevron dir="r" />
        </div>
        {/* address field */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1.5 rounded-md bg-[#1c1c1e] px-3 py-1 max-w-[80%] text-[#c7c7cc]">
            <LockIcon />
            <span className="text-[11px] font-sans truncate tracking-tight">{url ?? ""}</span>
          </div>
        </div>
        {/* toolbar icons */}
        <div className="hidden sm:flex items-center gap-4 text-[#8a8a8f] shrink-0">
          <ShareIcon />
          <TabsIcon />
        </div>
      </div>

      {/* Viewport */}
      {src ? (
        <div className="bg-[#0b0c0f]">
          <Image
            src={src}
            alt={alt}
            width={1280}
            height={620}
            sizes="(max-width: 768px) 100vw, 45vw"
            className="block w-full h-auto"
          />
        </div>
      ) : (
        <div className="relative aspect-[1280/620] bg-[#0b0c0f]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c22] via-[#0b0c0f] to-[#141519]">
            <div className="absolute -left-1/4 -top-1/3 h-2/3 w-[150%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectCard({
  project,
  reverse,
}: {
  project: Project;
  reverse?: boolean;
}) {
  const links = (
    <div className="flex items-center gap-3">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} on GitHub`}
          className="h-11 w-11 rounded-full bg-ink text-cream flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <GithubIcon />
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} live`}
          className="h-11 w-11 rounded-full bg-ink text-cream flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <LinkIcon />
        </a>
      )}
    </div>
  );

  return (
    <Reveal>
      <div className="rounded-3xl border border-line bg-surface overflow-hidden p-6 md:p-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Text */}
          <div className="space-y-6">
            {links}
            <h3 className="font-display font-bold text-3xl md:text-5xl text-ink tracking-tight">
              {project.name}
            </h3>
            <p className="text-sm md:text-base text-muted leading-relaxed max-w-md">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
              {project.tags.map((t) => (
                <span key={t} className="label text-ink">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Screenshot in a browser window — tilts toward the cursor */}
          <TiltCard>
            <BrowserFrame
              src={project.image}
              url={project.url}
              alt={`${project.name} screenshot`}
            />
          </TiltCard>
        </div>
      </div>
    </Reveal>
  );
}
