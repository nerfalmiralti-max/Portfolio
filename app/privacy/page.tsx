import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy", description: "Privacy information for the Altair Tolesh portfolio.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <div className="page-shell legal-page"><header><span className="overline">Privacy / Plain language</span><h1>A small site with a small data footprint.</h1><p>Last updated: August 2026</p></header><section><h2>What this site collects</h2><p>The portfolio does not require an account and does not intentionally collect sensitive personal information. If analytics are added later, this page should be updated before they are enabled.</p><h2>Contact messages</h2><p>The contact form validates information in your browser. When a public email address is configured, it opens your own email application; otherwise, it offers a local copy of your draft. The site does not silently store the message.</p><h2>Local preferences</h2><p>Language and color-theme preferences are stored on your device using browser storage. They are used only to remember how you prefer to view the site.</p><h2>Safety</h2><p>Because this portfolio belongs to a minor, please do not request or share private addresses, schedules, phone numbers, family information, or other unnecessary personal details.</p><h2>Questions</h2><p>A public contact address can be added in the central site configuration. Until then, no private address is exposed as a placeholder.</p></section></div>
  );
}
