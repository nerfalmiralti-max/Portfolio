import type { Metadata } from "next";
import Link from "next/link";
import { ProjectIndex } from "@/components/project-index";
import { EvidenceRow } from "@/components/evidence-row";
import { ContactBlock } from "@/components/contact-block";
import { ExternalLink } from "@/components/external-link";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Four projects by Altair Tolesh: a deterministic release scanner, a commercial booking site for a PlayStation club, a hospitality site, and a hackathon travel prototype. Each with a case study and public source.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <header className="page-hero shell">
        <p className="label">Work</p>
        <h1 className="page-title">
          <span>Four projects,</span>
          <span>four different reasons.</span>
        </h1>
        <p className="lede">
          One is a release scanner I built to answer a question a score cannot.
          One was built for a paying client, one for a lounge bar, and one
          started at a hackathon and did not place. Each case study covers what I
          built, the decisions behind it, and what went wrong.
        </p>
      </header>

      <div className="continuum">
        <span className="continuum-spine" aria-hidden="true">
          <span className="continuum-mark" />
        </span>

        <ProjectIndex
          projects={projects}
          eyebrow="Index"
          heading="Four systems"
          body="Move between them and the drawing rearranges rather than restarting: the same nodes, in the shape each project actually took."
        />
      </div>

      <section className="section section-ruled">
        <div className="shell">
          <header className="index-head" data-scene>
            <p className="label">Records</p>
            <h2>What each one is</h2>
          </header>

          <ol className="dossier">
            {projects.map((project) => (
              <li
                className="record"
                key={project.slug}
                style={
                  { "--project-accent": project.accent } as React.CSSProperties
                }
                data-scene="ruled"
              >
                <div className="record-head">
                  <span className="record-index">{project.number}</span>
                  <h3>{project.name}</h3>
                  <p className="label">
                    {project.type} · {project.year} · {project.status}
                  </p>
                </div>

                <div className="record-body">
                  <p className="record-tagline">{project.tagline}</p>
                  <p className="record-role">
                    <strong>My role:</strong> {project.role.join(", ")}.
                  </p>

                  <EvidenceRow
                    evidence={project.evidence}
                    label={`${project.name} evidence`}
                  />

                  <ul className="stack-list" aria-label={`${project.name} stack`}>
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>

                  <div className="record-actions">
                    <Link href={project.caseStudyUrl} className="text-link">
                      Read the case study
                    </Link>
                    {/* Not every project is a deployed site. One of them runs
                        locally, so it has source to read and no URL to visit. */}
                    {project.liveUrl ? (
                      <ExternalLink
                        href={project.liveUrl}
                        className="text-link text-link-quiet"
                      >
                        {project.liveLabel}
                      </ExternalLink>
                    ) : null}
                    <ExternalLink
                      href={project.repositoryUrl}
                      className="text-link text-link-quiet"
                    >
                      Source
                    </ExternalLink>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactBlock eyebrow="Next" />
    </>
  );
}
