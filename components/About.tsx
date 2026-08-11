"use client";
import Reveal from "./Reveal";

const tools = [
  {
    group: "Frontend",
    items: "JavaScript, TypeScript, React, Next.js, Tailwind CSS, Framer Motion, HTML5, CSS3",
  },
  {
    group: "Backend",
    items: "Node.js, Supabase, PostgreSQL, REST APIs, Auth & role-based access, Stripe",
  },
  {
    group: "AI & Tools",
    items: "Claude / OpenAI APIs, Chrome Extensions (MV3), Git & GitHub, Vercel, Railway",
  },
];

export default function About() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-28 md:py-44 max-w-6xl mx-auto w-full">
      <Reveal>
        <h2 className="display text-[9vw] md:text-[6.5vw] lg:text-7xl text-ink max-w-4xl">
          I build automations, extensions, web apps &amp; AI.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 mt-16 md:mt-24">
        {/* Bio */}
        <div className="space-y-6">
          <Reveal delay={0.05}>
            <p className="text-[17px] md:text-lg text-ink leading-relaxed">
              I&apos;m a full-stack developer specializing in automations, Chrome
              extensions, web applications, and AI-powered tools. I build complete
              products from the ground up — design, development, and deployment.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[17px] md:text-lg text-muted leading-relaxed">
              Outside of code, I&apos;m usually gaming — either getting lost in a
              story-mode game on the PS5, or playing something competitive like
              Valorant or Counter-Strike. I like to stay active off-screen too: I
              train in taekwondo — which has taken me to two international gold
              medals — and football is my favourite sport to get out and play.
              Based in Bangalore, working with clients worldwide.
            </p>
          </Reveal>
        </div>

        {/* Tools */}
        <div className="space-y-10">
          {tools.map(({ group, items }, i) => (
            <Reveal key={group} delay={0.1 + i * 0.08}>
              <div className="border-t border-line pt-5">
                <p className="label text-ink mb-3">{group}</p>
                <p className="text-base md:text-base text-muted leading-relaxed">
                  {items}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
