import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const NelvisFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Ecosystem */}
        <div className="text-center mb-10">
          <h3 className="font-heading text-xl font-bold mb-2">🧠 Écosystème NELVIS</h3>
          <p className="text-primary-foreground/70 text-sm max-w-md mx-auto">
            Nelvis analyse, répare et protège votre ordinateur grâce à l'intelligence artificielle.
            Un assistant calme, précis et rassurant.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-10">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
            <span className="text-primary-foreground/80">
              50 Rue Pelleport,<br />75020 Paris
            </span>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 mt-0.5 text-accent shrink-0" />
            <a href="mailto:contact@nelvis.fr" className="text-primary-foreground/80 hover:text-accent transition-colors">
              contact@nelvis.fr
            </a>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 mt-0.5 text-accent shrink-0" />
            <a href="tel:+33605665205" className="text-primary-foreground/80 hover:text-accent transition-colors">
              +33 6 05 66 52 05
            </a>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="w-4 h-4 mt-0.5 text-accent shrink-0" />
            <a href="https://wa.me/33745994776" target="_blank" rel="noreferrer" className="text-primary-foreground/80 hover:text-accent transition-colors">
              WhatsApp : +33 7 45 99 47 76
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50">
          <p>SIRET : 927 569 111 00010</p>
          <p className="mt-1">© 2026 NELVIS — Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default NelvisFooter;
