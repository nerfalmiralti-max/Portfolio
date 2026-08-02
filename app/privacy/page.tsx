import type { Metadata } from "next";
import { privacyCopy } from "@/content/profile";

export const metadata: Metadata = { title: "Privacy", description: "Privacy information for the Altair Tolesh portfolio.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <div className="page-shell legal-page">
      <header>
        <span className="overline">Privacy</span>
        <h1>{privacyCopy.heading}</h1>
        <p>{privacyCopy.updated}</p>
      </header>
      <section>
        {privacyCopy.sections.map((section) => (
          <div key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
