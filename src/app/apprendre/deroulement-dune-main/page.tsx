import Link from "next/link";
import type { Metadata } from "next";
import { LessonLayout } from "@/components/LessonLayout";
import { APPRENDRE_NAV } from "@/lib/poker/learn";
import { HandReplayer, type ReplayStep } from "@/components/HandReplayer";
import type { TableSeat } from "@/components/PokerTable";
import { Crumbs, PageHero, Section, DealerNote } from "@/components/ui";

export const metadata: Metadata = {
  title: "Déroulement d'une main au poker : préflop, flop, turn, river, showdown",
  description:
    "Suis le déroulement complet d'une main de Texas Hold'em étape par étape : préflop, flop, " +
    "turn, river et showdown, avec un exemple rejouable du début à la fin.",
  alternates: { canonical: "/apprendre/deroulement-dune-main" },
};

const HERO: [string, string] = ["As", "Ks"];

/** Construit 6 sièges (VOUS au bouton en bas), avec surcharges par index. */
function s6(over: Record<number, Partial<TableSeat>>): TableSeat[] {
  const base: TableSeat[] = [
    { label: "VOUS", note: "Bouton", tone: "gold", dealer: true, stack: 100 },
    { label: "SB", stack: 100 },
    { label: "BB", stack: 100 },
    { label: "UTG", stack: 100 },
    { label: "MP", stack: 100 },
    { label: "CO", stack: 100 },
  ];
  return base.map((seat, i) => (over[i] ? { ...seat, ...over[i] } : seat));
}

const MAIN: ReplayStep[] = [
  {
    tag: "Votre main",
    emoji: "🂡",
    title: "On vous distribue 2 cartes",
    text: "Tout commence par 2 cartes rien que pour vous : l'As et le Roi de pique, le « Big Slick ». Les 5 adversaires ont aussi 2 cartes, mais cachées. Les blindes sont déjà posées (SB et BB).",
    seats: s6({
      0: { cards: HERO, note: "vos cartes" },
      1: { bet: 0.5, hidden: true, tone: "blue" },
      2: { bet: 1, hidden: true, tone: "blue" },
      3: { hidden: true },
      4: { hidden: true },
      5: { hidden: true },
    }),
    pot: 1.5,
  },
  {
    tag: "Préflop",
    emoji: "🎯",
    title: "Premier tour de mises : vous relancez",
    text: "UTG, MP et CO se couchent. Avec une si belle main au bouton, vous relancez pour prendre l'avantage. La small blind se couche, mais la big blind paie pour rester dans le coup. Vous voilà tous les deux.",
    seats: s6({
      0: { cards: HERO, bet: 2.5, note: "vous relancez" },
      1: { note: "couché", tone: "muted" },
      2: { bet: 2.5, hidden: true, tone: "blue", note: "il suit" },
      3: { note: "couché", tone: "muted" },
      4: { note: "couché", tone: "muted" },
      5: { note: "couché", tone: "muted" },
    }),
    pot: 5.5,
  },
  {
    tag: "Le flop",
    emoji: "🃏",
    title: "3 cartes au milieu : Q♠ J♠ 4♦",
    text: "Le croupier retourne 3 cartes communes : le flop (entourées en or). Énorme pour vous ! Avec votre As et Roi de pique, il ne vous manque que le 10 de pique pour la quinte flush royale, la meilleure main du poker. Vous misez pour continuer.",
    seats: s6({
      0: { cards: HERO, bet: 4, note: "vous misez" },
      1: { note: "couché", tone: "muted" },
      2: { hidden: true, note: "il paie" },
      3: { note: "couché", tone: "muted" },
      4: { note: "couché", tone: "muted" },
      5: { note: "couché", tone: "muted" },
    }),
    board: ["Qs", "Js", "4d"],
    boardHighlight: [0, 1, 2],
    pot: 13.5,
  },
  {
    tag: "Le turn",
    emoji: "🃏",
    title: "Une 4ᵉ carte : le 2♣",
    text: "Le 2 de trèfle (en or) ne vous donne pas encore votre grosse main, mais vous gardez toutes vos chances : un tirage couleur ET un tirage quinte. Vous continuez à miser, vous avez beaucoup de chances de gagner.",
    seats: s6({
      0: { cards: HERO, bet: 9, note: "vous misez encore" },
      1: { note: "couché", tone: "muted" },
      2: { hidden: true, note: "il paie" },
      3: { note: "couché", tone: "muted" },
      4: { note: "couché", tone: "muted" },
      5: { note: "couché", tone: "muted" },
    }),
    board: ["Qs", "Js", "4d", "2c"],
    boardHighlight: [3],
    pot: 31.5,
  },
  {
    tag: "La river",
    emoji: "✨",
    title: "Le 10♠ ! Quinte flush royale",
    text: "La dernière carte est le 10 de pique (en or) : vous complétez A♠ K♠ Q♠ J♠ 10♠, la quinte flush royale ! La main imbattable. Vous misez gros, à tapis, pour gagner le maximum.",
    seats: s6({
      0: { cards: HERO, bet: 30, note: "tapis !" },
      1: { note: "couché", tone: "muted" },
      2: { hidden: true, note: "à lui de jouer" },
      3: { note: "couché", tone: "muted" },
      4: { note: "couché", tone: "muted" },
      5: { note: "couché", tone: "muted" },
    }),
    board: ["Qs", "Js", "4d", "2c", "Ts"],
    boardHighlight: [4],
    pot: 90,
  },
  {
    tag: "Le showdown",
    emoji: "🏆",
    title: "Vous remportez le pot",
    text: "On retourne les cartes : la big blind avait un brelan de Dames, une grosse main. Mais votre quinte flush royale ne peut être battue par personne. Vous remportez tout le pot. Voilà une main jouée du début à la fin !",
    seats: s6({
      0: { cards: HERO, note: "gagnant !", tone: "gold" },
      1: { note: "couché", tone: "muted" },
      2: { cards: ["Qh", "Qd"], note: "brelan, battu", tone: "muted" },
      3: { note: "couché", tone: "muted" },
      4: { note: "couché", tone: "muted" },
      5: { note: "couché", tone: "muted" },
    }),
    board: ["Qs", "Js", "4d", "2c", "Ts"],
    pot: 90,
  },
];

