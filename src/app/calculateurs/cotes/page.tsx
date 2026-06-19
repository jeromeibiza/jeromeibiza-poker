import Link from "next/link";
import type { Metadata } from "next";
import { OddsCalculator } from "@/components/OddsCalculator";
import { Crumbs, PageHero, Section, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Calculateur de cotes au poker (pot odds & outs) — gratuit",
  description:
    "Calcule en direct si suivre une mise est rentable : cote du pot, equite reelle selon tes outs, " +
    "et verdict immediat. Avec la regle des 2 et 4 expliquee. Outil gratuit.",
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
          text: "Compare la cote du pot (mise a suivre divisee par le pot total apres ton call) a ton equite (tes chances d'ameliorer ta main). Si ton equite est superieure, suivre est rentable.",
        },
      },
      {
        "@type": "Question",
        name: "Qu'est-ce que la regle des 2 et 4 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiplie tes outs par 4 au flop (deux cartes a venir) ou par 2 au turn (une carte a venir) pour estimer rapidement ton pourcentage de chances de toucher.",
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
        intro="Tu as un tirage et un adversaire qui mise. Faut-il suivre ? Renseigne le pot, la mise a suivre et tes outs : l'outil calcule la cote du pot, ton equite reelle et te donne le verdict."
      />

      <div style={{ marginTop: 28 }}>
        <OddsCalculator />
      </div>

      <Section kicker="Aide-memoire" title="Combien d'outs pour quel tirage ?">
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
          Pas sur de ce qu&apos;est un &quot;out&quot; ou une &quot;equite&quot; ? Direction le{" "}
          <Link href="/glossaire" className="link">glossaire</Link>.
        </p>
      </Section>

      <div className="card" style={{ marginTop: 28, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Autres outils a venir :{" "}
          <Link href="/calculateurs" className="link">calculateur de bankroll, ICM, rake et ROI tournoi →</Link>
        </p>
      </div>
    </div>
  );
}
