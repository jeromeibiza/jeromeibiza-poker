/**
 * Académie Croupier Poker Jérôme Ibiza — programme de formation gratuite.
 * 10 modules + examen final. Module 1 entièrement rédigé ; les modules 2 à 10
 * ont un plan détaillé (contenu pédagogique à développer progressivement).
 */

export type ModuleSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type AcademyModule = {
  n: number;
  slug: string;
  title: string;
  emoji: string;
  summary: string;
  minutes: number;
  status: "complet" | "plan"; // complet = rédigé, plan = plan détaillé
  objectives: string[];
  sections: ModuleSection[];
};

export const MODULES: AcademyModule[] = [
  {
    n: 1,
    slug: "introduction-au-metier",
    title: "Introduction au métier de croupier poker",
    emoji: "🎩",
    summary: "Le rôle du dealer, les qualités requises et les évolutions de carrière possibles.",
    minutes: 12,
    status: "complet",
    objectives: [
      "Comprendre le rôle exact d'un croupier de poker",
      "Identifier les qualités et le savoir-être attendus",
      "Connaître les différents postes et l'évolution de carrière",
    ],
    sections: [
      {
        heading: "Le rôle du dealer",
        body:
          "Le croupier de poker est le chef d'orchestre de la table. Contrairement à la roulette ou au blackjack où il joue contre les clients, au poker le dealer ne joue jamais : les joueurs s'affrontent entre eux. Son rôle est d'assurer le bon déroulement de la partie. Il mélange et distribue les cartes, annonce l'action à voix haute, gère le pot, prélève le rake, dévoile les cartes communes, désigne le gagnant et lui pousse le pot. Il est aussi le garant des règles et le premier rempart contre les erreurs et la triche. Un bon croupier rend la table fluide, agréable et équitable, sans jamais se faire remarquer.",
      },
      {
        heading: "Les qualités requises",
        bullets: [
          "Dextérité manuelle : mélange, distribution et manipulation des jetons rapides et propres.",
          "Rigueur et concentration : aucune erreur sur le pot, les blindes ou l'ordre d'action.",
          "Calcul mental : annoncer les mises, faire la monnaie, calculer le rake et les side pots vite et juste.",
          "Sang-froid : gérer les litiges et les joueurs en tilt avec calme et autorité.",
          "Sens du service et diplomatie : rester courtois, neutre et professionnel en toutes circonstances.",
          "Endurance : tenir la concentration sur de longues sessions, souvent de nuit.",
          "Intégrité : l'honnêteté absolue est non négociable dans ce métier.",
        ],
      },
      {
        heading: "Les différents postes",
        body:
          "La filière poker en casino ou cardroom offre une vraie progression. On commence rarement au sommet : chaque poste se mérite.",
        bullets: [
          "Dealer : distribue et gère les tables de cash game et de tournoi.",
          "Senior Dealer : dealer expérimenté, affecté aux tables à fort enjeu et aux finales.",
          "Chip Runner : apporte les caves de jetons aux joueurs et fait le lien avec la caisse.",
          "Assistant Floor : seconde le floor, gère les listes d'attente et les changements de table.",
          "Floor (floorman) : superviseur de salle, tranche les litiges et fait appliquer les règles.",
          "Tournament Director (TD) : responsable de l'organisation et des décisions d'un tournoi.",
          "Poker Manager : dirige toute la salle de poker (planning, équipe, résultats).",
        ],
      },
      {
        heading: "L'évolution de carrière",
        body:
          "Un parcours typique démarre comme dealer, puis senior dealer après avoir fait ses preuves, avant d'évoluer vers le floor puis la direction de salle ou la direction de tournois. Beaucoup de croupiers freelance enchaînent les festivals internationaux (WSOP, EPT, WPT, Triton), une voie passionnante et bien rémunérée pour qui aime voyager. La maîtrise de l'anglais est alors un atout majeur.",
      },
    ],
  },
  {
    n: 2,
    slug: "manipulation-des-jetons",
    title: "La manipulation des jetons",
    emoji: "🔵",
    summary: "Couper, compter, faire de la monnaie et gérer une cave proprement.",
    minutes: 10,
    status: "plan",
    objectives: [
      "Couper et compter les jetons rapidement",
      "Faire de la monnaie sans erreur",
      "Gérer une cave et un rack",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Le « chip cutting » : couper des piles en quantités vérifiables d'un coup d'œil.",
          "Compter par 5 et par 20 : les techniques de comptage visuel des croupiers.",
          "Faire la monnaie : échanger une grosse valeur contre des plus petites instantanément.",
          "Le code couleur des jetons et les valeurs standards.",
          "Gérer le rack (le plateau de jetons) et reconstituer une cave.",
          "Pousser le pot proprement vers le gagnant.",
        ],
      },
    ],
  },
  {
    n: 3,
    slug: "manipulation-des-cartes",
    title: "La manipulation des cartes",
    emoji: "🃏",
    summary: "Wash, riffle, strip, cut et distribution : les gestes du dealer.",
    minutes: 11,
    status: "plan",
    objectives: [
      "Maîtriser le mélange complet (wash, riffle, strip, cut)",
      "Distribuer proprement et régulièrement",
      "Protéger le jeu contre la triche",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Le wash : mélange à plat initial qui randomise réellement le jeu.",
          "Le riffle shuffle : l'effeuillage classique en deux paquets.",
          "Le strip (effeuillage) : mélange complémentaire pour casser les séquences.",
          "Le cut (la coupe) et l'usage de la « cut card ».",
          "La distribution : tenue du jeu, pitch des cartes, régularité et discrétion.",
          "Protéger le jeu : éviter les cartes exposées et les flashs.",
        ],
      },
    ],
  },
  {
    n: 4,
    slug: "dealer-texas-holdem",
    title: "Dealer au Texas Hold'em",
    emoji: "♠",
    summary: "Ouverture de main, distribution, gestion du pot, side pots et showdown.",
    minutes: 12,
    status: "plan",
    objectives: [
      "Mener une main complète de A à Z",
      "Gérer le pot principal et les side pots",
      "Conduire un showdown sans erreur",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Ouverture de la main : bouton, blindes, burn card et distribution.",
          "Gérer les tours d'enchères et annoncer l'action.",
          "Le burn & turn : brûler une carte avant le flop, le turn et la river.",
          "Constituer le pot et le garder lisible.",
          "Calculer et séparer les side pots quand un joueur est all-in.",
          "Conduire le showdown : ordre de dévoilement et lecture des mains.",
        ],
      },
    ],
  },
  {
    n: 5,
    slug: "situations-cash-game",
    title: "Situations en cash game",
    emoji: "💵",
    summary: "Joueur absent, miss blind, changement de place, nouveau joueur, cave minimum.",
    minutes: 9,
    status: "plan",
    objectives: [
      "Appliquer les règles propres au cash game",
      "Gérer les entrées et sorties de joueurs",
      "Traiter les blindes manquées correctement",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Le joueur absent : que faire de ses blindes et de sa main.",
          "La « miss blind » : poster ou attendre le bouton, les règles.",
          "Changement de place et nouveau joueur : où et quand entrer.",
          "Le buy-in et la cave minimum / maximum.",
          "Le « rat-holing » (sortir des jetons de table) et pourquoi c'est interdit.",
        ],
      },
    ],
  },
  {
    n: 6,
    slug: "situations-tournoi",
    title: "Situations en tournoi",
    emoji: "🏆",
    summary: "Cassage de table, chip race, redraw, balancing, changement de niveau.",
    minutes: 10,
    status: "plan",
    objectives: [
      "Gérer la structure d'un tournoi",
      "Équilibrer les tables (balancing)",
      "Conduire un chip race",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Le « balancing » : équilibrer le nombre de joueurs entre les tables.",
          "Le cassage de table et le redraw des sièges.",
          "Le chip race : retirer les petites dénominations en fin de niveau.",
          "Le changement de niveau et la hausse des blindes.",
          "La gestion du temps et des pauses.",
        ],
      },
    ],
  },
  {
    n: 7,
    slug: "gestion-des-erreurs",
    title: "La gestion des erreurs et litiges",
    emoji: "⚠️",
    summary: "Misdeal, carte retournée, jeton contesté, litige entre joueurs.",
    minutes: 9,
    status: "plan",
    objectives: [
      "Identifier et corriger un misdeal",
      "Réagir à une carte exposée",
      "Désamorcer un litige et appeler le floor",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Le misdeal : les cas qui l'imposent et la procédure.",
          "La carte retournée ou exposée : comment la traiter selon le moment.",
          "Le jeton ou la mise contestée : reconstituer la vérité de la table.",
          "Le litige entre joueurs : rester neutre et « appeler le floor ».",
          "L'action hors-tour et la mise irrégulière.",
        ],
      },
    ],
  },
  {
    n: 8,
    slug: "prelevement-du-rake",
    title: "Le prélèvement du rake",
    emoji: "🧾",
    summary: "Calcul du rake, jackpot drop et impact des side pots.",
    minutes: 8,
    status: "plan",
    objectives: [
      "Calculer le rake correctement",
      "Gérer le jackpot drop",
      "Prélever sur un pot avec side pots",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Qu'est-ce que le rake et à quoi il sert.",
          "Le calcul : pourcentage du pot avec un plafond (cap).",
          "Le « no flop, no drop » et les règles courantes.",
          "Le jackpot drop : prélèvement dédié aux jackpots et bad beat jackpots.",
          "Prélever proprement quand il y a un ou plusieurs side pots.",
        ],
      },
    ],
  },
  {
    n: 9,
    slug: "annonces-du-dealer",
    title: "Les annonces du dealer",
    emoji: "📣",
    summary: "Le vocabulaire à annoncer à voix haute, en français et en anglais.",
    minutes: 8,
    status: "plan",
    objectives: [
      "Connaître toutes les annonces standards",
      "Annoncer clairement et au bon moment",
      "Maîtriser les annonces en anglais (festivals)",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Annoncer l'action : « action on player », raise, call, all-in.",
          "« Seat open » et « player in » : signaler une place et une arrivée au floor.",
          "Annoncer les montants de relance et le pot.",
          "« Floor ! » : quand et comment appeler le superviseur.",
          "Le lexique bilingue FR/EN indispensable en festival international.",
        ],
      },
    ],
  },
  {
    n: 10,
    slug: "examen-final",
    title: "Examen final & certification",
    emoji: "🎓",
    summary: "QCM de 100 questions, exercices pratiques et certification Jérôme Ibiza.",
    minutes: 60,
    status: "plan",
    objectives: [
      "Valider l'ensemble des connaissances",
      "Réussir les exercices pratiques",
      "Obtenir la certification Académie Croupier Jérôme Ibiza",
    ],
    sections: [
      {
        heading: "Au programme de l'examen",
        bullets: [
          "QCM de 100 questions couvrant les 9 modules.",
          "Exercices pratiques : mélange, distribution, calcul de side pots et de rake.",
          "Études de cas : litiges et situations délicates à résoudre.",
          "Certification « Croupier Poker — Académie Jérôme Ibiza » à la clé.",
        ],
      },
    ],
  },
];

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}
