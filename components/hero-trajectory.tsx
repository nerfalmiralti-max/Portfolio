"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

export function HeroTrajectory() {
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--mx", x.toFixed(3));
    event.currentTarget.style.setProperty("--my", y.toFixed(3));
  };

  const reset = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--mx", "0");
    event.currentTarget.style.setProperty("--my", "0");
  };

  return (
    <div
      className="trajectory-board"
      aria-label="Project trajectory"
      data-motion="home-trajectory"
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div className="trajectory-meta">
        <span>{profile.coordinates}</span>
        <span>AKTAU / UTC+5</span>
      </div>
      <div className="trajectory-monogram" aria-hidden="true">
        <span>A</span>
        <span>T</span>
      </div>
      <svg className="trajectory-line" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
        <path className="trajectory-line-base" d="M1 18 C27 4 50 24 99 5" />
        <path className="trajectory-line-active" d="M1 18 C27 4 50 24 99 5" />
      </svg>
      <div className="trajectory-projects">
        {projects.map((project) => (
          <Link
            href={project.caseStudyUrl}
            className={`trajectory-marker marker-${project.number}`}
            style={{ "--marker-accent": project.accent } as React.CSSProperties}
            data-cursor="VIEW"
            key={project.slug}
          >
            <span>{project.number}</span>
            <strong>{project.name}</strong>
            <small>{project.status}</small>
            <i className="marker-preview" aria-hidden="true">
              {project.slug === "99-aktau" ? "BOOK" : project.slug === "tuesday-lounge-bar" ? "MENU" : "ROUTE"}
            </i>
            <ArrowUpRight size={14} />
          </Link>
        ))}
      </div>
      <p className="trajectory-caption">
        Structure <i /> Design <i /> Frontend <i /> Services <i /> Deployment
      </p>
    </div>
  );
}
