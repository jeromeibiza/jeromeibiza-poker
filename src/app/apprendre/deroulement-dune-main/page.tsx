import Link from "next/link";
import type { Metadata } from "next";
import { Hand } from "@/components/PlayingCard";
import { Crumbs, PageHero, Section, DealerNote } from "@/components/ui";

export const metadata: Metadata = {
  title: "Déroulement d'une main au poker : préflop, flop, turn, river, showdown",
  description:
    "Suis le déroulement complet d'une main de Texas Hold'em étape par étape : préflop, flop, " +
    "turn, river et showdown, avec un exemple illustré du début à la fin.",
  alternates: { canonical: "/apprendre/deroulement-dune-main" },
};

export default function DeroulementPage() {
  return (
    <div className="wrap">
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Apprendre", href: "/apprendre" },
          { label: "Déroulement d'une main" },
        ]}
      />
      <PageHero
        kicker="Apprendre · Leçon 5"
        title="Le déroulement d'une main"
        intro="Une main de Texas Hold'em se joue en cinq temps. On suit ici un exemple complet : vous avez A♠ K♠ en main. Observez comment l'action se construit, tour après tour."
      />

      <Section kicker="Votre main" title="Le point de départ">
        <div className="card" style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <Hand cards={["As", "Ks"]} size={1} />
          <p style={{ color: "var(--muted)", margin: 0, flex: "1 1 260px" }}>
            A♠ K♠, « Big Slick » assorti. Une excellente main de départ, jouable de presque toutes
            les positions.
          </p>
        </div>
      </Section>

      <Section kicker="Étape 1" title="Préflop">
        <div className="card">
          <p style={{ color: "var(--muted)" }}>
            Après la pose des blindes, chacun reçoit ses 2 cartes. Le premier tour d&apos;enchères
            commence à gauche de la big blind. Avec A♠ K♠, vous <strong>relancez</strong>{" "}(par
            exemple à 3 big blinds) pour prendre l&apos;initiative et réduire le nombre d&apos;adversaires.
            Deux joueurs suivent.
          </p>
        </div>
      </Section>

      <Section kicker="Étape 2" title="Le flop">
        <div className="card">
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Hand cards={["Qs", "Js", "4d"]} size={0.85} />
            <p style={{ color: "var(--muted)", margin: 0, flex: "1 1 240px" }}>
              Q♠ J♠ 4♦. Énorme flop pour vous : vous avez un{" "}
              <strong>tirage quinte flush royale</strong>{" "}(il vous manque le 10♠) et deux
              overcards. Vous misez (continuation bet) pour continuer à mettre la pression.
            </p>
          </div>
        </div>
      </Section>

      <Section kicker="Étape 3" title="Le turn">
        <div className="card">
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Hand cards={["Qs", "Js", "4d", "2c"]} size={0.85} />
            <p style={{ color: "var(--muted)", margin: 0, flex: "1 1 240px" }}>
              Le 2♣ ne change rien. Vous gardez votre tirage couleur (toutes les piques) et votre
              tirage quinte. Vous pouvez continuer à miser : même sans avoir encore une main faite,
              vous avez beaucoup d&apos;<em>équité</em> (de chances de gagner).
            </p>
          </div>
        </div>
      </Section>

      <Section kicker="Étape 4" title="La river">
        <div className="card">
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Hand cards={["Qs", "Js", "4d", "2c", "Ts"]} size={0.85} />
            <p style={{ color: "var(--muted)", margin: 0, flex: "1 1 240px" }}>
              Le 10♠ ! Vous complétez la <strong>quinte flush royale</strong>{" "}: A♠ K♠ Q♠ J♠ 10♠.
              La main imbattable. Vous misez gros (ou faites tapis) pour maximiser vos gains.
            </p>
          </div>
        </div>
      </Section>

      <Section kicker="Étape 5" title="Le showdown">
        <div className="card felt" style={{ padding: 22 }}>
          <p style={{ color: "#ffffff" }}>
            S&apos;il reste au moins deux joueurs après le dernier tour d&apos;enchères, on dévoile les
            cartes. Le joueur qui a misé le dernier (ou qui a relancé le dernier) montre en premier.
            Votre quinte flush royale remporte le pot, personne ne peut la battre.
          </p>
        </div>
        <p style={{ color: "var(--muted)", marginTop: 12 }}>
          Note : si tout le monde s&apos;était couché avant la river, vous auriez remporté le pot{" "}
          <strong>sans jamais montrer vos cartes</strong>. C&apos;est aussi ça, gagner au poker.
        </p>
      </Section>

      <DealerNote>
        L&apos;ordre des tours est toujours le même : préflop → flop → turn → river → showdown. Entre
        chaque carte commune, il y a un tour d&apos;enchères. Mémorise ce rythme, c&apos;est la colonne
        vertébrale de chaque main que tu joueras.
      </DealerNote>

      <div className="card" style={{ marginTop: 24, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Tu maîtrises les bases ! Passe maintenant à la{" "}
          <Link href="/strategie" className="link">stratégie poker →</Link>{" "}ou apprends à
          distribuer avec l&apos;<Link href="/academie-croupier" className="link">académie croupier</Link>.
        </p>
      </div>
    </div>
  );
}
