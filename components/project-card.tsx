import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectShot } from "@/components/project-shot";
import { EvidenceRow } from "@/components/evidence-row";
import { ExternalLink } from "@/components/external-link";

/**
 * A project at normal weight. The featured project uses `FeaturedProject`
 * instead, so the two never compete for the same visual rank.
 */
export function ProjectCard({
  project,
  showStack = false,
}: {
  project: Project;
  showStack?: boolean;
}) {
  return (
    <article
      className="project-row"
      style={{ "--project-accent": project.accent } as React.CSSProperties}
      data-reveal
    >
      <div className="project-row-copy">
        <div className="featured-meta">
          <span className="project-index">{project.number}</span>
          <span className="status-badge">{project.status}</span>
          <span className="project-index">
            {project.type} · {project.year}
          </span>
        </div>

        <h3>{project.name}</h3>
        <p className="project-row-tagline">{project.tagline}</p>
        <p className="project-row-role">
          <strong>My role:</strong> {project.role.join(", ")}.
        </p>

        <EvidenceRow
          evidence={project.evidence}
          label={`${project.name} evidence`}
        />

        {showStack ? (
          <ul className="stack-list" aria-label={`${project.name} stack`}>
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        ) : null}

        <div className="project-actions">
          <Link href={project.caseStudyUrl} className="text-link">
            Read the case study <ArrowRight size={15} aria-hidden="true" />
          </Link>
          {project.liveUrl ? (
            <ExternalLink href={project.liveUrl} className="text-link text-link-quiet">
              {project.liveLabel}
            </ExternalLink>
          ) : null}
          {project.repositoryUrl ? (
            <ExternalLink
              href={project.repositoryUrl}
              className="text-link text-link-quiet"
            >
              Source
            </ExternalLink>
          ) : null}
        </div>
      </div>

      <ProjectShot project={project} />
    </article>
  );
}
