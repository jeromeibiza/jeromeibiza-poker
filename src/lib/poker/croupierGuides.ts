/**
 * Cluster « croupier » : pages d'intention SEO autour du métier de dealer poker.
 * C'est l'océan bleu du site (peu de concurrence francophone). Contenu factuel,
 * descriptif du métier et de la formation, sans chiffres inventés (les salaires
 * et durées exactes dépendent des établissements : on reste honnête et général).
 */

export type GuideSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type CroupierGuide = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  intro: string;
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  related: { label: string; href: string }[];
};

export const CROUPIER_GUIDES: CroupierGuide[] = [
  {
    slug: "formation",
    metaTitle: "Formation croupier poker : comment se former (gratuit et écoles)",
    metaDescription:
      "Les voies pour se former au métier de croupier de poker : écoles de croupiers, " +
      "formation sur le tas et académie gratuite en ligne. Programme, durée et conseils par Jérôme Ibiza.",
    kicker: "Se former",
    title: "Formation croupier poker : toutes les voies pour se former",
    intro:
      "Devenir croupier de poker, ça se forme. Bonne nouvelle : il n'y a pas qu'un seul chemin. Voici les trois grandes voies, ce qu'une bonne formation doit couvrir, et comment commencer dès aujourd'hui, gratuitement.",
    sections: [
      {
        heading: "Les trois voies pour se former",
        body:
          "On devient rarement croupier par hasard. La plupart des dealers passent par l'une de ces voies, souvent en les combinant.",
        bullets: [
          "Les écoles de croupiers : formation en présentiel, encadrée, souvent payante, avec du matériel professionnel (table, jetons, sabot). On y travaille les gestes en conditions réelles.",
          "La formation sur le tas : certains établissements recrutent des profils prometteurs et les forment en interne, puis les évaluent avant de les lâcher sur les vraies tables.",
          "L'autodidacte sérieux : avec de bonnes ressources et beaucoup de pratique, on peut acquérir les bases seul. C'est tout l'objet de l'académie croupier gratuite de ce site.",
        ],
      },
      {
        heading: "Ce qu'une bonne formation doit couvrir",
        body:
          "Quelle que soit la voie, le programme tourne toujours autour des mêmes piliers. Une formation qui en oublie un te laissera incomplet face à une vraie table.",
        bullets: [
          "Les règles et le déroulement du poker, parfaitement maîtrisés.",
          "Les gestes techniques : mélange, distribution propre, manipulation des jetons.",
          "Les procédures de table : annonces, gestion du pot et des side pots, prélèvement du rake.",
          "La gestion humaine : litiges, joueurs en tilt, neutralité et autorité calme.",
          "Les spécificités cash game et tournoi, qui ne se gèrent pas tout à fait pareil.",
        ],
      },
      {
        heading: "Combien de temps, et faut-il un diplôme",
        body:
          "Il n'existe pas de diplôme d'État obligatoire universel : ce qui compte, c'est de réussir les tests d'embauche en démontrant des gestes propres et des procédures maîtrisées. Côté durée, les gestes techniques demandent plusieurs semaines à plusieurs mois de répétition pour devenir automatiques. La régularité de l'entraînement compte bien plus que le temps total.",
      },
    ],
    faq: [
      {
        q: "Peut-on se former gratuitement au métier de croupier ?",
        a: "Oui, pour la théorie et une grande partie des gestes : l'académie croupier de ce site couvre le métier module par module, gratuitement. L'idéal reste de compléter par de la pratique sur une vraie table, en école ou en home game.",
      },
      {
        q: "Une école de croupiers est-elle obligatoire ?",
        a: "Non, mais elle accélère beaucoup l'apprentissage des gestes en conditions réelles et rassure certains recruteurs. Beaucoup de dealers se forment toutefois sur le tas ou en autodidacte sérieux avant de passer les tests d'embauche.",
      },
    ],
    related: [
      { label: "Comment devenir croupier de poker", href: "/devenir-croupier-de-poker" },
      { label: "Les gestes techniques du croupier", href: "/croupier/gestes-techniques" },
      { label: "L'académie croupier (gratuite)", href: "/academie-croupier" },
    ],
  },
  {
    slug: "gestes-techniques",
    metaTitle: "Les gestes techniques du croupier de poker : mélange, distribution, chips",
    metaDescription:
      "Mélange, distribution (pitch), manipulation et découpe des jetons (chip handling, chip cutting), " +
      "gestion du pot : les gestes techniques du croupier de poker expliqués par un professionnel.",
    kicker: "Le geste",
    title: "Les gestes techniques du croupier de poker",
    intro:
      "Ce qui sépare un bon croupier d'un débutant, ce sont les gestes. Propres, réguliers, fiables, ils inspirent confiance dès la première table. Voici les gestes clés du métier, du mélange à la découpe des jetons.",
    sections: [
      {
        heading: "Le mélange (shuffle)",
        body:
          "Le mélange garantit l'aléatoire et l'équité. La séquence standard enchaîne plusieurs gestes : le riffle (les deux moitiés du paquet s'imbriquent), le strip (on effeuille le paquet par petits paquets), une boîte, puis la coupe (cut). Le tout doit être rapide, propre, et toujours réalisé à plat sur la table, cartes face cachée, à la vue de tous.",
      },
      {
        heading: "La distribution (la pitch)",
        body:
          "La pitch, c'est l'art d'envoyer chaque carte exactement devant le joueur, à plat, sans la retourner ni l'envoyer trop loin. Une bonne pitch est régulière, silencieuse et toujours dans le bon ordre, en commençant à gauche du bouton. C'est le geste le plus répété de la soirée : il doit être irréprochable.",
      },
      {
        heading: "La manipulation des jetons (chip handling)",
        body:
          "Le croupier manie les jetons en permanence : constituer le pot, rendre la monnaie, payer le gagnant. Deux gestes phares font la signature d'un pro.",
        bullets: [
          "Le chip cutting (la découpe) : séparer d'un seul geste un nombre précis de jetons d'une pile, sans compter un par un. C'est rapide, élégant et ça fluidifie la table.",
          "Le stacking (l'empilement) : ranger les jetons en piles nettes et calibrées, faciles à compter d'un coup d'œil.",
          "Le sizing (le dimensionnement) : annoncer et constituer une mise ou un pot de la bonne hauteur, vite et juste.",
        ],
      },
      {
        heading: "La gestion du pot et du board",
        body:
          "Au-delà des cartes et des jetons, le croupier orchestre le centre de la table : il rassemble les mises dans le pot, sépare proprement les side pots en cas de all-in, dévoile le board (flop, turn, river) d'un geste net, et pousse le pot au gagnant sans hésitation. Chaque geste est annoncé à voix haute.",
      },
      {
        heading: "Pourquoi les gestes comptent autant",
        body:
          "Un geste propre, c'est moins d'erreurs, moins de litiges, et une table qui tourne vite et bien. C'est aussi ce qu'on évalue en premier à l'embauche. On ne naît pas avec : tout se travaille, des heures durant, jusqu'à l'automatisme.",
      },
    ],
    faq: [
      {
        q: "C'est quoi le chip cutting au poker ?",
        a: "Le chip cutting, c'est la découpe des jetons : séparer d'un seul geste un nombre précis de jetons d'une pile, sans les compter un par un. C'est un geste de croupier qui rend la gestion des mises et du pot beaucoup plus rapide et fluide.",
      },
      {
        q: "Comment apprendre les gestes de croupier ?",
        a: "Par la répétition, encore et encore, à vide puis en conditions réelles. On isole chaque geste (riffle, pitch, chip cutting), on le travaille au ralenti, puis on accélère jusqu'à l'automatisme. Une vraie table et des vrais jetons accélèrent beaucoup l'apprentissage.",
      },
    ],
    related: [
      { label: "Comment devenir croupier de poker", href: "/devenir-croupier-de-poker" },
      { label: "Formation croupier poker", href: "/croupier/formation" },
      { label: "L'académie croupier (gratuite)", href: "/academie-croupier" },
    ],
  },
  {
    slug: "salaire",
    metaTitle: "Salaire croupier poker en France : combien gagne un dealer de poker ?",
    metaDescription:
      "Combien gagne un croupier de poker en France ? Fourchettes réalistes par niveau (débutant, confirmé), " +
      "en extra et sur l'année, hors pourboires. Par Jérôme Ibiza, croupier professionnel.",
    kicker: "La paie",
    title: "Salaire d'un croupier de poker en France",
    intro:
      "Combien gagne un croupier de poker ? On parle ici uniquement du poker, pas des autres jeux. Voici des fourchettes réalistes, par niveau et par type de contrat, hors pourboires.",
    sections: [
      {
        heading: "Combien gagne un croupier de poker",
        body:
          "En France, un croupier de poker gagne généralement entre 1 900 et 2 500 euros brut par mois, hors pourboires et primes. Un débutant tourne plutôt autour de 1 900 à 2 250 euros brut mensuels, tandis qu'un dealer poker confirmé peut atteindre environ 2 250 à 2 500 euros brut par mois.",
      },
      {
        heading: "En extra ou en événementiel",
        body:
          "Pour les missions ponctuelles (extra, festivals, soirées privées), la rémunération se compte souvent à l'heure : autour de 13,40 à 14 euros brut de l'heure, avec une majoration pour le travail de nuit selon l'établissement.",
      },
      {
        heading: "Sur l'année, primes comprises",
        body:
          "Ramené à l'année, un poste de croupier poker se situe souvent entre 23 000 et 30 000 euros brut, primes incluses, selon le niveau et l'établissement. Le bas de la fourchette correspond aux débutants, le haut aux profils confirmés des clubs de jeux et casinos les plus actifs.",
      },
      {
        heading: "Ce qui fait varier la paie",
        bullets: [
          "Le niveau et l'expérience : un senior dealer sur les grosses tables n'est pas payé comme un débutant.",
          "L'établissement et la ville : les clubs de jeux parisiens et les casinos très actifs paient mieux.",
          "Le type de contrat : fixe mensuel, extra à l'heure, ou mission de festival.",
          "Les pourboires (le tronc) : selon l'établissement, ils peuvent s'ajouter au salaire de base.",
          "Le travail de nuit : souvent majoré.",
        ],
      },
    ],
    faq: [
      {
        q: "Combien gagne un croupier de poker débutant ?",
        a: "En France, un croupier de poker débutant gagne généralement entre 1 900 et 2 250 euros brut par mois, hors pourboires. La rémunération progresse avec l'expérience et le niveau des tables confiées.",
      },
      {
        q: "Un croupier poker confirmé gagne combien ?",
        a: "Un croupier de poker confirmé se rapproche plutôt de 2 250 à 2 500 euros brut par mois, et davantage sur l'année une fois les primes incluses (souvent jusqu'à 27 000 à 30 000 euros brut annuels).",
      },
      {
        q: "Les pourboires comptent-ils dans le salaire ?",
        a: "Les fourchettes ci-dessus sont hors pourboires. Selon l'établissement, le tronc (la mise en commun des pourboires) peut s'ajouter au salaire de base et faire une vraie différence sur la fiche de paie.",
      },
    ],
    related: [
      { label: "Comment devenir croupier de poker", href: "/devenir-croupier-de-poker" },
      { label: "Formation croupier poker", href: "/croupier/formation" },
      { label: "Les gestes techniques du croupier", href: "/croupier/gestes-techniques" },
    ],
  },
];

export function getCroupierGuide(slug: string): CroupierGuide | undefined {
  return CROUPIER_GUIDES.find((g) => g.slug === slug);
}
