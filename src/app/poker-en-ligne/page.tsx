import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, DealerNote, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Guide du poker en ligne : rooms, bonus, sécurité, KYC, trackers",
  description:
    "Le guide pour jouer au poker en ligne sereinement : choisir une room, déposer, bonus et " +
    "rakeback, sécurité, vérification KYC et logiciels de tracking (HM3, PokerTracker, DriveHUD).",
  alternates: { canonical: "/poker-en-ligne" },
};

const TOPICS = [
  ["Choisir une room", "Trafic, fiabilité, ergonomie, formats proposés : les critères qui comptent vraiment."],
  ["Déposer de l'argent", "Méthodes de dépôt, délais, plafonds et bonnes pratiques."],
  ["Les bonus", "Bonus de bienvenue, freerolls et tickets : comment les libérer réellement."],
  ["Le rakeback", "Récupérer une partie du rake : comprendre les programmes de fidélité."],
  ["La sécurité", "Mot de passe, double authentification, éviter les arnaques."],
  ["La vérification KYC", "Pourquoi et comment vérifier son identité pour pouvoir retirer."],
  ["Les trackers", "HM3, PokerTracker, DriveHUD : analyser ses mains et celles des adversaires."],
];

export default function PokerEnLignePage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guide du poker en ligne",
  };
  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Poker en ligne" }]} />
      <PageHero
        kicker="Guide pratique"
        title="Jouer au poker en ligne"
        intro="Tout ce qu'il faut savoir pour débuter en ligne sans se faire avoir : choisir une plateforme, déposer, comprendre les bonus, sécuriser son compte et analyser son jeu."
      />

      <Section kicker="Les sujets" title="Le guide, étape par étape">
        <div className="grid-cards">
          {TOPICS.map(([t, d]) => (
            <div key={t} className="card card-hover">
              <div className="display" style={{ fontSize: 16 }}>{t}</div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{d}</p>
              <div className="label" style={{ color: "var(--faint)", fontSize: 11, marginTop: 12 }}>
                Article à venir
              </div>
            </div>
          ))}
        </div>
      </Section>

      <DealerNote>
        Règle numéro un avant de déposer le moindre euro : fixe-toi un budget de loisir que tu peux
        perdre, et n&apos;y touche jamais au-delà. Le poker doit rester un plaisir. 18+, en cas de
        souci avec le jeu, parles-en et fais-toi aider.
      </DealerNote>

      <div className="card" style={{ marginTop: 28, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Avant de jouer en argent réel, entraîne-toi gratuitement : le mode jeu gratuit du hub
          arrive bientôt. En attendant, revois{" "}
          <Link href="/strategie" className="link">la stratégie</Link>.
        </p>
      </div>
    </div>
  );
}
