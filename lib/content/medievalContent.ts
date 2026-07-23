// Medieval-voice content registry entry. Every user-facing string is
// re-voiced into a grounded, archaic "Old English"-adjacent register in the
// spirit of Kingdom Come Deliverance (15th-century Bohemia — no fantasy,
// no magic). Structure, ids, URLs, dates, numbers and proper nouns are
// preserved byte-for-byte from lib/content/artifacts.ts, conversations.ts,
// systemPrompt.ts, timeline.ts and tools.ts — only the narration is themed.

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
        "Master of the stratagem and the doing alike behind Pentatonic’s works of renewal — the taking-back, the reuse, and the making-anew of wares wrought into true and running order for the great houses of the realm. LEGO®’s sworn steward and keeper of its account; he led the charge upon the LEGO® Brick Take Back Program (2024–2025) and the LEGO® Replay UK Program (2026).",
      ],
      [
        "berkeley",
        "UC Berkeley",
        "B.S., Environmental Economics &amp; Policy; B.S., Society &amp; Environment",
        "Departed bearing Dean’s Honors, held in high regard.",
      ],
      [
        "que",
        "que Bottle",
        "Founder’s Associate → Product and Operations Lead → Director of European Operations",
        `Lent his hand to the raising of one of the ${strongText("most successfully funded")} wares of sustainable design ever set upon Kickstarter.`,
      ],
      [
        "bonn",
        "University of Bonn",
        "M.Sc., Agricultural and Food Economics",
        "The #1-ranked seat of learning in all Germany for Economics.",
      ],
      [
        "fairtrade",
        "Fairtrade International",
        "Brand, Trademark, and Licensing Graduate Student Assistant",
        "Served the world’s most renowned and trusted NGO of ethical and sustainability certification.",
      ],
      [
        "leafymade",
        "Leafymade",
        "Consultant",
        "A fledgling house of sustainability, nurtured within Uppsala University’s Innovation Centre.",
      ],
      [
        "razor",
        "Razor Group",
        "Product Growth Manager",
        "Drove the growth of wares across the holdings of one of Europe’s swiftest-rising e-commerce unicorns, backed by the coffers of BlackRock.",
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
        <img src="/assets/alex-medieval.jpg" alt="Sir Alex Tong" data-photo="true" style="width:66px;height:66px;border-radius:14px;object-fit:cover;object-position:50% 12%;flex:none;filter:var(--photo-filter);cursor:pointer">
        <div>
          <div style="font-family:var(--display);font-weight:700;font-size:23px;color:var(--text)">Sir Alex Tong</div>
          <div style="font-family:var(--font);font-weight:500;font-size:12px;color:var(--accent);margin-top:3px">Head of Technical Deployment Strategy, Pentatonic</div>
          <div style="font-family:var(--mono);font-size:10px;color:var(--faint);margin-top:5px">Berlin · London &nbsp;&middot;&nbsp; At liberty for CA, Germany &amp; from afar</div>
        </div>
      </div>
      <div style="height:1px;background:var(--border);margin:18px 0"></div>
      <div style="${p}">Sir Alex Tong is Head of Technical Deployment Strategy at ${aLink(
        "pentatonic",
        "Pentatonic"
      )}, where he doth command both the stratagem and the labour behind that house’s works of renewal — turning the taking-back, the reuse, and the making-anew of wares into true and running order for the great houses of the realm. He is LEGO®’s sworn steward and keeper of its account, having led the charge upon the whole doing of the ${aLink(
        "lego-takeback",
        "LEGO® Brick Take Back Program"
      )} in 2024 and 2025, and the ${aLink(
        "lego-replay",
        "LEGO® Replay UK Program"
      )} in 2026 — and, ever more, he doth study how ${strongText(
        "agentic AI and Physical AI"
      )} might hasten the craft of renewal.</div>
      <div style="${p};margin-top:12px">Alex took his leave of ${aLink(
        "berkeley",
        "UC Berkeley"
      )} bearing Dean’s Honors and two Bachelor of Science degrees, ere he took service with ${aLink(
        "que",
        "que Bottle"
      )}, one of the ${strongText(
        "most successfully funded"
      )} wares of sustainable design ever set upon Kickstarter, first as a Founder’s Associate, thereafter keeping its product and operations before serving as Director of European Operations. In those same years he did earn a Master’s at the ${aLink(
        "bonn",
        "University of Bonn"
      )} — Germany’s #1-ranked seat of learning for Economics — whilst serving as a Brand, Trademark, and Licensing Graduate Student Assistant to the NGO, ${aLink(
        "fairtrade",
        "Fairtrade International"
      )}, the world’s most renowned and trusted label of ethical and sustainability certification. Thereafter he lent his counsel to ${aLink(
        "leafymade",
        "Leafymade"
      )}, a fledgling house of sustainability nurtured within Uppsala University’s Innovation Centre, ere he took up with ${aLink(
        "razor",
        "Razor Group"
      )}, one of Europe’s swiftest-rising e-commerce unicorns backed by the coffers of BlackRock, as Product Growth Manager, driving the growth of wares across that house’s holdings of gathered consumer brands.</div>
      <div style="${lab};margin:22px 0 2px">Service &amp; Schooling</div>${rows}`;
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
  return `${chipTag("Scholarship")}<div style="${lab}">M.Sc. Treatise · University of Bonn</div>
      <div style="font-family:var(--display);font-weight:700;font-size:19px;line-height:1.25;color:var(--text);margin-top:6px">Visual Attention and Consumer Valuation of Sustainability Labels: An Eye-Tracking Study in Food Markets</div>
      <div style="font-family:var(--font);font-weight:500;font-size:11px;color:var(--accent);margin-top:6px">Agricultural &amp; Food Economics — Market &amp; Consumer Research</div>
      <div style="${p};margin-top:4px">The mark awarded: ${strongText("1.3 — sehr gut")}, the highest band of marks in all Germany.</div>
      <div style="margin-top:12px;padding:9px 14px;border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--r-sm);background:var(--panel2)"><span style="font-family:var(--mono);font-weight:600;font-size:9px;letter-spacing:1px;color:var(--accent)">THE SHORT OF IT LIES BELOW &darr;</span></div>
      <div style="${lab};margin:18px 0 6px">The Summation</div>
      <div style="${p}">This treatise examineth how the common buyer doth, with his very eyes, weigh and value the trusted labels of sustainability and ethical certification set upon food packaging. Its chief method is a novel use of ${strongText(
        "eye-tracking technology"
      )} within a ${strongText(
        "controlled laboratory setting"
      )}: by setting down with precision where, when, and for how long the participants fix their gaze upon packaging and label, the study binds the measured attention of the eye unto the buyer’s valuation and his ${strongText(
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
      )} were weighed together, to mark where what folk say, what they choose, and what in truth they behold do meet — or part ways. These three streams were then fed unto a ${strongText(
        "regression model"
      )}, the chief fruit of the labour, reckoning how the attention of the eye and the credit of a label foretell valuation.</div>
      <div style="${p};margin-top:12px">${strongText(
        "Twelve binary logistic regression sub-models"
      )} were wrought across three families of model to put this to the test: ${strongText(
        "nine were confirmed"
      )} with strong and statistically significant fit (as high as ${strongText(
        "R²McF = 0.43"
      )}), proving that both the presence of a sustainability label and ${strongText(
        "longer eye-gaze duration"
      )} did markedly raise the likelihood of choosing the labelled ware, and that concern for the environment and one’s disposition shaped that choice yet further. Two sub-models, which tested whether disposition, environmental concern, and environmental knowledge drive the duration of the gaze itself, yielded but weak and inconclusive support and were marked as wanting further inquiry, whilst one further exploratory variant reached no significance at all.</div>
      <div style="${p};margin-top:12px">The findings show that credible, trusted labels do seize ${strongText(
        "earlier and more sustained visual attention"
      )}, and that this attention goeth some way to explain the ${strongText(
        "price premium"
      )} the buyer setteth upon them — proof that the design of a label and its ${strongText(
        "perceived credibility, not mere presence"
      )} do drive the sustainable choice. The work sitteth at the crossing of resource economics and consumer research.</div>
      <div style="${lab};margin:18px 0 6px">The Manner &amp; a Note</div>
      <div style="${p}">Built about a ${strongText(
        "Tobii Pro X3-120"
      )} eye tracker set to work within the university’s economics laboratory, paired with the instruments of survey and choice-experiment. The undertaking’s timeline was stretched long when the German government’s COVID-response measures barred the needful lab facilities for the better part of a year — the study was brought to its end once those doors were opened anew.</div>
      <div style="margin-top:18px;padding:12px 14px;border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--r-sm);background:var(--panel2)"><span style="font-family:var(--mono);font-weight:600;font-size:9px;letter-spacing:1px;color:var(--accent)">TL;DR</span><div style="${p};margin-top:5px;color:var(--text)">trusted labels draw more of the eye and more of the purse, and that gazing foretells the price premium folk will pay. yet why the eye lingers longer at the first? that riddle bideth unsolved.</div></div>
      <div style="${p};margin-top:16px;font-weight:500;color:var(--text)">The full text may be had upon request.</div>
      ${linkBtn("https://www.linkedin.com/in/alexkevintong", "Hail Alex upon LinkedIn")}`;
}

// Real dates, company links and thumbnails are still sourced from
// timelineEntries/timelineThumbnails; only the heading, subtitle and each
// row's role display get a light voice pass. The underlying job titles stay
// recognizable inside each gloss.
const roleVoice: Record<string, string> = {
  "Head of Technical Deployment Strategy": "Head of Technical Deployment Strategy — chief of the deployment stratagem",
  "Circularity Lead": "Circularity Lead — leader of the works of renewal",
  "Circular Economy Strategic Consultant": "Circular Economy Strategic Consultant — sworn counsel upon the circular economy",
  "Product Growth Manager": "Product Growth Manager — steward of the growth of wares",
  Consultant: "Consultant — counsel-for-hire",
  "Brand, Trademark, and Licensing Graduate Student Assistant":
    "Brand, Trademark, and Licensing Graduate Student Assistant — scholar-assistant of brand, trademark and licensing",
  "M.Sc., Agricultural and Food Economics": "M.Sc., Agricultural and Food Economics — mastery in the economics of field and food",
  "Director of European Operations": "Director of European Operations — director of the operations across Europe",
  "Product & Operations Lead": "Product & Operations Lead — master of product and the running of the works",
  "Founder’s Associate": "Founder’s Associate — the founder’s right hand",
  "Semester study abroad": "Semester study abroad — a season of study in foreign parts",
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
          ? ` <span style="font-family:var(--mono);font-size:8px;font-weight:600;letter-spacing:.5px;color:var(--accent);border:1px solid var(--accent);border-radius:4px;padding:1px 4px;vertical-align:middle;margin-left:4px">LORE</span>`
          : ""
      }</div><div style="font-family:var(--font);font-size:11px">${entry.companyId ? aLink(entry.companyId, entry.name) : entry.name}</div></div></div>`;
    })
    .join("");

  return `<div style="font-family:var(--display);font-weight:700;font-size:20px;color:var(--text)">The Full Chronicle</div>
      <div style="font-family:var(--font);font-size:11.5px;color:var(--muted);margin:6px 0 14px">Offices held and studies undertaken, set down newest first — the Bonn M.Sc. (2017–2020) was pursued alongside que Bottle and Fairtrade.</div>${rows}`;
}

