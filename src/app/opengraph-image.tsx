import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background:
          "radial-gradient(circle at top left, #38bdf8 0%, #0f172a 42%, #020617 100%)",
        color: "white",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          Portfolio
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1 }}>
          Julian Gabriel Ramirez
        </div>
        <div style={{ fontSize: 34, color: "#bae6fd", maxWidth: 760 }}>
          Computer Science student, data science researcher, and web developer.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          fontSize: 24,
          opacity: 0.85,
        }}
      >
        <span>Next.js • React • TypeScript</span>
        <span>julianramirez.dev</span>
      </div>
    </div>,
    size,
  );
}
