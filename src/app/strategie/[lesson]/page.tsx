import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonLayout } from "@/components/LessonLayout";
import { PokerTable, type TableSeat } from "@/components/PokerTable";
import { LESSONS, getLesson, LEVEL_LABEL } from "@/lib/poker/strategy";
import { Crumbs, Section, DealerNote, LevelPill, JsonLd } from "@/components/ui";

type Params = { lesson: string };

type Scene = { seats: TableSeat[]; pot?: string; board?: string[]; caption?: string };

/**
 * Une scène de jeu illustrée par cours (mises, pot, board, main du héros).
 * Les cours abstraits (ranges, GTO, exploitant, équilibrage, bankroll) n'ont
 * pas de table : une situation chiffrée n'y apporterait rien.
 */
const SCENES: Record<string, Scene> = {
  "mains-de-depart": {
    seats: [
      { label: "BTN", note: "Bouton", dealer: true },
      { label: "SB", note: "Small blind", tone: "blue" },
      { label: "BB", note: "Big blind", tone: "blue" },
      { label: "UTG", note: "Vous", tone: "gold", cards: ["As", "Ks"], bet: "2,5 BB" },
      { label: "MP" },
      { label: "CO" },
    ],
    pot: "4 BB",
    caption: "En première position avec A-K, on ouvre. Avec une main faible, on se couche : tout part de ce choix.",
  },
  "les-erreurs-du-debutant": {
    seats: [
      { label: "BTN", note: "Bouton", dealer: true },
      { label: "SB", tone: "blue" },
      { label: "BB", tone: "blue" },
      { label: "UTG", note: "Limpe", bet: "1 BB" },
      { label: "MP", note: "Vous", tone: "gold", bet: "1 BB" },
      { label: "CO", note: "Limpe", bet: "1 BB" },
    ],
    pot: "4,5 BB",
    caption: "Limper (juste suivre la grosse blinde) est la fuite numéro un : on entre sans initiative dans le coup.",
  },
  "jouer-en-position": {
    seats: [
      { label: "BTN", note: "Vous, en position", tone: "gold", dealer: true },
      { label: "SB", tone: "blue" },
      { label: "BB", tone: "blue" },
      { label: "UTG", note: "Ouvre", bet: "2,5 BB" },
      { label: "MP" },
      { label: "CO" },
    ],
    pot: "5 BB",
    caption: "Vous suivez au bouton : vous agirez en dernier à chaque tour, l'avantage le plus rentable du poker.",
  },
  "le-c-bet": {
    seats: [
      { label: "BTN", note: "Vous", tone: "gold", dealer: true, bet: "3 BB" },
      { label: "SB", tone: "blue" },
      { label: "BB", note: "A checké", tone: "blue" },
      { label: "UTG" },
      { label: "MP" },
      { label: "CO" },
    ],
    board: ["Qs", "7d", "2c"],
    pot: "6 BB",
    caption: "Vous avez relancé préflop. Sur ce flop sec, vous continuez l'agression : c'est le continuation bet.",
  },
  "le-3-bet": {
    seats: [
      { label: "BTN", note: "Vous, 3-bet", tone: "gold", dealer: true, bet: "9 BB" },
      { label: "SB", tone: "blue" },
      { label: "BB", tone: "blue" },
      { label: "UTG", note: "Ouvre", bet: "2,5 BB" },
      { label: "MP" },
      { label: "CO" },
    ],
    pot: "13 BB",
    caption: "UTG ouvre à 2,5 BB, vous re-relancez à 9 BB au bouton : un 3-bet, pour prendre l'initiative.",
  },
  "le-squeeze": {
    seats: [
      { label: "BTN", note: "Suit", dealer: true, bet: "2,5 BB" },
      { label: "SB", note: "Vous, squeeze", tone: "gold", bet: "12 BB" },
      { label: "BB", tone: "blue" },
      { label: "UTG", note: "Ouvre", bet: "2,5 BB" },
      { label: "MP" },
      { label: "CO" },
    ],
    pot: "18 BB",
    caption: "UTG ouvre, le bouton suit. Depuis la small blind, vous relancez gros : c'est le squeeze.",
  },
  "cotes-et-pot-odds": {
    seats: [
      { label: "BTN", note: "Mise", dealer: true, bet: "5 BB" },
      { label: "SB" },
      { label: "BB", note: "Vous, tirage", tone: "gold", cards: ["Th", "9h"] },
      { label: "UTG" },
      { label: "MP" },
      { label: "CO" },
    ],
    board: ["Ah", "Kh", "7s"],
    pot: "10 BB",
    caption: "Pot de 10 BB, vous devez payer 5 BB pour un tirage couleur. La cote du pot justifie-t-elle le call ?",
  },
  "le-semi-bluff": {
    seats: [
      { label: "BTN", note: "Vous", tone: "gold", dealer: true, bet: "7 BB", cards: ["Qs", "9s"] },
      { label: "SB" },
      { label: "BB", note: "A checké", tone: "blue" },
      { label: "UTG" },
      { label: "MP" },
      { label: "CO" },
    ],
    board: ["Js", "Ts", "4d"],
    pot: "9 BB",
    caption: "Pas encore de main faite, mais un gros tirage. Vous misez : vous gagnez s'il se couche, ou si vous touchez.",
  },
  "les-blockers": {
    seats: [
      { label: "BTN", note: "Vous", tone: "gold", dealer: true, cards: ["As", "Qc"], bet: "12 BB" },
      { label: "SB" },
      { label: "BB", note: "A checké", tone: "blue" },
      { label: "UTG" },
      { label: "MP" },
      { label: "CO" },
    ],
    board: ["Ah", "Qd", "5c", "2s"],
    pot: "16 BB",
    caption: "Vous tenez l'As : l'adversaire a beaucoup moins de mains fortes possibles, votre bluff devient crédible.",
  },
  "la-mdf": {
    seats: [
      { label: "BTN", note: "Mise le pot", dealer: true, bet: "10 BB" },
      { label: "SB" },
      { label: "BB", note: "Vous, défendre ?", tone: "gold" },
      { label: "UTG" },
      { label: "MP" },
      { label: "CO" },
    ],
    board: ["Kd", "8s", "3c", "7h"],
    pot: "10 BB",
    caption: "Face à une mise de la taille du pot, défendez environ la moitié de vos mains pour ne pas vous faire bluffer.",
  },
};

