import Link from "next/link";
import { LessonLayout } from "@/components/LessonLayout";
import { APPRENDRE_NAV } from "@/lib/poker/learn";
import type { Metadata } from "next";
import { HANDS } from "@/lib/poker/hands";
import { Hand } from "@/components/PlayingCard";
import { HandQuiz } from "@/components/HandQuiz";
import { Crumbs, PageHero, Section, DealerNote, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Classement des mains au poker : ordre, probabilités et exemples",
  description:
    "Le classement complet des 10 mains au poker, de la carte haute à la quinte flush royale. " +
    "Ordre exact, probabilités, combinaisons et exemples illustrés avec de vraies cartes. Quiz inclus.",
  alternates: { canonical: "/apprendre/classement-des-mains" },
};

const FAQ = [
  {
    q: "Quelle est la main la plus forte au poker ?",
    a: "La quinte flush royale (As-Roi-Dame-Valet-10 de la même couleur). Elle ne peut jamais être battue.",
  },
  {
    q: "La couleur bat-elle la suite ?",
    a: "Oui. La couleur (5 cartes de la même couleur) est plus rare que la suite (5 cartes consécutives), elle la bat donc toujours.",
  },
  {
    q: "Qui gagne entre deux paires identiques ?",
    a: "On compare les kickers, c'est-à-dire les cartes restantes, de la plus haute à la plus basse. Si tout est égal, le pot est partagé.",
  },
  {
    q: "L'As est-il la carte la plus haute ou la plus basse ?",
    a: "Les deux. L'As est la carte la plus haute (A-K-Q-J-10) mais peut aussi servir de carte basse dans la suite A-2-3-4-5, appelée la roue.",
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
    <LessonLayout sidebarTitle="Apprendre" indexHref="/apprendre" items={APPRENDRE_NAV}>
      <JsonLd data={faqLd} />
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Apprendre", href: "/apprendre" },
          { label: "Classement des mains" },
        ]}
      />
      <PageHero
        kicker="Apprendre · Leçon 2"
        title="Le classement des mains au poker"
        intro="Au poker, la main la plus forte remporte le pot. Voici les 10 mains officielles, de la plus faible à la plus forte, dans l'ordre où on les apprend, avec pour chacune sa probabilité, le nombre de combinaisons possibles et un exemple en cartes. Mémorise cet ordre : c'est la base de tout."
      />

      {/* Liste classée */}
      <Section kicker="De la plus faible à la plus forte" title="Les 10 mains, dans l'ordre">
        <p style={{ color: "var(--muted)", marginTop: -4, marginBottom: 16 }}>
          Astuce de lecture : sur chaque exemple, les{" "}
          <strong style={{ color: "var(--gold-soft)" }}>cartes en or</strong>{" "}sont celles qui
          forment la combinaison. Les cartes grisées sont les « kickers », qui ne servent qu&apos;à
          départager deux mains identiques.
        </p>
        <div style={{ display: "grid", gap: 14 }}>
          {[...HANDS].reverse().map((h, i) => (
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
                  {i + 1}
                </div>
                <div style={{ flex: "1 1 240px" }}>
                  <h3 style={{ fontSize: 20, margin: 0 }}>{h.name}</h3>
                  <div className="label" style={{ color: "var(--faint)", fontSize: 11, marginTop: 4 }}>
                    {h.short}
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10 }}>{h.description}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Hand cards={h.cards} size={0.78} highlight={h.highlight} />
                  <div className="label" style={{ color: "var(--gold-soft)", fontSize: 11 }}>
                    En or : {h.comboLabel}
                  </div>
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
          Probabilités calculées pour 5 cartes tirées au hasard dans un jeu de 52 cartes. Au Texas
          Hold&apos;em, tu composes ta meilleure main de 5 cartes parmi les 7 disponibles (2 en main + 5 communes).
        </p>
      </Section>

      {/* Quiz interactif */}
      <Section kicker="Teste-toi" title="Quelle main gagne ?">
        <HandQuiz />
      </Section>

      <Section kicker="Bon à savoir" title="Comment on départage deux mains">
        <ul className="lb">
          <li>On compare d&apos;abord le <strong>type</strong> de main (un brelan bat toujours deux paires).</li>
          <li>À type égal, on compare la <strong>valeur</strong> (un full aux Rois bat un full aux Dames).</li>
          <li>Si tout est identique, les <strong>kickers</strong> (cartes restantes) départagent.</li>
          <li>Si même les kickers sont égaux, le pot est <strong>partagé</strong> (split pot).</li>
          <li>La couleur ne sert <strong>jamais</strong> à départager : pique, cœur, carreau et trèfle ont la même valeur.</li>
        </ul>
        <DealerNote>
          Erreur de débutant classique : croire qu&apos;une couleur à l&apos;As bat un full. Non, le
          full est plus haut dans le classement. Apprends l&apos;ordre par cœur avant tout le reste,
          ça t&apos;évitera des tapis perdus bêtement.
        </DealerNote>
      </Section>

      {/* FAQ */}
      <Section kicker="FAQ" title="Questions fréquentes">
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
          Leçon suivante :{" "}
          <Link href="/apprendre/positions" className="link">les positions à la table →</Link>
        </p>
      </div>
    </LessonLayout>
  );
}
