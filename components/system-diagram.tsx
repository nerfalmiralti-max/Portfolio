"use client";

import { useRef } from "react";
import type { ProjectSystem, SystemEdge } from "@/content/projects";
import { useInView } from "@/lib/use-in-view";

/**
 * The abstract system drawing that stands in for every project on this site.
 *
 * It is not a screenshot and it is not a mock product screen. Nodes are the
 * real parts of the project, edges are the real relationships between them,
 * and no record, price, or metric is invented to fill it out.
 *
 * Geometry is slot-based. Slot 0 of one project animates into slot 0 of the
 * next, so moving between projects reads as one system being reconfigured
 * rather than three drawings being swapped. Everything that moves is a
 * `transform` on a nested `<g>`: the outer group carries the position, the
 * inner group carries the entrance, so the two never fight over one property.

 */

/**
 * Drawing space. The authored 120 x 100 field is padded so labels can overhang
 * their nodes, and the padding is added to the coordinates rather than to the
 * viewBox origin: every animated group uses `transform-origin: 0 0` against
 * the view box, so the view box has to start at 0 0 for those numbers to mean
 * what they say.
 */
const VIEW_BOX = "0 0 152 136";
const PAD_X = 16;
const PAD_Y = 18;
/** Node radius in user units — edges stop short of it. */
const NODE_RADIUS = 4.6;
/** Perpendicular offset for a return edge, so it clears the forward one. */
const RETURN_OFFSET = 5;

/** Keeps server and client markup byte-identical. */
const round = (value: number) => Math.round(value * 100) / 100;

function centroid(system: ProjectSystem) {
  const { nodes } = system;
  return {
    x: round(
      PAD_X + nodes.reduce((total, node) => total + node.x, 0) / nodes.length,
    ),
    y: round(
      PAD_Y + nodes.reduce((total, node) => total + node.y, 0) / nodes.length,
    ),
  };
}

function edgeGeometry(system: ProjectSystem, edge: SystemEdge) {
  const a = system.nodes[edge.from];
  const b = system.nodes[edge.to];
  if (!a || !b) return { x: PAD_X + 60, y: PAD_Y + 50, length: 0, angle: 0 };

  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.hypot(dx, dy) || 1;
  const ux = dx / distance;
  const uy = dy / distance;

  // A return edge runs alongside the forward one rather than through it.
  const offset = edge.kind === "return" ? RETURN_OFFSET : 0;
  const trim = Math.min(NODE_RADIUS, distance * 0.4);

  return {
    x: round(PAD_X + a.x + ux * trim - uy * offset),
    y: round(PAD_Y + a.y + uy * trim + ux * offset),
    length: round(Math.max(distance - trim * 2, 0)),
    angle: round((Math.atan2(dy, dx) * 180) / Math.PI),
  };
}

export function SystemDiagram({
  systems,
  active = 0,
  pulse = true,
  className = "",
}: {
  systems: readonly ProjectSystem[];
  active?: number;
  pulse?: boolean;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const seen = useInView(host, { rootMargin: "0px 0px -14%", threshold: 0.2 });

  const system = systems[active] ?? systems[0];
  const slots = Math.max(...systems.map((item) => item.nodes.length));
  const wires = Math.max(...systems.map((item) => item.edges.length));
  const rest = centroid(system);

  return (
    <div
      className={`sys ${className}`.trim()}
      ref={host}
      data-live={seen ? "true" : "false"}
      data-state={active}
    >
      <p className="sys-caption" aria-hidden="true">
        <span>{system.caption}</span>
        <span>Schematic</span>
      </p>

      <svg
        className="sys-canvas"
        viewBox={VIEW_BOX}
        role="img"
        aria-label={system.alt}
        focusable="false"
      >
        <g className="sys-wires">
          {Array.from({ length: wires }, (_, slot) => {
            const edge = system.edges[slot];
            const geometry = edge
              ? edgeGeometry(system, edge)
              : { x: rest.x, y: rest.y, length: 0, angle: 0 };

            return (
              <g
                className="sys-wire"
                key={`wire-${slot}`}
                data-kind={edge?.kind ?? "primary"}
                data-present={edge ? "true" : "false"}
                style={{
                  transform: `translate(${geometry.x}px, ${geometry.y}px) rotate(${geometry.angle}deg) scaleX(${geometry.length || 0.001})`,
                }}
              >
                <g className="sys-wire-grow">
                  <line
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </g>
            );
          })}
        </g>

        {pulse ? (
          <g className="sys-pulses" key={`pulses-${active}-${seen}`}>
            {Array.from({ length: wires }, (_, slot) => {
              const edge = system.edges[slot];
              if (!edge || edge.kind === "return") return null;
              const geometry = edgeGeometry(system, edge);

              return (
                <g
                  className="sys-pulse"
                  key={`pulse-${slot}`}
                  style={
                    {
                      transform: `translate(${geometry.x}px, ${geometry.y}px) rotate(${geometry.angle}deg)`,
                      "--wire-length": `${geometry.length}px`,
                      "--wire-order": slot,
                    } as React.CSSProperties
                  }
                >
                  <circle className="sys-pulse-dot" r="1.9" />
                </g>
              );
            })}
          </g>
        ) : null}

        <g className="sys-nodes">
          {Array.from({ length: slots }, (_, slot) => {
            const node = system.nodes[slot];

            return (
              <g
                className="sys-node"
                key={`node-${slot}`}
                data-kind={node?.kind ?? "core"}
                data-present={node ? "true" : "false"}
                style={
                  {
                    transform: `translate(${node ? PAD_X + node.x : rest.x}px, ${node ? PAD_Y + node.y : rest.y}px)`,
                    "--node-order": slot,
                  } as React.CSSProperties
                }
              >
                <g className="sys-node-body">
                  <circle className="sys-node-ring" r={NODE_RADIUS} />
                  <circle className="sys-node-dot" r="2.1" />
                  <text className="sys-node-label" y="12.6" textAnchor="middle">
                    {node?.label ?? ""}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>

      <p className="sys-outcome" aria-hidden="true">
        <span>{system.outcomeLabel}</span>
        <strong>{system.outcome}</strong>
      </p>
    </div>
  );
}

/**
 * The same system written out. Small screens get this instead of the drawing,
 * and it is what keeps the content readable with no scripting at all.
 */
export function SystemSteps({ system }: { system: ProjectSystem }) {
  return (
    <ol className="sys-steps">
      {system.steps.map((step, index) => (
        <li key={step}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          {step}
        </li>
      ))}
    </ol>
  );
}
