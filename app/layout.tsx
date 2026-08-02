import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "./motion.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MotionSystem } from "@/components/motion-system";

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
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host =
    headerList.get("x-forwarded-host") ||
    headerList.get("host") ||
    "localhost:3000";
  const protocol =
    headerList.get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const title = "Altair Tolesh — Web Designer and Developer";
  const description =
    "Altair Tolesh is a student from Aktau who designs, builds, and deploys websites.";

  return {
    metadataBase: base,
    title: { default: title, template: "%s — Altair Tolesh" },
    description,
    applicationName: "Altair Tolesh Portfolio",
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: new URL("/og.png", base).toString(),
          width: 1730,
          height: 909,
          alt: "Altair Tolesh web design and development portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/og.png", base).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Altair Tolesh",
    homeLocation: { "@type": "Place", name: "Aktau, Kazakhstan" },
    knowsAbout: [
      "Web design",
      "Responsive layout",
      "Web development",
      "Next.js",
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <MotionSystem />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
