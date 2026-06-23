"use client";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    name: "Hirerchy Autofill",
    description:
      "Chrome extension that fills job application forms instantly using saved client profiles. Published on the Chrome Web Store.",
    tags: ["Chrome Extension", "MV3", "Supabase"],
    video: "/videos/hirerchy-autofill.mp4",
  },
  {
    name: "Hirerchy Portal",
    description:
      "Client portal for managing profiles used in automated job applications, with role-based access control.",
    tags: ["Web App", "Supabase", "Netlify"],
    video: "/videos/hirerchy-portal.mp4",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Projects() {
  return (
    <section className="px-6 py-24 md:py-36 max-w-6xl mx-auto w-full">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3 font-sans"
      >
        Work
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl font-heading font-bold text-ink mb-16"
      >
        Selected Projects
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {projects.map((project) => (
          <motion.div key={project.name} variants={item}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
