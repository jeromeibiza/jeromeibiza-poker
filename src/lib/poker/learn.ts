/** Parcours "Apprendre le poker" — index des lecons fondamentales. */

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
    title: "Les regles du poker",
    desc: "Objectif du jeu, deroulement d'une main, vocabulaire essentiel et histoire du poker.",
    level: "debutant",
    minutes: 8,
    step: 1,
  },
  {
    slug: "classement-des-mains",
    title: "Le classement des mains",
    desc: "Les 10 mains de la quinte flush royale a la carte haute, avec probabilites et exemples.",
    level: "debutant",
    minutes: 7,
    step: 2,
  },
  {
    slug: "positions",
    title: "Les positions a la table",
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
    title: "Le deroulement d'une main",
    desc: "Preflop, flop, turn, river, showdown : chaque etape illustree pas a pas.",
    level: "debutant",
    minutes: 7,
    step: 5,
  },
];

export function getLesson(slug: string) {
  return LESSONS.find((l) => l.slug === slug);
}
