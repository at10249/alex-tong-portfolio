"use client";

import { useAppState } from "@/context/AppStateContext";
import type { CSSVarStyle } from "@/lib/theme";

// Renders author-controlled HTML (bios, case studies, scripted answers) and
// delegates clicks on inline entity links (`data-art="<id>"`) to open the
// matching artifact in the right-hand panel — mirrors the reference's
// event-delegated `node()` renderer. Also delegates clicks on the bio
// artifact's embedded profile photo (`data-photo`) to the shared lightbox.
export function RichHtml({ html, style }: { html: string; style?: CSSVarStyle }) {
  const { content, openArtifactById, openPhotoLightbox } = useAppState();

  return (
    <div
      style={{
        fontFamily: "var(--font)",
        fontSize: "13px",
        lineHeight: "1.65",
        color: "var(--text)",
        ...style,
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest?.("[data-photo]")) {
          openPhotoLightbox();
          return;
        }
        const el = target.closest?.("[data-art]");
        if (!el) return;
        const id = el.getAttribute("data-art");
        if (id && content.artifacts[id]) openArtifactById(id);
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
