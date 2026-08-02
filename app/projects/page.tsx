import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Three case studies by Altair Tolesh: a commercial booking system, a hospitality website, and a tourism product prototype.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="page-shell projects-page">
      <header className="page-hero projects-hero">
        <div>
          <span className="overline">Portfolio / Selected work</span>
          <h1>
            Three products.<br />
            <em>Three different constraints.</em>
          </h1>
        </div>
        <p>
          The projects below move from a commercial booking workflow to a
          hospitality website and a regional travel prototype. Each case study
          separates the problem, my contribution, the implementation, and the
          result.
        </p>
      </header>
      <section className="projects-directory" aria-label="Project directory">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </section>
    </div>
  );
}
