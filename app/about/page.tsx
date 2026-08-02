import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutCopy, profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Altair Tolesh, a student and web developer from Aktau.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="page-shell about-page">
      <header className="page-hero about-hero">
        <div>
          <span className="overline">About</span>
          <h1>{aboutCopy.heading}</h1>
        </div>
        <div>
          {aboutCopy.opening.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </header>

      <section className="about-coordinate" aria-label="Aktau coordinates">
        <div className="about-coordinate-mark" aria-hidden="true">
          <span>A</span>
          <span>T</span>
        </div>
        <div>
          <span className="overline">Based in</span>
          <strong>{profile.coordinates}</strong>
          <p>Aktau, on the Caspian coast of Kazakhstan.</p>
        </div>
      </section>

      <section className="about-story">
        <aside className="story-aside">
          <span className="overline">At a glance</span>
          <dl>
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Learning at</dt>
              <dd>{profile.school}</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>Kazakh · Russian · English</dd>
            </div>
            <div>
              <dt>Current focus</dt>
              <dd>Web design, frontend development, and stronger English</dd>
            </div>
          </dl>
        </aside>
        <div className="story-copy">
          <p>{aboutCopy.projects}</p>
          <p>
            Read the <Link href="/work/99-aktau">99 AKTAU case study</Link>, the{" "}
            <Link href="/work/tuesday-lounge-bar">Tuesday Lounge Bar case study</Link>, or the{" "}
            <Link href="/work/mangystau-trials">Mangystau Trials case study</Link> for the project details.
          </p>
          <p>{aboutCopy.education}</p>
        </div>
      </section>

      <section className="judo-story">
        <div>
          <span className="overline">Judo</span>
          <h2>Judo is part of how I learn.</h2>
        </div>
        <div>
          <p>{aboutCopy.judo}</p>
        </div>
      </section>

      <section className="academic-direction">
        <span className="overline">Current direction</span>
        <h2>{aboutCopy.closing}</h2>
        <Link href="/journey" className="text-link">
          View my journey <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
