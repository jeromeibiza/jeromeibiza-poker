/**
 * Academie Croupier Poker Jerome Ibiza — programme de formation gratuite.
 * 10 modules + examen final. Module 1 entierement redige ; les modules 2 a 10
 * ont un plan detaille (contenu pedagogique a developper progressivement).
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
  status: "complet" | "plan"; // complet = redige, plan = plan detaille
  objectives: string[];
  sections: ModuleSection[];
};

export const MODULES: AcademyModule[] = [
  {
    n: 1,
    slug: "introduction-au-metier",
    title: "Introduction au metier de croupier poker",
    emoji: "🎩",
    summary: "Le role du dealer, les qualites requises et les evolutions de carriere possibles.",
    minutes: 12,
    status: "complet",
    objectives: [
      "Comprendre le role exact d'un croupier de poker",
      "Identifier les qualites et savoir-etre attendus",
      "Connaitre les differents postes et l'evolution de carriere",
    ],
    sections: [
      {
        heading: "Le role du dealer",
        body:
          "Le croupier de poker est le chef d'orchestre de la table. Contrairement a la roulette ou au blackjack ou il joue contre les clients, au poker le dealer ne joue jamais : les joueurs s'affrontent entre eux. Son role est d'assurer le bon deroulement de la partie. Il melange et distribue les cartes, annonce l'action a voix haute, gere le pot, prelevent le rake, devoile les cartes communes, designe le gagnant et lui pousse le pot. Il est aussi le garant des regles et le premier rempart contre les erreurs et la triche. Un bon croupier rend la table fluide, agreable et equitable, sans jamais se faire remarquer.",
      },
      {
        heading: "Les qualites requises",
        bullets: [
          "Dexterite manuelle : melange, distribution et manipulation des jetons rapides et propres.",
          "Rigueur et concentration : aucune erreur sur le pot, les blindes ou l'ordre d'action.",
          "Calcul mental : annoncer les mises, faire la monnaie, calculer le rake et les side pots vite et juste.",
          "Sang-froid : gerer les litiges et les joueurs en tilt avec calme et autorite.",
          "Sens du service et diplomatie : rester courtois, neutre et professionnel en toutes circonstances.",
          "Endurance : tenir la concentration sur de longues sessions, souvent de nuit.",
          "Integrite : l'honnetete absolue est non negociable dans ce metier.",
        ],
      },
      {
        heading: "Les differents postes",
        body:
          "La filiere poker en casino ou cardroom offre une vraie progression. On commence rarement au sommet : chaque poste se merite.",
        bullets: [
          "Dealer : distribue et gere les tables de cash game et de tournoi.",
          "Senior Dealer : dealer experimente, affecte aux tables a fort enjeu et aux finales.",
          "Chip Runner : apporte les caves de jetons aux joueurs et fait le lien avec la caisse.",
          "Assistant Floor : seconde le floor, gere les listes d'attente et les changements de table.",
          "Floor (floorman) : superviseur de salle, tranche les litiges et fait appliquer les regles.",
          "Tournament Director (TD) : responsable de l'organisation et des decisions d'un tournoi.",
          "Poker Manager : dirige toute la salle de poker (planning, equipe, resultats).",
        ],
      },
      {
        heading: "L'evolution de carriere",
        body:
          "Un parcours typique demarre comme dealer, puis senior dealer apres avoir fait ses preuves, avant d'evoluer vers le floor puis la direction de salle ou la direction de tournois. Beaucoup de croupiers freelance enchainent les festivals internationaux (WSOP, EPT, WPT, Triton), une voie passionnante et bien remuneree pour qui aime voyager. La maitrise de l'anglais est alors un atout majeur.",
      },
    ],
  },
  {
    n: 2,
    slug: "manipulation-des-jetons",
    title: "La manipulation des jetons",
    emoji: "🔵",
    summary: "Couper, compter, faire de la monnaie et gerer une cave proprement.",
    minutes: 10,
    status: "plan",
    objectives: [
      "Couper et compter les jetons rapidement",
      "Faire de la monnaie sans erreur",
      "Gerer une cave et un rack",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Le 'chip cutting' : couper des piles en quantites verifiables d'un coup d'oeil.",
          "Compter par 5 et par 20 : les techniques de comptage visuel des croupiers.",
          "Faire la monnaie : echanger une grosse valeur contre des plus petites instantanement.",
          "Le code couleur des jetons et les valeurs standards.",
          "Gerer le rack (le plateau de jetons) et reconstituer une cave.",
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
      "Maitriser le melange complet (wash, riffle, strip, cut)",
      "Distribuer proprement et regulierement",
      "Proteger le jeu contre la triche",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Le wash : melange a plat initial qui randomise reellement le jeu.",
          "Le riffle shuffle : l'effeuillage classique en deux paquets.",
          "Le strip (effeuillage) : melange complementaire pour casser les sequences.",
          "Le cut (la coupe) et l'usage de la 'cut card'.",
          "La distribution : tenue du jeu, pitch des cartes, regularite et discretion.",
          "Proteger le jeu : eviter les cartes exposees et les flashs.",
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
      "Mener une main complete de A a Z",
      "Gerer le pot principal et les side pots",
      "Conduire un showdown sans erreur",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Ouverture de la main : bouton, blindes, burn card et distribution.",
          "Gerer les tours d'encheres et annoncer l'action.",
          "Le burn & turn : bruler une carte avant le flop, le turn et la river.",
          "Constituer le pot et le garder lisible.",
          "Calculer et separer les side pots quand un joueur est all-in.",
          "Conduire le showdown : ordre de devoilement et lecture des mains.",
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
      "Appliquer les regles propres au cash game",
      "Gerer les entrees et sorties de joueurs",
      "Traiter les blindes manquees correctement",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Le joueur absent : que faire de ses blindes et de sa main.",
          "La 'miss blind' : poster ou attendre le bouton, les regles.",
          "Changement de place et nouveau joueur : ou et quand entrer.",
          "Le buy-in et la cave minimum / maximum.",
          "Le 'rat-holing' (sortir des jetons de table) et pourquoi c'est interdit.",
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
      "Gerer la structure d'un tournoi",
      "Equilibrer les tables (balancing)",
      "Conduire un chip race",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Le 'balancing' : equilibrer le nombre de joueurs entre les tables.",
          "Le cassage de table et le redraw des sieges.",
          "Le chip race : retirer les petites denominations en fin de niveau.",
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
    summary: "Misdeal, carte retournee, jeton conteste, litige entre joueurs.",
    minutes: 9,
    status: "plan",
    objectives: [
      "Identifier et corriger un misdeal",
      "Reagir a une carte exposee",
      "Desamorcer un litige et appeler le floor",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Le misdeal : les cas qui l'imposent et la procedure.",
          "La carte retournee ou exposee : comment la traiter selon le moment.",
          "Le jeton ou la mise contestee : reconstituer la verite de la table.",
          "Le litige entre joueurs : rester neutre et 'appeler le floor'.",
          "L'action hors-tour et la mise irreguliere.",
        ],
      },
    ],
  },
  {
    n: 8,
    slug: "prelevement-du-rake",
    title: "Le prelevement du rake",
    emoji: "🧾",
    summary: "Calcul du rake, jackpot drop et impact des side pots.",
    minutes: 8,
    status: "plan",
    objectives: [
      "Calculer le rake correctement",
      "Gerer le jackpot drop",
      "Prelever sur un pot avec side pots",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Qu'est-ce que le rake et a quoi il sert.",
          "Le calcul : pourcentage du pot avec un plafond (cap).",
          "Le 'no flop, no drop' et les regles courantes.",
          "Le jackpot drop : prelevement dedie aux jackpots et bad beat jackpots.",
          "Prelever proprement quand il y a un ou plusieurs side pots.",
        ],
      },
    ],
  },
  {
    n: 9,
    slug: "annonces-du-dealer",
    title: "Les annonces du dealer",
    emoji: "📣",
    summary: "Le vocabulaire a annoncer a voix haute, en francais et en anglais.",
    minutes: 8,
    status: "plan",
    objectives: [
      "Connaitre toutes les annonces standards",
      "Annoncer clairement et au bon moment",
      "Maitriser les annonces en anglais (festivals)",
    ],
    sections: [
      {
        heading: "Au programme de ce module",
        bullets: [
          "Annoncer l'action : 'action on player', raise, call, all-in.",
          "'Seat open' et 'player in' : signaler une place et une arrivee au floor.",
          "Annoncer les montants de relance et le pot.",
          "'Floor !' : quand et comment appeler le superviseur.",
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
    summary: "QCM de 100 questions, exercices pratiques et certification Jerome Ibiza.",
    minutes: 60,
    status: "plan",
    objectives: [
      "Valider l'ensemble des connaissances",
      "Reussir les exercices pratiques",
      "Obtenir la certification Academie Croupier Jerome Ibiza",
    ],
    sections: [
      {
        heading: "Au programme de l'examen",
        bullets: [
          "QCM de 100 questions couvrant les 9 modules.",
          "Exercices pratiques : melange, distribution, calcul de side pots et de rake.",
          "Etudes de cas : litiges et situations delicates a resoudre.",
          "Certification 'Croupier Poker — Academie Jerome Ibiza' a la cle.",
        ],
      },
    ],
  },
];

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}
