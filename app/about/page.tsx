import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ContactBlock } from "@/components/contact-block";
import { aboutCopy, profile } from "@/content/profile";
import { processSteps, skillGroups } from "@/content/process";
import { lessons } from "@/content/journey";

export const metadata: Metadata = {
  title: "About",
  description:
    "Altair Tolesh is a student and web developer in Aktau, Kazakhstan. How he works, what each project taught him, and what he currently builds with.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <header className="page-hero shell">
        <p className="label">About</p>
        <h1>{aboutCopy.heading}</h1>
        <div className="prose about-intro">
          {aboutCopy.opening.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl className="about-facts">
          <div>
            <dt>Based in</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Studying at</dt>
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
      </header>

      <section className="section section-ruled">
        <div className="shell split" data-reveal>
          <p className="label">Projects</p>
          <div className="prose">
            <p>{aboutCopy.projects}</p>
            <p>
              The details are in the{" "}
              <Link href="/work/99-aktau">99 AKTAU</Link>,{" "}
              <Link href="/work/tuesday-lounge-bar">Tuesday Lounge Bar</Link>, and{" "}
              <Link href="/work/mangystau-trials">Mangystau Trials</Link> case
              studies.
            </p>
            <p>{aboutCopy.education}</p>
          </div>
        </div>
      </section>

      <section className="section section-ruled" id="process">
        <div className="shell">
          <SectionHeading
            eyebrow="Process"
            title="How I work on a website"
            body="The steps change with the project. The order does not. Each one below carries a real example."
          />
          <ol className="process-list" data-reveal>
            {processSteps.map((step) => (
              <li key={step.number}>
                <p className="label">{step.number}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <p className="process-example">{step.example}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-ruled" id="lessons">
        <div className="shell">
          <SectionHeading
            eyebrow="What I learned"
            title="Each project taught me something the previous one did not"
            body="Including the hackathon that did not reach the final."
          />
          <ol className="lesson-list">
            {lessons.map((entry) => (
              <li className="lesson" key={entry.title} data-reveal>
                <p className="label">{entry.period}</p>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.story}</p>
                  <p className="lesson-takeaway">{entry.lesson}</p>
                  {entry.relatedHref ? (
                    <Link href={entry.relatedHref} className="text-link">
                      {entry.relatedLabel}{" "}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-ruled">
        <div className="shell">
          <SectionHeading
            eyebrow="Tools"
            title="What I currently build with"
            body="Grouped by what it is for. The projects show how much of each I have actually used."
          />
          <div className="skill-groups" data-reveal>
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ruled">
        <div className="shell split" data-reveal>
          <p className="label">Outside development</p>
          <div className="prose">
            <p>{aboutCopy.judo}</p>
            <p>{aboutCopy.closing}</p>
          </div>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
