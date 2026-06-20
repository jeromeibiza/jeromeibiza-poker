import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, JsonLd } from "@/components/ui";
import { FORMATS } from "@/lib/poker/formats";

export const metadata: Metadata = {
  title: "Les formats de poker : cash game, MTT, Sit & Go, Spin, Omaha...",
  description:
    "Tour d'horizon des formats de poker : cash game, tournois MTT, Sit & Go, Spin & Go, Heads-Up, " +
    "Short Deck, Pot Limit Omaha et mixed games. Avantages, inconvénients et une fiche dédiée par format.",
  alternates: { canonical: "/formats" },
};

export default function FormatsPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Les formats de poker",
    itemListElement: FORMATS.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: f.name,
      url: `/formats/${f.slug}`,
    })),
  };
  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Formats" }]} />
      <PageHero
        kicker="Choisir sa table"
        title="Les formats de poker"
        intro="Cash game, tournois, Spin, Omaha... chaque format a son rythme, sa variance et sa stratégie. Voici le panorama pour trouver celui qui te correspond, avec une fiche complète par format."
      />

      <Section kicker="Comparatif" title="Tous les formats en un coup d'œil">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl" style={{ minWidth: 720 }}>
            <thead>
              <tr>
                <th>Format</th>
                <th>En bref</th>
                <th>Variance</th>
                <th>Fiche</th>
              </tr>
            </thead>
            <tbody>
              {FORMATS.map((f) => (
                <tr key={f.slug}>
                  <td style={{ color: "var(--gold)", fontWeight: 700, whiteSpace: "nowrap" }}>{f.name}</td>
                  <td style={{ color: "var(--muted)" }}>{f.tagline}</td>
                  <td style={{ color: "#9cc4f5", whiteSpace: "nowrap" }}>{f.variance}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Link href={`/formats/${f.slug}`} className="link">Lire →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section kicker="Aller plus loin" title="Une fiche dédiée par format">
        <div className="grid-cards">
          {FORMATS.map((f) => (
            <Link key={f.slug} href={`/formats/${f.slug}`} className="card card-hover">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{f.emoji}</span>
                <span className="display" style={{ fontSize: 16 }}>{f.name}</span>
              </div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{f.tagline}</p>
              <div className="label" style={{ color: "var(--gold)", fontSize: 11, marginTop: 12 }}>
                Lire la fiche →
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <div className="card" style={{ marginTop: 32, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Nouveau au poker ? Comprends d&apos;abord{" "}
          <Link href="/apprendre/regles-du-poker" className="link">les règles</Link> avant de choisir un format.
        </p>
      </div>
    </div>
  );
}
