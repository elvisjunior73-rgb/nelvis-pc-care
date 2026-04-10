import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LandingScreen from "@/components/LandingScreen";
import KnowledgeBase from "@/components/KnowledgeBase";
import NelvisFooter from "@/components/NelvisFooter";
import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-heading font-bold text-lg text-primary flex items-center gap-2">
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
        <LandingScreen />
        <KnowledgeBase />
      </main>

      <NelvisFooter />
    </div>
  );
};

export default Index;
