/**
 * Parcours débutant interactif « Apprendre le poker de zéro ».
 * Chaque étape : un mini-cours + un quiz de validation (il faut tout réussir
 * pour débloquer l'étape suivante). Un examen final délivre le certificat.
 */

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number; // index de la bonne réponse
  explain: string;
};

export type ParcoursStep = {
  id: string;
  title: string;
  emoji: string;
  minutes: number;
  intro: string;
  points: { h?: string; text: string }[];
  quiz: QuizQuestion[];
};

export const STEPS: ParcoursStep[] = [
  {
    id: "but-du-jeu",
    title: "Le but du jeu",
    emoji: "🎯",
    minutes: 4,
    intro: "Avant les cartes, comprends ce que tu cherches à faire à une table de poker.",
    points: [
      { h: "Tu joues contre les joueurs", text: "Au poker, tu affrontes les autres joueurs, jamais le casino ni le croupier. Le croupier ne fait qu'animer la partie." },
      { h: "Le but : remporter le pot", text: "Le pot, c'est l'ensemble des jetons misés au centre de la table. Celui qui le gagne empoche tout." },
      { h: "Deux façons de gagner", text: "Soit avoir la meilleure main au moment de l'abattage (le showdown), soit faire coucher tous tes adversaires avant, et là, tu gagnes sans même montrer tes cartes." },
      { h: "La variante reine", text: "On apprend le Texas Hold'em No-Limit, de loin la variante la plus jouée au monde." },
    ],
    quiz: [
      {
        question: "Contre qui joues-tu au poker ?",
        options: ["Les autres joueurs", "Le croupier", "Le casino"],
        answer: 0,
        explain: "Les joueurs s'affrontent entre eux. Le croupier distribue et arbitre, il ne joue pas.",
      },
      {
        question: "Comment gagner un pot SANS avoir la meilleure main ?",
        options: ["En faisant coucher tous les adversaires", "En montrant ses cartes en premier", "C'est impossible"],
        answer: 0,
        explain: "Si tout le monde se couche face à tes mises, tu remportes le pot sans abattage.",
      },
    ],
  },
  {
    id: "classement-mains",
    title: "Le classement des mains",
    emoji: "🃏",
    minutes: 5,
    intro: "La main la plus forte remporte le pot. Voici l'ordre, à connaître par cœur.",
    points: [
      { h: "De la plus forte à la plus faible", text: "Quinte flush royale, quinte flush, carré, full, couleur, suite, brelan, double paire, paire, carte haute." },
      { h: "L'astuce", text: "Plus une main est rare, plus elle est forte. C'est aussi simple que ça." },
      { h: "Le piège classique", text: "La couleur (5 cartes de la même couleur) bat la suite (5 cartes qui se suivent). Et le full bat la couleur." },
    ],
    quiz: [
      {
        question: "Quelle est la main la plus forte au poker ?",
        options: ["Quinte flush royale", "Carré", "Full"],
        answer: 0,
        explain: "Rien ne bat la quinte flush royale (A-K-Q-J-10 de la même couleur).",
      },
      {
        question: "Laquelle est la plus forte ?",
        options: ["Le full", "La couleur", "La suite"],
        answer: 0,
        explain: "Ordre décroissant : full > couleur > suite.",
      },
      {
        question: "La couleur bat-elle la suite ?",
        options: ["Oui", "Non"],
        answer: 0,
        explain: "La couleur est plus rare que la suite, elle la bat donc toujours.",
      },
    ],
  },
  {
    id: "deroulement",
    title: "Le déroulement d'une main",
    emoji: "🔄",
    minutes: 5,
    intro: "Une main se joue en cinq temps, toujours dans le même ordre.",
    points: [
      { h: "Tes cartes", text: "Tu reçois 2 cartes privatives (fermées), rien que pour toi." },
      { h: "Les cartes communes", text: "5 cartes sont dévoilées au centre en 3 temps : le flop (3 cartes), le turn (1 carte), la river (1 carte)." },
      { h: "L'ordre des tours", text: "Préflop → flop → turn → river → showdown. Entre chaque carte commune, il y a un tour d'enchères." },
      { h: "Composer sa main", text: "Tu formes ta meilleure main de 5 cartes parmi les 7 disponibles (tes 2 cartes + les 5 communes)." },
    ],
    quiz: [
      {
        question: "Combien de cartes privatives reçois-tu au Texas Hold'em ?",
        options: ["2", "5", "3"],
        answer: 0,
        explain: "Exactement 2 cartes fermées par joueur.",
      },
      {
        question: "Dans quel ordre se déroulent les tours ?",
        options: ["Préflop, flop, turn, river", "Flop, préflop, turn, river", "Préflop, turn, flop, river"],
        answer: 0,
        explain: "Toujours : préflop, puis flop, puis turn, puis river, puis showdown.",
      },
      {
        question: "Combien de cartes communes au total ?",
        options: ["5", "3", "7"],
        answer: 0,
        explain: "3 au flop + 1 au turn + 1 à la river = 5 cartes communes.",
      },
    ],
  },
  {
    id: "blindes",
    title: "Les blindes",
    emoji: "🪙",
    minutes: 4,
    intro: "Les mises obligatoires qui lancent l'action à chaque main.",
    points: [
      { h: "Pourquoi elles existent", text: "Sans mise forcée, tout le monde attendrait l'As sans jamais jouer. Les blindes forcent l'action et créent un pot dès le départ." },
      { h: "Small blind & big blind", text: "La small blind (à gauche du bouton) et la big blind, qui vaut le double de la small blind." },
      { h: "L'unité de mesure", text: "La big blind sert d'unité : on parle d'un tapis « de 100 BB », d'une relance « à 3 BB »." },
      { h: "L'ante", text: "Petite mise payée par tous les joueurs, surtout en tournoi, pour accélérer le jeu." },
    ],
    quiz: [
      {
        question: "À quoi servent les blindes ?",
        options: ["Forcer l'action et créer un pot", "Payer le croupier", "Récompenser le gagnant"],
        answer: 0,
        explain: "Elles obligent à jouer en créant un pot à remporter dès le début de chaque main.",
      },
      {
        question: "La big blind vaut...",
        options: ["Le double de la small blind", "La moitié de la small blind", "La même chose que l'ante"],
        answer: 0,
        explain: "Par convention, la big blind = 2 × la small blind.",
      },
    ],
  },
  {
    id: "position",
    title: "La position",
    emoji: "♟️",
    minutes: 4,
    intro: "L'un des concepts les plus rentables du poker, et pourtant gratuit.",
    points: [
      { h: "C'est quoi", text: "La position, c'est ton ordre de parole à la table." },
      { h: "La meilleure place", text: "Le bouton (BTN) : tu parles en DERNIER à chaque tour après le flop." },
      { h: "Pourquoi c'est fort", text: "Parler en dernier = tu vois ce que font les autres avant de décider. Plus d'infos = meilleures décisions." },
      { h: "La règle d'or", text: "Plus tu es proche du bouton, plus tu peux jouer de mains. Serré en premier de parole, large près du bouton." },
    ],
    quiz: [
      {
        question: "Quelle est la meilleure position à la table ?",
        options: ["Le bouton (BTN)", "La small blind", "UTG (premier de parole)"],
        answer: 0,
        explain: "Au bouton, tu parles en dernier après le flop : le maximum d'informations.",
      },
      {
        question: "Pourquoi la position est-elle un avantage ?",
        options: ["On parle en dernier, avec plus d'infos", "On reçoit de meilleures cartes", "On paie moins de blindes"],
        answer: 0,
        explain: "La position ne change pas tes cartes : elle te donne de l'information avant d'agir.",
      },
    ],
  },
  {
    id: "actions",
    title: "Les actions & le vocabulaire",
    emoji: "🗣️",
    minutes: 4,
    intro: "Les mots à connaître pour ne jamais être perdu à une table.",
    points: [
      { h: "Sans miser", text: "Check : passer son tour sans miser (possible si personne n'a misé avant toi)." },
      { h: "Miser", text: "Bet : miser le premier. Call : suivre (égaler la mise). Raise : relancer (augmenter la mise)." },
      { h: "Abandonner ou tout risquer", text: "Fold : se coucher (jeter ses cartes). All-in (tapis) : miser tous ses jetons." },
      { h: "L'art du poker", text: "Bluff : miser fort avec une main faible pour faire coucher un adversaire qui a mieux." },
    ],
    quiz: [
      {
        question: "« Se coucher » se dit...",
        options: ["Fold", "Call", "Check"],
        answer: 0,
        explain: "Fold = jeter ses cartes et abandonner la main.",
      },
      {
        question: "Miser tous ses jetons, c'est...",
        options: ["All-in (faire tapis)", "Un check", "Une blinde"],
        answer: 0,
        explain: "All-in = tu engages la totalité de ton tapis.",
      },
      {
        question: "« Suivre », c'est-à-dire égaler la mise en cours, se dit...",
        options: ["Call", "Raise", "Fold"],
        answer: 0,
        explain: "Call = suivre. Raise = relancer. Fold = se coucher.",
      },
    ],
  },
];

