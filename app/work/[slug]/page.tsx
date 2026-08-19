import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { EvidenceRow } from "@/components/evidence-row";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { DecisionList } from "@/components/decision-list";
import { ExternalLink } from "@/components/external-link";
import { projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  const title = `${project.name} — ${project.type}`;

  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: project.caseStudyUrl },
    openGraph: {
      type: "article",
      title,
      description: project.tagline,
      url: project.caseStudyUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.tagline,
    },
  };
}

export default async function WorkCaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];

  // Reads as one argument: what it is, why it existed, what it had to solve,
  // what got built, and where it broke. `tone` varies the typographic weight
  // so five consecutive sections do not read as one undifferentiated wall.
  const find = (id: string) => project.sections.find((section) => section.id === id);
  const narrative = [
    { id: "overview", title: "Overview", body: project.summary, tone: "lede" },
    find("context") && { ...find("context")!, tone: "default" },
    { id: "problem", title: "The problem", body: project.problem, tone: "default" },
    find("product") && { ...find("product")!, tone: "default" },
    find("problems") && { ...find("problems")!, tone: "callout" },
  ].filter(Boolean) as { id: string; title: string; body: string; tone: string }[];

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.tagline,
    description: project.summary,
    creator: { "@type": "Person", name: "Altair Tolesh" },
    url: project.liveUrl || undefined,
    codeRepository: project.repositoryUrl || undefined,
    dateCreated: project.year,
    keywords: project.stack.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Work", item: "/work" },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: project.caseStudyUrl,
      },
    ],
  };

  return (
    <div style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <header className="case-hero shell">
        <Link href="/work" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" /> All work
        </Link>

        <p className="label label-accent">
          {project.type} · {project.year} · {project.status}
        </p>
        <h1>{project.name}</h1>
        <p className="lede">{project.tagline}</p>

        <EvidenceRow
          evidence={project.evidence}
          label={`${project.name} evidence`}
        />

        <div className="case-actions">
          {project.liveUrl ? (
            <ExternalLink
              href={project.liveUrl}
              className="button button-primary"
              size={16}
            >
              {project.liveLabel}
            </ExternalLink>
          ) : null}
          {project.repositoryUrl ? (
            <ExternalLink
              href={project.repositoryUrl}
              className="button button-quiet"
              size={16}
            >
              View the source
            </ExternalLink>
          ) : null}
        </div>

        <dl className="case-meta">
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{project.role.join(", ")}</dd>
          </div>
        </dl>
      </header>

      <div className="shell case-body">
        {narrative.map((section) => (
          <section
            className="case-block"
            data-tone={section.tone}
            data-reveal
            key={section.id}
          >
            <h2 id={section.id}>{section.title}</h2>
            <div className="case-block-body">
              <p>{section.body}</p>
            </div>
          </section>
        ))}

        <section className="case-block case-block-wide" data-reveal>
          <h2>Architecture</h2>
          <div className="case-block-body">
            <ArchitectureDiagram
              layers={project.architecture}
              note="Only the layers this project actually uses."
            />
          </div>
        </section>

        <section className="case-block case-block-wide" data-reveal>
          <h2>Key decisions</h2>
          <div className="case-block-body">
            <DecisionList decisions={project.decisions} />
          </div>
        </section>

        <section className="case-block case-block-wide" data-reveal>
          <h2>How it works</h2>
          <div className="case-block-body">
            <ProjectVisual variant={project.slug} />
          </div>
        </section>

        <section className="case-block" data-reveal>
          <h2>Outcome</h2>
          <div className="case-block-body">
            <div className="case-outcome">
              <div>
                <p className="label">Result</p>
                <p>{project.result}</p>
              </div>
              <div>
                <p className="label">What I learned</p>
                <p>{project.learned}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="case-block" data-reveal>
          <h2>Stack</h2>
          <div className="case-block-body">
            <ul className="stack-list" aria-label={`${project.name} stack`}>
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <nav className="shell case-next" aria-label="More projects">
        <Link href={previous.caseStudyUrl}>
          <span className="label">Previous</span>
          <strong>{previous.name}</strong>
          <span className="text-link">
            <ArrowLeft size={15} aria-hidden="true" /> {previous.type}
          </span>
        </Link>
        <Link href={next.caseStudyUrl}>
          <span className="label">Next</span>
          <strong>{next.name}</strong>
          <span className="text-link">
            {next.type} <ArrowRight size={15} aria-hidden="true" />
          </span>
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
