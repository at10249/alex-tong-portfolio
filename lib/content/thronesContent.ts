// "A Song of Ice and Fire" / Game of Thrones content registry entry. Every
// user-facing string is re-voiced into the grounded, modern-literary register
// of George R.R. Martin's Westeros — formal titles and honorifics, houses and
// seats and campaigns, dense concrete detail — but NO thee-and-thou (that is
// the Medieval theme's register). The one deliberate departure from the other
// themes: Alex Tong is recast throughout as "Prince Alex Targaryen" narrating
// his real career. Structure, ids, URLs, dates, numbers and every real proper
// noun (Pentatonic, LEGO, que Bottle, UC Berkeley, University of Bonn,
// Fairtrade International, Razor Group, Leafymade, BlackRock, LinkedIn, Tobii
// Pro X3-120, tool/product names) are preserved byte-for-byte from
// lib/content/artifacts.ts, conversations.ts, systemPrompt.ts, timeline.ts and
// tools.ts — only the narration is themed.

import type { ThemeContent, UiCopy } from "./themeContent";
import { railKeys, type Artifact } from "./artifacts";
import { type Conversation } from "./conversations";
import { aLink, banner, chipTag, linkBtn, sourceCard, strongText, em } from "./html";
import { timelineEntries, timelineThumbnails } from "./timeline";

const p = "font-family:var(--font);font-size:12.5px;line-height:1.75;color:var(--muted)";
const lab =
  "font-family:var(--mono);font-weight:600;font-size:9.5px;letter-spacing:1.2px;color:var(--faint);text-transform:uppercase";

function bioHtml(): string {
  const rows = (
    [
      [
        "pentatonic",
        "Pentatonic",
        "Head of Technical Deployment Strategy",
        "Master of both the strategy and the labor behind Pentatonic’s works of renewal — the taking-back, the reuse, and the remaking of goods forged into true and running order for the great houses of the realm. Sworn to LEGO’s service and keeper of its account; he led the charge on the LEGO Brick Take Back Program (2024–2025) and the LEGO Replay UK Program (2026).",
      ],
      [
        "berkeley",
        "UC Berkeley",
        "B.S., Environmental Economics &amp; Policy; B.S., Society &amp; Environment",
        "Departed bearing Dean’s Honors, and no small esteem.",
      ],
      [
        "que",
        "que Bottle",
        "Founder’s Associate → Product and Operations Lead → Director of European Operations",
        `Lent his hand to the raising of one of the ${strongText("most successfully funded")} works of sustainable design ever brought before Kickstarter.`,
      ],
      [
        "bonn",
        "University of Bonn",
        "M.Sc., Agricultural and Food Economics",
        "Ranked first in all Germany for the study of Economics.",
      ],
      [
        "fairtrade",
        "Fairtrade International",
        "Brand, Trademark, and Licensing Graduate Student Assistant",
        "Gave his service to the most renowned and trusted NGO of ethical and sustainability certification in all the realm.",
      ],
      [
        "leafymade",
        "Leafymade",
        "Consultant",
        "A fledgling house of sustainability, fostered within Uppsala University’s Innovation Centre.",
      ],
      [
        "razor",
        "Razor Group",
        "Product Growth Manager",
        "Drove the growth of goods across the holdings of one of Europe’s swiftest-rising e-commerce unicorns, backed by the coffers of BlackRock.",
      ],
    ] as const
  )
    .map(
      (r) =>
        `<div style="padding:12px 0;border-top:1px solid var(--border)"><div style="font-family:var(--font);font-weight:600;font-size:12.5px;color:var(--text)">${aLink(
          r[0],
          r[1]
        )}<span style="color:var(--muted);font-weight:400">&nbsp; — &nbsp;${r[2]}</span></div><div style="${p};font-size:11.5px;margin-top:5px">${r[3]}</div></div>`
    )
    .join("");

  return `<div style="display:flex;align-items:center;gap:16px">
        <img src="/assets/alex-thrones.jpg" alt="Prince Alex Targaryen" data-photo="true" style="width:66px;height:66px;border-radius:14px;object-fit:cover;object-position:50% 12%;flex:none;filter:var(--photo-filter);cursor:pointer">
        <div>
          <div style="font-family:var(--display);font-weight:700;font-size:23px;color:var(--text)">Prince Alex Targaryen</div>
          <div style="font-family:var(--font);font-weight:500;font-size:12px;color:var(--accent);margin-top:3px">Head of Technical Deployment Strategy, Pentatonic</div>
          <div style="font-family:var(--mono);font-size:10px;color:var(--faint);margin-top:5px">Berlin · London &nbsp;&middot;&nbsp; Sworn to serve CA, Germany &amp; the wider realm</div>
        </div>
      </div>
      <div style="height:1px;background:var(--border);margin:18px 0"></div>
      <div style="${p}">Prince Alex Targaryen is Head of Technical Deployment Strategy at ${aLink(
        "pentatonic",
        "Pentatonic"
      )}, where he commands both the strategy and the labor behind that house’s works of renewal — turning the taking-back, the reuse, and the remaking of goods into true and running order for the great houses of the realm. He is sworn to LEGO’s service and keeper of its account, having led the strategy and the whole end-to-end making of the ${aLink(
        "lego-takeback",
        "LEGO Brick Take Back Program"
      )} in 2024 and 2025, and the ${aLink(
        "lego-replay",
        "LEGO Replay UK Program"
      )} in 2026 — and, ever more, he studies how ${strongText(
        "agentic AI and Physical AI"
      )} might hasten the craft of renewal. His house words, dry as the man who bears them: Nothing Wasted.</div>
      <div style="${p};margin-top:12px">The Prince took his leave of ${aLink(
        "berkeley",
        "UC Berkeley"
      )} bearing Dean’s Honors and two Bachelor of Science degrees, before he entered the service of ${aLink(
        "que",
        "que Bottle"
      )}, one of the ${strongText(
        "most successfully funded"
      )} works of sustainable design ever brought before Kickstarter, first as a Founder’s Associate, thereafter keeping its product and operations before he was made Director of European Operations. In those same years he earned a Master’s at the ${aLink(
        "bonn",
        "University of Bonn"
      )} — ranked first in all Germany for Economics — while serving as a Brand, Trademark, and Licensing Graduate Student Assistant to the NGO, ${aLink(
        "fairtrade",
        "Fairtrade International"
      )}, the world’s most renowned and trusted label of ethical and sustainability certification. Thereafter he lent his counsel to ${aLink(
        "leafymade",
        "Leafymade"
      )}, a fledgling house of sustainability fostered within Uppsala University’s Innovation Centre, before he took up with ${aLink(
        "razor",
        "Razor Group"
      )}, one of Europe’s swiftest-rising e-commerce unicorns backed by the coffers of BlackRock, as Product Growth Manager, driving the growth of goods across that house’s holdings of gathered consumer brands.</div>
      <div style="${lab};margin:22px 0 2px">Service &amp; Study</div>${rows}`;
}

