import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muawiyah.up.railway.app"),
  title: "Muawiyah Althaf — Full-Stack Developer",
  description:
    "Full-stack developer building automations, Chrome extensions, web apps, and AI-powered tools — from idea to live deployment.",
  openGraph: {
    title: "Muawiyah Althaf — Full-Stack Developer",
    description:
      "Automations, Chrome extensions, web apps & AI tools — from idea to live deployment.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Muawiyah Althaf — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muawiyah Althaf — Full-Stack Developer",
    description: "Automations, Chrome extensions, web apps & AI tools.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-cream text-ink antialiased font-sans selection:bg-accent selection:text-cream">
        {children}
      </body>
    </html>
  );
}
