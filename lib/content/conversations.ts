import { aLink as link, em, strongText } from "./html";

export type Conversation = {
  id: string;
  title: string;
  q: string;
  artifact: string | null;
  a: string;
};

export const conversations: Conversation[] = [
  {
    id: "brag",
    title: "The braggadocious summary",
    q: "Give me a summary of Alex Tong. Make it as braggadocious as possible.",
    artifact: "bio",
    a: `Buckle up. ${em("Alex Tong")} is Head of Technical Deployment Strategy at ${link(
      "pentatonic",
      "Pentatonic"
    )}, where he leads the strategy and execution behind the company’s circular economy programs — turning take-back, reuse, and recycling initiatives into operational reality for global brands. He is ${link(
      "lego-takeback",
      "LEGO"
    )}’s dedicated account owner, having spearheaded the strategy and end-to-end implementation of the ${link(
      "lego-takeback",
      "LEGO Brick Take Back Program"
    )} in 2024 and 2025, and the ${link(
      "lego-replay",
      "LEGO Replay UK Program"
    )} in 2026 — and, increasingly, he’s exploring how ${em("agentic AI")} and ${em(
      "Physical AI"
    )} can accelerate the circular economy.<br><br>Alex graduated with ${em(
      "Dean’s Honors and two Bachelor of Science degrees"
    )} from ${link("berkeley", "UC Berkeley")} before joining ${link(
      "que",
      "que Bottle"
    )}, one of the ${strongText(
      "most successfully funded"
    )} sustainable design products on Kickstarter, as a Founder’s Associate — later managing product and operations before serving as ${em(
      "Director of European Operations"
    )}. During this time, he completed a Master’s at the ${link(
      "bonn",
      "University of Bonn"
    )} — Germany’s #1-ranked university for Economics — while simultaneously working as a ${em(
      "Brand, Trademark, and Licensing Graduate Student Assistant"
    )} at the NGO, ${link(
      "fairtrade",
      "Fairtrade International"
    )}, the world’s most recognized and trusted ethical and sustainability certification label. He then consulted for ${link(
      "leafymade",
      "Leafymade"
    )}, an early-stage sustainability startup incubated at Uppsala University’s Innovation Centre, before joining ${link(
      "razor",
      "Razor Group"
    )}, one of Europe’s fastest-growing e-commerce unicorns backed by BlackRock, as Product Growth Manager, driving product growth across the company’s portfolio of acquired consumer brands.<br><br>${em(
      "TL;DR:"
    )} strategy brain, operator’s hands, AI enthusiast. Full dossier →`,
  },
  {
    id: "lego",
    title: "Current work @ Pentatonic",
    q: "What is Alex Tong currently working on at Pentatonic?",
    artifact: "lego-takeback",
    a: `At ${link("pentatonic", "Pentatonic")}, Alex is Head of Technical Deployment Strategy and ${em(
      "LEGO’s dedicated account owner"
    )}. His remit runs across the business — ${em("operational partner management")}, ${em(
      "business development"
    )} and end-to-end technical deployment — turning circular-economy strategy into programs that actually ship and run. He works hand-in-hand with operational partners to keep those programs live, and spends a good part of his time exploring how ${em(
      "agentic AI"
    )} and ${em(
      "Physical AI"
    )} can accelerate the circular economy.<br><br>For LEGO specifically he led the ${link(
      "lego-takeback",
      "LEGO Brick Take Back"
    )} pilots (2024–2025) and the ${link(
      "lego-replay",
      "LEGO Replay UK Program"
    )} (2026), owning everything from proposal design to operational roll-out. He has also led strategic consulting projects for other similar brands.<br><br>Open the case studies for the play-by-play →`,
  },
  {
    id: "que",
    title: "Early-stage startups",
    q: "What did Alex Tong do at early-stage startups?",
    artifact: "que",
    a: `Alex has spent real time in the trenches of young ventures.<br><br>At ${link(
      "que",
      "que Bottle"
    )} he joined as a ${em("Founder’s Associate")} when it was a Kickstarter breakout, then owned ${em(
      "product &amp; operations"
    )} before becoming ${em(
      "Director of European Operations"
    )} — standing up the EU side of one of the ${strongText(
      "most successfully funded"
    )} sustainable design products on Kickstarter. Scrappy start-up scaling, supply chain, ops, the works.<br><br>He later consulted for ${link(
      "leafymade",
      "Leafymade"
    )}, an ${em(
      "early-stage sustainability startup incubated at Uppsala University’s Innovation Centre"
    )}, advising on strategy for the young venture before joining the ${strongText(
      "growth-stage unicorn startup"
    )}, ${link("razor", "Razor Group")}.`,
  },
  {
    id: "work",
    title: "Location",
    q: "Where is Alex Tong based and open to working?",
    artifact: null,
    a: `Alex is ${em("based between Berlin and London")}, and works from ${em(
      "California, Germany, and worldwide (remotely)"
    )}. But who knows where next — he collects time zones the way other people collect fridge magnets.<br><br>Best way to reach him: the ${em(
      "LinkedIn"
    )} button up top, or grab the CV.`,
  },
  {
    id: "bonn",
    title: "Formal education",
    q: "What is Alex Tong’s formal education?",
    artifact: "thesis",
    a: `He started at ${link("berkeley", "UC Berkeley")}, graduating with ${em(
      "Dean’s Honors and two B.S. degrees"
    )} (Environmental Economics &amp; Policy; Society &amp; Environment). He then crossed the Atlantic for his ${em(
      "M.Sc. in Agricultural &amp; Food Economics (Market &amp; Consumer Research)"
    )} at the ${link("bonn", "University of Bonn")} — ${em(
      "Germany’s #1-ranked university for Economics"
    )} and consistently ${em(
      "top-3 worldwide for agricultural research"
    )}, exactly where his resource-economics focus lives. So Berkeley → Bonn was about following the best faculty for the field, not the flag on the building.<br><br>${em(
      "Funny story on the timeline:"
    )} his experiment-based thesis needed university lab facilities, and the German government shut those for roughly a year at the height of the COVID response. No lab, no experiments — he waited it out and finished the real research rather than cutting corners.<br><br>Read the thesis ${link(
      "thesis",
      "abstract"
    )} →`,
  },
];
