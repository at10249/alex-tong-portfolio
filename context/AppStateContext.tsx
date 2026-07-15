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
import { Conversation, conversations } from "@/lib/content/conversations";
import { ChatMessage } from "@/lib/types";
import { LLM_UNAVAILABLE_MESSAGE, TRANSIENT_ERROR_MESSAGE } from "@/lib/systemPrompt";

const MIN_PANEL_WIDTH = 340;
const MAX_PANEL_WIDTH = 760;
const DEFAULT_PANEL_WIDTH = 460;
const LIST_MODE_WIDTH = 300;
const SCRIPTED_ANSWER_DELAY_MS = 420;

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : () => {};

type AppStateValue = {
  theme: ThemeName;
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

  const resizingRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "warm" || saved === "terminal") setThemeState(saved);
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

  const pushBotMessage = useCallback((html: string, artifact: string | null = null) => {
    setMessages((prev) => [...prev, { role: "bot", html, artifact }]);
    if (artifact) setOpenArtifactId(artifact);
  }, []);

  const askDeepSeek = useCallback(
    async (text: string) => {
      setLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: text }),
        });

        if (res.status === 503) {
          const body = await res.json().catch(() => ({}) as { error?: string });
          if (body.error === "insufficient_balance") {
            setLlmAvailable(false);
            pushBotMessage(LLM_UNAVAILABLE_MESSAGE);
          } else {
            pushBotMessage(TRANSIENT_ERROR_MESSAGE);
          }
          return;
        }

        if (res.status === 429) {
          pushBotMessage(
            "Whoa, lots of questions! Give it a minute and try again. You can contact Alex to ask him directly!"
          );
          return;
        }

        if (!res.ok) {
          pushBotMessage(TRANSIENT_ERROR_MESSAGE);
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
        pushBotMessage(TRANSIENT_ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    },
    [pushBotMessage]
  );

  const performSend = useCallback(
    (rawText: string, fresh: boolean) => {
      const text = rawText.trim();
      if (!text) return;

      setMessages((prev) => (fresh ? [{ role: "user", text }] : [...prev, { role: "user", text }]));
      setDraft("");

      const hit =
        conversations.find((c) => c.q === text) ||
        conversations.find((c) => c.title.toLowerCase() === text.toLowerCase());

      if (hit) {
        window.setTimeout(() => {
          pushBotMessage(hit.a, hit.artifact);
        }, SCRIPTED_ANSWER_DELAY_MS);
        return;
      }

      if (!llmAvailable) {
        pushBotMessage(LLM_UNAVAILABLE_MESSAGE);
        return;
      }

      void askDeepSeek(text);
    },
    [askDeepSeek, llmAvailable, pushBotMessage]
  );

  const newChat = useCallback(() => {
    setMessages([]);
    setActiveConvo(null);
    setDraft("");
    setOpenArtifactId(null);
  }, []);

  const sendConversation = useCallback(
    (conv: Conversation) => {
      setActiveConvo(conv.id);
      setOpenArtifactId(null);
      setLoading(false);
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
  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);
  const openArtifactById = useCallback((id: string) => setOpenArtifactId(id), []);
  const closeArtifactPanel = useCallback(() => setOpenArtifactId(null), []);

  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    resizingRef.current = true;
    document.body.style.userSelect = "none";
  }, []);

  const downloadCV = useCallback(() => {
    window.open("https://www.linkedin.com/in/alexkevintong", "_blank", "noopener");
  }, []);

  const rightPaneWidth = openArtifactId ? panelWidth : LIST_MODE_WIDTH;

  const value = useMemo<AppStateValue>(
    () => ({
      theme,
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
    }),
    [
      theme,
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
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within an AppStateProvider");
  return ctx;
}
