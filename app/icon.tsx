import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#0a0a0c",
          color: "#f2f0ea",
          border: "3px solid #8a7dff",
          fontFamily: "Arial, sans-serif",
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "-0.08em",
        }}
      >
        AT
      </div>
    ),
    size,
  );
}
