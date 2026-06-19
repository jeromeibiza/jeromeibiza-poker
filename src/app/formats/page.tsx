import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Les formats de poker : cash game, MTT, Sit & Go, Spin, Omaha...",
  description:
    "Tour d'horizon des formats de poker : cash game, tournois MTT, Sit & Go, Spin & Go, Heads-Up, " +
    "Short Deck, Pot Limit Omaha et mixed games. Avantages, inconvenients et tableau comparatif.",
  alternates: { canonical: "/formats" },
};

const FORMATS = [
  ["Cash Game", "Jetons = argent reel, on entre et sort quand on veut.", "Souplesse, profondeur de jeu", "Variance, demande de la rigueur"],
  ["Tournoi MTT", "Plusieurs tables, structure montante, gros prix.", "Petit buy-in, gros gain possible", "Long, forte variance, ICM"],
  ["Sit & Go", "Tournoi sur une table qui demarre une fois pleine.", "Rapide, format ferme", "Plafond de gains limite"],
  ["Spin & Go", "Sit & Go 3 joueurs a dotation aleatoire (jackpot).", "Tres rapide, fun, gros multiplicateurs", "Enorme variance, jeu push/fold"],
  ["Heads-Up", "Duel a deux joueurs, 100% du temps en action.", "Le plus instructif, agressif", "Exigeant mentalement"],
  ["Short Deck", "Hold'em sans les cartes 2 a 5 (jeu de 36 cartes).", "Action garantie, mains qui s'entrechoquent", "Classement des mains modifie"],
  ["Pot Limit Omaha", "4 cartes en main, mises plafonnees au pot.", "Gros pots, tirages monstrueux", "Tres haute variance"],
  ["Mixed Games", "Rotation de variantes (HORSE, 8-game...).", "Polyvalence, moins de regs", "Demande de tout maitriser"],
];

export default function FormatsPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Les formats de poker",
  };
  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Formats" }]} />
      <PageHero
        kicker="Choisir sa table"
        title="Les formats de poker"
        intro="Cash game, tournois, Spin, Omaha... chaque format a son rythme, sa variance et sa strategie. Voici le panorama pour trouver celui qui te correspond."
      />

      <Section kicker="Comparatif" title="Tous les formats en un coup d'oeil">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl" style={{ minWidth: 720 }}>
            <thead>
              <tr>
                <th>Format</th>
                <th>En bref</th>
                <th>Avantages</th>
                <th>Inconvenients</th>
              </tr>
            </thead>
            <tbody>
              {FORMATS.map(([name, brief, pro, con]) => (
                <tr key={name}>
                  <td style={{ color: "var(--gold)", fontWeight: 700, whiteSpace: "nowrap" }}>{name}</td>
                  <td style={{ color: "var(--muted)" }}>{brief}</td>
                  <td style={{ color: "#8fe3b6" }}>{pro}</td>
                  <td style={{ color: "#f3a0a0" }}>{con}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section kicker="Aller plus loin" title="Une page dediee par format">
        <div className="grid-cards">
          {FORMATS.map(([name, brief]) => (
            <div key={name} className="card">
              <div className="display" style={{ fontSize: 16 }}>{name}</div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{brief}</p>
              <div className="label" style={{ color: "var(--faint)", fontSize: 11, marginTop: 12 }}>
                Guide complet a venir
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="card" style={{ marginTop: 32, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Nouveau au poker ? Comprends d&apos;abord{" "}
          <Link href="/apprendre/regles-du-poker" className="link">les regles</Link> avant de choisir un format.
        </p>
      </div>
    </div>
  );
}