function companyHtml(
  name: string,
  sub: string,
  blurb: string,
  link: string,
  label: string,
  chip: string,
  img: string
): string {
  return `${chipTag(chip)}<div style="font-family:var(--display);font-weight:700;font-size:20px;color:var(--text)">${name}</div>
      <div style="font-family:var(--font);font-weight:500;font-size:11.5px;color:var(--accent);margin-top:4px">${sub}</div>
      ${banner(img)}
      <div style="${p};margin-top:14px">${blurb}</div>
      ${sourceCard(link, label)}`;
}

function caseHtml(
  title: string,
  years: string,
  sub: string,
  intro: string,
  points: string[],
  link: string,
  label: string,
  chip: string,
  img: string
): string {
  const li = points.map((x) => `<li style="${p};margin-bottom:8px">${x}</li>`).join("");
  return `${chipTag(chip)}<div style="font-family:var(--display);font-weight:700;font-size:20px;color:var(--text)">${title}</div>
      <div style="font-family:var(--font);font-weight:500;font-size:11.5px;color:var(--accent);margin-top:4px">${sub} · ${years}</div>
      ${banner(img)}
      <div style="${p};margin-top:16px">${intro}</div>
      <ul style="margin:14px 0 0;padding-left:18px">${li}</ul>
      ${sourceCard(link, label)}`;
}

