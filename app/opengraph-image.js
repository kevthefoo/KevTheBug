import { ImageResponse } from "next/og";

export const alt = "Kevin Foo — Software Developer Portfolio";
export const size = { width: 1200, height: 630 };
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
        padding: "68px 76px",
        color: "#eef3ef",
        background: "#141615",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#eef3ef",
            color: "#141615",
            fontSize: 38,
            fontWeight: 700,
          }}
        >
          K
        </div>
        <div style={{ fontSize: 34, fontWeight: 600 }}>KevTheFoo</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ color: "#afd9bd", fontSize: 22, letterSpacing: 3 }}>
          SOFTWARE DEVELOPER · TAIWAN
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            lineHeight: 1.08,
            fontWeight: 600,
          }}
        >
          <div>Building for the web.</div>
          <div>Exploring what comes next.</div>
        </div>
      </div>
    </div>,
    size,
  );
}
