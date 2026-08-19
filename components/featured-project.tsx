import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectVisual } from "@/components/project-visual";
import { EvidenceRow } from "@/components/evidence-row";
import { ExternalLink } from "@/components/external-link";

/** The strongest project, given the weight to match. */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article
      className="featured"
      style={{ "--project-accent": project.accent } as React.CSSProperties}
      data-reveal
    >
      <div>
        <div className="featured-meta">
          <span className="project-index">{project.number}</span>
          <span className="status-badge">{project.status}</span>
          <span className="project-index">
            {project.type} · {project.year}
          </span>
        </div>

        <h3>{project.name}</h3>
        <p className="featured-tagline">{project.tagline}</p>
        <p className="featured-summary">{project.summary}</p>

        <EvidenceRow
          evidence={project.evidence}
          label={`${project.name} evidence`}
        />

        <div className="featured-actions">
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

      <ProjectVisual variant={project.slug} />
    </article>
  );
}
