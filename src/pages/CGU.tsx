import { Link } from "react-router-dom";
import NelvisFooter from "@/components/NelvisFooter";

const CGU = () => {
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
        <h1 className="text-3xl font-heading font-extrabold text-foreground mb-8">Conditions Générales d'Utilisation & Charte déontologique</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">1. Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (CGU) définissent les modalités d'accès
              et d'utilisation du service NELVIS, assistant intelligent d'analyse et de réparation PC,
              édité par NELVIS ASSURANCES ET CREDIT.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">2. Description du service</h2>
            <p>NELVIS propose un service comprenant :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Analyse gratuite</strong> : scan automatique des performances et de la configuration de votre ordinateur</li>
              <li><strong>Diagnostic</strong> : identification des problèmes (lenteur, fichiers inutiles, erreurs système, sécurité)</li>
              <li><strong>Réparation</strong> (service payant) : nettoyage, optimisation et réparation automatisée</li>
              <li><strong>Protection continue</strong> (abonnement optionnel) : surveillance et optimisation automatique</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">3. Accès au service</h2>
            <p>
              L'accès au service d'analyse est gratuit et ne nécessite pas de création de compte.
              Les services de réparation et de protection continue sont soumis à paiement.
              NELVIS se réserve le droit de modifier, suspendre ou interrompre le service à tout moment.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">4. Tarification</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Analyse</strong> : gratuite</li>
              <li><strong>Réparation complète</strong> : 29,99 € TTC (paiement unique)</li>
              <li><strong>Protection automatique</strong> : 4,99 € TTC/mois (résiliable à tout moment)</li>
            </ul>
            <p className="mt-2">
              Les prix sont indiqués en euros, toutes taxes comprises (TVA française applicable).
              Le paiement est sécurisé via notre prestataire Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">5. Droit de rétractation</h2>
            <p>
              Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation
              ne peut être exercé pour les services pleinement exécutés avant la fin du délai de rétractation
              et dont l'exécution a commencé avec votre accord préalable exprès.
            </p>
            <p>
              Toutefois, NELVIS offre une <strong>garantie satisfait ou remboursé</strong> :
              si la réparation ne produit aucune amélioration mesurable, un remboursement intégral
              sera effectué sur demande dans les 14 jours suivant l'intervention.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">6. Responsabilités de l'utilisateur</h2>
            <p>L'utilisateur s'engage à :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Utiliser le service conformément à sa destination</li>
              <li>Ne pas tenter de contourner les mesures de sécurité du service</li>
              <li>Sauvegarder ses données importantes avant toute intervention de réparation</li>
              <li>Fournir des informations exactes lors du paiement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">7. Limitation de responsabilité</h2>
            <p>
              NELVIS met en œuvre tous les moyens raisonnables pour fournir un service de qualité.
              Toutefois, NELVIS ne saurait être tenue responsable :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>De la perte de données résultant de l'utilisation du service</li>
              <li>Des dommages indirects liés à l'utilisation ou l'impossibilité d'utilisation du service</li>
              <li>Des interruptions temporaires du service pour maintenance ou mise à jour</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">8. Charte déontologique NELVIS</h2>
            <p>NELVIS s'engage à respecter les principes suivants :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Transparence</strong> : chaque action réalisée est clairement expliquée à l'utilisateur</li>
              <li><strong>Respect de la vie privée</strong> : aucune donnée personnelle n'est consultée ou collectée sans nécessité</li>
              <li><strong>Honnêteté</strong> : les résultats d'analyse reflètent l'état réel de l'ordinateur, sans exagération</li>
              <li><strong>Sécurité</strong> : toutes les interventions sont réversibles et sécurisées</li>
              <li><strong>Accessibilité</strong> : un langage clair et compréhensible, sans jargon technique inutile</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">9. Propriété intellectuelle</h2>
            <p>
              Le service NELVIS, son interface, ses algorithmes et son contenu sont protégés par le droit
              de la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">10. Droit applicable et juridiction</h2>
            <p>
              Les présentes CGU sont régies par le droit français. En cas de litige, les parties
              s'engagent à rechercher une solution amiable. À défaut, les tribunaux de Paris seront
              seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-foreground">11. Contact</h2>
            <p>
              Pour toute question relative aux présentes CGU :<br />
              Email : <a href="mailto:contact@nelvis.fr" className="text-primary hover:text-accent">contact@nelvis.fr</a><br />
              Courrier : NELVIS ASSURANCES ET CREDIT — 50 Rue Pelleport, 75020 Paris
            </p>
          </section>

          <p className="text-xs text-muted-foreground/60 pt-4 border-t border-border">
            Dernière mise à jour : avril 2026
          </p>
        </div>
      </main>

      <NelvisFooter />
    </div>
  );
};

export default CGU;
