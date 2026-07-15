"use client";

import { useAppState } from "@/context/AppStateContext";
import { ChatHeader } from "./ChatHeader";
import { EmptyState } from "./EmptyState";
import { MessageThread } from "./MessageThread";
import { ChatInput } from "./ChatInput";

export function ChatMain() {
  const { messages } = useAppState();
  const isEmpty = messages.length === 0;

  return (
    <main style={{ display: "flex", flexDirection: "column", minHeight: 0, minWidth: 0, background: "var(--bg)" }}>
      <ChatHeader />
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {isEmpty ? <EmptyState /> : <MessageThread />}
      </div>
      <ChatInput />
    </main>
  );
}
