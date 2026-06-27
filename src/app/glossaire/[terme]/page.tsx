import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumbs, JsonLd, SeeAlso, DealerNote } from "@/components/ui";
import { GLOSSARY, termSlug, getTermBySlug, type Term } from "@/lib/poker/glossary";
import { SITE } from "@/lib/site";

type Params = { terme: string };

// Quelques termes ouvrent directement sur un cours dédié : lien transversal de
// forte valeur (la définition courte -> le cours complet). Termes absents = pas
// de lien, le repli « termes liés + glossaire » prend le relais.
const TERM_TO_LESSON: Record<string, { label: string; href: string; desc: string }> = {
  gto: { label: "Le GTO expliqué", href: "/strategie/gto-explique", desc: "Le cours complet sur le jeu d'équilibre." },
  mdf: { label: "La MDF en pratique", href: "/strategie/la-mdf", desc: "Calculer sa fréquence de défense, avec l'outil." },
  blocker: { label: "Les blockers", href: "/strategie/les-blockers", desc: "Comment vos cartes réduisent le jeu adverse." },
  "continuation-bet": { label: "Le c-bet", href: "/strategie/le-c-bet", desc: "Le cours complet sur la mise de continuation." },
  "implied-odds": { label: "Cotes et pot odds", href: "/strategie/cotes-et-pot-odds", desc: "Cotes directes et implicites, pas à pas." },
  icm: { label: "Push or fold (10 BB)", href: "/strategie/push-or-fold-10bb", desc: "L'ICM en tournoi, appliqué au short stack." },
  range: { label: "Penser en ranges", href: "/strategie/penser-en-ranges", desc: "Raisonner en éventails de mains, pas en mains isolées." },
};

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Termes du glossaire cités dans la définition courante, plus, si besoin, des
 *  voisins alphabétiques. Tisse un maillage dense entre les fiches. */
function relatedTerms(current: Term): Term[] {
  const others = GLOSSARY.filter((t) => t.term !== current.term);
  const def = current.def.toLowerCase();
  const cited = others.filter((t) => {
    const re = new RegExp(`\\b${escapeRe(t.term.toLowerCase())}\\b`);
    return re.test(def);
  });

  const out: Term[] = [...cited];
  if (out.length < 4) {
    const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, "fr"));
    const i = sorted.findIndex((t) => t.term === current.term);
    for (let d = 1; d < sorted.length && out.length < 4; d++) {
      for (const j of [i - d, i + d]) {
        const n = sorted[j];
        if (n && n.term !== current.term && !out.some((o) => o.term === n.term)) out.push(n);
      }
    }
  }
  return out.slice(0, 6);
}

export function generateStaticParams(): Params[] {
  return GLOSSARY.map((t) => ({ terme: termSlug(t.term) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { terme } = await params;
  const t = getTermBySlug(terme);
  if (!t) return { title: "Terme introuvable" };
  const def = t.def.length > 150 ? `${t.def.slice(0, 147).trimEnd()}.` : t.def;
  return {
    title: `${t.term} : définition poker simple`,
    description: def,
    alternates: { canonical: `/glossaire/${termSlug(t.term)}` },
  };
}

export default async function TermePage({ params }: { params: Promise<Params> }) {
  const { terme } = await params;
  const t = getTermBySlug(terme);
  if (!t) notFound();

  const related = relatedTerms(t);
  const lessonLink = TERM_TO_LESSON[termSlug(t.term)];

  const ld = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: t.term,
    description: t.def,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Glossaire poker, Jérôme Ibiza",
      url: `${SITE.url.replace(/\/$/, "")}/glossaire`,
    },
  };

  const seeAlsoLinks = [
    ...(lessonLink ? [lessonLink] : []),
    ...related.map((r) => ({
      label: r.term,
      href: `/glossaire/${termSlug(r.term)}`,
      desc: r.def.length > 90 ? `${r.def.slice(0, 87).trimEnd()}.` : r.def,
    })),
  ].slice(0, 6);

  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Glossaire", href: "/glossaire" },
          { label: t.term },
        ]}
      />

      <div style={{ paddingBlock: "20px 0" }}>
        <div className="label" style={{ color: "var(--gold)", fontSize: 12 }}>Définition poker</div>
        <h1 style={{ fontSize: "clamp(28px, 5.5vw, 46px)", margin: "8px 0 0", maxWidth: 820 }}>{t.term}</h1>
        <p style={{ color: "var(--fg)", fontSize: 19, marginTop: 16, maxWidth: 720, lineHeight: 1.6 }}>
          {t.def}
        </p>
        {t.example && (
          <div className="card" style={{ marginTop: 18, maxWidth: 720 }}>
            <span className="label" style={{ color: "var(--gold-soft)", fontSize: 12 }}>Exemple</span>
            <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 15, fontStyle: "italic" }}>
              {t.example}
            </p>
          </div>
        )}
      </div>

      <div style={{ marginTop: 26 }}>
        <Link href="/glossaire" className="btn btn-ghost">← Tout le glossaire</Link>
      </div>

      <SeeAlso
        kicker="Termes liés"
        title="À voir aussi dans le glossaire"
        links={seeAlsoLinks}
      />

      <div style={{ marginTop: 24 }}>
        <DealerNote>
          Un mot te bloque en pleine partie ? Le glossaire complet répond à n&apos;importe quel doute,
          du B-A-BA aux concepts avancés. 18+, joue responsable.
        </DealerNote>
      </div>
    </div>
  );
}
