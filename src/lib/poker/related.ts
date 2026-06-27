/**
 * Maillage interne contextuel (« voir aussi »).
 *
 * Remplace les liens « voir aussi » qui étaient codés en dur et identiques sur
 * toutes les pages. Ici tout est DÉRIVÉ des données : quand on ajoute une leçon,
 * un format ou un article, ses liens connexes (et ceux qui pointent vers lui) se
 * recalculent seuls, sans rien éditer à la main.
 *
 * Trois niveaux, dans l'ordre de priorité :
 *   1. `related` posé à la main sur l'entrée (override éditorial, facultatif).
 *   2. liens transversaux curés ci-dessous (cross-silo pertinent : une leçon de
 *      tournoi -> le format MTT, une leçon de cotes -> les calculateurs...).
 *   3. repli automatique : des pages voisines du même silo + le glossaire, ce qui
 *      garantit que CHAQUE page reçoit des liens, même un contenu tout neuf.
 */

import { LESSONS } from "./strategy";
import { FORMATS } from "./formats";
import { ARTICLES } from "./online";

export type RelatedLink = { label: string; href: string; desc?: string };

/** Première phrase d'un résumé, pour une accroche de carte propre (sans « … »). */
function firstSentence(s: string): string {
  const m = s.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : s).trim();
}

// --- Constructeurs de liens : le libellé est toujours lu dans la donnée source,
//     donc il reste juste même si un titre change. Renvoient null si slug absent.

function lessonLink(slug: string): RelatedLink | null {
  const l = LESSONS.find((x) => x.slug === slug);
  return l ? { label: l.title, href: `/strategie/${l.slug}`, desc: firstSentence(l.summary) } : null;
}
function formatLink(slug: string): RelatedLink | null {
  const f = FORMATS.find((x) => x.slug === slug);
  return f ? { label: `Le format ${f.name}`, href: `/formats/${f.slug}`, desc: f.tagline } : null;
}
function articleLink(slug: string): RelatedLink | null {
  const a = ARTICLES.find((x) => x.slug === slug);
  return a ? { label: a.title, href: `/poker-en-ligne/${a.slug}`, desc: firstSentence(a.summary) } : null;
}

// Cibles transversales stables (routes fixes).
const GLOSSAIRE: RelatedLink = {
  label: "Le glossaire poker",
  href: "/glossaire",
  desc: "Tous les mots du poker, définis simplement.",
};
const CALCULATEURS: RelatedLink = {
  label: "Les calculateurs",
  href: "/calculateurs",
  desc: "Cotes, bankroll, ICM, ROI tournoi.",
};
const APPRENDRE: RelatedLink = {
  label: "Apprendre les bases",
  href: "/apprendre",
  desc: "Règles, mains, positions : le socle, pas à pas.",
};

function compact(arr: (RelatedLink | null)[]): RelatedLink[] {
  return arr.filter((x): x is RelatedLink => x !== null);
}

/** Garde la première occurrence de chaque href et borne à `max` liens. */
function dedup(links: RelatedLink[], max = 3): RelatedLink[] {
  const seen = new Set<string>();
  const out: RelatedLink[] = [];
  for (const l of links) {
    if (seen.has(l.href)) continue;
    seen.add(l.href);
    out.push(l);
    if (out.length >= max) break;
  }
  return out;
}

// --------------------------------------------------------------------------
// STRATÉGIE
// --------------------------------------------------------------------------

// Cross-silo curé : la leçon -> le format / l'outil / l'article où elle s'applique.
const LESSON_CROSS: Record<string, RelatedLink[]> = {
  "push-or-fold-10bb": compact([formatLink("tournoi-mtt"), formatLink("sit-and-go")]),
  "gestion-de-bankroll": [CALCULATEURS],
  "cotes-et-pot-odds": [CALCULATEURS],
  "calculer-les-cotes": [CALCULATEURS],
  "compter-ses-outs": [CALCULATEURS],
  "penser-en-ranges": compact([formatLink("cash-game")]),
  "mains-de-depart": [APPRENDRE],
};

/** Leçons du même niveau (puis des autres), en évitant les voisins déjà liés
 *  par la navigation prev/next en bas de page. */
function siblingLessons(slug: string): RelatedLink[] {
  const i = LESSONS.findIndex((l) => l.slug === slug);
  if (i < 0) return [];
  const cur = LESSONS[i];
  const adjacent = new Set([LESSONS[i - 1]?.slug, LESSONS[i + 1]?.slug, slug]);
  const sameLevel = LESSONS.filter((l) => l.level === cur.level && !adjacent.has(l.slug));
  const otherLevel = LESSONS.filter((l) => l.level !== cur.level && !adjacent.has(l.slug));
  return compact([...sameLevel, ...otherLevel].map((l) => lessonLink(l.slug)));
}

export function seeAlsoForLesson(slug: string): RelatedLink[] {
  const cross = LESSON_CROSS[slug] ?? [];
  const sib = siblingLessons(slug);
  return dedup([...cross, ...sib.slice(0, 2), GLOSSAIRE, ...sib]);
}

// --------------------------------------------------------------------------
// FORMATS
// --------------------------------------------------------------------------

const FORMAT_CROSS: Record<string, RelatedLink[]> = {
  "tournoi-mtt": compact([lessonLink("push-or-fold-10bb")]),
  "sit-and-go": compact([lessonLink("push-or-fold-10bb")]),
  "spin-and-go": compact([lessonLink("push-or-fold-10bb")]),
  "cash-game": compact([lessonLink("penser-en-ranges")]),
  "heads-up": compact([lessonLink("le-3-bet")]),
  "pot-limit-omaha": compact([lessonLink("compter-ses-outs")]),
  "short-deck": compact([lessonLink("cotes-et-pot-odds")]),
};

function siblingFormats(slug: string): RelatedLink[] {
  const i = FORMATS.findIndex((f) => f.slug === slug);
  if (i < 0) return [];
  const adjacent = new Set([FORMATS[i - 1]?.slug, FORMATS[i + 1]?.slug, slug]);
  return compact(FORMATS.filter((f) => !adjacent.has(f.slug)).map((f) => formatLink(f.slug)));
}

export function seeAlsoForFormat(slug: string): RelatedLink[] {
  const cross = FORMAT_CROSS[slug] ?? [];
  const sib = siblingFormats(slug);
  return dedup([...cross, ...sib.slice(0, 2), GLOSSAIRE, ...sib]);
}

// --------------------------------------------------------------------------
// POKER EN LIGNE
// --------------------------------------------------------------------------

const ARTICLE_CROSS: Record<string, RelatedLink[]> = {
  "le-rakeback": [CALCULATEURS],
  "les-bonus": [CALCULATEURS],
  "les-trackers": compact([lessonLink("penser-en-ranges")]),
  "choisir-une-room": compact([formatLink("cash-game")]),
};

function siblingArticles(slug: string): RelatedLink[] {
  const i = ARTICLES.findIndex((a) => a.slug === slug);
  if (i < 0) return [];
  const adjacent = new Set([ARTICLES[i - 1]?.slug, ARTICLES[i + 1]?.slug, slug]);
  return compact(ARTICLES.filter((a) => !adjacent.has(a.slug)).map((a) => articleLink(a.slug)));
}

export function seeAlsoForArticle(slug: string): RelatedLink[] {
  const cross = ARTICLE_CROSS[slug] ?? [];
  const sib = siblingArticles(slug);
  return dedup([...cross, ...sib.slice(0, 2), GLOSSAIRE, ...sib]);
}
