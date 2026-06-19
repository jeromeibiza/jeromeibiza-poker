/**
 * Configuration centrale du Poker Hub Jerome Ibiza.
 * Projet SIDE — independant du site principal jeromeibiza.com (aucun lien
 * croise pour l'instant). Futur sous-domaine : poker.jeromeibiza.com.
 */

export const SITE = {
  name: "Poker Hub — Jerome Ibiza",
  shortName: "Poker Hub",
  // URL de prod a ajuster quand le domaine/sous-domaine sera branche.
  url: "https://poker.jeromeibiza.com",
  tagline: "Apprendre, jouer et devenir croupier poker — gratuitement.",
  description:
    "Le centre de ressources poker francophone : regles, classement des mains, " +
    "strategie debutant a avance, glossaire geant, calculateurs et la seule " +
    "academie gratuite pour devenir croupier poker, par Jerome Ibiza, croupier pro.",
  author: "Jerome Ibiza",
  locale: "fr_FR",
} as const;

export type NavItem = {
  label: string;
  href: string;
  desc?: string;
};

export type NavSection = {
  label: string;
  href: string;
  emoji: string;
  desc: string;
  children?: NavItem[];
};

/** Arborescence globale du hub — sert a la nav, au footer et au sitemap. */
export const NAV: NavSection[] = [
  {
    label: "Apprendre",
    href: "/apprendre",
    emoji: "♠",
    desc: "Les bases du poker, pas a pas, pour grands debutants.",
    children: [
      { label: "Les regles du poker", href: "/apprendre/regles-du-poker" },
      { label: "Classement des mains", href: "/apprendre/classement-des-mains" },
      { label: "Les positions", href: "/apprendre/positions" },
      { label: "Les blindes", href: "/apprendre/blindes" },
      { label: "Deroulement d'une main", href: "/apprendre/deroulement-dune-main" },
    ],
  },
  {
    label: "Strategie",
    href: "/strategie",
    emoji: "♣",
    desc: "Du debutant au GTO : ranges, cotes, bluff, equilibrage.",
    children: [
      { label: "Debutant", href: "/strategie#debutant" },
      { label: "Intermediaire", href: "/strategie#intermediaire" },
      { label: "Avance", href: "/strategie#avance" },
    ],
  },
  {
    label: "Formats",
    href: "/formats",
    emoji: "♦",
    desc: "Cash game, MTT, Sit & Go, Spin, Omaha, Short Deck...",
  },
  {
    label: "Poker en ligne",
    href: "/poker-en-ligne",
    emoji: "♥",
    desc: "Choisir une room, bonus, securite, KYC, trackers.",
  },
  {
    label: "Glossaire",
    href: "/glossaire",
    emoji: "📖",
    desc: "Le dictionnaire du poker de A a Z, defini simplement.",
  },
  {
    label: "Calculateurs",
    href: "/calculateurs",
    emoji: "🧮",
    desc: "Cotes, bankroll, ICM, rake, ROI tournoi.",
  },
  {
    label: "Videos",
    href: "/videos",
    emoji: "🎬",
    desc: "Le Netflix du poker : WSOP, WPT, EPT, Triton, mains cultes.",
  },
  {
    label: "Actualites",
    href: "/actualites",
    emoji: "📰",
    desc: "News et resultats des grands circuits.",
  },
  {
    label: "Academie Croupier",
    href: "/academie-croupier",
    emoji: "🎓",
    desc: "Formation gratuite pour devenir dealer poker, en 10 modules.",
  },
];

/** Sous-ensemble mis en avant dans le header (les autres vont dans "Plus"). */
export const PRIMARY_NAV = NAV.filter((n) =>
  ["/apprendre", "/strategie", "/formats", "/glossaire", "/academie-croupier"].includes(n.href),
);
