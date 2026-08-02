"use client";

import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { useState } from "react";
import { ProjectVisual } from "@/components/project-visual";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/content/site";

export function SelectedWorkStage() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <section className="section selected-work" id="selected-work">
      <SectionHeading
        eyebrow="01 / Selected work"
        title="Three projects. Three different product problems."
        body="Each project required a different balance of business goals, user experience, visual direction, and technical implementation."
      />

      <div
        className="work-stage"
        style={{ "--project-accent": project.accent } as React.CSSProperties}
      >
        <div className="work-tabs" role="tablist" aria-label="Selected projects">
          {projects.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="active-project-panel"
              onClick={() => setActive(index)}
              className={active === index ? "is-active" : ""}
            >
              <span>{item.number}</span>
              <strong>{item.name}</strong>
              <small>{item.type}</small>
            </button>
          ))}
        </div>

        <div id="active-project-panel" className="work-panel" role="tabpanel">
          <div className="work-panel-copy" key={`${project.slug}-copy`}>
            <div className="work-panel-meta">
              <span className="status-badge">{project.status}</span>
              <span className="overline">{project.year}</span>
            </div>
            <p className="overline">{project.type}</p>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <dl>
              <div>
                <dt>Main role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Technology</dt>
                <dd>{project.technologies.join(" · ")}</dd>
              </div>
            </dl>
            <div className="project-actions">
              <Link href={project.caseStudyUrl} className="button button-primary">
                View case study <ArrowUpRight size={16} />
              </Link>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  className="button button-quiet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open live website <ArrowUpRight size={16} />
                </a>
              ) : null}
            </div>
          </div>
          <div className="work-panel-visual" key={`${project.slug}-visual`}>
            <ProjectVisual variant={project.slug} />
          </div>
        </div>
      </div>

      <div className="work-mobile-stack">
        {projects.map((item) => (
          <article
            className="mobile-project"
            style={{ "--project-accent": item.accent } as React.CSSProperties}
            key={item.slug}
          >
            <ProjectVisual variant={item.slug} />
            <div className="mobile-project-copy">
              <div>
                <span className="project-number">{item.number}</span>
                <span className="status-badge">{item.status}</span>
              </div>
              <p className="overline">{item.type}</p>
              <h3>{item.name}</h3>
              <p>{item.summary}</p>
              <dl>
                <div>
                  <dt>Main role</dt>
                  <dd>{item.role}</dd>
                </div>
                <div>
                  <dt>Technology</dt>
                  <dd>{item.technologies.join(" · ")}</dd>
                </div>
              </dl>
              <div className="project-actions">
                <Link href={item.caseStudyUrl} className="text-link">
                  Case study <ArrowUpRight size={16} />
                </Link>
                {item.liveUrl ? (
                  <a href={item.liveUrl} className="text-link muted-link" target="_blank" rel="noopener noreferrer">
                    Live site <ArrowUpRight size={16} />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Link className="text-link section-link" href="/projects">
        View the complete project index <MoveRight size={18} />
      </Link>
    </section>
  );
}
