import { notFound } from "next/navigation";
import { themeSlugToName } from "@/lib/themeSlugs";
import { AppStateProvider } from "@/context/AppStateContext";
import { PortfolioApp } from "@/components/PortfolioApp";

// Only the registered theme slugs/aliases resolve — anything else 404s
// rather than silently rendering the default portfolio.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(themeSlugToName).map((slug) => ({ slug }));
}

export default async function ThemeSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = themeSlugToName[slug];
  if (!theme) notFound();

  return (
    <AppStateProvider initialTheme={theme}>
      <PortfolioApp />
    </AppStateProvider>
  );
}
