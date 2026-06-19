# WAR ROOM — Poker Hub Jerome Ibiza

> Projet **SIDE**, 100% separe du site principal `jeromeibiza-app`.
> Aucun lien croise pour l'instant. Repo dedie, futur Vercel dedie
> (futur `poker.jeromeibiza.com`). On ne touche JAMAIS au site live.

Derniere mise a jour : 2026-06-19 — V1 + parcours interactif + passe qualite FR.

---

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

### Lot 2 — Contenu (le nerf de la guerre SEO)
- [ ] Glossaire : passer de ~75 a 300+ termes (~3-4 h)
- [ ] Academie : rediger les modules 2 a 9 en entier (texte + schemas) (~1 j)
- [ ] Strategie : transformer chaque theme en cours complet (~2-3 j etale)
- [ ] Formats : une page detaillee par format (~1 j)
- [ ] Poker en ligne : rediger les 7 articles du guide (~1 j)

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
