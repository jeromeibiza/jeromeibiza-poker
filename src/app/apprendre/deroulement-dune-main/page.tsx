import Link from "next/link";
import type { Metadata } from "next";
import { LessonLayout } from "@/components/LessonLayout";
import { APPRENDRE_NAV } from "@/lib/poker/learn";
import { HandReplayer, type ReplayStep } from "@/components/HandReplayer";
import { Crumbs, PageHero, Section, DealerNote } from "@/components/ui";

export const metadata: Metadata = {
  title: "Déroulement d'une main au poker : préflop, flop, turn, river, showdown",
  description:
    "Suis le déroulement complet d'une main de Texas Hold'em étape par étape : préflop, flop, " +
    "turn, river et showdown, avec un exemple rejouable du début à la fin.",
  alternates: { canonical: "/apprendre/deroulement-dune-main" },
};

const MAIN: ReplayStep[] = [
  {
    tag: "Votre main",
    emoji: "🂡",
    title: "On vous distribue 2 cartes",
    text: "Tout commence par 2 cartes rien que pour vous : l'As et le Roi de pique, le « Big Slick ». L'adversaire a aussi 2 cartes, mais cachées : on voit juste qu'il est en jeu.",
    seats: [
      { label: "VOUS", note: "vos cartes", tone: "gold", dealer: true, cards: ["As", "Ks"], stack: 50 },
      { label: "ADV.", note: "cartes cachées", tone: "blue", hidden: true, stack: 50 },
    ],
    pot: 1.5,
  },
  {
    tag: "Préflop",
    emoji: "🎯",
    title: "Premier tour de mises",
    text: "Avant les cartes du milieu, c'est le premier tour de mises. Avec une si belle main, vous relancez pour prendre l'avantage. L'adversaire paie pour rester dans le coup.",
    seats: [
      { label: "VOUS", note: "vous relancez", tone: "gold", dealer: true, cards: ["As", "Ks"], bet: 3, stack: 47 },
      { label: "ADV.", note: "il suit", tone: "blue", hidden: true, bet: 3, stack: 47 },
    ],
    pot: 7,
  },
  {
    tag: "Le flop",
    emoji: "🃏",
    title: "3 cartes au milieu : Q♠ J♠ 4♦",
    text: "Le croupier retourne 3 cartes communes : le flop. Énorme pour vous ! Avec votre As et Roi de pique, il ne vous manque que le 10 de pique pour la quinte flush royale, la meilleure main du poker. Vous misez pour continuer.",
    seats: [
      { label: "VOUS", note: "vous misez", tone: "gold", dealer: true, cards: ["As", "Ks"], bet: 5, stack: 42 },
      { label: "ADV.", note: "il paie", tone: "blue", hidden: true, stack: 42 },
    ],
    board: ["Qs", "Js", "4d"],
    pot: 17,
  },
  {
    tag: "Le turn",
    emoji: "🃏",
    title: "Une 4ᵉ carte : le 2♣",
    text: "Le 2 de trèfle ne vous donne pas encore votre grosse main, mais vous gardez toutes vos chances (un tirage couleur ET un tirage quinte). Vous continuez à miser, vous avez beaucoup de chances de gagner.",
    seats: [
      { label: "VOUS", note: "vous misez encore", tone: "gold", dealer: true, cards: ["As", "Ks"], bet: 12, stack: 30 },
      { label: "ADV.", note: "il paie", tone: "blue", hidden: true, stack: 30 },
    ],
    board: ["Qs", "Js", "4d", "2c"],
    pot: 41,
  },
  {
    tag: "La river",
    emoji: "✨",
    title: "Le 10♠ ! Quinte flush royale",
    text: "La dernière carte est le 10 de pique : vous complétez A♠ K♠ Q♠ J♠ 10♠, la quinte flush royale ! La main imbattable. Vous misez gros (ou tapis) pour gagner le maximum.",
    seats: [
      { label: "VOUS", note: "tapis !", tone: "gold", dealer: true, cards: ["As", "Ks"], bet: 30, stack: 0 },
      { label: "ADV.", tone: "blue", hidden: true, stack: 30 },
    ],
    board: ["Qs", "Js", "4d", "2c", "Ts"],
    pot: 100,
  },
  {
    tag: "Le showdown",
    emoji: "🏆",
    title: "Vous remportez le pot",
    text: "On retourne les cartes : votre quinte flush royale ne peut être battue par personne. Vous remportez tous les jetons du pot. Voilà une main jouée du début à la fin !",
    seats: [
      { label: "VOUS", note: "gagnant !", tone: "gold", dealer: true, cards: ["As", "Ks"], stack: 0 },
      { label: "ADV.", note: "battu", tone: "blue", hidden: true, stack: 30 },
    ],
    board: ["Qs", "Js", "4d", "2c", "Ts"],
    pot: 100,
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
        <HandReplayer steps={MAIN} defaultUnit="chips" />
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