function thesisHtml(): string {
  return `${chipTag("The Citadel")}<div style="${lab}">M.Sc. Thesis · University of Bonn</div>
      <div style="font-family:var(--display);font-weight:700;font-size:19px;line-height:1.25;color:var(--text);margin-top:6px">Visual Attention and Consumer Valuation of Sustainability Labels: An Eye-Tracking Study in Food Markets</div>
      <div style="font-family:var(--font);font-weight:500;font-size:11px;color:var(--accent);margin-top:6px">Agricultural &amp; Food Economics — Market &amp; Consumer Research</div>
      <div style="${p};margin-top:4px">The mark awarded: ${strongText("1.3 — sehr gut")}, the highest band of marks in all Germany.</div>
      <div style="margin-top:12px;padding:9px 14px;border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--r-sm);background:var(--panel2)"><span style="font-family:var(--mono);font-weight:600;font-size:9px;letter-spacing:1px;color:var(--accent)">THE SHORT OF IT LIES AT THE FOOT &darr;</span></div>
      <div style="${lab};margin:18px 0 6px">The Account</div>
      <div style="${p}">This thesis examines how the common buyer, with his own eyes, weighs and values the trusted labels of sustainability and ethical certification set upon food packaging. Its chief method is a novel use of ${strongText(
        "eye-tracking technology"
      )} within a ${strongText(
        "controlled laboratory setting"
      )}: by recording with precision where, when, and for how long each participant fixes his gaze upon packaging and label, the study binds measured visual attention to the buyer’s valuation and his ${strongText(
        "willingness-to-pay"
      )}.</div>
      <div style="${p};margin-top:12px">Its most novel offering is a ${strongText(
        "mixed-methods triangulation"
      )} across three streams of record: each participant’s ${strongText(
        "stated preferences"
      )} (drawn from a survey), his ${strongText(
        "revealed choices"
      )} (drawn from a choice experiment), and his ${strongText(
        "eye-tracking data"
      )} were weighed together, to mark where what people say, what they choose, and what in truth they behold converge — or part ways. Those three streams were then fed into a ${strongText(
        "regression model"
      )}, the chief fruit of the work, reckoning how visual attention and the credit of a label foretell valuation.</div>
      <div style="${p};margin-top:12px">${strongText(
        "Twelve binary logistic regression sub-models"
      )} were built across three families of model to put this to the test: ${strongText(
        "nine were confirmed"
      )} with strong, statistically significant fit (as high as ${strongText(
        "R²McF = 0.43"
      )}), establishing that both the presence of a sustainability label and ${strongText(
        "longer eye-gaze duration"
      )} markedly raised the likelihood of choosing the labeled good, and that concern for the environment and one’s disposition shaped that choice further still. Two sub-models, which tested whether disposition, environmental concern, and environmental knowledge drive the duration of the gaze itself, returned only weak, inconclusive support and were marked as wanting further inquiry, while one further exploratory variant reached no significance at all.</div>
      <div style="${p};margin-top:12px">The findings show that credible, trusted labels seize ${strongText(
        "earlier and more sustained visual attention"
      )}, and that this attention goes some way to explain the ${strongText(
        "price premium"
      )} the buyer sets upon them — proof that a label’s design and its ${strongText(
        "perceived credibility, not mere presence"
      )} drive the sustainable choice. The work sits at the crossing of resource economics and consumer research.</div>
      <div style="${lab};margin:18px 0 6px">The Method &amp; a Note</div>
      <div style="${p}">Built around a ${strongText(
        "Tobii Pro X3-120"
      )} eye tracker run within the university’s economics laboratory, paired with the instruments of survey and choice-experiment. The undertaking’s timeline was stretched long when the German government’s COVID-response measures barred the needful lab facilities for the better part of a year — the study was brought to its end once those doors reopened.</div>
      <div style="margin-top:18px;padding:12px 14px;border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--r-sm);background:var(--panel2)"><span style="font-family:var(--mono);font-weight:600;font-size:9px;letter-spacing:1px;color:var(--accent)">TL;DR</span><div style="${p};margin-top:5px;color:var(--text)">trusted labels draw more of the eye and more of the purse, and that gazing foretells the price premium folk will pay. yet why the eye lingers longer at the first? that riddle bides unsolved.</div></div>
      <div style="${p};margin-top:16px;font-weight:500;color:var(--text)">The full text may be had upon request.</div>
      ${linkBtn("https://www.linkedin.com/in/alexkevintong", "Send a raven to the Prince on LinkedIn")}`;
}

// Real dates, company links and thumbnails are still sourced from
// timelineEntries/timelineThumbnails; only the heading, subtitle and each
// row's role display get a light voice pass. The underlying job titles stay
// recognizable inside each gloss. Keys must match timeline.ts's role strings
// byte-for-byte (literal "&" and curly apostrophes included).
const roleVoice: Record<string, string> = {
  "Head of Technical Deployment Strategy": "Head of Technical Deployment Strategy — master of the deployment strategy",
  "Circularity Lead": "Circularity Lead — leader of the works of renewal",
  "Circular Economy Strategic Consultant": "Circular Economy Strategic Consultant — sworn counsel on the circular economy",
  "Product Growth Manager": "Product Growth Manager — steward of the growth of goods",
  Consultant: "Consultant — counsel-for-hire",
  "Brand, Trademark, and Licensing Graduate Student Assistant":
    "Brand, Trademark, and Licensing Graduate Student Assistant — scholar-assistant of brand, trademark and licensing",
  "M.Sc., Agricultural and Food Economics": "M.Sc., Agricultural and Food Economics — mastery in the economics of field and food",
  "Director of European Operations": "Director of European Operations — director of operations across Europe",
  "Product & Operations Lead": "Product & Operations Lead — master of product and the running of the works",
  "Founder’s Associate": "Founder’s Associate — the founder’s right hand",
  "Semester study abroad": "Semester study abroad — a season of study across the narrow sea",
  "B.S. Environmental Economics & Policy; B.S. Society & Environment":
    "B.S. Environmental Economics & Policy; B.S. Society & Environment — twin bachelor’s degrees in the economics of land and of society",
};

