import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, DealerNote, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Les blindes au poker : small blind, big blind, ante et straddle",
  description:
    "Comprendre les blindes au poker : a quoi servent la small blind et la big blind, ce qu'est " +
    "une ante et un straddle, et comment elles structurent les mises. Explique simplement.",
  alternates: { canonical: "/apprendre/blindes" },
};

export default function BlindesPage() {
  return (
    <div className="wrap">
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Apprendre", href: "/apprendre" },
          { label: "Les blindes" },
        ]}
      />
      <PageHero
        kicker="Apprendre · Lecon 4"
        title="Les blindes et les antes"
        intro="Sans mise obligatoire, personne n'aurait interet a jouer une main : tout le monde attendrait l'As. Les blindes existent pour forcer l'action et creer un pot a chaque coup. Voici comment elles fonctionnent."
      />

      <Section kicker="Les deux blindes" title="Small blind & big blind">
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          <div className="card">
            <div className="display" style={{ fontSize: 18 }}>Small blind (SB)</div>
            <p style={{ color: "var(--muted)", marginTop: 8 }}>
              Mise obligatoire posee par le joueur a gauche du bouton, avant meme de voir ses cartes.
              Elle vaut generalement la moitie de la big blind.
            </p>
          </div>
          <div className="card">
            <div className="display" style={{ fontSize: 18 }}>Big blind (BB)</div>
            <p style={{ color: "var(--muted)", marginTop: 8 }}>
              Mise obligatoire du joueur suivant, le double de la small blind. C&apos;est l&apos;unite de
              reference du poker : on parle d&apos;un tapis &quot;de 100 BB&quot;, d&apos;une relance &quot;a 3 BB&quot;, etc.
            </p>
          </div>
        </div>
        <div className="card felt" style={{ marginTop: 16, padding: 20 }}>
          <p style={{ color: "#ffffff" }}>
            Exemple en blindes <strong>1 € / 2 €</strong> : la small blind pose 1 €, la big blind
            pose 2 €. Le premier joueur a parler (UTG) doit au minimum suivre 2 € pour rester,
            relancer, ou se coucher.
          </p>
        </div>
      </Section>

      <Section kicker="Pour accelerer le jeu" title="L'ante">
        <div className="card">
          <p style={{ color: "var(--muted)" }}>
            L&apos;<strong>ante</strong> est une petite mise obligatoire payee par <em>tous</em> les
            joueurs (ou parfois par la seule big blind : le &quot;big blind ante&quot;). Elle gonfle le pot
            des le depart et incite a jouer plus de mains. On la retrouve surtout en <strong>tournoi</strong>,
            a partir des niveaux intermediaires, pour accelerer l&apos;elimination des joueurs.
          </p>
        </div>
      </Section>

      <Section kicker="Optionnel et agressif" title="Le straddle">
        <div className="card">
          <p style={{ color: "var(--muted)" }}>
            Le <strong>straddle</strong> est une relance volontaire et a l&apos;aveugle, posee
            generalement par le joueur a gauche de la big blind, avant la distribution. Elle vaut le
            double de la big blind et devient la nouvelle mise a suivre. C&apos;est un pari qui gonfle
            les pots et dynamise une table de cash game — a manier avec prudence.
          </p>
        </div>
        <DealerNote>
          Petit reflexe de table : les blindes &quot;tournent&quot;. A chaque main, le bouton avance d&apos;un
          siege, donc les blindes aussi. Sur la duree, chacun paie les memes blindes : ce n&apos;est
          pas une perte, c&apos;est le ticket d&apos;entree de chaque coup.
        </DealerNote>
      </Section>

      <div className="card" style={{ marginTop: 24, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Lecon suivante :{" "}
          <Link href="/apprendre/deroulement-dune-main" className="link">le deroulement complet d&apos;une main →</Link>
        </p>
      </div>
    </div>
  );
}
