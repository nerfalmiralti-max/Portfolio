import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/contact-form";
import { ExternalLink } from "@/components/external-link";
import { contactCopy, profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send Altair Tolesh the details of a website project: what it is for, the pages you expect, and any examples that explain the direction.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <header className="contact-hero shell">
        <p className="label">{contactCopy.eyebrow}</p>

        {/* Authored line breaks: the question is a graphic object here, not a
            paragraph that happens to end in a question mark. */}
        <h1
          className="question"
          aria-label={contactCopy.questionLines.join(" ")}
          style={
            {
              "--question-chars": Math.max(
                ...contactCopy.questionLines.map((line) => line.length),
              ),
            } as React.CSSProperties
          }
        >
          {contactCopy.questionLines.map((line) => (
            <span className="question-line" key={line} aria-hidden="true">
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <p className="lede">{contactCopy.body}</p>
      </header>

      <section className="section-tight shell">
        <div className="contact-layout">
          <aside className="contact-aside" data-reveal>
            <p className="label">What to include</p>
            <ul>
              <li>What the website is for</li>
              <li>Which pages you expect</li>
              <li>Any deadline or technical requirement</li>
              <li>Examples that explain the direction</li>
            </ul>

            <div className="contact-direct">
              {profile.email ? (
                <a href={`mailto:${profile.email}`} className="text-link">
                  Email
                </a>
              ) : null}
              <ExternalLink href={profile.github}>GitHub</ExternalLink>
            </div>

            <div className="contact-note">
              <strong>Before you send</strong>
              <p>
                Share only what explains the enquiry. Please leave out private
                addresses, schedules, and phone numbers.
              </p>
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
