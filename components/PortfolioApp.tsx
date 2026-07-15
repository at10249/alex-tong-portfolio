"use client";

import { useAppState } from "@/context/AppStateContext";
import { themes, type CSSVarStyle } from "@/lib/theme";
import { Sidebar } from "./Sidebar";
import { ChatMain } from "./ChatMain";
import { ArtifactPanel } from "./ArtifactPanel";
import { ArtifactList } from "./ArtifactList";
import { SettingsModal } from "./SettingsModal";

export function PortfolioApp() {
  const { theme, rightPaneWidth } = useAppState();

  const rootStyle: CSSVarStyle = {
    ...themes[theme],
    display: "grid",
    gridTemplateColumns: `280px minmax(0,1fr) ${rightPaneWidth}px`,
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "var(--font)",
  };

  return (
    <div style={rootStyle}>
      <Sidebar />
      <ChatMain />
      <ArtifactPanel />
      <ArtifactList />
      <SettingsModal />
    </div>
  );
}
