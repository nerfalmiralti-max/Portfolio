import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Start a thoughtful conversation with Altair Tolesh about a project, collaboration, mentorship, or educational opportunity.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <div className="page-shell contact-page">
      <header className="page-hero contact-hero"><div><span className="overline">Contact / Aktau · UTC+5</span><h1>Have an idea worth <em>building?</em></h1></div><p>I am open to thoughtful collaborations, small commercial projects, educational opportunities, mentorship, and conversations with people creating useful things.</p></header>
      <section className="contact-layout"><aside><span className="overline">Good reasons to write</span><ul><li>Commercial project</li><li>Collaboration</li><li>Education opportunity</li><li>Constructive feedback</li><li>General conversation</li></ul><div className="minor-note"><strong>Privacy note</strong><p>This portfolio belongs to a minor. No phone number, exact address, private schedule, or live location is published here.</p></div></aside><ContactForm /></section>
    </div>
  );
}
