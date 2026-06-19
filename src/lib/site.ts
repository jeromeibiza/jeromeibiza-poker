/**
 * Configuration centrale du Poker Hub Jérôme Ibiza.
 * Projet SIDE — indépendant du site principal jeromeibiza.com (aucun lien
 * croisé pour l'instant). Futur sous-domaine : poker.jeromeibiza.com.
 */

export const SITE = {
  name: "Poker Hub — Jérôme Ibiza",
  shortName: "Poker Hub",
  // URL de prod à ajuster quand le domaine/sous-domaine sera branché.
  url: "https://poker.jeromeibiza.com",
  tagline: "Apprendre, jouer et devenir croupier poker — gratuitement.",
  description:
    "Le centre de ressources poker francophone : règles, classement des mains, " +
    "stratégie débutant à avancé, glossaire géant, calculateurs et la seule " +
    "académie gratuite pour devenir croupier poker, par Jérôme Ibiza, croupier pro.",
  author: "Jérôme Ibiza",
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

/** Arborescence globale du hub — sert à la nav, au footer et au sitemap. */
export const NAV: NavSection[] = [
  {
    label: "Apprendre",
    href: "/apprendre",
    emoji: "♠",
    desc: "Les bases du poker, pas à pas, pour grands débutants.",
    children: [
      { label: "Parcours débutant", href: "/apprendre/parcours-debutant" },
      { label: "Les règles du poker", href: "/apprendre/regles-du-poker" },
      { label: "Classement des mains", href: "/apprendre/classement-des-mains" },
      { label: "Les positions", href: "/apprendre/positions" },
      { label: "Les blindes", href: "/apprendre/blindes" },
      { label: "Déroulement d'une main", href: "/apprendre/deroulement-dune-main" },
    ],
  },
  {
    label: "Stratégie",
    href: "/strategie",
    emoji: "♣",
    desc: "Du débutant au GTO : ranges, cotes, bluff, équilibrage.",
    children: [
      { label: "Débutant", href: "/strategie#debutant" },
      { label: "Intermédiaire", href: "/strategie#intermediaire" },
      { label: "Avancé", href: "/strategie#avance" },
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
    desc: "Choisir une room, bonus, sécurité, KYC, trackers.",
  },
  {
    label: "Glossaire",
    href: "/glossaire",
    emoji: "📖",
    desc: "Le dictionnaire du poker de A à Z, défini simplement.",
  },
  {
    label: "Calculateurs",
    href: "/calculateurs",
    emoji: "🧮",
    desc: "Cotes, bankroll, ICM, rake, ROI tournoi.",
  },
  {
    label: "Vidéos",
    href: "/videos",
    emoji: "🎬",
    desc: "Le Netflix du poker : WSOP, WPT, EPT, Triton, mains cultes.",
  },
  {
    label: "Actualités",
    href: "/actualites",
    emoji: "📰",
    desc: "News et résultats des grands circuits.",
  },
  {
    label: "Académie Croupier",
    href: "/academie-croupier",
    emoji: "🎓",
    desc: "Formation gratuite pour devenir dealer poker, en 10 modules.",
  },
];

/** Sous-ensemble mis en avant dans le header (les autres vont dans le menu complet). */
export const PRIMARY_NAV = NAV.filter((n) =>
  ["/apprendre", "/strategie", "/formats", "/glossaire", "/academie-croupier"].includes(n.href),
);
