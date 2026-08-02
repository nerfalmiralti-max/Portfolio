import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import PortfolioHero from "@/components/ui/portfolio-hero";
import { SectionHeading } from "@/components/section-heading";
import { SelectedWorkStage } from "@/components/selected-work-stage";
import { homepageProcessSteps } from "@/content/process";
import { homepageCopy, profile } from "@/content/profile";

export function HomeContent() {
  return (
    <div className="home-experience">
      <PortfolioHero />

      <section className="intro-section" data-motion="section-wipe">
        <h2>{homepageCopy.introductionHeading}</h2>
        <p>{homepageCopy.introductionBody}</p>
      </section>

      <SelectedWorkStage />

      <section className="section process-section" data-motion="process-preview">
        <SectionHeading
          eyebrow="02 / How I work"
          title="My usual process"
          body="The exact steps change between projects, but I normally work in this order."
        />
        <ol className="process-grid">
          {homepageProcessSteps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <Link href="/process" className="text-link section-link">
          Read the full process <ArrowRight size={17} />
        </Link>
      </section>

      <section className="about-preview" data-motion="split-reveal">
        <div className="about-preview-label">
          <span className="overline">03 / About</span>
        </div>
        <div>
          <h2>{homepageCopy.aboutHeading}</h2>
          {homepageCopy.aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link href="/about" className="text-link">
            More about me <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="contact-cta" data-motion="cta-reveal">
        <span className="overline">04 / Contact</span>
        <h2>{homepageCopy.contactHeading}</h2>
        <p>{homepageCopy.contactBody}</p>
        <div>
          <Link href="/contact" className="button button-primary">
            Discuss a project <ArrowRight size={18} />
          </Link>
          {profile.email ? (
            <a href={`mailto:${profile.email}`} className="button button-quiet">
              Email <ArrowUpRight size={16} />
            </a>
          ) : null}
          {profile.github ? (
            <a href={profile.github} className="button button-quiet" target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={16} />
            </a>
          ) : null}
        </div>
      </section>
    </div>
  );
}
