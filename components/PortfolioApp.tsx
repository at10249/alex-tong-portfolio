"use client";

import { useAppState } from "@/context/AppStateContext";
import { themes, type CSSVarStyle } from "@/lib/theme";
import { Sidebar } from "./Sidebar";
import { ChatMain } from "./ChatMain";
import { ArtifactPanel } from "./ArtifactPanel";
import { ArtifactList } from "./ArtifactList";
import { SettingsModal } from "./SettingsModal";

export function PortfolioApp() {
  const { theme, rightPaneWidth, mobileSidebarOpen, closeMobileSidebar } = useAppState();

  // Layout (grid vs. stacked/drawer) lives entirely in the .app-root CSS
  // rule in globals.css so it can respond to a media query — only the
  // per-theme custom properties and the drag-resizable pane width are set
  // here, since those are runtime values, not structural layout.
  const rootStyle: CSSVarStyle = {
    ...themes[theme],
    "--right-pane-width": `${rightPaneWidth}px`,
  };

  return (
    <div className="app-root" style={rootStyle}>
      <div
        className={`app-sidebar-backdrop${mobileSidebarOpen ? " is-open" : ""}`}
        onClick={closeMobileSidebar}
      />
      <Sidebar />
      <ChatMain />
      <ArtifactPanel />
      <ArtifactList />
      <SettingsModal />
    </div>
  );
}
