import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Alex Tong — Ask me anything about him";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/assets/alex.jpeg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f0e8",
        }}
      >
        <img
          src={photoSrc}
          alt=""
          width={168}
          height={168}
          style={{ borderRadius: 32, objectFit: "cover", marginBottom: 40 }}
        />
        <div style={{ fontSize: 68, fontWeight: 700, color: "#2b2823", fontFamily: "Georgia, serif" }}>Alex Tong</div>
        <div style={{ fontSize: 30, color: "#c0673c", marginTop: 14, fontWeight: 600 }}>
          Head of Technical Deployment Strategy, Pentatonic
        </div>
        <div style={{ fontSize: 24, color: "#8a8378", marginTop: 24 }}>Ask me anything — an AI-assistant-style portfolio</div>
      </div>
    ),
    { ...size }
  );
}
