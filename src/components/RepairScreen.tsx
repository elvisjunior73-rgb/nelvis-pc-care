import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const repairSteps = [
  "Nettoyage des fichiers temporaires…",
  "Optimisation du démarrage…",
  "Réparation système…",
  "Ajustement des paramètres…",
];

const RepairScreen = ({ onComplete }: Props) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const runStep = (step: number) => {
      if (step >= repairSteps.length) {
        setTimeout(onComplete, 800);
        return;
      }
      setActiveStep(step);
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, step]);
        runStep(step + 1);
      }, 1500);
    };
    runStep(0);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-lg w-full text-center"
      >
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-accent/10 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Wrench className="w-9 h-9 text-accent" />
          </motion.div>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Réparation en cours…
        </h2>
        <p className="text-muted-foreground mb-10">
          Nelvis corrige les problèmes détectés
        </p>

        <div className="space-y-4 text-left">
          {repairSteps.map((step, i) => {
            const isDone = completedSteps.includes(i);
            const isActive = activeStep === i && !isDone;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: i <= activeStep ? 1 : 0.3 }}
                className="flex items-center gap-4 text-sm"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  isDone
                    ? "bg-accent text-accent-foreground"
                    : isActive
                    ? "bg-primary/20 text-primary animate-pulse"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {isDone ? "✓" : i + 1}
                </div>
                <span className={isDone ? "text-foreground" : isActive ? "text-foreground" : "text-muted-foreground/50"}>
                  {step}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default RepairScreen;
