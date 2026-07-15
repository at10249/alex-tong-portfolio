# Handoff: Alex Tong — Interactive "Claude-style" Portfolio

## Overview
An interactive personal portfolio for **Alex Tong** built as an AI-assistant chat app. Visitors land on a three-pane chat interface, pick a conversation (or type their own question), and get answers about Alex. Key answers open **artifacts** (bio/CV, case studies, thesis, timeline) in a resizable right-hand panel — the same interaction pattern as an assistant app's "artifacts". There are two switchable themes (Warm Studio, Terminal) and a large "Available Tools" connector.

Target domain: `claude.whoisalextong.com` (personal GitHub + Vercel).

## About the Design Files
The file in `reference/` is a **design reference created in HTML** — a working prototype showing the intended look and behavior. It is **not** production code to ship directly. It runs on an internal "Design Component" runtime (`support.js`) that will **not** exist in production. The task is to **recreate this design in a real codebase** (recommended: **Next.js on Vercel**) using standard patterns.

`Alex Tong Portfolio.dc.html` is authored as a single component: a `<x-dc>` template (markup, top of file) plus a `class Component extends DCLogic` (logic, in the `<script data-dc-script>` block). Read both — the logic class holds all copy, artifact content, theme tokens, and the chat/send logic.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, and interactions are final. Recreate pixel-accurately. All design tokens are enumerated below and in the logic class's `themes()` method.

## ⚠️ Critical architecture note (the one thing that must change)
The prototype's live-LLM fallback calls `window.claude.complete(...)` — a sandbox-only helper that only works inside this design tool. In production it is replaced by a call to **DeepSeek** (this is the chosen provider):
- Add a **serverless function** `app/api/chat/route.ts` that reads `process.env.DEEPSEEK_API_KEY` (server-side only) and calls the DeepSeek API.
- DeepSeek is **OpenAI-compatible**: base URL `https://api.deepseek.com`, model **`deepseek-chat`**, standard `POST /chat/completions` with `{ model, messages, max_tokens }` and header `Authorization: Bearer <key>`. You can use the `openai` SDK pointed at that baseURL, or a plain `fetch`.
- Map the existing prompt shape to OpenAI format: put the system prompt as `{role:'system', content:...}` and the visitor's question as `{role:'user', content:...}`.
- The client calls `/api/chat`; **never** expose the API key in the browser.
- Add basic **rate limiting** (e.g. Upstash Redis or a simple in-memory/edge limiter) — visitors run on Alex's DeepSeek budget.
- The system prompt for the chatbot is already written in the logic class `ask()` method — reuse it verbatim (it enforces the Fairtrade title/accolade, Leafymade, the "contact Alex" fallback line, etc.).
- Note: the live chat **cannot be exercised inside this design preview** (the sandbox only exposes the Claude helper); it will work once deployed against DeepSeek.

Minimal `/api/chat` sketch (Next.js route handler):
```ts
const r = await fetch('https://api.deepseek.com/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}` },
  body: JSON.stringify({ model: 'deepseek-chat', max_tokens: 400,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: question }] }),
});
const j = await r.json();
const text = j.choices?.[0]?.message?.content ?? '';
```

Scripted answers for the 5 sidebar conversations are matched **client-side** first; only unmatched questions hit `/api/chat`.

## Screens / Views
Single-page app, three panes in a CSS grid: `grid-template-columns: 280px minmax(0,1fr) <right>px` where `<right>` = `300` when no artifact is open, else the draggable panel width (clamped **340–760px**), full viewport height, `overflow:hidden`.

### 1. Left sidebar (`<aside>`, 280px, bg `--panel`)
- **Header**: circular headshot (`assets/alex.jpeg`, 30px, `object-position:50% 12%`) + "Alex Tong" (display font) + "new chat" `+` button (resets messages/artifact).
- **Conversations** list (label in mono, uppercase, `--faint`). 5 items; active item has bg `--active-bg`, weight 600, a leading accent dot. Clicking a conversation **starts a fresh chat** (clears messages + open artifact) and sends that conversation's question.
- **Available Tools** connector card (bottom): header row with a green status dot, "Available Tools", and count ("NN tools"). Collapsed = one representative chip per group + "+N more". Expanded = scrollable (`max-height:48vh`) list grouped by section with a group label per group; chips in mono. Groups & tools listed in Design Tokens → Data below.
- **Settings** button (gear) opens the theme modal.

### 2. Center chat (`<main>`, 1fr, bg `--bg`)
- **Header bar**: green dot + `claude.whoisalextong.com` (mono, truncates), right-aligned **LinkedIn** (outline) + **Download CV** (solid accent) buttons; `overflow:hidden`, buttons `flex:none;white-space:nowrap`.
- **Empty state**: centered 64px headshot, `Ask me anything about Alex Tong.` (display, 30px), a subtitle line, and a row of **suggestion chips** (one per sidebar conversation, kept in sync).
- **Message thread** (max-width 760px, centered): user bubbles right-aligned (bg `--accent`, ink `--accent-ink`, radius `14/14/4/14`); assistant rows = 26px headshot avatar + bubble (plain, `--text`). Assistant bubbles may render bold accents and clickable **inline entity links** (companies/schools) that open the matching artifact, plus an **artifact chip** button. Loading = 3 blinking dots. New messages animate in (`atrise` 0.28s).
- **Input**: rounded card (bg `--panel2`), textarea with a faded italic placeholder (the braggadocious suggested prompt on first load), a `$` prefix in Terminal theme, and a send button (accent, `↑`). Enter sends; Shift+Enter newline.
- **Footer line** (mono, faint): `claude.whoisalextong.com · responses are AI-generated from Alex Tong's professional profile`.

