"use client";

import { useEffect, useRef } from "react";
import { useAppState } from "@/context/AppStateContext";
import { ChatHeader } from "./ChatHeader";
import { EmptyState } from "./EmptyState";
import { MessageThread } from "./MessageThread";
import { ChatInput } from "./ChatInput";

export function ChatMain() {
  const { content, messages, loading } = useAppState();
  const { uiCopy } = content;
  const isEmpty = messages.length === 0;
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to keep the visitor's own question in view, not to the newest
  // content overall — jumping to the bottom of a long reply would push
  // the question (and often the loading dots right after it) off-screen,
  // which is disorienting right after you've just asked something. The
  // reply then appears below it in normal flow.
  //
  // Re-anchors on every change (not just when the question itself was
  // just added): right when a question is appended, its reply doesn't
  // exist in the DOM yet, so there isn't enough content below it for the
  // browser to scroll all the way to a top-aligned position — it clamps
  // to whatever's scrollable at that instant. Once the reply (or the
  // loading dots) actually renders, re-running this against the SAME
  // target lets it finish the job.
  useEffect(() => {
    const userMsgs = scrollRef.current?.querySelectorAll('[data-role="user"]');
    const lastUserMsg = userMsgs?.[userMsgs.length - 1];
    lastUserMsg?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [messages, loading]);

  return (
    <main
      className="app-main"
      style={{ flexDirection: "column", minHeight: 0, minWidth: 0, background: "var(--bg)" }}
    >
      <ChatHeader />
      <div
        className="swipe-hint"
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          padding: "9px 20px",
          borderBottom: "1px solid var(--border)",
          fontFamily: "var(--mono)",
          fontWeight: 600,
          fontSize: "9.5px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "var(--faint)",
          flexShrink: 0,
        }}
      >
        <span>{uiCopy.swipeHintConversations}</span>
        <span style={{ color: "var(--accent)" }}>&lsaquo;&nbsp;{uiCopy.swipeHintSwipe}&nbsp;&rsaquo;</span>
        <span>{uiCopy.swipeHintArtifacts}</span>
      </div>
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