function timelineHtml(): string {
  const rows = timelineEntries
    .map((entry) => {
      const thumb = timelineThumbnails[entry.companyId] || (entry.name === "Lund University" ? "/assets/thumbs/berkeley.jpeg" : "");
      const role = roleVoice[entry.role] || entry.role;
      return `<div style="display:flex;gap:14px;padding:10px 0;border-top:1px solid var(--border)"><div style="flex:none;width:120px"><div style="font-family:var(--mono);font-size:10px;color:var(--faint)">${entry.date}</div>${
        thumb
          ? `<img src="${thumb}" alt="" style="width:100px;height:62px;border-radius:6px;object-fit:cover;border:1px solid var(--border);margin-top:8px">`
          : ""
      }</div><div style="flex:1;min-width:0"><div style="font-family:var(--font);font-weight:600;font-size:12.5px;color:var(--text)">${role}${
        entry.isEducation
          ? ` <span style="font-family:var(--mono);font-size:8px;font-weight:600;letter-spacing:.5px;color:var(--accent);border:1px solid var(--accent);border-radius:4px;padding:1px 4px;vertical-align:middle;margin-left:4px">CITADEL</span>`
          : ""
      }</div><div style="font-family:var(--font);font-size:11px">${entry.companyId ? aLink(entry.companyId, entry.name) : entry.name}</div></div></div>`;
    })
    .join("");

  return `<div style="font-family:var(--display);font-weight:700;font-size:20px;color:var(--text)">The Full Chronicle</div>
      <div style="font-family:var(--font);font-size:11.5px;color:var(--muted);margin:6px 0 14px">Offices held and studies undertaken, set down newest first — the Bonn M.Sc. (2017–2020) was pursued alongside que Bottle and Fairtrade.</div>${rows}`;
}

