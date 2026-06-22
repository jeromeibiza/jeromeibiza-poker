import Link from "next/link";
import type { ReactNode } from "react";
import { GLOSSARY } from "@/lib/poker/glossary";

/**
 * Maillage interne automatique : transforme la première occurrence d'un terme du
 * glossaire (dans un texte de cours, de format ou d'article) en lien vers
 * /glossaire?q=<terme>. Crawlable pour le SEO, pratique pour le lecteur.
 *
 * Garde-fous : un terme n'est lié qu'UNE fois par page (Set `linked` partagé),
 * le nombre de liens est borné par `cap`, on capture le terme le plus long en
 * premier (« continuation bet » avant « bet »), et un stoplist écarte les mots
 * trop ambigus hors contexte poker.
 */

// Mots écartés : sens courant hors-poker trop fréquent (évite les faux liens).
const STOP = new Set(["action", "value", "set", "mise", "jeu", "main", "carte"]);

const LINKABLE = GLOSSARY.map((t) => t.term)
  .filter((term) => term.length >= 3 && !STOP.has(term.toLowerCase()))
  .sort((a, b) => b.length - a.length);

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Une seule regex, insensible à la casse, bornée par des limites de mots.
const RE = new RegExp(`\\b(${LINKABLE.map(escapeRe).join("|")})\\b`, "gi");

// terme normalisé (minuscules) -> terme canonique, pour l'URL ?q=.
const CANON = new Map(LINKABLE.map((t) => [t.toLowerCase(), t] as const));

export function autolink(text: string, linked: Set<string>, cap = 5): ReactNode {
  if (!text) return text;
  const out: ReactNode[] = [];
  let last = 0;
  let made = 0;
  let m: RegExpExecArray | null;
  RE.lastIndex = 0;
  while ((m = RE.exec(text)) !== null) {
    if (made >= cap) break;
    const raw = m[0];
    const key = raw.toLowerCase();
    if (linked.has(key)) continue; // déjà lié ailleurs sur la page
    const canon = CANON.get(key);
    if (!canon) continue;
    linked.add(key);
    made++;
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link
        key={`${key}-${m.index}`}
        href={`/glossaire?q=${encodeURIComponent(canon)}`}
        className="link"
        title={`Définition : ${canon}`}
      >
        {raw}
      </Link>,
    );
    last = m.index + raw.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length > 1 ? <>{out}</> : text;
}
