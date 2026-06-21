import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonLayout } from "@/components/LessonLayout";
import { HandReplayer, type ReplayStep } from "@/components/HandReplayer";
import { LESSONS, getLesson, LEVEL_LABEL } from "@/lib/poker/strategy";
import { Crumbs, Section, DealerNote, LevelPill, JsonLd } from "@/components/ui";

type Params = { lesson: string };

/**
 * Mains rejouables, expliquées pour un grand débutant (niveau "expliqué à un
 * enfant de 8 ans"). Jetons concrets, peu de joueurs (VOUS / ADV.), une
 * explication très simple à chaque étape. Les cours abstraits (ranges, GTO,
 * exploitant, équilibrage, bankroll) n'ont pas de replayer.
 */
const HANDS: Record<string, ReplayStep[]> = {
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
  "le-c-bet": [
    {
      tag: "Avant les cartes du milieu",
      emoji: "🎯",
      title: "Vous attaquez le premier",
      text: "Vous avez 2 cartes rien que pour vous. Vous décidez d'attaquer en posant 5 jetons au milieu : une « relance ». Vous montrez que vous avez peut-être une bonne main, les autres doivent payer pour rester.",
      seats: [
        { label: "VOUS", note: "vous relancez", tone: "gold", bet: "5 jetons" },
        { label: "ADV.", note: "il réfléchit", tone: "blue" },
      ],
      pot: "8 jetons",
    },
    {
      tag: "Le flop",
      emoji: "🃏",
      title: "3 cartes apparaissent au milieu",
      text: "L'adversaire a payé. Le croupier retourne 3 cartes au centre de la table : le « flop ». Elles sont pour tout le monde, chacun s'en sert pour fabriquer sa main. Ici : une Dame, un 7, un 2.",
      seats: [
        { label: "VOUS", tone: "gold" },
        { label: "ADV.", note: "il a checké (passé)", tone: "blue" },
      ],
      board: ["Qs", "7d", "2c"],
      pot: "13 jetons",
    },
    {
      tag: "Votre suite logique",
      emoji: "💰",
      title: "Vous re-misez tout de suite",
      text: "Comme c'est vous qui avez attaqué avant le flop, vous continuez : vous remettez 8 jetons. On appelle ça un « continuation bet », ou c-bet. Très souvent, l'adversaire n'a rien touché et préfère abandonner : vous gagnez le pot.",
      seats: [
        { label: "VOUS", note: "vous misez encore", tone: "gold", bet: "8 jetons" },
        { label: "ADV.", note: "souvent, il abandonne", tone: "blue" },
      ],
      board: ["Qs", "7d", "2c"],
      pot: "13 jetons",
    },
  ],
  "le-3-bet": [
    {
      tag: "Avant le flop",
      emoji: "🎯",
      title: "L'adversaire attaque le premier",
      text: "L'adversaire ouvre les hostilités : il pose 5 jetons. C'est sa relance. Normalement, on a le choix entre payer, jeter ses cartes, ou relancer par-dessus.",
      seats: [
        { label: "VOUS", note: "à vous de jouer", tone: "gold" },
        { label: "ADV.", note: "il ouvre", tone: "blue", bet: "5 jetons" },
      ],
      pot: "8 jetons",
    },
    {
      tag: "Votre contre-attaque",
      emoji: "⚡",
      title: "Vous re-relancez par-dessus",
      text: "Au lieu de juste payer, vous re-relancez encore plus haut : 15 jetons. Relancer une relance, ça s'appelle un « 3-bet ». Vous reprenez les commandes du coup et vous montrez de la force.",
      seats: [
        { label: "VOUS", note: "vous 3-bet", tone: "gold", bet: "15 jetons" },
        { label: "ADV.", tone: "blue", bet: "5 jetons" },
      ],
      pot: "23 jetons",
    },
    {
      tag: "Le résultat",
      emoji: "🏆",
      title: "C'est vous qui menez",
      text: "L'adversaire doit maintenant choisir : payer 10 jetons de plus, ou abandonner. Souvent il se couche, et vous remportez les jetons déjà au milieu. C'est ça, prendre l'initiative.",
      seats: [
        { label: "VOUS", note: "vous menez", tone: "gold", bet: "15 jetons" },
        { label: "ADV.", note: "payer ou jeter ?", tone: "blue", bet: "5 jetons" },
      ],
      pot: "23 jetons",
    },
  ],
  "le-squeeze": [
    {
      tag: "Avant le flop",
      emoji: "🎯",
      title: "Un joueur ouvre",
      text: "Un premier joueur attaque : il pose 5 jetons.",
      seats: [
        { label: "VOUS", note: "vous, bientôt", tone: "gold" },
        { label: "J. A", note: "il ouvre", tone: "blue", bet: "5 jetons" },
        { label: "J. B", note: "il réfléchit", tone: "muted" },
      ],
      pot: "8 jetons",
    },
    {
      tag: "Et un autre suit",
      emoji: "➕",
      title: "Un deuxième joueur paie",
      text: "Un deuxième joueur se contente de payer les 5 jetons pour voir le flop. Il a rarement une main très forte, sinon il aurait relancé. C'est ce détail qui vous ouvre une porte.",
      seats: [
        { label: "VOUS", note: "à vous", tone: "gold" },
        { label: "J. A", tone: "blue", bet: "5 jetons" },
        { label: "J. B", note: "il suit", tone: "blue", bet: "5 jetons" },
      ],
      pot: "13 jetons",
    },
    {
      tag: "Votre coup",
      emoji: "✊",
      title: "Vous relancez fort : le squeeze",
      text: "C'est le moment : vous relancez gros, 18 jetons, pour mettre la pression sur les deux à la fois. On appelle ça un « squeeze » (pincer). Souvent, ils abandonnent tous les deux et vous ramassez les jetons déjà au milieu.",
      seats: [
        { label: "VOUS", note: "vous squeezez", tone: "gold", bet: "18 jetons" },
        { label: "J. A", tone: "muted", bet: "5 jetons" },
        { label: "J. B", tone: "muted", bet: "5 jetons" },
      ],
      pot: "31 jetons",
    },
  ],
  "cotes-et-pot-odds": [
    {
      tag: "Le flop",
      emoji: "🃏",
      title: "Vous avez un tirage couleur",
      text: "Au milieu : As, Roi, 7, dont deux cœurs. Vos 2 cartes sont aussi des cœurs (le 10 et le 9). S'il tombe encore un cœur, vous aurez 5 cartes de cœur : une « couleur », une très belle main. Pour l'instant, vous n'avez que l'espoir.",
      seats: [
        { label: "VOUS", note: "vous (tirage)", tone: "gold", cards: ["Th", "9h"] },
        { label: "ADV.", note: "l'autre joueur", tone: "blue" },
      ],
      board: ["Ah", "Kh", "7s"],
      pot: "10 jetons",
    },
    {
      tag: "L'adversaire mise",
      emoji: "💰",
      title: "Il pose 5 jetons, à vous de choisir",
      text: "L'adversaire mise 5 jetons. Pour rester dans le coup et voir la carte suivante, vous devez payer 5 jetons. La vraie question : est-ce que ça vaut le coup de payer ?",
      seats: [
        { label: "VOUS", note: "payer ?", tone: "gold", cards: ["Th", "9h"] },
        { label: "ADV.", note: "il mise", tone: "blue", bet: "5 jetons" },
      ],
      board: ["Ah", "Kh", "7s"],
      pot: "15 jetons",
    },
    {
      tag: "Le calcul tout simple",
      emoji: "🧮",
      title: "Le pot vous fait une bonne affaire",
      text: "Vous risquez 5 jetons pour en gagner 15. Et vous touchez votre couleur environ 1 fois sur 3. Sur la durée, payer rapporte plus que ça ne coûte : c'est exactement ça, jouer ses « cotes ».",
      seats: [
        { label: "VOUS", note: "vous payez", tone: "gold", cards: ["Th", "9h"] },
        { label: "ADV.", tone: "blue", bet: "5 jetons" },
      ],
      board: ["Ah", "Kh", "7s"],
      pot: "15 jetons",
    },
  ],
  "le-semi-bluff": [
    {
      tag: "Avant le flop",
      emoji: "🎯",
      title: "Vous attaquez avec 2 belles cartes",
      text: "Vous avez une Dame et un 9, de la même couleur (pique). Vous relancez à 5 jetons.",
      seats: [
        { label: "VOUS", note: "vous relancez", tone: "gold", cards: ["Qs", "9s"], bet: "5 jetons" },
        { label: "ADV.", note: "il paie", tone: "blue" },
      ],
      pot: "10 jetons",
    },
    {
      tag: "Le flop",
      emoji: "🃏",
      title: "Un flop plein de promesses",
      text: "Au milieu : Valet, 10, 4, dont deux piques. Vous n'avez pas encore de main finie, mais énormément de possibilités : une couleur si un pique tombe, une suite si un 8 ou une Dame arrive. On appelle ça un « tirage ».",
      seats: [
        { label: "VOUS", note: "gros tirage", tone: "gold", cards: ["Qs", "9s"] },
        { label: "ADV.", note: "il a checké", tone: "blue" },
      ],
      board: ["Js", "Ts", "4d"],
      pot: "13 jetons",
    },
    {
      tag: "Le semi-bluff",
      emoji: "⚡",
      title: "Vous misez quand même : malin",
      text: "Vous misez 9 jetons. Deux façons de gagner : soit l'adversaire abandonne tout de suite, soit il paie et vous complétez votre couleur ou votre suite ensuite. C'est le « semi-bluff » : un bluff avec un plan B.",
      seats: [
        { label: "VOUS", note: "vous misez", tone: "gold", cards: ["Qs", "9s"], bet: "9 jetons" },
        { label: "ADV.", tone: "blue" },
      ],
      board: ["Js", "Ts", "4d"],
      pot: "13 jetons",
    },
  ],
  "les-blockers": [
    {
      tag: "La dernière carte",
      emoji: "🃏",
      title: "Toutes les cartes sont sorties",
      text: "Les cartes du milieu sont là : As, Dame, 5, 2. Vous, vous avez l'As de pique et un Roi. Vous n'avez pas une grosse main, mais votre As va vous servir autrement.",
      seats: [
        { label: "VOUS", note: "vous", tone: "gold", cards: ["As", "Kc"] },
        { label: "ADV.", note: "l'autre joueur", tone: "blue" },
      ],
      board: ["Ah", "Qd", "5c", "2s"],
      pot: "16 jetons",
    },
    {
      tag: "L'astuce cachée",
      emoji: "🔒",
      title: "Vous tenez un As : info précieuse",
      text: "Comme vous avez un As en main, l'adversaire ne peut quasiment pas avoir une paire d'As : il n'en reste presque plus. Il a donc beaucoup moins de très grosses mains possibles. On dit que votre As « bloque » ses bonnes mains.",
      seats: [
        { label: "VOUS", note: "vous bloquez", tone: "gold", cards: ["As", "Kc"] },
        { label: "ADV.", note: "peu de grosses mains", tone: "blue" },
      ],
      board: ["Ah", "Qd", "5c", "2s"],
      pot: "16 jetons",
    },
    {
      tag: "Le bluff malin",
      emoji: "💰",
      title: "Du coup, vous pouvez bluffer",
      text: "Puisqu'il a rarement une grosse main, vous misez fort (12 jetons) comme si vous étiez très puissant. Votre bluff a beaucoup plus de chances de le faire abandonner. C'est toute la force des « blockers ».",
      seats: [
        { label: "VOUS", note: "vous bluffez", tone: "gold", cards: ["As", "Kc"], bet: "12 jetons" },
        { label: "ADV.", note: "il y croit", tone: "blue" },
      ],
      board: ["Ah", "Qd", "5c", "2s"],
      pot: "16 jetons",
    },
  ],
  "la-mdf": [
    {
      tag: "La dernière carte",
      emoji: "🃏",
      title: "L'adversaire mise très gros",
      text: "Dernière carte posée au milieu. L'adversaire mise 10 jetons, autant qu'il y a déjà dans le pot. Il vous met la pression pour vous faire jeter vos cartes.",
      seats: [
        { label: "VOUS", note: "défendre ?", tone: "gold" },
        { label: "ADV.", note: "il mise tout le pot", tone: "blue", bet: "10 jetons" },
      ],
      board: ["Kd", "8s", "3c", "7h"],
      pot: "10 jetons",
    },
    {
      tag: "Le piège à éviter",
      emoji: "⚠️",
      title: "Abandonner trop souvent, c'est se faire plumer",
      text: "Si vous jetez vos cartes presque à chaque fois qu'on vous mise dessus, l'adversaire peut bluffer tout le temps sans aucun risque. Il gagnerait à tous les coups, juste en misant.",
      seats: [
        { label: "VOUS", note: "ne jetez pas tout", tone: "gold" },
        { label: "ADV.", tone: "blue", bet: "10 jetons" },
      ],
      board: ["Kd", "8s", "3c", "7h"],
      pot: "10 jetons",
    },
    {
      tag: "La règle (MDF)",
      emoji: "🛡️",
      title: "Gardez environ la moitié de vos mains",
      text: "Pour ne pas vous faire avoir, vous devez continuer (payer) avec à peu près la moitié de vos mains, même les moyennes. Comme ça, bluffer contre vous redevient risqué pour lui. C'est la « fréquence de défense minimale ».",
      seats: [
        { label: "VOUS", note: "vous payez", tone: "gold" },
        { label: "ADV.", tone: "blue", bet: "10 jetons" },
      ],
      board: ["Kd", "8s", "3c", "7h"],
      pot: "10 jetons",
    },
  ],
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
            Clique sur « Dérouler la main » pour voir l&apos;action se jouer étape par étape, avec
            l&apos;explication en direct. Tu peux aussi avancer toi-même avec les flèches.
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
