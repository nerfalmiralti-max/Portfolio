import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { journey } from "@/content/site";

export const metadata: Metadata = { title: "Journey", description: "An honest timeline of building, learning, competing, training, and future direction.", alternates: { canonical: "/journey" } };

export default function JourneyPage() {
  return (
    <div className="page-shell journey-page">
      <header className="page-hero journey-hero"><div><span className="overline">Journey / Timeline</span><h1>A trajectory measured in <em>things attempted.</em></h1></div><p>The dates are deliberately broad where they are not confirmed. What matters here is the sequence: learn, build, meet reality, adjust.</p></header>
      <section className="journey-timeline">
        <div className="timeline-key">{["Build", "Learn", "Compete", "Train", "Future"].map((item) => <span key={item}><i className={`marker-${item.toLowerCase()}`} />{item}</span>)}</div>
        <div className="journey-list">{journey.map((event, index) => <article key={event.title}><div className="journey-period"><span>{event.period}</span><small>{String(index + 1).padStart(2, "0")}</small></div><i className={`journey-dot marker-${event.category.toLowerCase()}`} /><div className="journey-entry"><p className="overline">{event.category}</p><h2>{event.title}</h2><p>{event.story}</p><blockquote><span>Lesson</span>{event.lesson}</blockquote>{event.title.includes("99") ? <Link href="/projects/99-aktau">Related case study <ArrowUpRight size={15} /></Link> : event.title.includes("Mangystau") ? <Link href="/projects/mangystau-trials">Related case study <ArrowUpRight size={15} /></Link> : event.title.includes("Kronos") ? <Link href="/projects/kronos">Related case study <ArrowUpRight size={15} /></Link> : null}</div></article>)}</div>
      </section>
    </div>
  );
}
