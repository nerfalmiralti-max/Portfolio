"use client";

import { useRef } from "react";
import { processSteps } from "@/content/process";
import { useActiveIndex } from "@/lib/use-in-view";

/**
 * The process as a sequence rather than six identical boxes.
 *
 * A rail of six ticks stays with the reader while the stages themselves step
 * down and across the page. Whichever stage is nearest the middle of the
 * viewport is the one at full contrast; the others stay legible but recede,
 * so the section has a focus at every scroll position instead of six equal
 * claims on attention.
 *
 * Every stage is in the HTML at full text. With no scripting the rail simply
 * sits at stage one and nothing is hidden.
 */
export function ProcessTrack() {
  const stages = useRef<(HTMLLIElement | null)[]>([]);
  const active = useActiveIndex(stages, processSteps.length);

  return (
    <div className="track" style={{ "--stage-count": processSteps.length } as React.CSSProperties}>
      <div className="track-rail" aria-hidden="true">
        <span className="track-line" />
        <span
          className="track-runner"
          style={{ "--stage": active } as React.CSSProperties}
        />
        <ol className="track-ticks">
          {processSteps.map((step, index) => (
            <li key={step.number} data-active={active === index ? "true" : "false"}>
              <span className="tick-mark" />
              <span className="tick-number">{step.number}</span>
              <span className="tick-title">{step.title}</span>
            </li>
          ))}
        </ol>
      </div>

      <ol className="track-stages">
        {processSteps.map((step, index) => (
          <li
            key={step.number}
            ref={(node) => {
              stages.current[index] = node;
            }}
            data-active={active === index ? "true" : "false"}
            style={{ "--stage-index": index } as React.CSSProperties}
          >
            <p className="stage-number">{step.number}</p>
            <h3 className="stage-title">{step.title}</h3>
            <div className="stage-copy">
              <p>{step.body}</p>
              <p className="stage-example">{step.example}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
