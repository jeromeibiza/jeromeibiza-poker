import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonLayout } from "@/components/LessonLayout";
import { HandReplayer, type ReplayStep } from "@/components/HandReplayer";
import { LESSONS, getLesson, LEVEL_LABEL } from "@/lib/poker/strategy";
import { Crumbs, Section, DealerNote, LevelPill, JsonLd } from "@/components/ui";

type Params = { lesson: string };

/**
 * Mains rejouables. Chaque joueur en jeu a des cartes (vous = face visible,
 * adversaires = face cachée) ; le board se dévoile selon la rue. Registre par
 * niveau : débutant = jetons + tout expliqué, intermédiaire = vrais termes + BB,
 * avancé = pas de replayer. Montants en BB ; bascule BB / jetons sur la table.
 */
const HANDS: Record<string, ReplayStep[]> = {
  // -------------------- DÉBUTANT --------------------
  "mains-de-depart": [
    {
      tag: "Vos 2 cartes",
      emoji: "🂡",
      title: "On vous distribue 2 cartes",
      text: "Au poker, tout commence par 2 cartes rien que pour vous (l'adversaire a les siennes, cachées). Ici : un As et un Roi de pique. Une très belle main de départ.",
      seats: [
        { label: "VOUS", note: "vos cartes", tone: "gold", dealer: true, cards: ["As", "Ks"], stack: 50 },
        { label: "ADV.", note: "cartes cachées", tone: "blue", hidden: true, stack: 50 },
      ],
      pot: 1.5,
    },
    {
      tag: "Votre décision",
      emoji: "✅",
      title: "Belle main, on attaque",
      text: "Avec une main aussi forte, on n'hésite pas : on relance pour prendre l'avantage. Avec une main faible (genre 7 et 2), on jette sans regret. Bien choisir au départ, c'est déjà l'essentiel.",
      seats: [
        { label: "VOUS", note: "vous relancez", tone: "gold", dealer: true, cards: ["As", "Ks"], bet: 2.5, stack: 47.5 },
        { label: "ADV.", note: "à lui de payer", tone: "blue", hidden: true, stack: 50 },
      ],
      pot: 4,
    },
  ],
  "les-erreurs-du-debutant": [
    {
      tag: "L'erreur classique",
      emoji: "⚠️",
      title: "« Limper » : payer sans relancer",
      text: "Limper, c'est payer la mise minimale pour voir les cartes du milieu pas cher. Ici, deux joueurs limpent. On voit que tout le monde est encore en jeu (chacun a ses cartes).",
      seats: [
        { label: "VOUS", note: "vos cartes", tone: "gold", dealer: true, cards: ["Kc", "Tc"], stack: 50 },
        { label: "J. A", note: "limpe", tone: "blue", hidden: true, bet: 1, stack: 49 },
        { label: "J. B", note: "limpe", tone: "blue", hidden: true, bet: 1, stack: 49 },
      ],
      pot: 2.5,
    },
    {
      tag: "Pourquoi c'est mauvais",
      emoji: "👎",
      title: "Vous entrez sans plan",
      text: "Si vous limpez vous aussi, personne n'a pris les commandes du coup. Vous verrez le flop avec une main moyenne, sans initiative. C'est presque toujours celui qui ose relancer qui contrôle la main.",
      seats: [
        { label: "VOUS", note: "limpe aussi", tone: "gold", dealer: true, cards: ["Kc", "Tc"], bet: 1, stack: 49 },
        { label: "J. A", tone: "blue", hidden: true, stack: 49 },
        { label: "J. B", tone: "blue", hidden: true, stack: 49 },
      ],
      pot: 3.5,
    },
    {
      tag: "Le bon réflexe",
      emoji: "✅",
      title: "Relancez, ou couchez-vous",
      text: "La règle toute simple : si votre main vaut le coup, on relance pour prendre l'avantage. Ici, les deux limpeurs se couchent (ils n'ont plus de cartes). Entre relancer et se coucher, le limp est presque toujours une fuite.",
      seats: [
        { label: "VOUS", note: "relance !", tone: "gold", dealer: true, cards: ["Kc", "Tc"], bet: 4, stack: 46 },
        { label: "J. A", note: "se couche", tone: "muted", stack: 49 },
        { label: "J. B", note: "se couche", tone: "muted", stack: 49 },
      ],
      pot: 6.5,
    },
  ],
  "jouer-en-position": [
    {
      tag: "Avant les cartes du milieu",
      emoji: "🎯",
      title: "L'adversaire parle avant vous",
      text: "L'adversaire attaque en misant. Vous, vous êtes « au bouton » (le jeton D) : la meilleure place, parce que vous jouez toujours en dernier.",
      seats: [
        { label: "VOUS", note: "vous, au bouton", tone: "gold", dealer: true, cards: ["Ah", "Qc"], stack: 50 },
        { label: "ADV.", note: "il ouvre", tone: "blue", hidden: true, bet: 2.5, stack: 47.5 },
      ],
      pot: 4,
    },
    {
      tag: "Vous suivez",
      emoji: "👀",
      title: "Vous payez et vous observez",
      text: "Vous payez pour voir la suite. Comme vous parlez après lui à chaque tour, vous voyez toujours ce qu'il fait AVANT de décider quoi que ce soit.",
      seats: [
        { label: "VOUS", note: "en position", tone: "gold", dealer: true, cards: ["Ah", "Qc"], stack: 47.5 },
        { label: "ADV.", tone: "blue", hidden: true, stack: 47.5 },
      ],
      pot: 5.5,
    },
    {
      tag: "Le flop",
      emoji: "🃏",
      title: "L'avantage devient évident",
      text: "Trois cartes apparaissent au milieu. L'adversaire doit parler en premier, à l'aveugle. Vous, vous attendez de voir sa réaction avant d'agir. Cette information gratuite, coup après coup, fait gagner beaucoup d'argent.",
      seats: [
        { label: "VOUS", note: "vous décidez en dernier", tone: "gold", dealer: true, cards: ["Ah", "Qc"], stack: 47.5 },
        { label: "ADV.", note: "parle en premier", tone: "blue", hidden: true, stack: 47.5 },
      ],
      board: ["Js", "8h", "3c"],
      pot: 5.5,
    },
  ],

  // -------------------- INTERMÉDIAIRE --------------------
  "le-c-bet": [
    {
      tag: "Préflop",
      emoji: "🎯",
      title: "Open au bouton",
      text: "Vous ouvrez au bouton avec A-K, la big blind défend. Vous avez l'initiative et la position : deux atouts pour la suite.",
      seats: [
        { label: "BTN", note: "vous", tone: "gold", dealer: true, cards: ["As", "Ks"], bet: 2.5, stack: 100 },
        { label: "BB", note: "défend", tone: "blue", hidden: true, bet: 1, stack: 100 },
      ],
      pot: 5.5,
    },
    {
      tag: "Flop",
      emoji: "🃏",
      title: "Texture sèche, favorable à votre range",
      text: "Q-7-2 rainbow. Ce board sec avantage votre range de relanceur préflop : plus de top paires et de grosses paires que la big blind, qui check.",
      seats: [
        { label: "BTN", tone: "gold", dealer: true, cards: ["As", "Ks"], stack: 97.5 },
        { label: "BB", note: "check", tone: "blue", hidden: true, stack: 97.5 },
      ],
      board: ["Qs", "7d", "2c"],
      pot: 6,
    },
    {
      tag: "Continuation bet",
      emoji: "💰",
      title: "C-bet",
      text: "Vous continuez l'agression avec un c-bet d'environ la moitié du pot. Sur cette texture, l'adversaire doit souvent se coucher : votre fold equity est élevée.",
      seats: [
        { label: "BTN", note: "c-bet", tone: "gold", dealer: true, cards: ["As", "Ks"], bet: 3, stack: 94.5 },
        { label: "BB", note: "souvent fold", tone: "blue", hidden: true, stack: 97.5 },
      ],
      board: ["Qs", "7d", "2c"],
      pot: 6,
    },
  ],
  "le-3-bet": [
    {
      tag: "Préflop",
      emoji: "🎯",
      title: "UTG ouvre",
      text: "UTG open. En première position, sa range d'ouverture est plutôt serrée.",
      seats: [
        { label: "BTN", note: "vous", tone: "gold", dealer: true, cards: ["As", "5s"], stack: 100 },
        { label: "UTG", note: "open", tone: "blue", hidden: true, bet: 2.5, stack: 100 },
      ],
      pot: 4,
    },
    {
      tag: "Votre 3-bet",
      emoji: "⚡",
      title: "Re-relance par-dessus",
      text: "Au bouton, vous 3-bet. Ici en bluff avec A5s : l'As bloque ses AA/AK (il a moins de chances de les avoir), et la main se joue bien si on vous paie.",
      seats: [
        { label: "BTN", note: "3-bet", tone: "gold", dealer: true, cards: ["As", "5s"], bet: 9, stack: 91 },
        { label: "UTG", tone: "blue", hidden: true, bet: 2.5, stack: 97.5 },
      ],
      pot: 13,
    },
    {
      tag: "Le résultat",
      emoji: "🏆",
      title: "Initiative et avantage de range",
      text: "UTG doit se défendre hors de position face à votre 3-bet. Vous gardez l'initiative et, sur la majorité des flops, l'avantage de range.",
      seats: [
        { label: "BTN", note: "vous menez", tone: "gold", dealer: true, cards: ["As", "5s"], bet: 9, stack: 91 },
        { label: "UTG", note: "call ou fold", tone: "blue", hidden: true, bet: 2.5, stack: 97.5 },
      ],
      pot: 13,
    },
  ],
  "le-squeeze": [
    {
      tag: "Préflop",
      emoji: "🎯",
      title: "UTG ouvre",
      text: "UTG open en première position.",
      seats: [
        { label: "BTN", note: "vous", tone: "gold", dealer: true, cards: ["Ad", "Kd"], stack: 100 },
        { label: "UTG", note: "open", tone: "blue", hidden: true, bet: 2.5, stack: 100 },
        { label: "CO", note: "à parler", tone: "muted", hidden: true, stack: 100 },
      ],
      pot: 4,
    },
    {
      tag: "Cold call",
      emoji: "➕",
      title: "Le cutoff se contente de suivre",
      text: "Le CO flat l'open : sa range est plafonnée (capped), avec ses meilleures mains il aurait 3-bet. C'est cette faiblesse qui ouvre la porte au squeeze.",
      seats: [
        { label: "BTN", note: "vous", tone: "gold", dealer: true, cards: ["Ad", "Kd"], stack: 100 },
        { label: "UTG", tone: "blue", hidden: true, bet: 2.5, stack: 97.5 },
        { label: "CO", note: "flat", tone: "blue", hidden: true, bet: 2.5, stack: 97.5 },
      ],
      pot: 6.5,
    },
    {
      tag: "Le squeeze",
      emoji: "✊",
      title: "Vous relancez fort au bouton",
      text: "Vous squeezez (re-relancez gros). Vous attaquez deux ranges à la fois, avec du dead money déjà au milieu et un flatteur capped : rentable même sans grosse main.",
      seats: [
        { label: "BTN", note: "squeeze", tone: "gold", dealer: true, cards: ["Ad", "Kd"], bet: 12, stack: 88 },
        { label: "UTG", tone: "muted", hidden: true, bet: 2.5, stack: 97.5 },
        { label: "CO", tone: "muted", hidden: true, bet: 2.5, stack: 97.5 },
      ],
      pot: 19,
    },
  ],
  "cotes-et-pot-odds": [
    {
      tag: "Flop",
      emoji: "🃏",
      title: "Tirage couleur (9 outs)",
      text: "A-K-7 à deux cœurs. Vous tenez T9 de cœur : un flush draw, soit 9 outs pour compléter votre couleur.",
      seats: [
        { label: "BB", note: "vous", tone: "gold", cards: ["Th", "9h"], stack: 100 },
        { label: "BTN", note: "villain", tone: "blue", dealer: true, hidden: true, stack: 100 },
      ],
      board: ["Ah", "Kh", "7s"],
      pot: 6,
    },
    {
      tag: "La mise",
      emoji: "💰",
      title: "Villain mise environ le pot",
      text: "Il mise à peu près la taille du pot. Pour rester et voir la carte suivante, vous devez payer. La cote du pot est d'environ 2,2 contre 1.",
      seats: [
        { label: "BB", note: "payer ?", tone: "gold", cards: ["Th", "9h"], stack: 100 },
        { label: "BTN", note: "bet", tone: "blue", dealer: true, hidden: true, bet: 5, stack: 95 },
      ],
      board: ["Ah", "Kh", "7s"],
      pot: 11,
    },
    {
      tag: "La décision",
      emoji: "🧮",
      title: "Cote du pot vs cote du tirage",
      text: "Avec 9 outs, vous touchez environ 35% sur deux cartes, soit ~1,9 contre 1. C'est mieux que la cote demandée (2,2 contre 1), et vos implied odds n'arrangent que les choses : le call est rentable.",
      seats: [
        { label: "BB", note: "call", tone: "gold", cards: ["Th", "9h"], stack: 95 },
        { label: "BTN", tone: "blue", dealer: true, hidden: true, bet: 5, stack: 95 },
      ],
      board: ["Ah", "Kh", "7s"],
      pot: 11,
    },
  ],
  "le-semi-bluff": [
    {
      tag: "Préflop",
      emoji: "🎯",
      title: "Open avec Q9 assorti",
      text: "Vous ouvrez au bouton avec Q9 de pique, un suited connector qui flop très bien.",
      seats: [
        { label: "BTN", note: "vous", tone: "gold", dealer: true, cards: ["Qs", "9s"], bet: 2.5, stack: 100 },
        { label: "BB", note: "call", tone: "blue", hidden: true, bet: 1, stack: 100 },
      ],
      pot: 5.5,
    },
    {
      tag: "Flop",
      emoji: "🃏",
      title: "Combo draw monstrueux",
      text: "J-T-4 à deux piques. Vous floppez un tirage quinte par les deux bouts plus un flush draw : environ 15 outs, souvent favori face à une simple paire.",
      seats: [
        { label: "BTN", note: "combo draw", tone: "gold", dealer: true, cards: ["Qs", "9s"], stack: 97.5 },
        { label: "BB", note: "check", tone: "blue", hidden: true, stack: 97.5 },
      ],
      board: ["Js", "Ts", "4d"],
      pot: 6,
    },
    {
      tag: "Semi-bluff",
      emoji: "⚡",
      title: "Vous misez votre tirage",
      text: "Vous misez en semi-bluff : fold equity immédiate s'il se couche, plus toute l'équité de votre tirage s'il paie. Avec autant d'outs, c'est la ligne la plus rentable.",
      seats: [
        { label: "BTN", note: "semi-bluff", tone: "gold", dealer: true, cards: ["Qs", "9s"], bet: 6, stack: 91.5 },
        { label: "BB", tone: "blue", hidden: true, stack: 97.5 },
      ],
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
              ? "Clique sur « Dérouler la main » pour voir l'action se jouer étape par étape, tout est expliqué simplement. Tu peux basculer l'affichage en jetons ou en blindes (BB) en haut de la table."
              : "Déroule la main étape par étape pour visualiser la ligne et le raisonnement à chaque rue. Bascule l'affichage BB / jetons en haut de la table."}
          </p>
          <HandReplayer steps={hand} defaultUnit={l.level === "debutant" ? "chips" : "bb"} />
        </Section>
      )}

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
