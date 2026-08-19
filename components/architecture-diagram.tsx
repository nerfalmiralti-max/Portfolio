import type { ArchitectureLayer } from "@/content/projects";

/**
 * The layers a project actually has, top to bottom. Built from the stack the
 * project shipped with — no layer appears here that the project does not use.
 */
export function ArchitectureDiagram({
  layers,
  note,
}: {
  layers: readonly ArchitectureLayer[];
  note?: string;
}) {
  return (
    <figure className="architecture-figure">
      <div className="architecture" data-reveal-sequence>
        {layers.map((layer) => (
          <div className="architecture-layer" key={layer.layer}>
            <span>{layer.layer}</span>
            <p>{layer.detail}</p>
            <ul className="architecture-parts">
              {layer.parts.map((part) => (
                <li key={part}>{part}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {note ? <figcaption className="figure-note">{note}</figcaption> : null}
    </figure>
  );
}
