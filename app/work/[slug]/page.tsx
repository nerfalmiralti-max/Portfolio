import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SystemDiagram, SystemSteps } from "@/components/system-diagram";
import { EvidenceRow } from "@/components/evidence-row";
import { ArchitectureMap } from "@/components/architecture-map";
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

  const find = (id: string) =>
    project.sections.find((section) => section.id === id);

  // Reads as one argument: what it is, why it existed, and what it had to
  // solve. The written system follows, then the architecture, then the
  // decisions — the page answers its own problem in that order.
  const opening = [
    { id: "overview", title: "Overview", body: project.summary, tone: "lede" },
    find("context") && { ...find("context")!, tone: "default" },
    { id: "problem", title: "The problem", body: project.problem, tone: "default" },
  ].filter(Boolean) as { id: string; title: string; body: string; tone: string }[];

  const closing = [
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
    <div
      className="case"
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <header className="cover shell">
        <Link href="/work" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" /> All work
        </Link>

        <p className="label label-accent cover-tag">
          {project.type} · {project.year} · {project.status}
        </p>

        <div className="cover-grid">
          <h1
            className="cover-title"
            style={
              {
                "--cover-chars": Math.max(
                  ...project.wordmarkLines.map((line) => line.length),
                ),
              } as React.CSSProperties
            }
          >
            <span className="cover-number" aria-hidden="true">
              {project.number}
            </span>
            {/* Carries the number down to the name, so the height the drawing
                occupies beside it is composition rather than a gap. */}
            <span className="cover-stem" aria-hidden="true" />
            <span className="cover-word" aria-hidden="true">
              {project.wordmarkLines.map((line, lineIndex) => (
                <span
                  className="cover-line"
                  key={line}
                  style={{ "--line-index": lineIndex } as React.CSSProperties}
                >
                  <span>{line}</span>
                </span>
              ))}
            </span>
            <span className="visually-hidden">{project.name}</span>
          </h1>

          <div className="cover-system">
            <SystemDiagram systems={[project.system]} />
          </div>
        </div>

        <p className="lede cover-lede">{project.tagline}</p>

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
        {opening.map((section) => (
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

        {/* The cover carries the drawing. This is the same system in words,
            which is also what a small screen and a printed page get. */}
        <section className="case-block case-block-wide case-system" data-reveal>
          <h2 id="system">The system, step by step</h2>
          <div className="case-block-body">
            <SystemSteps system={project.system} />
          </div>
        </section>

        <section className="case-block case-block-wide" data-reveal>
          <h2 id="architecture">Architecture</h2>
          <div className="case-block-body">
            <ArchitectureMap
              layers={project.architecture}
              note="Only the layers this project actually uses. Select one to trace it."
            />
          </div>
        </section>

        <section className="case-block case-block-wide" data-reveal>
          <h2 id="decisions">Key decisions</h2>
          <div className="case-block-body">
            <DecisionList decisions={project.decisions} />
          </div>
        </section>

        {closing.map((section) => (
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

        <section className="case-block case-block-wide outcome" data-reveal>
          <h2 id="outcome">Outcome</h2>
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
            <span className="outcome-rule" aria-hidden="true" />
          </div>
        </section>

        <section className="case-block" data-reveal>
          <h2 id="stack">Stack</h2>
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
