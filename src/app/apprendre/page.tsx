import Link from "next/link";
import type { Metadata } from "next";
import { LESSONS } from "@/lib/poker/learn";
import { Crumbs, PageHero, LevelPill, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Apprendre le poker, cursus débutant complet et gratuit",
  description:
    "Le parcours pour apprendre le poker de zéro : règles, classement des mains, " +
    "positions, blindes et déroulement d'une main. Simple, visuel et gratuit.",
  alternates: { canonical: "/apprendre" },
};

export default function ApprendrePage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Apprendre le poker",
    itemListElement: LESSONS.map((l) => ({
      "@type": "ListItem",
      position: l.step,
      name: l.title,
      url: `/apprendre/${l.slug}`,
    })),
  };

  return (
    <div className="wrap">
      <JsonLd data={itemList} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Apprendre" }]} />
      <PageHero
        kicker="Cursus débutant"
        title="Apprendre le poker, de zéro"
        intro="Cinq leçons fondamentales, dans l'ordre, pour passer de grand débutant à joueur capable de tenir une table. Pas de jargon inutile : des règles claires, des exemples et de vraies cartes."
      />

      {/* CTA parcours interactif */}
      <Link
        href="/apprendre/parcours-debutant"
        className="felt card-hover"
        style={{ display: "block", padding: "26px 24px", marginTop: 28 }}
      >
        <div className="label" style={{ color: "#fbe8c2", fontSize: 12, marginBottom: 10 }}>
          🎯 Nouveau · Tutoriel interactif
        </div>
        <div className="display" style={{ fontSize: 24, color: "#fff" }}>
          Le parcours débutant à valider
        </div>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginTop: 8, maxWidth: 560 }}>
          Apprends en cochant chaque étape, valide ta compréhension par un quiz à chaque palier,
          et décroche ton certificat débutant avec l&apos;examen final.
        </p>
        <span className="btn btn-gold" style={{ marginTop: 16 }}>Démarrer le parcours →</span>
      </Link>

      <ol style={{ listStyle: "none", padding: 0, margin: "28px 0 0", display: "grid", gap: 14 }}>
        {LESSONS.map((l) => (
          <li key={l.slug}>
            <Link
              href={`/apprendre/${l.slug}`}
              className="card card-hover"
              style={{ display: "flex", gap: 18, alignItems: "center" }}
            >
              <span
                className="display"
                style={{
                  fontSize: 28,
                  color: "var(--gold)",
                  minWidth: 44,
                  textAlign: "center",
                }}
              >
                {l.step}
              </span>
              <span style={{ flex: 1 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span className="display" style={{ fontSize: 19 }}>{l.title}</span>
                  <LevelPill level={l.level} />
                  <span className="pill">{l.minutes} min</span>
                </span>
                <span style={{ display: "block", color: "var(--muted)", fontSize: 14, marginTop: 8 }}>
                  {l.desc}
                </span>
              </span>
              <span className="label" style={{ color: "var(--gold)", fontSize: 13 }}>→</span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="card" style={{ marginTop: 32, borderColor: "rgba(232,176,75,0.3)" }}>
        <div className="label" style={{ color: "var(--gold)", fontSize: 12 }}>Prochaine étape</div>
        <p style={{ marginTop: 8, color: "var(--muted)" }}>
          Une fois ces bases acquises, direction la{" "}
          <Link href="/strategie" className="link">stratégie</Link> pour apprendre les ranges, les
          cotes et le bluff, ou la{" "}
          <Link href="/academie-croupier" className="link">formation croupier</Link> pour apprendre
          à distribuer comme un pro.
        </p>
      </div>
    </div>
  );
}
