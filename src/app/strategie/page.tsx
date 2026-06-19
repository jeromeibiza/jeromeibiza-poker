import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Stratégie poker : du débutant au GTO — la bibliothèque de cours",
  description:
    "Toute la stratégie poker organisée par niveau : débutant (sélection des mains, bankroll), " +
    "intermédiaire (ranges, cbet, 3bet, cotes), avancé (GTO, blockers, MDF, équilibrage).",
  alternates: { canonical: "/strategie" },
};

const LEVELS = [
  {
    id: "debutant",
    pill: "pill-beginner",
    title: "Débutant",
    intro: "Construire des fondations solides et arrêter de perdre des jetons bêtement.",
    topics: [
      ["Quelles mains jouer", "Les mains de départ rentables selon la position."],
      ["Les erreurs fréquentes", "Limper, payer trop, jouer hors de position, suivre par curiosité."],
      ["L'importance de la position", "Pourquoi jouer en dernier change tout."],
      ["La gestion de bankroll", "Combien de caves avoir pour ne jamais sauter."],
    ],
  },
  {
    id: "intermediaire",
    pill: "pill-inter",
    title: "Intermédiaire",
    intro: "Penser en ranges et en cotes, pas en mains isolées.",
    topics: [
      ["Les ranges", "Raisonner par éventail de mains plutôt que par carte."],
      ["Le c-bet", "Quand et comment continuer l'agression au flop."],
      ["Le 3-bet", "Relancer une relance : en valeur et en bluff."],
      ["Le squeeze", "Punir une ouverture suivie de calls."],
      ["Pot odds & implied odds", "Calculer la rentabilité d'un tirage."],
      ["Le semi-bluff", "Miser un tirage pour gagner de deux façons."],
    ],
  },
  {
    id: "avance",
    pill: "pill-advanced",
    title: "Avancé",
    intro: "Équilibrer son jeu et exploiter les faiblesses adverses.",
    topics: [
      ["GTO", "La stratégie d'équilibre inexploitable, en pratique."],
      ["Le jeu exploitant", "Dévier de l'équilibre pour punir les erreurs adverses."],
      ["Les blockers", "Utiliser ses cartes pour bloquer les combos adverses."],
      ["La MDF", "Minimum Defense Frequency : ne pas se faire bluffer impunément."],
      ["Fréquence de bluff", "Le bon ratio value/bluff selon la mise."],
      ["Équilibrage des ranges", "Rendre son jeu illisible."],
    ],
  },
];

export default function StrategiePage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Stratégie poker",
    description: "Bibliothèque de cours de stratégie poker par niveau.",
  };
  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Stratégie" }]} />
      <PageHero
        kicker="Bibliothèque de cours"
        title="La stratégie poker, par niveau"
        intro="Du premier pas au GTO. Choisis ton niveau et progresse à ton rythme. Chaque thème deviendra un cours complet ; voici la carte du parcours."
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
                  Cours à venir
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}

      <div className="card" style={{ marginTop: 32, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Tu débutes vraiment ? Commence par le{" "}
          <Link href="/apprendre" className="link">cursus Apprendre</Link>, puis reviens ici. En
          attendant, teste tes décisions avec le{" "}
          <Link href="/calculateurs/cotes" className="link">calculateur de cotes</Link>.
        </p>
      </div>
    </div>
  );
}
