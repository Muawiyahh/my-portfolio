"use client";
import Reveal from "./Reveal";
import ProjectCard, { type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    name: "Hirerchy Extension",
    description:
      "A published Chrome extension (Manifest V3) that autofills job application forms in one click across Workday, Greenhouse & iCIMS — with saved profiles, an admin panel, and a Supabase backend.",
    tags: ["Chrome Extension", "TypeScript", "Supabase"],
    image: "/projects/hirerchy-extension-v2.png",
    url: "chromewebstore.google.com",
    live: "https://chromewebstore.google.com/",
  },
  {
    name: "Hirerchy",
    description:
      "A full SaaS platform for a job-application agency — a polished marketing site plus the web app behind it: three user roles (client, employee, admin), each with their own dashboard, a live application tracker synced to the Chrome extension, and built-in messaging. Designed and built end-to-end.",
    tags: ["SaaS", "Next.js", "Supabase"],
    image: "/projects/hirerchy-platform-v3.png",
    url: "hirerchy.com",
  },
  {
    name: "Dhanaya",
    description:
      "A data-driven profit-and-loss dashboard for a dropshipping business — rebuilt from raw sales data into a clean, interactive breakdown across products and platforms.",
    tags: ["Data", "Dashboard", "Analytics"],
    image: "/projects/dhanaya-dashboard-v2.png",
    url: "dhanaya · dashboard",
  },
  {
    name: "FitStudio",
    description:
      "A browser-based 3D virtual fitting room: a measurement-driven body model, chart-sized garments, product-image decals, and a fit heatmap — built with Three.js and React Three Fiber.",
    tags: ["Three.js", "R3F", "3D / WebGL"],
    image: "/projects/fitstudio-v2.png",
    url: "fitstudio.app",
  },
];

export default function Projects() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-28 md:py-40 max-w-7xl mx-auto w-full">
      <div className="text-center mb-20 md:mb-28">
        <Reveal>
          <h2 className="display text-[12vw] md:text-[8vw] lg:text-[6.5rem] text-ink">
            My Projects
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="label text-muted max-w-xl mx-auto mt-6 !tracking-[0.15em] leading-relaxed">
            From Chrome extensions to full-stack platforms and AI tools — every
            build here solves a real-world problem with clean code.
          </p>
        </Reveal>
      </div>

      <div className="space-y-10 md:space-y-16">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
