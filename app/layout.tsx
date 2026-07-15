import type { Metadata } from "next";
import { Spectral, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

export const metadata: Metadata = {
  // TODO: update once claude.whoisalextong.com's DNS is live — this must
  // point at whichever domain is the real canonical one, so shared-link
  // previews (og:image, etc.) resolve to a URL that actually responds.
  metadataBase: new URL("https://claude-whoisalextong.vercel.app"),
  title: "Alex Tong — Ask me anything",
  description:
    "An interactive AI-assistant-style portfolio for Alex Tong. Pick a conversation or ask your own question.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spectral.variable} ${plexMono.variable} ${plexSans.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
