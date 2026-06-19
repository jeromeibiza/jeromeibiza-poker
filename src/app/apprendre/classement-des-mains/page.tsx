import Link from "next/link";
import type { Metadata } from "next";
import { HANDS } from "@/lib/poker/hands";
import { Hand } from "@/components/PlayingCard";
import { HandQuiz } from "@/components/HandQuiz";
import { Crumbs, PageHero, Section, DealerNote, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Classement des mains au poker : ordre, probabilites et exemples",
  description:
    "Le classement complet des 10 mains au poker, de la quinte flush royale a la carte haute. " +
    "Ordre exact, probabilites, combinaisons et exemples illustres avec de vraies cartes. Quiz inclus.",
  alternates: { canonical: "/apprendre/classement-des-mains" },
};

const FAQ = [
  {
    q: "Quelle est la main la plus forte au poker ?",
    a: "La quinte flush royale (As-Roi-Dame-Valet-10 de la meme couleur). Elle ne peut jamais etre battue.",
  },
  {
    q: "La couleur bat-elle la suite ?",
    a: "Oui. La couleur (5 cartes de la meme couleur) est plus rare que la suite (5 cartes consecutives), elle la bat donc toujours.",
  },
  {
    q: "Qui gagne entre deux paires identiques ?",
    a: "On compare les kickers, c'est-a-dire les cartes restantes, de la plus haute a la plus basse. Si tout est egal, le pot est partage.",
  },
  {
    q: "L'As est-il la carte la plus haute ou la plus basse ?",
    a: "Les deux. L'As est la carte la plus haute (A-K-Q-J-10) mais peut aussi servir de carte basse dans la suite A-2-3-4-5, appelee la roue.",
  },
];

export default function ClassementMainsPage() {
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
          { label: "Classement des mains" },
        ]}
      />
      <PageHero
        kicker="Apprendre · Lecon 2"
        title="Le classement des mains au poker"
        intro="Au poker, la main la plus forte remporte le pot. Voici les 10 mains officielles, de la plus forte a la plus faible, avec pour chacune sa probabilite, le nombre de combinaisons possibles et un exemple en cartes. Memorise cet ordre : c'est la base de tout."
      />

      {/* Liste classee */}
      <Section kicker="De la plus forte a la plus faible" title="Les 10 mains, dans l'ordre">
        <div style={{ display: "grid", gap: 14 }}>
          {HANDS.map((h) => (
            <article key={h.slug} className="card" style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div
                  className="display"
                  style={{
                    fontSize: 30,
                    color: "var(--gold)",
                    minWidth: 40,
                    textAlign: "center",
                  }}
                  aria-hidden
                >
                  {h.rank}
                </div>
                <div style={{ flex: "1 1 240px" }}>
                  <h3 style={{ fontSize: 20, margin: 0 }}>{h.name}</h3>
                  <div className="label" style={{ color: "var(--faint)", fontSize: 11, marginTop: 4 }}>
                    {h.short}
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10 }}>{h.description}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Hand cards={h.cards} size={0.78} />
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span className="pill">Proba {h.probabilityPct}</span>
                    <span className="pill">{h.odds}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p style={{ color: "var(--faint)", fontSize: 13, marginTop: 14 }}>
          Probabilites calculees pour 5 cartes tirees au hasard dans un jeu de 52 cartes. Au Texas
          Hold&apos;em, tu composes ta meilleure main de 5 cartes parmi les 7 disponibles (2 en main + 5 communes).
        </p>
      </Section>

      {/* Quiz interactif */}
      <Section kicker="Teste-toi" title="Quelle main gagne ?">
        <HandQuiz />
      </Section>

      <Section kicker="Bon a savoir" title="Comment on departage deux mains">
        <ul className="lb">
          <li>On compare d&apos;abord le <strong>type</strong> de main (un brelan bat toujours deux paires).</li>
          <li>A type egal, on compare la <strong>valeur</strong> (un full aux Rois bat un full aux Dames).</li>
          <li>Si tout est identique, les <strong>kickers</strong> (cartes restantes) departagent.</li>
          <li>Si meme les kickers sont egaux, le pot est <strong>partage</strong> (split pot).</li>
          <li>La couleur ne sert <strong>jamais</strong> a departager : pique, coeur, carreau et trefle ont la meme valeur.</li>
        </ul>
        <DealerNote>
          Erreur de debutant classique : croire qu&apos;une couleur a l&apos;As bat un full. Non — le full
          est plus haut dans le classement. Apprends l&apos;ordre par coeur avant tout le reste, ca
          t&apos;evitera de tapis perdus betement.
        </DealerNote>
      </Section>

      {/* FAQ */}
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

      <div className="card" style={{ marginTop: 32, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Lecon suivante :{" "}
          <Link href="/apprendre/positions" className="link">les positions a la table →</Link>
        </p>
      </div>
    </div>
  );
}
