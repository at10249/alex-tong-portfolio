"use client";

import Image from "next/image";

export function EmptyState() {
  return (
    <div
      className="empty-state-pad"
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
        priority
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
      <div
        className="swipe-hint"
        style={{
          marginTop: "20px",
          alignItems: "center",
          gap: "8px",
          fontFamily: "var(--mono)",
          fontSize: "10.5px",
          letterSpacing: ".2px",
          color: "var(--faint)",
          border: "1px dashed var(--border)",
          borderRadius: "999px",
          padding: "7px 14px",
        }}
      >
        <span aria-hidden="true">&#8596;</span>&nbsp;&nbsp;Swipe left or right to see the other panels
      </div>
    </div>
  );
}
