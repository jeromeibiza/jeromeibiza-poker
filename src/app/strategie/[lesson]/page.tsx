import Link from "next/link";
import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonLayout } from "@/components/LessonLayout";
import { HandReplayer, type ReplayStep } from "@/components/HandReplayer";
import { type TableSeat } from "@/components/PokerTable";
import { PushFoldChart } from "@/components/PushFoldChart";
import { OutsReference } from "@/components/OutsReference";
import { OddsCalculator } from "@/components/OddsCalculator";
import { RangeExplorer } from "@/components/RangeExplorer";
import { MdfCalculator } from "@/components/MdfCalculator";
import { BlockerViz } from "@/components/BlockerViz";
import { ExploitToggle } from "@/components/ExploitToggle";
import { BankrollCalculator } from "@/components/BankrollCalculator";
import { LESSONS, getLesson, LEVEL_LABEL } from "@/lib/poker/strategy";
import { Crumbs, Section, DealerNote, LevelPill, JsonLd, SeeAlso } from "@/components/ui";
import { autolink } from "@/lib/poker/autolink";

type Params = { lesson: string };

/** Table 6-max : on décrit seulement ce qui change pour chaque siège, le reste
 *  est "en jeu, cartes cachées". Le bouton (D) est toujours sur le siège BTN. */
type Seat6 = Partial<Omit<TableSeat, "label">>;
const POS6 = ["BTN", "SB", "BB", "UTG", "MP", "CO"];
function t6(over: Record<string, Seat6> = {}): TableSeat[] {
  return POS6.map((pos) => {
    // Siège dont l'action est décrite : on prend tel quel (le bouton garde le D).
    if (over[pos]) {
      const base: TableSeat = { label: pos, stack: 100 };
      if (pos === "BTN") base.dealer = true;
      return { ...base, ...over[pos] };
    }
    // Sinon : joueur encore en jeu (cartes cachées). Les blindes SB/BB sont
    // postées pour qu'on voie la structure préflop et qu'on ne se perde pas.
    const base: TableSeat = { label: pos, stack: 100, hidden: true };
    if (pos === "BTN") base.dealer = true;
    if (pos === "SB") {
      base.bet = 0.5;
      base.stack = 99.5;
    }
    if (pos === "BB") {
      base.bet = 1;
      base.stack = 99;
    }
    return base;
  });
}

/**
 * Mains rejouables 6-max, déroulées action par action. Vous = cartes visibles
 * (siège or), adversaires = cartes cachées, joueurs couchés = sans cartes ;
 * le board se dévoile selon la rue. Registre par niveau : débutant = jetons +
 * tout expliqué, intermédiaire = vrais termes + BB, avancé = pas de replayer.
 */
