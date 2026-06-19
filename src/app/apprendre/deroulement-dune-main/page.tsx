import Link from "next/link";
import type { Metadata } from "next";
import { Hand } from "@/components/PlayingCard";
import { Crumbs, PageHero, Section, DealerNote, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Deroulement d'une main au poker : preflop, flop, turn, river, showdown",
  description:
    "Suis le deroulement complet d'une main de Texas Hold'em etape par etape : preflop, flop, " +
    "turn, river et showdown, avec un exemple illustre du debut a la fin.",
  alternates: { canonical: "/apprendre/deroulement-dune-main" },
};

export default function DeroulementPage() {
  return (
    <div className="wrap">
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Apprendre", href: "/apprendre" },
          { label: "Deroulement d'une main" },
        ]}
      />
      <PageHero
        kicker="Apprendre · Lecon 5"
        title="Le deroulement d'une main"
        intro="Une main de Texas Hold'em se joue en cinq temps. On suit ici un exemple complet : vous avez A♠ K♠ en main. Observez comment l'action se construit, tour apres tour."
      />

      <Section kicker="Votre main" title="Le point de depart">
        <div className="card" style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <Hand cards={["As", "Ks"]} size={1} />
          <p style={{ color: "var(--muted)", margin: 0, flex: "1 1 260px" }}>
            A♠ K♠ — &quot;Big Slick&quot; assorti. Une excellente main de depart, jouable de presque toutes
            les positions.
          </p>
        </div>
      </Section>

      <Section kicker="Etape 1" title="Preflop">
        <div className="card">
          <p style={{ color: "var(--muted)" }}>
            Apres la pose des blindes, chacun recoit ses 2 cartes. Le premier tour d&apos;encheres
            commence a gauche de la big blind. Avec A♠ K♠, vous <strong>relancez</strong> (par
            exemple a 3 big blinds) pour prendre l&apos;initiative et reduire le nombre d&apos;adversaires.
            Deux joueurs suivent.
          </p>
        </div>
      </Section>

      <Section kicker="Etape 2" title="Le flop">
        <div className="card">
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Hand cards={["Qs", "Js", "4d"]} size={0.85} />
            <p style={{ color: "var(--muted)", margin: 0, flex: "1 1 240px" }}>
              Q♠ J♠ 4♦. Enorme flop pour vous : vous avez un <strong>tirage quinte flush royale</strong>
              (il vous manque le 10♠) et deux overcards. Vous misez (continuation bet) pour
              continuer a mettre la pression.
            </p>
          </div>
        </div>
      </Section>

      <Section kicker="Etape 3" title="Le turn">
        <div className="card">
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Hand cards={["Qs", "Js", "4d", "2c"]} size={0.85} />
            <p style={{ color: "var(--muted)", margin: 0, flex: "1 1 240px" }}>
              Le 2♣ ne change rien. Vous gardez votre tirage couleur (toutes les piques) et votre
              tirage quinte. Vous pouvez continuer a miser : meme sans avoir encore une main faite,
              vous avez beaucoup d&apos;<em>equity</em> (de chances de gagner).
            </p>
          </div>
        </div>
      </Section>

      <Section kicker="Etape 4" title="La river">
        <div className="card">
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Hand cards={["Qs", "Js", "4d", "2c", "Ts"]} size={0.85} />
            <p style={{ color: "var(--muted)", margin: 0, flex: "1 1 240px" }}>
              Le 10♠ ! Vous completez la <strong>quinte flush royale</strong> : A♠ K♠ Q♠ J♠ 10♠.
              La main imbattable. Vous misez gros (ou faites tapis) pour maximiser vos gains.
            </p>
          </div>
        </div>
      </Section>

      <Section kicker="Etape 5" title="Le showdown">
        <div className="card felt" style={{ padding: 22 }}>
          <p style={{ color: "#ffffff" }}>
            S&apos;il reste au moins deux joueurs apres le dernier tour d&apos;encheres, on devoile les
            cartes. Le joueur qui a mise le dernier (ou qui a relance le dernier) montre en premier.
            Votre quinte flush royale remporte le pot — personne ne peut la battre.
          </p>
        </div>
        <p style={{ color: "var(--muted)", marginTop: 12 }}>
          Note : si tout le monde s&apos;etait couche avant la river, vous auriez remporte le pot
          <strong> sans jamais montrer vos cartes</strong>. C&apos;est aussi ca, gagner au poker.
        </p>
      </Section>

      <DealerNote>
        L&apos;ordre des tours est toujours le meme : preflop → flop → turn → river → showdown. Entre
        chaque carte commune, il y a un tour d&apos;encheres. Memorise ce rythme, c&apos;est la colonne
        vertebrale de chaque main que tu joueras.
      </DealerNote>

      <div className="card" style={{ marginTop: 24, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Tu maitrises les bases ! Passe maintenant a la{" "}
          <Link href="/strategie" className="link">strategie poker →</Link> ou apprends a distribuer
          avec l&apos;<Link href="/academie-croupier" className="link">academie croupier</Link>.
        </p>
      </div>
    </div>
  );
}
