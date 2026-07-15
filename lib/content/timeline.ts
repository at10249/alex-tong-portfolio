// Single source of truth for Alex's reverse-chronological experience &
// education history — consumed by both the chat UI's timeline artifact
// (lib/content/artifacts.ts) and the generated CV PDF (lib/cv/), so the
// two can never drift apart.

export type TimelineEntry = {
  date: string;
  companyId: string; // '' when there's no linked artifact (e.g. a study-abroad semester)
  name: string;
  role: string;
  isEducation: boolean;
};

export const timelineEntries: TimelineEntry[] = [
  { date: "Nov 2025 – now", companyId: "pentatonic", name: "Pentatonic", role: "Head of Technical Deployment Strategy", isEducation: false },
  { date: "Aug 2023 – Nov 2025", companyId: "pentatonic", name: "Pentatonic", role: "Circularity Lead", isEducation: false },
  { date: "Sep 2022 – Aug 2023", companyId: "pentatonic", name: "Pentatonic", role: "Circular Economy Strategic Consultant", isEducation: false },
  { date: "Mar 2022 – Aug 2022", companyId: "razor", name: "Razor Group", role: "Product Growth Manager", isEducation: false },
  { date: "2021 – 2022", companyId: "leafymade", name: "Leafymade", role: "Consultant", isEducation: false },
  {
    date: "Jul 2019 – Sep 2021",
    companyId: "fairtrade",
    name: "Fairtrade International",
    role: "Brand, Trademark, and Licensing Graduate Student Assistant",
    isEducation: false,
  },
  { date: "Oct 2017 – Dec 2020", companyId: "bonn", name: "University of Bonn", role: "M.Sc., Agricultural and Food Economics", isEducation: true },
  { date: "Jun 2018 – Mar 2020", companyId: "que", name: "que Bottle", role: "Director of European Operations", isEducation: false },
  { date: "Jun 2017 – Jun 2018", companyId: "que", name: "que Bottle", role: "Product & Operations Lead", isEducation: false },
  { date: "Jan 2017 – Jun 2017", companyId: "que", name: "que Bottle", role: "Founder’s Associate", isEducation: false },
  { date: "Jan 2016", companyId: "", name: "Lund University", role: "Semester study abroad", isEducation: true },
  {
    date: "2012 – 2016",
    companyId: "berkeley",
    name: "UC Berkeley",
    role: "B.S. Environmental Economics & Policy; B.S. Society & Environment",
    isEducation: true,
  },
];

export const timelineThumbnails: Record<string, string> = {
  pentatonic: "/assets/thumbs/pentatonic.png",
  razor: "/assets/thumbs/razor.jpeg",
  leafymade: "/assets/thumbs/leafymade.jpeg",
  fairtrade: "/assets/thumbs/fairtrade.jpeg",
  que: "/assets/thumbs/que.jpeg",
  bonn: "/assets/thumbs/bonn.jpeg",
  berkeley: "/assets/thumbs/berkeley.jpeg",
};
