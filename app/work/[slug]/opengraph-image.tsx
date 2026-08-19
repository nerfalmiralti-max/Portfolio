import { ImageResponse } from "next/og";
import { projects } from "@/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study by Altair Tolesh";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Each case study gets its own social preview instead of one shared image. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0c",
          color: "#f2f0ea",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#a8a49c" }}>
          <span>ALTAIR TOLESH</span>
          <span>{project ? `${project.type.toUpperCase()} · ${project.year}` : "WORK"}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 64,
              height: 4,
              marginBottom: 32,
              background: project?.accent ?? "#8a7dff",
            }}
          />
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {project?.name ?? "Selected work"}
          </div>
          <div
            style={{
              maxWidth: 900,
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#a8a49c",
            }}
          >
            {project?.tagline ?? "Websites designed, built, and deployed."}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 22, color: "#a8a49c" }}>
          {(project?.stack ?? []).slice(0, 5).map((tech) => (
            <span
              key={tech}
              style={{
                padding: "8px 18px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 6,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
