import { motion } from "framer-motion";
import { Shield, Zap, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 font-medium text-sm">
              <Zap className="w-4 h-4" />
              Assistant intelligent de réparation PC
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Votre ordinateur est{" "}
              <span className="text-accent">lent</span> ?
              <br />
              Nelvis le répare en{" "}
              <span className="text-primary">quelques minutes</span>.
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Téléchargez, lancez, votre PC est réparé en 15 minutes. Automatique, sans technicien.
            </p>

            <Button
              onClick={() => { window.location.href = 'https://payment-links.mollie.com/payment/YziYpGY7nGNZXWbRamPHZ'; }}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-7 rounded-xl shadow-lg shadow-accent/30 hover:shadow-accent/40 transition-all hover:-translate-y-0.5 font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              Réparer mon PC maintenant — 10€
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Aucune donnée personnelle collectée
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Réparation sécurisée
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Résultats visibles immédiatement
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingScreen;
