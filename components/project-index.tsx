"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { SystemDiagram, SystemSteps } from "@/components/system-diagram";
import { isModifiedClick, useTransitionRouter } from "@/lib/view-transition";

/**
 * The work index. Three lines of type, one system drawing, and a single
 * active project shared between them.
 *
 * On a pointer device the drawing lives beside the list and rearranges as the
 * pointer moves between rows: same node slots, new positions, so the three
 * projects read as one system being reconfigured. On touch there is no hover
 * to read, so each row carries its own written version of the same system and
 * activates when it reaches the middle of the screen.
 */
export function ProjectIndex({
  projects,
  eyebrow,
  heading,
  body,
}: {
  projects: readonly Project[];
  eyebrow: string;
  heading: string;
  body?: string;
}) {
  const [active, setActive] = useState(0);
  const [compact, setCompact] = useState(false);
  const rows = useRef<(HTMLAnchorElement | null)[]>([]);
  const names = useRef<(HTMLSpanElement | null)[]>([]);
  const navigate = useTransitionRouter();

  // Which input model is in play. Read after mount so the server and the
  // first client render agree.
  useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const query = matchMedia("(max-width: 1099px), (pointer: coarse)");
    const sync = () => setCompact(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Touch and narrow layouts: the row nearest the middle of the viewport wins.
  useEffect(() => {
    if (!compact) return;
    if (typeof IntersectionObserver !== "function") return;

    const elements = rows.current.filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = elements.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [compact, projects.length]);

  const activate = (index: number) => {
    if (compact) return;
    setActive(index);
  };

  const open = (event: React.MouseEvent, index: number, href: string) => {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    // The title the reader clicked is the title that flies to the cover.
    names.current[index]?.style.setProperty(
      "view-transition-name",
      "project-name",
    );
    navigate(href);
  };

  const systems = projects.map((project) => project.system);
  const accent = projects[active]?.accent;

  return (
    <section className="index-section" id="index">
      <div className="shell">
        <header className="index-head">
          <p className="label">{eyebrow}</p>
          <h2>{heading}</h2>
          {body ? <p className="index-head-body">{body}</p> : null}
        </header>

        <div
          className="index-grid"
          style={{ "--project-accent": accent } as React.CSSProperties}
        >
          <ol className="index-rows">
            {projects.map((project, index) => (
              <li
                key={project.slug}
                data-active={active === index ? "true" : "false"}
              >
                <Link
                  href={project.caseStudyUrl}
                  className="index-row"
                  ref={(node) => {
                    rows.current[index] = node;
                  }}
                  data-active={active === index ? "true" : "false"}
                  style={
                    { "--project-accent": project.accent } as React.CSSProperties
                  }
                  onPointerEnter={() => activate(index)}
                  onFocus={() => activate(index)}
                  onClick={(event) =>
                    open(event, index, project.caseStudyUrl)
                  }
                >
                  <span className="row-index" aria-hidden="true">
                    {project.number}
                  </span>

                  <span className="row-body">
                    <span
                      className="row-name"
                      ref={(node) => {
                        names.current[index] = node;
                      }}
                    >
                      {project.indexName}
                    </span>
                    <span className="row-meta">
                      <span className="row-meta-inner">
                        {project.type} · {project.year} · {project.status}
                      </span>
                      {/* Aria-hidden and duplicative of the link itself, so
                          clipping it until the row is active hides nothing a
                          reader needs. */}
                      <span className="row-cue" aria-hidden="true">
                        Case study
                      </span>
                    </span>
                  </span>

                  <span className="row-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path
                        d="M5 19 19 5M8 5h11v11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>

                  <span className="row-trace" aria-hidden="true" />
                </Link>

                {/* Touch and no-JS get the system in words, under its row. */}
                <div className="row-system" aria-hidden="true">
                  <SystemSteps system={project.system} />
                </div>
              </li>
            ))}
          </ol>

          <aside className="index-panel" aria-hidden={compact ? "true" : undefined}>
            <SystemDiagram systems={systems} active={active} />
          </aside>
        </div>
      </div>
    </section>
  );
}
