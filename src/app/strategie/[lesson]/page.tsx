import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonLayout } from "@/components/LessonLayout";
import { HandReplayer, type ReplayStep } from "@/components/HandReplayer";
import { LESSONS, getLesson, LEVEL_LABEL } from "@/lib/poker/strategy";
import { Crumbs, Section, DealerNote, LevelPill, JsonLd } from "@/components/ui";

type Params = { lesson: string };

/**
 * Mains rejouables, avec un registre qui s'adapte au niveau du cours :
 * - DÉBUTANT : tout est expliqué comme à un grand débutant (jetons, VOUS / ADV.,
 *   aucun jargon).
 * - INTERMÉDIAIRE : on réduit la simplification, on emploie les vrais termes
 *   (affichage en BB, vraies positions, range, c-bet, outs, fold equity...).
 * - AVANCÉ : pas de replayer du tout, le contenu reste purement technique.
 */
const HANDS: Record<string, ReplayStep[]> = {
  // -------------------- DÉBUTANT (registre grand débutant) --------------------
  "mains-de-depart": [
    {
      tag: "Vos 2 cartes",
      emoji: "🂡",
      title: "On vous distribue 2 cartes",
      text: "Au poker, tout commence par 2 cartes rien que pour vous. Ici : un As et un Roi, de la même couleur. C'est une très belle main de départ.",
      seats: [
        { label: "VOUS", note: "vos cartes", tone: "gold", cards: ["As", "Ks"] },
        { label: "ADV.", note: "les autres joueurs", tone: "blue" },
      ],
      pot: "3 jetons",
    },
    {
      tag: "Votre décision",
      emoji: "✅",
      title: "Belle main, on attaque",
      text: "Avec une main aussi forte, on n'hésite pas : on mise 5 jetons (on « relance ») pour prendre l'avantage. Avec une main faible, genre un 7 et un 2, on jette sans regret. Bien choisir au départ, c'est déjà l'essentiel du poker.",
      seats: [
        { label: "VOUS", note: "vous relancez", tone: "gold", cards: ["As", "Ks"], bet: "5 jetons" },
        { label: "ADV.", note: "à eux de payer", tone: "blue" },
      ],
      pot: "8 jetons",
    },
  ],
  "les-erreurs-du-debutant": [
    {
      tag: "L'erreur classique",
      emoji: "⚠️",
      title: "« Limper » : payer sans relancer",
      text: "Beaucoup de débutants se contentent de payer la mise minimale pour voir les cartes du milieu pas cher. On appelle ça « limper ». Ici, deux joueurs limpent pour 2 jetons.",
      seats: [
        { label: "VOUS", note: "à vous bientôt", tone: "gold" },
        { label: "J. A", note: "limpe", tone: "blue", bet: "2 jetons" },
        { label: "J. B", note: "limpe", tone: "blue", bet: "2 jetons" },
      ],
      pot: "7 jetons",
    },
    {
      tag: "Pourquoi c'est mauvais",
      emoji: "👎",
      title: "Vous entrez sans plan",
      text: "Si vous limpez vous aussi, personne n'a pris les commandes du coup. Vous verrez les cartes du milieu avec une main moyenne, sans initiative. C'est presque toujours celui qui ose relancer qui contrôle la main.",
      seats: [
        { label: "VOUS", note: "limpe aussi", tone: "gold", bet: "2 jetons" },
        { label: "J. A", tone: "blue" },
        { label: "J. B", tone: "blue" },
      ],
      pot: "9 jetons",
    },
    {
      tag: "Le bon réflexe",
      emoji: "✅",
      title: "Relancez, ou couchez-vous",
      text: "La règle toute simple du débutant : si votre main vaut le coup, on relance (ici à 6 jetons) pour prendre l'avantage. Sinon, on jette. Entre les deux, le limp est presque toujours une fuite qui coûte de l'argent.",
      seats: [
        { label: "VOUS", note: "relance !", tone: "gold", bet: "6 jetons" },
        { label: "J. A", note: "se couche", tone: "muted" },
        { label: "J. B", note: "se couche", tone: "muted" },
      ],
      pot: "13 jetons",
    },
  ],
  "jouer-en-position": [
    {
      tag: "Avant les cartes du milieu",
      emoji: "🎯",
      title: "L'adversaire parle avant vous",
      text: "L'adversaire attaque en misant 5 jetons. Vous, vous êtes « au bouton » (le jeton D) : la meilleure place de la table, parce que vous jouez toujours en dernier.",
      seats: [
        { label: "VOUS", note: "vous, au bouton", tone: "gold", dealer: true },
        { label: "ADV.", note: "il ouvre", tone: "blue", bet: "5 jetons" },
      ],
      pot: "8 jetons",
    },
    {
      tag: "Vous suivez",
      emoji: "👀",
      title: "Vous payez et vous observez",
      text: "Vous payez les 5 jetons pour voir la suite. Comme vous parlez après lui à chaque tour, vous voyez toujours ce qu'il fait AVANT de décider quoi que ce soit.",
      seats: [
        { label: "VOUS", note: "en position", tone: "gold", dealer: true },
        { label: "ADV.", tone: "blue" },
      ],
      pot: "13 jetons",
    },
    {
      tag: "Le flop",
      emoji: "🃏",
      title: "L'avantage devient évident",
      text: "Trois cartes apparaissent au milieu. L'adversaire doit parler en premier, à l'aveugle. Vous, vous attendez de voir sa réaction avant d'agir. Cette information gratuite, coup après coup, fait gagner beaucoup d'argent.",
      seats: [
        { label: "VOUS", note: "vous décidez en dernier", tone: "gold", dealer: true },
        { label: "ADV.", note: "parle en premier", tone: "blue" },
      ],
      board: ["Js", "8h", "3c"],
      pot: "13 jetons",
    },
  ],

  // ------------------ INTERMÉDIAIRE (vrais termes, BB, positions) ------------------
  "le-c-bet": [
    {
      tag: "Préflop",
      emoji: "🎯",
      title: "Open au bouton",
      text: "Vous ouvrez à 2,5 BB au bouton, la big blind défend. Vous avez l'initiative et la position : deux atouts pour la suite du coup.",
      seats: [
        { label: "BTN", note: "vous", tone: "gold", bet: "2,5 BB" },
        { label: "BB", note: "défend", tone: "blue" },
      ],
      pot: "5,5 BB",
    },
    {
      tag: "Flop",
      emoji: "🃏",
      title: "Texture sèche, favorable à votre range",
      text: "Q-7-2 rainbow. Ce board sec avantage votre range de relanceur préflop : vous avez bien plus de top paires et de grosses paires que la big blind, qui check.",
      seats: [
        { label: "BTN", tone: "gold" },
        { label: "BB", note: "check", tone: "blue" },
      ],
      board: ["Qs", "7d", "2c"],
      pot: "6 BB",
    },
    {
      tag: "Continuation bet",
      emoji: "💰",
      title: "C-bet 3 BB",
      text: "Vous continuez l'agression avec un c-bet d'environ la moitié du pot. Sur cette texture, l'adversaire doit souvent se coucher : votre fold equity est élevée et vous protégez vos meilleures mains.",
      seats: [
        { label: "BTN", note: "c-bet", tone: "gold", bet: "3 BB" },
        { label: "BB", note: "souvent fold", tone: "blue" },
      ],
      board: ["Qs", "7d", "2c"],
      pot: "6 BB",
    },
  ],
  "le-3-bet": [
    {
      tag: "Préflop",
      emoji: "🎯",
      title: "UTG ouvre",
      text: "UTG open à 2,5 BB. En première position, sa range d'ouverture est plutôt serrée.",
      seats: [
        { label: "BTN", note: "vous", tone: "gold" },
        { label: "UTG", note: "open", tone: "blue", bet: "2,5 BB" },
      ],
      pot: "4 BB",
    },
    {
      tag: "Votre 3-bet",
      emoji: "⚡",
      title: "Re-relance à 9 BB",
      text: "Au bouton, vous 3-bet à environ 3,5x l'open. En value avec vos premiums (QQ+, AK), en bluff avec des mains à blockers comme A5s, qui bloquent ses AA/AK et se jouent bien si on vous paie.",
      seats: [
        { label: "BTN", note: "3-bet", tone: "gold", bet: "9 BB" },
        { label: "UTG", tone: "blue", bet: "2,5 BB" },
      ],
      pot: "13 BB",
    },
    {
      tag: "Le résultat",
      emoji: "🏆",
      title: "Initiative et avantage de range",
      text: "UTG doit se défendre hors de position face à votre 3-bet. Vous gardez l'initiative et, sur la majorité des flops, l'avantage de range.",
      seats: [
        { label: "BTN", note: "vous menez", tone: "gold", bet: "9 BB" },
        { label: "UTG", note: "call ou fold", tone: "blue", bet: "2,5 BB" },
      ],
      pot: "13 BB",
    },
  ],
  "le-squeeze": [
    {
      tag: "Préflop",
      emoji: "🎯",
      title: "UTG ouvre",
      text: "UTG open à 2,5 BB.",
      seats: [
        { label: "SB", note: "vous", tone: "gold" },
        { label: "UTG", note: "open", tone: "blue", bet: "2,5 BB" },
        { label: "CO", note: "à parler", tone: "muted" },
      ],
      pot: "4 BB",
    },
    {
      tag: "Cold call",
      emoji: "➕",
      title: "Le cutoff se contente de suivre",
      text: "Le CO flat l'open. Sa range est plafonnée (capped) : avec ses meilleures mains, il aurait 3-bet. C'est cette faiblesse qui ouvre la porte au squeeze.",
      seats: [
        { label: "SB", note: "vous", tone: "gold" },
        { label: "UTG", tone: "blue", bet: "2,5 BB" },
        { label: "CO", note: "flat", tone: "blue", bet: "2,5 BB" },
      ],
      pot: "6,5 BB",
    },
    {
      tag: "Le squeeze",
      emoji: "✊",
      title: "Relance à 12 BB depuis la SB",
      text: "Vous squeezez à 12 BB. Vous attaquez deux ranges à la fois, avec du dead money déjà au milieu et un flatteur capped : le coup est rentable même sans grosse main.",
      seats: [
        { label: "SB", note: "squeeze", tone: "gold", bet: "12 BB" },
        { label: "UTG", tone: "muted", bet: "2,5 BB" },
        { label: "CO", tone: "muted", bet: "2,5 BB" },
      ],
      pot: "19 BB",
    },
  ],
  "cotes-et-pot-odds": [
    {
      tag: "Flop",
      emoji: "🃏",
      title: "Tirage couleur (9 outs)",
      text: "A-K-7 à deux cœurs. Vous tenez T9 de cœur : un flush draw, soit 9 outs pour compléter votre couleur.",
      seats: [
        { label: "BB", note: "vous", tone: "gold", cards: ["Th", "9h"] },
        { label: "BTN", note: "villain", tone: "blue" },
      ],
      board: ["Ah", "Kh", "7s"],
      pot: "6 BB",
    },
    {
      tag: "La mise",
      emoji: "💰",
      title: "Villain mise 5 BB",
      text: "Il mise 5 BB dans un pot de 6. Vous devez payer 5 pour en gagner 11 : la cote du pot est d'environ 2,2 contre 1.",
      seats: [
        { label: "BB", note: "payer ?", tone: "gold", cards: ["Th", "9h"] },
        { label: "BTN", note: "bet", tone: "blue", bet: "5 BB" },
      ],
      board: ["Ah", "Kh", "7s"],
      pot: "11 BB",
    },
    {
      tag: "La décision",
      emoji: "🧮",
      title: "Cote du pot vs cote du tirage",
      text: "Avec 9 outs, vous touchez environ 35% sur deux cartes, soit ~1,9 contre 1. C'est mieux que la cote demandée (2,2 contre 1), et vos implied odds n'arrangent que les choses : le call est rentable.",
      seats: [
        { label: "BB", note: "call", tone: "gold", cards: ["Th", "9h"] },
        { label: "BTN", tone: "blue", bet: "5 BB" },
      ],
      board: ["Ah", "Kh", "7s"],
      pot: "11 BB",
    },
  ],
  "le-semi-bluff": [
    {
      tag: "Préflop",
      emoji: "🎯",
      title: "Open avec Q9 assorti",
      text: "Vous ouvrez à 2,5 BB avec Q9 de pique, un suited connector qui flop bien.",
      seats: [
        { label: "BTN", note: "vous", tone: "gold", cards: ["Qs", "9s"], bet: "2,5 BB" },
        { label: "BB", note: "call", tone: "blue" },
      ],
      pot: "5,5 BB",
    },
    {
      tag: "Flop",
      emoji: "🃏",
      title: "Combo draw monstrueux",
      text: "J-T-4 à deux piques. Vous floppez un tirage quinte par les deux bouts plus un flush draw : environ 15 outs, souvent favori face à une simple paire.",
      seats: [
        { label: "BTN", note: "combo draw", tone: "gold", cards: ["Qs", "9s"] },
        { label: "BB", note: "check", tone: "blue" },
      ],
      board: ["Js", "Ts", "4d"],
      pot: "6 BB",
    },
    {
      tag: "Semi-bluff",
      emoji: "⚡",
      title: "Mise de 6 BB",
      text: "Vous misez en semi-bluff : fold equity immédiate s'il se couche, plus toute l'équité de votre tirage s'il paie. Avec autant d'outs, c'est la ligne la plus rentable.",
      seats: [
        { label: "BTN", note: "semi-bluff", tone: "gold", cards: ["Qs", "9s"], bet: "6 BB" },
        { label: "BB", tone: "blue" },
      ],
      board: ["Js", "Ts", "4d"],
      pot: "6 BB",
    },
  ],

  // ------------------ AVANCÉ : pas de replayer (contenu 100% technique) ------------------
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
              ? "Clique sur « Dérouler la main » pour voir l'action se jouer étape par étape, tout est expliqué simplement. Tu peux aussi avancer toi-même avec les flèches."
              : "Déroule la main étape par étape pour visualiser la ligne et le raisonnement à chaque rue."}
          </p>
          <HandReplayer steps={hand} />
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
