import { motion } from "framer-motion";
import { Download, ShieldCheck, KeyRound, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import NelvisFooter from "@/components/NelvisFooter";

const steps = [
  {
    icon: Download,
    title: "Téléchargez l'installateur",
    description: "Cliquez sur le bouton ci-dessous pour télécharger NELVIS PC Doctor sur votre ordinateur.",
  },
  {
    icon: ShieldCheck,
    title: "Lancez en tant qu'administrateur",
    description: "Faites un clic droit sur le fichier téléchargé et sélectionnez « Exécuter en tant qu'administrateur ».",
  },
  {
    icon: KeyRound,
    title: "Saisissez votre code licence",
    description: "Entrez le code licence reçu par email après votre achat pour activer le logiciel.",
  },
];

const Telecharger = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-heading font-bold text-lg text-primary flex items-center gap-2">
            🧠 NELVIS
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 font-medium text-sm">
                <Monitor className="w-4 h-4" />
                Windows uniquement
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Télécharger <span className="text-accent">NELVIS PC Doctor</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Installez l'assistant sur votre PC pour lancer l'analyse et la réparation.
              </p>
            </div>

            <div className="flex justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-7 rounded-xl shadow-lg shadow-accent/30 hover:shadow-accent/40 transition-all hover:-translate-y-0.5 font-semibold"
              >
                <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310519663414242828/mNhsactJnWKsTotW.exe" download>
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger NELVIS PC Doctor (.exe - Windows)
                </a>
              </Button>
            </div>

            <div className="space-y-6">
              <h2 className="font-heading text-xl font-semibold text-center mb-6">Comment ça marche ?</h2>
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="flex items-start gap-4 bg-card border border-border rounded-xl p-5"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Icon className="w-4 h-4 text-accent" />
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>

      <NelvisFooter />
    </div>
  );
};

export default Telecharger;
