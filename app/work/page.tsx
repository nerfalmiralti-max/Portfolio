import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Commercial, hospitality, and hackathon website projects by Altair Tolesh.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="page-shell projects-page">
      <header className="page-hero projects-hero" data-motion="page-title">
        <div>
          <span className="overline">Work</span>
          <h1>Projects I have worked on</h1>
        </div>
        <p>
          One project was made for a paying client, one for a lounge bar, and
          one started during a hackathon. Each case study explains what I built,
          what went wrong, and what I learned.
        </p>
      </header>
      <section className="projects-directory" aria-label="Project directory">
        <div className="work-trajectory" aria-hidden="true"><i /></div>
        {projects.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </section>
    </div>
  );
}
