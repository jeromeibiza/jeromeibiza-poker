import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, DealerNote, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Guide du poker en ligne : rooms, bonus, securite, KYC, trackers",
  description:
    "Le guide pour jouer au poker en ligne sereinement : choisir une room, deposer, bonus et " +
    "rakeback, securite, verification KYC et logiciels de tracking (HM3, PokerTracker, DriveHUD).",
  alternates: { canonical: "/poker-en-ligne" },
};

const TOPICS = [
  ["Choisir une room", "Trafic, fiabilite, ergonomie, formats proposes : les criteres qui comptent vraiment."],
  ["Deposer de l'argent", "Methodes de depot, delais, plafonds et bonnes pratiques."],
  ["Les bonus", "Bonus de bienvenue, freerolls et tickets : comment les liberer reellement."],
  ["Le rakeback", "Recuperer une partie du rake : comprendre les programmes de fidelite."],
  ["La securite", "Mot de passe, double authentification, eviter les arnaques."],
  ["La verification KYC", "Pourquoi et comment verifier son identite pour pouvoir retirer."],
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
        intro="Tout ce qu'il faut savoir pour debuter en ligne sans se faire avoir : choisir une plateforme, deposer, comprendre les bonus, securiser son compte et analyser son jeu."
      />

      <Section kicker="Les sujets" title="Le guide, etape par etape">
        <div className="grid-cards">
          {TOPICS.map(([t, d]) => (
            <div key={t} className="card card-hover">
              <div className="display" style={{ fontSize: 16 }}>{t}</div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{d}</p>
              <div className="label" style={{ color: "var(--faint)", fontSize: 11, marginTop: 12 }}>
                Article a venir
              </div>
            </div>
          ))}
        </div>
      </Section>

      <DealerNote>
        Regle numero un avant de deposer le moindre euro : fixe-toi un budget de loisir que tu peux
        perdre, et n&apos;y touche jamais au-dela. Le poker doit rester un plaisir. 18+ — en cas de
        souci avec le jeu, parle-en et fais-toi aider.
      </DealerNote>

      <div className="card" style={{ marginTop: 28, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Avant de jouer en argent reel, entraine-toi gratuitement : le mode jeu gratuit du hub
          arrive bientot. En attendant, revois{" "}
          <Link href="/strategie" className="link">la strategie</Link>.
        </p>
      </div>
    </div>
  );
}
