import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Strategie poker : du debutant au GTO — la bibliotheque de cours",
  description:
    "Toute la strategie poker organisee par niveau : debutant (selection des mains, bankroll), " +
    "intermediaire (ranges, cbet, 3bet, cotes), avance (GTO, blockers, MDF, equilibrage).",
  alternates: { canonical: "/strategie" },
};

const LEVELS = [
  {
    id: "debutant",
    pill: "pill-beginner",
    title: "Debutant",
    intro: "Construire des fondations solides et arreter de perdre des jetons betement.",
    topics: [
      ["Quelles mains jouer", "Les mains de depart rentables selon la position."],
      ["Les erreurs frequentes", "Limper, payer trop, jouer hors de position, suivre par curiosite."],
      ["L'importance de la position", "Pourquoi jouer en dernier change tout."],
      ["La gestion de bankroll", "Combien de caves avoir pour ne jamais sauter."],
    ],
  },
  {
    id: "intermediaire",
    pill: "pill-inter",
    title: "Intermediaire",
    intro: "Penser en ranges et en cotes, pas en mains isolees.",
    topics: [
      ["Les ranges", "Raisonner par eventail de mains plutot que par carte."],
      ["Le c-bet", "Quand et comment continuer l'agression au flop."],
      ["Le 3-bet", "Relancer une relance : en valeur et en bluff."],
      ["Le squeeze", "Punir une ouverture suivie de calls."],
      ["Pot odds & implied odds", "Calculer la rentabilite d'un tirage."],
      ["Le semi-bluff", "Miser un tirage pour gagner de deux facons."],
    ],
  },
  {
    id: "avance",
    pill: "pill-advanced",
    title: "Avance",
    intro: "Equilibrer son jeu et exploiter les faiblesses adverses.",
    topics: [
      ["GTO", "La strategie d'equilibre inexploitable, en pratique."],
      ["Le jeu exploitant", "Devier de l'equilibre pour punir les erreurs adverses."],
      ["Les blockers", "Utiliser ses cartes pour bloquer les combos adverses."],
      ["La MDF", "Minimum Defense Frequency : ne pas se faire bluffer impunement."],
      ["Frequence de bluff", "Le bon ratio value/bluff selon la mise."],
      ["Equilibrage des ranges", "Rendre son jeu illisible."],
    ],
  },
];

export default function StrategiePage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Strategie poker",
    description: "Bibliotheque de cours de strategie poker par niveau.",
  };
  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Strategie" }]} />
      <PageHero
        kicker="Bibliotheque de cours"
        title="La strategie poker, par niveau"
        intro="Du premier pas au GTO. Choisis ton niveau et progresse a ton rythme. Chaque theme deviendra un cours complet ; voici la carte du parcours."
      />

      {LEVELS.map((lvl) => (
        <Section key={lvl.id} id={lvl.id} kicker="Niveau" title={lvl.title}>
          <span className={`pill ${lvl.pill}`}>{lvl.title}</span>
          <p style={{ color: "var(--muted)", marginTop: 12, marginBottom: 16, maxWidth: 620 }}>{lvl.intro}</p>
          <div className="grid-cards">
            {lvl.topics.map(([t, d]) => (
              <div key={t} className="card card-hover">
                <div className="display" style={{ fontSize: 16 }}>{t}</div>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{d}</p>
                <div className="label" style={{ color: "var(--faint)", fontSize: 11, marginTop: 12 }}>
                  Cours a venir
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}

      <div className="card" style={{ marginTop: 32, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Tu debutes vraiment ? Commence par le{" "}
          <Link href="/apprendre" className="link">cursus Apprendre</Link>, puis reviens ici.
          En attendant, teste tes decisions avec le{" "}
          <Link href="/calculateurs/cotes" className="link">calculateur de cotes</Link>.
        </p>
      </div>
    </div>
  );
}
