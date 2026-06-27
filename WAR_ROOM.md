# WAR ROOM — Poker Hub Jerome Ibiza

> Projet **SIDE**, 100% separe du site principal `jeromeibiza-app`.
> Aucun lien croise pour l'instant. Repo dedie, futur Vercel dedie
> (futur `poker.jeromeibiza.com`). On ne touche JAMAIS au site live.

Derniere mise a jour : 2026-06-27 (maillage interne SEO, branche `seo`).

---

## ✅ Fait (2026-06-27 — refonte du maillage interne, branche `seo`)

Tout est DERIVE des donnees : quand on ajoute une lecon / un format / un article /
un terme, ses liens internes (et ceux qui pointent vers lui) se recalculent seuls,
sans rien re-editer a la main. Aucun fichier du jeu touche (branche `seo` only).

- [x] **Liens « voir aussi » contextuels** (`src/lib/poker/related.ts`) : fini les 3 liens
  codes en dur identiques partout. Chaque lecon / format / article reçoit des liens
  connexes calcules (pages du meme silo + cross-silo curé : lecon de tournoi → format MTT,
  lecon de cotes → calculateurs...). Champ `related?` optionnel pour forcer un lien a la main.
- [x] **Pages glossaire crawlables** `/glossaire/[terme]` : **299 fiches** statiques (une URL
  propre par terme, avant tout pointait vers `/glossaire?q=` = une seule page). Definition +
  exemple + termes lies + lien vers le cours dedie. JSON-LD `DefinedTerm` par fiche.
  Termes cliquables dans le glossaire + ajoutees au `sitemap.xml`.
- [x] **Autolink ameliore** (`autolink.tsx`) : pointe vers la fiche `/glossaire/<slug>` (vraie
  page) ; et les termes forts (GTO, MDF, MTT, c-bet, ICM, range, bankroll...) pointent
  direct vers leur cours/format dedie (lien de contenu a contenu, top pour le SEO).
- [x] **Maillage inter-hubs** : bloc « voir aussi » ajoute sur les hubs strategie / formats /
  poker-en-ligne / calculateurs (apprendre + glossaire en avaient deja).
- [x] Build prod OK : 0 erreur, toutes les routes en statique (dont les 299 fiches glossaire).

> Reste possible (non bloquant) : remplir des `related` editoriaux sur-mesure au cas par cas,
> et nettoyer le `useEffect ?q=` devenu vestigial dans `GlossaryBrowser` (lint pre-existant).

## ✅ Fait (nuit du 2026-06-20 — contenu + audit)

- [x] **Identite visuelle** : palette repassee 100% bleu/or/noir (zero vert), banniere croupier (image dealer) sur l'Academie, logo en or, menu burger transforme en vrai menu deroulant flottant.
- [x] **Glossaire 300 termes** (objectif atteint) : accents OK, zero marqueur "contenu IA".
- [x] **Strategie** : 15 cours reels (debutant/intermediaire/avance) + route dynamique `/strategie/[lecon]` + index relie. Fini les "Cours a venir".
- [x] **Formats** : 8 fiches detaillees + route `/formats/[format]` + comparatif relie.
- [x] **Poker en ligne** : 7 articles pedago (neutres, sans promo room) + route `/poker-en-ligne/[article]`.
- [x] Build OK : **63 pages** statiques, 0 erreur.
- [x] **Audit complet multi-experts** (7 experts + challenge croise + 3 veilles concurrentielles, 18 agents) : voir `AUDIT.md`. Note globale 6,8/10. 3 sites gagnants identifies : Winamax Ecole de poker, Cerus Casino Academy, PokerCoaching.com.

## ✅ Fait (V1.1 — ajouts du 2026-06-19 soir)

- [x] **Parcours debutant interactif** `/apprendre/parcours-debutant` : 6 etapes a cocher, mini-quiz de validation par palier (il faut tout reussir pour debloquer la suite), examen final 10 questions + certificat. Progression sauvegardee en localStorage.
- [x] **Passe qualite FR (retour de Kristofer)** : accents corrects sur TOUT le site + correction du bug JSX des espaces colles apres les `<strong>`/`<a>` (verifie page par page, 0 restant).

## ✅ Fait (V1 — fondation)

