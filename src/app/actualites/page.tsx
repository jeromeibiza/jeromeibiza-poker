import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Actualites poker : news et resultats WSOP, WPT, EPT, Triton",
  description:
    "L'actualite du poker : news, resultats des grands circuits (WSOP, WPT, EPT, Triton) et les " +
    "plus grosses mains de l'annee. Mises a jour a venir.",
  alternates: { canonical: "/actualites" },
};

const TOPICS = [
  ["News poker", "L'essentiel de l'actu, en francais, sans bla-bla."],
  ["Resultats WSOP", "Bracelets, Main Event et performances marquantes."],
  ["Resultats WPT", "Etapes et vainqueurs du World Poker Tour."],
  ["Resultats EPT", "Le circuit europeen, etape par etape."],
  ["Resultats Triton", "Les high stakes et leurs montants vertigineux."],
  ["Grosses mains de l'annee", "Les coups qui ont marque la saison."],
];

export default function ActualitesPage() {
  const ld = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Actualites poker" };
  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Actualites" }]} />
      <PageHero
        kicker="L'actu du poker"
        title="Actualites poker"
        intro="News et resultats des grands circuits mondiaux, plus les mains qui font parler. Le fil d'actu sera alimente regulierement."
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
        <div className="label" style={{ color: "var(--gold)", fontSize: 12 }}>Bientot</div>
        <p style={{ marginTop: 8, color: "var(--muted)" }}>
          Le flux d&apos;actualites sera mis en place dans une prochaine etape. Pour apprendre des
          maintenant, file vers{" "}
          <Link href="/apprendre" className="link">Apprendre</Link> ou la{" "}
          <Link href="/academie-croupier" className="link">formation croupier</Link>.
        </p>
      </div>
    </div>
  );
}
