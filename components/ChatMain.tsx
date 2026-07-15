"use client";

import { useEffect, useRef } from "react";
import { useAppState } from "@/context/AppStateContext";
import { ChatHeader } from "./ChatHeader";
import { EmptyState } from "./EmptyState";
import { MessageThread } from "./MessageThread";
import { ChatInput } from "./ChatInput";

export function ChatMain() {
  const { messages, loading, mobileView } = useAppState();
  const isEmpty = messages.length === 0;
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the latest reply (or the loading dots) in view — without this,
  // new content can land below the fold and silently go unnoticed.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, loading]);

  return (
    <main
      className={`app-main${mobileView === "chat" ? " is-active" : ""}`}
      style={{ flexDirection: "column", minHeight: 0, minWidth: 0, background: "var(--bg)" }}
    >
      <ChatHeader />
      <div
        ref={scrollRef}
        tabIndex={0}
        aria-label="Conversation"
        style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column" }}
      >
        {isEmpty ? <EmptyState /> : <MessageThread />}
      </div>
      <ChatInput />
    </main>
  );
}
