import MetaPixel from "@/components/lp/MetaPixel";

export default function LeadPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lp-root min-h-dvh bg-lp-paper font-sans text-lp-ink antialiased selection:bg-lp-accent selection:text-white">
      {children}
      <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
    </div>
  );
}