export const FINAL_QUIZ: QuizQuestion[] = [
  {
    question: "Contre qui joues-tu au poker ?",
    options: ["Les autres joueurs", "Le croupier", "Le casino"],
    answer: 0,
    explain: "Les joueurs s'affrontent entre eux.",
  },
  {
    question: "Comment remporter un pot sans la meilleure main ?",
    options: ["Faire coucher tous les adversaires", "Montrer ses cartes en premier", "Demander au croupier"],
    answer: 0,
    explain: "Si tout le monde se couche, le pot est à toi.",
  },
  {
    question: "Quelle est la main la plus forte au poker ?",
    options: ["Quinte flush royale", "Carré", "Couleur"],
    answer: 0,
    explain: "La quinte flush royale est imbattable.",
  },
  {
    question: "Laquelle est la plus forte : full, couleur ou suite ?",
    options: ["Le full", "La couleur", "La suite"],
    answer: 0,
    explain: "Full > couleur > suite.",
  },
  {
    question: "Combien de cartes privatives reçois-tu ?",
    options: ["2", "3", "5"],
    answer: 0,
    explain: "2 cartes fermées par joueur au Texas Hold'em.",
  },
  {
    question: "Combien de cartes communes au total ?",
    options: ["5", "3", "7"],
    answer: 0,
    explain: "3 (flop) + 1 (turn) + 1 (river) = 5.",
  },
  {
    question: "Dans quel ordre se déroulent les tours ?",
    options: ["Préflop, flop, turn, river", "Flop, turn, préflop, river", "Préflop, turn, river, flop"],
    answer: 0,
    explain: "Préflop → flop → turn → river → showdown.",
  },
  {
    question: "À quoi servent les blindes ?",
    options: ["Forcer l'action et créer un pot", "Payer la salle", "Choisir le donneur"],
    answer: 0,
    explain: "Elles créent un pot et obligent à jouer.",
  },
  {
    question: "Quelle est la meilleure position ?",
    options: ["Le bouton", "La big blind", "UTG"],
    answer: 0,
    explain: "Au bouton, tu parles en dernier post-flop.",
  },
  {
    question: "« Se coucher » se dit...",
    options: ["Fold", "Call", "All-in"],
    answer: 0,
    explain: "Fold = abandonner la main.",
  },
];

/** Score minimum (sur 10) pour valider l'examen final et obtenir le certificat. */
export const FINAL_PASS = 8;