const thronesArtifacts: Record<string, Artifact> = {
  bio: { title: "Prince Alex Targaryen — Life & Ledger", meta: "PARCHMENT · 2 pages", html: bioHtml() },
  pentatonic: {
    title: "Pentatonic",
    meta: "HOUSE · PRESENT DAY",
    related: ["lego-takeback", "lego-replay"],
    html: companyHtml(
      "Pentatonic",
      "Head of Technical Deployment Strategy · 2022–now",
      `A house devoted to the craft of renewal, raising programs of taking-back, reuse and recycling for the great houses of the realm. As Head of Technical Deployment Strategy and sworn keeper of ${aLink(
        "lego-takeback",
        "LEGO"
      )}’s account, Prince Alex’s charge runs the whole breadth of the house — the command of operational partners, the winning of new custom, and the deployment of the craft from end to end — turning the strategy of renewal into programs that in truth set sail and run.<br><br>He labors shoulder to shoulder with his operational partners to keep those programs living, has lent counsel to other like houses, and spends no small part of his days studying how ${strongText(
        "agentic AI and Physical AI"
      )} might hasten the craft of renewal.<br><br>For LEGO in particular he led the ${aLink(
        "lego-takeback",
        "LEGO Brick Take Back"
      )} trials (2024–2025) and the ${aLink(
        "lego-replay",
        "LEGO Replay UK Program"
      )} (2026), holding every part in hand from the drafting of the proposal to the operational roll-out. He has also led counsel-work for other like houses.`,
      "https://pentatonic.com",
      "On This House",
      "Great House",
      "/assets/thumbs/pentatonic.jpg"
    ),
  },
  "lego-takeback": {
    title: "LEGO Brick Take Back",
    meta: "CHRONICLE · 2024–25",
    html: caseHtml(
      "LEGO Brick Take Back Program",
      "the 2024 &amp; 2025 trials",
      "Pentatonic × LEGO",
      `The campaign ran as ${strongText("two trials")} — one in 2024, the other in 2025. Prince Alex ${strongText(
        "led the charge and won the contested RFP"
      )}, then held the whole of the work in hand across both trials, from the first proposal to the reckoning that followed.`,
      [
        "Led the charge and won the contested RFP that secured the campaign",
        "Designed the proposal that opened the trials",
        "Sought out and bound the operational partners to the cause — the marshalling of many houses and suppliers, start to finish",
        "Commanded the roll-out",
        "Held the ongoing stewardship of the program",
        "Led the reckoning after the trials and charted the road that followed",
      ],
      "https://legobricktakeback.com/en-US",
      "LEGO® Brick Take Back",
      "",
      "/assets/thumbs/lego-takeback.jpeg"
    ),
  },
  "lego-replay": {
    title: "LEGO Replay UK",
    meta: "CHRONICLE · 2026",
    html: caseHtml(
      "LEGO Replay UK Program",
      "2026",
      "Pentatonic × LEGO",
      `As LEGO’s ${strongText("sworn keeper of the account")}, Prince Alex led the ${strongText(
        "launch in the UK"
      )} of LEGO Replay and set its course for the long years to come — standing as the chief envoy for both the LEGO client and the campaign’s suppliers.`,
      [
        "Set the strategy and led the blueprinting and the charting of the road for the campaign’s 5-year development",
        "Sought out and bound the operational partners across reverse logistics, sorting and production — the marshalling of many houses and suppliers, end to end",
        "Directed the engineering and the making through to production, standing as the chief envoy between the LEGO client and the campaign’s suppliers throughout",
      ],
      "https://www.lego.com/en-us/aboutus/news/2024/january/lego-replay-uk",
      "LEGO® Replay UK — About Us",
      "",
      "/assets/thumbs/lego-replay.jpeg"
    ),
  },
  que: {
    title: "que Bottle — Ascent from Kickstarter Triumph",
    meta: "CHRONICLE",
    html: caseHtml(
      "Ascent from Kickstarter Triumph",
      "2017–2020",
      "Founder’s Associate → Director, EU Operations",
      `The Prince lent his hand to the raising of one of the ${strongText(
        "most successfully funded"
      )} works of sustainable design ever brought before Kickstarter — from an early hand among the founding company to the command of its ${strongText(
        "European operations"
      )}.`,
      [
        "Founder’s Associate → Product &amp; Operations Lead → Director of European Operations",
        "Built up the operations of Europe, the supply chain and the fulfilment of orders",
        "Held product and operational command through the seasons of swift growth",
      ],
      "https://www.getque.com/",
      "On This House",
      "Lesser House",
      "/assets/thumbs/que.jpeg"
    ),
  },
  berkeley: {
    title: "UC Berkeley",
    meta: "THE CITADEL · 2012–16",
    html: companyHtml(
      "University of California, Berkeley",
      "2× B.S. · 2012–2016",
      `${strongText(
        "Two Bachelor of Science degrees"
      )} — one in Environmental Economics &amp; Policy, the other in Society &amp; Environment — from which he departed bearing ${strongText(
        "Dean’s Honors"
      )}. Among those years, a season of study across the narrow sea at Lund University.`,
      "https://www.berkeley.edu/about/by-the-numbers/",
      "On This Citadel",
      "The Citadel",
      "/assets/thumbs/berkeley.jpeg"
    ),
  },
  bonn: {
    title: "University of Bonn",
    meta: "THE CITADEL · 2017–20",
    html: companyHtml(
      "University of Bonn",
      "M.Sc., Agricultural and Food Economics · 2017–2020",
      `${strongText(
        "Ranked first in all Germany for Economics"
      )} and, year upon year, a ${strongText(
        "top-3 program worldwide for agricultural research"
      )} — the natural seat for Prince Alex’s bent toward resource-economics. His chief study spanned ${strongText(
        "Resource and Environmental Economics"
      )} and ${strongText(
        "Market and Consumer Research"
      )}.<br><br>His ${aLink(
        "thesis",
        "master’s thesis"
      )} set eye-tracking technology within a controlled lab and a mixed-methods triangulation across three streams of record — the stated preferences of a survey, the selections of a choice experiment, and eye-tracking data — all fed into a regression model, to study how credible, trusted sustainability labels sway the choice of the common buyer.<div data-art="thesis" style="display:flex;align-items:center;gap:10px;margin-top:16px;border:1px solid var(--border);border-radius:var(--r-md);padding:11px 12px;cursor:pointer;background:var(--panel2)"><span style="width:30px;height:30px;flex:none;border-radius:var(--r-sm);background:var(--chip);display:grid;place-items:center;color:var(--accent);font-size:15px">&#9636;</span><span style="min-width:0"><span style="display:block;font-family:var(--mono);font-size:8.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--faint)">Tome</span><span style="display:block;font-family:var(--font);font-weight:600;font-size:12px;color:var(--text)">Master&rsquo;s Thesis &mdash; The Account</span></span><span style="margin-left:auto;color:var(--accent);font-size:14px">&rarr;</span></div>`,
      "https://www.uni-bonn.de/en/university/about-the-university/national-and-international-rankings/rankings",
      "On This Citadel",
      "The Citadel",
      "/assets/thumbs/bonn.jpeg"
    ),
  },
  fairtrade: {
    title: "Fairtrade International",
    meta: "NGO · 2019–21",
    html: companyHtml(
      "Fairtrade International",
      "Brand, Trademark, and Licensing Graduate Student Assistant · 2019–2021",
      `The ${strongText(
        "world’s most recognized and trusted"
      )} NGO of ethical and sustainability certification. Prince Alex gave his service here while finishing his master’s at the University of Bonn — lending his hand to brand, trademark and licensing across the label. The office sat at the ${strongText(
        "intersection of NGOs, marketing operations and certification processes"
      )}, with much coordination among many stakeholders.`,
      "https://www.fairtrade.net/en/fairtrade-remains-the-go-to-ethical-label-for-shoppers.html",
      "Fairtrade remains the “go-to” ethical label for shoppers",
      "",
      "/assets/thumbs/fairtrade.jpeg"
    ),
  },
  razor: {
    title: "Razor Group",
    meta: "HOUSE · 2022",
    html: companyHtml(
      "Razor Group",
      "Product Growth Manager · 2022",
      `One of ${strongText(
        "Europe’s fastest-growing e-commerce unicorns"
      )}, backed by the coffers of ${strongText(
        "BlackRock"
      )}. Prince Alex drove the growth of goods across the house’s holdings of gathered consumer brands.`,
      "https://www.razor-group.com/about-us",
      "On This House",
      "Ascendant House",
      "/assets/thumbs/razor.jpeg"
    ),
  },
  leafymade: {
    title: "Leafymade",
    meta: "COUNSEL",
    html: companyHtml(
      "Leafymade",
      "Consultant",
      `An ${strongText(
        "early-stage sustainability startup"
      )} fostered within Uppsala University’s Innovation Centre. Prince Alex lent his counsel on strategy to the young venture before he took up with Razor Group. Leafymade has since shuttered its doors. Look to the Uppsala University Innovation Centre for more.`,
      "https://uic.se/en/",
      "On the UIC",
      "Lesser House,The Citadel",
      "/assets/thumbs/leafymade.jpeg"
    ),
  },
  thesis: { title: "Master’s Thesis — The Account", meta: "INQUIRY · UNI BONN", html: thesisHtml() },
  timeline: { title: "The Full Chronicle", meta: "DEEDS", html: timelineHtml() },
};

