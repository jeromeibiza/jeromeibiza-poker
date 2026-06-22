import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Crumbs, PageHero, Section, JsonLd, DealerNote } from "@/components/ui";

export const metadata: Metadata = {
  title: "Comment devenir croupier de poker : le guide complet et gratuit",
  description:
    "Le métier, les qualités, les étapes et la formation pour devenir croupier de poker. " +
    "Guide complet et gratuit par Jérôme Ibiza, croupier professionnel et 20e du PSPC 2023.",
  alternates: { canonical: "/devenir-croupier-de-poker" },
};

// Étapes du parcours (sert au rendu ET au JSON-LD HowTo).
const STEPS: { name: string; text: string }[] = [
  {
    name: "Maîtriser les règles du poker",
    text: "Avant de distribuer, il faut connaître le jeu sur le bout des doigts : ordre des actions, combinaisons, déroulement d'une main. On ne gère bien que ce qu'on comprend parfaitement.",
  },
  {
    name: "Travailler les gestes techniques",
    text: "Mélange, distribution propre et rapide, manipulation des jetons (chip handling, chip cutting), gestion du sabot. Ce sont des gestes qui se travaillent des heures, jusqu'à l'automatisme.",
  },
  {
    name: "Apprendre les procédures de table",
    text: "Annonces à voix haute, gestion du pot et des side pots, prélèvement du rake, arbitrage des litiges. C'est le cœur du métier, ce qui sépare l'amateur du professionnel.",
  },
  {
    name: "Se former sérieusement",
    text: "Via une école de croupiers ou la formation gratuite de l'académie ici. On valide chaque module, on s'entraîne, on répète les gestes jusqu'à ce qu'ils soient propres et fiables.",
  },
  {
    name: "Se faire la main et postuler",
    text: "Parties entre amis, événements, home games : tout est bon pour prendre de l'assurance. Puis on postule en casino, cardroom ou sur les festivals, souvent en commençant comme dealer débutant.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Faut-il un diplôme pour devenir croupier de poker ?",
    a: "Il n'existe pas de diplôme d'État obligatoire universel : ce qui compte, c'est de maîtriser les gestes, les procédures et les règles, et de réussir les tests d'embauche du casino. Beaucoup passent par une école de croupiers, mais on peut aussi se former en autodidacte sérieux, puis valider ses compétences sur le terrain.",
  },
  {
    q: "Combien de temps faut-il pour devenir croupier ?",
    a: "Cela dépend du rythme et de la pratique. Les gestes techniques (mélange, distribution, chips) demandent plusieurs semaines à plusieurs mois de répétition pour devenir propres et automatiques. Les règles et procédures, elles, s'apprennent plus vite. La régularité de l'entraînement fait toute la différence.",
  },
  {
    q: "Où se former au métier de croupier poker ?",
    a: "Trois voies se combinent souvent : les écoles de croupiers (en présentiel, payantes), la formation sur le tas dans un établissement, et les ressources gratuites comme l'académie croupier de ce site, qui couvre le métier module par module. L'idéal est de pratiquer en parallèle de la théorie.",
  },
  {
    q: "Quel est le salaire d'un croupier de poker ?",
    a: "La rémunération varie fortement selon le pays, l'établissement, l'expérience et le système de pourboires (le tronc dans certains casinos). Un débutant ne gagne pas comme un senior dealer sur les grosses tables ou les festivals. Mieux vaut se renseigner établissement par établissement plutôt que de se fier à un chiffre unique.",
  },
];

