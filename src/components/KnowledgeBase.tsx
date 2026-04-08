import { motion } from "framer-motion";
import {
  Zap, ShieldAlert, Wifi, AlertTriangle, Settings, Lock,
  HardDrive, Globe, Thermometer, Gamepad2
} from "lucide-react";

const domains = [
  { icon: Zap, title: "Nettoyage & Optimisation", problem: "Lenteur / Freezes", action: "Analyse démarrage, suppression temp, optimisation registre", color: "text-blue-500" },
  { icon: ShieldAlert, title: "Suppression Malwares", problem: "Pubs / Détournement", action: "Scan processus, nettoyage extensions, reset réseau", color: "text-red-500" },
  { icon: Wifi, title: "Gestion Pilotes", problem: "Son / Wi-Fi / Imprimante", action: "Identification ID matériel et installation driver stable", color: "text-green-500" },
  { icon: AlertTriangle, title: "Réparation Système", problem: "Erreur .dll / BSOD", action: "Exécution auto SFC /scannow et DISM", color: "text-orange-500" },
  { icon: Settings, title: "Configuration Logicielle", problem: "Outlook / Office / VPN", action: "Paramétrage protocoles et installation par script", color: "text-purple-500" },
  { icon: Lock, title: "Sécurisation", problem: "Alertes / Failles", action: "Activation Pare-feu et audit confidentialité", color: "text-emerald-500" },
  { icon: HardDrive, title: "Libération Espace", problem: "Disque saturé", action: "Suppression fichiers volumineux et CompactOS", color: "text-yellow-500" },
  { icon: Globe, title: "Résolution Web", problem: "Erreur SSL / Horloge", action: "Reset cache DNS et synchro NTP", color: "text-cyan-500" },
  { icon: Thermometer, title: "Diagnostic Santé", problem: "Surchauffe / Bruit", action: "Analyse sondes thermiques et rapport SMART/Batterie", color: "text-rose-500" },
  { icon: Gamepad2, title: "Optimisation Gaming", problem: "Chute FPS", action: "Mode haute performance et allocation GPU", color: "text-indigo-500" },
];

const KnowledgeBase = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Nos domaines d'intervention
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Au-delà des pannes matérielles, Nelvis intervient sur 10 catégories de problèmes logiciels et système.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-muted ${d.color} group-hover:scale-110 transition-transform`}>
                  <d.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-foreground text-sm mb-1">{d.title}</h3>
                  <p className="text-xs text-destructive font-medium mb-1">🔴 {d.problem}</p>
                  <p className="text-xs text-muted-foreground">✅ {d.action}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBase;
