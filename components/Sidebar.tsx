"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";
import { toolGroups, flatToolCount } from "@/lib/content/tools";
import { useIsMobile } from "@/lib/useIsMobile";

const chipStyle: React.CSSProperties = {
  fontFamily: "var(--mono)",
  fontWeight: 500,
  fontSize: "10px",
  padding: "3px 7px",
  borderRadius: "6px",
  background: "var(--chip)",
  color: "var(--chip-text)",
  border: "1px solid transparent",
  whiteSpace: "nowrap",
};

const toggleChipStyle: React.CSSProperties = {
  fontFamily: "var(--mono)",
  fontWeight: 500,
  fontSize: "10px",
  padding: "3px 7px",
  borderRadius: "6px",
  background: "transparent",
  border: "1px dashed var(--border)",
  color: "var(--faint)",
  cursor: "pointer",
};

export function Sidebar() {
  const {
    content,
    newChat,
    activeConvo,
    sendConversation,
    toolsOpen,
    toggleTools,
    openSettings,
    mobileSidebarOpen,
    showArtifactList,
    openPhotoLightbox,
    sidebarCollapsed,
    toggleSidebarCollapsed,
  } = useAppState();
  const isMobile = useIsMobile();
  const { uiCopy } = content;

  return (
    <aside
      className={`app-sidebar${mobileSidebarOpen ? " is-open" : ""}${sidebarCollapsed ? " is-collapsed" : ""}`}
      // Off-canvas via `transform`, not `display:none`, so it stays visible
      // to CSS transitions — but that also leaves it in the tab order and
      // accessibility tree. `inert` removes it from both while it's hidden
      // on mobile; on desktop it's never inert since it's never off-canvas
      // — except when collapsed to a 0-width column, its own equivalent.
      inert={isMobile ? !mobileSidebarOpen : sidebarCollapsed}
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        background: "var(--panel)",
        borderRight: "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px 16px 14px" }}>
        <button
          onClick={openPhotoLightbox}
          aria-label={`View larger photo of ${content.displayName}`}
          style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer", flex: "none", lineHeight: 0 }}
        >
          <Image
            src={content.photoSrc}
            alt={content.displayName}
            width={30}
            height={30}
            style={{
              width: 30,
              height: 30,
              borderRadius: "var(--r-sm)",
              objectFit: "cover",
              objectPosition: "50% 12%",
              filter: "var(--photo-filter)",
            }}
          />
        </button>
        <button
          onClick={newChat}
          aria-label="Go to home"
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "var(--display)",
            fontWeight: 600,
            fontSize: "14.5px",
            color: "var(--text)",
            letterSpacing: ".2px",
          }}
        >
          {content.displayName}
        </button>
        <motion.button
          whileTap={{ scale: 0.88, rotate: 90 }}
          onClick={newChat}
          title={uiCopy.sidebarNewChatTitle}
          aria-label={uiCopy.sidebarNewChatAria}
          style={{
            marginLeft: "auto",
            width: 28,
            height: 28,
            borderRadius: "var(--r-sm)",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--muted)",
            fontSize: "16px",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
          }}
        >
          +
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={toggleSidebarCollapsed}
          title={uiCopy.sidebarCollapseTitle}
          aria-label={uiCopy.sidebarCollapseAria}
          className="desktop-panel-toggle"
          style={{
            width: 28,
            height: 28,
            borderRadius: "var(--r-sm)",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--muted)",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          «
        </motion.button>
      </div>

      <div
        style={{
          padding: "8px 16px 6px",
          fontFamily: "var(--mono)",
          fontWeight: 600,
          fontSize: "9.5px",
          letterSpacing: "1.2px",
          color: "var(--faint)",
          textTransform: "uppercase",
        }}
      >
        {uiCopy.sidebarConversationsLabel}
      </div>
      <nav
        tabIndex={0}
        aria-label={uiCopy.sidebarConversationsLabel}
        style={{ display: "flex", flexDirection: "column", gap: "2px", padding: "0 8px", overflowY: "auto", flexShrink: 0 }}
      >
        {content.conversations.map((c) => {
          const active = activeConvo === c.id;
          return (
            <motion.button
              key={c.id}
              whileTap={{ scale: 0.98 }}
              layout
              onClick={() => sendConversation(c)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                textAlign: "left",
                padding: "9px 11px",
                borderRadius: "var(--r-sm)",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font)",
                fontSize: "12.5px",
                fontWeight: active ? 600 : 400,
                color: active ? "var(--active-text)" : "var(--muted)",
                background: active ? "var(--active-bg)" : "transparent",
                boxShadow: active ? "0 1px 2px rgba(0,0,0,.05)" : "none",
              }}
            >
              <span style={{ color: "var(--accent)", fontSize: "8px", width: "10px", flex: "none" }}>
                {active ? "●" : ""}
              </span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</span>
            </motion.button>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", padding: "12px 12px 10px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--r-md)",
            background: "var(--panel2)",
            overflow: "hidden",
          }}
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={toggleTools}
            style={{
              width: "100%",
              padding: "11px 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#3f9d6b",
                boxShadow: "0 0 6px rgba(63,157,107,.6)",
              }}
            />
            <span style={{ fontFamily: "var(--mono)", fontWeight: 600, fontSize: "11px", color: "var(--text)", letterSpacing: ".3px" }}>
              {uiCopy.sidebarAvailableTools}
            </span>
            <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: "10px", color: "var(--faint)" }}>
              {flatToolCount} tools
            </span>
          </motion.button>

          <AnimatePresence mode="wait" initial={false}>
            {!toolsOpen && (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ padding: "10px 12px", display: "flex", flexWrap: "wrap", gap: "5px" }}
              >
                {toolGroups.map((g) => (
                  <span key={g.name} style={chipStyle}>
                    {g.tools[0]}
                  </span>
                ))}
                <motion.button whileTap={{ scale: 0.94 }} onClick={toggleTools} style={toggleChipStyle}>
                  {`+${flatToolCount - toolGroups.length} more`}
                </motion.button>
              </motion.div>
            )}

            {toolsOpen && (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                tabIndex={0}
                aria-label={uiCopy.sidebarAvailableTools}
                style={{ maxHeight: "48vh", overflowY: "auto", padding: "10px 12px 12px" }}
              >
                {toolGroups.map((g, i) => (
                  <div key={g.name} style={{ marginTop: "11px" }}>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontWeight: 600,
                        fontSize: "8.5px",
                        letterSpacing: "1px",
                        color: "var(--faint)",
                        textTransform: "uppercase",
                      }}
                    >
                      {uiCopy.toolGroupNames[i] ?? g.name}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "6px" }}>
                      {g.tools.map((t) => (
                        <span key={t} style={chipStyle}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <motion.button whileTap={{ scale: 0.96 }} onClick={toggleTools} style={{ ...toggleChipStyle, marginTop: "12px", padding: "4px 9px" }}>
                  {uiCopy.sidebarShowLess}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={showArtifactList}
          className="mobile-artifacts-nav"
          style={{
            alignItems: "center",
            gap: "9px",
            padding: "9px 10px",
            borderRadius: "var(--r-sm)",
            border: "none",
            background: "transparent",
            color: "var(--muted)",
            cursor: "pointer",
            fontFamily: "var(--font)",
            fontSize: "12.5px",
            fontWeight: 500,
          }}
        >
          <span style={{ fontSize: "14px" }}>▤</span> {uiCopy.sidebarArtifactsNav}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={openSettings}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            padding: "9px 10px",
            borderRadius: "var(--r-sm)",
            border: "none",
            background: "transparent",
            color: "var(--muted)",
            cursor: "pointer",
            fontFamily: "var(--font)",
            fontSize: "12.5px",
            fontWeight: 500,
          }}
        >
          <span style={{ fontSize: "14px" }}>⚙</span> {uiCopy.sidebarSettingsNav}
        </motion.button>
      </div>
    </aside>
  );
}
