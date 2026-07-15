"use client";

import { useAppState } from "@/context/AppStateContext";
import { artifacts } from "@/lib/content/artifacts";
import type { CSSVarStyle } from "@/lib/theme";

// Renders author-controlled HTML (bios, case studies, scripted answers) and
// delegates clicks on inline entity links (`data-art="<id>"`) to open the
// matching artifact in the right-hand panel — mirrors the reference's
// event-delegated `node()` renderer.
export function RichHtml({ html, style }: { html: string; style?: CSSVarStyle }) {
  const { openArtifactById } = useAppState();

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
        const el = target.closest?.("[data-art]");
        if (!el) return;
        const id = el.getAttribute("data-art");
        if (id && artifacts[id]) openArtifactById(id);
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