export default function DeroulementPage() {
  return (
    <LessonLayout sidebarTitle="Apprendre" indexHref="/apprendre" items={APPRENDRE_NAV}>
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Apprendre", href: "/apprendre" },
          { label: "Déroulement d'une main" },
        ]}
      />
      <PageHero
        kicker="Apprendre · Leçon 5"
        title="Le déroulement d'une main"
        intro="Une main de Texas Hold'em se joue en cinq temps. On suit ici un exemple complet, du début à la fin : vous avez A♠ K♠. Déroule la main pour voir l'action se construire, tour après tour."
      />

      <Section kicker="Le coup en images" title="La main, déroulée pas à pas">
        <p style={{ color: "var(--muted)", marginTop: -4, marginBottom: 14, maxWidth: 620 }}>
          Clique sur « Dérouler la main » : les cartes du milieu se dévoilent une à une (flop, turn,
          river) et tout est expliqué en direct. Tu peux basculer l&apos;affichage en jetons ou en
          blindes (BB) en haut de la table.
        </p>
        <HandReplayer steps={MAIN} numbered defaultUnit="chips" />
      </Section>

      <DealerNote>
        L&apos;ordre des tours est toujours le même : préflop, flop, turn, river, puis showdown. Entre
        chaque carte commune, il y a un tour de mises. Mémorise ce rythme, c&apos;est la colonne
        vertébrale de chaque main que tu joueras.
      </DealerNote>

      <div className="card" style={{ marginTop: 24, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Tu maîtrises les bases ! Passe maintenant à la{" "}
          <Link href="/strategie" className="link">stratégie poker →</Link>{" "}ou apprends à
          distribuer avec l&apos;<Link href="/academie-croupier" className="link">académie croupier</Link>.
        </p>
      </div>
    </LessonLayout>
  );
}
