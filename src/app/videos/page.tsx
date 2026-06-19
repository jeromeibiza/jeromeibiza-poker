import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Videos poker : WSOP, WPT, EPT, Triton et les plus grandes mains",
  description:
    "Le Netflix du poker : videos pedagogiques, analyses de mains, documentaires et les grands " +
    "circuits WSOP, WPT, EPT et Triton. Classees par niveau et par circuit.",
  alternates: { canonical: "/videos" },
};

const CIRCUITS = [
  ["🏆 WSOP", "World Series of Poker : le Main Event, les tables finales historiques et les plus gros gains."],
  ["🌍 WPT", "World Poker Tour : etapes, tables finales mythiques, champions et WPT World Championship."],
  ["🇪🇺 EPT", "European Poker Tour : etapes europeennes, reportages et parcours de champions."],
  ["💎 Triton", "Triton Poker : high stakes, cash games legendaires et plus gros pots de l'histoire."],
];

const CATEGORIES = [
  ["🎓 Videos pedagogiques", "Regles, classement des mains, positions, cotes, bankroll, strategie debutant a avance."],
  ["♠️ Analyses de mains", "Main par main, erreurs frequentes, hero calls et bluffs celebres."],
  ["🎬 Documentaires", "Histoire du poker, portraits de pros, coulisses des grands tournois."],
  ["🎥 Replays complets", "Tournois commentes, tables finales integrales, High Stakes Poker, Poker After Dark."],
  ["⭐ Plus grandes mains", "Dwan vs Ivey, Negreanu, Hellmuth, Antonius, Holz, Koon... les classiques."],
  ["📺 Chaine TV Jerome Ibiza", "Selection hebdo : main de la semaine, joueur de la semaine, gros pots, bad beats."],
];

export default function VideosPage() {
  const ld = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Videos poker" };
  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Videos" }]} />
      <PageHero
        kicker="Le Netflix du poker"
        title="Videos poker"
        intro="Une videotheque classee par niveau (debutant a pro) et par circuit (WSOP, WPT, EPT, Triton). Du cours pedagogique au plus gros bluff de l'histoire."
      />

      <Section kicker="Les grands circuits" title="WSOP · WPT · EPT · Triton">
        <div className="grid-cards">
          {CIRCUITS.map(([t, d]) => (
            <div key={t} className="card card-hover">
              <div className="display" style={{ fontSize: 17 }}>{t}</div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Par theme" title="Toutes les categories">
        <div className="grid-cards">
          {CATEGORIES.map(([t, d]) => (
            <div key={t} className="card card-hover">
              <div className="display" style={{ fontSize: 16 }}>{t}</div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="card" style={{ marginTop: 32, borderColor: "rgba(232,176,75,0.3)" }}>
        <div className="label" style={{ color: "var(--gold)", fontSize: 12 }}>A venir</div>
        <p style={{ marginTop: 8, color: "var(--muted)" }}>
          L&apos;integration video (selection hebdomadaire automatisee, classement par niveau et par
          circuit) est prevue dans la roadmap. En attendant, revois les bases dans la section{" "}
          <Link href="/apprendre" className="link">Apprendre</Link>.
        </p>
      </div>
    </div>
  );
}