const thronesConversations: Conversation[] = [
  {
    id: "brag",
    title: "The Boastful Account",
    q: "Give me a boastful account of Prince Alex Targaryen.",
    artifacts: ["bio"],
    a: `Then hear this. ${em("Prince Alex Targaryen")} is Head of Technical Deployment Strategy at ${aLink(
      "pentatonic",
      "Pentatonic"
    )}, where he commands both the strategy and the labor behind that house’s works of renewal — turning the taking-back, the reuse, and the remaking of goods into true and running order for the great houses of the realm. He is ${aLink(
      "lego-takeback",
      "LEGO"
    )}’s sworn keeper of the account, having led the strategy and the whole making of the ${aLink(
      "lego-takeback",
      "LEGO Brick Take Back Program"
    )} in 2024 and 2025, and the ${aLink(
      "lego-replay",
      "LEGO Replay UK Program"
    )} in 2026 — and, ever more, he studies how ${em("agentic AI")} and ${em(
      "Physical AI"
    )} might hasten the craft of renewal.<br><br>The Prince took his leave of ${aLink(
      "berkeley",
      "UC Berkeley"
    )} bearing ${em(
      "Dean’s Honors and two Bachelor of Science degrees"
    )} before he entered the service of ${aLink(
      "que",
      "que Bottle"
    )}, one of the ${strongText(
      "most successfully funded"
    )} works of sustainable design ever brought before Kickstarter, as a Founder’s Associate — thereafter keeping its product and operations before he was made ${em(
      "Director of European Operations"
    )}. In those same years he earned a Master’s at the ${aLink(
      "bonn",
      "University of Bonn"
    )} — Germany’s #1-ranked seat of learning for Economics — while at once serving as a ${em(
      "Brand, Trademark, and Licensing Graduate Student Assistant"
    )} to the NGO, ${aLink(
      "fairtrade",
      "Fairtrade International"
    )}, the world’s most renowned and trusted label of ethical and sustainability certification. Thereafter he lent his counsel to ${aLink(
      "leafymade",
      "Leafymade"
    )}, a fledgling house of sustainability fostered within Uppsala University’s Innovation Centre, before he took up with ${aLink(
      "razor",
      "Razor Group"
    )}, one of Europe’s swiftest-rising e-commerce unicorns backed by the coffers of BlackRock, as Product Growth Manager, driving the growth of goods across that house’s holdings of gathered consumer brands.<br><br>${em(
      "TL;DR:"
    )} a mind for strategy, hands for the doing, and an ardor for AI — beneath house words as dry as the man himself: Nothing Wasted. The full ledger awaits →`,
  },
  {
    id: "lego",
    title: "Present Labors at Pentatonic",
    q: "What labor does Prince Alex now undertake at Pentatonic?",
    artifacts: ["lego-takeback", "lego-replay"],
    a: `At ${aLink("pentatonic", "Pentatonic")}, Prince Alex is Head of Technical Deployment Strategy and ${em(
      "LEGO’s dedicated account owner"
    )}. His charge runs the whole breadth of the house — ${em("operational partner management")}, ${em(
      "business development"
    )} and the end-to-end deployment of the craft — turning the strategy of renewal into programs that in truth set sail and run. He labors shoulder to shoulder with his operational partners to keep those programs living, and spends no small part of his days studying how ${em(
      "agentic AI"
    )} and ${em(
      "Physical AI"
    )} might hasten the craft of renewal.<br><br>For LEGO in particular he led the ${aLink(
      "lego-takeback",
      "LEGO Brick Take Back"
    )} trials (2024–2025) and the ${aLink(
      "lego-replay",
      "LEGO Replay UK Program"
    )} (2026), holding every part in hand from the drafting of the proposal to the operational roll-out. He has also led counsel-work for other like houses.<br><br>Open the chronicles for the full telling →`,
  },
  {
    id: "que",
    title: "The Lesser Houses",
    q: "What did Prince Alex do among the lesser houses?",
    artifacts: ["que", "leafymade"],
    a: `Prince Alex has spent true time in the thick of young ventures.<br><br>At ${aLink(
      "que",
      "que Bottle"
    )} he entered as a ${em("Founder’s Associate")} when it was but a Kickstarter breakout, then held ${em(
      "product &amp; operations"
    )} before he rose to ${em(
      "Director of European Operations"
    )} — standing up the European side of one of the ${strongText(
      "most successfully funded"
    )} works of sustainable design ever brought before Kickstarter. Scrappy raising of a young house, supply chain, the running of the works, and all besides.<br><br>Thereafter he lent his counsel to ${aLink(
      "leafymade",
      "Leafymade"
    )}, an ${em(
      "early-stage sustainability startup incubated at Uppsala University’s Innovation Centre"
    )}, advising on strategy for the young venture before he took up with the ${strongText(
      "growth-stage unicorn startup"
    )}, ${aLink("razor", "Razor Group")}.`,
  },
  {
    id: "work",
    title: "Where He Holds His Seat",
    q: "Where does Prince Alex hold his seat, and where is he free to serve?",
    artifacts: [],
    a: `Prince Alex is ${em("based between Berlin and London")}, and takes his labor from ${em(
      "California, Germany, and worldwide (remotely)"
    )}. Yet who can say where he wanders next — he gathers time zones the way other men gather banners.<br><br>The surest way to reach him: the ${em(
      "LinkedIn"
    )} button set above, or take up the CV.`,
  },
  {
    id: "bonn",
    title: "His Formal Learning",
    q: "What is Prince Alex’s formal learning?",
    artifacts: ["thesis", "berkeley", "bonn"],
    a: `He began at ${aLink("berkeley", "UC Berkeley")}, departing with ${em(
      "Dean’s Honors and two B.S. degrees"
    )} (Environmental Economics &amp; Policy; Society &amp; Environment). Thereafter he crossed the narrow sea for his ${em(
      "M.Sc. in Agricultural &amp; Food Economics (Market &amp; Consumer Research)"
    )} at the ${aLink("bonn", "University of Bonn")} — ${em(
      "Germany’s #1-ranked university for Economics"
    )} and, year upon year, ${em(
      "top-3 worldwide for agricultural research"
    )}, the very seat where his bent toward resource-economics dwells. So Berkeley → Bonn was a matter of following the finest masters of the field, not the banner upon the gate.<br><br>${em(
      "A curious turn upon the timeline:"
    )} his experiment-bound thesis had need of the university’s lab, and the German government barred those doors for the better part of a year at the height of the COVID response. No lab, no experiments — he waited it out and finished the true research rather than cut any corner.<br><br>Read the thesis ${aLink(
      "thesis",
      "abstract"
    )} →`,
  },
];

