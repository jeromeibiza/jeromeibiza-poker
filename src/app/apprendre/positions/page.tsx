import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, DealerNote, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Les positions au poker : SB, BB, UTG, CO, BTN... tout comprendre",
  description:
    "Comprendre les positions au poker (SB, BB, UTG, MP, HJ, CO, bouton) et pourquoi la position " +
    "est l'un des facteurs les plus importants du jeu. Avantages, inconvénients et conseils.",
  alternates: { canonical: "/apprendre/positions" },
};

const POSITIONS = [
  { abbr: "SB", name: "Small Blind", group: "Blindes", desc: "À gauche du bouton. Mise obligatoire réduite. Très mauvaise position : parle en premier après le flop." },
  { abbr: "BB", name: "Big Blind", group: "Blindes", desc: "Mise obligatoire pleine. Vous avez déjà de l'argent investi : vous défendez souvent, mais jouez hors de position." },
  { abbr: "UTG", name: "Under the Gun", group: "Early position", desc: "Premier à parler préflop. La pire position pour ouvrir : jouez très serré, beaucoup de joueurs parlent après vous." },
  { abbr: "UTG+1", name: "Under the Gun +1", group: "Early position", desc: "Juste après UTG. Toujours une position précoce : on sélectionne fortement ses mains." },
  { abbr: "MP", name: "Middle Position", group: "Milieu", desc: "Position intermédiaire. On peut élargir un peu sa range, mais la prudence reste de mise." },
  { abbr: "HJ", name: "Hijack", group: "Late position", desc: "Deux sièges avant le bouton. On commence à « voler » les blindes et à ouvrir plus large." },
  { abbr: "CO", name: "Cutoff", group: "Late position", desc: "Juste avant le bouton. Excellente position pour attaquer : peu de joueurs derrière vous." },
  { abbr: "BTN", name: "Bouton (Button)", group: "La meilleure", desc: "La position reine. Vous parlez en DERNIER à chaque tour post-flop. Range la plus large du jeu." },
];

export default function PositionsPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quelle est la meilleure position au poker ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le bouton (BTN). Vous y parlez en dernier après le flop, ce qui vous donne un maximum d'informations sur vos adversaires avant de décider.",
        },
      },
      {
        "@type": "Question",
        name: "Pourquoi la position est-elle si importante ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Parler en dernier permet de voir ce que font les adversaires avant d'agir. Plus d'information = meilleures décisions, plus de bluffs réussis et un meilleur contrôle du pot.",
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
          { label: "Apprendre", href: "/apprendre" },
          { label: "Les positions" },
        ]}
      />
      <PageHero
        kicker="Apprendre · Leçon 3"
        title="Les positions à la table"
        intro="La position, c'est l'ordre dans lequel vous parlez. C'est l'un des concepts les plus rentables du poker : à cartes égales, le joueur en position gagne plus. Voici les 8 positions à connaître."
      />

      <Section kicker="Le principe" title="Pourquoi la position vaut de l'argent">
        <div className="card">
          <p style={{ color: "var(--fg)", fontSize: 17 }}>
            Après le flop, l&apos;action commence toujours par le joueur à gauche du bouton et finit
            par le bouton. <strong>Parler en dernier est un énorme avantage</strong> : vous voyez ce
            que font tous les autres avant de décider. Vous contrôlez la taille du pot, vous bluffez
            plus efficacement et vous perdez moins quand vous êtes battu.
          </p>
        </div>
        <p style={{ color: "var(--muted)", marginTop: 12 }}>
          Règle d&apos;or : <strong>plus vous êtes proche du bouton, plus vous pouvez jouer de mains</strong>.
        </p>
      </Section>

      <Section kicker="Dans l'ordre du jeu" title="Les 8 positions">
        <div style={{ display: "grid", gap: 12 }}>
          {POSITIONS.map((p) => (
            <div key={p.abbr} className="card" style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span
                className="display"
                style={{
                  fontSize: 18,
                  color: "var(--gold)",
                  minWidth: 64,
                  textAlign: "center",
                  borderRight: "1px solid var(--line)",
                  paddingRight: 12,
                }}
              >
                {p.abbr}
              </span>
              <span style={{ flex: 1 }}>
                <span style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span className="display" style={{ fontSize: 16 }}>{p.name}</span>
                  <span className="pill">{p.group}</span>
                </span>
                <span style={{ display: "block", color: "var(--muted)", fontSize: 14, marginTop: 6 }}>{p.desc}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="À retenir" title="En position vs hors de position">
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          <div className="card">
            <div className="label" style={{ color: "#8fe3b6", fontSize: 12 }}>En position (IP)</div>
            <ul className="lb check" style={{ marginTop: 10 }}>
              <li>Vous parlez après l&apos;adversaire</li>
              <li>Plus d&apos;informations avant d&apos;agir</li>
              <li>Vous contrôlez la taille du pot</li>
              <li>Vos bluffs passent mieux</li>
            </ul>
          </div>
          <div className="card">
            <div className="label" style={{ color: "#f3a0a0", fontSize: 12 }}>Hors de position (OOP)</div>
            <ul className="lb" style={{ marginTop: 10 }}>
              <li>Vous parlez en premier, à l&apos;aveugle</li>
              <li>Vous subissez les décisions adverses</li>
              <li>Plus dur de contrôler le pot</li>
              <li>Il faut des mains plus fortes pour jouer</li>
            </ul>
          </div>
        </div>
      </Section>

      <DealerNote>
        Quand j&apos;observe une table en tant que croupier, je vois tout de suite qui maîtrise la
        position : les bons joueurs ouvrent peu en UTG et attaquent fort au bouton. Si tu ne dois
        retenir qu&apos;une chose : <strong>joue serré en premier de parole, large près du bouton</strong>.
      </DealerNote>

      <div className="card" style={{ marginTop: 24, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Leçon suivante :{" "}
          <Link href="/apprendre/blindes" className="link">les blindes et les antes →</Link>
        </p>
      </div>
    </div>
  );
}
