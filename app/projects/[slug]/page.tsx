import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { ScrollProgress } from "@/components/scroll-progress";
import { projects, type ProjectSlug } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: project.name, description: project.summary, alternates: { canonical: `/projects/${project.slug}` }, openGraph: { title: `${project.name} — Case study`, description: project.summary } };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const softwareJsonLd = { "@context": "https://schema.org", "@type": "CreativeWork", name: project.name, description: project.summary, creator: { "@type": "Person", name: "Altair Tolesh" }, keywords: project.technologies.join(", ") };
  return (
    <div className="case-study" style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <ScrollProgress />
      <header className="case-hero">
        <Link href="/projects" className="back-link"><ArrowLeft size={16} /> All projects</Link>
        <div className="case-heading"><span className="project-number">{project.number}</span><div><p className="overline">{project.type} · {project.year}</p><h1>{project.name}</h1><p>{project.message}</p></div></div>
        <div className="case-meta"><div><span>Status</span><p>{project.status}</p></div><div><span>Role</span><p>{project.role}</p></div><div><span>Stack</span><p>{project.technologies.join(" · ")}</p></div></div>
        <ProjectVisual variant={project.slug as ProjectSlug} />
      </header>
      <div className="case-layout">
        <aside className="case-index"><span className="overline">Case index</span>{project.sections.map((section, i) => <a href={`#${section.id}`} key={section.id}><span>{String(i + 1).padStart(2, "0")}</span>{section.title}</a>)}</aside>
        <div className="case-content">
          <section className="case-intro"><p>{project.summary}</p>{project.metric ? <div className="verified-metric"><span>Verified quality</span><strong>{project.metric}</strong></div> : null}</section>
          {project.sections.map((section, i) => (
            <section id={section.id} className="case-section" key={section.id}><span className="case-section-number">{String(i + 1).padStart(2, "0")}</span><div><h2>{section.title}</h2><p>{section.body}</p>{[4, 6, 7].includes(i) ? <ProjectVisual variant={project.slug as ProjectSlug} compact /> : null}</div></section>
          ))}
        </div>
      </div>
      <Link href={`/projects/${next.slug}`} className="next-project"><span>Next case study</span><strong>{next.name}</strong><ArrowRight size={28} /></Link>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
    </div>
  );
}
