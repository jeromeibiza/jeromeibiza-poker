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
  // JSON-LD supplémentaire propre à la page (ex. Occupation + salaire), émis en
  // plus de l'Article + FAQ. Optionnel.
  structuredData?: Record<string, unknown>[];
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
          "Pour les missions ponctuelles (extra, soirées privées), la rémunération se compte souvent à l'heure : autour de 13,40 à 14 euros brut de l'heure en France, avec une majoration pour le travail de nuit. Sur les grands festivals internationaux et pour les croupiers expérimentés, le tarif horaire grimpe nettement plus haut : il peut atteindre 40 à 50 de l'heure sur les plus gros événements (souvent payés en livres ou en dollars).",
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
        q: "Combien gagne un croupier de poker sur un grand festival ?",
        a: "Sur les grands festivals internationaux, les croupiers expérimentés sont bien mieux payés qu'en extra classique : le tarif horaire peut atteindre 40 à 50 de l'heure (souvent en livres ou en dollars), selon l'événement et l'expérience.",
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
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Occupation",
        name: "Croupier de poker",
        description:
          "Professionnel qui anime les tables de poker : distribution, gestion du pot et du rake, arbitrage des litiges. Rémunération en France hors pourboires.",
        occupationLocation: { "@type": "Country", name: "France" },
        estimatedSalary: [
          {
            "@type": "MonetaryAmountDistribution",
            name: "salaire mensuel brut (hors pourboires)",
            currency: "EUR",
            duration: "P1M",
            percentile10: 1900,
            median: 2200,
            percentile90: 2500,
          },
        ],
      },
    ],
  },
  {
    slug: "fiche-metier",
    metaTitle: "Fiche métier croupier de poker : rôle, missions et journée type",
    metaDescription:
      "Le métier de croupier de poker en clair : rôle à la table, missions au quotidien, déroulé d'une soirée type et compétences clés. Par Jérôme Ibiza, croupier professionnel.",
    kicker: "Le métier",
    title: "Fiche métier : croupier de poker",
    intro:
      "Le croupier de poker est le chef d'orchestre de la table. Il ne joue pas contre les joueurs : il garantit que la partie se déroule vite, proprement et dans les règles. Voici une fiche métier claire, du rôle à la journée type.",
    sections: [
      {
        heading: "Le rôle du croupier de poker",
        body:
          "Contrairement au croupier de black-jack ou de roulette, le croupier de poker n'affronte personne : la banque ne joue pas. Son rôle est d'être un arbitre neutre et un facilitateur. Il distribue, fait respecter les règles, gère le pot et maintient un rythme fluide, sans jamais prendre parti.",
      },
      {
        heading: "Les missions au quotidien",
        bullets: [
          "Mélanger et distribuer les cartes proprement, main après main.",
          "Annoncer les actions, gérer les mises, constituer le pot et les side pots.",
          "Prélever le rake (la commission de la salle) selon le barème en vigueur.",
          "Faire respecter les règles et trancher les litiges avec calme et autorité.",
          "Garder une table agréable : rythme, ambiance, neutralité absolue.",
        ],
      },
      {
        heading: "Une soirée type",
        body:
          "Une session se découpe en rotations : le croupier enchaîne les mains sur sa table pendant une durée définie, puis tourne vers une autre table ou prend sa pause (le fameux down). En tournoi, il suit la structure (niveaux de blindes qui montent) et gère les éliminations. En cash game, la table vit en continu, les joueurs entrent et sortent librement.",
      },
      {
        heading: "Les compétences clés",
        body:
          "Le métier mélange technique et savoir-être. Côté technique : gestes propres, calcul rapide, maîtrise totale des règles. Côté humain : sang-froid, neutralité, autorité tranquille et endurance, car on travaille debout, concentré, souvent tard.",
      },
    ],
    faq: [
      {
        q: "En quoi consiste le métier de croupier de poker ?",
        a: "Le croupier de poker anime la table sans y jouer : il distribue les cartes, gère les mises et le pot, prélève le rake, fait respecter les règles et arbitre les litiges. Son rôle est d'assurer une partie rapide, propre et équitable.",
      },
      {
        q: "Le croupier de poker joue-t-il contre les joueurs ?",
        a: "Non. Au poker, la salle ne joue pas : les joueurs s'affrontent entre eux. Le croupier est un arbitre neutre, payé pour gérer la table, pas pour gagner des mains.",
      },
      {
        q: "Quelle différence entre un croupier et un chef de table ?",
        a: "Le croupier gère sa table ; le chef de table (ou floor) supervise plusieurs tables, tranche les litiges difficiles et coordonne les rotations. C'est souvent la première évolution de carrière d'un bon croupier.",
      },
    ],
    related: [
      { label: "Comment devenir croupier de poker", href: "/devenir-croupier-de-poker" },
      { label: "Le salaire d'un croupier de poker", href: "/croupier/salaire" },
      { label: "Évolution de carrière du croupier", href: "/croupier/evolution-carriere" },
    ],
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Occupation",
        name: "Croupier de poker",
        description:
          "Professionnel qui anime les tables de poker sans y jouer : il distribue les cartes, gère le pot et le rake, fait respecter les règles et arbitre les litiges en restant neutre.",
        responsibilities: [
          "Mélanger et distribuer les cartes proprement, main après main.",
          "Gérer les mises, constituer le pot et séparer les side pots.",
          "Prélever le rake selon le barème de la salle.",
          "Faire respecter les règles et arbitrer les litiges avec neutralité.",
        ],
        skills:
          "Dextérité et gestes propres (pitch, mélange, chip handling), calcul mental rapide, maîtrise des règles, neutralité, sang-froid et endurance.",
        qualifications:
          "Aucun diplôme d'État obligatoire : les gestes et les procédures sont validés par un test d'embauche. Majorité et casier compatible avec un agrément requis.",
        occupationLocation: { "@type": "Country", name: "France" },
      },
    ],
  },
  {
    slug: "sans-diplome",
    metaTitle: "Devenir croupier de poker sans diplôme : est-ce possible ?",
    metaDescription:
      "Peut-on devenir croupier de poker sans diplôme ? Ce qui compte vraiment à l'embauche, comment compenser, et les conditions incontournables (âge, casier). Par Jérôme Ibiza.",
    kicker: "Sans diplôme",
    title: "Devenir croupier de poker sans diplôme",
    intro:
      "Bonne nouvelle : il n'existe pas de diplôme d'État obligatoire pour dealer le poker. Ce qui ouvre les portes, ce sont des gestes propres et des procédures maîtrisées, démontrés le jour du test. Voici ce qui compte vraiment, et les conditions à respecter.",
    sections: [
      {
        heading: "Faut-il un diplôme pour être croupier ?",
        body:
          "Non, pas de diplôme universel imposé. Le métier se juge sur la pratique : un recruteur veut voir une distribution nette, un mélange réglementaire, une gestion de pot sans erreur et des règles parfaitement connues. Un autodidacte sérieux et bien entraîné peut donc tout à fait réussir un test d'embauche.",
      },
      {
        heading: "Ce qui compte vraiment : le test d'embauche",
        body:
          "À l'embauche, on évalue tes gestes en conditions réelles : pitch, shuffle, chip handling, annonces, calcul du pot et du rake. C'est là que tout se joue. La régularité et la propreté priment sur n'importe quel papier.",
      },
      {
        heading: "Comment compenser l'absence de diplôme",
        bullets: [
          "Travailler les gestes jusqu'à l'automatisme, avec de vrais jetons et un vrai sabot.",
          "Maîtriser les règles et les procédures sur le bout des doigts (académie croupier gratuite, home games).",
          "Se filmer pour corriger sa pitch et son chip cutting.",
          "Multiplier la pratique réelle : home games, associations, écoles de croupiers.",
        ],
      },
      {
        heading: "Les conditions incontournables",
        body:
          "Au-delà de la technique, le métier impose un cadre légal. Il faut être majeur, présenter un casier judiciaire compatible avec un agrément en établissement de jeux, et accepter les horaires de nuit et de week-end. Ces conditions ne se négocient pas : elles font partie du métier.",
      },
    ],
    faq: [
      {
        q: "Peut-on devenir croupier de poker sans diplôme ?",
        a: "Oui. Il n'y a pas de diplôme d'État obligatoire : on est recruté sur des tests pratiques (gestes, procédures, règles). Un candidat bien entraîné, même autodidacte, peut réussir ces tests et être embauché.",
      },
      {
        q: "Faut-il un casier judiciaire vierge ?",
        a: "Le travail en établissement de jeux est encadré et soumis à agrément : un casier compatible est exigé. Les conditions précises dépendent de l'établissement et de la réglementation locale.",
      },
      {
        q: "Quel âge minimum pour être croupier ?",
        a: "Il faut être majeur. L'accès aux salles de jeux et la délivrance des agréments imposent la majorité légale, en plus des autres conditions d'embauche.",
      },
    ],
    related: [
      { label: "Formation croupier poker", href: "/croupier/formation" },
      { label: "Les qualités pour devenir croupier", href: "/croupier/qualites" },
      { label: "L'académie croupier (gratuite)", href: "/academie-croupier" },
    ],
  },
  {
    slug: "qualites",
    metaTitle: "Quelles qualités pour devenir croupier de poker ?",
    metaDescription:
      "Les qualités d'un bon croupier de poker : sang-froid, neutralité, dextérité, calcul rapide et sens du relationnel. Et comment savoir si le métier est fait pour toi. Par Jérôme Ibiza.",
    kicker: "Les qualités",
    title: "Les qualités pour devenir croupier de poker",
    intro:
      "Un bon croupier ne se résume pas à des mains agiles. C'est un mélange de technique, de mental et de relationnel. Voici les qualités qui font la différence, et comment juger si le métier te correspond.",
    sections: [
      {
        heading: "Les qualités humaines",
        bullets: [
          "La neutralité : ne jamais prendre parti, traiter chaque joueur exactement pareil.",
          "Le sang-froid : rester calme face aux joueurs en tilt ou aux litiges tendus.",
          "L'autorité tranquille : tenir la table sans hausser le ton.",
          "Le sens du service : une table agréable fait revenir les joueurs.",
        ],
      },
      {
        heading: "Les qualités techniques",
        body:
          "Le métier exige de la dextérité (gestes propres et rapides), une bonne mémoire des règles et des procédures, et un calcul mental fiable pour les pots, les side pots et le rake. Rien d'inné : tout se travaille, mais il faut aimer répéter un geste jusqu'à le rendre automatique.",
      },
      {
        heading: "Le mental et l'endurance",
        body:
          "On travaille debout, concentré, souvent tard dans la nuit, parfois plusieurs heures de suite. La concentration ne doit jamais retomber : une erreur de distribution ou de paiement peut coûter cher. L'endurance physique et nerveuse fait partie du métier.",
      },
      {
        heading: "Le métier est-il fait pour toi ?",
        body:
          "Pose-toi ces questions : aimes-tu le poker et son ambiance ? Es-tu à l'aise avec du public et des situations tendues ? Es-tu prêt à travailler la nuit et le week-end ? Es-tu patient avec un geste technique ? Si tu réponds oui, le terrain est favorable. La meilleure façon de vérifier reste d'essayer, table en main.",
      },
    ],
    faq: [
      {
        q: "Quelles qualités faut-il pour être croupier de poker ?",
        a: "Surtout de la neutralité, du sang-froid et de la dextérité, complétés par un bon calcul mental, une mémoire solide des règles et un vrai sens du relationnel. L'endurance compte aussi, car on travaille debout et tard.",
      },
      {
        q: "Faut-il être bon en calcul mental ?",
        a: "Oui, un calcul rapide et fiable aide énormément : constituer un pot, séparer des side pots, rendre la monnaie et prélever le rake doivent se faire vite et juste. Ça se travaille avec la pratique.",
      },
      {
        q: "Faut-il aimer le poker pour devenir croupier ?",
        a: "Ce n'est pas obligatoire, mais ça aide beaucoup : comprendre le jeu, son rythme et ses joueurs rend le travail plus naturel et plus agréable, et inspire confiance à la table.",
      },
    ],
    related: [
      { label: "Comment devenir croupier de poker", href: "/devenir-croupier-de-poker" },
      { label: "Les gestes techniques du croupier", href: "/croupier/gestes-techniques" },
      { label: "Devenir croupier sans diplôme", href: "/croupier/sans-diplome" },
    ],
  },
  {
    slug: "horaires-conditions",
    metaTitle: "Croupier de poker : horaires, rythme et conditions de travail",
    metaDescription:
      "Horaires de nuit et de week-end, rotations, travail debout, concentration : les conditions réelles du métier de croupier de poker, avantages et contraintes. Par Jérôme Ibiza.",
    kicker: "Les conditions",
    title: "Horaires et conditions de travail du croupier de poker",
    intro:
      "Le poker se joue surtout le soir et la nuit : le métier de croupier suit ce rythme. Avant de se lancer, mieux vaut savoir à quoi ressemble vraiment le quotidien, entre rotations, horaires décalés et travail debout.",
    sections: [
      {
        heading: "Des horaires décalés",
        body:
          "L'activité d'une salle bat son plein le soir, la nuit et le week-end : c'est là que les croupiers sont les plus demandés. Les horaires sont donc décalés par rapport à un emploi de bureau, avec souvent du travail de nuit (généralement majoré) et des week-ends travaillés.",
      },
      {
        heading: "Le rythme d'une table",
        body:
          "Le travail s'organise en rotations : le croupier deale sa table un temps donné, puis tourne ou prend sa pause (le down). Ce système maintient la concentration et limite la fatigue. En tournoi, le rythme suit la structure des niveaux ; en cash game, la table tourne en continu.",
      },
      {
        heading: "Les conditions physiques",
        body:
          "On travaille principalement debout, les mains en mouvement permanent et l'esprit en alerte. La concentration ne doit jamais retomber, même tard. C'est un métier plus physique et plus exigeant nerveusement qu'il n'y paraît de l'extérieur.",
      },
      {
        heading: "Avantages et contraintes",
        bullets: [
          "Avantages : ambiance vivante, contact humain, métier concret, pourboires possibles selon l'établissement, et de vraies opportunités à l'international.",
          "Contraintes : horaires de nuit et de week-end, travail debout, concentration soutenue, neutralité de chaque instant.",
        ],
      },
    ],
    faq: [
      {
        q: "Quels sont les horaires d'un croupier de poker ?",
        a: "Surtout le soir, la nuit et le week-end, car c'est là que les salles sont les plus actives. Les horaires sont décalés, avec fréquemment du travail de nuit, souvent majoré.",
      },
      {
        q: "Le métier de croupier est-il fatigant ?",
        a: "Il est plus exigeant qu'il n'y paraît : on travaille debout, longtemps, en restant concentré et neutre. Le système de rotations et de pauses (les downs) est justement là pour préserver la vigilance.",
      },
      {
        q: "Travaille-t-on tous les week-ends ?",
        a: "Le week-end est un gros moment d'activité, donc souvent travaillé, mais l'organisation dépend des plannings et de l'établissement. C'est une réalité à accepter avant de se lancer.",
      },
    ],
    related: [
      { label: "Fiche métier croupier de poker", href: "/croupier/fiche-metier" },
      { label: "Le salaire d'un croupier de poker", href: "/croupier/salaire" },
      { label: "Les qualités pour devenir croupier", href: "/croupier/qualites" },
    ],
  },
  {
    slug: "evolution-carriere",
    metaTitle: "Croupier de poker : évolution de carrière et débouchés",
    metaDescription:
      "De croupier à chef de table, floor manager puis directeur de tournoi : les évolutions de carrière du dealer de poker, la spécialisation et l'international. Par Jérôme Ibiza.",
    kicker: "La carrière",
    title: "Évolution de carrière du croupier de poker",
    intro:
      "Croupier, ce n'est pas un point d'arrivée : c'est une porte d'entrée. Avec de l'expérience et des gestes irréprochables, le métier ouvre vers l'encadrement, la spécialisation et de belles opportunités à l'étranger. Voici les grands paliers.",
    sections: [
      {
        heading: "Les paliers classiques",
        bullets: [
          "Croupier : la table, le coeur du métier, où tout se construit.",
          "Chef de table ou floor : on supervise plusieurs tables, on tranche les litiges difficiles, on coordonne les rotations.",
          "Floor manager : on gère une salle, les plannings et les équipes.",
          "Directeur de tournoi (TD) : on pilote l'événement entier, de la structure aux décisions finales.",
        ],
      },
      {
        heading: "Se spécialiser",
        body:
          "Avec l'expérience, on confie au croupier les tables les plus exigeantes : high stakes, finales, tables télévisées. Cette montée en gamme est elle-même une évolution, reconnue et mieux rémunérée, sans forcément quitter la table.",
      },
      {
        heading: "Partir à l'international",
        body:
          "Les grands festivals (Europe, Malte, Londres, circuits internationaux) recrutent des croupiers expérimentés et fiables. C'est l'une des plus belles évolutions du métier : voyager, dealer les plus gros événements, et y gagner nettement mieux qu'en extra classique.",
      },
      {
        heading: "Au-delà de la table",
        body:
          "Un croupier chevronné peut aussi transmettre : formateur en école de croupiers, responsable de la formation interne, ou encadrement. L'expérience acquise à la table devient alors un savoir que l'on enseigne.",
      },
    ],
    faq: [
      {
        q: "Quelles évolutions après croupier de poker ?",
        a: "On évolue généralement vers chef de table puis floor manager, et l'on peut viser le poste de directeur de tournoi. En parallèle, on peut se spécialiser sur les grosses tables et les festivals, ou passer à la formation.",
      },
      {
        q: "C'est quoi un floor manager au poker ?",
        a: "Le floor (ou chef de table) supervise plusieurs tables, arbitre les litiges que le croupier ne tranche pas seul, et coordonne le bon déroulement de la salle. C'est une évolution naturelle pour un croupier expérimenté.",
      },
      {
        q: "Peut-on devenir directeur de tournoi ?",
        a: "Oui, c'est l'un des débouchés les plus aboutis. Le directeur de tournoi (TD) pilote l'événement de bout en bout : structure, décisions, coordination des équipes. On y arrive avec de l'expérience de table et d'encadrement.",
      },
    ],
    related: [
      { label: "Fiche métier croupier de poker", href: "/croupier/fiche-metier" },
      { label: "Le salaire d'un croupier de poker", href: "/croupier/salaire" },
      { label: "Comment devenir croupier de poker", href: "/devenir-croupier-de-poker" },
    ],
  },
  {
    slug: "croupier-poker-vs-casino",
    metaTitle: "Croupier de poker ou de casino : quelles différences ?",
    metaDescription:
      "Croupier de poker contre croupier de casino : qui joue contre qui, gestes et procédures, polyvalence et accès au métier. Les vraies différences, par Jérôme Ibiza.",
    kicker: "Poker vs casino",
    title: "Croupier de poker vs croupier de casino",
    intro:
      "On confond souvent les deux, mais dealer du poker n'est pas tout à fait le même métier que tenir une roulette ou un black-jack. Voici ce qui rapproche ces deux croupiers, et surtout ce qui les distingue vraiment.",
    sections: [
      {
        heading: "Deux métiers proches",
        body:
          "Croupier de poker et croupier de casino partagent le même socle : des gestes propres, des procédures strictes, une neutralité absolue et le sens du service. Dans les deux cas, on anime un jeu d'argent dans un cadre réglementé, souvent de nuit et le week-end.",
      },
      {
        heading: "La grande différence : qui joue contre qui",
        body:
          "Au black-jack ou à la roulette, le croupier représente la banque : il joue, paie et ramasse face aux joueurs. Au poker, la salle ne joue pas : les joueurs s'affrontent entre eux et le croupier reste un pur arbitre. Sa rémunération vient du service et du rake, jamais d'un résultat contre les joueurs.",
      },
      {
        heading: "Gestes et procédures",
        body:
          "Le croupier de poker se concentre sur la distribution (pitch), le mélange, la gestion du pot et des side pots, et le prélèvement du rake. Le croupier de casino maîtrise d'autres gestes propres à chaque jeu (paiement à la roulette, gestion du sabot au black-jack). Les bases de manipulation des jetons se ressemblent, le reste diffère.",
      },
      {
        heading: "Lequel choisir",
        body:
          "Si tu aimes le poker, son rythme et son ambiance, le poker s'impose. Le métier de croupier de casino offre, lui, plus de polyvalence (plusieurs jeux). Beaucoup de croupiers savent d'ailleurs dealer plusieurs jeux, ce qui élargit les opportunités d'embauche.",
      },
    ],
    faq: [
      {
        q: "Quelle différence entre croupier de poker et croupier de casino ?",
        a: "Au casino (roulette, black-jack), le croupier représente la banque et joue contre les joueurs. Au poker, la salle ne joue pas : le croupier est un arbitre neutre qui anime la table et se rémunère via le service et le rake.",
      },
      {
        q: "Un croupier de poker peut-il dealer d'autres jeux ?",
        a: "Souvent oui : beaucoup de croupiers sont polyvalents et maîtrisent plusieurs jeux de table. Cette polyvalence est appréciée des établissements et élargit les possibilités d'embauche.",
      },
      {
        q: "Le poker est-il plus accessible que les autres jeux ?",
        a: "Les deux demandent des gestes propres et des procédures maîtrisées. Le poker a l'avantage d'un cadre où le croupier n'affronte pas les joueurs, ce qui change la pression ressentie à la table. L'accès dépend surtout de ta technique et des tests d'embauche.",
      },
    ],
    related: [
      { label: "Fiche métier croupier de poker", href: "/croupier/fiche-metier" },
      { label: "Formation croupier poker", href: "/croupier/formation" },
      { label: "Les gestes techniques du croupier", href: "/croupier/gestes-techniques" },
    ],
  },
  {
    slug: "test-embauche",
    metaTitle: "Test d'embauche croupier de poker : comment ça se passe ?",
    metaDescription:
      "Le test d'embauche du croupier de poker : déroulé de l'audition, ce que le recruteur évalue, comment se préparer et les erreurs qui éliminent. Par Jérôme Ibiza.",
    kicker: "L'audition",
    title: "Le test d'embauche du croupier de poker",
    intro:
      "On ne devient pas croupier sur CV : on le devient à la table, le jour du test. C'est une audition pratique où l'on juge tes gestes et tes procédures en conditions réelles. Voici à quoi t'attendre, et comment mettre toutes les chances de ton côté.",
    sections: [
      {
        heading: "À quoi ressemble le test",
        body:
          "Le test se passe sur une vraie table, avec de vrais jetons et un sabot. On te demande de dealer une ou plusieurs mains comme en condition de jeu : mélange, distribution, gestion des mises, constitution du pot, paiement du gagnant. Le recruteur observe, parfois en simulant un litige ou une situation délicate pour voir comment tu réagis.",
      },
      {
        heading: "Ce que le recruteur évalue",
        bullets: [
          "La propreté et la régularité des gestes : pitch nette, mélange réglementaire, chip handling fluide.",
          "La maîtrise des règles et des procédures, sans hésitation.",
          "Le calcul : pot, side pots, rendu de monnaie et rake, vite et juste.",
          "Le comportement : neutralité, calme, autorité tranquille face à un joueur difficile.",
          "Le rythme : une table qui tourne vite et bien, sans erreurs.",
        ],
      },
      {
        heading: "Comment se préparer",
        body:
          "La préparation, c'est de la répétition. Travaille chaque geste à vide, puis en home game ou en école jusqu'à l'automatisme. Connais les procédures par coeur. Le jour J, respire, ralentis si besoin : un geste propre et un peu lent vaut mieux qu'un geste rapide et brouillon.",
      },
      {
        heading: "Les erreurs qui éliminent",
        bullets: [
          "Exposer une carte en distribuant (flash) ou distribuer dans le désordre.",
          "Se tromper dans le pot, le paiement ou le rake.",
          "Perdre son sang-froid ou prendre parti dans un litige.",
          "Des gestes brouillons qui ralentissent la table et minent la confiance.",
        ],
      },
    ],
    faq: [
      {
        q: "Comment se passe un test d'embauche de croupier ?",
        a: "C'est une audition pratique sur une vraie table : tu deales des mains pendant que le recruteur juge tes gestes, ta maîtrise des règles, ton calcul et ton comportement. Il peut simuler un litige pour tester ton sang-froid.",
      },
      {
        q: "Que faut-il montrer pour réussir ?",
        a: "Des gestes propres et réguliers (pitch, mélange, chip handling), des procédures maîtrisées, un calcul juste et rapide, et une attitude neutre et calme. La fiabilité prime sur la vitesse pure.",
      },
      {
        q: "Peut-on repasser un test si on échoue ?",
        a: "Souvent oui, après s'être entraîné davantage. Un échec pointe en général ce qui n'est pas encore au niveau : on retravaille ces points précis, puis on retente, ici ou ailleurs.",
      },
    ],
    related: [
      { label: "Devenir croupier sans diplôme", href: "/croupier/sans-diplome" },
      { label: "Les gestes techniques du croupier", href: "/croupier/gestes-techniques" },
      { label: "Formation croupier poker", href: "/croupier/formation" },
    ],
  },
  {
    slug: "a-l-etranger",
    metaTitle: "Croupier de poker à l'étranger : Malte, Londres et festivals",
    metaDescription:
      "Travailler comme croupier de poker à l'étranger : destinations (Malte, Londres, circuits), niveau d'anglais, expérience demandée et festivals internationaux. Par Jérôme Ibiza.",
    kicker: "À l'international",
    title: "Devenir croupier de poker à l'étranger",
    intro:
      "L'une des plus belles évolutions du métier, c'est de passer les frontières. Les grands festivals et les places fortes du poker recrutent des croupiers fiables, et y travailler paie souvent bien mieux qu'en extra classique. Voici comment s'y projeter.",
    sections: [
      {
        heading: "Pourquoi partir",
        body:
          "Travailler à l'étranger, c'est dealer les plus gros événements, gagner en expérience et, souvent, mieux gagner sa vie. C'est aussi une vitrine : un croupier qui a tenu de grandes tables internationales se revend mieux partout ensuite.",
      },
      {
        heading: "Les destinations phares",
        bullets: [
          "Malte : un hub majeur du poker en ligne et live, avec de nombreux événements.",
          "Londres et le Royaume-Uni : circuits réguliers et gros festivals.",
          "Les circuits internationaux : étapes à travers l'Europe et le monde, qui recrutent des dealers à la mission.",
        ],
      },
      {
        heading: "Ce qu'il faut pour y aller",
        body:
          "Trois choses comptent : de l'expérience et des gestes irréprochables, un anglais fonctionnel (la langue de travail des tables internationales), et une vraie fiabilité (ponctualité, neutralité, endurance). Les recruteurs de festivals misent sur des croupiers sûrs, capables de tenir le rythme sur plusieurs jours.",
      },
      {
        heading: "Les festivals internationaux",
        body:
          "Les grands festivals embauchent des croupiers le temps de l'événement. C'est exigeant (longues journées, niveau élevé) mais formateur et bien rémunéré : sur ces missions, le tarif horaire grimpe nettement plus haut qu'en extra classique, souvent payé en livres ou en dollars.",
      },
    ],
    faq: [
      {
        q: "Peut-on travailler comme croupier de poker à l'étranger ?",
        a: "Oui, c'est une évolution courante du métier. Les festivals et les places fortes du poker (Malte, Londres, circuits internationaux) recrutent des croupiers expérimentés et fiables, souvent à la mission.",
      },
      {
        q: "Faut-il parler anglais pour dealer à l'international ?",
        a: "Oui, un anglais fonctionnel est quasi indispensable : c'est la langue de travail des tables internationales, pour les annonces, les procédures et la communication avec les joueurs.",
      },
      {
        q: "Est-ce mieux payé qu'en France ?",
        a: "Sur les grands festivals, oui : le tarif horaire des croupiers expérimentés y est nettement plus élevé qu'en extra classique en France, souvent payé en devises étrangères. En contrepartie, les journées sont longues et le niveau élevé.",
      },
    ],
    related: [
      { label: "Le salaire d'un croupier de poker", href: "/croupier/salaire" },
      { label: "Évolution de carrière du croupier", href: "/croupier/evolution-carriere" },
      { label: "Comment devenir croupier de poker", href: "/devenir-croupier-de-poker" },
    ],
  },
  {
    slug: "reconversion",
    metaTitle: "Reconversion croupier de poker : se lancer à tout âge",
    metaDescription:
      "Se reconvertir en croupier de poker : un métier accessible sans diplôme d'État, les atouts d'un profil en reconversion, par où commencer et comment concilier avec un emploi. Par Jérôme Ibiza.",
    kicker: "La reconversion",
    title: "Devenir croupier de poker en reconversion",
    intro:
      "Le métier de croupier n'est pas réservé aux jeunes diplômés : c'est l'une des reconversions les plus ouvertes, parce qu'on y est jugé sur la pratique, pas sur un parcours scolaire. Voici pourquoi, et comment s'y prendre concrètement.",
    sections: [
      {
        heading: "Un métier ouvert à la reconversion",
        body:
          "Comme il n'existe pas de diplôme d'État obligatoire, on entre dans le métier par la compétence : des gestes propres, des procédures maîtrisées, et la réussite d'un test d'embauche. C'est ce qui rend la reconversion possible à des âges et des parcours très variés.",
      },
      {
        heading: "Les atouts d'un profil en reconversion",
        bullets: [
          "La maturité et le sang-froid, précieux pour gérer une table et les litiges.",
          "L'expérience du contact client ou du service, directement réutilisable.",
          "La motivation : on se reconvertit par choix, ce qui se voit à l'entraînement.",
          "La rigueur professionnelle, déjà acquise dans un autre métier.",
        ],
      },
      {
        heading: "Par où commencer",
        body:
          "On commence par la théorie et les gestes : règles, procédures, mélange, distribution, chip handling. L'académie croupier gratuite de ce site couvre le métier module par module. On complète par de la pratique réelle (home games, école de croupiers) avant de viser les tests d'embauche.",
      },
      {
        heading: "Concilier avec son emploi actuel",
        body:
          "Bonne nouvelle : les horaires du métier (soir, nuit, week-end) permettent souvent de s'entraîner et de débuter en extra sans tout quitter d'un coup. Beaucoup commencent par des missions ponctuelles avant de basculer à plein temps une fois les gestes fiables et le réseau construit.",
      },
    ],
    faq: [
      {
        q: "Peut-on devenir croupier de poker en reconversion ?",
        a: "Oui, c'est même une voie fréquente. Sans diplôme d'État obligatoire, on entre par la pratique : on se forme aux gestes et aux procédures, puis on réussit un test d'embauche. Maturité et expérience du contact sont des atouts.",
      },
      {
        q: "Y a-t-il un âge limite pour se reconvertir croupier ?",
        a: "Il faut être majeur, et au-delà c'est surtout la compétence et la fiabilité qui comptent. Un profil en reconversion, mûr et motivé, est tout à fait recevable à la table.",
      },
      {
        q: "Combien de temps pour se reconvertir croupier ?",
        a: "Cela dépend du rythme d'entraînement. Les gestes techniques demandent plusieurs semaines à plusieurs mois de répétition pour devenir propres et automatiques ; les règles et procédures s'apprennent plus vite. La régularité fait toute la différence.",
      },
    ],
    related: [
      { label: "Formation croupier poker", href: "/croupier/formation" },
      { label: "Devenir croupier sans diplôme", href: "/croupier/sans-diplome" },
      { label: "L'académie croupier (gratuite)", href: "/academie-croupier" },
    ],
  },
];

export function getCroupierGuide(slug: string): CroupierGuide | undefined {
  return CROUPIER_GUIDES.find((g) => g.slug === slug);
}
