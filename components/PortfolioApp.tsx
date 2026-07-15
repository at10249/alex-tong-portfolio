"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";
import { themes, type CSSVarStyle } from "@/lib/theme";
import { Sidebar } from "./Sidebar";
import { ChatMain } from "./ChatMain";
import { ArtifactPanel } from "./ArtifactPanel";
import { ArtifactList } from "./ArtifactList";
import { SettingsModal } from "./SettingsModal";

export function PortfolioApp() {
  const { theme, rightPaneWidth, mobileSidebarOpen, closeMobileSidebar, openArtifactId } = useAppState();

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
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            key="backdrop"
            className="app-sidebar-backdrop is-open"
            onClick={closeMobileSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <Sidebar />
      <ChatMain />
      <AnimatePresence mode="wait" initial={false}>
        {openArtifactId ? <ArtifactPanel key="panel" /> : <ArtifactList key="list" />}
      </AnimatePresence>
      <SettingsModal />
    </div>
  );
}
