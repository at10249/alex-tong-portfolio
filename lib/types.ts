export type ChatMessage = {
  role: "user" | "bot";
  text?: string;
  html?: string;
  artifacts?: string[];
  // Set only for scripted (canned) answers — lets the message re-derive its
  // display HTML live from the current theme's content on every render, so
  // switching themes mid-conversation re-voices replies already on screen.
  // Absent for live LLM-generated replies, which can't be regenerated
  // retroactively without another API call.
  conversationId?: string;
};
