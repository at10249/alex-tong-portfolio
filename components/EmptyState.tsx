"use client";

import Image from "next/image";

export function EmptyState() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 56px",
      }}
    >
      <Image
        src="/assets/alex.jpeg"
        alt="Alex Tong"
        width={64}
        height={64}
        style={{
          width: 64,
          height: 64,
          borderRadius: "18px",
          objectFit: "cover",
          objectPosition: "50% 12%",
          marginBottom: "22px",
          filter: "var(--photo-filter)",
        }}
      />
      <div
        style={{
          fontFamily: "var(--display)",
          fontWeight: 400,
          fontSize: "30px",
          lineHeight: 1.2,
          letterSpacing: "-.3px",
          color: "var(--text)",
          marginBottom: "12px",
        }}
      >
        Ask me anything about Alex Tong.
      </div>
      <div style={{ fontFamily: "var(--font)", fontSize: "13.5px", lineHeight: 1.6, color: "var(--muted)", maxWidth: "430px" }}>
        Head of Technical Deployment Strategy at Pentatonic. Strategy brain, operator&rsquo;s hands, AI enthusiast. Pick a
        conversation on the left or ask your own question.
      </div>
    </div>
  );
}
