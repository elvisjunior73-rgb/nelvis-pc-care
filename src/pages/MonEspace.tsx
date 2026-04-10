import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, KeyRound, CheckCircle, XCircle, Loader2 } from "lucide-react";
import NelvisFooter from "@/components/NelvisFooter";

const EXTERNAL_SUPABASE_URL = "https://ihsylxxuakpqciyweied.supabase.co";

const MonEspace = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleCheck = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${EXTERNAL_SUPABASE_URL}/functions/v1/check-license`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ success: true, message: data.message || "Code licence valide !" });
      } else {
        setResult({ success: false, message: data.error || data.message || "Code licence invalide." });
      }
    } catch {
      setResult({ success: false, message: "Erreur de connexion au serveur. Réessayez." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-heading font-bold text-lg text-primary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> 🧠 NELVIS
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <KeyRound className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">Mon espace</h1>
            <p className="text-muted-foreground">Vérifiez votre code licence pour activer NELVIS.</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="license-code">Code licence</Label>
              <Input
                id="license-code"
                placeholder="Ex : NELVIS-XXXX-XXXX"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              />
            </div>

            <Button onClick={handleCheck} disabled={loading || !code.trim()} className="w-full">
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Vérification…</>
              ) : (
                "Vérifier mon code"
              )}
            </Button>

            {result && (
              <Alert variant={result.success ? "default" : "destructive"}>
                {result.success ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <AlertTitle>{result.success ? "Licence valide" : "Erreur"}</AlertTitle>
                <AlertDescription>{result.message}</AlertDescription>
              </Alert>
            )}
          </div>
        </motion.div>
      </main>

      <NelvisFooter />
    </div>
  );
};

export default MonEspace;