### 3. Right pane — Artifacts (bg `--panel`)
- **List mode** (no artifact open, 300px): "Artifacts" label + cards (glyph icon + title + mono meta). Order is recency-based; see Data.
- **Panel mode** (artifact open, resizable): a **drag handle** on the left edge (`cursor:ew-resize`, updates width 340–760 on drag). Header = title + mono meta + download + close (`×`) buttons. Body = a "document" card (bg `--doc-bg`) rendering that artifact's HTML.
- Artifact types: **bio** (photo + name + prose + Experience/Education rows, all entity names clickable), **company/education** (chip(s) + title + sub + optional banner image + blurb + a **source-preview card**), **case study** (chip + title + sub·years + banner + intro + bullet list + source card), **thesis** (chips + title + abstract sections + a "STILL TL;DR" callout + LinkedIn button + an "Artifact" card linking back), **timeline** (rows: date + rectangular thumbnail stacked under the date on the left, then role + linked institution + optional `EDU` pill).

### Settings modal
Fixed overlay, centered card. Two theme options (Warm Studio / Terminal) each a swatch + name + description + check on the active one. Persists to `localStorage['at-theme']`. Clicking backdrop closes.

## Interactions & Behavior
- **Send flow**: trim input → push user message → if text matches a scripted conversation's question/title, after ~420ms push the scripted answer (and open its artifact if defined); else set loading and call `/api/chat`.
- **Fresh chat on sidebar click** (clears thread + open artifact).
- **Inline entity links** and **artifact chips**: open the corresponding artifact in the right panel (event-delegated on the message/doc container via a `data-art="<id>"` attribute).
- **Source-preview card**: browser-chrome card (traffic-light dots + domain) + "Source" label + the page's real headline + "Open source ↗" — links out; the headline stays visible even if the site changes.
- **Resizable artifact panel**: mousedown on handle → track mousemove → `width = clamp(340, innerWidth - clientX, 760)`.
- **Theme switch**: swaps a full token set (see below) applied as CSS variables on the root; persisted.

## State Management
- `theme` ('warm' | 'terminal', from localStorage)
- `messages` (array of `{role:'user'|'bot', text|html, artifact?}`)
- `draft` (input text)
- `openArtifact` (artifact id | null)
- `panelWidth` (number, default 460)
- `settingsOpen`, `toolsOpen`, `loading`, `activeConvo`

## Design Tokens
Applied as CSS custom properties on the root; the whole UI reads `var(--*)`.

**Warm Studio**: `--bg:#f4f0e8` `--panel:#efe9dd` `--panel2:#fbf9f4` `--doc-bg:#ffffff` `--text:#2b2823` `--muted:#8a8378` `--faint:#a49b8b` `--accent:#c0673c` `--accent-ink:#ffffff` `--border:rgba(0,0,0,.09)` `--chip:#f0eadd` `--chip-text:#5c554c` `--active-bg:#fbf9f4` · radii `--r-sm:8px --r-md:11px --r-lg:14px` · photo-filter: none.

**Terminal**: `--bg:#14130f` `--panel:#1a1915` `--panel2:#100f0c` `--doc-bg:#1c1b16` `--text:#e8e4d8` `--muted:#9a9486` `--faint:#6f6a5c` `--accent:#f0d9a0` `--accent-ink:#14130f` `--border:rgba(255,255,255,.08)` `--chip:#26241d` `--chip-text:#c9c3b5` `--active-bg:#26241d` · radii `6/8/10` · photo-filter: `grayscale(1) sepia(.4) saturate(1.5) brightness(.92) contrast(1.05)`.