- [x] Scaffold Next.js 16.2.9 / React 19.2.4 / Tailwind v4 / TS (meme stack que le site live → fusionnable plus tard)
- [x] Design system maison : Anton/Oswald/Inter, cadres arrondis, en-tetes `.shead`, listes `.lb`, ambiance feutre poker
- [x] Layout + header (nav + mega-menu mobile) + footer (mentions 18+)
- [x] **Home Poker Hub** (hero, highlights, toutes les sections, bandeau croupier)
- [x] **APPRENDRE** (pilier SEO complet) :
  - [x] Les regles du poker
  - [x] Classement des mains (10 mains + probas exactes + **quiz interactif** "quelle main gagne ?")
  - [x] Les positions (8 positions)
  - [x] Les blindes & antes
  - [x] Deroulement d'une main (exemple illustre preflop → showdown)
- [x] **Glossaire** : moteur de recherche live + filtre A-Z, ~75 termes (objectif 300+)
- [x] **Academie Croupier** : index + **Module 1 redige** + 9 modules avec plan detaille (pages dynamiques SSG)
- [x] **Calculateur de cotes** interactif (pot odds + equite exacte selon les outs)
- [x] Squelettes structures + SEO : Strategie, Formats (tableau comparatif), Poker en ligne, Calculateurs (index), Videos, Actualites
- [x] SEO technique : metadata par page, JSON-LD (WebSite/FAQ/Course/ItemList...), `sitemap.xml`, `robots.txt`, page 404 thematisee
- [x] Build de prod OK : 31 pages, 0 erreur

---

## 🔜 Prochaines etapes (par priorite)

### Lot 0 — Quick wins issus de l'audit (a faire en priorite, cf. AUDIT.md)
- [ ] Passer Videos + Actualites en `noindex` tant que vides + retirer "certifie" la ou le certificat n'existe pas (~30 min)
- [ ] **Rendre Jerome prouvable** : reecrire `/a-propos` avec PSPC 2023, enrichir JSON-LD Person, PSPC dans hero + footer (~2-3 h)
- [ ] Capture email (newsletter + lead magnet) sur tout le site (~3-4 h)
- [ ] Refonte home : barre d'entree (recherche + 3 raccourcis) au lieu d'un plein ecran de branding (~3-4 h)
- [ ] Cluster croupier = tete de pont SEO : finir le module 10 + pages d'intention ("devenir croupier de poker", "salaire croupier"...) (~1 semaine)
- [ ] Trancher : `jeromeibiza.com/poker` (rewrite) vs sous-domaine, AVANT de brancher le DNS

### Lot 2 — Contenu (le nerf de la guerre SEO)
- [x] Glossaire : passer de ~75 a 300 termes ✅
- [x] Academie : modules 1 a 9 rediges ✅ ; reste le module 10 (examen + vrai certificat partageable)
- [x] Strategie : transformer chaque theme en cours complet ✅ (15 cours)
- [x] Formats : une page detaillee par format ✅ (8 fiches)
- [x] Poker en ligne : rediger les 7 articles du guide ✅

### Lot 3 — Outils
- [ ] Calculateurs bankroll / ICM / rake / ROI (~1 j)

### Lot 4 — Videos ("Netflix du poker")
- [ ] Integration YouTube (WSOP/WPT/EPT/Triton) + classement niveau/circuit (~2-3 j)
- [ ] Selection hebdo automatisee (cf. idee Make.com / bot Python) (~2 j)

### Lot 5 — Jeu poker gratuit (gros morceau, V2)
- [ ] MVP : jetons virtuels + Texas Hold'em vs bots + XP/niveaux + missions (~1-2 semaines)
- [ ] V2 : multijoueur temps reel, tournois, boutique, ligues (~1 mois+)

### Lot 6 — Mise en ligne
- [ ] Brancher le sous-domaine `poker.jeromeibiza.com` sur le Vercel dedie
- [ ] (Plus tard, sur decision) integration au site principal

---

## ⚠️ Regles du projet
- Ne JAMAIS modifier le repo `jeromeibiza-app` ni son Vercel/DNS depuis ici.
- Tout reste FR (langue du site). EN au besoin plus tard.
- Pas de promotion casino/argent reel : pedagogie + jeu gratuit only. Mentions 18+ partout.
