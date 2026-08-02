import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { profile, projects } from "@/content/site";

export default function PortfolioHero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          ALTAIR TOLESH · PRODUCT DESIGN AND DEVELOPMENT
        </p>
        <h1>
          I design the <em>structure</em>, build the system, and prepare it for real use.
        </h1>
        <p className="hero-intro">
          I am a student and developer from Aktau. My work covers the full
          website process: organizing content, designing the interface,
          connecting real functionality, testing the main user flows, and
          preparing the project for deployment.
        </p>
        <div className="hero-actions">
          <a href="#selected-work" className="button button-primary">
            View selected projects <ArrowRight size={17} />
          </a>
          <a href="#process" className="button button-quiet">
            See how I work
          </a>
        </div>
        <p className="availability-note">
          <span /> {profile.availability}
        </p>
      </div>

      <div className="trajectory-board" aria-label="Project trajectory">
        <div className="trajectory-meta">
          <span>{profile.coordinates}</span>
          <span>AKTAU / UTC+5</span>
        </div>
        <div className="trajectory-monogram" aria-hidden="true">
          <span>A</span>
          <span>T</span>
        </div>
        <div className="trajectory-line" aria-hidden="true">
          <i />
        </div>
        <div className="trajectory-projects">
          {projects.map((project) => (
            <Link
              href={project.caseStudyUrl}
              className={`trajectory-marker marker-${project.number}`}
              style={{ "--marker-accent": project.accent } as React.CSSProperties}
              key={project.slug}
            >
              <span>{project.number}</span>
              <strong>{project.name}</strong>
              <small>{project.status}</small>
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </div>
        <p className="trajectory-caption">
          Strategy <i /> UX <i /> Interface <i /> Development <i /> Release
        </p>
      </div>

      <a href="#introduction" className="scroll-cue" aria-label="Continue to introduction">
        <span>Continue</span>
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
