export type ChatMessage = {
  role: "user" | "bot";
  text?: string;
  html?: string;
  artifacts?: string[];
};