export default function DevenirCroupierPage() {
  const base = SITE.url.replace(/\/$/, "");
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comment devenir croupier de poker",
    description: metadata.description,
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    author: { "@type": "Person", "@id": `${base}/#jerome`, name: "Jérôme Ibiza" },
    mainEntityOfPage: `${base}/devenir-croupier-de-poker`,
  };
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Comment devenir croupier de poker",
    inLanguage: "fr-FR",
    step: STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
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
    <div className="wrap">
      <JsonLd data={[articleLd, howToLd, faqLd]} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Académie Croupier", href: "/academie-croupier" }, { label: "Devenir croupier de poker" }]} />

      <PageHero
        kicker="Le métier de croupier"
        title="Comment devenir croupier de poker"
        intro="Le poker se joue des deux côtés du tapis : celui qui joue, et celui qui distribue. Voici le métier, les qualités, les étapes concrètes et la formation pour passer derrière la table. Le tout par un croupier professionnel, et gratuitement."
      />

      <Section kicker="Le métier" title="Que fait un croupier de poker">
        <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, maxWidth: 760 }}>
          Le croupier de poker est le chef d&apos;orchestre de la table. Contrairement à la roulette
          ou au blackjack, il ne joue jamais contre les clients : les joueurs s&apos;affrontent entre
          eux. Son rôle est d&apos;assurer le bon déroulement de la partie. Il mélange et distribue,
          annonce l&apos;action, gère le pot et les side pots, prélève le rake, dévoile le board,
          désigne le gagnant et pousse le pot. Il est aussi le garant des règles et le premier
          rempart contre les erreurs et la triche.
        </p>
        <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, maxWidth: 760, marginTop: 14 }}>
          Tout commence donc par une connaissance parfaite du jeu. Si tu débutes, commence par les{" "}
          <Link href="/apprendre/regles-du-poker" className="link">règles du poker</Link> et le{" "}
          <Link href="/apprendre/classement-des-mains" className="link">classement des mains</Link>.
        </p>
      </Section>

      <Section kicker="Le profil" title="Les qualités pour devenir croupier">
        <div className="card">
          <ul className="lb">
            <li><strong style={{ color: "var(--fg)" }}>Dextérité manuelle</strong> : mélange, distribution et manipulation des jetons rapides et propres.</li>
            <li><strong style={{ color: "var(--fg)" }}>Rigueur et concentration</strong> : aucune erreur sur le pot, les blindes ou l&apos;ordre d&apos;action.</li>
            <li><strong style={{ color: "var(--fg)" }}>Calcul mental</strong> : annoncer les mises, faire la monnaie, calculer le rake et les side pots vite et juste.</li>
            <li><strong style={{ color: "var(--fg)" }}>Sang-froid</strong> : gérer les litiges et les joueurs en tilt avec calme et autorité.</li>
            <li><strong style={{ color: "var(--fg)" }}>Sens du service</strong> : rester courtois, neutre et professionnel en toutes circonstances.</li>
            <li><strong style={{ color: "var(--fg)" }}>Intégrité</strong> : l&apos;honnêteté absolue est non négociable dans ce métier.</li>
          </ul>
        </div>
      </Section>

      <Section kicker="Le parcours" title="Les étapes pour devenir croupier de poker">
        <ol style={{ display: "grid", gap: 14, listStyle: "none", padding: 0, margin: 0, counterReset: "step" }}>
          {STEPS.map((s, i) => (
            <li key={s.name} className="card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span
                aria-hidden
                style={{ flex: "0 0 auto", width: 34, height: 34, borderRadius: 10, display: "grid", placeItems: "center", background: "linear-gradient(180deg,var(--gold-soft),var(--gold))", color: "#2a1d05", fontWeight: 700 }}
              >
                {i + 1}
              </span>
              <div>
                <div className="display" style={{ fontSize: 16 }}>{s.name}</div>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 6 }}>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section kicker="La formation" title="Se former gratuitement avec l'académie">
        <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, maxWidth: 760 }}>
          L&apos;<Link href="/academie-croupier" className="link">académie croupier</Link> couvre le
          métier module par module : le rôle du dealer, les gestes techniques, les procédures de
          table, la gestion des litiges et un examen final. C&apos;est la seule formation francophone
          gratuite en ligne pensée pour devenir croupier de poker.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
          <Link href="/academie-croupier" className="btn btn-gold">🎓 Commencer l&apos;académie</Link>
          <Link href="/academie-croupier/introduction-au-metier" className="btn btn-ghost">Module 1 : le métier →</Link>
        </div>
      </Section>

      <Section kicker="Et après" title="Débouchés et évolution de carrière">
        <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, maxWidth: 760 }}>
          La filière poker en casino ou cardroom offre une vraie progression : dealer, senior dealer
          sur les grosses tables et les finales, puis assistant floor, floor (superviseur de salle) et
          tournament director. On travaille en casino, en cardroom et sur les grands festivals. La
          rémunération dépend de l&apos;établissement, de l&apos;expérience et du système de
          pourboires : renseigne-toi au cas par cas.
        </p>
        <DealerNote>
          Mon conseil : ne néglige jamais les gestes de base. Un mélange propre, une distribution
          régulière et des annonces claires, ça inspire confiance dès la première table. Le reste
          vient avec le volume.
        </DealerNote>
      </Section>

      <Section kicker="Questions fréquentes" title="FAQ : devenir croupier de poker">
        <div style={{ display: "grid", gap: 12 }}>
          {FAQ.map((f) => (
            <details key={f.q} className="card">
              <summary className="display" style={{ fontSize: 15, cursor: "pointer" }}>{f.q}</summary>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10, lineHeight: 1.6 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section kicker="Pour aller plus loin" title="Approfondir le métier">
        <div className="grid-cards">
          {[
            ["📚 Formation croupier poker", "Les voies pour se former : écoles, sur le tas, ou l'académie gratuite.", "/croupier/formation"],
            ["💶 Salaire croupier poker", "Combien gagne un croupier de poker en France, par niveau.", "/croupier/salaire"],
            ["🃏 Les gestes techniques", "Mélange, distribution, manipulation et découpe des jetons (chip cutting).", "/croupier/gestes-techniques"],
            ["🎓 L'académie croupier", "La formation complète, module par module, jusqu'à l'examen final.", "/academie-croupier"],
          ].map(([t, d, href]) => (
            <Link key={href} href={href} className="card card-hover">
              <span className="display" style={{ fontSize: 16 }}>{t}</span>
              <span style={{ display: "block", color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{d}</span>
              <span className="label" style={{ color: "var(--gold)", fontSize: 13, marginTop: 10, display: "block" }}>Découvrir →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section kicker="Qui transmet" title="Un croupier de métier">
        <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, maxWidth: 760 }}>
          Ce guide et l&apos;académie sont signés{" "}
          <Link href="/a-propos" className="link">Jérôme Ibiza</Link>, croupier professionnel et 20e du
          PokerStars Players Championship 2023. Le poker, des deux côtés du tapis.
        </p>
      </Section>
    </div>
  );
}
