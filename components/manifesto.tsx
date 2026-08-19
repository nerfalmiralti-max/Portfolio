"use client";

import { useRef } from "react";
import { aboutCopy } from "@/content/profile";
import { useActiveIndex } from "@/lib/use-in-view";

/**
 * About, as a sequence of four positions rather than a page of biography.
 *
 * One word per beat, set large enough to be the thing you see first, with the
 * reasoning beside it. Scrolling moves the marker down the spine and brings
 * the current beat forward; the others stay readable rather than hidden.
 */
export function Manifesto() {
  const beats = useRef<(HTMLLIElement | null)[]>([]);
  const active = useActiveIndex(beats, aboutCopy.manifesto.length);

  return (
    <ol
      className="manifesto"
      style={
        { "--beat-count": aboutCopy.manifesto.length } as React.CSSProperties
      }
    >
      <span className="manifesto-spine" aria-hidden="true">
        <span
          className="manifesto-mark"
          style={{ "--beat": active } as React.CSSProperties}
        />
      </span>

      {aboutCopy.manifesto.map((beat, index) => (
        <li
          key={beat.word}
          ref={(node) => {
            beats.current[index] = node;
          }}
          data-active={active === index ? "true" : "false"}
        >
          <p className="beat-number">{beat.number}</p>
          <h3 className="beat-word">
            <span>{beat.word}</span>
          </h3>
          <p className="beat-body">{beat.body}</p>
        </li>
      ))}
    </ol>
  );
}
