import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

/**
 * The page opens on the whole name set as large as it will go. It closes on
 * the two letters that are left of it, so the site reads as one object with a
 * beginning and an end rather than a stack of sections that stops.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-lead">
            <p className="label">End of index</p>
            <p className="footer-statement">
              Designed, built, and deployed by one person.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <p className="label">Work</p>
              {projects.map((project) => (
                <Link href={project.caseStudyUrl} key={project.slug}>
                  <span className="footer-link-index">{project.number}</span>
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

        {/* `data-reveal="mark"` opts this into the same observer as everything
            else without taking the generic fade: the closing mark has its own
            rule-draw, in the character the hero opens with. */}
        <p className="footer-mark" aria-hidden="true" data-reveal="mark">
          <span className="footer-mark-dash" />
          <span className="footer-mark-letters">{profile.initials}</span>
        </p>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