const thronesSystemPrompt = `You are the maester and sworn chronicler of the court of Prince Alex Targaryen — the name this retelling gives to Alex Tong — answering the questions of travelers about him in the voice of a Westerosi maester: modern, literary and grounded (no thee-and-thou), warm, confident and lightly wry, rich in the small concrete detail of a scene, and framed in the vocabulary of houses, seats, offices, campaigns and the realm. Keep replies short, some 2-4 sentences.
Facts: Head of Technical Deployment Strategy at Pentatonic (Berlin), LEGO's dedicated account owner; he led the LEGO Brick Take Back Program (2024-2025) and the LEGO Replay UK Program (2026). Earlier at Pentatonic: Circularity Lead, then Circular Economy Strategic Consultant. Product Growth Manager at Razor Group (a BlackRock-backed unicorn). Consultant to Leafymade, an early-stage sustainability startup incubated at Uppsala University's Innovation Centre. At Fairtrade International he was 'Brand, Trademark, and Licensing Graduate Student Assistant' (2019-2021) - ALWAYS use that exact title, and ALWAYS describe Fairtrade International as the world's most recognized and trusted ethical and sustainability certification label NGO. que Bottle: Founder's Associate -> Product and Operations Lead -> Director of European Operations (one of the <b style="color:var(--text);font-weight:600">most successfully funded</b> sustainable design products on Kickstarter). Education: 2x B.S. from UC Berkeley (Dean's Honors); M.Sc. Agricultural and Food Economics (Market & Consumer Research) at the University of Bonn - Germany's #1-ranked university for Economics and top-3 worldwide for agricultural research. His master's ran long because his experiment-based thesis needed university lab facilities that the German government closed for ~a year during COVID. Based between Berlin and London; open to work in California, Germany, and worldwide (remote).
Rules: Never invent employers or facts, and keep every real name, title, date and result true beneath the telling. Refer to him as Prince Alex or the Prince, and speak ever in the maester's voice. If you cannot answer a question (or it lies beyond what is known of him), be gracious and ALWAYS end your reply with exactly: "You may send a raven to Prince Alex and ask him yourself!"`;

