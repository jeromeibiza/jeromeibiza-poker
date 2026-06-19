/** Parcours "Apprendre le poker" — index des leçons fondamentales. */

export type Lesson = {
  slug: string;
  title: string;
  desc: string;
  level: "debutant" | "intermediaire" | "avance";
  minutes: number;
  step: number;
};

export const LESSONS: Lesson[] = [
  {
    slug: "regles-du-poker",
    title: "Les règles du poker",
    desc: "Objectif du jeu, déroulement d'une main, vocabulaire essentiel et histoire du poker.",
    level: "debutant",
    minutes: 8,
    step: 1,
  },
  {
    slug: "classement-des-mains",
    title: "Le classement des mains",
    desc: "Les 10 mains de la quinte flush royale à la carte haute, avec probabilités et exemples.",
    level: "debutant",
    minutes: 7,
    step: 2,
  },
  {
    slug: "positions",
    title: "Les positions à la table",
    desc: "SB, BB, UTG, MP, HJ, CO, BTN : pourquoi la position vaut de l'argent.",
    level: "debutant",
    minutes: 6,
    step: 3,
  },
  {
    slug: "blindes",
    title: "Les blindes et les antes",
    desc: "Small blind, big blind, ante, straddle : qui mise quoi et pourquoi.",
    level: "debutant",
    minutes: 5,
    step: 4,
  },
  {
    slug: "deroulement-dune-main",
    title: "Le déroulement d'une main",
    desc: "Préflop, flop, turn, river, showdown : chaque étape illustrée pas à pas.",
    level: "debutant",
    minutes: 7,
    step: 5,
  },
];

export function getLesson(slug: string) {
  return LESSONS.find((l) => l.slug === slug);
}
