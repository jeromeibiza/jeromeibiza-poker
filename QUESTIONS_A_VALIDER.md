# Quiz Académie Croupier — suivi de validation

> Validation en cours avec Jérôme (croupier pro). Rien n'est injecté dans le quiz
> tant qu'il n'a pas validé. ✅ = bonne réponse. [Cash]/[Tournoi]/[Général] = contexte.
> Compteur questions neuves validées : **~14 / 100**.

---

## ✅ VALIDÉES — prêtes à injecter (avec corrections de Jérôme)

**Corrections de questions existantes :**
- **C1. [Général]** « Le croupier compte et annonce le pot sur demande : » → B) Seulement en pot-limit ✅ (pas en no-limit).
- **C2. [Cash]** « Retirer des jetons de son tapis pour les mettre de côté (se **décaver**) est : » → B) Interdit (table stakes) ✅. *(terme correct = "décaver", pas rat-holing/going south)*
- **C3. [Cash]** « Sur une main avec side pots, le rake est prélevé : » → B) Une seule fois, sur le total, dans la limite du cap ✅.

**Nouvelles questions validées (lot 1) :**
- **1. [Général]** Carte exposée par le croupier pendant la donne → on continue, la carte est remplacée selon la règle de la salle ✅.
- **4. [Général]** Avant le flop, le croupier brûle → une carte ✅.
- **5. [Tournoi]** Le « chip race » a lieu → à un changement de niveau qui retire une valeur de jeton ✅.
- **6. [Tournoi]** Le « dead button » → gère le déplacement du bouton sans léser les blindes ✅.
- **7. [Tournoi]** La « big blind ante » → accélère le jeu (une seule ante par tour) ✅.
- **8. [Tournoi]** Table cassée (break) → joueurs redistribués par tirage ✅.
- **9. [Tournoi]** La « clock » → appelée quand un joueur tarde trop ✅.
- **11. [Cash]** Un « straddle » → mise à l'aveugle, en général le double de la BB, avant la donne ✅.
- **12. [Cash]** Retour après blindes manquées → poster les blindes manquées ou attendre son tour de BB ✅.
- **13. [Cash]** « Run it twice » → seulement si la salle l'autorise et accord des joueurs ✅.
- **14. [Général]** Mise contestée → le croupier annonce « Floor ! » ✅.
- **17. [Général]** Quand un joueur relance, le croupier annonce → « relance » ✅ (sans le montant).

---

## 🔁 À RE-VALIDER (corrigées, en attente du OK de Jérôme)

**2. [Général]** Une carte retournée dans le sabot (une **« feuille morte »**) est :
- A) une carte normale ❌ · B) écartée, comme inexistante ✅ · C) brûlée ❌

---

## 🆕 LOT 2 — à valider

- **19. [Général]** Avant le turn, le croupier brûle → une carte ✅.
- **20. [Général]** Une main qui touche le muck → morte, même si c'était la meilleure ✅.
- **21. [Général]** « Un joueur par main » interdit → de se faire conseiller pendant le coup ✅.
- **22. [Général]** En heads-up, le bouton → est la small blind, parle en premier préflop ✅.
- **23. [Général]** « Cards speak » → la vraie valeur des cartes fait foi, même mal annoncée ✅.
- **24. [Tournoi]** « Color up » → échanger les petits jetons contre de plus grosses valeurs et les retirer ✅.
- **25. [Général]** Protéger sa main → éviter qu'elle soit ramassée/mélangée au muck par erreur ✅.
- **26. [Général]** Mise à tapis inférieure à une relance complète → ne rouvre pas les enchères pour ceux ayant déjà parlé ✅.
- **27. [Tournoi]** Redraw (nouveau tirage) → à la table finale ✅.
- **28. [Tournoi]** Joueur absent → quand même blindé/anté, cartes jetées à son tour ✅.

---

## 🗑️ SUPPRIMÉES (décidé par Jérôme)
- Partie 1 : C4 (avant de prendre une table), C5 (erreur de niveau), C6 (dealer parle bien), C7 (tapis = all-in), C8 (valeurs de jetons fixes).
- Lot 1 : 3 (conditions de misdeal), 10 (table stakes), 15 (string bet), 18 (wash).
- Via sub-issue (Jérôme) : 16 (abattage), 33 (annonce du gagnant).
- Lot 4 : 35 (relance mini, dépend du click-back/France vs interna), 37 (all-in à l'abattage, piégeuse + redondante avec Q20, cf. coup Estelle Denis).

> NB : la validation se fait désormais sur l'Issue GitHub #1 (cases à cocher). Lots 3 et 4 (questions 29-44) listés là-bas.

---

## 🔧 À APPLIQUER dans `examQuestions.ts` (à l'injection, coordonné avec l'autre IA)
1. Remplacer la question « pot annoncé si la salle l'autorise » par C1.
2. Remplacer les 2 questions « rat-holing » par une seule (C2, terme « décaver »).
3. Dédoublonner + corriger la question rake/side pots (C3).
4. **Supprimer** : « avant de prendre une table » (l.32), « erreur de niveau » (l.188), « dealer parle bien » (l.213), « tapis se dit all-in » (l.116), les 5 questions de valeurs de jetons (l.22-26).
5. Corriger l.215 : le croupier annonce « relance » (pas « relance à [montant] »).