**Type**: display = **Spectral** (Warm) / IBM Plex Mono (Terminal); body = **IBM Plex Sans**; mono = **IBM Plex Mono**. (Google Fonts.)

**Data (content lives in the logic class — port as JSON/TS):**
- 5 conversations: `brag` (braggadocious summary → bio), `lego` (Current work @ Pentatonic → lego-takeback), `que` (Early-stage startups → que), `work` (Location → none), `bonn` (Formal education → thesis). Each has an exact question and a rich HTML answer.
- Artifacts (id → title/meta/content): `bio, pentatonic, lego-takeback, lego-replay, que, berkeley, bonn, fairtrade, razor, leafymade, thesis, timeline`. Rail order: `bio, pentatonic, lego-replay, lego-takeback, razor, leafymade, fairtrade, thesis, bonn, que, berkeley, timeline`.
- Tools (28), grouped: **AI & Automation** (Claude Code, ChatGPT, Hermes, OpenClaw, FinAI, N8N); **Analytics & Research** (SPSS, Tableau, Google Analytics, R, STATA); **Sales, CRM & Growth** (HubSpot, Sales Navigator, Apollo, HeyReach, Google Ads, Amazon PPC, Amazon SC, Shopify, Wix); **Productivity & Docs** (Microsoft Office, Google Workspace, Notion, Keynote, Slack, Microsoft Teams); **Project & Ops** (Jira, Linear, Monday.com, ServiceNow, Airtable, Figma, Miro, GitHub, Asana, ClickUp, Trello).
- Source links per artifact (domain + real page URL + headline) are in the artifact definitions.

## Assets
- `reference/assets/alex.jpeg` — headshot (avatar + bio). Face is upper-center; use `object-position:50% 12%`.
- `reference/assets/thumbs/*.jpeg|.png` — artifact banners + timeline thumbnails: `fairtrade, lego-takeback, lego-replay, que, razor, berkeley, bonn (UniBonn), leafymade (UIC), pentatonic (combined)`. Timeline uses Berkeley's image for the Lund University row.
- Company/tool **logos** are NOT included — text only. Add later if desired.
- No real **CV PDF** yet — "Download CV" currently opens LinkedIn; wire to a real PDF when available.

## Deployment steps
1. Scaffold Next.js app; port the three panes into components; move content to typed data files.
2. Implement `app/api/chat/route.ts` (Anthropic proxy, env key, rate limit, reuse the existing system prompt).
3. `git init`, push to personal GitHub.
4. Import repo to Vercel; set `DEEPSEEK_API_KEY` env var; deploy.
5. DNS: CNAME `claude.whoisalextong.com` → Vercel.

## Model recommendations
- **Building the codebase in Claude Code:** Sonnet (fast, strong at this port/refactor); Opus only for gnarly architecture calls.
- **Runtime chatbot:** **DeepSeek `deepseek-chat`** via the serverless proxy (OpenAI-compatible, low cost). The Q&A is grounded on a short profile, so `deepseek-chat` is plenty; no need for a reasoning model.

## Files
- `reference/Alex Tong Portfolio.dc.html` — the full design (template + logic). Read the logic class for all copy, artifact HTML, theme tokens, tools data, and chat logic.
- `reference/assets/` — headshot + thumbnails.

## Implementation status

The design has been ported to a working Next.js (App Router, TypeScript) app at the repo root — `app/`, `components/`, `context/`, `lib/`. `reference/` is kept for provenance only and is not part of the shipped build.

### Running locally
```bash
npm install
cp .env.example .env.local   # then fill in DEEPSEEK_API_KEY
npm run dev
```
Open http://localhost:3000.

### Notes on the port
- Content (conversations, artifacts, tool groups, system prompt) lives in typed files under `lib/content/` and `lib/systemPrompt.ts` — no copy is embedded in components.
- `app/api/chat/route.ts` proxies to DeepSeek (`deepseek-chat`, OpenAI-compatible), applies a simple in-memory per-IP rate limit (`lib/rateLimit.ts`), and trips a circuit breaker (`lib/deepseekCircuit.ts`) if DeepSeek reports an insufficient-balance/payment-required error — once tripped, free-form chat is disabled client-side (input greys out) and visitors are limited to the 5 scripted sidebar conversations until the account is topped up.
- Theme (Warm Studio / Terminal) persists to `localStorage` and is applied as CSS custom properties on the app root, same mechanism as the reference.
- Deploy: import the repo on Vercel, set `DEEPSEEK_API_KEY` in the project's env vars, then point the `claude.whoisalextong.com` CNAME at the Vercel deployment.