export function generateStaticParams(): Params[] {
  return LESSONS.map((l) => ({ lesson: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lesson: slug } = await params;
  const l = getLesson(slug);
  if (!l) return { title: "Cours introuvable" };
  return {
    title: `${l.title} | Stratégie poker ${LEVEL_LABEL[l.level]}`,
    description: l.summary,
    alternates: { canonical: `/strategie/${l.slug}` },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lesson: slug } = await params;
  const l = getLesson(slug);
  if (!l) notFound();

  const idx = LESSONS.findIndex((x) => x.slug === l.slug);
  const prev = idx > 0 ? LESSONS[idx - 1] : null;
  const next = idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null;

  const learnLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: l.title,
    description: l.summary,
    educationalLevel: LEVEL_LABEL[l.level],
    isPartOf: { "@type": "Course", name: "Stratégie poker, Jérôme Ibiza" },
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
  };

  return (
    <LessonLayout sidebarTitle="Stratégie" indexHref="/strategie" items={LESSONS.map((x) => ({ label: x.short, href: `/strategie/${x.slug}` }))}>
      <JsonLd data={learnLd} />
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Stratégie", href: "/strategie" },
          { label: l.short },
        ]}
      />

      <div style={{ paddingBlock: "20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <LevelPill level={l.level} />
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5.5vw, 48px)", margin: 0, maxWidth: 820 }}>{l.title}</h1>
        <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 14, maxWidth: 720, lineHeight: 1.6 }}>
          {l.summary}
        </p>
      </div>

      {SCENES[l.slug] && <PokerTable {...SCENES[l.slug]} />}

      {l.sections.map((s) => (
        <Section key={s.heading} kicker="Cours" title={s.heading}>
          {s.body && <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7 }}>{s.body}</p>}
          {s.bullets && (
            <ul className="lb" style={{ marginTop: s.body ? 14 : 0 }}>
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </Section>
      ))}

      <Section kicker="À retenir" title="Les points clés">
        <ul className="lb check">
          {l.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Section>

      {l.dealerNote && <div style={{ marginTop: 24 }}><DealerNote>{l.dealerNote}</DealerNote></div>}

      <nav
        style={{
          marginTop: 36,
          display: "flex",
          gap: 12,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {prev ? (
          <Link href={`/strategie/${prev.slug}`} className="btn btn-ghost">
            ← {prev.short}
          </Link>
        ) : (
          <Link href="/strategie" className="btn btn-ghost">← Tous les cours</Link>
        )}
        {next ? (
          <Link href={`/strategie/${next.slug}`} className="btn btn-gold">
            {next.short} →
          </Link>
        ) : (
          <Link href="/strategie" className="btn btn-gold">Retour à la stratégie →</Link>
        )}
      </nav>
    </LessonLayout>
  );
}
