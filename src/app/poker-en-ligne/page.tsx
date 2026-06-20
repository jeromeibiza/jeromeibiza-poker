import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs, PageHero, Section, DealerNote, JsonLd } from "@/components/ui";
import { ARTICLES } from "@/lib/poker/online";

export const metadata: Metadata = {
  title: "Guide du poker en ligne : rooms, bonus, sécurité, KYC, trackers",
  description:
    "Le guide pour jouer au poker en ligne sereinement : choisir une room, déposer et retirer, bonus et " +
    "rakeback, sécurité du compte, vérification KYC et logiciels de tracking. Pédagogique et neutre.",
  alternates: { canonical: "/poker-en-ligne" },
};

export default function PokerEnLignePage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guide du poker en ligne",
    itemListElement: ARTICLES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.title,
      url: `/poker-en-ligne/${a.slug}`,
    })),
  };
  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Poker en ligne" }]} />
      <PageHero
        kicker="Guide pratique"
        title="Jouer au poker en ligne"
        intro="Tout ce qu'il faut savoir pour débuter en ligne sans se faire avoir : choisir une plateforme, déposer, comprendre les bonus, sécuriser son compte et analyser son jeu. Neutre et pédagogique, sans pub déguisée."
      />

      <Section kicker="Le guide" title="Les articles, étape par étape">
        <div className="grid-cards">
          {ARTICLES.map((a) => (
            <Link key={a.slug} href={`/poker-en-ligne/${a.slug}`} className="card card-hover">
              <div className="display" style={{ fontSize: 16 }}>{a.short}</div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{a.summary.split(". ")[0]}.</p>
              <div className="label" style={{ color: "var(--gold)", fontSize: 11, marginTop: 12 }}>
                Lire · {a.minutes} min →
              </div>
            </Link>
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
