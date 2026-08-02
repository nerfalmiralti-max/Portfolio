import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { processSteps, skillGroups } from "@/content/process";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Altair Tolesh plans, designs, builds, tests, and publishes websites.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <div className="page-shell process-page">
      <header className="page-hero process-hero">
        <div>
          <span className="overline">Process</span>
          <h1>How I work on a website</h1>
        </div>
        <p>
          The steps change with the project. I still use the same order to keep
          the pages, user actions, technical work, and handover connected.
        </p>
      </header>

      <section className="process-example">
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

      <ol className="process-directory">
        {processSteps.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <div>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="skills-directory">
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
