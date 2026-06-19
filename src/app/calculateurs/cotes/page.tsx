import Link from "next/link";
import type { Metadata } from "next";
import { OddsCalculator } from "@/components/OddsCalculator";
import { Crumbs, PageHero, Section, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Calculateur de cotes au poker (pot odds & outs) — gratuit",
  description:
    "Calcule en direct si suivre une mise est rentable : cote du pot, équité réelle selon tes outs, " +
    "et verdict immédiat. Avec la règle des 2 et 4 expliquée. Outil gratuit.",
  alternates: { canonical: "/calculateurs/cotes" },
};

const OUTS = [
  ["Tirage couleur (flush)", "9"],
  ["Tirage quinte ouverte", "8"],
  ["Tirage quinte par le ventre (gutshot)", "4"],
  ["Deux overcards", "6"],
  ["Tirage couleur + quinte ouverte", "15"],
  ["Une paire vers brelan (set)", "2"],
];

export default function CotesPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment calculer ses cotes au poker ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Compare la cote du pot (mise à suivre divisée par le pot total après ton call) à ton équité (tes chances d'améliorer ta main). Si ton équité est supérieure, suivre est rentable.",
        },
      },
      {
        "@type": "Question",
        name: "Qu'est-ce que la règle des 2 et 4 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiplie tes outs par 4 au flop (deux cartes à venir) ou par 2 au turn (une carte à venir) pour estimer rapidement ton pourcentage de chances de toucher.",
        },
      },
    ],
  };

  return (
    <div className="wrap">
      <JsonLd data={faqLd} />
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Calculateurs", href: "/calculateurs" },
          { label: "Cotes (pot odds)" },
        ]}
      />
      <PageHero
        kicker="Calculateur"
        title="Calculateur de cotes (pot odds)"
        intro="Tu as un tirage et un adversaire qui mise. Faut-il suivre ? Renseigne le pot, la mise à suivre et tes outs : l'outil calcule la cote du pot, ton équité réelle et te donne le verdict."
      />

      <div style={{ marginTop: 28 }}>
        <OddsCalculator />
      </div>

      <Section kicker="Aide-mémoire" title="Combien d'outs pour quel tirage ?">
        <table className="tbl">
          <thead>
            <tr>
              <th>Situation</th>
              <th>Outs</th>
            </tr>
          </thead>
          <tbody>
            {OUTS.map(([s, o]) => (
              <tr key={s}>
                <td>{s}</td>
                <td style={{ color: "var(--gold)", fontWeight: 700 }}>{o}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ color: "var(--muted)", marginTop: 14 }}>
          Pas sûr de ce qu&apos;est un « out » ou une « équité » ? Direction le{" "}
          <Link href="/glossaire" className="link">glossaire</Link>.
        </p>
      </Section>

      <div className="card" style={{ marginTop: 28, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Autres outils à venir :{" "}
          <Link href="/calculateurs" className="link">calculateur de bankroll, ICM, rake et ROI tournoi →</Link>
        </p>
      </div>
    </div>
  );
}
