import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Start a thoughtful conversation with Altair Tolesh about a project, collaboration, mentorship, or educational opportunity.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <div className="page-shell contact-page">
      <header className="page-hero contact-hero">
        <div>
          <span className="overline">Contact / Aktau · UTC+5</span>
          <h1>
            Have a project that needs a clear structure and a
            <em> reliable build?</em>
          </h1>
        </div>
        <p>
          I am open to selected websites, product collaborations, educational
          opportunities, and useful feedback.
        </p>
      </header>
      <section className="contact-layout">
        <aside>
          <span className="overline">Good reasons to write</span>
          <ul>
            <li>Website project</li>
            <li>Product collaboration</li>
            <li>Educational opportunity</li>
            <li>Constructive feedback</li>
          </ul>
          <div className="minor-note">
            <strong>Privacy note</strong>
            <p>
              This portfolio belongs to a minor. No phone number, exact address,
              private schedule, or live location is published here.
            </p>
          </div>
        </aside>
        <ContactForm />
      </section>
    </div>
  );
}
