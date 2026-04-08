import { useState, useCallback } from "react";
import LandingScreen from "@/components/LandingScreen";
import ScanScreen from "@/components/ScanScreen";
import ResultsScreen from "@/components/ResultsScreen";
import RepairScreen from "@/components/RepairScreen";
import FinalScreen from "@/components/FinalScreen";
import NelvisFooter from "@/components/NelvisFooter";

type Screen = "landing" | "scan" | "results" | "repair" | "final";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");

  const goToScan = useCallback(() => setScreen("scan"), []);
  const goToResults = useCallback(() => setScreen("results"), []);
  const goToRepair = useCallback(() => setScreen("repair"), []);
  const goToFinal = useCallback(() => setScreen("final"), []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => setScreen("landing")} className="font-heading font-bold text-lg text-primary flex items-center gap-2">
            🧠 NELVIS
          </button>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Assistant intelligent de réparation PC
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {screen === "landing" && <LandingScreen onStartScan={goToScan} />}
        {screen === "scan" && <ScanScreen onComplete={goToResults} />}
        {screen === "results" && <ResultsScreen onRepair={goToRepair} />}
        {screen === "repair" && <RepairScreen onComplete={goToFinal} />}
        {screen === "final" && <FinalScreen />}
      </main>

      <NelvisFooter />
    </div>
  );
};

export default Index;