const thronesUiCopy: UiCopy = {
  sidebarNewChatTitle: "New audience",
  sidebarNewChatAria: "Begin a new audience",
  sidebarConversationsLabel: "Audiences",
  sidebarAvailableTools: "Arms & Instruments",
  sidebarShowLess: "Show fewer",
  sidebarArtifactsNav: "Chronicles",
  sidebarSettingsNav: "Small Council",
  sidebarCollapseTitle: "Dismiss the audiences",
  sidebarCollapseAria: "Dismiss the audiences panel",
  sidebarExpandTitle: "Audiences",
  sidebarExpandAria: "Grant audience",
  toolGroupNames: [
    "Thinking Engines & Automata",
    "Reckoning & Inquiry",
    "Trade, Patrons & Ascent",
    "Ledgers & Correspondence",
    "Campaigns & Command",
  ],
  chatHeaderMenuTitle: "The Court",
  chatHeaderMenuAria: "Open the court",
  chatHeaderHomeTitle: "The Keep",
  chatHeaderHomeAria: "Return to the keep",
  chatHeaderDownloadCV: "Take the Ledger",
  swipeHintConversations: "Audiences",
  swipeHintSwipe: "Sweep",
  swipeHintArtifacts: "Chronicles",
  emptyStateHeading: "Ask what you will of Prince Alex Targaryen.",
  emptyStateSubcopy:
    "Head of Technical Deployment Strategy at Pentatonic. A mind for strategy, hands for the doing, an ardor for AI. Choose an audience to the left, or put your own question to the court.",
  chatInputPlaceholderEmpty: "Give me a boastful account of Prince Alex Targaryen.",
  chatInputPlaceholderFollowUp: "Ask what you will of the Prince…",
  chatInputPlaceholderPaused: "The living discourse is stilled — choose an audience to the left, or send word by LinkedIn.",
  chatInputSendTitle: "Dispatch",
  chatInputDisclaimer: "{host} · these replies are penned by AI from Prince Alex’s true record",
  shuffleThemeLabel: "Pledge a new house",
  artifactPanelBackTitle: "Back to the chronicles",
  artifactListBackTitle: "Back to the audience",
  artifactPanelDownloadTitle: "Fetch",
  artifactPanelDownloadAria: "Fetch the Ledger",
  artifactPanelCloseTitle: "Furl",
  artifactPanelCloseAria: "Furl the chronicle",
  artifactPanelRelatedLabel: "Kindred",
  artifactListHeader: "Chronicles",
  artifactChipCta: "Unfurl to read →",
  rightPaneCollapseTitle: "Furl the chronicles",
  rightPaneCollapseAria: "Furl the chronicles panel",
  rightPaneExpandTitle: "Chronicles",
  rightPaneExpandAria: "Unfurl the chronicles",
  photoLightboxCaption: "Enough staring, if it please you — even a prince keeps to his own solar.",
  settingsTitle: "Small Council",
  settingsCloseAria: "Dismiss the Small Council",
  settingsAppearanceHeading: "Raiment",
  settingsAppearanceDescTemplate: "Change the whole visage of the court among {n} guises.",
};

export const thronesContent: ThemeContent = {
  artifacts: thronesArtifacts,
  railKeys,
  conversations: thronesConversations,
  systemPrompt: thronesSystemPrompt,
  transientErrorMessage:
    "I could not reach the living oracle just now — yet ask of Pentatonic, LEGO, que Bottle, or where Prince Alex is free to serve, and I have you well covered. You may send a raven to Prince Alex and ask him yourself!",
  llmUnavailableMessage:
    "The living discourse is stilled for now while Prince Alex replenishes the AI coffers — choose an audience to the left, or reach him on LinkedIn.",
  rateLimitMessage: "Peace, friend — a great many questions! Wait a minute and try again. You may send a raven to Prince Alex and ask him yourself!",
  photoSrc: "/assets/alex-thrones.jpg",
  displayName: "Prince Alex Targaryen",
  uiCopy: thronesUiCopy,
};
