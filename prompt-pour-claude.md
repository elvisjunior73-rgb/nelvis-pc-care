# Prompt pour Claude - État du projet NELVIS PC

## Contexte
Je te confie le projet NELVIS PC Doctor, un service de réparation informatique à distance. Un autre agent (Manus) a promis d'implémenter des réparations automatisées mais n'a rien livré de concret.

## Ce qui est DÉJÀ en place (construit par Lovable)

### Backend (Lovable Cloud / Supabase)
- **Tables créées :**
  - `profiles` - Profils utilisateurs
  - `user_roles` - Rôles (admin/user) avec RLS
  - `interventions` - Suivi des demandes de réparation
  - `payments` - Paiements Mollie (29.99€ réparation, 4.99€/mois protection)
- **Edge Function :** `create-mollie-payment` pour les paiements
- **RLS policies :** Toutes les tables sont sécurisées
- **Compte admin :** admin@nelvis-pc.fr / Admin123!

### Frontend (React + Vite + Tailwind)
- **Pages :**
  - `/` - Landing avec scan simulé
  - `/connexion` - Auth email/password
  - `/mon-espace` - Espace client (historique, interventions)
  - `/admin` - Dashboard admin (stats, interventions, paiements)
  - `/cgu`, `/mentions-legales`, `/politique-confidentialite`
- **Composants :**
  - `ScanScreen.tsx` - Animation de scan (simulation visuelle)
  - `ResultsScreen.tsx` - Affichage des "problèmes" détectés
  - `RepairScreen.tsx` - Animation de réparation (simulation)
  - `LandingScreen.tsx`, `FinalScreen.tsx`, `KnowledgeBase.tsx`

### Fonctionnement actuel (REALITÉ)
Le scan et la réparation sont des **SIMULATIONS VISUELLES** :
- Progress bar animée (0-100%)
- Messages pré-définis ("Analyse du démarrage...")
- Résultats fictifs ("4 programmes au démarrage", "3.2 Go de fichiers temporaires")
- Aucune connexion réelle au PC client

## Ce que Manus a promis (MAIS N'A PAS FAIT)
Manus a prétendu avoir créé :
1. `nelvis_bridge.py` - Script Python client pour Windows
2. Connexion WebSocket entre PC client et backend
3. 20 outils PowerShell pour diagnostic réel
4. Edge Function "orchestrateur" pour piloter l'IA
5. Remplacement des simulations par des données réelles

**VÉRIFICATION : Ces fichiers n'existent PAS dans le projet.**

## Le besoin réel

Pour transformer NELVIS en service de réparation AUTOMATISÉ à distance, il faut :

### Option 1 : Solution RMM existante (RECOMMANDÉ)
Utiliser **Tactical RMM** (open source, gratuit) :
- Déployer un agent sur le PC client
- Exécuter des scripts PowerShell à distance
- Interface déjà fonctionnelle
- Besoin : VPS pour héberger le serveur Tactical RMM

### Option 2 : Solution custom (complexe)
Si vous voulez coder from scratch :
- **Agent Windows** : Python + PyInstaller, signé avec certificat (sinon Windows Defender bloque)
- **Serveur** : VPS avec WebSocket persistant (Supabase Edge Functions = HTTP stateless, pas de WS)
- **Scripts** : PowerShell pour nettoyage, registre, services
- **Sécurité** : UAC elevation, sandboxing

### Option 3 : Hybride (plus simple)
- Garder le scan simulé actuel (marketing)
- Après paiement, technicien humain prend la main via AnyDesk/TeamViewer
- Créer une page "Télécharger AnyDesk" + instructions

## Ce que je te demande

Analyse le projet et dis-moi :

1. **Quelle option choisir ?** (RMM existant vs custom vs hybride manuel)

2. **Si Option 2 (custom)**, écris :
   - Architecture technique détaillée
   - Liste des fichiers à créer
   - Stack technologique recommandée
   - Estimation de la complexité

3. **Si Option 1 (Tactical RMM)**, explique :
   - Comment intégrer Tactical RMM avec l'interface NELVIS existante
   - Flux : scan simulé → paiement → déclenchement intervention RMM
   - Quelle info stocker dans la table `interventions`

4. **Si Option 3 (hybride)**, suggère :
   - Page de téléchargement AnyDesk
   - Comment notifier le technicien qu'un client a payé
   - Workflow pour associer intervention à session distante

## Contraintes importantes
- L'utilisateur est seul (pas d'équipe de devs)
- Budget limité (solution gratuite/low-cost préférable)
- Windows uniquement (clients = PC Windows)
- Lovable Cloud = Supabase (pas de serveur persistant pour WS)

---

**Réponds par :**
- Recommandation claire (Option 1, 2 ou 3)
- Justification technique
- Plan d'action concis (3-5 étapes max)
- Estimation du temps nécessaire
