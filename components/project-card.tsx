import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/site";
import { ProjectVisual } from "@/components/project-visual";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`project-card project-card-${project.slug}`}
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <div className="project-card-copy">
        <div className="project-card-top">
          <span className="project-number">{project.number}</span>
          <span className="status-badge">{project.status}</span>
        </div>
        <p className="overline">
          {project.type} · {project.year}
        </p>
        <h3>{project.name}</h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-role">{project.role}</p>
        <div className="tech-list" aria-label="Technology">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-actions">
          <Link href={project.caseStudyUrl} className="text-link">
            View case study <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              className="text-link muted-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open live website <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          ) : null}
        </div>
      </div>
      <ProjectVisual variant={project.slug} />
    </article>
  );
}
