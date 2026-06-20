/**
 * Guide du poker en ligne : articles pédagogiques et neutres.
 * Aucune promotion d'une salle précise, aucun lien d'affiliation.
 * Rédaction soignée : accents corrects, aucun marqueur "contenu IA".
 */

export type ArticleSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type OnlineArticle = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  minutes: number;
  sections: ArticleSection[];
  takeaways: string[];
  dealerNote?: string;
};

export const ARTICLES: OnlineArticle[] = [
  {
    slug: "choisir-une-room",
    title: "Comment choisir une room de poker en ligne",
    short: "Choisir une room",
    summary:
      "Toutes les salles ne se valent pas. Avant de déposer le moindre euro, mieux vaut savoir ce qui distingue une bonne plateforme d'une mauvaise. Voici les critères qui comptent vraiment.",
    minutes: 6,
    sections: [
      {
        heading: "Les critères qui comptent",
        bullets: [
          "La licence et la régulation : une salle sérieuse affiche clairement son agrément.",
          "Le trafic : plus il y a de joueurs, plus vous trouvez des parties à votre niveau et à toute heure.",
          "Les formats proposés : cash game, tournois, Spin, selon ce que vous aimez jouer.",
          "L'ergonomie du logiciel : stabilité, application mobile, lisibilité des tables.",
          "La rapidité et la fiabilité des retraits, un signe de sérieux décisif.",
        ],
      },
      {
        heading: "Méfiez-vous des fausses bonnes affaires",
        body:
          "Un bonus énorme ne fait pas une bonne salle. Ce qui compte, c'est la fiabilité, la qualité des parties et la facilité à récupérer son argent. Vérifiez les avis, la réputation et l'ancienneté avant de vous engager.",
      },
    ],
    takeaways: [
      "Licence et fiabilité des retraits avant tout.",
      "Le trafic détermine la qualité et la disponibilité des parties.",
      "Un gros bonus ne compense jamais une salle peu sérieuse.",
    ],
    dealerNote:
      "Le meilleur indicateur d'une salle sérieuse, c'est la simplicité à retirer ses gains. Avant de jouer gros, fais un petit dépôt, joue un peu, puis teste un retrait. Tu sauras vite à qui tu as affaire.",
  },
  {
    slug: "deposer-de-largent",
    title: "Déposer et retirer : méthodes, délais et bonnes pratiques",
    short: "Déposer de l'argent",
    summary:
      "Comprendre comment l'argent entre et sort de votre compte évite bien des mauvaises surprises. Tour d'horizon des méthodes, des délais et des réflexes à adopter.",
    minutes: 5,
    sections: [
      {
        heading: "Les méthodes courantes",
        bullets: [
          "Carte bancaire : simple et rapide pour le dépôt.",
          "Portefeuilles électroniques : souvent les plus rapides pour le retrait.",
          "Virement bancaire : fiable mais plus lent.",
          "Important : on retire en général par le même moyen que celui utilisé pour déposer.",
        ],
      },
      {
        heading: "Les bons réflexes",
        body:
          "Ne déposez que ce que vous avez prévu de jouer, jamais plus. Vérifiez les plafonds et les délais de retrait avant de commencer. Effectuez votre vérification d'identité tôt, pour ne pas être bloqué au moment de retirer vos gains.",
      },
    ],
    takeaways: [
      "On retire le plus souvent par le moyen utilisé pour déposer.",
      "Vérifiez plafonds et délais avant de jouer.",
      "Faites votre vérification d'identité dès le départ.",
    ],
    dealerNote:
      "Fixe-toi un montant de dépôt à l'avance et tiens-t'y. La discipline commence au moment du dépôt, pas à la table.",
  },
  {
    slug: "les-bonus",
    title: "Les bonus de poker : comment ça marche vraiment",
    short: "Les bonus",
    summary:
      "Bonus de bienvenue, freerolls, tickets : les salles rivalisent d'offres. Mais un bonus n'est pas un cadeau immédiat. Voici comment lire les conditions et en tirer parti sans illusion.",
    minutes: 6,
    sections: [
      {
        heading: "Le bonus de bienvenue",
        body:
          "Le plus courant double votre premier dépôt, mais il se libère progressivement, au fur et à mesure que vous générez du rake en jouant. Lisez toujours les conditions : montant, délai pour le débloquer, et rythme de libération. Un bonus non joué dans les temps est perdu.",
      },
      {
        heading: "Les autres offres",
        bullets: [
          "Les freerolls : des tournois gratuits avec de vrais gains, parfaits pour débuter sans risque.",
          "Les tickets : des entrées offertes pour certains tournois.",
          "Les missions et récompenses de fidélité, qui s'accumulent avec le volume de jeu.",
        ],
      },
    ],
    takeaways: [
      "Un bonus se libère en jouant, ce n'est pas de l'argent immédiat.",
      "Lisez toujours le délai et les conditions de déblocage.",
      "Les freerolls sont la meilleure façon de débuter sans risque.",
    ],
    dealerNote:
      "Ne choisis jamais une salle pour son bonus. Choisis-la pour ses parties et sa fiabilité, le bonus n'est qu'un bonus.",
  },
  {
    slug: "le-rakeback",
    title: "Le rakeback : récupérer une partie du rake",
    short: "Le rakeback",
    summary:
      "Chaque pot que vous jouez prélève une petite commission pour la salle, le rake. Le rakeback vous en rend une partie. Pour un joueur de volume, c'est loin d'être négligeable.",
    minutes: 5,
    sections: [
      {
        heading: "Comprendre le rake et son retour",
        body:
          "Le rake est la commission prélevée par la salle sur chaque pot ou chaque inscription de tournoi. Les programmes de fidélité reversent une part de ce rake, sous forme de cash, de points ou de récompenses. Plus vous jouez, plus ce retour s'accumule.",
      },
      {
        heading: "Pourquoi ça compte",
        bullets: [
          "Sur le long terme, le rakeback peut transformer un résultat neutre en résultat positif.",
          "Il récompense le volume, donc surtout les joueurs réguliers.",
          "C'est un critère réel de choix entre deux salles équivalentes.",
        ],
      },
    ],
    takeaways: [
      "Le rakeback vous rend une partie de la commission payée.",
      "Il récompense le volume de jeu.",
      "À salles équivalentes, le programme de fidélité fait la différence.",
    ],
    dealerNote:
      "Le rakeback, c'est l'argent que la plupart des joueurs oublient de réclamer. Si tu joues régulièrement, ce petit pourcentage finit par peser lourd sur ton année.",
  },
  {
    slug: "la-securite",
    title: "Sécuriser son compte de poker en ligne",
    short: "La sécurité",
    summary:
      "Votre compte contient de l'argent : il mérite la même protection que votre banque. Quelques réflexes simples suffisent à éviter la grande majorité des problèmes.",
    minutes: 5,
    sections: [
      {
        heading: "Les protections de base",
        bullets: [
          "Un mot de passe unique et solide, jamais réutilisé ailleurs.",
          "La double authentification dès qu'elle est proposée.",
          "Un appareil sain : antivirus à jour, pas de logiciel douteux installé.",
          "Méfiance absolue face aux courriels et messages qui demandent vos identifiants.",
        ],
      },
      {
        heading: "Les pièges à connaître",
        body:
          "Aucune salle sérieuse ne vous demandera jamais votre mot de passe par message. Méfiez-vous des fausses pages de connexion et des promesses trop belles. En cas de doute, passez toujours par l'application officielle ou l'adresse exacte du site.",
      },
    ],
    takeaways: [
      "Mot de passe unique et double authentification, toujours.",
      "Une salle ne demande jamais votre mot de passe par message.",
      "En cas de doute, passez par l'application officielle.",
    ],
    dealerNote:
      "Protège ton compte de poker comme ton compte en banque. Cinq minutes pour activer la double authentification t'épargnent des semaines de tracas.",
  },
  {
    slug: "la-verification-kyc",
    title: "La vérification d'identité (KYC), expliquée",
    short: "La vérification KYC",
    summary:
      "Tôt ou tard, une salle légale vous demandera de prouver votre identité. Ce processus, appelé KYC, est normal et obligatoire. Le comprendre évite le stress au moment de retirer.",
    minutes: 5,
    sections: [
      {
        heading: "Pourquoi cette vérification",
        body:
          "KYC signifie Know Your Customer, connaître son client. C'est une obligation légale qui sert à vérifier votre identité, votre âge et à lutter contre la fraude et le blanchiment. Toute salle régulée la pratique, c'est un gage de sérieux, pas un piège.",
      },
      {
        heading: "Comment ça se passe",
        bullets: [
          "On vous demande généralement une pièce d'identité et un justificatif de domicile.",
          "Parfois une preuve du moyen de paiement utilisé.",
          "Faites-le dès l'ouverture du compte, pas au moment de retirer, pour éviter tout blocage.",
        ],
      },
    ],
    takeaways: [
      "Le KYC est une obligation légale, signe d'une salle sérieuse.",
      "Préparez pièce d'identité et justificatif de domicile.",
      "Vérifiez-vous tôt pour ne jamais bloquer un retrait.",
    ],
    dealerNote:
      "La vérification d'identité n'a rien d'inquiétant, c'est la loi. Le bon réflexe : la faire le jour de l'inscription. Le jour où tu voudras retirer, tout sera déjà prêt.",
  },
  {
    slug: "les-trackers",
    title: "Les trackers : analyser son jeu et ses adversaires",
    short: "Les trackers",
    summary:
      "Les logiciels de tracking enregistrent vos mains et celles de vos adversaires, et affichent des statistiques en temps réel. Un outil puissant pour progresser, à condition de l'utiliser dans les règles de votre salle.",
    minutes: 6,
    sections: [
      {
        heading: "À quoi ça sert",
        body:
          "Un tracker conserve l'historique de toutes vos mains. Il vous permet d'analyser vos sessions, de repérer vos fuites et de mesurer vos statistiques (VPIP, PFR, agression). Couplé à un affichage en jeu, il montre aussi les tendances des adversaires.",
      },
      {
        heading: "Les outils et les règles",
        bullets: [
          "Les plus connus enregistrent et analysent les mains, avec un affichage de statistiques.",
          "Chaque salle a ses règles : certaines limitent ou interdisent les affichages en temps réel.",
          "Vérifiez toujours ce qui est autorisé sur votre plateforme avant d'installer un outil.",
          "Le meilleur usage reste l'analyse de vos propres mains, après la session.",
        ],
      },
    ],
    takeaways: [
      "Un tracker révèle vos fuites grâce à vos statistiques.",
      "Vérifiez les règles de votre salle avant tout affichage en jeu.",
      "Le plus utile : revoir ses propres mains à froid.",
    ],
    dealerNote:
      "Le meilleur tracker du monde ne sert à rien si tu ne regardes pas tes propres erreurs. Commence par analyser tes mains à toi, c'est là que se cachent les vrais progrès.",
  },
];

export function getArticle(slug: string): OnlineArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
