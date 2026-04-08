import { motion } from "framer-motion";
import { Rocket, HardDrive, Wrench, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const improvements = [
  { icon: Rocket, label: "Démarrage plus rapide" },
  { icon: HardDrive, label: "3.2 Go d'espace libéré" },
  { icon: Wrench, label: "Système réparé" },
  { icon: Lock, label: "Sécurité améliorée" },
];

const FinalScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full text-center"
      >
        {/* Celebration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-6xl mb-6"
        >
          🎉
        </motion.div>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Votre ordinateur est optimisé
        </h2>
        <p className="text-muted-foreground mb-8">Tous les problèmes ont été corrigés</p>

        {/* Score */}
        <div className="flex justify-center mb-10">
          <div className="relative w-28 h-28">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="48" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <motion.circle
                cx="56" cy="56" r="48" fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={301}
                initial={{ strokeDashoffset: 301 }}
                animate={{ strokeDashoffset: 301 - (301 * 91) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading font-bold text-2xl text-accent">91</span>
              <span className="text-[10px] text-muted-foreground">/ 100</span>
            </div>
          </div>
        </div>

        {/* Improvements */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {improvements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
            >
              <item.icon className="w-5 h-5 text-accent shrink-0" />
              <span className="text-sm text-foreground font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Upsell */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-primary/5 border border-primary/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              Protection automatique Nelvis
            </h3>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1 mb-4">
            <li>🔄 Surveillance continue</li>
            <li>⚡ Optimisation automatique</li>
            <li>🔔 Alertes intelligentes</li>
          </ul>
          <p className="text-sm text-foreground font-semibold mb-4">4,99€/mois</p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8">
            Activer la protection
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FinalScreen;
