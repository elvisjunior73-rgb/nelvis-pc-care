import { motion } from "framer-motion";
import { Shield, Zap, Download, Gift, TrendingUp } from "lucide-react";
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
              Réparez votre PC ET gagnez de l'argent
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Votre PC est{" "}
              <span className="text-accent">lent</span> ?
              <br />
              Nelvis le répare.{" "}
              <span className="text-primary">Vous revendez.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-4 max-w-xl mx-auto">
              Pour seulement <strong className="text-foreground">10€</strong> vous recevez :
            </p>

            <div className="flex flex-col items-center gap-2 mb-8 text-left max-w-sm mx-auto">
              <div className="flex items-center gap-3 text-foreground">
                <span className="text-accent text-lg">✅</span>
                <span>1 nettoyage complet de votre PC</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <span className="text-accent text-lg">✅</span>
                <span><strong>5 codes supplémentaires</strong> à revendre</span>
              </div>
            </div>

            {/* Revenue highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="bg-accent/10 border border-accent/30 rounded-xl p-5 max-w-md mx-auto mb-8 text-left"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="font-semibold text-foreground">Le calcul est simple</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                💡 Le prix de réparation PC en boutique ? <strong className="text-foreground">Entre 30€ et 80€</strong>.
              </p>
              <p className="text-sm text-muted-foreground">
                → Revendez à 10€ × 5 = <strong className="text-foreground">50€ encaissés</strong><br />
                → Revendez à 20€ × 5 = <strong className="text-foreground">100€ encaissés</strong><br />
                → Votre investissement : <strong className="text-accent">10€</strong>
              </p>
            </motion.div>

            <p className="text-sm text-muted-foreground mb-6">
              Aucune compétence technique requise. Le logiciel répare automatiquement. Vous encaissez.
            </p>

            <Button
              onClick={() => { window.location.href = 'https://payment-links.mollie.com/payment/YziYpGY7nGNZXWbRamPHZ'; }}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-7 rounded-xl shadow-lg shadow-accent/30 hover:shadow-accent/40 transition-all hover:-translate-y-0.5 font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              Démarrer maintenant — 10€
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Aucune donnée personnelle collectée
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-primary" />
              6 codes licence inclus
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
