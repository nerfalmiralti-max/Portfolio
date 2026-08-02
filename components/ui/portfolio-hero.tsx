import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile, homepageCopy } from "@/content/profile";
import { projects } from "@/content/projects";

export default function PortfolioHero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          {homepageCopy.heroLabel}
        </p>
        <h1>{homepageCopy.heroHeading}</h1>
        <p className="hero-intro">{homepageCopy.heroBody}</p>
        <div className="hero-actions">
          <Link href="/work" className="button button-primary">
            View my work <ArrowRight size={17} />
          </Link>
          <Link href="/about" className="button button-quiet">
            About me
          </Link>
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
          Structure <i /> Design <i /> Frontend <i /> Services <i /> Deployment
        </p>
      </div>
    </section>
  );
}
