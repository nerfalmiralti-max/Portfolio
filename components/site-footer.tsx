import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <p className="label">Altair Tolesh</p>
            <p className="footer-statement">
              Websites designed, built, and deployed from {profile.location}.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <p className="label">Work</p>
              {projects.map((project) => (
                <Link href={project.caseStudyUrl} key={project.slug}>
                  {project.name}
                </Link>
              ))}
            </div>
            <div>
              <p className="label">Elsewhere</p>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              {profile.email ? (
                <a href={`mailto:${profile.email}`}>Email</a>
              ) : null}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Altair Tolesh</span>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
