import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/ui/contact-form";
import { contactCopy, profile } from "@/content/profile";

export const metadata: Metadata = { title: "Contact", description: "Send Altair Tolesh the details of a website project or another relevant enquiry.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <div className="page-shell contact-page">
      <header className="page-hero contact-hero">
        <div>
          <span className="overline">Contact · Aktau · UTC+5</span>
          <h1>{contactCopy.heading}</h1>
        </div>
        <p>{contactCopy.body}</p>
      </header>
      <section className="contact-layout">
        <aside>
          <span className="overline">What to include</span>
          <ul>
            <li>What the website is for</li>
            <li>Which pages you expect</li>
            <li>Any deadline or technical requirement</li>
            <li>Examples that explain the direction</li>
          </ul>
          <div className="contact-direct-actions">
            {profile.email ? (
              <a href={`mailto:${profile.email}`} className="text-link">
                Email <ArrowUpRight size={15} />
              </a>
            ) : null}
            {profile.github ? (
              <a href={profile.github} className="text-link" target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight size={15} />
              </a>
            ) : null}
          </div>
          <div className="minor-note">
            <strong>Before you send</strong>
            <p>
              Share only the information needed to explain the enquiry. Do not
              include private addresses, schedules, or phone numbers.
            </p>
          </div>
        </aside>
        <ContactForm />
      </section>
    </div>
  );
}
