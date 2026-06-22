# Quiz Académie Croupier — à valider par Jérôme

> ⚠️ Rien ici n'est encore dans le quiz. Jérôme review et valide, puis on injecte
> les questions approuvées dans `src/lib/poker/examQuestions.ts` (fichier géré par
> l'autre IA → injection coordonnée). Convention : ✅ = bonne réponse.
>
> **Légende contexte : [Cash] = cash game · [Tournoi] = tournoi · [Général] = les deux.**

---

## Partie 1 — Questions existantes à CORRIGER ou RETIRER

### À corriger

**C1. [Général] « La taille du pot peut être annoncée si un joueur la demande, à condition que : »** (M9)
- Actuel : bonne réponse = « la salle l'autorise » → imprécis/faux.
- ➡️ Proposition de remplacement :
  - Q : « Le croupier compte et annonce le pot sur demande : »
  - A) Dans tous les jeux ❌
  - B) Seulement en pot-limit (la mise max dépend du pot) ✅
  - C) Jamais ❌
  - *Justif : en no-limit on ne compte pas le pot pour les joueurs ; en pot-limit, si.*

**C2. [Cash] « Le rat-holing est : » + « Le rat-holing consiste à : »** (M5, lignes 68-69)
- Problème : terme jamais employé tel quel + option « Toléré la nuit » = blague.
- ➡️ Fusionner en une seule question, terme correct :
  - Q : « En cash game, retirer des jetons de son tapis pour les mettre de côté (le "going south" ou "aller au sud") est : »
  - A) Autorisé ❌
  - B) Interdit (règle du table stakes : tout le tapis reste en jeu) ✅
  - C) Autorisé seulement en quittant la table ❌

**C3. [Cash] Rake sur side pots** (M8, doublon lignes 110 et 212)
- Problème : 2 questions quasi identiques + réponse floue.
- ➡️ Garder UNE seule question, précise :
  - Q : « En cash game, sur une main avec side pots, le rake est prélevé : »
  - A) Une fois par pot ❌
  - B) Une seule fois, sur le total, dans la limite du plafond (cap) ✅
  - C) À parts égales sur chaque side pot ❌

**C4. [Général] « Avant de prendre une table, le croupier vérifie toujours »** (M2, ligne 32)
- Problème : il vérifie les cartes ET les jetons ; réponse unique = piège.
- ➡️ Reformuler sans ambiguïté :
  - Q : « En prenant une table, pour annoncer et payer juste, le croupier doit connaître : »
  - A) Le nombre de joueurs ❌
  - B) La valeur des jetons en jeu (le code couleur de la salle) ✅
  - C) Le classement des joueurs ❌

**C5. [Tournoi] « Conséquence d'une erreur de niveau »** (M6, ligne 188)
- Problème : « erreur de niveau » trop vague.
- ➡️ Préciser :
  - Q : « En tournoi, lancer une main avec un mauvais niveau de blindes/antes : »
  - A) Est sans incidence ❌
  - B) Fausse la main (montants erronés) et doit être corrigé par le floor ✅
  - C) Ne touche que la pause suivante ❌

### À retirer ou réécrire (faibles / subjectives)

**C6. [Général]** « Un dealer qui parle bien = table qui ne se dispute pas » (M9, l.213) → subjectif, les 2 réponses se défendent. **À retirer.**

**C7. [Général]** « Tapis (all-in) se dit : All-in » (M9, l.116) → trivial, et « Pass » n'est pas un terme FR. **À retirer ou enrichir.**

**C8. [Général]** Valeurs de jetons fixes (vert = 25, etc., M2) → à présenter comme « convention courante », jamais comme une règle absolue (ça varie selon salle, et tout change en tournoi).

---

## Partie 2 — Nouvelles questions (premier lot à valider)

> Si le style + la précision te vont, je complète jusqu'à 100. Chaque question est
> taguée Cash / Tournoi / Général.

### Procédure de donne

**1. [Général]** Une carte du joueur se retourne pendant la distribution (carte exposée par le croupier). Le croupier :
- A) Annule la main (misdeal) ❌
- B) Continue : la carte exposée est remplacée selon la règle de la salle, la main suit ✅
- C) Laisse le joueur la garder face visible ❌

