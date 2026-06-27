import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, JsonLd, SeeAlso } from "@/components/ui";

export const metadata: Metadata = {
  title: "Calculateurs poker : cotes, bankroll, ICM, rake et ROI",
  description:
    "Les outils du joueur de poker : calculateur de cotes (pot odds), de bankroll, d'ICM, de rake " +
    "et de ROI de tournoi. Gratuits et expliqués.",
  alternates: { canonical: "/calculateurs" },
};

const CALCS = [
  { href: "/calculateurs/cotes", title: "Calculateur de cotes", desc: "Pot odds, outs et équité : faut-il suivre ?", ready: true },
  { href: "/calculateurs", title: "Calculateur de bankroll", desc: "Combien de caves avoir selon ton format et ton risque.", ready: false },
  { href: "/calculateurs", title: "Calculateur d'ICM", desc: "Convertir des tapis de tournoi en valeur monétaire.", ready: false },
  { href: "/calculateurs", title: "Calculateur de rake", desc: "Estimer le rake prélevé sur tes sessions.", ready: false },
  { href: "/calculateurs", title: "Calculateur de ROI tournoi", desc: "Mesurer ta rentabilité en tournoi.", ready: false },
];

export default function CalculateursPage() {
  const ld = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Calculateurs poker" };
  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Calculateurs" }]} />
      <PageHero
        kicker="Outils interactifs"
        title="Les calculateurs poker"
        intro="Des outils simples pour prendre de meilleures décisions et suivre tes résultats. Le calculateur de cotes est déjà en ligne ; les autres arrivent."
      />

      <div className="grid-cards" style={{ marginTop: 28 }}>
        {CALCS.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="card card-hover"
            style={{ opacity: c.ready ? 1 : 0.7 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="display" style={{ fontSize: 16 }}>{c.title}</span>
              <span className={`pill ${c.ready ? "pill-beginner" : ""}`}>
                {c.ready ? "En ligne" : "Bientôt"}
              </span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10 }}>{c.desc}</p>
          </Link>
        ))}
      </div>

      <SeeAlso
        links={[
          { label: "Cotes et pot odds", href: "/strategie/cotes-et-pot-odds", desc: "La théorie derrière le calculateur de cotes." },
          { label: "La gestion de bankroll", href: "/strategie/gestion-de-bankroll", desc: "Combien de caves garder pour ne jamais sauter." },
          { label: "Le glossaire poker", href: "/glossaire", desc: "Pot odds, ICM, ROI, rake : tous les termes définis." },
        ]}
      />
    </div>
  );
}
