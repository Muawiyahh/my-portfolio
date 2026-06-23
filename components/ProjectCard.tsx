"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  name: string;
  description: string;
  tags: string[];
  video?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-card aspect-[4/3] cursor-pointer select-none"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
    >
      {/* Default card content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] tracking-[0.2em] uppercase text-gold font-sans"
            >
              {tag}
            </span>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-ink mb-1">
            {project.name}
          </h3>
          <p className="text-sm text-muted font-sans leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Video overlay on hover/tap */}
      <AnimatePresence>
        {active && project.video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
