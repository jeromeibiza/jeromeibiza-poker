import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Actualités poker : news et résultats WSOP, WPT, EPT, Triton",
  description:
    "L'actualité du poker : news, résultats des grands circuits (WSOP, WPT, EPT, Triton) et les " +
    "plus grosses mains de l'année. Mises à jour à venir.",
  alternates: { canonical: "/actualites" },
};

const TOPICS = [
  ["News poker", "L'essentiel de l'actu, en français, sans bla-bla."],
  ["Résultats WSOP", "Bracelets, Main Event et performances marquantes."],
  ["Résultats WPT", "Étapes et vainqueurs du World Poker Tour."],
  ["Résultats EPT", "Le circuit européen, étape par étape."],
  ["Résultats Triton", "Les high stakes et leurs montants vertigineux."],
  ["Grosses mains de l'année", "Les coups qui ont marqué la saison."],
];

export default function ActualitesPage() {
  const ld = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Actualités poker" };
  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]} />
      <PageHero
        kicker="L'actu du poker"
        title="Actualités poker"
        intro="News et résultats des grands circuits mondiaux, plus les mains qui font parler. Le fil d'actu sera alimenté régulièrement."
      />

      <Section kicker="Les rubriques" title="Ce que tu trouveras ici">
        <div className="grid-cards">
          {TOPICS.map(([t, d]) => (
            <div key={t} className="card card-hover">
              <div className="display" style={{ fontSize: 16 }}>{t}</div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="card" style={{ marginTop: 32, borderColor: "rgba(232,176,75,0.3)" }}>
        <div className="label" style={{ color: "var(--gold)", fontSize: 12 }}>Bientôt</div>
        <p style={{ marginTop: 8, color: "var(--muted)" }}>
          Le flux d&apos;actualités sera mis en place dans une prochaine étape. Pour apprendre dès
          maintenant, file vers{" "}
          <Link href="/apprendre" className="link">Apprendre</Link> ou la{" "}
          <Link href="/academie-croupier" className="link">formation croupier</Link>.
        </p>
      </div>
    </div>
  );
}
