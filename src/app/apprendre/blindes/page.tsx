import Link from "next/link";
import { LessonLayout } from "@/components/LessonLayout";
import { APPRENDRE_NAV } from "@/lib/poker/learn";
import { PokerTable } from "@/components/PokerTable";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, DealerNote } from "@/components/ui";

export const metadata: Metadata = {
  title: "Les blindes au poker : small blind, big blind, ante et straddle",
  description:
    "Comprendre les blindes au poker : à quoi servent la small blind et la big blind, ce qu'est " +
    "une ante et un straddle, et comment elles structurent les mises. Expliqué simplement.",
  alternates: { canonical: "/apprendre/blindes" },
};

export default function BlindesPage() {
  return (
    <LessonLayout sidebarTitle="Apprendre" indexHref="/apprendre" items={APPRENDRE_NAV}>
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Apprendre", href: "/apprendre" },
          { label: "Les blindes" },
        ]}
      />
      <PageHero
        kicker="Apprendre · Leçon 4"
        title="Les blindes et les antes"
        intro="Sans mise obligatoire, personne n'aurait intérêt à jouer une main : tout le monde attendrait l'As. Les blindes existent pour forcer l'action et créer un pot à chaque coup. Voici comment elles fonctionnent."
      />

      <Section kicker="Les deux blindes" title="Small blind & big blind">
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          <div className="card">
            <div className="display" style={{ fontSize: 18 }}>Small blind (SB)</div>
            <p style={{ color: "var(--muted)", marginTop: 8 }}>
              Mise obligatoire posée par le joueur à gauche du bouton, avant même de voir ses cartes.
              Elle vaut généralement la moitié de la big blind.
            </p>
          </div>
          <div className="card">
            <div className="display" style={{ fontSize: 18 }}>Big blind (BB)</div>
            <p style={{ color: "var(--muted)", marginTop: 8 }}>
              Mise obligatoire du joueur suivant, le double de la small blind. C&apos;est l&apos;unité
              de référence du poker : on parle d&apos;un tapis « de 100 BB », d&apos;une relance « à 3 BB », etc.
            </p>
          </div>
        </div>
        <div className="card felt" style={{ marginTop: 16, padding: 20 }}>
          <p style={{ color: "#ffffff" }}>
            Exemple en blindes <strong>1 € / 2 €</strong> : la small blind pose 1 €, la big blind
            pose 2 €. Le premier joueur à parler (UTG) doit au minimum suivre 2 € pour rester,
            relancer, ou se coucher.
          </p>
        </div>
        <PokerTable
          center="Blindes 1 € / 2 €"
          caption="Le bouton (D) donne. À sa gauche, la small blind pose 1 €, puis la big blind pose 2 €. Les autres doivent au moins suivre 2 € pour entrer dans le coup."
          seats={[
            { label: "BTN", note: "Bouton", tone: "gold", dealer: true },
            { label: "SB", note: "Small blind · 1 €", tone: "blue" },
            { label: "BB", note: "Big blind · 2 €", tone: "blue" },
            { label: "UTG", note: "Parle en 1er" },
            { label: "MP", note: "Milieu" },
            { label: "CO", note: "Cutoff" },
          ]}
        />
      </Section>

      <Section kicker="Pour accélérer le jeu" title="L'ante">
        <div className="card">
          <p style={{ color: "var(--muted)" }}>
            L&apos;<strong>ante</strong> est une petite mise obligatoire payée par <em>tous</em> les
            joueurs (ou parfois par la seule big blind : le « big blind ante »). Elle gonfle le pot
            dès le départ et incite à jouer plus de mains. On la retrouve surtout en <strong>tournoi</strong>,
            à partir des niveaux intermédiaires, pour accélérer l&apos;élimination des joueurs.
          </p>
        </div>
      </Section>

      <Section kicker="Optionnel et agressif" title="Le straddle">
        <div className="card">
          <p style={{ color: "var(--muted)" }}>
            Le <strong>straddle</strong>{" "}est une relance volontaire et à l&apos;aveugle, posée
            généralement par le joueur à gauche de la big blind, avant la distribution. Elle vaut le
            double de la big blind et devient la nouvelle mise à suivre. C&apos;est un pari qui gonfle
            les pots et dynamise une table de cash game, à manier avec prudence.
          </p>
        </div>
        <DealerNote>
          Petit réflexe de table : les blindes « tournent ». À chaque main, le bouton avance d&apos;un
          siège, donc les blindes aussi. Sur la durée, chacun paie les mêmes blindes : ce n&apos;est
          pas une perte, c&apos;est le ticket d&apos;entrée de chaque coup.
        </DealerNote>
      </Section>

      <div className="card" style={{ marginTop: 24, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Leçon suivante :{" "}
          <Link href="/apprendre/deroulement-dune-main" className="link">le déroulement complet d&apos;une main →</Link>
        </p>
      </div>
    </LessonLayout>
  );
}
