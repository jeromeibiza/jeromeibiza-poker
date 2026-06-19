import Link from "next/link";
import type { Metadata } from "next";
import { Hand } from "@/components/PlayingCard";
import { Crumbs, PageHero, Section, DealerNote, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Les regles du poker (Texas Hold'em) expliquees pour debutants",
  description:
    "Apprends les regles du poker Texas Hold'em en 8 minutes : objectif du jeu, deroulement " +
    "d'une main, blindes, tours d'encheres, showdown et vocabulaire essentiel. Simple et illustre.",
  alternates: { canonical: "/apprendre/regles-du-poker" },
};

const FAQ = [
  {
    q: "Quel est le but du poker ?",
    a: "Remporter des jetons, soit en ayant la meilleure main au showdown, soit en faisant coucher tous vos adversaires avant.",
  },
  {
    q: "Combien de cartes recoit-on au Texas Hold'em ?",
    a: "Chaque joueur recoit 2 cartes privatives (les cartes fermees), puis 5 cartes communes sont devoilees au centre.",
  },
  {
    q: "Le poker est-il un jeu de hasard ou d'adresse ?",
    a: "Les deux. Le hasard distribue les cartes, mais sur le long terme ce sont les decisions (mise, position, lecture des adversaires) qui font la difference.",
  },
];

export default function ReglesPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="wrap">
      <JsonLd data={faqLd} />
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Apprendre", href: "/apprendre" },
          { label: "Les regles du poker" },
        ]}
      />
      <PageHero
        kicker="Apprendre · Lecon 1"
        title="Les regles du poker"
        intro="On apprend ici le Texas Hold'em No-Limit, la variante la plus jouee au monde. En 8 minutes, tu sauras tout ce qu'il faut pour t'asseoir a une table et jouer ta premiere main sans te tromper."
      />

      <Section kicker="L'essentiel en une phrase" title="L'objectif du jeu">
        <div className="card">
          <p style={{ color: "var(--fg)", fontSize: 17 }}>
            Le but est simple : <strong>gagner des jetons</strong>. Deux facons d&apos;y arriver —
            avoir la <strong>meilleure main</strong> au moment de l&apos;abattage (le showdown), ou
            faire <strong>coucher</strong> tous vos adversaires grace a vos mises avant d&apos;en arriver la.
          </p>
        </div>
      </Section>

      <Section kicker="Le materiel" title="La table, les cartes, les jetons">
        <ul className="lb">
          <li>Un jeu de <strong>52 cartes</strong> (sans les jokers).</li>
          <li>De 2 a 10 joueurs autour d&apos;une table.</li>
          <li>Un <strong>bouton</strong> (le &quot;dealer button&quot;) qui tourne dans le sens horaire a chaque main et determine l&apos;ordre de jeu.</li>
          <li>Des <strong>jetons</strong> qui representent la valeur misee.</li>
        </ul>
      </Section>

      <Section kicker="Pas a pas" title="Le deroulement d'une main">
        <ol style={{ display: "grid", gap: 14, listStyle: "none", padding: 0, counterReset: "step" }}>
          {[
            ["Les blindes", "Les deux joueurs a gauche du bouton posent la small blind et la big blind : des mises obligatoires qui lancent l'action."],
            ["La donne (preflop)", "Chaque joueur recoit 2 cartes fermees. Premier tour d'encheres : on peut suivre (call), relancer (raise) ou se coucher (fold)."],
            ["Le flop", "3 cartes communes sont devoilees au centre. Nouveau tour d'encheres."],
            ["Le turn", "Une 4e carte commune apparait. Encore un tour d'encheres."],
            ["La river", "La 5e et derniere carte commune. Dernier tour d'encheres."],
            ["Le showdown", "S'il reste au moins 2 joueurs, on devoile les mains. La meilleure combinaison de 5 cartes remporte le pot."],
          ].map(([t, d], i) => (
            <li key={t} className="card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span className="display" style={{ fontSize: 24, color: "var(--gold)", minWidth: 34, textAlign: "center" }}>
                {i + 1}
              </span>
              <span>
                <span className="display" style={{ display: "block", fontSize: 17 }}>{t}</span>
                <span style={{ display: "block", color: "var(--muted)", fontSize: 14, marginTop: 6 }}>{d}</span>
              </span>
            </li>
          ))}
        </ol>
        <p style={{ color: "var(--muted)", marginTop: 14 }}>
          Tu veux le detail de chaque tour avec exemples ?{" "}
          <Link href="/apprendre/deroulement-dune-main" className="link">Voir le deroulement complet d&apos;une main →</Link>
        </p>
      </Section>

      <Section kicker="Composer sa main" title="2 cartes en main + 5 au centre">
        <div className="card">
          <p style={{ color: "var(--muted)" }}>
            Tu composes ta meilleure main de <strong>5 cartes</strong> parmi les 7 disponibles
            (tes 2 cartes + les 5 communes). Exemple : avec A♠ K♠ en main et le tableau
            Q♠ J♠ 10♦ 4♣ 2♥, tu utilises A♠ K♠ Q♠ J♠ 10♦... non : A♠ K♠ Q♠ J♠ 10 forme une
            suite, et comme A-K-Q-J sont a pique avec le 10♠ tu aurais la quinte flush royale.
            Ici sans le 10♠ c&apos;est une simple suite a l&apos;As.
          </p>
          <div style={{ marginTop: 14 }}>
            <Hand cards={["As", "Ks", "Qs", "Js", "Td"]} size={0.85} />
          </div>
          <p style={{ color: "var(--muted)", marginTop: 12 }}>
            Apprends a reconnaitre toutes les combinaisons sur la page{" "}
            <Link href="/apprendre/classement-des-mains" className="link">classement des mains</Link>.
          </p>
        </div>
      </Section>

      <Section kicker="Le vocabulaire de base" title="Les mots a connaitre tout de suite">
        <div className="grid-cards">
          {[
            ["Check", "Passer son tour sans miser (possible si personne n'a mise avant vous)."],
            ["Bet / Mise", "Etre le premier a miser sur un tour."],
            ["Call / Suivre", "Egaler la mise en cours pour rester dans le coup."],
            ["Raise / Relancer", "Augmenter la mise en cours."],
            ["Fold / Coucher", "Jeter ses cartes et abandonner la main."],
            ["All-in / Tapis", "Miser tous ses jetons."],
            ["Pot", "L'ensemble des jetons mises, a remporter."],
            ["Bluff", "Miser fort avec une main faible pour faire coucher l'adversaire."],
          ].map(([t, d]) => (
            <div key={t} className="card">
              <div className="display" style={{ fontSize: 16 }}>{t}</div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 6 }}>{d}</p>
            </div>
          ))}
        </div>
        <p style={{ color: "var(--muted)", marginTop: 14 }}>
          Plus de 300 termes expliques dans le{" "}
          <Link href="/glossaire" className="link">glossaire poker complet</Link>.
        </p>
      </Section>

      <Section kicker="Un peu d'histoire" title="D'ou vient le poker ?">
        <p style={{ color: "var(--muted)" }}>
          Le poker moderne nait au XIXe siecle sur les bateaux a vapeur du Mississippi, herite de
          jeux europeens comme le &quot;poque&quot; francais et le &quot;primero&quot; espagnol. Le Texas
          Hold&apos;em, lui, apparait au debut du XXe siecle au Texas, puis explose mondialement
          dans les annees 2000 avec la diffusion televisee des World Series of Poker et l&apos;essor
          du poker en ligne.
        </p>
      </Section>

      <Section kicker="FAQ" title="Questions frequentes">
        <div style={{ display: "grid", gap: 12 }}>
          {FAQ.map((f) => (
            <details key={f.q} className="card">
              <summary style={{ cursor: "pointer", fontWeight: 600 }}>{f.q}</summary>
              <p style={{ color: "var(--muted)", marginTop: 10 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <DealerNote>
        Mon conseil de croupier pour ta premiere partie : ne joue que des mains solides et reste
        attentif a ta position. Tu perdras moins de jetons en te couchant souvent qu&apos;en voulant
        jouer tous les coups. La patience, c&apos;est deja 50 % du poker.
      </DealerNote>

      <div className="card" style={{ marginTop: 24, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Lecon suivante :{" "}
          <Link href="/apprendre/classement-des-mains" className="link">le classement des mains →</Link>
        </p>
      </div>
    </div>
  );
}
