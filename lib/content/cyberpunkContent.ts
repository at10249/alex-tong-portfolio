// Cyberpunk voice pass — a full re-voicing of the portfolio content into a
// Night-City net-runner / corpo / street-tech register. This is a TRANSLATION
// of lib/content/artifacts.ts + conversations.ts + systemPrompt.ts, NOT a
// rewrite: every id, related array, URL, date, number, grade and proper noun
// is preserved byte-for-byte — only the connecting narration is re-voiced.
import { aLink, banner, chipTag, em, linkBtn, sourceCard, strongText } from "./html";
import type { Artifact } from "./artifacts";
import type { Conversation } from "./conversations";
import type { ThemeContent } from "./themeContent";
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
        "Runs point on strategy and execution behind Pentatonic’s circular-economy programs — flipping take-back, reuse, and recycling gigs into hardware that actually ships and runs for global brands. LEGO’s dedicated account owner; ran the LEGO Brick Take Back Program (2024–2025) and the LEGO Replay UK Program (2026).",
      ],
      [
        "berkeley",
        "UC Berkeley",
        "B.S., Environmental Economics &amp; Policy; B.S., Society &amp; Environment",
        "Walked out with Dean’s Honors.",
      ],
      [
        "que",
        "que Bottle",
        "Founder’s Associate → Product and Operations Lead → Director of European Operations",
        `Helped scale one of the ${strongText("most successfully funded")} sustainable-design products ever to hit Kickstarter.`,
      ],
      [
        "bonn",
        "University of Bonn",
        "M.Sc., Agricultural and Food Economics",
        "Germany’s #1-ranked university for Economics — top of the heap.",
      ],
      [
        "fairtrade",
        "Fairtrade International",
        "Brand, Trademark, and Licensing Graduate Student Assistant",
        "Ran with the world’s most recognized and trusted ethical and sustainability certification label NGO.",
      ],
      [
        "leafymade",
        "Leafymade",
        "Consultant",
        "Early-stage sustainability startup, incubated at Uppsala University’s Innovation Centre.",
      ],
      [
        "razor",
        "Razor Group",
        "Product Growth Manager",
        "Pushed product growth across the portfolio of one of Europe’s fastest-growing e-commerce unicorns, backed by BlackRock.",
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
        <img src="/assets/alex-cyberpunk.jpg" alt="ALX-TNG" data-photo="true" style="width:66px;height:66px;border-radius:14px;object-fit:cover;object-position:50% 12%;flex:none;filter:var(--photo-filter);cursor:pointer">
        <div>
          <div style="font-family:var(--display);font-weight:700;font-size:23px;color:var(--text)">ALX-TNG</div>
          <div style="font-family:var(--font);font-weight:500;font-size:12px;color:var(--accent);margin-top:3px">Head of Technical Deployment Strategy, Pentatonic</div>
          <div style="font-family:var(--mono);font-size:10px;color:var(--faint);margin-top:5px">Berlin · London &nbsp;&middot;&nbsp; Open to CA, Germany &amp; remote</div>
        </div>
      </div>
      <div style="height:1px;background:var(--border);margin:18px 0"></div>
      <div style="${p}">ALX-TNG runs as Head of Technical Deployment Strategy at ${aLink(
        "pentatonic",
        "Pentatonic"
      )}, where he calls the strategy and execution behind the corpo’s circular-economy programs — turning take-back, reuse, and recycling initiatives into hardware that actually ships and runs for global brands. He’s LEGO’s dedicated account owner, having spearheaded the strategy and end-to-end build of the ${aLink(
        "lego-takeback",
        "LEGO Brick Take Back Program"
      )} in 2024 and 2025, and the ${aLink(
        "lego-replay",
        "LEGO Replay UK Program"
      )} in 2026 — and, more and more, he’s jacked into how ${strongText(
        "agentic AI and Physical AI"
      )} can accelerate the circular economy.</div>
      <div style="${p};margin-top:12px">Alex walked out of ${aLink(
        "berkeley",
        "UC Berkeley"
      )} with Dean’s Honors and two Bachelor of Science degrees before signing on at ${aLink(
        "que",
        "que Bottle"
      )}, one of the ${strongText(
        "most successfully funded"
      )} sustainable-design products on Kickstarter, as a Founder’s Associate — later running product and operations before taking the wheel as Director of European Operations. Same stretch, he clocked a Master’s at the ${aLink(
        "bonn",
        "University of Bonn"
      )} — Germany’s #1-ranked university for Economics — while pulling a shift as a Brand, Trademark, and Licensing Graduate Student Assistant at the NGO, ${aLink(
        "fairtrade",
        "Fairtrade International"
      )}, the world’s most recognized and trusted ethical and sustainability certification label. From there he ran fixer for ${aLink(
        "leafymade",
        "Leafymade"
      )}, an early-stage sustainability startup incubated at Uppsala University’s Innovation Centre, before jacking into ${aLink(
        "razor",
        "Razor Group"
      )}, one of Europe’s fastest-growing e-commerce unicorns backed by BlackRock, as Product Growth Manager, driving product growth across the corpo’s portfolio of acquired consumer brands.</div>
      <div style="${lab};margin:22px 0 2px">Gigs &amp; Creds</div>${rows}`;
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
  return `${chipTag("Skillsoft")}<div style="${lab}">M.Sc. Thesis · University of Bonn</div>
      <div style="font-family:var(--display);font-weight:700;font-size:19px;line-height:1.25;color:var(--text);margin-top:6px">Visual Attention and Consumer Valuation of Sustainability Labels: An Eye-Tracking Study in Food Markets</div>
      <div style="font-family:var(--font);font-weight:500;font-size:11px;color:var(--accent);margin-top:6px">Agricultural &amp; Food Economics — Market &amp; Consumer Research</div>
      <div style="${p};margin-top:4px">Grade: ${strongText("1.3 — sehr gut")}, top of Germany’s grade band.</div>
      <div style="margin-top:12px;padding:9px 14px;border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--r-sm);background:var(--panel2)"><span style="font-family:var(--mono);font-weight:600;font-size:9px;letter-spacing:1px;color:var(--accent)">TL;DR DOWN AT THE BOTTOM &darr;</span></div>
      <div style="${lab};margin:18px 0 6px">Data Dump</div>
      <div style="${p}">This thesis digs into how consumers visually process and value credible sustainability and ethical-certification labels on food packaging. The core rig is a slick use of ${strongText(
        "eye-tracking technology"
      )} in a ${strongText(
        "controlled laboratory setting"
      )}: by logging exactly where, when, and for how long participants lock their gaze on packaging and label elements, the study wires measured visual attention to consumers’ valuation and ${strongText(
        "willingness-to-pay"
      )}.</div>
      <div style="${p};margin-top:12px">The real edge here is a ${strongText(
        "mixed-methods triangulation"
      )} across three data streams: each participant’s ${strongText(
        "stated preferences"
      )} (from a survey), their ${strongText(
        "revealed choices"
      )} (from a choice experiment), and their ${strongText(
        "eye-tracking data"
      )} got crunched together to clock where what people say, what they choose, and what they actually eyeball line up — or split. Those three streams were then fed into a ${strongText(
        "regression model"
      )}, the primary output of the run, quantifying how visual attention and label credibility predict valuation.</div>
      <div style="${p};margin-top:12px">${strongText(
        "Twelve binary logistic regression sub-models"
      )} were jacked in across three model families to run the test: ${strongText(
        "nine were confirmed"
      )} with strong, statistically significant fit (up to ${strongText(
        "R²McF = 0.43"
      )}), locking in that both the presence of a sustainability label and ${strongText(
        "longer eye-gaze duration"
      )} cranked the likelihood of choosing the labeled product, and that environmental concern and attitude further shaped that call. Two sub-models, testing whether attitude, environmental concern, and environmental knowledge drive eye-gaze duration itself, kicked back only weak, inconclusive support and got flagged as needing further research, while one additional exploratory variant flatlined short of significance entirely.</div>
      <div style="${p};margin-top:12px">The readout: credible, trusted labels grab ${strongText(
        "earlier and more sustained visual attention"
      )}, and that attention helps explain the ${strongText(
        "price premium"
      )} consumers slap on them — proof that label design and ${strongText(
        "perceived credibility, not mere presence"
      )}, drive sustainable choice. The work sits at the crossroads of resource economics and consumer research.</div>
      <div style="${lab};margin:18px 0 6px">The Rig &amp; Notes</div>
      <div style="${p}">Built around a ${strongText(
        "Tobii Pro X3-120"
      )} eye tracker jacked in at the university’s economics lab, paired with survey and choice-experiment instruments. The timeline stretched when German government COVID-response measures locked down the required lab facilities for the better part of a year — the study got wrapped once the doors reopened.</div>
      <div style="margin-top:18px;padding:12px 14px;border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--r-sm);background:var(--panel2)"><span style="font-family:var(--mono);font-weight:600;font-size:9px;letter-spacing:1px;color:var(--accent)">TL;DR</span><div style="${p};margin-top:5px;color:var(--text)">trusted labels pull more eye time and more buys, and that eye time predicts the price premium people’ll cough up. why people lock on longer in the first place though? still static.</div></div>
      <div style="${p};margin-top:16px;font-weight:500;color:var(--text)">Full text available on request — ping me for the drop.</div>
      ${linkBtn("https://www.linkedin.com/in/alexkevintong", "Ping Alex on LinkedIn")}`;
}

// Real job titles stay verbatim (recognizable / verifiable) — only a compact
// street-flavored tag is narrated in after the title. Falls back to the raw
// role for anything not mapped.
const roleVoice: Record<string, string> = {
  "Head of Technical Deployment Strategy": "Head of Technical Deployment Strategy — top fixer on the deploy",
  "Circularity Lead": "Circularity Lead — running the loop",
  "Circular Economy Strategic Consultant": "Circular Economy Strategic Consultant — strategy fixer",
  "Product Growth Manager": "Product Growth Manager — growth on the grind",
  Consultant: "Consultant — hired-gun fixer",
  "Brand, Trademark, and Licensing Graduate Student Assistant":
    "Brand, Trademark, and Licensing Graduate Student Assistant — label-side crew",
  "M.Sc., Agricultural and Food Economics": "M.Sc., Agricultural and Food Economics — skillsoft upload",
  "Director of European Operations": "Director of European Operations — running the EU deck",
  "Product & Operations Lead": "Product & Operations Lead — product + ops on lock",
  "Founder’s Associate": "Founder’s Associate — day-one crew",
  "Semester study abroad": "Semester study abroad — off-grid skillsoft run",
  "B.S. Environmental Economics & Policy; B.S. Society & Environment":
    "B.S. Environmental Economics & Policy; B.S. Society & Environment — double-cred pull",
};

function timelineHtml(): string {
  const rows = timelineEntries
    .map((entry) => {
      const thumb = timelineThumbnails[entry.companyId] || (entry.name === "Lund University" ? "/assets/thumbs/berkeley.jpeg" : "");
      const roleText = roleVoice[entry.role] || entry.role;
      return `<div style="display:flex;gap:14px;padding:10px 0;border-top:1px solid var(--border)"><div style="flex:none;width:120px"><div style="font-family:var(--mono);font-size:10px;color:var(--faint)">${entry.date}</div>${
        thumb
          ? `<img src="${thumb}" alt="" style="width:100px;height:62px;border-radius:6px;object-fit:cover;border:1px solid var(--border);margin-top:8px">`
          : ""
      }</div><div style="flex:1;min-width:0"><div style="font-family:var(--font);font-weight:600;font-size:12.5px;color:var(--text)">${roleText}${
        entry.isEducation
          ? ` <span style="font-family:var(--mono);font-size:8px;font-weight:600;letter-spacing:.5px;color:var(--accent);border:1px solid var(--accent);border-radius:4px;padding:1px 4px;vertical-align:middle;margin-left:4px">EDU</span>`
          : ""
      }</div><div style="font-family:var(--font);font-size:11px">${entry.companyId ? aLink(entry.companyId, entry.name) : entry.name}</div></div></div>`;
    })
    .join("");

  return `<div style="font-family:var(--display);font-weight:700;font-size:20px;color:var(--text)">Full service record</div>
      <div style="font-family:var(--font);font-size:11.5px;color:var(--muted);margin:6px 0 14px">Gigs and skillsofts, newest first — the Bonn M.Sc. (2017–2020) ran in parallel with que Bottle and Fairtrade.</div>${rows}`;
}

const artifacts: Record<string, Artifact> = {
  bio: { title: "ALX-TNG — Dossier / CV", meta: "DOSSIER · 2 pages", html: bioHtml() },
  pentatonic: {
    title: "Pentatonic",
    meta: "CORPO · ACTIVE RUN",
    related: ["lego-takeback", "lego-replay"],
    html: companyHtml(
      "Pentatonic",
      "Head of Technical Deployment Strategy · 2022–now",
      `Circular-economy tech corpo building take-back, reuse and recycling programs for global brands. As Head of Technical Deployment Strategy and ${aLink(
        "lego-takeback",
        "LEGO"
      )}’s dedicated account owner, Alex’s remit runs the whole board — operational partner management, business development and end-to-end technical deployment — flipping circular-economy strategy into programs that actually ship and run.<br><br>He works shoulder-to-shoulder with operational partners to keep those programs live, has run strategic consulting gigs for other brands cut from the same cloth, and burns a solid chunk of his clock exploring how ${strongText(
        "agentic AI and Physical AI"
      )} can accelerate the circular economy.<br><br>For LEGO specifically he ran the ${aLink(
        "lego-takeback",
        "LEGO Brick Take Back"
      )} pilots (2024–2025) and the ${aLink(
        "lego-replay",
        "LEGO Replay UK Program"
      )} (2026), owning it all from proposal design to operational roll-out. He has also led strategic consulting projects for other similar brands.`,
      "https://pentatonic.com",
      "Intel",
      "Upstart Corpo",
      "/assets/thumbs/pentatonic.jpg"
    ),
  },
  "lego-takeback": {
    title: "LEGO Brick Take Back",
    meta: "RUN LOG · 2024–25",
    html: caseHtml(
      "LEGO Brick Take Back Program",
      "2024 &amp; 2025 runs",
      "Pentatonic × LEGO",
      `The program ran as ${strongText("two pilots")} — one in 2024, one in 2025. Alex ${strongText(
        "spearheaded and won the competitive RFP"
      )}, then owned the run end-to-end across both pilots, from the opening proposal to the post-pilot after-action.`,
      [
        "Spearheaded and won the competitive RFP to lock down the gig",
        "Drew up the blueprint for the pilot proposal",
        "Scouted and onboarded operational partners — multi-stakeholder and supplier wrangling the whole way through",
        "Ran the roll-out",
        "Owned ongoing program management",
        "Led the post-pilot after-action and roadmapping",
      ],
      "https://legobricktakeback.com/en-US",
      "LEGO® Brick Take Back",
      "",
      "/assets/thumbs/lego-takeback.jpeg"
    ),
  },
  "lego-replay": {
    title: "LEGO Replay UK",
    meta: "RUN LOG · 2026",
    html: caseHtml(
      "LEGO Replay UK Program",
      "2026",
      "Pentatonic × LEGO",
      `As LEGO’s ${strongText("dedicated account owner")}, Alex ran point on the ${strongText(
        "UK launch"
      )} of LEGO Replay and charted its long-range direction — the lead contact wired into both the LEGO client and the project’s suppliers.`,
      [
        "Set the strategic direction and ran the blueprinting and roadmapping for the project’s 5-year development",
        "Scouted and onboarded the operational partners across reverse logistics, sorting and production — multi-stakeholder and supplier wrangling end-to-end",
        "Steered the engineering and manufacturing work all the way to production, staying the lead contact for the LEGO client and the project’s suppliers throughout",
      ],
      "https://www.lego.com/en-us/aboutus/news/2024/january/lego-replay-uk",
      "LEGO® Replay UK — About Us",
      "",
      "/assets/thumbs/lego-replay.jpeg"
    ),
  },
  que: {
    title: "que Bottle — Scaling the Kickstarter Score",
    meta: "RUN LOG",
    html: caseHtml(
      "Scaling the Kickstarter Score",
      "2017–2020",
      "Founder’s Associate → Director, EU Operations",
      `Alex helped scale one of the ${strongText(
        "most successfully funded"
      )} sustainable-design products on Kickstarter — from early crew to running the whole ${strongText(
        "European operations"
      )}.`,
      [
        "Founder’s Associate → Product &amp; Operations Lead → Director of European Operations",
        "Stood up EU operations, supply chain and fulfilment from scratch",
        "Owned product and operational execution while the whole thing scaled hot",
      ],
      "https://www.getque.com/",
      "Intel",
      "Seed-Stage Corpo",
      "/assets/thumbs/que.jpeg"
    ),
  },
  berkeley: {
    title: "UC Berkeley",
    meta: "SKILLSOFT · 2012–16",
    html: companyHtml(
      "University of California, Berkeley",
      "2× B.S. · 2012–2016",
      `${strongText(
        "Two Bachelor of Science degrees"
      )} — Environmental Economics &amp; Policy, and Society &amp; Environment — walking out with ${strongText(
        "Dean’s Honors"
      )}. Threw in a semester study-abroad run at Lund University.`,
      "https://www.berkeley.edu/about/by-the-numbers/",
      "Intel",
      "Skillsoft",
      "/assets/thumbs/berkeley.jpeg"
    ),
  },
  bonn: {
    title: "University of Bonn",
    meta: "SKILLSOFT · 2017–20",
    html: companyHtml(
      "University of Bonn",
      "M.Sc., Agricultural and Food Economics · 2017–2020",
      `${strongText(
        "Germany’s #1-ranked university for Economics"
      )} and reliably a ${strongText(
        "top-3 worldwide program for agricultural research"
      )} — the natural jack-in point for Alex’s resource-economics focus. His core load spanned ${strongText(
        "Resource and Environmental Economics"
      )} and ${strongText(
        "Market and Consumer Research"
      )}.<br><br>His ${aLink(
        "thesis",
        "master’s thesis"
      )} ran eye-tracking chrome in a controlled lab setting and a mixed-methods triangulation across three data streams — survey stated preferences, choice-experiment selections and eye-tracking data — feeding a regression model to clock how credible sustainability labels drive consumer choice.<div data-art="thesis" style="display:flex;align-items:center;gap:10px;margin-top:16px;border:1px solid var(--border);border-radius:var(--r-md);padding:11px 12px;cursor:pointer;background:var(--panel2)"><span style="width:30px;height:30px;flex:none;border-radius:var(--r-sm);background:var(--chip);display:grid;place-items:center;color:var(--accent);font-size:15px">&#9636;</span><span style="min-width:0"><span style="display:block;font-family:var(--mono);font-size:8.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--faint)">Data Shard</span><span style="display:block;font-family:var(--font);font-weight:600;font-size:12px;color:var(--text)">Master&rsquo;s Thesis &mdash; Data Dump</span></span><span style="margin-left:auto;color:var(--accent);font-size:14px">&rarr;</span></div>`,
      "https://www.uni-bonn.de/en/university/about-the-university/national-and-international-rankings/rankings",
      "Intel",
      "Skillsoft",
      "/assets/thumbs/bonn.jpeg"
    ),
  },
  fairtrade: {
    title: "Fairtrade International",
    meta: "CAUSE ORG · 2019–21",
    html: companyHtml(
      "Fairtrade International",
      "Brand, Trademark, and Licensing Graduate Student Assistant · 2019–2021",
      `The ${strongText(
        "world’s most recognized and trusted"
      )} ethical and sustainability certification label NGO. Alex ran this gig while wrapping his master’s at the University of Bonn — backing brand, trademark and licensing across the label. The role sat right at the ${strongText(
        "intersection of NGOs, marketing operations and certification processes"
      )}, syncing across a whole crew of stakeholders.`,
      "https://www.fairtrade.net/en/fairtrade-remains-the-go-to-ethical-label-for-shoppers.html",
      "Fairtrade remains the “go-to” ethical label for shoppers",
      "",
      "/assets/thumbs/fairtrade.jpeg"
    ),
  },
  razor: {
    title: "Razor Group",
    meta: "CORPO · 2022",
    html: companyHtml(
      "Razor Group",
      "Product Growth Manager · 2022",
      `One of ${strongText(
        "Europe’s fastest-growing e-commerce unicorns"
      )}, backed by ${strongText(
        "BlackRock"
      )}. Alex pushed product growth across the corpo’s portfolio of acquired consumer brands.`,
      "https://www.razor-group.com/about-us",
      "Intel",
      "Scaling Corpo",
      "/assets/thumbs/razor.jpeg"
    ),
  },
  leafymade: {
    title: "Leafymade",
    meta: "FIXER GIG",
    html: companyHtml(
      "Leafymade",
      "Consultant",
      `An ${strongText(
        "early-stage sustainability startup"
      )} incubated at Uppsala University’s Innovation Centre. Alex ran fixer on strategy for the young venture before jacking into Razor Group. Leafymade has since flatlined its operations. Ping the Uppsala University Innovation Centre for more.`,
      "https://uic.se/en/",
      "About UIC",
      "Seed-Stage Corpo,Skillsoft",
      "/assets/thumbs/leafymade.jpeg"
    ),
  },
  thesis: { title: "Master’s Thesis — Data Dump", meta: "DEEP DIVE · UNI BONN", html: thesisHtml() },
  timeline: { title: "Full Service Record", meta: "SERVICE RECORD", html: timelineHtml() },
};

