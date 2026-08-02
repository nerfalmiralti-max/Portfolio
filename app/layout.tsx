import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExperienceLayer } from "@/components/experience-layer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument-serif", subsets: ["latin"], weight: "400" });

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host") || "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  return {
    metadataBase: base,
    title: { default: "Altair Tolesh — Product Builder and Developer", template: "%s — Altair Tolesh" },
    description: "Portfolio of Altair Tolesh, a student and product builder from Aktau creating thoughtful digital products, commercial websites, and technology experiments.",
    openGraph: { title: "Altair Tolesh — Ideas into working products", description: "Student, developer, product builder, and athlete from Aktau, Kazakhstan.", type: "website", images: [{ url: new URL("/og-motion.png", base).toString(), width: 1731, height: 909, alt: "Altair Tolesh — turning ambitious ideas into working digital products" }] },
    twitter: { card: "summary_large_image", title: "Altair Tolesh — Product Builder", description: "Turning ambitious ideas into working digital products.", images: [new URL("/og-motion.png", base).toString()] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = { "@context": "https://schema.org", "@type": "Person", name: "Altair Tolesh", homeLocation: { "@type": "Place", name: "Aktau, Kazakhstan" }, knowsAbout: ["Product design", "Web development", "Artificial intelligence", "Entrepreneurship"] };
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}>
        <LanguageProvider>
          <ExperienceLayer />
          <a className="skip-link" href="#main-content">Skip to content</a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </LanguageProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