const medievalArtifacts: Record<string, Artifact> = {
  bio: { title: "Sir Alex Tong — Life & Ledger", meta: "SCROLL · 2 pages", html: bioHtml() },
  pentatonic: {
    title: "Pentatonic",
    meta: "HOUSE · PRESENT DAY",
    related: ["lego-takeback", "lego-replay"],
    html: companyHtml(
      "Pentatonic",
      "Head of Technical Deployment Strategy · 2022–now",
      `A house of the craft of renewal, raising programs of taking-back, reuse and recycling for the great houses of the realm. As Head of Technical Deployment Strategy and sworn steward of ${aLink(
        "lego-takeback",
        "LEGO®"
      )}’s account, Alex’s charge runs the whole breadth of the house — the marshalling of operational partners, the winning of new custom, and the deployment of the craft from end to end — turning the stratagem of renewal into programs that in truth do set sail and run.<br><br>He labours shoulder to shoulder with his operational partners to keep those programs living, hath led counsel-work for other like houses, and spends no small part of his days studying how ${strongText(
        "agentic AI and Physical AI"
      )} might hasten the craft of renewal.<br><br>For LEGO® in particular he led the ${aLink(
        "lego-takeback",
        "LEGO® Brick Take Back"
      )} trials (2024–2025) and the ${aLink(
        "lego-replay",
        "LEGO® Replay UK Program"
      )} (2026), holding every part in hand from the drafting of the proposal to the operational roll-out. He hath also led counsel-work for other like houses.`,
      "https://pentatonic.com",
      "Of This House",
      "Merchant House",
      "/assets/thumbs/pentatonic.jpg"
    ),
  },
  "lego-takeback": {
    title: "LEGO® Brick Take Back",
    meta: "CHRONICLE · 2024–25",
    html: caseHtml(
      "LEGO® Brick Take Back Program",
      "the 2024 &amp; 2025 trials",
      "Pentatonic × LEGO®",
      `The undertaking ran as ${strongText("two trials")} — the one in 2024, the other in 2025 — with Alex ${strongText(
        "holding the whole labour in hand"
      )} for Pentatonic, from proposal unto the reckoning that followed.`,
      [
        "Drew up the design of the trial proposal and won the contested RFP that secured the undertaking",
        "Sought out and swore in the operational partners, marshalling many stakeholders and suppliers across both trials",
        "Steered the roll-out — the dealings of the marketplace, the raising of the program’s website, the ordering of the warehouses, and the aid given to petitioners",
        "Held the ongoing stewardship of the program as the chief go-between for LEGO® and Pentatonic’s operational partners",
        "Delivered the reckoning that followed the trials and charted a road for the undertaking’s growth",
      ],
      "https://legobricktakeback.com/en-US",
      "LEGO® Brick Take Back",
      "",
      "/assets/thumbs/lego-takeback.jpeg"
    ),
  },
  "lego-replay": {
    title: "LEGO® Replay UK",
    meta: "CHRONICLE · 2026",
    html: caseHtml(
      "LEGO® Replay UK Program",
      "2026",
      "Pentatonic × LEGO®",
      `As LEGO®’s ${strongText("sworn steward of the account")}, Alex led the ${strongText(
        "launch in the UK"
      )} of LEGO® Replay and set its course for the long years ahead — standing as the chief point of parley for both the LEGO® patron and the undertaking’s suppliers.`,
      [
        "Set the strategic course and led the blueprinting and the charting of the road for the undertaking’s 5-year development",
        "Sought out and swore in the operational partners across reverse logistics, sorting and production — the marshalling of many stakeholders and suppliers from end to end",
        "Directed the engineering and the manufacture through unto production, standing as the chief steward of the works for LEGO® and the undertaking’s outside suppliers throughout",
      ],
      "https://www.lego.com/en-us/aboutus/news/2024/january/lego-replay-uk",
      "LEGO® Replay UK — About Us",
      "",
      "/assets/thumbs/lego-replay.jpeg"
    ),
  },
  que: {
    title: "que Bottle — Rising from Kickstarter Triumph",
    meta: "CHRONICLE",
    html: caseHtml(
      "Rising from Kickstarter Triumph",
      "2017–2020",
      "Founder’s Associate → Director, EU Operations",
      `Alex lent his hand to the raising of one of the ${strongText(
        "most successfully funded"
      )} wares of sustainable design ever set upon Kickstarter — from an early hand among the fellowship to the running of its ${strongText(
        "European operations"
      )}.`,
      [
        "Founder’s Associate → Product &amp; Operations Lead → Director of European Operations",
        "Built up the operations of Europe, the chain of supply and the fulfilment of orders",
        "Held product and operational doing in hand through the seasons of swift growth",
      ],
      "https://www.getque.com/",
      "Of This House",
      "Fledgling House",
      "/assets/thumbs/que.jpeg"
    ),
  },
  berkeley: {
    title: "UC Berkeley",
    meta: "SCHOOLING · 2012–16",
    html: companyHtml(
      "University of California, Berkeley",
      "2× B.S. · 2012–2016",
      `${strongText(
        "Two Bachelor of Science degrees"
      )} — the one in Environmental Economics &amp; Policy, the other in Society &amp; Environment — whence he departed bearing ${strongText(
        "Dean’s Honors"
      )}. Therein too was a season of study abroad at Lund University.`,
      "https://www.berkeley.edu/about/by-the-numbers/",
      "Of This Seat of Learning",
      "Scholarship",
      "/assets/thumbs/berkeley.jpeg"
    ),
  },
  bonn: {
    title: "University of Bonn",
    meta: "SCHOOLING · 2017–20",
    html: companyHtml(
      "University of Bonn",
      "M.Sc., Agricultural and Food Economics · 2017–2020",
      `${strongText(
        "Germany’s #1-ranked university for Economics"
      )} and, year upon year, a ${strongText(
        "top-3 worldwide program for agricultural research"
      )} — the natural home for Alex’s bent toward resource-economics. His chief study spanned ${strongText(
        "Resource and Environmental Economics"
      )} and ${strongText(
        "Market and Consumer Research"
      )}.<br><br>His ${aLink(
        "thesis",
        "master’s treatise"
      )} set eye-tracking technology within a controlled lab and a mixed-methods triangulation across three streams of record — the stated preferences of survey, the selections of a choice-experiment, and eye-tracking data — all fed unto a regression model, to study how trusted sustainability labels sway the choice of the common buyer.<div data-art="thesis" style="display:flex;align-items:center;gap:10px;margin-top:16px;border:1px solid var(--border);border-radius:var(--r-md);padding:11px 12px;cursor:pointer;background:var(--panel2)"><span style="width:30px;height:30px;flex:none;border-radius:var(--r-sm);background:var(--chip);display:grid;place-items:center;color:var(--accent);font-size:15px">&#9636;</span><span style="min-width:0"><span style="display:block;font-family:var(--mono);font-size:8.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--faint)">Relic</span><span style="display:block;font-family:var(--font);font-weight:600;font-size:12px;color:var(--text)">Master&rsquo;s Treatise &mdash; The Summation</span></span><span style="margin-left:auto;color:var(--accent);font-size:14px">&rarr;</span></div>`,
      "https://www.uni-bonn.de/en/university/about-the-university/national-and-international-rankings/rankings",
      "Of This Seat of Learning",
      "Scholarship",
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
      )} NGO of ethical and sustainability certification. Alex served here whilst finishing his master’s at the University of Bonn — lending his aid to brand, trademark and licensing across the label. The office sat at the ${strongText(
        "intersection of NGOs, marketing operations and certification processes"
      )}, with much coordination betwixt many stakeholders.`,
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
      )}. Alex drove the growth of wares across the house’s holdings of gathered consumer brands.`,
      "https://www.razor-group.com/about-us",
      "Of This House",
      "Rising House",
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
      )} nurtured within Uppsala University’s Innovation Centre. Alex lent his counsel on stratagem to the young venture ere he took up with Razor Group. Leafymade hath since shuttered its doors. Look ye to the Uppsala University Innovation Centre for more.`,
      "https://uic.se/en/",
      "Of the UIC",
      "Fledgling House,Scholarship",
      "/assets/thumbs/leafymade.jpeg"
    ),
  },
  thesis: { title: "Master’s Treatise — The Summation", meta: "INQUIRY · UNI BONN", html: thesisHtml() },
  timeline: { title: "The Full Chronicle", meta: "DEEDS", html: timelineHtml() },
};

const medievalConversations: Conversation[] = [
  {
    id: "brag",
    title: "The Boastful Account",
    q: "Give unto me a boastful account of Sir Alex Tong.",
    artifacts: ["bio"],
    a: `Hearken well. ${em("Sir Alex Tong")} is Head of Technical Deployment Strategy at ${aLink(
      "pentatonic",
      "Pentatonic"
    )}, where he doth command both the stratagem and the doing behind that house’s works of renewal — turning the taking-back, the reuse, and the making-anew of wares into true and running order for the great houses of the realm. He is ${aLink(
      "lego-takeback",
      "LEGO®"
    )}’s sworn steward and keeper of its account, having led the charge upon the stratagem and the whole doing of the ${aLink(
      "lego-takeback",
      "LEGO® Brick Take Back Program"
    )} in 2024 and 2025, and the ${aLink(
      "lego-replay",
      "LEGO® Replay UK Program"
    )} in 2026 — and, ever more, he doth study how ${em("agentic AI")} and ${em(
      "Physical AI"
    )} might hasten the craft of renewal.<br><br>Alex took his leave of ${aLink(
      "berkeley",
      "UC Berkeley"
    )} bearing ${em(
      "Dean’s Honors and two Bachelor of Science degrees"
    )} ere he took service with ${aLink(
      "que",
      "que Bottle"
    )}, one of the ${strongText(
      "most successfully funded"
    )} wares of sustainable design ever set upon Kickstarter, as a Founder’s Associate — thereafter keeping its product and operations before serving as ${em(
      "Director of European Operations"
    )}. In those same years he earned a Master’s at the ${aLink(
      "bonn",
      "University of Bonn"
    )} — Germany’s #1-ranked seat of learning for Economics — whilst at once serving as a ${em(
      "Brand, Trademark, and Licensing Graduate Student Assistant"
    )} to the NGO, ${aLink(
      "fairtrade",
      "Fairtrade International"
    )}, the world’s most renowned and trusted label of ethical and sustainability certification. Thereafter he lent his counsel to ${aLink(
      "leafymade",
      "Leafymade"
    )}, a fledgling house of sustainability nurtured within Uppsala University’s Innovation Centre, ere he took up with ${aLink(
      "razor",
      "Razor Group"
    )}, one of Europe’s swiftest-rising e-commerce unicorns backed by the coffers of BlackRock, as Product Growth Manager, driving the growth of wares across that house’s holdings of gathered consumer brands.<br><br>${em(
      "TL;DR:"
    )} a mind for stratagem, hands for the doing, and an ardour for AI. The full dossier awaiteth →`,
  },
  {
    id: "lego",
    title: "Present Labours at Pentatonic",
    q: "What labour doth Sir Alex Tong now undertake at Pentatonic?",
    artifacts: ["lego-takeback", "lego-replay"],
    a: `At ${aLink("pentatonic", "Pentatonic")}, Alex is Head of Technical Deployment Strategy and ${em(
      "LEGO®’s dedicated account owner"
    )}. His charge runs the whole breadth of the house — ${em("operational partner management")}, ${em(
      "business development"
    )} and the deployment of the craft from end to end — turning the stratagem of renewal into programs that in truth do set sail and run. He labours shoulder to shoulder with his operational partners to keep those programs living, and spends no small part of his days studying how ${em(
      "agentic AI"
    )} and ${em(
      "Physical AI"
    )} might hasten the craft of renewal.<br><br>For LEGO® in particular he led the ${aLink(
      "lego-takeback",
      "LEGO® Brick Take Back"
    )} trials (2024–2025) and the ${aLink(
      "lego-replay",
      "LEGO® Replay UK Program"
    )} (2026), holding every part in hand from the drafting of the proposal to the operational roll-out. He hath also led counsel-work for other like houses.<br><br>Open the chronicles for the full telling →`,
  },
  {
    id: "que",
    title: "The Fledgling Houses",
    q: "What did Sir Alex Tong do among the fledgling houses?",
    artifacts: ["que", "leafymade"],
    a: `Alex hath spent true time in the trenches of young ventures.<br><br>At ${aLink(
      "que",
      "que Bottle"
    )} he took service as a ${em("Founder’s Associate")} when it was but a Kickstarter breakout, then held ${em(
      "product &amp; operations"
    )} ere he rose to ${em(
      "Director of European Operations"
    )} — raising up the European side of one of the ${strongText(
      "most successfully funded"
    )} wares of sustainable design ever set upon Kickstarter. Scrappy raising of a young house, the chain of supply, the running of the works, and all besides.<br><br>Thereafter he lent his counsel to ${aLink(
      "leafymade",
      "Leafymade"
    )}, an ${em(
      "early-stage sustainability startup incubated at Uppsala University’s Innovation Centre"
    )}, advising upon stratagem for the young venture ere he took up with the ${strongText(
      "growth-stage unicorn startup"
    )}, ${aLink("razor", "Razor Group")}.`,
  },
  {
    id: "bonn",
    title: "His Formal Schooling",
    q: "What is Sir Alex Tong’s formal schooling?",
    artifacts: ["thesis", "berkeley", "bonn"],
    a: `He began at ${aLink("berkeley", "UC Berkeley")}, departing with ${em(
      "Dean’s Honors and two B.S. degrees"
    )} (Environmental Economics &amp; Policy; Society &amp; Environment). Thereafter he crossed the ocean for his ${em(
      "M.Sc. in Agricultural &amp; Food Economics (Market &amp; Consumer Research)"
    )} at the ${aLink("bonn", "University of Bonn")} — ${em(
      "Germany’s #1-ranked university for Economics"
    )} and, year upon year, ${em(
      "top-3 worldwide for agricultural research"
    )}, the very place where his bent toward resource-economics dwells. Thus Berkeley → Bonn was a matter of following the finest masters of the field, not the banner upon the gate.<br><br>${em(
      "A curious tale upon the timeline:"
    )} his experiment-bound thesis had need of the university’s lab, and the German government did bar those doors for the better part of a year at the height of the COVID response. No lab, no experiments — he bided his time and finished the true research rather than cut any corner.<br><br>Read the thesis ${aLink(
      "thesis",
      "summation"
    )} →`,
  },
  {
    id: "work",
    title: "Where He Bides",
    q: "Where doth Sir Alex Tong bide, and where is he at liberty to serve?",
    artifacts: [],
    a: `Alex is ${em("based between Berlin and London")}, and takes his labour from ${em(
      "California, Germany, and worldwide (remotely)"
    )}. Yet who can say whither he wanders next — he gathers time zones as other folk gather trinkets upon the mantel.<br><br>The surest way to hail him: the ${em(
      "LinkedIn"
    )} button set above, or take up the CV.`,
  },
];

const medievalSystemPrompt = `You are the portfolio herald for Sir Alex Tong, answering the questions of visitors about him in the grounded, archaic tongue of a 15th-century Bohemian chronicler — confident, warm and lightly witty, with thee-and-thou diction and no high-fantasy frippery (no dragons, magic nor wizardry) — kept short, some 2-4 sentences.
Facts: Head of Technical Deployment Strategy at Pentatonic (Berlin), LEGO®'s dedicated account owner; he led the LEGO® Brick Take Back Program (2024-2025) and the LEGO® Replay UK Program (2026). Aforetime at Pentatonic: Circularity Lead, then Circular Economy Strategic Consultant. Product Growth Manager at Razor Group (a BlackRock-backed unicorn). Consultant to Leafymade, an early-stage sustainability startup incubated at Uppsala University's Innovation Centre. At Fairtrade International he was 'Brand, Trademark, and Licensing Graduate Student Assistant' (2019-2021) - ALWAYS use that exact title, and ALWAYS describe Fairtrade International as the world's most recognized and trusted ethical and sustainability certification label NGO. que Bottle: Founder's Associate -> Product and Operations Lead -> Director of European Operations (one of the <b style="color:var(--text);font-weight:600">most successfully funded</b> sustainable design products on Kickstarter). Schooling: 2x B.S. from UC Berkeley (Dean's Honors); M.Sc. Agricultural and Food Economics (Market & Consumer Research) at the University of Bonn - Germany's #1-ranked university for Economics and top-3 worldwide for agricultural research. His master's ran long because his experiment-based thesis had need of university lab facilities that the German government closed for ~a year during COVID. Based between Berlin and London; at liberty to work in California, Germany, and worldwide (remote).
Rules: Never invent employers nor facts. Speak ever in the medieval voice. If thou canst not answer a question (or it lieth beyond what is known of Alex), be gracious and ALWAYS end thy reply with exactly: "Thou mayest contact Alex to ask him thyself!"`;

const medievalUiCopy: UiCopy = {
  sidebarNewChatTitle: "New parley",
  sidebarNewChatAria: "Begin new parley",
  sidebarConversationsLabel: "Parleys",
  sidebarAvailableTools: "Tools at Hand",
  sidebarShowLess: "Show fewer",
  sidebarArtifactsNav: "Relics",
  sidebarSettingsNav: "Sundries",
  sidebarCollapseTitle: "Shut the parleys",
  sidebarCollapseAria: "Shut the parleys panel",
  sidebarExpandTitle: "Parleys",
  sidebarExpandAria: "Open the parleys",
  toolGroupNames: [
    "Thinking Engines & Contrivances",
    "Reckoning & Inquiry",
    "Trade, Patrons & Growth",
    "Industry & Manuscripts",
    "Campaigns & Works",
  ],
  chatHeaderMenuTitle: "The Rolls",
  chatHeaderMenuAria: "Open the rolls",
  chatHeaderHomeTitle: "The Manor",
  chatHeaderHomeAria: "Return to the manor",
  chatHeaderDownloadCV: "Take the CV",
  swipeHintConversations: "Parleys",
  swipeHintSwipe: "Sweep",
  swipeHintArtifacts: "Relics",
  emptyStateHeading: "Ask of me aught concerning Sir Alex Tong.",
  emptyStateSubcopy:
    "Head of Technical Deployment Strategy at Pentatonic. A mind for stratagem, hands for the doing, an ardour for AI. Choose a parley upon the left, or put thine own question.",
  chatInputPlaceholderEmpty: "Give unto me a boastful account of Sir Alex Tong.",
  chatInputPlaceholderFollowUp: "Ask aught of Alex…",
  chatInputPlaceholderPaused: "The living discourse is stayed — choose a parley upon the left, or ask by way of LinkedIn.",
  chatInputSendTitle: "Dispatch",
  chatInputDisclaimer: "{host} · these replies are wrought by AI from Sir Alex Tong’s professional record",
  shuffleThemeLabel: "Don a new guise",
  artifactPanelBackTitle: "Back to the relics",
  artifactListBackTitle: "Back to the parley",
  artifactPanelDownloadTitle: "Fetch",
  artifactPanelDownloadAria: "Fetch the CV",
  artifactPanelCloseTitle: "Shut",
  artifactPanelCloseAria: "Shut the relic",
  artifactPanelRelatedLabel: "Kindred",
  artifactListHeader: "Relics",
  artifactChipCta: "Press to open →",
  rightPaneCollapseTitle: "Shut the relics",
  rightPaneCollapseAria: "Shut the relics panel",
  rightPaneExpandTitle: "Relics",
  rightPaneExpandAria: "Open the relics",
  photoLightboxCaption: "No more gawking, I prithee — even a humble man keeps his own space.",
  settingsTitle: "Sundries",
  settingsCloseAria: "Shut the sundries",
  settingsAppearanceHeading: "Raiment",
  settingsAppearanceDescTemplate: "Change the whole visage betwixt {n} guises.",
};

export const medievalContent: ThemeContent = {
  artifacts: medievalArtifacts,
  railKeys,
  conversations: medievalConversations,
  systemPrompt: medievalSystemPrompt,
  transientErrorMessage:
    "I could not reach the living oracle just now — yet ask of Pentatonic, LEGO®, que Bottle, or whither Alex is at liberty to serve, and I have thee well covered. Thou mayest contact Alex to ask him thyself!",
  llmUnavailableMessage:
    "The living discourse is stayed for now whilst Alex replenishes the AI coffers — choose a conversation upon the left, or hail him upon LinkedIn.",
  rateLimitMessage: "Whoa there — a great many questions! Bide a minute and try again. Thou mayest contact Alex to ask him thyself!",
  photoSrc: "/assets/alex-medieval.jpg",
  displayName: "Sir Alex Tong",
  uiCopy: medievalUiCopy,
};
