## Plan d'implémentation NELVIS PC

### 1. Activer Lovable Cloud
- Backend (DB, auth, edge functions, secrets)

### 2. Base de données
- Tables : `profiles`, `user_roles`, `interventions`, `payments`
- RLS policies pour sécuriser les accès
- Fonction `has_role` pour vérifier les rôles admin

### 3. Base de connaissances (10 domaines d'intervention)
- Nouvelle section sur la landing page affichant les 10 domaines
- Cards interactives : Nettoyage, Malwares, Pilotes, Réparation Système, Config Logicielle, Sécurisation, Libération Espace, Résolution Web, Diagnostic Santé, Optimisation Gaming

### 4. Authentification
- Page `/connexion` (email + mot de passe)
- Profil utilisateur automatique à l'inscription

### 5. Paiement Mollie
- Edge function `create-mollie-payment` (même structure que nelvis-sante.com)
- Secret `MOLLIE_API_KEY` (clé existante : `live_e8SnercueP6EUqut8pb5JPDKEfp2Qm`)
- Paiement de 29.99€ pour réparation, 4.99€/mois pour protection

### 6. Espace Client (`/mon-espace`)
- Suivi en direct de l'intervention (statut, étapes)
- Lien de prise en main à distance (AnyDesk/TeamViewer)
- Historique des interventions et paiements

### 7. Espace Admin (`/admin`)
- Dashboard : nombre d'inscrits, interventions, paiements
- Liste des utilisateurs et interventions
- Gestion des statuts d'intervention en temps réel
- Vue des paiements Mollie
