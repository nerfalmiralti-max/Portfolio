import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./motion.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { profile } from "@/content/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Altair Tolesh — Web Designer and Developer";
const DESCRIPTION =
  "Altair Tolesh designs and builds websites that go into production. Commercial client work, a hospitality site, and a hackathon prototype — each deployed, with the source public.";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const host =
    headerList.get("x-forwarded-host") ||
    headerList.get("host") ||
    "localhost:3000";
  const protocol =
    headerList.get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");
  const base = new URL(configured || `${protocol}://${host}`);

  return {
    metadataBase: base,
    title: { default: TITLE, template: "%s — Altair Tolesh" },
    description: DESCRIPTION,
    applicationName: "Altair Tolesh Portfolio",
    authors: [{ name: profile.name, url: profile.github }],
    creator: profile.name,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      type: "website",
      locale: "en_US",
      siteName: profile.name,
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
    },
  };
}

/**
 * Runs before first paint so reveal animations never cause a flash of hidden
 * content. If scripting is off, the attribute is never set and every
 * `[data-reveal]` element simply renders visible.
 */
const MOTION_FLAG = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.motion="on"}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Web designer and developer",
    url: "/",
    sameAs: [profile.github],
    knowsAbout: [
      "Web design",
      "Frontend development",
      "Next.js",
      "TypeScript",
      "Supabase",
      "Responsive layout",
    ],
  };

  return (
    // `data-motion` is set on <html> by the script below, before React
    // hydrates. Suppression is scoped to this element's own attributes, which
    // is exactly the intended difference.
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <RevealOnScroll />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
