import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "signup") {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({ title: "Erreur", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Compte créé !", description: "Vérifiez votre email pour confirmer." });
        setMode("login");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "Erreur de connexion", description: error.message, variant: "destructive" });
      } else {
        navigate("/mon-espace");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            <h1 className="font-heading text-2xl font-bold text-center mb-6">
              {mode === "login" ? "Connexion" : "Créer un compte"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <Label htmlFor="fullName">Nom complet</Label>
                  <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required />
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Chargement..." : mode === "login" ? (
                  <><LogIn className="w-4 h-4 mr-2" /> Se connecter</>
                ) : (
                  <><UserPlus className="w-4 h-4 mr-2" /> Créer mon compte</>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              {mode === "login" ? (
                <>Pas de compte ? <button onClick={() => setMode("signup")} className="text-primary hover:underline">S'inscrire</button></>
              ) : (
                <>Déjà un compte ? <button onClick={() => setMode("login")} className="text-primary hover:underline">Se connecter</button></>
              )}
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Auth;
