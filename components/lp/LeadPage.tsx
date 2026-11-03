import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Check } from "lucide-react";
import type { Layout, LeadPageContent } from "@/lib/lp/types";
import LeadForm from "./LeadForm";
import CookieSettingsButton from "./CookieSettingsButton";
import { privacyHref } from "@/lib/lp/routes";

/**
 * Hormozi-style lead page: logo → headline → subheadline → image → one field → button → three bullets.
 * Nothing else to click. `layout` drops the image (1) or the bullets (1–2) for A/B tests.
 */
export default function LeadPage({ c, layout = 3 }: { c: LeadPageContent; layout?: Layout }) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 pt-6 pb-10 text-center sm:pt-10">
      <p className="font-display text-[1.05rem] font-extrabold tracking-tight">Muawiyah Althaf</p>

      <h1 className="lp-h1 mt-5 text-[2.35rem] sm:mt-10 sm:text-[3.4rem]">
        {c.headline.before}
        <span className="relative whitespace-nowrap text-lp-accent">
          {c.headline.highlight}
          <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-3 w-full" aria-hidden>
            <path d="M2 8 C 50 2, 120 2, 198 7" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        </span>
        {c.headline.after}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[1.08rem] leading-relaxed text-lp-muted sm:text-[1.2rem]">{c.subheadline}</p>

      {layout >= 2 && (
        <figure className="mt-6">
          <div className="relative mx-auto w-full pr-10 pb-6 sm:pr-14">
            <div className="overflow-hidden rounded-xl border border-lp-line bg-lp-surface shadow-[0_24px_50px_-28px_rgba(20,22,26,0.5)]">
              <div className="flex items-center gap-1.5 border-b border-lp-line px-3 py-2" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              </div>
              <Image src={c.image.desktop} alt={c.image.alt} width={2160} height={1350} loading="eager" sizes="(min-width: 640px) 520px, 85vw" className="h-auto w-full" />
            </div>
            <div className="absolute right-0 bottom-0 w-[27%] rounded-[1.1rem] bg-[#07080a] p-[4px] shadow-[0_20px_40px_-18px_rgba(0,0,0,0.6)] sm:rounded-[1.4rem] sm:p-[5px]">
              {/* The screenshot is a full iPhone screen (9:19.5); the frame shows its top, so nothing is cut at the sides. */}
              <div className="aspect-[9/16] overflow-hidden rounded-[0.9rem] sm:rounded-[1.15rem]">
                <Image src={c.image.mobile} alt="" width={1170} height={2532} sizes="150px" className="h-full w-full object-cover object-top" />
              </div>
            </div>
          </div>
          <figcaption className="mt-2 text-[0.88rem] text-lp-muted">{c.image.caption}</figcaption>
        </figure>
      )}

      <div id="get" className="mt-6 w-full scroll-mt-6">
        <LeadForm c={c} />
      </div>

      {layout === 3 && (
        <ul className="mx-auto mt-8 max-w-md space-y-3.5 text-left">
          {c.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-[1.05rem] leading-snug">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lp-ok/12 text-lp-ok">
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
              </span>
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* One price card: everything included, one button back up to the form. */}
      <section aria-labelledby="price-heading" className="mt-12">
        <h2 id="price-heading" className="lp-h2 text-[1.6rem] sm:text-[1.9rem]">
          {c.pricing.heading}
        </h2>
        <div className="mx-auto mt-5 max-w-md rounded-[1.25rem] bg-lp-night p-5 text-left text-white shadow-[0_24px_50px_-28px_rgba(20,22,26,0.7)] sm:p-6">
          <p className="text-[0.95rem] font-semibold text-lp-night-muted">{c.pricing.name}</p>
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="font-display text-[2.3rem] leading-none font-extrabold tracking-tight">{c.pricing.price}</span>
            <span className="text-[0.88rem] text-lp-night-muted">{c.pricing.cadence}</span>
          </p>
          <ul className="mt-5 space-y-2">
            {c.pricing.items.map((item) => (
              <li key={item} className="flex gap-2.5 text-[0.95rem] leading-snug">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-lp-sky" strokeWidth={3} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-lp-night-line pt-4 text-[0.92rem] font-semibold text-lp-sky">{c.pricing.timeline}</p>
          <a href="#get" className="lp-btn lp-btn-primary mt-4 w-full !min-h-12 !text-[1rem]">
            {c.pricing.cta} <ArrowUp className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </section>

      <p className="mt-auto flex justify-center gap-5 pt-12 text-[0.85rem] text-lp-muted">
        <Link href={privacyHref(c.market)} className="hover:text-lp-ink">
          Privacy policy
        </Link>
        {c.consent && <CookieSettingsButton label={c.consent.settings} />}
      </p>
    </main>
  );
}
