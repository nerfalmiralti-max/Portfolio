"use client";

import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { ProjectVisual } from "@/components/project-visual";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/content/site";

export function SelectedWorkStage({ title }: { title: string }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number((visible.target as HTMLElement).dataset.projectIndex || 0);
      setActive(index);
    }, { rootMargin: "-36% 0px -42% 0px", threshold: [0, .25, .5, .75] });
    stepRefs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section selected-work selected-work-stage" id="selected-work" data-atmosphere={projects[active].slug}>
      <SectionHeading eyebrow="01 / Work" title={title} body="Three products, three motion languages, and three honest stages of development." />
      <div className="work-showcase" style={{ "--project-accent": projects[active].accent } as React.CSSProperties}>
        <div className="work-steps">
          {projects.map((project, index) => (
            <article className={`work-step ${active === index ? "is-active" : ""}`} data-project-index={index} ref={(node) => { stepRefs.current[index] = node; }} key={project.slug}>
              <div className="work-step-index"><span>{project.number}</span><i>{String(index + 1).padStart(2, "0")} / 03</i></div>
              <p className="overline">{project.type} · {project.year}</p>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="work-tech">{project.technologies.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}</div>
              <Link href={`/projects/${project.slug}`} data-cursor={project.slug === "99-aktau" ? "BOOK" : project.slug === "mangystau-trials" ? "ROUTE" : "EXPLORE"} data-route-accent={project.accent} data-transition-label={project.name}>Explore case study <ArrowUpRight size={17} /></Link>
            </article>
          ))}
        </div>
        <div className="work-visual-sticky" aria-live="polite">
          <div className="work-progress"><span>PROJECT</span><div>{projects.map((project, index) => <i className={active === index ? "active" : ""} key={project.slug} />)}</div><strong>{projects[active].number} / 03</strong></div>
          <div className="work-visual-layers">
            {projects.map((project, index) => <div className={`work-visual-layer ${active === index ? "is-active" : ""}`} key={project.slug}><ProjectVisual variant={project.slug} /></div>)}
          </div>
          <div className="work-visual-caption"><span>{projects[active].status}</span><p>{projects[active].message}</p></div>
        </div>
      </div>
      <div className="work-mobile-stack">{projects.map((project, index) => <ProjectCard project={project} featured={index === 0} key={project.slug} />)}</div>
      <Link className="text-link section-link" href="/projects">See every project and experiment <MoveRight size={18} /></Link>
    </section>
  );
}
