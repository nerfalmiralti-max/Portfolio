import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homepageProcessSteps, skillGroups } from "@/content/process";

const processExamples = [
  "99 AKTAU: define the guest and admin needs.",
  "Tuesday: place practical mobile information first.",
  "Mangystau Trials: reduce the MVP to one route flow.",
  "Build shared components and project-specific states.",
  "Test booking errors, navigation, and responsive layouts.",
  "Publish, document settings, and prepare handover.",
] as const;

const processTitles = ["Understand", "Structure", "Design", "Build", "Test", "Deliver"] as const;

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Altair Tolesh plans, designs, builds, tests, and publishes websites.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <div className="page-shell process-page">
      <header className="page-hero process-hero" data-motion="process-signature">
        <div>
          <span className="overline">Process</span>
          <h1>How I work on a website</h1>
        </div>
        <p>
          The steps change with the project. I still use the same order to keep
          the pages, user actions, technical work, and handover connected.
        </p>
      </header>

      <section className="process-example" data-motion="section-wipe">
        <span className="overline">Example from 99 AKTAU</span>
        <p>
          The booking request had to work for both the guest and the
          administrator. This affected the form, database structure,
          authentication, status system, and error states.
        </p>
        <Link href="/work/99-aktau" className="text-link">
          Read the case study <ArrowRight size={16} />
        </Link>
      </section>

      <ol className="process-directory process-path" data-motion="process-path">
        {homepageProcessSteps.map((step, index) => (
          <li key={step.number} data-motion="process-step" tabIndex={0}>
            <span>{step.number}</span>
            <div>
              <h2>{processTitles[index]}</h2>
              <p>{step.body}</p>
              <small>{processExamples[index]}</small>
            </div>
          </li>
        ))}
      </ol>

      <section className="skills-directory" data-motion="section-wipe">
        <header>
          <span className="overline">Skills</span>
          <h2>What I currently work with</h2>
        </header>
        <div>
          {skillGroups.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
