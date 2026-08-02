import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/content/navigation";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <span className="monogram monogram-large" aria-hidden="true">
          <i>A</i>
          <i>T</i>
        </span>
        <p>Design and development by Altair Tolesh.</p>
      </div>
      <div className="footer-grid">
        <div>
          <span className="overline">Location</span>
          <p>{profile.location}</p>
        </div>
        <div>
          <span className="overline">Navigate</span>
          {navigation.slice(1, 4).map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </div>
        <div>
          <span className="overline">Continue</span>
          <Link href="/journey">Journey</Link>
          <Link href="/contact">Contact</Link>
          {profile.email ? <a href={`mailto:${profile.email}`}>Email</a> : null}
          {profile.github ? (
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={14} />
            </a>
          ) : null}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Altair Tolesh</span>
        <span>Altair Tolesh · Aktau, Kazakhstan</span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
