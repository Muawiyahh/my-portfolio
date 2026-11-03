"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LP_ROUTES } from "@/lib/lp/routes";

const linkClass = "inline-flex min-h-11 items-center gap-1.5 font-semibold text-lp-accent";

/**
 * Top link on the privacy page. Visitors from a lead page go straight back to it (no detour to the
 * portfolio); anyone else goes to the homepage.
 */
export default function PrivacyBackLink() {
  const from = useSearchParams().get("from");
  const back = from === "us" || from === "uk" ? LP_ROUTES[from] : null;
  return (
    <Link href={back ?? "/"} className={linkClass}>
      <ArrowLeft className="h-4 w-4" aria-hidden /> {back ? "Back" : "muawiyahalthaf.com"}
    </Link>
  );
}

/** Same size, nothing clickable: shown for the instant before the link knows where to point. */
export function PrivacyBackLinkPlaceholder() {
  return <span className={`${linkClass} invisible`} aria-hidden>Back</span>;
}
