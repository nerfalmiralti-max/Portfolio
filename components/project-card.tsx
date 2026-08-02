import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/site";
import { ProjectVisual } from "@/components/project-visual";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? "featured" : ""}`} style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className="project-card-copy">
        <div className="project-card-top"><span className="project-number">{project.number}</span><span className="status-badge">{project.status}</span></div>
        <p className="overline">{project.type} · {project.year}</p>
        <h3>{project.name}</h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-role">{project.role}</p>
        <div className="tech-list">{project.technologies.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}</div>
        <Link href={`/projects/${project.slug}`} className="text-link">View case study <ArrowUpRight aria-hidden="true" size={17} /></Link>
      </div>
      <ProjectVisual variant={project.slug} />
    </article>
  );
}
