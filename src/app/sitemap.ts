import type { MetadataRoute } from "next";
import { SITE, NAV } from "@/lib/site";
import { LESSONS } from "@/lib/poker/learn";
import { MODULES } from "@/lib/poker/academy";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");

  const staticPaths = [
    "/",
    ...NAV.map((n) => n.href),
    "/apprendre/parcours-debutant",
    "/calculateurs/cotes",
  ];

  const lessonPaths = LESSONS.map((l) => `/apprendre/${l.slug}`);
  const modulePaths = MODULES.map((m) => `/academie-croupier/${m.slug}`);

  const all = Array.from(new Set([...staticPaths, ...lessonPaths, ...modulePaths]));

  return all.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
