export type ToolGroup = {
  name: string;
  tools: string[];
};

export const toolGroups: ToolGroup[] = [
  { name: "AI & Automation", tools: ["Claude Code", "ChatGPT", "Hermes", "OpenClaw", "FinAI", "N8N"] },
  { name: "Analytics & Research", tools: ["SPSS", "Tableau", "Google Analytics", "R", "STATA"] },
  {
    name: "Sales, CRM & Growth",
    tools: [
      "HubSpot",
      "Sales Navigator",
      "Apollo",
      "HeyReach",
      "Google Ads",
      "Amazon PPC",
      "Amazon SC",
      "Shopify",
      "Wix",
    ],
  },
  {
    name: "Productivity & Docs",
    tools: ["Microsoft Office", "Google Workspace", "Notion", "Keynote", "Slack", "Microsoft Teams"],
  },
  {
    name: "Project & Ops",
    tools: [
      "Jira",
      "Linear",
      "Monday.com",
      "ServiceNow",
      "Airtable",
      "Figma",
      "Miro",
      "GitHub",
      "Asana",
      "ClickUp",
      "Trello",
    ],
  },
];

export const flatToolCount = toolGroups.reduce((n, g) => n + g.tools.length, 0);
