/**
 * Fiches détaillées des formats de poker.
 * Rédaction soignée : accents corrects, aucun marqueur "contenu IA"
 * (pas de tiret cadratin, pas de souligné décoratif).
 */

export type FormatSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type FormatGuide = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  summary: string;
  variance: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  sections: FormatSection[];
  dealerNote?: string;
  /** Formation partenaire (lien externe, futur lien d'affiliation). */
  partner?: { name: string; url: string; blurb: string };
};

export const FORMATS: FormatGuide[] = [
  {
    slug: "cash-game",
    name: "Cash Game",
    emoji: "💵",
    tagline: "Les jetons valent leur prix réel, on entre et on sort quand on veut.",
    summary:
      "Le cash game est la forme la plus pure du poker : chaque jeton vaut son montant réel, les blindes ne montent jamais, et vous êtes libre de quitter la table à tout moment. C'est le format roi pour apprendre la profondeur du jeu.",
    variance: "Moyenne",
    bestFor: "Ceux qui veulent jouer à leur rythme et travailler le jeu profond, post-flop.",
    pros: [
      "Liberté totale : on s'assoit et on part quand on veut.",
      "Tapis profonds, donc un jeu post-flop riche et formateur.",
      "Pas de structure qui force la main : on choisit ses coups.",
      "On peut recaver pour rejouer avec un tapis plein.",
    ],
    cons: [
      "Demande de la rigueur et de la discipline de bankroll.",
      "Les bons joueurs réguliers y sont nombreux.",
      "Moins d'adrénaline de tournoi, pas de gros lot soudain.",
    ],
    sections: [
      {
        heading: "Comment ça marche",
        body:
          "Vous achetez des jetons (la cave) que vous pouvez reconstituer à tout moment. Les blindes restent fixes. L'objectif n'est pas d'éliminer les autres mais de gagner des jetons coup après coup. La profondeur des tapis, souvent 100 grosses blindes ou plus, rend chaque rue importante.",
      },
      {
        heading: "Les clés du cash game",
        bullets: [
          "Choisir sa table : asseyez-vous là où les joueurs faibles sont à votre droite.",
          "Jouer serré et agressif, surtout au début.",
          "Maîtriser les cotes et la valeur, car les pots se construisent sur plusieurs rues.",
          "Gérer sa bankroll : 20 à 30 caves de la limite jouée.",
        ],
      },
    ],
    dealerNote:
      "Le cash game, c'est l'école du poker. C'est là qu'on apprend vraiment à jouer profond, à lire les rues et à doser ses mises. Si tu veux devenir bon, passe du temps en cash.",
    partner: {
      name: "Poker Evolution",
      url: "https://pokerevolution.eu/",
      blurb:
        "Une formation spécialisée cash game pour structurer ton jeu, combler tes fuites et passer au niveau supérieur.",
    },
  },
  {
    slug: "tournoi-mtt",
    name: "Tournoi MTT",
    emoji: "🏆",
    tagline: "Des centaines de joueurs, une structure qui monte, un gros lot au bout.",
    summary:
      "Le tournoi multi-tables, ou MTT, est le format des rêves : un petit droit d'entrée peut rapporter des milliers de fois la mise. Tout le monde part avec le même tapis, et on joue jusqu'à ce qu'un seul joueur ait tous les jetons.",
    variance: "Très élevée",
    bestFor: "Ceux qui aiment l'adrénaline, la montée en pression et la chasse au gros lot.",
    pros: [
      "Petit buy-in, gain potentiel énorme.",
      "Sensations fortes, surtout en table finale.",
      "Un seul achat pour des heures de jeu (en freezeout).",
      "Du prestige : les grands tournois font les légendes.",
    ],
    cons: [
      "Variance énorme : on peut enchaîner des dizaines de tournois sans gain.",
      "Long : un MTT peut durer toute une journée.",
      "L'ICM complique fortement les décisions près des places payées.",
    ],
    sections: [
      {
        heading: "La structure qui monte",
        body:
          "Les blindes augmentent à intervalles réguliers. Au début, les tapis sont profonds et on joue posé. Plus le tournoi avance, plus les tapis raccourcissent par rapport aux blindes, et plus le jeu devient agressif, jusqu'au push or fold à tapis court.",
      },
      {
        heading: "Les phases d'un tournoi",
        bullets: [
          "Début : tapis profonds, on sélectionne ses coups.",
          "Milieu : les blindes mordent, on commence à voler et à défendre.",
          "Bulle : la pression ICM est maximale, on exploite les joueurs qui veulent juste se qualifier.",
          "Table finale : chaque place payée compte, l'ICM dicte presque tout.",
        ],
      },
    ],
    dealerNote:
      "Le MTT, c'est le marathon du poker. Accepte la variance : même en jouant parfaitement, tu perdras la plupart du temps, mais le jour où ça passe, ça change une vie. Prévois la bankroll en conséquence, 100 buy-ins minimum.",
  },
  {
    slug: "sit-and-go",
    name: "Sit & Go",
    emoji: "🎯",
    tagline: "Un tournoi sur une table, qui démarre dès qu'elle est pleine.",
    summary:
      "Le Sit & Go, ou SNG, est un mini-tournoi qui se lance sans horaire fixe, dès que le nombre de joueurs requis est atteint. Format court et cadré, c'est un excellent terrain d'apprentissage du jeu de tournoi.",
    variance: "Moyenne",
    bestFor: "Ceux qui veulent l'expérience tournoi en version courte et maîtrisée.",
    pros: [
      "Rapide et à durée limitée, idéal quand on a peu de temps.",
      "Format fermé : on sait combien de joueurs et de places payées.",
      "Excellent pour travailler le jeu à tapis court et l'ICM de base.",
      "Variance plus contenue qu'un gros MTT.",
    ],
    cons: [
      "Plafond de gains limité comparé à un MTT.",
      "Beaucoup de regroupements push or fold en fin de partie.",
      "Les bons joueurs y sont solides et étudiés.",
    ],
    sections: [
      {
        heading: "Le déroulé type",
        body:
          "Une table se remplit, le SNG démarre, et on joue jusqu'à ce qu'il reste les places payées (souvent les trois premiers sur neuf). La structure monte vite, donc le jeu de tapis court et l'ICM arrivent rapidement.",
      },
      {
        heading: "Bien jouer un SNG",
        bullets: [
          "Patient au début, agressif quand les blindes montent.",
          "Maîtrisez les ranges de push et de call à tapis court.",
          "Près de la bulle, mettez la pression sur les tapis moyens qui veulent se qualifier.",
        ],
      },
    ],
    dealerNote:
      "Le SNG, c'est le laboratoire idéal pour comprendre l'ICM sans la longueur d'un MTT. Joues-en quelques centaines et le jeu de tapis court n'aura plus de secret pour toi.",
  },
  {
    slug: "spin-and-go",
    name: "Spin & Go",
    emoji: "🎰",
    tagline: "Un Sit & Go à trois joueurs, à dotation tirée au sort.",
    summary:
      "Le Spin & Go est la version express et explosive du poker : trois joueurs, des tapis courts, et un multiplicateur de gains tiré au sort avant le début, parfois jusqu'à plusieurs milliers de fois la mise. Du fun à l'état pur, mais une variance redoutable.",
    variance: "Très élevée",
    bestFor: "Ceux qui aiment le jeu rapide, le frisson du jackpot et les sessions courtes.",
    pros: [
      "Très rapide : une partie dure quelques minutes.",
      "Gros multiplicateurs possibles, l'effet jackpot.",
      "Format simple à trois joueurs, idéal pour apprendre l'agression.",
      "Parfait sur mobile, entre deux moments.",
    ],
    cons: [
      "Variance extrême à cause du tirage au sort des dotations.",
      "Jeu très standardisé en tapis court, peu de profondeur.",
      "Le rake pèse lourd sur ces petits formats.",
    ],
    sections: [
      {
        heading: "Le principe du multiplicateur",
        body:
          "Avant le début, une roue détermine le montant total en jeu, de deux fois les mises jusqu'à des multiplicateurs énormes et rares. Le gagnant rafle presque toujours la totalité. C'est ce tirage qui crée le frisson et la grosse variance.",
      },
      {
        heading: "La stratégie de base",
        bullets: [
          "Les tapis sont courts : le jeu push or fold arrive très vite.",
          "L'agression est récompensée, surtout en heads-up final.",
          "Connaître ses ranges de tapis court est presque toute la stratégie.",
        ],
      },
    ],
    dealerNote:
      "Le Spin, c'est le format casino du poker en ligne : fun, rapide, addictif. Amuse-toi, mais garde la tête froide sur la bankroll, la variance peut être brutale.",
    partner: {
      name: "Spin Family",
      url: "https://www.spinfamily.fr/",
      blurb:
        "La communauté et la formation francophones dédiées au Spin & Go, pour progresser vite sur ce format si particulier.",
    },
  },
  {
    slug: "heads-up",
    name: "Heads-Up",
    emoji: "⚔️",
    tagline: "Le duel à deux joueurs, en action sur chaque main.",
    summary:
      "En heads-up, vous affrontez un seul adversaire, et vous jouez chaque main. C'est le format le plus instructif et le plus exigeant : pas de cachette, pas de mains à attendre, juste un duel d'esprit permanent.",
    variance: "Élevée",
    bestFor: "Ceux qui veulent progresser le plus vite et aiment le combat direct.",
    pros: [
      "Le plus formateur : on joue toutes les mains, on apprend vite.",
      "Jeu très agressif et riche en lecture adverse.",
      "Pas d'attente : action sur chaque coup.",
      "Idéal pour comprendre les ranges et l'exploitation.",
    ],
    cons: [
      "Exigeant mentalement : pas de répit, l'adversaire vous étudie aussi.",
      "Le niveau monte vite, les faibles désertent.",
      "Variance élevée, ego mis à l'épreuve.",
    ],
    sections: [
      {
        heading: "Pourquoi tout est différent à deux",
        body:
          "À deux, les ranges s'élargissent énormément : la plupart des mains valent la peine d'être jouées, car l'adversaire a lui aussi souvent une main faible. Le bouton joue presque tous les coups, l'agression et la lecture deviennent décisives.",
      },
      {
        heading: "Les clés du heads-up",
        bullets: [
          "Élargissez massivement votre range d'ouverture au bouton.",
          "Adaptez-vous vite : le jeu est un ajustement permanent.",
          "Travaillez l'exploitation, la moindre fuite adverse se punit fort.",
        ],
      },
    ],
    dealerNote:
      "Si tu veux progresser vite, joue du heads-up. Rien ne t'oblige autant à comprendre les ranges et à lire l'adversaire. C'est dur pour l'ego, mais c'est la salle de musculation du poker.",
  },
  {
    slug: "short-deck",
    name: "Short Deck",
    emoji: "🃏",
    tagline: "Du Hold'em sans les cartes 2 à 5, un jeu de 36 cartes.",
    summary:
      "Le Short Deck, ou Hold'em à 6 plus, retire les cartes de 2 à 5 du jeu. Avec seulement 36 cartes, les mains s'entrechoquent bien plus souvent, l'action est garantie et le classement des mains change. Un format spectaculaire venu d'Asie.",
    variance: "Élevée",
    bestFor: "Ceux qui veulent de l'action constante et un poker qui sort de l'ordinaire.",
    pros: [
      "Action garantie : les grosses mains se rencontrent souvent.",
      "Un vent de fraîcheur quand on sature du Hold'em classique.",
      "Très spectaculaire, prisé en high roller.",
    ],
    cons: [
      "Le classement des mains change, il faut réapprendre.",
      "Moins répandu, surtout en ligne et en micro-limites.",
      "Variance élevée à cause des confrontations fréquentes.",
    ],
    sections: [
      {
        heading: "Ce qui change dans les règles",
        body:
          "Avec 36 cartes, la couleur devient plus rare que le full, donc elle la bat. Dans beaucoup de variantes, l'As peut compléter une suite avec le 6 (A-6-7-8-9). Les tirages quinte sont plus faciles, et tout le monde touche plus souvent.",
      },
      {
        heading: "Adapter sa stratégie",
        bullets: [
          "Les paires et tirages prennent de la valeur, les grosses cartes un peu moins.",
          "On joue plus de coups, l'agression paie.",
          "Attention au nouveau classement : la couleur bat le full.",
        ],
      },
    ],
    dealerNote:
      "Le Short Deck, c'est l'action pure. Quand je distribue une table de 6 plus, ça mise, ça relance, ça part à tapis sans arrêt. Réapprends juste le classement des mains avant de t'y lancer.",
  },
  {
    slug: "pot-limit-omaha",
    name: "Pot Limit Omaha",
    emoji: "🌊",
    tagline: "Quatre cartes en main, des mises plafonnées au pot, des pots énormes.",
    summary:
      "Le Pot Limit Omaha, ou PLO, est le grand rival du Hold'em. Chaque joueur reçoit quatre cartes et doit en utiliser exactement deux. Les mains sont bien plus fortes, les tirages monstrueux, et les pots gonflent vite. Le format préféré des amateurs d'action.",
    variance: "Très élevée",
    bestFor: "Les joueurs de Hold'em confirmés qui veulent plus d'action et de complexité.",
    pros: [
      "Action et gros pots garantis.",
      "Tirages monstrueux qui rendent le jeu palpitant.",
      "Beaucoup de joueurs faibles attirés par l'action.",
      "Un vrai défi stratégique, riche et profond.",
    ],
    cons: [
      "Variance très élevée, la bankroll doit suivre.",
      "Plus complexe : quatre cartes, énormément de combinaisons.",
      "Les erreurs de débutant y coûtent vite très cher.",
    ],
    sections: [
      {
        heading: "La règle des deux cartes",
        body:
          "Vous recevez quatre cartes mais devez en utiliser exactement deux (et trois du tableau) pour former votre main. C'est le piège classique du débutant : avoir quatre coeurs en main ne donne pas une couleur. Il faut toujours raisonner par paires de cartes.",
      },
      {
        heading: "Pourquoi les mises sont plafonnées",
        bullets: [
          "On ne peut jamais miser plus que la taille du pot.",
          "Cela limite la casse mais laisse les pots gonfler vite, rue après rue.",
          "Les tirages valent souvent autant qu'une main faite : on part à tapis avec d'énormes équités.",
        ],
      },
    ],
    dealerNote:
      "Le PLO, c'est le Hold'em sous stéroïdes. Quatre cartes, ça multiplie les possibilités et les pièges. Commence petit, la variance est brutale, mais aucun format n'est aussi grisant quand on commence à le comprendre.",
  },
  {
    slug: "mixed-games",
    name: "Mixed Games",
    emoji: "🔄",
    tagline: "Une rotation de variantes : HORSE, 8-game et compagnie.",
    summary:
      "Les mixed games font tourner plusieurs variantes au sein d'une même partie : Hold'em, Omaha, Stud, Razz et d'autres. Le format des puristes et des joueurs complets, où la polyvalence fait toute la différence.",
    variance: "Moyenne",
    bestFor: "Les joueurs curieux et complets qui veulent maîtriser tout le poker.",
    pros: [
      "Polyvalence : on devient un joueur complet.",
      "Moins de spécialistes, donc plus d'opportunités.",
      "Variété qui évite la lassitude.",
      "Très respecté dans le monde du poker.",
    ],
    cons: [
      "Il faut maîtriser plusieurs jeux, dont certains exotiques.",
      "Rare en micro-limites et hors des grosses salles.",
      "Courbe d'apprentissage plus longue.",
    ],
    sections: [
      {
        heading: "Les formats classiques",
        bullets: [
          "HORSE : Hold'em, Omaha hi-lo, Razz, Stud, Stud hi-lo en rotation.",
          "8-game : huit variantes, dont du limit et du no-limit.",
          "La rotation change à intervalle régulier ou à chaque tour de table.",
        ],
      },
      {
        heading: "Pourquoi s'y mettre",
        body:
          "Les mixed games récompensent la polyvalence. Comme peu de joueurs maîtrisent toutes les variantes, vos points faibles sont souvent moins faibles que ceux des autres. C'est aussi le meilleur moyen de devenir un joueur de poker vraiment complet.",
      },
    ],
    dealerNote:
      "Les mixed games, c'est le format des vrais amoureux du poker. Apprendre le Razz ou le Stud te rendra meilleur partout, même au Hold'em, parce que ça muscle ta compréhension globale du jeu.",
  },
];

export function getFormat(slug: string): FormatGuide | undefined {
  return FORMATS.find((f) => f.slug === slug);
}
