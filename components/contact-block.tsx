import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homepageCopy, profile } from "@/content/profile";
import { ExternalLink } from "@/components/external-link";

/** Closing block so no page ends without somewhere to go. */
export function ContactBlock({ eyebrow = "Contact" }: { eyebrow?: string }) {
  return (
    <section className="section section-ruled contact-cta" data-reveal>
      <div className="shell">
        <p className="label">{eyebrow}</p>
        <h2>{homepageCopy.contactHeading}</h2>
        <p>{homepageCopy.contactBody}</p>
        <div className="contact-cta-actions">
          <Link href="/contact" className="button button-primary">
            Start a project <ArrowRight size={16} aria-hidden="true" />
          </Link>
          {profile.email ? (
            <a href={`mailto:${profile.email}`} className="button button-quiet">
              Email
            </a>
          ) : null}
          <ExternalLink href={profile.github} className="button button-quiet" size={15}>
            GitHub
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
