import type { ThemeName } from "@/lib/theme";
import { artifacts, railKeys, type Artifact } from "./artifacts";
import { conversations, type Conversation } from "./conversations";
import { SYSTEM_PROMPT, TRANSIENT_ERROR_MESSAGE, LLM_UNAVAILABLE_MESSAGE } from "@/lib/systemPrompt";
import { cyberpunkContent } from "./cyberpunkContent";
import { medievalContent } from "./medievalContent";
import { thronesContent } from "./thronesContent";

// Static UI chrome — button labels, headings, placeholders, aria text.
// Proper nouns (Alex Tong, LinkedIn, tool/product names, school/company
// names) are intentionally NOT themed here; they stay literal everywhere.
export type UiCopy = {
  sidebarNewChatTitle: string;
  sidebarNewChatAria: string;
  sidebarConversationsLabel: string;
  sidebarAvailableTools: string;
  sidebarShowLess: string;
  sidebarArtifactsNav: string;
  sidebarSettingsNav: string;
  // Same order as lib/content/tools.ts's toolGroups (5 entries) — themed
  // headings only, the 37 tool/product names underneath stay literal.
  toolGroupNames: [string, string, string, string, string];
  chatHeaderMenuTitle: string;
  chatHeaderMenuAria: string;
  chatHeaderHomeTitle: string;
  chatHeaderHomeAria: string;
  chatHeaderDownloadCV: string;
  swipeHintConversations: string;
  swipeHintSwipe: string;
  swipeHintArtifacts: string;
  emptyStateHeading: string;
  emptyStateSubcopy: string;
  chatInputPlaceholderEmpty: string;
  chatInputPlaceholderFollowUp: string;
  chatInputPlaceholderPaused: string;
  chatInputSendTitle: string;
  // "{host}" is substituted at render time.
  chatInputDisclaimer: string;
  shuffleThemeLabel: string;
  artifactPanelBackTitle: string;
  artifactListBackTitle: string;
  artifactPanelDownloadTitle: string;
  artifactPanelDownloadAria: string;
  artifactPanelCloseTitle: string;
  artifactPanelCloseAria: string;
  artifactPanelRelatedLabel: string;
  artifactListHeader: string;
  artifactChipCta: string;
  photoLightboxCaption: string;
  settingsTitle: string;
  settingsCloseAria: string;
  settingsAppearanceHeading: string;
  // "{n}" is substituted with the live theme count at render time.
  settingsAppearanceDescTemplate: string;
};

export type ThemeContent = {
  artifacts: Record<string, Artifact>;
  railKeys: string[];
  conversations: Conversation[];
  systemPrompt: string;
  transientErrorMessage: string;
  llmUnavailableMessage: string;
  rateLimitMessage: string;
  photoSrc: string;
  // The literal display name shown in the sidebar brand, avatar alt text,
  // etc. — "Alex Tong" for every theme except in-character ones (e.g. the
  // Game of Thrones theme renames him "Prince Alex Targaryen").
  displayName: string;
  uiCopy: UiCopy;
};

const defaultUiCopy: UiCopy = {
  sidebarNewChatTitle: "New chat",
  sidebarNewChatAria: "Start new chat",
  sidebarConversationsLabel: "Conversations",
  sidebarAvailableTools: "Available Tools",
  sidebarShowLess: "Show less",
  sidebarArtifactsNav: "Artifacts",
  sidebarSettingsNav: "Settings",
  toolGroupNames: ["AI & Automation", "Analytics & Research", "Sales, CRM & Growth", "Productivity & Docs", "Project & Ops"],
  chatHeaderMenuTitle: "Menu",
  chatHeaderMenuAria: "Open menu",
  chatHeaderHomeTitle: "Home",
  chatHeaderHomeAria: "Go to home",
  chatHeaderDownloadCV: "Download CV",
  swipeHintConversations: "Conversations",
  swipeHintSwipe: "Swipe",
  swipeHintArtifacts: "Artifacts",
  emptyStateHeading: "Ask me anything about Alex Tong.",
  emptyStateSubcopy:
    "Head of Technical Deployment Strategy at Pentatonic. Strategy brain, operator’s hands, AI enthusiast. Pick a conversation on the left or ask your own question.",
  chatInputPlaceholderEmpty: "Give me a braggadocious summary of Alex Tong.",
  chatInputPlaceholderFollowUp: "Ask anything about Alex…",
  chatInputPlaceholderPaused: "Live chat is paused — pick a conversation on the left, or ask via LinkedIn.",
  chatInputSendTitle: "Send",
  chatInputDisclaimer: "{host} · responses are AI-generated from Alex Tong’s professional profile",
  shuffleThemeLabel: "Shuffle theme",
  artifactPanelBackTitle: "Back to artifacts",
  artifactListBackTitle: "Back to chat",
  artifactPanelDownloadTitle: "Download",
  artifactPanelDownloadAria: "Download CV",
  artifactPanelCloseTitle: "Close",
  artifactPanelCloseAria: "Close artifact",
  artifactPanelRelatedLabel: "Related",
  artifactListHeader: "Artifacts",
  artifactChipCta: "Click to open →",
  photoLightboxCaption: "No more zooming, please. Personal space, thanks.",
  settingsTitle: "Settings",
  settingsCloseAria: "Close settings",
  settingsAppearanceHeading: "Appearance",
  settingsAppearanceDescTemplate: "Switch the whole interface between {n} personalities.",
};

export const defaultContent: ThemeContent = {
  artifacts,
  railKeys,
  conversations,
  systemPrompt: SYSTEM_PROMPT,
  transientErrorMessage: TRANSIENT_ERROR_MESSAGE,
  llmUnavailableMessage: LLM_UNAVAILABLE_MESSAGE,
  rateLimitMessage: "Whoa, lots of questions! Give it a minute and try again. You can contact Alex to ask him directly!",
  photoSrc: "/assets/alex.jpeg",
  displayName: "Alex Tong",
  uiCopy: defaultUiCopy,
};

export const themeContent: Record<ThemeName, ThemeContent> = {
  warm: defaultContent,
  terminal: defaultContent,
  cyberpunk: cyberpunkContent,
  medieval: medievalContent,
  thrones: thronesContent,
};
