import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { ScrollProgress } from "@/components/scroll-progress";
import { projects } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: project.caseStudyUrl },
    openGraph: {
      title: `${project.name} — Case study`,
      description: project.summary,
    },
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    creator: { "@type": "Person", name: "Altair Tolesh" },
    url: project.liveUrl || undefined,
    keywords: project.technologies.join(", "),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "/projects" },
      { "@type": "ListItem", position: 3, name: project.name },
    ],
  };

  return (
    <div
      className="case-study"
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <ScrollProgress />
      <header className="case-hero">
        <Link href="/projects" className="back-link">
          <ArrowLeft size={16} /> All projects
        </Link>
        <div className="case-heading">
          <span className="project-number">{project.number}</span>
          <div>
            <p className="overline">
              {project.type} · {project.year}
            </p>
            <h1>{project.name}</h1>
            <p>{project.summary}</p>
            <div className="case-actions">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  className="button button-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open live website <ArrowUpRight size={16} />
                </a>
              ) : null}
              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  className="button button-quiet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source <ArrowUpRight size={16} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
        <dl className="case-meta">
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.technologies.join(" · ")}</dd>
          </div>
        </dl>
        <ProjectVisual variant={project.slug} />
      </header>

      <div className="case-layout">
        <aside className="case-index">
          <span className="overline">Case index</span>
          {project.sections.map((section, sectionIndex) => (
            <a href={`#${section.id}`} key={section.id}>
              <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
              {section.title}
            </a>
          ))}
        </aside>
        <div className="case-content">
          <section className="case-intro">
            <div>
              <span className="overline">Main challenge</span>
              <p>{project.challenge}</p>
            </div>
            <div>
              <span className="overline">My contribution</span>
              <p>{project.contribution}</p>
            </div>
            <div>
              <span className="overline">Result</span>
              <p>{project.result}</p>
            </div>
          </section>
          {project.sections.map((section, sectionIndex) => (
            <section id={section.id} className="case-section" key={section.id}>
              <span className="case-section-number">
                {String(sectionIndex + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </div>
            </section>
          ))}
        </div>
      </div>

      <nav className="case-navigation" aria-label="Project navigation">
        <Link href={previous.caseStudyUrl}>
          <span>Previous case study</span>
          <strong>{previous.name}</strong>
          <ArrowLeft size={22} />
        </Link>
        <Link href={next.caseStudyUrl}>
          <span>Next case study</span>
          <strong>{next.name}</strong>
          <ArrowRight size={22} />
        </Link>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </div>
  );
}
