/**
 * Classement officiel des mains au poker (de la plus forte a la plus faible).
 * Probabilites = chance d'obtenir cette main avec 5 cartes tirees au hasard
 * dans un jeu de 52 cartes (reference pedagogique standard).
 */

export type HandRank = {
  rank: number; // 1 = meilleure
  slug: string;
  name: string;
  short: string;
  cards: string[]; // exemple visuel
  probabilityPct: string; // "0,000154 %"
  odds: string; // "1 sur 649 740"
  combos: number; // nombre de combinaisons possibles
  description: string;
  example: string;
};

export const HANDS: HandRank[] = [
  {
    rank: 1,
    slug: "quinte-flush-royale",
    name: "Quinte flush royale",
    short: "Royal flush",
    cards: ["As", "Ks", "Qs", "Js", "Ts"],
    probabilityPct: "0,000154 %",
    odds: "1 sur 649 740",
    combos: 4,
    description:
      "La suite As-Roi-Dame-Valet-10, toutes de la meme couleur. C'est la main la plus forte du poker : elle ne peut jamais etre battue.",
    example: "A♠ K♠ Q♠ J♠ 10♠ — du 10 a l'As, tout en pique.",
  },
  {
    rank: 2,
    slug: "quinte-flush",
    name: "Quinte flush",
    short: "Straight flush",
    cards: ["9h", "8h", "7h", "6h", "5h"],
    probabilityPct: "0,00139 %",
    odds: "1 sur 72 193",
    combos: 36,
    description:
      "Cinq cartes qui se suivent, toutes de la meme couleur. En cas d'egalite, c'est la carte la plus haute de la suite qui departage.",
    example: "9♥ 8♥ 7♥ 6♥ 5♥ — quinte flush au 9.",
  },
  {
    rank: 3,
    slug: "carre",
    name: "Carre",
    short: "Four of a kind",
    cards: ["Qs", "Qh", "Qd", "Qc", "7s"],
    probabilityPct: "0,0240 %",
    odds: "1 sur 4 165",
    combos: 624,
    description:
      "Les quatre cartes de la meme valeur. La 5e carte (le kicker) sert a departager deux carres identiques (rare).",
    example: "Q♠ Q♥ Q♦ Q♣ + 7♠ — carre de dames.",
  },
  {
    rank: 4,
    slug: "full",
    name: "Full",
    short: "Full house",
    cards: ["Ks", "Kh", "Kd", "4s", "4c"],
    probabilityPct: "0,1441 %",
    odds: "1 sur 694",
    combos: 3744,
    description:
      "Un brelan + une paire. On compare d'abord le brelan, puis la paire en cas d'egalite. On annonce \"full aux Rois par les 4\".",
    example: "K♠ K♥ K♦ + 4♠ 4♣ — full aux Rois par les 4.",
  },
  {
    rank: 5,
    slug: "couleur",
    name: "Couleur",
    short: "Flush",
    cards: ["Ad", "Jd", "8d", "5d", "2d"],
    probabilityPct: "0,197 %",
    odds: "1 sur 509",
    combos: 5108,
    description:
      "Cinq cartes de la meme couleur, non consecutives. La plus haute carte departage, puis la suivante, etc.",
    example: "A♦ J♦ 8♦ 5♦ 2♦ — couleur a l'As (de carreau).",
  },
  {
    rank: 6,
    slug: "suite",
    name: "Suite (quinte)",
    short: "Straight",
    cards: ["9s", "8h", "7d", "6c", "5s"],
    probabilityPct: "0,392 %",
    odds: "1 sur 255",
    combos: 10200,
    description:
      "Cinq cartes consecutives de couleurs differentes. L'As peut servir de carte haute (A-K-Q-J-10) ou basse (A-2-3-4-5, la \"roue\").",
    example: "9♠ 8♥ 7♦ 6♣ 5♠ — suite au 9.",
  },
  {
    rank: 7,
    slug: "brelan",
    name: "Brelan",
    short: "Three of a kind",
    cards: ["7s", "7h", "7d", "Ks", "2c"],
    probabilityPct: "2,11 %",
    odds: "1 sur 47",
    combos: 54912,
    description:
      "Trois cartes de la meme valeur. Les deux cartes restantes (kickers) departagent deux brelans identiques.",
    example: "7♠ 7♥ 7♦ + K♠ 2♣ — brelan de 7.",
  },
  {
    rank: 8,
    slug: "double-paire",
    name: "Double paire",
    short: "Two pair",
    cards: ["As", "Ah", "9s", "9d", "5c"],
    probabilityPct: "4,75 %",
    odds: "1 sur 21",
    combos: 123552,
    description:
      "Deux paires differentes. On compare la paire la plus haute, puis la seconde, puis le kicker.",
    example: "A♠ A♥ + 9♠ 9♦ + 5♣ — deux paires, As et 9.",
  },
  {
    rank: 9,
    slug: "paire",
    name: "Paire",
    short: "One pair",
    cards: ["Js", "Jh", "As", "8d", "3c"],
    probabilityPct: "42,3 %",
    odds: "1 sur 2,37",
    combos: 1098240,
    description:
      "Deux cartes de la meme valeur. Les trois cartes restantes servent de kickers pour departager.",
    example: "J♠ J♥ + A♠ 8♦ 3♣ — paire de Valets, kicker As.",
  },
  {
    rank: 10,
    slug: "carte-haute",
    name: "Carte haute",
    short: "High card",
    cards: ["As", "Jh", "8d", "6c", "3s"],
    probabilityPct: "50,1 %",
    odds: "1 sur 2",
    combos: 1302540,
    description:
      "Aucune combinaison : c'est la carte la plus haute qui compte. On dit \"hauteur As\". La main la plus faible du poker.",
    example: "A♠ J♥ 8♦ 6♣ 3♠ — hauteur As.",
  },
];
