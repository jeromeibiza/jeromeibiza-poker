import Link from "next/link";
import { LessonLayout } from "@/components/LessonLayout";
import { APPRENDRE_NAV } from "@/lib/poker/learn";
import { PokerTable, type TableSeat } from "@/components/PokerTable";
import { HandReplayer, type ReplayStep } from "@/components/HandReplayer";
import type { Metadata } from "next";
import { Hand } from "@/components/PlayingCard";
import { Crumbs, PageHero, Section, DealerNote, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Les règles du poker (Texas Hold'em) expliquées pour débutants",
  description:
    "Apprends les règles du poker Texas Hold'em en 8 minutes : objectif du jeu, déroulement " +
    "d'une main, blindes, tours d'enchères, showdown et vocabulaire essentiel. Simple et illustré.",
  alternates: { canonical: "/apprendre/regles-du-poker" },
};

const FAQ = [
  {
    q: "Quel est le but du poker ?",
    a: "Remporter des jetons, soit en ayant la meilleure main au showdown, soit en faisant coucher tous vos adversaires avant.",
  },
  {
    q: "Combien de cartes reçoit-on au Texas Hold'em ?",
    a: "Chaque joueur reçoit 2 cartes privatives (les cartes fermées), puis 5 cartes communes sont dévoilées au centre.",
  },
  {
    q: "Le poker est-il un jeu de hasard ou d'adresse ?",
    a: "Les deux. Le hasard distribue les cartes, mais sur le long terme ce sont les décisions (mise, position, lecture des adversaires) qui font la différence.",
  },
  {
    q: "Comment débuter au poker quand on n'y connaît rien ?",
    a: "Commencez par mémoriser l'ordre des mains, puis apprenez le déroulement d'une main : blindes, préflop, flop, turn, river et abattage. Entraînez-vous d'abord avec des jetons virtuels, jouez serré, et n'engagez de l'argent réel que lorsque les bases sont acquises.",
  },
  {
    q: "Peut-on jouer au poker gratuitement ?",
    a: "Oui. De nombreuses plateformes, dont ce site, permettent de jouer au poker gratuitement avec des jetons virtuels. C'est la meilleure façon d'apprendre les règles du Texas Hold'em et de s'entraîner sans aucun risque financier.",
  },
  {
    q: "Combien de joueurs faut-il pour jouer au poker ?",
    a: "De 2 à 10 joueurs autour d'une table. On parle de heads-up à 2 joueurs, de 6-max à 6 joueurs (le format le plus courant en ligne) et de full ring jusqu'à 9 ou 10 joueurs.",
  },
];

const HERO: [string, string] = ["As", "Ks"];

/** Construit 6 sièges (Vous au bouton en bas), avec surcharges par index. */
function s6(over: Record<number, Partial<TableSeat>>): TableSeat[] {
  const base: TableSeat[] = [
    { label: "Vous", note: "Bouton", tone: "gold", dealer: true, stack: 100 },
    { label: "SB", stack: 100 },
    { label: "BB", stack: 100 },
    { label: "UTG", stack: 100 },
    { label: "MP", stack: 100 },
    { label: "CO", stack: 100 },
  ];
  return base.map((seat, i) => (over[i] ? { ...seat, ...over[i] } : seat));
}

/** Une main complète en 6-max, action par action, pour grand débutant. */
const DEROULEMENT: ReplayStep[] = [
  {
    tag: "Les blindes",
    emoji: "🔵",
    title: "On pose les blindes",
    text: "Avant la moindre carte, les deux joueurs à gauche du bouton posent une mise obligatoire : la small blind (50 jetons) et la big blind (100 jetons). Ces jetons posés sur le tapis forment déjà le premier pot à gagner.",
    seats: s6({
      1: { bet: 0.5, note: "Small blind", tone: "blue" },
      2: { bet: 1, note: "Big blind", tone: "blue" },
    }),
    pot: 1.5,
  },
  {
    tag: "La donne",
    emoji: "🃏",
    title: "Chaque joueur reçoit 2 cartes",
    text: "Le donneur distribue 2 cartes fermées à chacun. Les vôtres sont visibles : A♠ K♠, une très grosse main. Celles des adversaires restent cachées (dos de carte).",
    seats: s6({
      0: { cards: HERO, note: "Vos cartes" },
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
    emoji: "🙅",
    title: "Les premiers se couchent",
    text: "L'action commence à gauche de la big blind. UTG et MP n'ont pas de bonne main : ils se couchent (fold) et jettent leurs cartes.",
    seats: s6({
      0: { cards: HERO },
      1: { bet: 0.5, hidden: true, tone: "blue" },
      2: { bet: 1, hidden: true, tone: "blue" },
      3: { note: "se couche", tone: "muted" },
      4: { note: "se couche", tone: "muted" },
      5: { hidden: true },
    }),
    pot: 1.5,
  },
  {
    tag: "Préflop",
    emoji: "⬆️",
    title: "Vous relancez au bouton",
    text: "Le cutoff se couche aussi. À vous de jouer : avec A♠ K♠ au bouton, vous relancez (raise) à 250 jetons pour prendre l'initiative. Vos jetons partent sur le tapis.",
    seats: s6({
      0: { cards: HERO, bet: 2.5, note: "relance" },
      1: { bet: 0.5, hidden: true, tone: "blue" },
      2: { bet: 1, hidden: true, tone: "blue" },
      3: { note: "couché", tone: "muted" },
      4: { note: "couché", tone: "muted" },
      5: { note: "se couche", tone: "muted" },
    }),
    pot: 4,
  },
  {
    tag: "Préflop",
    emoji: "🤝",
    title: "La big blind suit",
    text: "La small blind se couche. La big blind décide de payer votre relance (call) : elle complète à 250 jetons. Il ne reste que vous deux pour voir le flop.",
    seats: s6({
      0: { cards: HERO, note: "vous" },
      1: { note: "couché", tone: "muted" },
      2: { bet: 2.5, hidden: true, tone: "blue", note: "suit" },
      3: { note: "couché", tone: "muted" },
      4: { note: "couché", tone: "muted" },
      5: { note: "couché", tone: "muted" },
    }),
    pot: 5.5,
  },
  {
    tag: "Le flop",
    emoji: "🎴",
    title: "Le flop : 3 cartes communes",
    text: "Le donneur retourne les 3 premières cartes communes (entourées en or). K♥ 9♦ 4♣ : vous touchez une paire de Rois ! Elles sont partagées par les deux joueurs encore en jeu.",
    seats: s6({
      0: { cards: HERO, note: "paire de Rois" },
      1: { note: "couché", tone: "muted" },
      2: { hidden: true, note: "Big blind" },
      3: { note: "couché", tone: "muted" },
      4: { note: "couché", tone: "muted" },
      5: { note: "couché", tone: "muted" },
    }),
    board: ["Kh", "9d", "4c"],
    boardHighlight: [0, 1, 2],
    pot: 5.5,
  },
  {
    tag: "Le turn",
    emoji: "🎴",
    title: "Le turn : la 4e carte",
    text: "Une 4e carte commune tombe (en or) : le 7♠. Elle ne vous aide pas mais ne change rien : votre paire de Rois reste devant. Nouveau tour de mises.",
    seats: s6({
      0: { cards: HERO, note: "vous" },
      1: { note: "couché", tone: "muted" },
      2: { hidden: true, note: "Big blind" },
      3: { note: "couché", tone: "muted" },
      4: { note: "couché", tone: "muted" },
      5: { note: "couché", tone: "muted" },
    }),
    board: ["Kh", "9d", "4c", "7s"],
    boardHighlight: [3],
    pot: 5.5,
  },
  {
    tag: "La river",
    emoji: "🎴",
    title: "La river : la 5e carte",
    text: "La 5e et dernière carte commune (en or) : le 2♥. Le tableau est complet. C'est le dernier tour de mises avant de comparer les mains.",
    seats: s6({
      0: { cards: HERO, note: "vous" },
      1: { note: "couché", tone: "muted" },
      2: { hidden: true, note: "Big blind" },
      3: { note: "couché", tone: "muted" },
      4: { note: "couché", tone: "muted" },
      5: { note: "couché", tone: "muted" },
    }),
    board: ["Kh", "9d", "4c", "7s", "2h"],
    boardHighlight: [4],
    pot: 5.5,
  },
  {
    tag: "Le showdown",
    emoji: "🏆",
    title: "L'abattage : la meilleure main gagne",
    text: "Les deux joueurs dévoilent leurs cartes. Votre paire de Rois bat la main de la big blind : vous remportez le pot ! Astuce : sans abattage, il aurait suffi de la faire coucher avant pour gagner.",
    seats: s6({
      0: { cards: HERO, note: "gagne !", tone: "gold" },
      1: { note: "couché", tone: "muted" },
      2: { cards: ["Qh", "Jh"], note: "perd", tone: "muted" },
      3: { note: "couché", tone: "muted" },
      4: { note: "couché", tone: "muted" },
      5: { note: "couché", tone: "muted" },
    }),
    board: ["Kh", "9d", "4c", "7s", "2h"],
    pot: 5.5,
  },
];

export default function ReglesPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <LessonLayout sidebarTitle="Apprendre" indexHref="/apprendre" items={APPRENDRE_NAV}>
      <JsonLd data={faqLd} />
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Apprendre", href: "/apprendre" },
          { label: "Les règles du poker" },
        ]}
      />
      <PageHero
        kicker="Apprendre · Leçon 1"
        title="Les règles du poker"
        intro="On apprend ici le Texas Hold'em No-Limit, la variante la plus jouée au monde. En 8 minutes, tu sauras tout ce qu'il faut pour t'asseoir à une table et jouer ta première main sans te tromper."
      />

      <Section kicker="L'essentiel en une phrase" title="L'objectif du jeu">
        <div className="card">
          <p style={{ color: "var(--fg)", fontSize: 17 }}>
            Le but est simple : <strong>gagner des jetons</strong>. Deux façons d&apos;y arriver :
            avoir la <strong>meilleure main</strong>{" "}au moment de l&apos;abattage (le showdown),
            ou faire <strong>coucher</strong>{" "}tous vos adversaires grâce à vos mises avant
            d&apos;en arriver là.
          </p>
        </div>
      </Section>

      <Section kicker="Le matériel" title="La table, les cartes, les jetons">
        <ul className="lb">
          <li>Un jeu de <strong>52 cartes</strong> (sans les jokers).</li>
          <li>De 2 à 10 joueurs autour d&apos;une table.</li>
          <li>Un <strong>bouton</strong> (le « dealer button ») qui tourne dans le sens horaire à chaque main et détermine l&apos;ordre de jeu.</li>
          <li>Des <strong>jetons</strong> qui représentent la valeur misée.</li>
        </ul>
        <PokerTable
          center="Cartes communes"
          caption="Une table de poker : de 2 à 10 joueurs autour du tapis, le bouton (D) qui tourne à chaque main, et les cartes communes au centre, partagées par tout le monde."
          seats={[
            { label: "Vous", note: "Votre siège", tone: "blue" },
            { label: "J2" },
            { label: "J3" },
            { label: "J4", note: "Donneur", tone: "gold", dealer: true },
            { label: "J5" },
            { label: "J6" },
          ]}
        />
      </Section>

      <Section kicker="Pas à pas" title="Le déroulement d'une main">
        <p style={{ color: "var(--muted)", marginTop: -4, marginBottom: 16 }}>
          Suis une main complète à 6 joueurs, étape par étape. Clique sur un numéro (ou sur
          « Suivant ») pour avancer : tu vois les blindes, la distribution des cartes, les actions de
          chaque joueur (se coucher, relancer, suivre), puis le flop, le turn, la river et
          l&apos;abattage. La carte qui vient de tomber est entourée en or.
        </p>
        <HandReplayer steps={DEROULEMENT} numbered defaultUnit="chips" />
        <p style={{ color: "var(--muted)", marginTop: 14 }}>
          Tu veux le détail de chaque tour avec exemples ?{" "}
          <Link href="/apprendre/deroulement-dune-main" className="link">Voir le déroulement complet d&apos;une main →</Link>
        </p>
      </Section>

      <Section kicker="Composer sa main" title="2 cartes en main + 5 au centre">
        <div className="card">
          <p style={{ color: "var(--muted)" }}>
            Tu composes ta meilleure main de <strong>5 cartes</strong> parmi les 7 disponibles
            (tes 2 cartes + les 5 communes). Exemple : avec A♠ K♠ en main et un tableau
            Q♠ J♠ 10♠, tu réunis A♠ K♠ Q♠ J♠ 10♠, la quinte flush royale, la main imbattable.
          </p>
          <div style={{ marginTop: 14 }}>
            <Hand cards={["As", "Ks", "Qs", "Js", "Ts"]} size={0.85} />
          </div>
          <p style={{ color: "var(--muted)", marginTop: 12 }}>
            Apprends à reconnaître toutes les combinaisons sur la page{" "}
            <Link href="/apprendre/classement-des-mains" className="link">classement des mains</Link>.
          </p>
        </div>
      </Section>

      <Section kicker="Pour bien débuter" title="Comment jouer au poker quand on débute">
        <div className="card" style={{ display: "grid", gap: 14 }}>
          <p style={{ color: "var(--muted)" }}>
            Apprendre à jouer au poker commence presque toujours par le <strong>Texas Hold&apos;em</strong>,
            la variante la plus jouée au monde. Le principe est accessible à n&apos;importe quel
            débutant : vous recevez deux cartes, vous les combinez avec les cinq cartes communes, et
            vous formez la meilleure main de cinq cartes possible. Pas besoin de tout retenir d&apos;un
            coup, les règles du poker tiennent en quelques minutes et le reste s&apos;apprend en jouant.
          </p>
          <p style={{ color: "var(--muted)" }}>
            Pour vos premières parties, gardez trois réflexes : connaître l&apos;<strong>ordre des mains</strong>{" "}
            (de la simple paire à la quinte flush royale), comprendre les <strong>blindes</strong>{" "}et
            les <strong>positions</strong>, et ne jouer que des mains solides au début. Vous pouvez{" "}
            <strong>jouer au poker gratuitement</strong>, avec des jetons virtuels, pour vous entraîner
            sans aucun risque avant de passer à des parties plus sérieuses.
          </p>
          <p style={{ color: "var(--muted)" }}>
            Le Texas Hold&apos;em se joue de 2 à 10 joueurs, en <strong>cash game</strong>{" "}(on entre
            et sort de la partie quand on veut) ou en <strong>tournoi</strong>{" "}(élimination jusqu&apos;au
            dernier joueur). Quelle que soit la formule, le déroulement d&apos;une main reste le même :
            blindes, préflop, flop, turn, river, puis abattage. Une fois ces étapes maîtrisées, vous
            êtes prêt à vous asseoir à n&apos;importe quelle table de poker.
          </p>
        </div>
      </Section>

      <Section kicker="Le vocabulaire de base" title="Les mots à connaître tout de suite">
        <div className="grid-cards">
          {[
            ["Check", "Passer son tour sans miser (possible si personne n'a misé avant vous)."],
            ["Bet / Mise", "Être le premier à miser sur un tour."],
            ["Call / Suivre", "Égaler la mise en cours pour rester dans le coup."],
            ["Raise / Relancer", "Augmenter la mise en cours."],
            ["Fold / Coucher", "Jeter ses cartes et abandonner la main."],
            ["All-in / Tapis", "Miser tous ses jetons."],
            ["Pot", "L'ensemble des jetons misés, à remporter."],
            ["Bluff", "Miser fort avec une main faible pour faire coucher l'adversaire."],
          ].map(([t, d]) => (
            <div key={t} className="card">
              <div className="display" style={{ fontSize: 16 }}>{t}</div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 6 }}>{d}</p>
            </div>
          ))}
        </div>
        <p style={{ color: "var(--muted)", marginTop: 14 }}>
          Plus de 300 termes expliqués dans le{" "}
          <Link href="/glossaire" className="link">glossaire poker complet</Link>.
        </p>
      </Section>

      <Section kicker="Un peu d'histoire" title="D'où vient le poker ?">
        <p style={{ color: "var(--muted)" }}>
          Le poker moderne naît au XIXe siècle sur les bateaux à vapeur du Mississippi, hérité de
          jeux européens comme le « poque » français et le « primero » espagnol. Le Texas
          Hold&apos;em, lui, apparaît au début du XXe siècle au Texas, puis explose mondialement
          dans les années 2000 avec la diffusion télévisée des World Series of Poker et l&apos;essor
          du poker en ligne.
        </p>
      </Section>

      <Section kicker="FAQ" title="Questions fréquentes">
        <div style={{ display: "grid", gap: 12 }}>
          {FAQ.map((f) => (
            <details key={f.q} className="card">
              <summary style={{ cursor: "pointer", fontWeight: 600 }}>{f.q}</summary>
              <p style={{ color: "var(--muted)", marginTop: 10 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <DealerNote>
        Mon conseil de croupier pour ta première partie : ne joue que des mains solides et reste
        attentif à ta position. Tu perdras moins de jetons en te couchant souvent qu&apos;en voulant
        jouer tous les coups. La patience, c&apos;est déjà 50 % du poker.
      </DealerNote>

      <div className="card" style={{ marginTop: 24, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Leçon suivante :{" "}
          <Link href="/apprendre/classement-des-mains" className="link">le classement des mains →</Link>
        </p>
      </div>
    </LessonLayout>
  );
}