**2. [Général]** Un « boxed card » (carte retournée à l'envers dans le sabot) est traité comme :
- A) Une carte normale ❌
- B) Inexistant : on l'écarte comme si elle n'était pas là ✅
- C) Une carte brûlée ❌

**3. [Général]** Combien de conditions de misdeal le croupier doit-il connaître avant de lancer la main ? La plus classique est :
- A) Un joueur a trop de jetons ❌
- B) La première carte est distribuée au mauvais joueur (mauvais départ) ✅
- C) Un joueur parle trop fort ❌

**4. [Général]** Avant le flop, le croupier brûle :
- A) Aucune carte ❌
- B) Une carte ✅
- C) Trois cartes ❌

### Tournoi

**5. [Tournoi]** Le « chip race » (échange des petits jetons devenus inutiles) se fait :
- A) À chaque main ❌
- B) Lors d'un changement de niveau qui retire une valeur de jeton ✅
- C) Jamais ❌

**6. [Tournoi]** Le « dead button » (bouton mort) sert à :
- A) Accélérer le jeu ❌
- B) Gérer le déplacement du bouton quand un joueur est éliminé, sans léser les blindes ✅
- C) Désigner le chip leader ❌

**7. [Tournoi]** La « big blind ante » (ante payée par la big blind pour toute la table) sert surtout à :
- A) Augmenter le rake ❌
- B) Accélérer le jeu en évitant de collecter une ante par joueur ✅
- C) Récompenser le bouton ❌

**8. [Tournoi]** Quand une table est « cassée » (break), les joueurs :
- A) Sont éliminés ❌
- B) Sont redistribués sur les autres tables selon un tirage ✅
- C) Attendent la fin du niveau ❌

**9. [Tournoi]** La « clock » (règle du temps) est appelée quand :
- A) Un joueur tarde trop à décider ✅
- B) Le niveau change ❌
- C) Un side pot existe ❌

### Cash game

**10. [Cash]** Le principe du « table stakes » signifie :
- A) On ne peut miser que les jetons présents devant soi au début de la main ✅
- B) On peut rajouter de l'argent en cours de main ❌
- C) Les mises sont plafonnées par la salle ❌

**11. [Cash]** Un « straddle » est :
- A) Une mise volontaire à l'aveugle, en général le double de la big blind, avant la donne ✅
- B) Une relance au flop ❌
- C) Un type de side pot ❌

**12. [Cash]** Un joueur revient après avoir manqué ses blindes. Il doit :
- A) Jouer gratuitement ❌
- B) Poster les blindes manquées ou attendre son tour de big blind ✅
- C) Payer le rake ❌

**13. [Cash]** « Run it twice » (dérouler deux fois le board sur un tapis) :
- A) Est une procédure standard partout ❌
- B) Se fait seulement si la salle l'autorise et que les joueurs concernés sont d'accord ✅
- C) Double le rake ❌

### Annonces et litiges

**14. [Général]** Sur une mise contestée, l'annonce du croupier pour appeler le superviseur est :
- A) « Misdeal ! » ❌
- B) « Floor ! » ✅
- C) « Showdown ! » ❌

**15. [Général]** Un « string bet » (mise en plusieurs gestes) est :
- A) Autorisé si le joueur annonce le montant ❌ (toléré seulement si le montant est annoncé d'abord)
- B) Interdit s'il n'a pas été annoncé : seule la première action compte ✅
- C) Toujours autorisé ❌

**16. [Général]** À l'abattage (showdown) sans dernière mise non suivie, qui montre en premier ?
- A) Le joueur à gauche du bouton ❌
- B) Le dernier joueur à avoir misé ou relancé ✅
- C) Le bouton ❌

**17. [Général]** Quand un joueur relance, le croupier annonce :
- A) « suit » ❌
- B) « relance à [montant total] » ✅
- C) « tapis » ❌

### Manipulation

**18. [Général]** Le « wash » (brassage à plat, cartes étalées) se fait :
- A) À chaque main ❌
- B) À l'ouverture d'une partie ou quand le jeu doit être totalement rebrassé ✅
- C) Jamais ❌

---

## Suite

Dis-moi : **le format + la précision te conviennent ?** Si oui, je complète jusqu'à
100 questions neuves (réparties sur les 9 modules, taguées Cash/Tournoi), et on
applique les corrections de la Partie 1. Tu valides, puis on injecte.
