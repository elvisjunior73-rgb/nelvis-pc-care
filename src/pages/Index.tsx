import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LandingScreen from "@/components/LandingScreen";
import KnowledgeBase from "@/components/KnowledgeBase";
import ScanScreen from "@/components/ScanScreen";
import ResultsScreen from "@/components/ResultsScreen";
import RepairScreen from "@/components/RepairScreen";
import FinalScreen from "@/components/FinalScreen";
import NelvisFooter from "@/components/NelvisFooter";
import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";

type Screen = "landing" | "scan" | "results" | "repair" | "final";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToScan = useCallback(() => setScreen("scan"), []);
  const goToResults = useCallback(() => setScreen("results"), []);
  const goToRepair = useCallback(() => setScreen("repair"), []);
  const goToFinal = useCallback(() => setScreen("final"), []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => setScreen("landing")} className="font-heading font-bold text-lg text-primary flex items-center gap-2">
            🧠 NELVIS
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:block">
              Assistant intelligent de réparation PC
            </span>
            {user ? (
              <Button variant="outline" size="sm" onClick={() => navigate("/mon-espace")}>
                <User className="w-4 h-4 mr-1" /> Mon espace
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate("/connexion")}>
                <LogIn className="w-4 h-4 mr-1" /> Connexion
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {screen === "landing" && (
          <>
            <LandingScreen onStartScan={goToScan} />
            <KnowledgeBase />
          </>
        )}
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
