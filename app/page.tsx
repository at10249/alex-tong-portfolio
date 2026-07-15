import { AppStateProvider } from "@/context/AppStateContext";
import { PortfolioApp } from "@/components/PortfolioApp";

export default function Home() {
  return (
    <AppStateProvider>
      <PortfolioApp />
    </AppStateProvider>
  );
}
