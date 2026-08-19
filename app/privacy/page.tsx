import type { Metadata } from "next";
import { privacyCopy } from "@/content/profile";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the Altair Tolesh portfolio.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="page-hero shell">
        <p className="label">Privacy</p>
        <h1>{privacyCopy.heading}</h1>
        <p className="lede">{privacyCopy.updated}</p>
      </header>

      <section className="section-tight shell legal">
        {privacyCopy.sections.map((section) => (
          <div key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