const HANDS: Record<string, ReplayStep[]> = {
  // -------------------- DÉBUTANT --------------------
  "mains-de-depart": [
    {
      tag: "Vos 2 cartes",
      emoji: "🂡",
      title: "On distribue 2 cartes à chacun",
      text: "Chaque joueur reçoit 2 cartes (les autres les gardent cachées). Les vôtres sont superbes : As et Roi de pique. C'est à vous de jouer.",
      seats: t6({ UTG: { tone: "gold", note: "vous", cards: ["As", "Ks"] } }),
      pot: 1.5,
    },
    {
      tag: "Votre décision",
      emoji: "✅",
      title: "Belle main, vous ouvrez",
      text: "Avec une main aussi forte, on relance (on « ouvre ») pour prendre l'avantage. Avec une main faible, genre un 7 et un 2, on jette sans regret.",
      seats: t6({ UTG: { tone: "gold", note: "vous, relance", cards: ["As", "Ks"], bet: 2.5, stack: 97.5 } }),
      pot: 4,
    },
    {
      tag: "La suite",
      emoji: "👀",
      title: "Votre relance fait le ménage",
      text: "Votre relance fait coucher presque tout le monde (ils n'ont plus de cartes). Un seul joueur paie pour voir le flop. Vous avez pris l'initiative du coup.",
      seats: t6({
        UTG: { tone: "gold", note: "vous", cards: ["As", "Ks"], bet: 2.5, stack: 97.5 },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "muted", note: "fold" },
        BTN: { tone: "muted", note: "fold" },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "blue", note: "paie", bet: 2.5, hidden: true },
      }),
      pot: 6,
    },
  ],
  "les-erreurs-du-debutant": [
    {
      tag: "L'erreur classique",
      emoji: "⚠️",
      title: "Un joueur « limpe »",
      text: "Limper, c'est juste payer la mise minimale pour voir le flop pas cher, sans relancer. Ici, UTG limpe. À vous de parler.",
      seats: t6({
        UTG: { tone: "blue", note: "limpe", bet: 1, hidden: true },
        MP: { tone: "gold", note: "vous", cards: ["Kc", "Tc"] },
      }),
      pot: 2.5,
    },
    {
      tag: "Le mauvais réflexe",
      emoji: "👎",
      title: "Limper à votre tour",
      text: "Si vous limpez vous aussi, personne n'a pris les commandes du coup. Vous verrez le flop sans initiative, avec une main moyenne. C'est la fuite numéro un.",
      seats: t6({
        UTG: { tone: "blue", note: "limpe", bet: 1, hidden: true },
        MP: { tone: "gold", note: "limpe aussi", cards: ["Kc", "Tc"], bet: 1, stack: 99 },
      }),
      pot: 3.5,
    },
    {
      tag: "Le bon réflexe",
      emoji: "✅",
      title: "Relancer pour prendre la main",
      text: "Le bon réflexe : si la main vaut le coup, on relance. Ça fait coucher le limpeur et vous prenez l'initiative. Sinon on se couche, mais on ne limpe pas.",
      seats: t6({
        UTG: { tone: "muted", note: "se couche" },
        MP: { tone: "gold", note: "relance !", cards: ["Kc", "Tc"], bet: 4, stack: 96 },
      }),
      pot: 6.5,
    },
  ],
  "jouer-en-position": [
    {
      tag: "L'action vient à vous",
      emoji: "🎯",
      title: "Le cutoff ouvre, vous êtes au bouton",
      text: "UTG et MP se couchent. Le cutoff ouvre. Vous êtes au bouton (jeton D) : la meilleure place, car vous jouez en dernier après le flop.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "blue", note: "ouvre", bet: 2.5, hidden: true },
        BTN: { tone: "gold", note: "vous", cards: ["Ah", "Qc"] },
      }),
      pot: 4,
    },
    {
      tag: "Vous suivez",
      emoji: "👀",
      title: "Call en position",
      text: "Vous payez pour voir le flop, les blindes se couchent. Vous serez « en position » sur l'adversaire : vous agirez toujours après lui.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "blue", bet: 2.5, hidden: true },
        BTN: { tone: "gold", note: "call, en position", cards: ["Ah", "Qc"], bet: 2.5, stack: 97.5 },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "muted", note: "fold" },
      }),
      pot: 6.5,
    },
    {
      tag: "Le flop",
      emoji: "🃏",
      title: "Vous décidez en dernier",
      text: "Le flop tombe. L'adversaire doit parler en premier, à l'aveugle. Vous attendez sa réaction avant d'agir : cette information gratuite, coup après coup, fait gagner gros.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "blue", note: "parle en 1er", hidden: true },
        BTN: { tone: "gold", note: "en dernier", cards: ["Ah", "Qc"] },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "muted", note: "fold" },
      }),
      board: ["Js", "8h", "3c"],
      pot: 6.5,
    },
  ],

  // -------------------- INTERMÉDIAIRE --------------------
  "le-c-bet": [
    {
      tag: "Préflop",
      emoji: "🎯",
      title: "L'action vient à vous, vous ouvrez",
      text: "UTG, MP et CO se couchent. Au bouton avec A-K, vous ouvrez à 2,5 BB.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "muted", note: "fold" },
        BTN: { tone: "gold", note: "vous, open", cards: ["As", "Ks"], bet: 2.5, stack: 97.5 },
      }),
      pot: 4,
    },
    {
      tag: "Préflop",
      emoji: "🛡️",
      title: "La big blind défend",
      text: "La small blind se couche, la big blind paie pour défendre. On voit le flop à deux, vous en position.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "muted", note: "fold" },
        BTN: { tone: "gold", note: "vous", cards: ["As", "Ks"], bet: 2.5, stack: 97.5 },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "blue", note: "défend", bet: 2.5, hidden: true },
      }),
      pot: 5.5,
    },
    {
      tag: "Flop",
      emoji: "🃏",
      title: "Texture sèche, favorable à votre range",
      text: "Q-7-2 rainbow. Ce board sec avantage votre range de relanceur préflop. La big blind check.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "muted", note: "fold" },
        BTN: { tone: "gold", note: "vous", cards: ["As", "Ks"] },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "blue", note: "check", hidden: true },
      }),
      board: ["Qs", "7d", "2c"],
      pot: 6,
    },
    {
      tag: "Continuation bet",
      emoji: "💰",
      title: "C-bet",
      text: "Vous continuez l'agression : c-bet d'environ la moitié du pot. Fold equity élevée, et vous protégez vos meilleures mains.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "muted", note: "fold" },
        BTN: { tone: "gold", note: "c-bet", cards: ["As", "Ks"], bet: 3, stack: 94.5 },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "blue", note: "à parler", hidden: true },
      }),
      board: ["Qs", "7d", "2c"],
      pot: 6,
    },
  ],
  "le-3-bet": [
    {
      tag: "Préflop",
      emoji: "➡️",
      title: "UTG se couche",
      text: "UTG parle en premier (sous le pistolet) et se couche.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        BTN: { tone: "gold", note: "vous", cards: ["As", "5s"] },
      }),
      pot: 1.5,
    },
    {
      tag: "Préflop",
      emoji: "➡️",
      title: "MP se couche",
      text: "Le joueur du milieu (MP) se couche aussi.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        BTN: { tone: "gold", note: "vous", cards: ["As", "5s"] },
      }),
      pot: 1.5,
    },
    {
      tag: "Préflop",
      emoji: "🎯",
      title: "Le cutoff ouvre",
      text: "Le cutoff ouvre à 2,5 BB. À vous, au bouton : payer, jeter, ou relancer par-dessus.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "blue", note: "open", bet: 2.5, hidden: true },
        BTN: { tone: "gold", note: "vous", cards: ["As", "5s"] },
      }),
      pot: 4,
    },
    {
      tag: "Votre 3-bet",
      emoji: "⚡",
      title: "Vous re-relancez (3-bet)",
      text: "Vous 3-bet à 9 BB. Ici en bluff avec A5s : l'As bloque ses AA/AK, et la main se joue bien si on vous paie.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "blue", bet: 2.5, hidden: true },
        BTN: { tone: "gold", note: "3-bet", cards: ["As", "5s"], bet: 9, stack: 91 },
      }),
      pot: 13,
    },
    {
      tag: "Le résultat",
      emoji: "🏆",
      title: "Le cutoff doit se défendre",
      text: "Les blindes se couchent. Le cutoff doit payer beaucoup plus, hors de position, ou abandonner. Vous menez le coup, initiative en main.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "blue", note: "call ou fold", bet: 2.5, hidden: true },
        BTN: { tone: "gold", note: "vous menez", cards: ["As", "5s"], bet: 9, stack: 91 },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "muted", note: "fold" },
      }),
      pot: 13,
    },
  ],
  "le-squeeze": [
    {
      tag: "Préflop",
      emoji: "🎯",
      title: "UTG ouvre",
      text: "UTG ouvre à 2,5 BB.",
      seats: t6({
        UTG: { tone: "blue", note: "open", bet: 2.5, hidden: true },
        BTN: { tone: "gold", note: "vous", cards: ["Ad", "Kd"] },
      }),
      pot: 4,
    },
    {
      tag: "Préflop",
      emoji: "➕",
      title: "Le cutoff suit (cold call)",
      text: "Le cutoff se contente de suivre. Sa range est plafonnée (capped) : avec ses meilleures mains, il aurait 3-bet. C'est la porte ouverte au squeeze.",
      seats: t6({
        UTG: { tone: "blue", bet: 2.5, hidden: true },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "blue", note: "flat", bet: 2.5, hidden: true },
        BTN: { tone: "gold", note: "vous", cards: ["Ad", "Kd"] },
      }),
      pot: 6.5,
    },
    {
      tag: "Le squeeze",
      emoji: "✊",
      title: "Vous relancez fort au bouton",
      text: "Vous squeezez à 12 BB. Vous attaquez deux ranges à la fois, avec du dead money au milieu et un flatteur capped : rentable même sans grosse main.",
      seats: t6({
        UTG: { tone: "blue", note: "à parler", bet: 2.5, hidden: true },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "blue", note: "à parler", bet: 2.5, hidden: true },
        BTN: { tone: "gold", note: "squeeze", cards: ["Ad", "Kd"], bet: 12, stack: 88 },
      }),
      pot: 19,
    },
  ],
  "cotes-et-pot-odds": [
    {
      tag: "Préflop",
      emoji: "🛡️",
      title: "Vous défendez la big blind",
      text: "Le bouton ouvre, ça se couche jusqu'à vous. Vous défendez la big blind avec T9 assorti.",
      seats: t6({
        BTN: { tone: "blue", note: "open", bet: 2.5, hidden: true },
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "muted", note: "fold" },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "gold", note: "vous", cards: ["Th", "9h"], bet: 2.5 },
      }),
      pot: 5.5,
    },
    {
      tag: "Flop",
      emoji: "🃏",
      title: "Tirage couleur (9 outs)",
      text: "A-K-7 à deux cœurs. Vous avez un flush draw (9 outs). Pour l'instant rien de fait, juste le tirage.",
      seats: t6({
        BTN: { tone: "blue", note: "villain", hidden: true },
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "muted", note: "fold" },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "gold", note: "vous", cards: ["Th", "9h"] },
      }),
      board: ["Ah", "Kh", "7s"],
      pot: 6,
    },
    {
      tag: "La mise",
      emoji: "💰",
      title: "Le bouton mise environ le pot",
      text: "Il mise à peu près la taille du pot. Pour rester, vous devez payer. La cote du pot est d'environ 2,2 contre 1.",
      seats: t6({
        BTN: { tone: "blue", note: "bet", bet: 5, hidden: true },
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "muted", note: "fold" },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "gold", note: "payer ?", cards: ["Th", "9h"] },
      }),
      board: ["Ah", "Kh", "7s"],
      pot: 11,
    },
    {
      tag: "La décision",
      emoji: "🧮",
      title: "Cote du pot vs cote du tirage",
      text: "Avec 9 outs vous touchez ~35% sur deux cartes (~1,9 contre 1), mieux que la cote demandée (2,2 contre 1). Sans même compter les implied odds : le call est rentable.",
      seats: t6({
        BTN: { tone: "blue", bet: 5, hidden: true },
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "muted", note: "fold" },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "gold", note: "call", cards: ["Th", "9h"] },
      }),
      board: ["Ah", "Kh", "7s"],
      pot: 11,
    },
  ],
  "le-semi-bluff": [
    {
      tag: "Préflop",
      emoji: "🎯",
      title: "Vous ouvrez au bouton",
      text: "Ça se couche jusqu'à vous. Au bouton avec Q9 de pique (un suited connector), vous ouvrez. La big blind paie.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "muted", note: "fold" },
        BTN: { tone: "gold", note: "vous, open", cards: ["Qs", "9s"], bet: 2.5, stack: 97.5 },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "blue", note: "call", bet: 2.5, hidden: true },
      }),
      pot: 5.5,
    },
    {
      tag: "Flop",
      emoji: "🃏",
      title: "Combo draw monstrueux",
      text: "J-T-4 à deux piques. Tirage quinte par les deux bouts plus flush draw : environ 15 outs, souvent favori face à une simple paire. La big blind check.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "muted", note: "fold" },
        BTN: { tone: "gold", note: "combo draw", cards: ["Qs", "9s"] },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "blue", note: "check", hidden: true },
      }),
      board: ["Js", "Ts", "4d"],
      pot: 6,
    },
    {
      tag: "Semi-bluff",
      emoji: "⚡",
      title: "Vous misez votre tirage",
      text: "Vous misez en semi-bluff : fold equity s'il se couche, plus toute l'équité de votre tirage s'il paie. Avec autant d'outs, c'est la ligne la plus rentable.",
      seats: t6({
        UTG: { tone: "muted", note: "fold" },
        MP: { tone: "muted", note: "fold" },
        CO: { tone: "muted", note: "fold" },
        BTN: { tone: "gold", note: "semi-bluff", cards: ["Qs", "9s"], bet: 6, stack: 91.5 },
        SB: { tone: "muted", note: "fold" },
        BB: { tone: "blue", hidden: true },
      }),
      board: ["Js", "Ts", "4d"],
      pot: 6,
    },
  ],

  // -------------------- AVANCÉ : pas de replayer --------------------
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
  const hand = HANDS[l.slug];
  // Maillage interne : un terme du glossaire n'est lié qu'une fois par page.
  const linked = new Set<string>();

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

      {hand && (
        <Section kicker="Le coup en images" title="Déroulé pas à pas, à la table">
          <p style={{ color: "var(--muted)", marginTop: -4, marginBottom: 14, maxWidth: 620 }}>
            {l.level === "debutant"
              ? "Clique sur « Dérouler la main » pour voir l'action se jouer, joueur par joueur. Tout est expliqué simplement, et tu peux basculer l'affichage en jetons ou en blindes (BB) en haut de la table."
              : "Déroule la main action par action (fold, open, 3-bet...) pour suivre toute la ligne. Bascule l'affichage BB / jetons en haut de la table."}
          </p>
          <HandReplayer steps={hand} defaultUnit={l.level === "debutant" ? "chips" : "bb"} />
        </Section>
      )}

      {l.slug === "push-or-fold-10bb" && (
        <Section kicker="Le mémo" title="Quelles mains pousser à 10 BB">
          <div className="card">
            <PushFoldChart />
          </div>
        </Section>
      )}

      {l.slug === "penser-en-ranges" && (
        <Section kicker="L'outil" title="Les ranges d'ouverture, par position">
          <p style={{ color: "var(--muted)", marginTop: -4, marginBottom: 14 }}>
            Clique sur une position : la grille montre toutes les mains qu&apos;on ouvre depuis ce
            siège. Plus on est proche du bouton, plus la range est large.
          </p>
          <RangeExplorer preset="opening" />
        </Section>
      )}

      {l.slug === "gto-explique" && (
        <Section kicker="L'outil" title="Une range GTO, visualisée">
          <RangeExplorer preset="gto" />
        </Section>
      )}

      {l.slug === "equilibrage-des-ranges" && (
        <Section kicker="L'outil" title="Équilibrée ou prévisible ?">
          <RangeExplorer preset="balance" />
        </Section>
      )}

      {l.slug === "la-mdf" && (
        <Section kicker="L'outil" title="Calculer la défense minimale">
          <MdfCalculator />
        </Section>
      )}

      {l.slug === "les-blockers" && (
        <Section kicker="L'outil" title="Ce que bloque votre carte">
          <BlockerViz />
        </Section>
      )}

      {l.slug === "jeu-exploitant" && (
        <Section kicker="L'outil" title="Ajuster selon l'adversaire">
          <ExploitToggle />
        </Section>
      )}

      {l.slug === "gestion-de-bankroll" && (
        <Section kicker="L'outil" title="Ta bankroll en caves">
          <BankrollCalculator />
        </Section>
      )}

      {l.sections.map((s, i) => (
        <Fragment key={s.heading}>
          <Section kicker="Cours" title={s.heading}>
            {s.body && <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7 }}>{autolink(s.body, linked)}</p>}
            {s.bullets && (
              <ul className="lb" style={{ marginTop: s.body ? 14 : 0 }}>
                {s.bullets.map((b) => (
                  <li key={b}>{autolink(b, linked)}</li>
                ))}
              </ul>
            )}
          </Section>
          {i === 0 && l.partner && (
            <div className="partner-card">
              <span className="partner-glow" aria-hidden />
              <div style={{ position: "relative" }}>
                <span className="partner-badge">★ Partenaire de confiance</span>
                <h2 className="display partner-hook">{l.partner.hook}</h2>
                <div className="label" style={{ color: "var(--gold-soft)", fontSize: 13, marginTop: 6 }}>
                  {l.partner.kind} · {l.partner.name}
                </div>
                <p style={{ color: "var(--fg)", fontSize: 15, marginTop: 12, maxWidth: 640 }}>
                  {l.partner.blurb}
                </p>
                <div style={{ marginTop: 18 }}>
                  <a
                    href={l.partner.url}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="btn btn-gold partner-cta"
                  >
                    Va voir ce qui se passe chez {l.partner.name} →
                  </a>
                </div>
                <p style={{ color: "var(--faint)", fontSize: 12, marginTop: 14, marginBottom: 0 }}>
                  Recommandé par Jérôme. 18+, jouez responsable.
                </p>
              </div>
            </div>
          )}
        </Fragment>
      ))}

      {l.slug === "compter-ses-outs" && (
        <Section kicker="Le mémo" title="Les tirages classiques et leurs outs">
          <OutsReference />
        </Section>
      )}

      {l.slug === "calculer-les-cotes" && (
        <Section kicker="L'outil" title="Calculateur de cote du pot">
          <OddsCalculator />
          <p style={{ color: "var(--muted)", marginTop: 14 }}>
            Tu retrouves aussi tous les{" "}
            <Link href="/calculateurs" className="link">calculateurs du hub ici</Link>.
          </p>
        </Section>
      )}

      <Section kicker="À retenir" title="Les points clés">
        <ul className="lb check">
          {l.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Section>

      {l.dealerNote && <div style={{ marginTop: 24 }}><DealerNote>{l.dealerNote}</DealerNote></div>}

      <SeeAlso
        links={[
          { label: "Le glossaire poker", href: "/glossaire", desc: "Tous les termes de la leçon, définis simplement." },
          { label: "Les calculateurs", href: "/calculateurs", desc: "Cotes, bankroll, ICM, ROI tournoi." },
          { label: "Les formats de poker", href: "/formats", desc: "Où appliquer cette stratégie : cash, MTT, Spin..." },
        ]}
      />

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
