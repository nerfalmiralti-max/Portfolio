import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { FeaturedProject } from "@/components/featured-project";
import { SectionHeading } from "@/components/section-heading";
import { ContactBlock } from "@/components/contact-block";
import { featuredProject, supportingProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Three shipped websites by Altair Tolesh: a commercial booking site for a PlayStation club, a hospitality site, and a hackathon travel prototype. Each with a case study, a live link, and public source.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <header className="page-hero shell">
        <p className="label">Work</p>
        <h1>Three projects, three different reasons.</h1>
        <p className="lede">
          One was built for a paying client, one for a lounge bar, one started at
          a hackathon and did not place. Each case study covers what I built, the
          decisions behind it, and what went wrong.
        </p>
      </header>

      <section className="section-tight shell">
        <SectionHeading
          eyebrow="Start here"
          title="The one with a client, a database, and an admin area"
        />
        <FeaturedProject project={featuredProject} />
      </section>

      <section className="section shell">
        <SectionHeading
          eyebrow="Also shipped"
          title="A hospitality site and a hackathon prototype"
        />
        <div className="project-list">
          {supportingProjects.map((project) => (
            <ProjectCard project={project} key={project.slug} showStack />
          ))}
        </div>
      </section>

      <ContactBlock eyebrow="Next" />
    </>
  );
}
