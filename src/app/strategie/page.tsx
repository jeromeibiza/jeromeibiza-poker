import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, JsonLd, SeeAlso } from "@/components/ui";
import { LESSONS, lessonsByLevel, LEVEL_LABEL, LEVEL_ORDER } from "@/lib/poker/strategy";

export const metadata: Metadata = {
  title: "Stratégie poker : du débutant au GTO, la bibliothèque de cours",
  description:
    "Toute la stratégie poker organisée par niveau : débutant (mains de départ, bankroll, position), " +
    "intermédiaire (ranges, c-bet, 3-bet, cotes, semi-bluff), avancé (GTO, exploitant, blockers, MDF, équilibrage).",
  alternates: { canonical: "/strategie" },
};

const LEVEL_INTRO: Record<string, { pill: string; intro: string }> = {
  debutant: {
    pill: "pill-beginner",
    intro: "Construire des fondations solides et arrêter de perdre des jetons bêtement.",
  },
  intermediaire: {
    pill: "pill-inter",
    intro: "Penser en ranges et en cotes, pas en mains isolées.",
  },
  avance: {
    pill: "pill-advanced",
    intro: "Équilibrer son jeu et exploiter les faiblesses adverses.",
  },
};

export default function StrategiePage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cours de stratégie poker",
    itemListElement: LESSONS.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: l.title,
      url: `/strategie/${l.slug}`,
    })),
  };

  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Stratégie" }]} />
      <PageHero
        kicker="Bibliothèque de cours"
        title="La stratégie poker, par niveau"
        intro="Du premier pas au GTO. Choisis ton niveau et progresse à ton rythme. Chaque thème est un cours complet, écrit pour passer vraiment au niveau supérieur."
      />

      {LEVEL_ORDER.map((level) => {
        const lessons = lessonsByLevel(level);
        const meta = LEVEL_INTRO[level];
        return (
          <Section key={level} id={level} kicker="Niveau" title={LEVEL_LABEL[level]}>
            <span className={`pill ${meta.pill}`}>{LEVEL_LABEL[level]}</span>
            <p style={{ color: "var(--muted)", marginTop: 12, marginBottom: 16, maxWidth: 620 }}>
              {meta.intro}
            </p>
            <div className="grid-cards">
              {lessons.map((l) => (
                <Link key={l.slug} href={`/strategie/${l.slug}`} className="card card-hover">
                  <div className="display" style={{ fontSize: 16 }}>{l.short}</div>
                  <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{l.summary.split(". ")[0]}.</p>
                  <div className="label" style={{ color: "var(--gold)", fontSize: 11, marginTop: 12 }}>
                    Lire le cours →
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        );
      })}

      <div className="card" style={{ marginTop: 32, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Tu débutes vraiment ? Commence par le{" "}
          <Link href="/apprendre" className="link">cursus Apprendre</Link>, puis reviens ici. En
          attendant, teste tes décisions avec le{" "}
          <Link href="/calculateurs/cotes" className="link">calculateur de cotes</Link>.
        </p>
      </div>

      <SeeAlso
        links={[
          { label: "Les formats de poker", href: "/formats", desc: "Où appliquer cette stratégie : cash game, MTT, Spin, Omaha." },
          { label: "Le glossaire poker", href: "/glossaire", desc: "Tous les termes croisés dans les cours, définis simplement." },
          { label: "Les calculateurs", href: "/calculateurs", desc: "Cotes, bankroll, ICM, ROI tournoi." },
        ]}
      />
    </div>
  );
}
