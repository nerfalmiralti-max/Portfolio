import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { experiments, projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Commercial work, product prototypes, and ongoing experiments by Altair Tolesh.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="page-shell">
      <header className="page-hero projects-hero">
        <div><span className="overline">Portfolio / Work</span><h1>Products,<br /> <em>not just concepts.</em></h1></div>
        <p>One shipped commercial system, one regional prototype born under pressure, and one evolving product thesis. Different outcomes; the same habit of making ideas testable.</p>
      </header>
      <section className="projects-directory">
        {projects.map((project, index) => <ProjectCard project={project} featured={index === 0} key={project.slug} />)}
      </section>
      <section className="section experiments-page">
        <SectionHeading eyebrow="Smaller studies" title="Experiments stay honest." body="These explorations are useful, but they are not presented as finished products." />
        <div className="experiment-cards">{experiments.map((experiment, index) => <article key={experiment}><span>{String(index + 1).padStart(2, "0")}</span><h3>{experiment}</h3><p>Interface and product exploration</p></article>)}</div>
      </section>
    </div>
  );
}
