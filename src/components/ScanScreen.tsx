import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const steps = [
  "Analyse du démarrage…",
  "Vérification des fichiers système…",
  "Détection des ralentissements…",
  "Scan sécurité…",
];

const ScanScreen = ({ onComplete }: Props) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + 1;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const stepIndex = Math.min(Math.floor(progress / 25), steps.length - 1);
    setCurrentStep(stepIndex);
  }, [progress]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full text-center"
      >
        {/* Animated icon */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
          <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Monitor className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Analyse de votre ordinateur en cours…
        </h2>
        <p className="text-muted-foreground mb-8">
          Nelvis inspecte chaque recoin de votre système
        </p>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-3 mb-6 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <p className="text-sm font-medium text-foreground mb-6">{progress}%</p>

        {/* Steps */}
        <div className="space-y-3 text-left">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: i <= currentStep ? 1 : 0.3,
                x: 0,
              }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-3 text-sm"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  i < currentStep
                    ? "bg-accent"
                    : i === currentStep
                    ? "bg-primary animate-pulse"
                    : "bg-muted-foreground/30"
                }`}
              />
              <span
                className={
                  i <= currentStep
                    ? "text-foreground"
                    : "text-muted-foreground/50"
                }
              >
                {step}
              </span>
              {i < currentStep && (
                <span className="text-accent ml-auto text-xs font-medium">✓</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ScanScreen;
