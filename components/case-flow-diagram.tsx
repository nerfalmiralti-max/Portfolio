import type { ProjectSlug } from "@/content/projects";

const labels: Record<ProjectSlug, string[]> = {
  "99-aktau": ["Guest", "Booking request", "Admin review", "Accepted"],
  "tuesday-lounge-bar": ["Atmosphere", "Menu", "Location", "Reservation"],
  "mangystau-trials": ["Preferences", "Route logic", "Map preview", "Trip plan"],
};

export function CaseFlowDiagram({ variant }: { variant: ProjectSlug }) {
  return (
    <figure className={`case-flow-diagram case-flow-${variant}`} data-motion="case-diagram">
      <figcaption>
        <span>One connected system</span>
        <strong>{variant === "99-aktau" ? "Request flow" : variant === "tuesday-lounge-bar" ? "Information path" : "Route output"}</strong>
      </figcaption>
      <svg viewBox="0 0 1000 210" preserveAspectRatio="none" aria-hidden="true">
        <path d="M72 105 C250 12 314 198 500 105 S760 20 928 105" />
      </svg>
      <ol>
        {labels[variant].map((label, index) => (
          <li key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
          </li>
        ))}
      </ol>
    </figure>
  );
}
