import { Link } from "react-router-dom";
import NelvisFooter from "@/components/NelvisFooter";

const PolitiqueConfidentialite = () => {
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
        <h1 className="text-3xl font-heading font-extrabold text-foreground mb-8">Politique de confidentialité</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles est :<br />
              <strong>NELVIS ASSURANCES ET CREDIT</strong><br />
              50 Rue Pelleport, 75020 Paris<br />
              Email : <a href="mailto:contact@nelvis.fr" className="text-primary hover:text-accent">contact@nelvis.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">2. Données collectées</h2>
            <p>Dans le cadre de l'utilisation du service NELVIS, nous pouvons collecter :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Données d'identification : nom, prénom, adresse email</li>
              <li>Données techniques : adresse IP, type de navigateur, système d'exploitation</li>
              <li>Données d'utilisation : résultats du scan, actions de réparation effectuées</li>
              <li>Données de paiement : traitées exclusivement par notre prestataire de paiement sécurisé (Stripe)</li>
            </ul>
            <p className="mt-2 font-medium text-foreground">
              ⚠️ NELVIS ne collecte aucune donnée personnelle stockée sur votre ordinateur.
              L'analyse porte uniquement sur les performances système et la configuration logicielle.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">3. Finalités du traitement</h2>
            <p>Les données collectées sont utilisées pour :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fournir le service d'analyse et de réparation PC</li>
              <li>Traiter les paiements</li>
              <li>Améliorer la qualité du service</li>
              <li>Communiquer avec vous concernant votre utilisation du service</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">4. Base légale</h2>
            <p>
              Le traitement des données repose sur : l'exécution du contrat de service,
              votre consentement (pour les cookies et communications marketing),
              et nos intérêts légitimes (amélioration du service, sécurité).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">5. Durée de conservation</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Données de compte : conservées pendant la durée de la relation commerciale + 3 ans</li>
              <li>Données de paiement : conformément aux obligations comptables (10 ans)</li>
              <li>Données techniques de scan : 12 mois maximum</li>
              <li>Cookies : 13 mois maximum</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">6. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
              <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
              <li><strong>Droit de limitation</strong> : restreindre le traitement</li>
            </ul>
            <p className="mt-2">
              Pour exercer ces droits : <a href="mailto:contact@nelvis.fr" className="text-primary hover:text-accent">contact@nelvis.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">7. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
              vos données : chiffrement SSL/TLS, accès restreint, hébergement sécurisé en Europe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">8. Réclamation</h2>
            <p>
              Si vous estimez que le traitement de vos données constitue une violation du RGPD,
              vous pouvez introduire une réclamation auprès de la CNIL :{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="text-primary hover:text-accent">www.cnil.fr</a>
            </p>
          </section>
        </div>
      </main>

      <NelvisFooter />
    </div>
  );
};

export default PolitiqueConfidentialite;
