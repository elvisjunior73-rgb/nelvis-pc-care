import { Link } from "react-router-dom";
import NelvisFooter from "@/components/NelvisFooter";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-heading font-bold text-lg text-primary flex items-center gap-2">
            🧠 NELVIS
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-heading font-extrabold text-foreground mb-8">Mentions légales</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">1. Éditeur du site</h2>
            <p>
              Le site <strong>nelvis.fr</strong> est édité par :<br />
              <strong>NELVIS ASSURANCES ET CREDIT</strong><br />
              Société par actions simplifiée (SAS)<br />
              Siège social : 50 Rue Pelleport, 75020 Paris, France<br />
              SIRET : 927 569 111 00010<br />
              ORIAS : 24005908<br />
              Email : <a href="mailto:contact@nelvis.fr" className="text-primary hover:text-accent">contact@nelvis.fr</a><br />
              Téléphone : <a href="tel:+33605665205" className="text-primary hover:text-accent">+33 6 05 66 52 05</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">2. Directeur de la publication</h2>
            <p>Le directeur de la publication est le représentant légal de la société NELVIS ASSURANCES ET CREDIT.</p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">3. Hébergement</h2>
            <p>
              Le site est hébergé par :<br />
              <strong>Lovable (Lovable Technologies)</strong><br />
              Hébergement cloud sécurisé — Infrastructure européenne.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">4. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu du site (textes, images, graphismes, logo, icônes, logiciels, etc.)
              est la propriété exclusive de NELVIS ASSURANCES ET CREDIT ou de ses partenaires. Toute reproduction,
              représentation, modification, publication ou adaptation de tout ou partie des éléments du site
              est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">5. Données personnelles</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique
              et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition
              aux données personnelles vous concernant. Pour exercer ces droits, contactez-nous à :
              <a href="mailto:contact@nelvis.fr" className="text-primary hover:text-accent"> contact@nelvis.fr</a>.
            </p>
            <p>
              Pour plus de détails, consultez notre <Link to="/politique-de-confidentialite" className="text-primary hover:text-accent">Politique de confidentialité</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">6. Cookies</h2>
            <p>
              Le site peut utiliser des cookies à des fins de mesure d'audience et d'amélioration de l'expérience
              utilisateur. Vous pouvez configurer votre navigateur pour refuser les cookies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">7. Limitation de responsabilité</h2>
            <p>
              NELVIS s'efforce de fournir des informations aussi précises que possible. Toutefois, elle ne saurait
              être tenue responsable des omissions, inexactitudes ou carences dans la mise à jour des informations.
              L'utilisation du service NELVIS (analyse et réparation PC) se fait sous la responsabilité de l'utilisateur.
            </p>
          </section>
        </div>
      </main>

      <NelvisFooter />
    </div>
  );
};

export default MentionsLegales;
