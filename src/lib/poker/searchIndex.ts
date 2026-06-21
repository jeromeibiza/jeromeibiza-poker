/**
 * Index de recherche du site : toutes les pages de contenu, agrégées depuis
 * les données existantes. Utilisé par la barre de recherche globale.
 */
import { LESSONS as APPRENDRE } from "@/lib/poker/learn";
import { LESSONS as STRATEGY } from "@/lib/poker/strategy";
import { FORMATS } from "@/lib/poker/formats";
import { ARTICLES } from "@/lib/poker/online";
import { MODULES } from "@/lib/poker/academy";

export type SearchItem = { title: string; href: string; cat: string };

export const SEARCH_INDEX: SearchItem[] = [
  { title: "Parcours débutant interactif", href: "/apprendre/parcours-debutant", cat: "Apprendre" },
  ...APPRENDRE.map((l) => ({ title: l.title, href: `/apprendre/${l.slug}`, cat: "Apprendre" })),
  ...STRATEGY.map((l) => ({ title: l.title, href: `/strategie/${l.slug}`, cat: "Stratégie" })),
  ...FORMATS.map((f) => ({ title: f.name, href: `/formats/${f.slug}`, cat: "Format" })),
  ...ARTICLES.map((a) => ({ title: a.title, href: `/poker-en-ligne/${a.slug}`, cat: "Poker en ligne" })),
  ...MODULES.map((m) => ({ title: `Module ${m.n} : ${m.title}`, href: `/academie-croupier/${m.slug}`, cat: "Académie croupier" })),
  { title: "Glossaire poker (300 termes)", href: "/glossaire", cat: "Outils" },
  { title: "Calculateurs poker", href: "/calculateurs", cat: "Outils" },
  { title: "Calculateur de cotes (pot odds)", href: "/calculateurs/cotes", cat: "Outils" },
  { title: "Académie Croupier", href: "/academie-croupier", cat: "Croupier" },
  { title: "À propos de Jérôme Ibiza", href: "/a-propos", cat: "Page" },
  { title: "Vidéos de poker", href: "/videos", cat: "Page" },
  { title: "Actualités poker", href: "/actualites", cat: "Page" },
];

/** Recherches proposées d'office (chips cliquables). */
export const PRESET_QUERIES = [
  "règles du poker",
  "classement des mains",
  "les positions",
  "push or fold",
  "pot odds",
  "bluff",
  "bankroll",
  "croupier",
];
