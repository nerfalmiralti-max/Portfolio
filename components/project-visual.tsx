import type { ProjectSlug } from "@/content/projects";

type Schematic = {
  /** What the diagram is, said plainly. It is not a screenshot. */
  caption: string;
  steps: string[];
  outcomeLabel: string;
  outcome: string;
  alt: string;
};

/**
 * Schematics of how each project is put together — deliberately not mock
 * screenshots. Every step below is taken from what the project actually does;
 * no invented figures, IDs, prices, or timings appear here.
 */
const schematics: Record<ProjectSlug, Schematic> = {
  "99-aktau": {
    caption: "Booking flow",
    steps: [
      "Guest chooses a hall and sends a request",
      "Request is stored with a status",
      "Administrator signs in and reviews it",
      "Accept, reject, or delete",
    ],
    outcomeLabel: "Result",
    outcome: "One record, two views",
    alt: "Diagram of the 99 AKTAU booking flow: a guest sends a request, it is stored with a status, the administrator reviews it and accepts, rejects, or deletes it. Both sides read the same record.",
  },
  "tuesday-lounge-bar": {
    caption: "Information path",
    steps: [
      "Venue and atmosphere",
      "Menu",
      "Location and contacts",
      "Table enquiry",
    ],
    outcomeLabel: "On mobile",
    outcome: "Practical content moves up",
    alt: "Diagram of the Tuesday Lounge Bar information path: venue and atmosphere, then menu, then location and contacts, then table enquiry. On mobile the practical content moves higher up the page.",
  },
  "mangystau-trials": {
    caption: "Route output",
    steps: [
      "Budget, days, interests, transport",
      "Route is ordered from those inputs",
      "Map and location list share that order",
    ],
    outcomeLabel: "Single output",
    outcome: "The route",
    alt: "Diagram of the Mangystau Trials route output: trip preferences feed a route, and the map and location list are shown in the same order. The route is the single output of the prototype.",
  },
};

export function ProjectVisual({ variant }: { variant: ProjectSlug }) {
  const schematic = schematics[variant];

  return (
    <div className="project-visual" role="img" aria-label={schematic.alt}>
      <p className="visual-caption" aria-hidden="true">
        <span>{schematic.caption}</span>
        <span>Schematic</span>
      </p>

      <div className="visual-body" aria-hidden="true">
        <ol className="visual-flow" data-reveal-sequence>
          {schematic.steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <p className="visual-outcome" aria-hidden="true">
        <span>{schematic.outcomeLabel}</span>
        <strong>{schematic.outcome}</strong>
      </p>
    </div>
  );
}
