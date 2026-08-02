import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "#0d0d10", color: "#f5f4f1", border: "3px solid #7567ff", fontFamily: "Arial, sans-serif", fontSize: 27, fontWeight: 800, letterSpacing: "-0.18em", paddingRight: 5 }}>AT</div>,
    size,
  );
}
