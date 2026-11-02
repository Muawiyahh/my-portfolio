import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy policy | Muawiyah Althaf",
  description: "How muawiyahalthaf.com collects and uses personal information.",
};

const updated = "2 November 2026";
const email = "muawiyahalthaf@gmail.com";

const sections: { h: string; p: string[] }[] = [
  {
    h: "Who I am",
    p: [
      `This website is run by Muawiyah Althaf, a freelance web developer. If you have any question about your information, email me at ${email}.`,
    ],
  },
  {
    h: "What I collect",
    p: [
      "When you fill in a form on this website, I receive what you type: for example, your email address or phone number, or your name and message on the contact form. I also receive which ad or link brought you to the page (UTM tags), if there was one.",
      "On my ad landing pages (/tree-service-websites and /tree-surgeon-websites), I use the Meta Pixel and Meta's Conversions API to measure which ads lead to enquiries. These record that you visited the page and whether you sent your details, along with technical details such as your IP address, browser type and Meta's cookies (_fbp, _fbc). Your email address and phone number are scrambled (hashed) before being sent to Meta, so Meta can match them to an account without seeing them in plain text. The rest of this website does not use advertising trackers.",
      "On the UK page (/tree-surgeon-websites), none of this tracking happens unless you click Accept in the cookie banner. You can change your choice at any time with the Cookie settings link at the bottom of that page.",
    ],
  },
  {
    h: "Why I use it",
    p: [
      "To get in touch about your request and, if you hire me, to do the work.",
      "To see which ads work, so I spend less showing ads to people they aren't relevant to.",
      "I don't sell your information, and I don't add you to a mailing list.",
    ],
  },
  {
    h: "Who else handles it",
    p: [
      "Formspree (form delivery to my inbox), Meta Platforms (ad measurement), Netlify (website hosting) and Google (my email). Each processes the information only for these purposes, under their own privacy policies.",
    ],
  },
  {
    h: "How long I keep it",
    p: [
      "Enquiries are kept for as long as we're in touch and for up to 2 years after, unless you become a client, in which case I keep records as long as needed for the work, invoices and tax. You can ask me to delete your information at any time.",
    ],
  },
  {
    h: "Your choices",
    p: [
      `You can ask to see, correct or delete the information I hold about you by emailing ${email}. I'll reply within 30 days.`,
      "You can block or clear cookies in your browser, and control the ads Meta shows you in your Facebook or Instagram ad preferences.",
      "If you're in the UK, you have these rights under UK data protection law (UK GDPR). The legal basis for using your enquiry details is my legitimate interest in replying to you, and for ad measurement on the UK page it's your consent. If you're unhappy with how I've handled your information, you can complain to the Information Commissioner's Office (ico.org.uk).",
    ],
  },
  {
    h: "Changes",
    p: [`If this policy changes, I'll update it here. Last updated: ${updated}.`],
  },
];

export default function PrivacyPage() {
  return (
    <div className="lp-root min-h-dvh bg-lp-paper font-sans text-lp-ink antialiased">
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:py-20">
        <Link href="/" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-lp-accent">
          <ArrowLeft className="h-4 w-4" aria-hidden /> muawiyahalthaf.com
        </Link>
        <h1 className="lp-h1 mt-6 text-[2.5rem] sm:text-6xl">Privacy policy</h1>
        <p className="mt-4 text-lp-muted">Last updated: {updated}</p>
        {sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-[1.4rem] font-bold">{s.h}</h2>
            {s.p.map((para) => (
              <p key={para.slice(0, 40)} className="mt-3 text-[1.06rem] leading-relaxed text-lp-muted">
                {para}
              </p>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}
