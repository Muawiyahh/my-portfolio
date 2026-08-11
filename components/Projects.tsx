"use client";
import Reveal from "./Reveal";
import ProjectCard, { type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    name: "Hirerchy Extension",
    description:
      "Built for a job-application agency that was burning hours retyping the same details into every job form. I shipped a published Chrome extension (Manifest V3) that autofills applications in one click across Workday, Greenhouse & iCIMS — with saved profiles, an admin panel, and a Supabase backend.",
    tags: ["Chrome Extension", "TypeScript", "Supabase"],
    image: "/projects/hirerchy-extension-v2.png",
    url: "chromewebstore.google.com",
    live: "https://chromewebstore.google.com/",
  },
  {
    name: "Hirerchy",
    description:
      "Built for the same agency as it scaled and needed to run the whole operation in one place. I designed and built an end-to-end SaaS platform — a polished marketing site plus the web app behind it: three roles (client, employee, admin) each with their own dashboard, a live application tracker synced to the extension, and built-in messaging.",
    tags: ["SaaS", "Next.js", "Supabase"],
    image: "/projects/hirerchy-platform-v3.png",
    url: "hirerchy.com",
    live: "https://hirerchy.com/",
  },
  {
    name: "Dhanaya",
    description:
      "Built for a dropshipping business that couldn't tell which products and platforms were actually making money. I turned their raw sales data into a clean, interactive profit-and-loss dashboard that breaks down margins across every product and channel.",
    tags: ["Data", "Dashboard", "Analytics"],
    image: "/projects/dhanaya-dashboard-v2.png",
    url: "dhanaya · dashboard",
    github: "https://github.com/Muawiyahh",
  },
  {
    name: "FitStudio",
    description:
      "Built for a clothing brand that wanted shoppers to see how garments fit before buying and cut down on sizing returns. I built a browser-based 3D fitting room — a measurement-driven body model, chart-sized garments, product-image decals, and a fit heatmap — using Three.js and React Three Fiber.",
    tags: ["Three.js", "R3F", "3D / WebGL"],
    image: "/projects/fitstudio-v2.png",
    url: "fitstudio.app",
    github: "https://github.com/Muawiyahh",
  },
  {
    name: "Acadewin",
    description:
      "Built for students who needed to revise faster without the busywork. Acadewin is an AI exam-prep platform that generates practice questions and auto-marks answers, turns notes into flashcards, and summarises documents — automating the grind of revision so learners study smarter, not harder.",
    tags: ["AI", "EdTech", "Next.js"],
    image: "/projects/acadewin.png",
    url: "acadewin.com",
    live: "https://acadewin.com/",
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
