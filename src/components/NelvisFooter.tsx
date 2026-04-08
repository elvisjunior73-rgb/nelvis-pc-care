import { Link } from "react-router-dom";

const NelvisFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Brand + Quote */}
        <div className="text-center mb-10">
          <h3 className="font-heading text-2xl font-extrabold tracking-tight mb-3">
            <span className="text-accent">NELVIS</span> SANTÉ
          </h3>
          <p className="text-primary-foreground/60 italic text-sm max-w-xl mx-auto leading-relaxed">
            "Nelvis Santé n'est pas une startup de la santé. C'est une infrastructure
            médicale transfrontalière pensée pour durer."
          </p>
        </div>

        {/* 3 columns: Siège Social / Contact / Légal */}
        <div className="grid sm:grid-cols-3 gap-8 text-sm mb-10">
          <div>
            <h4 className="font-heading font-bold text-accent text-xs tracking-widest mb-3">SIÈGE SOCIAL</h4>
            <p className="text-primary-foreground/80 leading-relaxed">
              NELVIS ASSURANCES ET CREDIT<br />
              50 Rue Pelleport, 75020 Paris<br />
              <span className="text-primary-foreground/50">SIRET : 927 569 111 00010</span><br />
              <span className="text-primary-foreground/50">ORIAS : 24005908</span>
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-accent text-xs tracking-widest mb-3">CONTACT</h4>
            <p className="text-primary-foreground/80 leading-relaxed">
              <a href="mailto:contact@nelvis.fr" className="hover:text-accent transition-colors">contact@nelvis.fr</a><br />
              <a href="tel:+33605665205" className="hover:text-accent transition-colors">+33 6 05 66 52 05</a><br />
              <a href="https://wa.me/33745994776" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                WhatsApp : +33 7 45 99 47 76
              </a>
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-accent text-xs tracking-widest mb-3">LÉGAL</h4>
            <div className="flex flex-col gap-1">
              <Link to="/mentions-legales" className="text-primary-foreground/80 hover:text-accent transition-colors">Mentions légales</Link>
              <Link to="/politique-de-confidentialite" className="text-primary-foreground/80 hover:text-accent transition-colors">Politique de confidentialité</Link>
              <Link to="/cgu" className="text-primary-foreground/80 hover:text-accent transition-colors">CGU & Charte déontologique</Link>
            </div>
          </div>
        </div>

        {/* Ecosystem */}
        <div className="border-t border-primary-foreground/10 pt-8 mb-8">
          <h4 className="font-heading font-bold text-accent text-xs tracking-widest text-center mb-4">ÉCOSYSTÈME NELVIS</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: "NELVIS Santé", href: "https://nelvis-sante.com", active: false },
              { name: "NELVIS Web", href: "#", active: false },
              { name: "NELVIS AS", href: "#", active: false },
              { name: "NELVIS RDV", href: "#", active: false },
              { name: "NELVIS Vocal", href: "#", active: false },
              { name: "NELVIS Transit", href: "#", active: false },
              { name: "NELVIS Legal", href: "#", active: false },
              { name: "NELVIS Compta", href: "#", active: false },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-1.5 rounded-full text-xs font-medium border border-primary-foreground/20 text-primary-foreground/70 hover:text-accent hover:border-accent transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
          <p>© 2026 NELVIS SANTÉ — Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default NelvisFooter;
