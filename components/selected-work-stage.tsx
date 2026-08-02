import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { SectionHeading } from "@/components/section-heading";
import { homepageCopy } from "@/content/profile";
import { projects } from "@/content/projects";

export function SelectedWorkStage() {
  return (
    <section className="section selected-work">
      <SectionHeading
        eyebrow="01 / Work"
        title={homepageCopy.workHeading}
        body={homepageCopy.workBody}
      />
      <div className="selected-work-list">
        {projects.map((item) => (
          <article
            className="selected-work-preview"
            style={{ "--project-accent": item.accent } as React.CSSProperties}
            data-motion={`preview-${item.slug}`}
            key={item.slug}
          >
            <ProjectVisual variant={item.slug} />
            <div className="selected-work-preview-copy">
              <div>
                <span className="project-number">{item.number}</span>
                <span className="status-badge">{item.status}</span>
              </div>
              <p className="overline">{item.type}</p>
              <h3>{item.name}</h3>
              <p>{item.shortDescription}</p>
              <p>{item.homepageDescription}</p>
              <p className="project-role">
                <strong>My work:</strong> {item.role.join(", ")}.
              </p>
              <div className="project-actions">
                <Link href={item.caseStudyUrl} className="text-link">
                  View case study <ArrowUpRight size={16} />
                </Link>
                {item.liveUrl ? (
                  <a href={item.liveUrl} className="text-link muted-link" target="_blank" rel="noopener noreferrer">
                    {item.liveLabel} <ArrowUpRight size={16} />
                  </a>
                ) : null}
                {item.repositoryUrl ? (
                  <a href={item.repositoryUrl} className="text-link muted-link" target="_blank" rel="noopener noreferrer">
                    View code <ArrowUpRight size={16} />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Link className="text-link section-link" href="/work">
        View all work <MoveRight size={18} />
      </Link>
    </section>
  );
}
