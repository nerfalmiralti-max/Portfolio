import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Manifesto } from "@/components/manifesto";
import { ContactBlock } from "@/components/contact-block";
import { aboutCopy } from "@/content/profile";
import { skillGroups } from "@/content/process";
import { lessons } from "@/content/journey";

export const metadata: Metadata = {
  title: "About",
  description:
    "Altair Tolesh is a student developer who takes a website end to end: interface, frontend, data, and deployment. How he works, and what each project corrected.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <header className="page-hero shell">
        <p className="label">{aboutCopy.eyebrow}</p>
        <h1 className="page-title">
          <span>I build the whole website,</span>
          <span>not a slice of it.</span>
        </h1>
        <p className="lede">{aboutCopy.lede}</p>
      </header>

      <section className="section-tight shell">
        <Manifesto />
      </section>

      <section className="section section-ruled">
        <div className="shell split" data-reveal>
          <p className="label">Where it came from</p>
          <div className="prose">
            {aboutCopy.opening.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>{aboutCopy.projects}</p>
            <p>
              The details are in the{" "}
              <Link href="/work/99-aktau">99 AKTAU</Link>,{" "}
              <Link href="/work/tuesday-lounge-bar">Tuesday Lounge Bar</Link>, and{" "}
              <Link href="/work/mangystau-trials">Mangystau Trials</Link> case
              studies.
            </p>
            <p>{aboutCopy.closing}</p>
          </div>
        </div>
      </section>

      <section className="section section-ruled" id="lessons">
        <div className="shell">
          <header className="index-head" data-reveal>
            <p className="label">Corrections</p>
            <h2>What each project changed</h2>
            <p className="index-head-body">
              In order, including the hackathon that did not reach the final.
            </p>
          </header>

          <ol className="corrections">
            {lessons.map((entry) => (
              <li key={entry.title} data-reveal>
                <p className="label">{entry.period}</p>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.story}</p>
                  <p className="correction-takeaway">{entry.lesson}</p>
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

      <section className="section section-ruled" id="tools">
        <div className="shell">
          <header className="index-head" data-reveal>
            <p className="label">Tools</p>
            <h2>What I currently build with</h2>
          </header>
          <div className="tool-ledger" data-reveal-stagger>
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="label">{group.title}</h3>
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

      <ContactBlock />
    </>
  );
}
