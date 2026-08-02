import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { projects } from "@/content/projects";

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
    description: project.shortDescription,
    alternates: { canonical: project.caseStudyUrl },
    openGraph: {
      title: `${project.name} case study`,
      description: project.shortDescription,
    },
  };
}

export default async function WorkCaseStudy({ params }: Props) {
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
    description: project.shortDescription,
    creator: { "@type": "Person", name: "Altair Tolesh" },
    url: project.liveUrl || undefined,
    keywords: project.stack.join(", "),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Work", item: "/work" },
      { "@type": "ListItem", position: 3, name: project.name },
    ],
  };

  return (
    <div
      className="case-study"
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <header className="case-hero">
        <Link href="/work" className="back-link">
          <ArrowLeft size={16} /> Return to Work
        </Link>
        <div className="case-heading">
          <span className="project-number">{project.number}</span>
          <div>
            <p className="overline">
              {project.type} · {project.year}
            </p>
            <h1>{project.name}</h1>
            <p>{project.shortDescription}</p>
            <div className="case-actions">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  className="button button-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.liveLabel} <ArrowUpRight size={16} />
                </a>
              ) : null}
              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  className="button button-quiet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View code <ArrowUpRight size={16} />
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
            <dt>My role</dt>
            <dd>{project.role.join(", ")}</dd>
          </div>
          <div>
            <dt>Technology</dt>
            <dd>{project.stack.join(" · ")}</dd>
          </div>
        </dl>
        <ProjectVisual variant={project.slug} />
      </header>

      <div className="case-layout">
        <aside className="case-index">
          <span className="overline">On this page</span>
          {project.sections.map((section, sectionIndex) => (
            <a href={`#${section.id}`} key={section.id}>
              <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
              {section.title}
            </a>
          ))}
        </aside>
        <div className="case-content">
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
          <span>Previous project</span>
          <strong>{previous.name}</strong>
          <ArrowLeft size={22} />
        </Link>
        <Link href={next.caseStudyUrl}>
          <span>Next project</span>
          <strong>{next.name}</strong>
          <ArrowRight size={22} />
        </Link>
      </nav>
      <div className="case-return">
        <Link href="/work" className="button button-quiet">
          Return to Work <ArrowRight size={16} />
        </Link>
      </div>

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
