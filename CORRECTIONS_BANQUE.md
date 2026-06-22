# Corrections de la banque existante (examQuestions.ts) — validées par Jérôme

> Rien n'est appliqué tant que le branchement n'est pas décidé (A : Claude / B : l'autre IA).
> À appliquer dans `src/lib/poker/examQuestions.ts` en coordination avec l'autre IA.
> Référence = numéros E de l'Issue #4.

## 🗑️ À SUPPRIMER
- **E12, E13, E14, E15, E16, E112** — valeurs de jetons fixes (blanc=1, rouge=5, vert=25, noir=100, violet=500, jaune/orange=1000) : varient selon la room, aucune convention universelle.
- **E22** — « avant de prendre une table, vérifie le code couleur » : faux.
- **E52** — « rat-holing consiste à » : doublon (gardé via E53/E153 reformulées).
- **E69** — « misdeal plus déclarable après action significative » : trop tricky.
- **E86** — « jackpot drop et rake, emplacements séparés » : dépend de l'établissement.
- **E92** — « tapis = all-in » : la réponse est dans la question.
- **E162** — « erreur de niveau fausse la main » : faux. La main se joue, le bon niveau s'applique au coup d'après.
- **E175** — « mise irrégulière = jetons cachés derrière » : c'est de l'angle shoot, mal posé.
- **E185** — « rake vs jackpot drop, ne pas confondre » : dépend de l'établissement.

## ✏️ À CORRIGER
- **E23** — le mélange à plat s'appelle **« la salade »** (pas seulement « wash »).
- **E25** (la séquence type) — vraie séquence croupier : **salade, 2 riffles, effeuillage, 1 riffle, coupe sur la carte de coupe**.
- **E31** — le wash / la salade se fait **À CHAQUE MAIN** (réponse « à chaque main »).
- **E34** — le croupier vérifie que **les blindes ET les antes** sont postées.
- **E53** — terme **« se décaver »** (pas « rat-holing ») ; réponse **Interdit** ; supprimer l'option blague « toléré la nuit ».
- **E153** — terme **« décaver »** (pas « rat-holing »).
- **E88** — rake sur side pots : se prélève sur le pot principal **MAIS si le pot principal est trop petit, le complément se prend aussi sur le side pot (pot extérieur)**.
- **E142** — préciser : **[Cash]** empilé par dénomination / **[Tournoi]** un tas de jetons en vrac.
- **E157** — les tables se cassent **dans l'ordre de cassage prévu (déterminé par le TD)**, pas « les moins peuplées ».
- **E189** — préciser : **[Cash]** « relance à [montant] » / **[Tournoi]** juste « relance ».
- **E190** — pour un tapis : le croupier annonce **« tapis »** ; le montant **n'est compté que si on le demande** (pas systématiquement).
- **E194** — le pot n'est annoncé/compté que **uniquement en pot-limit**.

## 🔧 Côté nouvelles questions (examQuestionsExtra.ts, déjà fait)
- Q17 reformulée en **[Tournoi]** : « En tournoi, quand un joueur relance, le croupier annonce « relance » (sans le montant) ». (En cash il annonce le montant, cf. E189.)
