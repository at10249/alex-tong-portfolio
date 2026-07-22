"use client";

import Image from "next/image";
import { useAppState } from "@/context/AppStateContext";

export function EmptyState() {
  const { content, openPhotoLightbox } = useAppState();
  const { uiCopy } = content;

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
      <button
        onClick={openPhotoLightbox}
        aria-label={`View larger photo of ${content.displayName}`}
        style={{
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: "pointer",
          marginBottom: "22px",
          borderRadius: "18px",
        }}
      >
        <Image
          src={content.photoSrc}
          alt={content.displayName}
          width={120}
          height={120}
          priority
          className="empty-state-photo"
          style={{
            width: 120,
            height: 120,
            borderRadius: "22px",
            objectFit: "cover",
            objectPosition: "50% 12%",
            filter: "var(--photo-filter)",
          }}
        />
      </button>
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
        {uiCopy.emptyStateHeading}
      </div>
      <div style={{ fontFamily: "var(--font)", fontSize: "13.5px", lineHeight: 1.6, color: "var(--muted)", maxWidth: "430px" }}>
        {uiCopy.emptyStateSubcopy}
      </div>
    </div>
  );
}
