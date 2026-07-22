"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ThemeName, THEME_STORAGE_KEY } from "@/lib/theme";
import { Conversation } from "@/lib/content/conversations";
import { ChatMessage } from "@/lib/types";
import { themeContent, type ThemeContent } from "@/lib/content/themeContent";

const MIN_PANEL_WIDTH = 340;
const MAX_PANEL_WIDTH = 760;
const DEFAULT_PANEL_WIDTH = 460;
const LIST_MODE_WIDTH = 300;
const SCRIPTED_ANSWER_DELAY_MS = 420;

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : () => {};

// Which full-screen view the mobile (stacked) layout shows. Irrelevant on
// desktop, where chat and the right pane are always both visible — see the
// `.app-main` / `.app-right-pane` media query in globals.css.
export type MobileView = "chat" | "artifact" | "artifact-list";

type AppStateValue = {
  theme: ThemeName;
  content: ThemeContent;
  messages: ChatMessage[];
  draft: string;
  openArtifactId: string | null;
  panelWidth: number;
  rightPaneWidth: number;
  settingsOpen: boolean;
  toolsOpen: boolean;
  loading: boolean;
  activeConvo: string | null;
  llmAvailable: boolean;
  mobileView: MobileView;
  mobileSidebarOpen: boolean;
  photoLightboxOpen: boolean;

  setDraft: (v: string) => void;
  newChat: () => void;
  sendConversation: (conv: Conversation) => void;
  sendSuggestion: (conv: Conversation) => void;
  sendDraft: () => void;
  onInputKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  toggleTools: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  setTheme: (name: ThemeName) => void;
  openArtifactById: (id: string) => void;
  closeArtifactPanel: () => void;
  startResize: (e: React.MouseEvent) => void;
  downloadCV: () => void;
  toggleMobileSidebar: () => void;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  openMobileRightPane: () => void;
  showArtifactList: () => void;
  backToChat: () => void;
  openPhotoLightbox: () => void;
  closePhotoLightbox: () => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("warm");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [openArtifactId, setOpenArtifactId] = useState<string | null>(null);
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeConvo, setActiveConvo] = useState<string | null>(null);
  const [llmAvailable, setLlmAvailable] = useState(true);
  const [mobileView, setMobileView] = useState<MobileView>("chat");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [photoLightboxOpen, setPhotoLightboxOpen] = useState(false);

  const content = themeContent[theme];

  const resizingRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "warm" || saved === "terminal" || saved === "cyberpunk" || saved === "medieval" || saved === "thrones")
        setThemeState(saved);
    } catch {
      // localStorage unavailable (private browsing, etc.) — fall back to default theme
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;
      const w = Math.min(MAX_PANEL_WIDTH, Math.max(MIN_PANEL_WIDTH, window.innerWidth - e.clientX));
      setPanelWidth(w);
    };
    const onUp = () => {
      resizingRef.current = false;
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const setTheme = useCallback((name: ThemeName) => {
    setThemeState(name);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, name);
    } catch {
      // ignore write failures
    }
  }, []);

  const pushBotMessage = useCallback((html: string, artifacts: string[] = [], conversationId?: string) => {
    setMessages((prev) => [...prev, { role: "bot", html, artifacts, conversationId }]);
    // Desktop's right pane auto-opens to the FIRST/primary artifact (it's
    // always visible, so this just updates its content) — the rest are
    // still reachable via their own chips. Mobile deliberately does NOT
    // jump to the full-screen artifact view here — the visitor stays on
    // the chat response and taps a chip/entity link if they want to open
    // one (see openArtifactById, which does switch mobileView).
    if (artifacts[0]) setOpenArtifactId(artifacts[0]);
  }, []);

  const askDeepSeek = useCallback(
    async (text: string) => {
      setLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: text, theme }),
        });

        if (res.status === 503) {
          const body = await res.json().catch(() => ({}) as { error?: string });
          if (body.error === "insufficient_balance") {
            setLlmAvailable(false);
            pushBotMessage(content.llmUnavailableMessage);
          } else {
            pushBotMessage(content.transientErrorMessage);
          }
          return;
        }

        if (res.status === 429) {
          pushBotMessage(content.rateLimitMessage);
          return;
        }

        if (!res.ok) {
          pushBotMessage(content.transientErrorMessage);
          return;
        }

        const json = await res.json();
        const raw: string = json?.text ?? "";
        const safe = raw
          .replace(/</g, "&lt;")
          .replace(/&lt;br&gt;/g, "<br>")
          .replace(/\n/g, "<br>");
        pushBotMessage(safe);
      } catch {
        pushBotMessage(content.transientErrorMessage);
      } finally {
        setLoading(false);
      }
    },
    [pushBotMessage, theme, content]
  );

  const performSend = useCallback(
    (rawText: string, fresh: boolean) => {
      const text = rawText.trim();
      if (!text) return;

      setMessages((prev) => (fresh ? [{ role: "user", text }] : [...prev, { role: "user", text }]));
      setDraft("");

      const hit =
        content.conversations.find((c) => c.q === text) ||
        content.conversations.find((c) => c.title.toLowerCase() === text.toLowerCase());

      if (hit) {
        window.setTimeout(() => {
          pushBotMessage(hit.a, hit.artifacts, hit.id);
        }, SCRIPTED_ANSWER_DELAY_MS);
        return;
      }

      if (!llmAvailable) {
        pushBotMessage(content.llmUnavailableMessage);
        return;
      }

      void askDeepSeek(text);
    },
    [askDeepSeek, llmAvailable, pushBotMessage, content]
  );

  const newChat = useCallback(() => {
    setMessages([]);
    setActiveConvo(null);
    setDraft("");
    setOpenArtifactId(null);
    setMobileView("chat");
    setMobileSidebarOpen(false);
  }, []);

  const sendConversation = useCallback(
    (conv: Conversation) => {
      setActiveConvo(conv.id);
      setOpenArtifactId(null);
      setLoading(false);
      setMobileView("chat");
      setMobileSidebarOpen(false);
      performSend(conv.q, true);
    },
    [performSend]
  );

  const sendSuggestion = useCallback(
    (conv: Conversation) => {
      performSend(conv.q, false);
    },
    [performSend]
  );

  const sendDraft = useCallback(() => {
    performSend(draft, false);
  }, [draft, performSend]);

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendDraft();
      }
    },
    [sendDraft]
  );

  const toggleTools = useCallback(() => setToolsOpen((v) => !v), []);
  const openSettings = useCallback(() => {
    setSettingsOpen(true);
    setMobileSidebarOpen(false);
  }, []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);
  const openArtifactById = useCallback((id: string) => {
    setOpenArtifactId(id);
    setMobileView("artifact");
    setMobileSidebarOpen(false);
  }, []);
  const closeArtifactPanel = useCallback(() => {
    setOpenArtifactId(null);
    setMobileView("chat");
  }, []);
  const toggleMobileSidebar = useCallback(() => setMobileSidebarOpen((v) => !v), []);
  const openMobileSidebar = useCallback(() => setMobileSidebarOpen(true), []);
  const closeMobileSidebar = useCallback(() => setMobileSidebarOpen(false), []);
  // Reveals whatever the right pane currently holds (an open artifact, or
  // the list) without changing it — unlike showArtifactList below, which
  // forces the list specifically. Used by the swipe gesture, where "swipe
  // left from chat" should surface an already-open artifact rather than
  // bumping the visitor to the list they weren't looking at.
  const openMobileRightPane = useCallback(() => {
    setMobileView(openArtifactId ? "artifact" : "artifact-list");
    setMobileSidebarOpen(false);
  }, [openArtifactId]);
  const showArtifactList = useCallback(() => {
    // PortfolioApp renders ArtifactPanel whenever openArtifactId is set,
    // regardless of mobileView — scripted answers auto-open one, so
    // without clearing it here ArtifactList would never actually mount,
    // just an already-open ArtifactPanel sliding off-screen: a blank gap
    // where the list should be.
    setOpenArtifactId(null);
    setMobileView("artifact-list");
    setMobileSidebarOpen(false);
  }, []);
  const backToChat = useCallback(() => setMobileView("chat"), []);
  const openPhotoLightbox = useCallback(() => setPhotoLightboxOpen(true), []);
  const closePhotoLightbox = useCallback(() => setPhotoLightboxOpen(false), []);

  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    resizingRef.current = true;
    document.body.style.userSelect = "none";
  }, []);

  const downloadCV = useCallback(() => {
    window.open("/api/cv", "_blank", "noopener");
  }, []);

  const rightPaneWidth = openArtifactId ? panelWidth : LIST_MODE_WIDTH;

  const value = useMemo<AppStateValue>(
    () => ({
      theme,
      content,
      messages,
      draft,
      openArtifactId,
      panelWidth,
      rightPaneWidth,
      settingsOpen,
      toolsOpen,
      loading,
      activeConvo,
      llmAvailable,
      mobileView,
      mobileSidebarOpen,
      photoLightboxOpen,
      setDraft,
      newChat,
      sendConversation,
      sendSuggestion,
      sendDraft,
      onInputKeyDown,
      toggleTools,
      openSettings,
      closeSettings,
      setTheme,
      openArtifactById,
      closeArtifactPanel,
      startResize,
      downloadCV,
      toggleMobileSidebar,
      openMobileSidebar,
      closeMobileSidebar,
      openMobileRightPane,
      showArtifactList,
      backToChat,
      openPhotoLightbox,
      closePhotoLightbox,
    }),
    [
      theme,
      content,
      messages,
      draft,
      openArtifactId,
      panelWidth,
      rightPaneWidth,
      settingsOpen,
      toolsOpen,
      loading,
      activeConvo,
      llmAvailable,
      mobileView,
      mobileSidebarOpen,
      photoLightboxOpen,
      newChat,
      sendConversation,
      sendSuggestion,
      sendDraft,
      onInputKeyDown,
      toggleTools,
      openSettings,
      closeSettings,
      setTheme,
      openArtifactById,
      closeArtifactPanel,
      startResize,
      downloadCV,
      toggleMobileSidebar,
      openMobileSidebar,
      closeMobileSidebar,
      openMobileRightPane,
      showArtifactList,
      backToChat,
      openPhotoLightbox,
      closePhotoLightbox,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within an AppStateProvider");
  return ctx;
}
