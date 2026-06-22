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
  { m: 9, q: "Quand un joueur relance, le croupier annonce :", choices: ["« suit »", "« relance »", "le montant exact à voix haute"], answer: 1 },
];
