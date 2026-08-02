"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/site";
import { ProjectVisual } from "@/components/project-visual";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const move = (event: React.PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--card-x", `${((event.clientX - rect.left) / rect.width - .5) * 8}deg`);
    event.currentTarget.style.setProperty("--card-y", `${((event.clientY - rect.top) / rect.height - .5) * -8}deg`);
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  };
  const leave = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--card-x", "0deg");
    event.currentTarget.style.setProperty("--card-y", "0deg");
  };
  const label = project.slug === "99-aktau" ? "BOOK" : project.slug === "mangystau-trials" ? "ROUTE" : "EXPLORE";
  return (
    <article data-cursor={label} onPointerMove={move} onPointerLeave={leave} className={`project-card project-card-${project.slug} ${featured ? "featured" : ""}`} style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className="project-card-copy">
        <div className="project-card-top"><span className="project-number">{project.number}</span><span className="status-badge">{project.status}</span></div>
        <p className="overline">{project.type} · {project.year}</p>
        <h3>{project.name}</h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-role">{project.role}</p>
        <div className="tech-list">{project.technologies.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}</div>
        <Link href={`/projects/${project.slug}`} className="text-link" data-route-accent={project.accent} data-transition-label={project.name}>View case study <ArrowUpRight aria-hidden="true" size={17} /></Link>
      </div>
      <ProjectVisual variant={project.slug} />
    </article>
  );
}
