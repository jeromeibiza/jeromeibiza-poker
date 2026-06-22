import type { ExamQuestion } from "./examQuestions";

/**
 * Lot de questions validées par Jérôme (croupier pro) via l'Issue GitHub #1.
 * Fichier SÉPARÉ d'examQuestions.ts (géré par l'autre IA) pour éviter tout conflit.
 * Pour les activer : concaténer EXAM_EXTRA à EXAM là où la banque est lue
 *   ex : const QUESTIONS = [...EXAM, ...EXAM_EXTRA];
 * `m` = module de rattachement (pour la correction).
 */
export const EXAM_EXTRA: ExamQuestion[] = [
  // Module 1 — Le métier
  { m: 1, q: "Pendant un coup, le croupier doit :", choices: ["Conseiller le joueur indécis", "Ne jamais donner son avis sur le coup en cours", "Annoncer qui est favori"], answer: 1 },

  // Module 3 — Manipulation des cartes
  { m: 3, q: "Une carte se retourne (exposée) pendant la distribution. Le croupier :", choices: ["Annule la main", "Continue : la carte est remplacée selon la règle de la salle", "Laisse le joueur la garder face visible"], answer: 1 },
  { m: 3, q: "Une carte qui apparaît retournée (face visible) dans le talon, une « feuille morte », est :", choices: ["Une carte normale", "Écartée, considérée comme inexistante", "Une carte brûlée"], answer: 1 },

  // Module 4 — Dealer au Texas Hold'em
  { m: 4, q: "Avant le flop, le croupier brûle :", choices: ["Aucune carte", "Une carte", "Trois cartes"], answer: 1 },
  { m: 4, q: "Avant le turn, le croupier brûle :", choices: ["Aucune carte", "Une carte", "Trois cartes"], answer: 1 },
  { m: 4, q: "Sur une main complète (flop, turn, river), le croupier brûle au total :", choices: ["Une carte", "Trois cartes", "Cinq cartes"], answer: 1 },
  { m: 4, q: "En heads-up (deux joueurs), le bouton :", choices: ["Est la big blind", "Est la small blind et parle en premier préflop", "Ne paie pas de blinde"], answer: 1 },
  { m: 4, q: "« Cards speak » signifie qu'à l'abattage :", choices: ["Le joueur doit annoncer sa main juste pour la gagner", "La vraie valeur des cartes fait foi, même mal annoncée", "Seul le croupier peut lire les mains"], answer: 1 },
  { m: 4, q: "Une mise à tapis inférieure à une relance complète :", choices: ["Rouvre toujours les enchères", "Ne rouvre pas les enchères pour ceux ayant déjà parlé", "Annule les mises précédentes"], answer: 1 },
  { m: 4, q: "Un joueur jette un seul gros jeton, sans rien annoncer, face à une mise. C'est :", choices: ["Une relance", "Un call (suivi)", "Une mise nulle"], answer: 1 },
  { m: 4, q: "Un joueur agit hors de son tour. Le croupier :", choices: ["Valide l'action quand même", "Suspend l'action et rétablit l'ordre", "Couche le joueur"], answer: 1 },
  { m: 4, q: "Une main qui touche le talon des cartes jetées (le muck) est :", choices: ["Récupérable si le joueur est rapide", "Morte, même si c'était la meilleure", "Rejouable au tour suivant"], answer: 1 },

  // Module 5 — Règles de table et situations (cash game)
  { m: 5, q: "Un « straddle » est :", choices: ["Une mise volontaire à l'aveugle, souvent le double de la big blind, avant la donne", "Une relance au flop", "Un type de side pot"], answer: 0 },
  { m: 5, q: "Un joueur revient après avoir manqué ses blindes. Il doit :", choices: ["Jouer gratuitement", "Poster les blindes manquées ou attendre son tour de big blind", "Payer le rake"], answer: 1 },
  { m: 5, q: "« Run it twice » (dérouler deux fois le tableau sur un tapis) :", choices: ["Est une procédure standard partout", "Se fait si la salle l'autorise et que les joueurs concernés sont d'accord", "Double le rake"], answer: 1 },
  { m: 5, q: "La règle « un joueur par main » interdit :", choices: ["De jouer plusieurs tables", "De se faire conseiller sur sa décision pendant le coup", "De checker deux fois"], answer: 1 },
  { m: 5, q: "Protéger sa main (poser un jeton dessus) sert à :", choices: ["Montrer qu'on est fort", "Éviter qu'elle soit ramassée ou mélangée au muck par erreur", "Aller plus vite"], answer: 1 },
  { m: 5, q: "« Splash the pot » (jeter ses jetons en vrac dans le pot) est :", choices: ["Autorisé", "Interdit : les mises se posent devant soi", "Obligatoire au tapis"], answer: 1 },
  { m: 5, q: "Si un joueur montre sa main à un seul autre joueur (« show one, show all ») :", choices: ["Personne d'autre ne peut la voir", "Tous les joueurs peuvent demander à la voir", "La main est annulée"], answer: 1 },
  { m: 5, q: "Une annonce verbale d'action dans son tour (« je relance ») est :", choices: ["Sans valeur tant que les jetons ne sont pas posés", "Engageante (verbal is binding)", "Valable seulement en tournoi"], answer: 1 },
  { m: 5, q: "Compléter son tapis (recave) en cash game se fait :", choices: ["En cours de main", "Entre les mains, jamais pendant un coup", "Seulement au changement de croupier"], answer: 1 },
  { m: 5, q: "Le « rabbit hunting » (dévoiler les cartes qui seraient venues après un coup terminé) est :", choices: ["Encouragé", "Généralement interdit en salle", "Obligatoire sur demande"], answer: 1 },

  // Module 6 — Spécificités tournoi
  { m: 6, q: "Le « chip race » (échange des petits jetons devenus inutiles) a lieu :", choices: ["À chaque main", "Lors d'un changement de niveau qui retire une valeur de jeton", "Jamais"], answer: 1 },
  { m: 6, q: "Le « dead button » (bouton mort) sert à :", choices: ["Accélérer le jeu", "Gérer le déplacement du bouton après une élimination sans léser les blindes", "Désigner le chip leader"], answer: 1 },
  { m: 6, q: "La « big blind ante » (ante payée par la big blind pour toute la table) sert surtout à :", choices: ["Augmenter le rake", "Accélérer le jeu en évitant une ante par joueur", "Récompenser le bouton"], answer: 1 },
  { m: 6, q: "Quand une table est « cassée » (break), les joueurs :", choices: ["Sont éliminés", "Sont redistribués sur les autres tables par tirage", "Attendent la fin du niveau"], answer: 1 },
  { m: 6, q: "La « clock » (règle du temps) est appelée quand :", choices: ["Un joueur tarde trop à décider", "Le niveau change", "Un side pot existe"], answer: 0 },
  { m: 6, q: "Le « color up » (montée des couleurs) consiste à :", choices: ["Changer la couleur du tapis", "Échanger les petits jetons contre de plus grosses valeurs et retirer les petits", "Trier les jetons par couleur"], answer: 1 },
  { m: 6, q: "Un nouveau tirage des places (redraw) a lieu notamment :", choices: ["À chaque élimination", "À la formation de la table finale", "À chaque niveau"], answer: 1 },
  { m: 6, q: "En tournoi, un joueur absent de sa place est :", choices: ["Éliminé immédiatement", "Quand même blindé et anté, ses cartes jetées à son tour", "Sauté sans payer"], answer: 1 },
  { m: 6, q: "Les antes (quand il y en a) sont postées :", choices: ["Après le flop", "Avant la distribution", "À la river"], answer: 1 },
  { m: 6, q: "Près de la bulle, le « hand-for-hand » (main par main) sert à :", choices: ["Accélérer le jeu", "Jouer les tables en synchro pour gérer équitablement l'éclatement de la bulle", "Désigner le vainqueur"], answer: 1 },

  // Module 7 — Gestion des litiges
  { m: 7, q: "Pour appeler le superviseur en cas de mise contestée, le croupier annonce :", choices: ["« Misdeal ! »", "« Floor ! »", "« Showdown ! »"], answer: 1 },
  { m: 7, q: "Face à un soft play ou une entente entre deux joueurs, le croupier :", choices: ["Ferme les yeux", "Prévient le floor (superviseur)", "Sanctionne lui-même"], answer: 1 },

  // Module 8 — Rake et économie de la table
  { m: 8, q: "Le « temps » (droit de table) est :", choices: ["Un pourboire obligatoire", "Un montant fixe payé par les joueurs à la place du rake dans certaines salles", "Une pénalité de retard"], answer: 1 },

  // Module 9 — Les annonces du dealer
  { m: 9, q: "En tournoi, quand un joueur relance, le croupier annonce :", choices: ["« suit »", "« relance » (sans le montant)", "le montant exact, toujours"], answer: 1 },

  // ===== Lots 5 à 7 (validés via l'Issue GitHub #1) =====
  { m: 3, q: "Un joueur demande à changer de jeu de cartes. Le croupier :", choices: ["Refuse, c'est interdit", "Le change dès que possible (souvent en fin de main)", "Le change seulement à la pause"], answer: 1 },
  { m: 3, q: "Une carte cornée ou marquée est découverte en jeu. Le croupier :", choices: ["Continue avec", "Remplace le jeu de cartes", "Retire seulement cette carte"], answer: 1 },
  { m: 4, q: "Le flop est dévoilé :", choices: ["Une carte à la fois", "Les 3 cartes ensemble, d'un seul geste", "Après une nouvelle mise"], answer: 1 },
  { m: 4, q: "La carte brûlée est posée :", choices: ["Face visible", "Face cachée, à part", "Dans le pot"], answer: 1 },
  { m: 5, q: "Discuter de sa main alors qu'on est encore dans le coup est :", choices: ["Autorisé", "Interdit", "Autorisé en heads-up"], answer: 1 },
  { m: 5, q: "Montrer ses cartes à un autre joueur pendant que le coup est en cours est :", choices: ["Autorisé", "Interdit", "Autorisé si on est déjà couché"], answer: 1 },
  { m: 6, q: "Une recave (re-buy) n'est possible que :", choices: ["À tout moment", "Pendant la période de recave prévue par la structure", "Une fois éliminé"], answer: 1 },
  { m: 6, q: "L'add-on se prend :", choices: ["Plusieurs fois par tournoi", "Une seule fois, à un moment prévu par la structure", "À chaque niveau"], answer: 1 },
  { m: 6, q: "Les tapis des joueurs doivent être :", choices: ["Cachés derrière les cartes", "Visibles et bien empilés, jamais cachés", "Rangés dans le rack"], answer: 1 },
  { m: 7, q: "La décision du floor sur un litige est :", choices: ["Discutable par les joueurs", "Finale à la table", "Prise par le croupier"], answer: 1 },
  { m: 2, q: "Le croupier vérifie sa caisse (float) :", choices: ["Jamais", "En début et en fin de service", "Une fois par semaine"], answer: 1 },
  { m: 1, q: "Le croupier change de table :", choices: ["Jamais", "Régulièrement, par rotation", "Seulement s'il le demande"], answer: 1 },
  { m: 7, q: "Face à de l'« angle shooting » (tromper via une ambiguïté), le croupier :", choices: ["L'encourage", "Veille à l'équité et prévient le floor si besoin", "L'ignore"], answer: 1 },
  { m: 8, q: "Le rake prélevé va :", choices: ["Dans la poche du croupier", "Dans la boîte prévue (drop), à la vue de tous", "Dans le pot suivant"], answer: 1 },
  { m: 4, q: "Pendant le coup, un joueur ne doit jamais :", choices: ["Protéger sa main", "Toucher le pot au centre", "Vérifier son tapis"], answer: 1 },
  { m: 4, q: "Au Texas Hold'em, chaque joueur reçoit :", choices: ["1 carte", "2 cartes fermées", "5 cartes"], answer: 1 },
  { m: 3, q: "Le croupier distribue les cartes :", choices: ["Dans le sens antihoraire", "Dans le sens horaire, en commençant à gauche du bouton", "En commençant par le bouton"], answer: 1 },
  { m: 4, q: "Le bouton se déplace :", choices: ["Il reste fixe", "D'un siège vers la gauche à chaque main", "Au hasard"], answer: 1 },
  { m: 4, q: "Le turn et la river dévoilent :", choices: ["Deux cartes chacun", "Une carte chacun", "Trois cartes au total"], answer: 1 },
  { m: 4, q: "Taper la table avec la main signifie :", choices: ["Se coucher", "Checker (passer sans miser)", "Demander une carte"], answer: 1 },
  { m: 4, q: "Les cartes jetées (le muck) sont :", choices: ["Posées face visible", "Posées face cachée", "Remises dans le sabot"], answer: 1 },
  { m: 8, q: "Le rake en tournoi :", choices: ["Est prélevé à chaque pot", "N'existe pas pendant le jeu, il est inclus dans le buy-in", "Est doublé en table finale"], answer: 1 },
  { m: 6, q: "Les blindes en tournoi :", choices: ["Restent fixes", "Augmentent à intervalles réguliers (les niveaux)", "Diminuent avec le temps"], answer: 1 },
  { m: 6, q: "En début de tournoi, les tapis de départ sont :", choices: ["Au choix du joueur", "Identiques pour tous", "Proportionnels au buy-in payé"], answer: 1 },
  { m: 6, q: "Quand le nombre de joueurs baisse, on :", choices: ["Garde toutes les tables ouvertes", "Regroupe et équilibre les tables", "Arrête le tournoi"], answer: 1 },
  { m: 6, q: "Le tournoi se termine quand :", choices: ["Les places payées sont atteintes", "Un seul joueur possède tous les jetons", "Le temps est écoulé"], answer: 1 },
  { m: 7, q: "En cas de misdeal, le croupier :", choices: ["Continue la main", "Rebat et redistribue", "Annule le tournoi"], answer: 1 },
  { m: 7, q: "Face à un joueur mécontent, le croupier :", choices: ["Argumente avec lui", "Appelle le floor sans argumenter", "Arrête la partie"], answer: 1 },
  { m: 8, q: "En cash game, le pot est tenu :", choices: ["En vrac", "Propre et bien empilé (pour compter le rake et payer juste)", "Hors de vue du croupier"], answer: 1 },
  { m: 4, q: "Un joueur qui se couche :", choices: ["Garde ses cartes", "Voit ses cartes aller au muck, face cachée", "Les montre à la table"], answer: 1 },
  { m: 9, q: "Le croupier indique :", choices: ["Les cartes à venir", "De qui c'est le tour de parler (l'action)", "Le favori du coup"], answer: 1 },
  { m: 5, q: "Un joueur doit garder ses cartes :", choices: ["Dans sa main, cachées", "Sur la table, à la vue, jusqu'à la fin de son implication", "Où il le souhaite"], answer: 1 },
  { m: 4, q: "En cas d'égalité (split pot), le pot :", choices: ["Va au joueur en position", "Est partagé équitablement entre les gagnants", "Est gardé pour la main suivante"], answer: 1 },
  { m: 3, q: "Si le jeu se révèle incomplet (une carte manquante) :", choices: ["On continue", "Le croupier le signale et change le jeu", "On ajoute une carte au hasard"], answer: 1 },
  { m: 5, q: "Le « slow roll » (retarder de montrer une main gagnante) est :", choices: ["Une bonne tactique", "Une mauvaise étiquette, à éviter", "Obligatoire à l'abattage"], answer: 1 },
  { m: 6, q: "« ITM » (in the money) : on y entre :", choices: ["Dès le début du tournoi", "À partir des places payées", "En table finale seulement"], answer: 1 },
  { m: 9, q: "Le croupier annonce les actions (mise, relance, tapis) :", choices: ["En silence", "À voix haute, pour toute la table", "Seulement au floor"], answer: 1 },
  { m: 5, q: "Un joueur ne peut pas :", choices: ["Protéger sa main", "Sortir ses cartes de la table ou de la vue", "Checker à son tour"], answer: 1 },
  { m: 4, q: "À l'abattage, un joueur non obligé de montrer :", choices: ["Doit toujours montrer", "Peut jeter sa main (muck) sans la dévoiler", "Doit annoncer sa main"], answer: 1 },
  { m: 3, q: "Le croupier mélange les cartes :", choices: ["En l'air, rapidement", "À plat sur la table, face cachée, à la vue de tous", "Dans le rack"], answer: 1 },
];
