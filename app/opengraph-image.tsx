import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Altair Tolesh — web design and development";

/**
 * The social card is generated, not shipped as a file.
 *
 * The previous static image carried a set of map coordinates and a city name
 * in its artwork, which is exactly the kind of detail that has no business in
 * a link preview. This one is built from the wordmark and the same node
 * language the site uses for its project diagrams, and states nothing about
 * where anyone is.
 */
export default function OpengraphImage() {
  const nodes = [
    { x: 760, y: 150 },
    { x: 920, y: 250 },
    { x: 1010, y: 400 },
    { x: 830, y: 430 },
  ];

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            color: "#a8a49c",
          }}
        >
          <span>INDEX — 01</span>
          <span>WEB DESIGN AND DEVELOPMENT</span>
        </div>

        {/* The system language, abstracted: nodes and the lines between them. */}
        <div style={{ display: "flex", position: "absolute", top: 0, left: 0 }}>
          <svg width={1200} height={630}>
            {nodes.map((node, index) => {
              const next = nodes[index + 1];
              if (!next) return null;
              return (
                <line
                  key={`edge-${index}`}
                  x1={node.x}
                  y1={node.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="rgba(138,125,255,0.55)"
                  strokeWidth="1.5"
                />
              );
            })}
            {nodes.map((node, index) => (
              <circle
                key={`node-${index}`}
                cx={node.x}
                cy={node.y}
                r={index === 0 ? 9 : 6}
                fill={index === 0 ? "#8a7dff" : "#0a0a0c"}
                stroke="#8a7dff"
                strokeWidth="1.5"
              />
            ))}
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 168,
              fontWeight: 700,
              letterSpacing: -8,
              lineHeight: 1,
            }}
          >
            ALTAIR
          </div>
          <div
            style={{
              width: 1056,
              height: 1,
              marginTop: 28,
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <div style={{ marginTop: 28, fontSize: 34, color: "#a8a49c" }}>
            I design and build websites that go into production.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            color: "#a8a49c",
          }}
        >
          <span>ALTAIR TOLESH</span>
          <span>03 PROJECTS · 03 REPOSITORIES</span>
        </div>
      </div>
    ),
    size,
  );
}
