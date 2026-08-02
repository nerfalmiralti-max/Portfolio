import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <span className="monogram monogram-large" aria-hidden="true">
          <i>A</i>
          <i>T</i>
        </span>
        <p>Built with attention to clarity, performance, and maintainability.</p>
      </div>
      <div className="footer-grid">
        <div>
          <span className="overline">Location</span>
          <p>{profile.location}</p>
        </div>
        <div>
          <span className="overline">Navigate</span>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/journey">Journey</Link>
        </div>
        <div>
          <span className="overline">Continue</span>
          <Link href="/contact">Contact</Link>
          {profile.github ? (
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={14} />
            </a>
          ) : null}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Altair Tolesh</span>
        <span>Designed and developed in Aktau, Kazakhstan.</span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
