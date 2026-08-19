"use client";

import { useRef, useState } from "react";
import type { ArchitectureLayer } from "@/content/projects";
import { useInView } from "@/lib/use-in-view";

/**
 * The architecture as something you can point at.
 *
 * On entering the viewport the spine draws, the layer nodes arrive in order,
 * and one highlight runs top to bottom — once. After that the diagram is
 * still: nothing here loops.
 *
 * Pointing at a layer previews it. Pressing it holds that emphasis, so a
 * reader can pin one path and read the rest against it. Holding a selection
 * is a real action, which is why this is a real button — and why the whole
 * thing works from a keyboard. With no scripting every layer and every
 * description is still rendered in full; only the emphasis is missing.
 */
export function ArchitectureMap({
  layers,
  note,
}: {
  layers: readonly ArchitectureLayer[];
  note?: string;
}) {
  const figure = useRef<HTMLElement>(null);
  const live = useInView(figure, { rootMargin: "0px 0px -18%", threshold: 0.15 });
  // `preview` is whatever the pointer or the focus ring is on; `selected` is
  // what the reader chose to hold. Preview wins while it exists, so pointing
  // at a layer never destroys a selection.
  const [selected, setSelected] = useState<number | null>(null);
  const [preview, setPreview] = useState<number | null>(null);
  const shown = preview ?? selected;

  return (
    <figure
      className="arch"
      ref={figure}
      data-live={live ? "true" : "false"}
      style={{ "--layer-count": layers.length } as React.CSSProperties}
    >
      <ol className="arch-layers">
        {layers.map((layer, index) => {
          const state = shown === null ? "rest" : shown === index ? "on" : "off";

          return (
            <li
              key={layer.layer}
              className="arch-layer"
              data-state={state}
              style={{ "--layer-index": index } as React.CSSProperties}
            >
              <button
                type="button"
                className="arch-node"
                aria-pressed={selected === index}
                onPointerEnter={() => setPreview(index)}
                onPointerLeave={() => setPreview(null)}
                onFocus={() => setPreview(index)}
                onBlur={() => setPreview(null)}
                onClick={() =>
                  setSelected((current) => (current === index ? null : index))
                }
              >
                <span className="arch-dot" aria-hidden="true" />
                <span className="arch-name">{layer.layer}</span>
                <span className="visually-hidden">
                  {selected === index ? "held" : "hold this layer"}
                </span>
              </button>

              <div className="arch-detail">
                <p>{layer.detail}</p>
                <ul className="arch-parts">
                  {layer.parts.map((part) => (
                    <li key={part}>{part}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      {note ? <figcaption className="figure-note">{note}</figcaption> : null}
    </figure>
  );
}
