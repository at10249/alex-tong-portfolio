import type { Metadata } from "next";
import {
  Spectral,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Orbitron,
  Rajdhani,
  Share_Tech_Mono,
  Cinzel,
  EB_Garamond,
  Cutive_Mono,
  Pirata_One,
  Crimson_Text,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/siteConfig";
import { cvHeader } from "@/lib/cv/cvData";
import "./globals.css";

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Cyberpunk theme
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Medieval theme
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cutiveMono = Cutive_Mono({
  variable: "--font-cutive-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Game of Thrones / A Song of Ice and Fire theme
const pirataOne = Pirata_One({
  variable: "--font-pirata-one",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson-text",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Alex Tong — Ask me anything",
  description:
    "An interactive AI-assistant-style portfolio for Alex Tong. Pick a conversation or ask your own question.",
  twitter: {
    card: "summary_large_image",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: cvHeader.name,
  jobTitle: cvHeader.title,
  url: SITE_URL,
  image: `${SITE_URL}/assets/alex.jpeg`,
  worksFor: {
    "@type": "Organization",
    name: "Pentatonic",
    url: "https://pentatonic.com",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Bonn" },
    { "@type": "CollegeOrUniversity", name: "University of California, Berkeley" },
  ],
  sameAs: [`https://${cvHeader.linkedin}`],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${plexMono.variable} ${plexSans.variable} ${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable} ${cinzel.variable} ${ebGaramond.variable} ${cutiveMono.variable} ${pirataOne.variable} ${crimsonText.variable}`}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
