import type { MetadataRoute } from "next";
import { SITE, NAV } from "@/lib/site";
import { LESSONS as APPRENDRE } from "@/lib/poker/learn";
import { LESSONS as STRATEGIES } from "@/lib/poker/strategy";
import { FORMATS } from "@/lib/poker/formats";
import { ARTICLES } from "@/lib/poker/online";
import { MODULES } from "@/lib/poker/academy";
import { CROUPIER_GUIDES } from "@/lib/poker/croupierGuides";
import { GLOSSARY, termSlug } from "@/lib/poker/glossary";

// Sections encore vides : on les sort du sitemap (et elles sont en noindex sur
// la page) tant qu'elles ne sont pas remplies, à réintégrer une par une.
const EXCLUDED = new Set(["/videos", "/actualites"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");

  const staticPaths = [
    "/",
    ...NAV.map((n) => n.href).filter((h) => !EXCLUDED.has(h)),
    "/apprendre/parcours-debutant",
    "/calculateurs/cotes",
    "/devenir-croupier-de-poker",
    "/a-propos",
  ];

  // Toutes les pages de contenu dynamiques (avant, seules /apprendre et
  // /academie-croupier étaient listées : stratégie, formats et poker en ligne
  // manquaient au sitemap).
  const lessonPaths = APPRENDRE.map((l) => `/apprendre/${l.slug}`);
  const strategyPaths = STRATEGIES.map((l) => `/strategie/${l.slug}`);
  const formatPaths = FORMATS.map((f) => `/formats/${f.slug}`);
  const onlinePaths = ARTICLES.map((a) => `/poker-en-ligne/${a.slug}`);
  const modulePaths = MODULES.map((m) => `/academie-croupier/${m.slug}`);
  const croupierPaths = CROUPIER_GUIDES.map((g) => `/croupier/${g.slug}`);
  // Une fiche crawlable par terme du glossaire (longue traîne « définition de X »).
  const glossaryPaths = GLOSSARY.map((t) => `/glossaire/${termSlug(t.term)}`);

  const all = Array.from(
    new Set([
      ...staticPaths,
      ...lessonPaths,
      ...strategyPaths,
      ...formatPaths,
      ...onlinePaths,
      ...modulePaths,
      ...croupierPaths,
      ...glossaryPaths,
    ]),
  );

  return all.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
