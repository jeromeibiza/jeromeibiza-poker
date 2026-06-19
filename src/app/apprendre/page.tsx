import Link from "next/link";
import type { Metadata } from "next";
import { LESSONS } from "@/lib/poker/learn";
import { Crumbs, PageHero, LevelPill, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Apprendre le poker — cursus debutant complet et gratuit",
  description:
    "Le parcours pour apprendre le poker de zero : regles, classement des mains, " +
    "positions, blindes et deroulement d'une main. Simple, visuel et gratuit.",
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
        kicker="Cursus debutant"
        title="Apprendre le poker, de zero"
        intro="Cinq lecons fondamentales, dans l'ordre, pour passer de grand debutant a joueur capable de tenir une table. Pas de jargon inutile : des regles claires, des exemples et de vraies cartes."
      />

      <ol style={{ listStyle: "none", padding: 0, margin: "32px 0 0", display: "grid", gap: 14 }}>
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
        <div className="label" style={{ color: "var(--gold)", fontSize: 12 }}>Prochaine etape</div>
        <p style={{ marginTop: 8, color: "var(--muted)" }}>
          Une fois ces bases acquises, direction la{" "}
          <Link href="/strategie" className="link">strategie</Link> pour apprendre les ranges,
          les cotes et le bluff — ou la{" "}
          <Link href="/academie-croupier" className="link">formation croupier</Link> pour
          apprendre a distribuer comme un pro.
        </p>
      </div>
    </div>
  );
}
