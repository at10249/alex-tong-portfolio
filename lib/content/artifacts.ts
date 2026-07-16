import { aLink, banner, chipTag, linkBtn, sourceCard, strongText } from "./html";
import { timelineEntries, timelineThumbnails } from "./timeline";

export type Artifact = {
  title: string;
  meta: string;
  html: string;
  // Other artifact ids substantively referenced by this one — rendered as
  // chips at the bottom of the panel, same affordance as a chat message's.
  related?: string[];
};

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
        "Leads strategy and execution behind Pentatonic’s circular economy programs, turning take-back, reuse, and recycling initiatives into operational reality for global brands. LEGO’s dedicated account owner; spearheaded the LEGO Brick Take Back Program (2024–2025) and the LEGO Replay UK Program (2026).",
      ],
      [
        "berkeley",
        "UC Berkeley",
        "B.S., Environmental Economics &amp; Policy; B.S., Society &amp; Environment",
        "Graduated with Dean’s Honors.",
      ],
      [
        "que",
        "que Bottle",
        "Founder’s Associate → Product and Operations Lead → Director of European Operations",
        `Helped scale one of the ${strongText("most successfully funded")} sustainable design products on Kickstarter.`,
      ],
      [
        "bonn",
        "University of Bonn",
        "M.Sc., Agricultural and Food Economics",
        "Germany’s #1-ranked university for Economics.",
      ],
      [
        "fairtrade",
        "Fairtrade International",
        "Brand, Trademark, and Licensing Graduate Student Assistant",
        "Worked at the world’s most recognized and trusted ethical and sustainability certification label NGO.",
      ],
      [
        "leafymade",
        "Leafymade",
        "Consultant",
        "Early-stage sustainability startup incubated at Uppsala University’s Innovation Centre.",
      ],
      [
        "razor",
        "Razor Group",
        "Product Growth Manager",
        "Drove product growth across the portfolio of one of Europe’s fastest-growing e-commerce unicorns, backed by BlackRock.",
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
        <img src="/assets/alex.jpeg" alt="Alex Tong" style="width:66px;height:66px;border-radius:14px;object-fit:cover;object-position:50% 12%;flex:none;filter:var(--photo-filter)">
        <div>
          <div style="font-family:var(--display);font-weight:700;font-size:23px;color:var(--text)">Alex Tong</div>
          <div style="font-family:var(--font);font-weight:500;font-size:12px;color:var(--accent);margin-top:3px">Head of Technical Deployment Strategy, Pentatonic</div>
          <div style="font-family:var(--mono);font-size:10px;color:var(--faint);margin-top:5px">Berlin · London &nbsp;&middot;&nbsp; Open to CA, Germany &amp; remote</div>
        </div>
      </div>
      <div style="height:1px;background:var(--border);margin:18px 0"></div>
      <div style="${p}">Alex Tong is Head of Technical Deployment Strategy at ${aLink(
        "pentatonic",
        "Pentatonic"
      )}, where he leads the strategy and execution behind the company’s circular economy programs, turning take-back, reuse, and recycling initiatives into operational reality for global brands. He is LEGO’s dedicated account owner, having spearheaded the strategy and end-to-end implementation of the ${aLink(
        "lego-takeback",
        "LEGO Brick Take Back Program"
      )} in 2024 and 2025, and the ${aLink(
        "lego-replay",
        "LEGO Replay UK Program"
      )} in 2026 — and, increasingly, he is exploring how ${strongText(
        "agentic AI and Physical AI"
      )} can accelerate the circular economy.</div>
      <div style="${p};margin-top:12px">Alex graduated with Dean’s Honors and two Bachelor of Science degrees from ${aLink(
        "berkeley",
        "UC Berkeley"
      )} before joining ${aLink(
        "que",
        "que Bottle"
      )}, one of the ${strongText(
        "most successfully funded"
      )} sustainable design products on Kickstarter, as a Founder’s Associate, later managing product and operations before serving as Director of European Operations. During this time, he completed a Master’s at the ${aLink(
        "bonn",
        "University of Bonn"
      )} — Germany’s #1-ranked university for Economics — while working as a Brand, Trademark, and Licensing Graduate Student Assistant at the NGO, ${aLink(
        "fairtrade",
        "Fairtrade International"
      )}, the world’s most recognized and trusted ethical and sustainability certification label. He then consulted for ${aLink(
        "leafymade",
        "Leafymade"
      )}, an early-stage sustainability startup incubated at Uppsala University’s Innovation Centre, before joining ${aLink(
        "razor",
        "Razor Group"
      )}, one of Europe’s fastest-growing e-commerce unicorns backed by BlackRock, as Product Growth Manager, driving product growth across the company’s portfolio of acquired consumer brands.</div>
      <div style="${lab};margin:22px 0 2px">Experience &amp; Education</div>${rows}`;
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
  return `${chipTag("Education")}<div style="${lab}">M.Sc. Thesis · University of Bonn</div>
      <div style="font-family:var(--display);font-weight:700;font-size:19px;line-height:1.25;color:var(--text);margin-top:6px">Visual Attention and Consumer Valuation of Sustainability Labels: An Eye-Tracking Study in Food Markets</div>
      <div style="font-family:var(--font);font-weight:500;font-size:11px;color:var(--accent);margin-top:6px">Agricultural &amp; Food Economics — Market &amp; Consumer Research</div>
      <div style="${lab};margin:18px 0 6px">Abstract</div>
      <div style="${p}">This thesis examines how consumers visually process and value credible sustainability and ethical-certification labels on food packaging. Its core methodology is an innovative use of ${strongText(
        "eye-tracking technology"
      )} in a ${strongText(
        "controlled laboratory setting"
      )}: by recording precisely where, when, and for how long participants fixate on packaging and label elements, the study links measured visual attention to consumers’ valuation and ${strongText(
        "willingness-to-pay"
      )}.</div>
      <div style="${p};margin-top:12px">The most novel contribution is a ${strongText(
        "mixed-methods triangulation"
      )} across three data streams: each participant’s ${strongText(
        "stated preferences"
      )} (from a survey), their ${strongText(
        "revealed choices"
      )} (from a choice experiment), and their ${strongText(
        "eye-tracking data"
      )} were analysed together to see where what people say, what they choose, and what they actually look at converge — or diverge. Those three streams were then fed into a ${strongText(
        "regression model"
      )}, the primary output of the work, quantifying how visual attention and label credibility predict valuation.</div>
      <div style="${p};margin-top:12px">${strongText(
        "Twelve binary logistic regression sub-models"
      )} were built across three model families to test this: ${strongText(
        "nine were confirmed"
      )} with strong, statistically significant fit (up to ${strongText(
        "R²McF = 0.43"
      )}), establishing that both the presence of a sustainability label and ${strongText(
        "longer eye-gaze duration"
      )} significantly increased the likelihood of choosing the labeled product, and that environmental concern and attitude further shaped that choice. Two sub-models, testing whether attitude, environmental concern, and environmental knowledge drive eye-gaze duration itself, returned only weak, inconclusive support and were flagged as needing further research, while one additional exploratory variant failed to reach significance at all.</div>
      <div style="${p};margin-top:12px">The results show that credible, trusted labels capture ${strongText(
        "earlier and more sustained visual attention"
      )}, and that this attention helps explain the ${strongText(
        "price premium"
      )} consumers place on them — evidence that label design and ${strongText(
        "perceived credibility, not mere presence"
      )}, drive sustainable choice. The work sits at the intersection of resource economics and consumer research.</div>
      <div style="${lab};margin:18px 0 6px">Method &amp; note</div>
      <div style="${p}">Built around eye-tracking apparatus run in the university’s economics laboratory, paired with survey and choice-experiment instruments. The research timeline was extended when German government COVID-response measures closed the required lab facilities for roughly a year — the study was completed once facilities reopened.</div>
      <div style="margin-top:18px;padding:12px 14px;border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--r-sm);background:var(--panel2)"><span style="font-family:var(--mono);font-weight:600;font-size:9px;letter-spacing:1px;color:var(--accent)">STILL TL;DR</span><div style="${p};margin-top:5px;color:var(--text)">trusted labels get more eye time and more purchases, and that eye time predicts the price premium people’ll pay. why people look longer in the first place though? still fuzzy.</div></div>
      <div style="${p};margin-top:16px;font-weight:500;color:var(--text)">Full text available upon request.</div>
      ${linkBtn("https://www.linkedin.com/in/alexkevintong", "Contact Alex on LinkedIn")}`;
}

function timelineHtml(): string {
  const rows = timelineEntries
    .map((entry) => {
      const thumb = timelineThumbnails[entry.companyId] || (entry.name === "Lund University" ? "/assets/thumbs/berkeley.jpeg" : "");
      return `<div style="display:flex;gap:14px;padding:10px 0;border-top:1px solid var(--border)"><div style="flex:none;width:120px"><div style="font-family:var(--mono);font-size:10px;color:var(--faint)">${entry.date}</div>${
        thumb
          ? `<img src="${thumb}" alt="" style="width:100px;height:62px;border-radius:6px;object-fit:cover;border:1px solid var(--border);margin-top:8px">`
          : ""
      }</div><div style="flex:1;min-width:0"><div style="font-family:var(--font);font-weight:600;font-size:12.5px;color:var(--text)">${entry.role}${
        entry.isEducation
          ? ` <span style="font-family:var(--mono);font-size:8px;font-weight:600;letter-spacing:.5px;color:var(--accent);border:1px solid var(--accent);border-radius:4px;padding:1px 4px;vertical-align:middle;margin-left:4px">EDU</span>`
          : ""
      }</div><div style="font-family:var(--font);font-size:11px">${entry.companyId ? aLink(entry.companyId, entry.name) : entry.name}</div></div></div>`;
    })
    .join("");

  return `<div style="font-family:var(--display);font-weight:700;font-size:20px;color:var(--text)">Full timeline</div>
      <div style="font-family:var(--font);font-size:11.5px;color:var(--muted);margin:6px 0 14px">Roles and studies in reverse-chronological order — the Bonn M.Sc. (2017–2020) ran alongside que Bottle and Fairtrade.</div>${rows}`;
}

export const artifacts: Record<string, Artifact> = {
  bio: { title: "Alex Tong — Bio / CV", meta: "DOCUMENT · 2 pages", html: bioHtml() },
  pentatonic: {
    title: "Pentatonic",
    meta: "COMPANY · CURRENT",
    related: ["lego-takeback", "lego-replay"],
    html: companyHtml(
      "Pentatonic",
      "Head of Technical Deployment Strategy · 2022–now",
      `Circular-economy technology company building take-back, reuse and recycling programs for global brands. As Head of Technical Deployment Strategy and ${aLink(
        "lego-takeback",
        "LEGO"
      )}’s dedicated account owner, Alex’s remit runs across the business — operational partner management, business development and end-to-end technical deployment — turning circular-economy strategy into programs that actually ship and run.<br><br>He works hand-in-hand with operational partners to keep those programs live, has led strategic consulting projects for other similar brands, and spends a good part of his time exploring how ${strongText(
        "agentic AI and Physical AI"
      )} can accelerate the circular economy.<br><br>For LEGO specifically he led the ${aLink(
        "lego-takeback",
        "LEGO Brick Take Back"
      )} pilots (2024–2025) and the ${aLink(
        "lego-replay",
        "LEGO Replay UK Program"
      )} (2026), owning everything from proposal design to operational roll-out. He has also led strategic consulting projects for other similar brands.`,
      "https://pentatonic.com",
      "About",
      "Startup",
      "/assets/thumbs/pentatonic.jpg"
    ),
  },
  "lego-takeback": {
    title: "LEGO Brick Take Back",
    meta: "CASE STUDY · 2024–25",
    html: caseHtml(
      "LEGO Brick Take Back Program",
      "2024 &amp; 2025 pilots",
      "Pentatonic × LEGO",
      `The program ran as ${strongText("two pilots")} — one in 2024 and one in 2025. Alex ${strongText(
        "spearheaded and won the competitive RFP"
      )}, then owned the work end-to-end across both pilots, from the initial proposal to post-pilot analysis.`,
      [
        "Spearheaded and won the competitive RFP to land the program",
        "Led the design of the pilot proposal",
        "Found and onboarded operational partners — multi-stakeholder and supplier management throughout",
        "Ran the roll-out",
        "Owned ongoing program management",
        "Led the post-pilot analysis and roadmapping",
      ],
      "https://legobricktakeback.com/en-US",
      "LEGO® Brick Take Back",
      "",
      "/assets/thumbs/lego-takeback.jpeg"
    ),
  },
  "lego-replay": {
    title: "LEGO Replay UK",
    meta: "CASE STUDY · 2026",
    html: caseHtml(
      "LEGO Replay UK Program",
      "2026",
      "Pentatonic × LEGO",
      `As LEGO’s ${strongText("dedicated account owner")}, Alex led the ${strongText(
        "UK launch"
      )} of LEGO Replay and set its long-range direction — serving as the lead point of contact for both the LEGO client and the project’s suppliers.`,
      [
        "Led the blueprinting and roadmapping for the project’s 5-year development",
        "Found and onboarded the operational partners — multi-stakeholder and supplier management end-to-end",
        "Managed production while serving as the lead contact for the LEGO client and the project’s suppliers",
      ],
      "https://www.lego.com/en-us/aboutus/news/2024/january/lego-replay-uk",
      "LEGO® Replay UK — About Us",
      "",
      "/assets/thumbs/lego-replay.jpeg"
    ),
  },
  que: {
    title: "que Bottle — Scaling from Kickstarter Success",
    meta: "CASE STUDY",
    html: caseHtml(
      "Scaling from Kickstarter Success",
      "2017–2020",
      "Founder’s Associate → Director, EU Operations",
      `Alex helped scale one of the ${strongText(
        "most successfully funded"
      )} sustainable design products on Kickstarter, from early team member to running ${strongText(
        "European operations"
      )}.`,
      [
        "Founder’s Associate → Product &amp; Operations Lead → Director of European Operations",
        "Built out EU operations, supply chain and fulfilment",
        "Owned product and operational execution during rapid growth",
      ],
      "https://www.getque.com/",
      "About",
      "Early-stage startup",
      "/assets/thumbs/que.jpeg"
    ),
  },
  berkeley: {
    title: "UC Berkeley",
    meta: "EDUCATION · 2012–16",
    html: companyHtml(
      "University of California, Berkeley",
      "2× B.S. · 2012–2016",
      `${strongText(
        "Two Bachelor of Science degrees"
      )} — Environmental Economics &amp; Policy, and Society &amp; Environment — graduating with ${strongText(
        "Dean’s Honors"
      )}. Included a semester study-abroad at Lund University.`,
      "https://www.berkeley.edu/about/by-the-numbers/",
      "About",
      "Education",
      "/assets/thumbs/berkeley.jpeg"
    ),
  },
  bonn: {
    title: "University of Bonn",
    meta: "EDUCATION · 2017–20",
    html: companyHtml(
      "University of Bonn",
      "M.Sc., Agricultural and Food Economics · 2017–2020",
      `${strongText(
        "Germany’s #1-ranked university for Economics"
      )} and consistently a ${strongText(
        "top-3 worldwide program for agricultural research"
      )} — the natural home for Alex’s resource-economics focus. His core study spanned ${strongText(
        "Resource and Environmental Economics"
      )} and ${strongText(
        "Market and Consumer Research"
      )}.<br><br>His ${aLink(
        "thesis",
        "master’s thesis"
      )} used eye-tracking technology in a controlled lab setting and a mixed-methods triangulation across three data streams — survey stated preferences, choice-experiment selections and eye-tracking data — feeding a regression model to study how credible sustainability labels drive consumer choice.<div data-art="thesis" style="display:flex;align-items:center;gap:10px;margin-top:16px;border:1px solid var(--border);border-radius:var(--r-md);padding:11px 12px;cursor:pointer;background:var(--panel2)"><span style="width:30px;height:30px;flex:none;border-radius:var(--r-sm);background:var(--chip);display:grid;place-items:center;color:var(--accent);font-size:15px">&#9636;</span><span style="min-width:0"><span style="display:block;font-family:var(--mono);font-size:8.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--faint)">Artifact</span><span style="display:block;font-family:var(--font);font-weight:600;font-size:12px;color:var(--text)">Master&rsquo;s Thesis &mdash; Abstract</span></span><span style="margin-left:auto;color:var(--accent);font-size:14px">&rarr;</span></div>`,
      "https://www.uni-bonn.de/en/university/about-the-university/national-and-international-rankings/rankings",
      "About",
      "Education",
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
      )} ethical and sustainability certification label NGO. Alex worked here while completing his master’s at the University of Bonn — supporting brand, trademark and licensing across the label. The role sat at the ${strongText(
        "intersection of NGOs, marketing operations and certification processes"
      )}, coordinating across multiple stakeholders.`,
      "https://www.fairtrade.net/en/fairtrade-remains-the-go-to-ethical-label-for-shoppers.html",
      "Fairtrade remains the “go-to” ethical label for shoppers",
      "",
      "/assets/thumbs/fairtrade.jpeg"
    ),
  },
  razor: {
    title: "Razor Group",
    meta: "COMPANY · 2022",
    html: companyHtml(
      "Razor Group",
      "Product Growth Manager · 2022",
      `One of ${strongText(
        "Europe’s fastest-growing e-commerce unicorns"
      )}, backed by ${strongText(
        "BlackRock"
      )}. Alex drove product growth across the company’s portfolio of acquired consumer brands.`,
      "https://www.razor-group.com/about-us",
      "About",
      "Growth-stage startup",
      "/assets/thumbs/razor.jpeg"
    ),
  },
  leafymade: {
    title: "Leafymade",
    meta: "CONSULTING",
    html: companyHtml(
      "Leafymade",
      "Consultant",
      `An ${strongText(
        "early-stage sustainability startup"
      )} incubated at Uppsala University’s Innovation Centre. Alex consulted on strategy for the young venture before joining Razor Group. Leafymade has since closed operations. See the Uppsala University Innovation Centre for more.`,
      "https://uic.se/en/",
      "About UIC",
      "Early-stage startup,Education",
      "/assets/thumbs/leafymade.jpeg"
    ),
  },
  thesis: { title: "Master’s Thesis — Abstract", meta: "RESEARCH · UNI BONN", html: thesisHtml() },
  timeline: { title: "Full Timeline", meta: "EXPERIENCE", html: timelineHtml() },
};

export const railKeys = [
  "bio",
  "pentatonic",
  "lego-replay",
  "lego-takeback",
  "razor",
  "leafymade",
  "fairtrade",
  "thesis",
  "bonn",
  "que",
  "berkeley",
  "timeline",
];
