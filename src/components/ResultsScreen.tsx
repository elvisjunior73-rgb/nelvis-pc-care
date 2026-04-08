import { motion } from "framer-motion";
import { Turtle, Trash2, AlertTriangle, Lock, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onRepair: () => void;
}

const issues = [
  { icon: Turtle, label: "Démarrage lent", detail: "4 programmes inutiles au démarrage", severity: "high" },
  { icon: Trash2, label: "Fichiers inutiles", detail: "3.2 Go de fichiers temporaires", severity: "medium" },
  { icon: AlertTriangle, label: "Erreurs système", detail: "2 erreurs critiques détectées", severity: "high" },
  { icon: Lock, label: "Sécurité", detail: "Paramètres à optimiser", severity: "medium" },
];

const plan = [
  "Nettoyage complet du système",
  "Accélération du démarrage",
  "Réparation des erreurs",
  "Optimisation des performances",
];

const ResultsScreen = ({ onRepair }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        {/* Score */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
            7 problèmes détectés sur votre ordinateur
          </h2>
          <div className="inline-flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Score santé :</span>
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                <motion.circle
                  cx="40" cy="40" r="35" fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={220}
                  initial={{ strokeDashoffset: 220 }}
                  animate={{ strokeDashoffset: 220 - (220 * 58) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-heading font-bold text-lg text-accent">
                58
              </span>
            </div>
          </div>
        </div>

        {/* Issues */}
        <div className="grid gap-3 mb-8">
          {issues.map((issue, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                issue.severity === "high" ? "bg-destructive/10" : "bg-accent/10"
              }`}>
                <issue.icon className={`w-5 h-5 ${
                  issue.severity === "high" ? "text-destructive" : "text-accent"
                }`} />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{issue.label}</p>
                <p className="text-xs text-muted-foreground">{issue.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plan */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-primary" />
            Plan d'action
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Je peux corriger ces problèmes maintenant :
          </p>
          <ul className="space-y-2">
            {plan.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                <span className="text-accent">✓</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Réparation complète Nelvis — <span className="font-bold text-foreground">29,99€</span>
          </p>
          <Button
            onClick={onRepair}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-7 rounded-xl shadow-lg shadow-accent/30 font-semibold"
          >
            ⚙️ Réparer maintenant
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Intervention sécurisée • Résultats immédiats • Garantie satisfait ou remboursé
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsScreen;