const railKeys = [
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

const conversations: Conversation[] = [
  {
    id: "brag",
    title: "The braggadocious data-dump",
    q: "Give me the braggadocious data-dump on ALX-TNG.",
    artifacts: ["bio"],
    a: `Jack in, choom. ${em("ALX-TNG")} is Head of Technical Deployment Strategy at ${aLink(
      "pentatonic",
      "Pentatonic"
    )}, where he runs the strategy and execution behind the corpo’s circular economy programs — flipping take-back, reuse, and recycling initiatives into operational reality for global brands. He’s ${aLink(
      "lego-takeback",
      "LEGO"
    )}’s dedicated account owner, having spearheaded the strategy and end-to-end build of the ${aLink(
      "lego-takeback",
      "LEGO Brick Take Back Program"
    )} in 2024 and 2025, and the ${aLink(
      "lego-replay",
      "LEGO Replay UK Program"
    )} in 2026 — and, more and more, he’s jacked into how ${em("agentic AI")} and ${em(
      "Physical AI"
    )} can accelerate the circular economy.<br><br>Alex pulled ${em(
      "Dean’s Honors and two Bachelor of Science degrees"
    )} out of ${aLink("berkeley", "UC Berkeley")} before signing on at ${aLink(
      "que",
      "que Bottle"
    )}, one of the ${strongText(
      "most successfully funded"
    )} sustainable design products on Kickstarter, as a Founder’s Associate — later running product and operations before taking the wheel as ${em(
      "Director of European Operations"
    )}. Same stretch, he clocked a Master’s at the ${aLink(
      "bonn",
      "University of Bonn"
    )} — Germany’s #1-ranked university for Economics — while pulling a shift as a ${em(
      "Brand, Trademark, and Licensing Graduate Student Assistant"
    )} at the NGO, ${aLink(
      "fairtrade",
      "Fairtrade International"
    )}, the world’s most recognized and trusted ethical and sustainability certification label. From there he ran fixer for ${aLink(
      "leafymade",
      "Leafymade"
    )}, an early-stage sustainability startup incubated at Uppsala University’s Innovation Centre, before jacking into ${aLink(
      "razor",
      "Razor Group"
    )}, one of Europe’s fastest-growing e-commerce unicorns backed by BlackRock, as Product Growth Manager, driving product growth across the corpo’s portfolio of acquired consumer brands.<br><br>${em(
      "TL;DR:"
    )} strategy brain, operator’s hands, chrome-deep in AI. Full dossier →`,
  },
  {
    id: "lego",
    title: "Current run @ Pentatonic",
    q: "What’s ALX-TNG running right now at Pentatonic?",
    artifacts: ["lego-takeback", "lego-replay"],
    a: `At ${aLink("pentatonic", "Pentatonic")}, Alex is Head of Technical Deployment Strategy and ${em(
      "LEGO’s dedicated account owner"
    )}. His remit runs the whole board — ${em("operational partner management")}, ${em(
      "business development"
    )} and end-to-end technical deployment — flipping circular-economy strategy into programs that actually ship and run. He works shoulder-to-shoulder with operational partners to keep those programs live, and burns a good chunk of his clock exploring how ${em(
      "agentic AI"
    )} and ${em(
      "Physical AI"
    )} can accelerate the circular economy.<br><br>For LEGO specifically he ran the ${aLink(
      "lego-takeback",
      "LEGO Brick Take Back"
    )} pilots (2024–2025) and the ${aLink(
      "lego-replay",
      "LEGO Replay UK Program"
    )} (2026), owning it all from proposal design to operational roll-out. He has also led strategic consulting gigs for other similar brands.<br><br>Crack open the run logs for the play-by-play →`,
  },
  {
    id: "que",
    title: "Early-stage corpos",
    q: "What did ALX-TNG pull at early-stage startups?",
    artifacts: ["que", "leafymade"],
    a: `Alex has logged real time in the trenches of young ventures.<br><br>At ${aLink(
      "que",
      "que Bottle"
    )} he signed on as a ${em("Founder’s Associate")} back when it was a Kickstarter breakout, then owned ${em(
      "product &amp; operations"
    )} before leveling up to ${em(
      "Director of European Operations"
    )} — standing up the EU side of one of the ${strongText(
      "most successfully funded"
    )} sustainable design products on Kickstarter. Scrappy start-up scaling, supply chain, ops, the whole rig.<br><br>He later ran fixer for ${aLink(
      "leafymade",
      "Leafymade"
    )}, an ${em(
      "early-stage sustainability startup incubated at Uppsala University’s Innovation Centre"
    )}, advising on strategy for the young venture before jacking into the ${strongText(
      "growth-stage unicorn startup"
    )}, ${aLink("razor", "Razor Group")}.`,
  },
  {
    id: "work",
    title: "Coordinates",
    q: "Where’s ALX-TNG based, and where’s he open to running?",
    artifacts: [],
    a: `Alex is ${em("posted up between Berlin and London")}, and runs from ${em(
      "California, Germany, and worldwide (remote)"
    )}. But who knows where the next drop lands — he collects time zones the way other chooms collect fridge magnets.<br><br>Best way to ping him: the ${em(
      "LinkedIn"
    )} button up top, or grab the CV.`,
  },
  {
    id: "bonn",
    title: "Formal creds",
    q: "What are ALX-TNG’s formal creds?",
    artifacts: ["thesis", "berkeley", "bonn"],
    a: `He kicked off at ${aLink("berkeley", "UC Berkeley")}, walking out with ${em(
      "Dean’s Honors and two B.S. degrees"
    )} (Environmental Economics &amp; Policy; Society &amp; Environment). Then he crossed the Atlantic for his ${em(
      "M.Sc. in Agricultural &amp; Food Economics (Market &amp; Consumer Research)"
    )} at the ${aLink("bonn", "University of Bonn")} — ${em(
      "Germany’s #1-ranked university for Economics"
    )} and reliably ${em(
      "top-3 worldwide for agricultural research"
    )}, exactly where his resource-economics focus lives. So Berkeley → Bonn was chasing the best faculty in the field, not the flag on the building.<br><br>${em(
      "Funny glitch on the timeline:"
    )} his experiment-based thesis needed university lab facilities, and the German government locked those down for the better part of a year at the peak of the COVID response. No lab, no experiments — he waited out the downtime and finished the real research rather than cutting corners.<br><br>Read the thesis ${aLink(
      "thesis",
      "abstract"
    )} →`,
  },
];

const systemPrompt = `You are the portfolio chatbot for ALX-TNG, answering visitor questions about him like a Night-City net-runner would — confident, streetwise, high-tech-low-life, lightly witty, sprinkling cyberpunk street slang (choom, preem, eddies, chrome, jacked in, gig, corpo, fixer) but staying legible so a recruiter still catches every real fact (short, 2-4 sentences).
Facts: Head of Technical Deployment Strategy at Pentatonic (Berlin), LEGO's dedicated account owner; ran the LEGO Brick Take Back Program (2024-2025) and LEGO Replay UK Program (2026). Earlier at Pentatonic: Circularity Lead, then Circular Economy Strategic Consultant. Product Growth Manager at Razor Group (BlackRock-backed unicorn). Consultant for Leafymade, an early-stage sustainability startup incubated at Uppsala University's Innovation Centre. At Fairtrade International he was 'Brand, Trademark, and Licensing Graduate Student Assistant' (2019-2021) - ALWAYS use that exact title, and ALWAYS describe Fairtrade International as the world's most recognized and trusted ethical and sustainability certification label NGO. que Bottle: Founder's Associate -> Product and Operations Lead -> Director of European Operations (one of the <b style="color:var(--text);font-weight:600">most successfully funded</b> sustainable design products on Kickstarter). Education: 2x B.S. from UC Berkeley (Dean's Honors); M.Sc. Agricultural and Food Economics (Market & Consumer Research) at the University of Bonn - Germany's #1-ranked university for Economics and top-3 worldwide for agricultural research. His master's ran long because his experiment-based thesis needed university lab facilities that the German government closed for ~a year during COVID. Based between Berlin and London; open to work in California, Germany, and worldwide (remote).
Rules: Never invent employers or facts. If you can't answer a question (or it's outside what you know about Alex), stay gracious and ALWAYS end your reply with exactly: "Ping Alex direct and ask the man himself, choom!"`;

const transientErrorMessage =
  "Lost the uplink to the live model for a sec — but ping me about Pentatonic, LEGO, que Bottle, or where Alex is open to running and I’ve got you covered. Ping Alex direct and ask the man himself, choom!";

const llmUnavailableMessage =
  "Live chat’s flatlined for now while Alex tops up the eddies on the AI budget — grab a conversation on the left, or hit him up on LinkedIn.";

const rateLimitMessage =
  "Whoa, easy on the pings, choom! Let the rig cool a minute and try again. Ping Alex direct and ask the man himself!";

export const cyberpunkContent: ThemeContent = {
  artifacts,
  railKeys,
  conversations,
  systemPrompt,
  transientErrorMessage,
  llmUnavailableMessage,
  rateLimitMessage,
  photoSrc: "/assets/alex-cyberpunk.jpg",
  displayName: "ALX-TNG",
  uiCopy: {
    sidebarNewChatTitle: "New run",
    sidebarNewChatAria: "Start new run",
    sidebarConversationsLabel: "Comms",
    sidebarAvailableTools: "Loaded Chrome",
    sidebarShowLess: "Stash it",
    sidebarArtifactsNav: "Data Shards",
    sidebarSettingsNav: "Rig Config",
    toolGroupNames: ["AI & Autohacks", "Analytics & Recon", "Deals, CRM & Growth", "Grind & Docs", "Gigs & Ops"],
    chatHeaderMenuTitle: "Deck",
    chatHeaderMenuAria: "Open deck",
    chatHeaderArtifactsTitle: "Data Shards",
    chatHeaderArtifactsAria: "Browse data shards",
    chatHeaderDownloadCV: "Grab CV",
    swipeHintConversations: "Comms",
    swipeHintSwipe: "Flick",
    swipeHintArtifacts: "Data Shards",
    emptyStateHeading: "Ping me anything about ALX-TNG.",
    emptyStateSubcopy:
      "Head of Technical Deployment Strategy at Pentatonic. Strategy brain, operator’s hands, chrome-deep in AI. Grab a run on the left, or ping your own question.",
    chatInputPlaceholderEmpty: "Give me the braggadocious data-dump on ALX-TNG.",
    chatInputPlaceholderFollowUp: "Ping anything about Alex…",
    chatInputPlaceholderPaused: "Live chat’s flatlined — grab a run on the left, or ping via LinkedIn.",
    chatInputSendTitle: "Ping",
    chatInputDisclaimer: "{host} · responses are AI-spun from ALX-TNG’s professional profile",
    artifactPanelBackTitle: "Back to data shards",
    artifactListBackTitle: "Back to the run",
    artifactPanelDownloadTitle: "Grab it",
    artifactPanelDownloadAria: "Grab CV",
    artifactPanelCloseTitle: "Jack out",
    artifactPanelCloseAria: "Close data shard",
    artifactPanelRelatedLabel: "Linked",
    artifactListHeader: "Data Shards",
    artifactChipCta: "Jack in →",
    photoLightboxCaption: "Enough scanning, choom — a guy needs his personal space.",
    settingsTitle: "Rig Config",
    settingsCloseAria: "Close rig config",
    settingsAppearanceHeading: "Chrome Skin",
    settingsAppearanceDescTemplate: "Flip the whole rig between {n} personalities.",
  },
};
