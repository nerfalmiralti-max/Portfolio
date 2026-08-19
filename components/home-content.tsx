import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FeaturedProject } from "@/components/featured-project";
import { ProjectCard } from "@/components/project-card";
import { ContactBlock } from "@/components/contact-block";
import { ExternalLink } from "@/components/external-link";
import { processSteps } from "@/content/process";
import { homepageCopy, profile } from "@/content/profile";
import { featuredProject, supportingProjects } from "@/content/projects";

export function HomeContent() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-grid">
          <div>
            <p className="label hero-label">{homepageCopy.heroLabel}</p>
            <h1>{homepageCopy.heroHeading}</h1>
            <p className="hero-intro">{homepageCopy.heroBody}</p>

            <div className="hero-actions">
              <Link href="/work" className="button button-primary">
                See the work <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <ExternalLink
                href={profile.github}
                className="button button-quiet"
                size={15}
              >
                GitHub
              </ExternalLink>
            </div>

            <p className="label hero-availability">{profile.availability}</p>
          </div>

          <div className="hero-evidence">
            <p className="label">What you can check</p>
            <dl className="evidence-strip">
              {homepageCopy.heroEvidence.map((item) => (
                <div key={item.label}>
                  <dt>{item.value}</dt>
                  <dd>{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section section-ruled">
        <div className="shell">
          <SectionHeading eyebrow="Featured" title={homepageCopy.featuredHeading} />
          <FeaturedProject project={featuredProject} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Selected work"
            title={homepageCopy.workHeading}
            body={homepageCopy.workBody}
          />
          <div className="project-list">
            {supportingProjects.map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </div>
          <div className="section-more">
            <Link href="/work" className="text-link">
              All work and case studies <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-ruled">
        <div className="shell statement-block" data-reveal>
          <div>
            <p className="label">Approach</p>
            <h2 className="statement-heading">{homepageCopy.noteHeading}</h2>
          </div>
          <div className="prose">
            <p>{homepageCopy.noteBody}</p>
          </div>
        </div>
      </section>

      <section className="section section-ruled">
        <div className="shell">
          <SectionHeading
            eyebrow="Process"
            title={homepageCopy.processHeading}
            body={homepageCopy.processBody}
          />
          <ol className="process-list" data-reveal-stagger>
            {processSteps.map((step) => (
              <li key={step.number}>
                <p className="label">{step.number}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="section-more">
            <Link href="/about#process" className="text-link">
              How this played out on each project{" "}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
