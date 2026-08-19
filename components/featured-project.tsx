import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectShot } from "@/components/project-shot";
import { ProjectVisual } from "@/components/project-visual";
import { EvidenceRow } from "@/components/evidence-row";
import { ExternalLink } from "@/components/external-link";

/**
 * The flagship. Deliberately not a card: the screenshot runs wide, the title
 * overlaps its top edge, and the register of facts sits outside the reading
 * rail. The schematic follows the product rather than standing in for it.
 */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article
      className="flagship"
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <div className="flagship-shot" data-reveal>
        <ProjectShot project={project} priority />
      </div>

      <header className="flagship-head">
        <p className="label flagship-index">
          <span>{project.number}</span>
          {project.type} · {project.year}
        </p>
        <h3>{project.name}</h3>
      </header>

      <div className="flagship-body">
        <p className="flagship-tagline">{project.tagline}</p>
        <p className="flagship-summary">{project.summary}</p>

        <div className="flagship-actions">
          <Link href={project.caseStudyUrl} className="button button-primary">
            Read the case study <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <ExternalLink href={project.liveUrl} className="button button-quiet" size={15}>
            {project.liveLabel}
          </ExternalLink>
          <ExternalLink
            href={project.repositoryUrl}
            className="button button-quiet"
            size={15}
          >
            Source
          </ExternalLink>
        </div>
      </div>

      <aside className="flagship-register" data-reveal-stagger>
        <p className="label">Verified</p>
        <EvidenceRow
          evidence={project.evidence}
          label={`${project.name} evidence`}
          variant="register"
        />
      </aside>

      <div className="flagship-schematic" data-reveal>
        <p className="label">Underneath</p>
        <ProjectVisual variant={project.slug} />
      </div>
    </article>
  );
}
