/**
 * Cours de stratégie du Poker Hub, organisés par niveau.
 * Contenu rédigé pour de vrais lecteurs (accents corrects, aucun marqueur
 * "contenu IA" : pas de tiret cadratin, pas de souligné décoratif).
 */

export type Level = "debutant" | "intermediaire" | "avance";

export type LessonSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type Lesson = {
  slug: string;
  level: Level;
  title: string;
  short: string;
  summary: string;
  minutes: number;
  sections: LessonSection[];
  takeaways: string[];
  dealerNote?: string;
  /** Partenaire de confiance (lien externe, futur lien d'affiliation). */
  partner?: { name: string; url: string; hook: string; kind: string; blurb: string };
};

export const LEVEL_LABEL: Record<Level, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

export const LESSONS: Lesson[] = [
  // ----------------------------- DÉBUTANT -----------------------------
  {
    slug: "mains-de-depart",
    level: "debutant",
    title: "Quelles mains jouer au départ",
    short: "Les mains de départ",
    summary:
      "La première décision d'un coup est aussi la plus importante : entrer ou non. La majorité des pertes des débutants vient de mains jouées qui n'auraient jamais dû l'être. Voici comment trier.",
    minutes: 7,
    sections: [
      {
        heading: "Le principe : peu de mains, mais bien jouées",
        body:
          "Au poker, on ne gagne pas en jouant beaucoup de coups, mais en jouant les bons. Une main forte rapporte sur la durée, une main faible coûte petit à petit. Le réflexe numéro un du joueur gagnant, c'est de se coucher souvent et sans regret.",
      },
      {
        heading: "Les grandes familles de mains",
        bullets: [
          "Les paires fortes (As-As, Rois-Rois, Dames-Dames) : à jouer agressivement, presque toujours.",
          "Les grosses cartes assorties ou connectées (As-Roi, As-Dame, Roi-Dame) : très jouables, surtout en relance.",
          "Les paires moyennes (10-10 à 7-7) : bonnes, mais prudence face à une grosse agression.",
          "Les connecteurs assortis (9-8 assortis, 7-6 assortis) : du potentiel, à jouer surtout en position et à bas prix.",
          "Le reste : à jeter sans état d'âme, surtout en première position.",
        ],
      },
      {
        heading: "Tout dépend de la position",
        body:
          "Une même main n'a pas la même valeur selon votre place à la table. En première position, beaucoup de joueurs parlent après vous : jouez très serré. Près du bouton, peu de monde reste derrière : vous pouvez ouvrir bien plus large. La position transforme une main moyenne en main rentable.",
      },
    ],
    takeaways: [
      "Se coucher souvent n'est pas subir, c'est jouer juste.",
      "Plus vous êtes proche du bouton, plus vous pouvez élargir.",
      "Une paire d'As se joue fort, un 9-4 dépareillé se jette, toujours.",
      "Dans le doute en première position, couchez.",
    ],
    dealerNote:
      "Derrière la table, je vois la différence en une orbite : le joueur qui gagne ne joue pas plus de mains, il joue les bonnes au bon moment. Commence par jouer serré, tu te compliqueras la vie plus tard, quand tu sauras pourquoi.",
  },
  {
    slug: "les-erreurs-du-debutant",
    level: "debutant",
    title: "Les erreurs qui ruinent les débutants",
    short: "Les erreurs fréquentes",
    summary:
      "La plupart des débutants ne perdent pas à cause d'un manque de talent, mais à cause de quelques erreurs répétées. Les corriger fait gagner plus vite que n'importe quelle astuce.",
    minutes: 6,
    sections: [
      {
        heading: "Le top des fuites à boucher",
        bullets: [
          "Jouer trop de mains : la fuite numéro un, de loin.",
          "Limper sans cesse : entrer en payant juste la blinde donne l'initiative aux autres.",
          "Payer par curiosité à la river : suivre « pour voir » coûte une fortune sur l'année.",
          "Ne jamais se coucher avec une top paire : une paire, même haute, n'est pas imbattable.",
          "Jouer hors de position des mains faibles : vous subissez tout le coup.",
          "Suivre les relances avec n'importe quelle paire en espérant le brelan, sans les cotes pour.",
        ],
      },
      {
        heading: "Pourquoi ces erreurs coûtent si cher",
        body:
          "Chacune de ces fuites semble anodine sur un coup. Mais répétée des centaines de fois, elle vide la cave. Le poker est un jeu de petites décisions cumulées : corriger une seule fuite récurrente change tout votre résultat sur le long terme.",
      },
    ],
    takeaways: [
      "Couper la fuite « je joue trop de mains » double presque vos résultats.",
      "Relancer vaut mieux que limper : prenez l'initiative.",
      "Une top paire peut et doit parfois se coucher.",
      "Ne payez jamais juste pour la curiosité.",
    ],
    dealerNote:
      "Si tu ne corriges qu'une chose ce mois-ci, corrige le nombre de mains que tu joues. Joue moins, joue mieux. Le reste vient après.",
  },
  {
    slug: "jouer-en-position",
    level: "debutant",
    title: "Jouer en position : l'arme la plus rentable",
    short: "L'importance de la position",
    summary:
      "À cartes égales, le joueur en position gagne plus que celui qui parle en premier. La position est l'avantage le plus simple à comprendre et le plus rentable à exploiter.",
    minutes: 6,
    sections: [
      {
        heading: "Parler en dernier change tout",
        body:
          "Être en position, c'est agir après l'adversaire à chaque tour qui suit le flop. Vous voyez ce qu'il fait avant de décider. Cette information vaut de l'argent : vous bluffez au bon moment, vous contrôlez la taille du pot, vous perdez moins quand vous êtes battu et vous gagnez plus quand vous êtes devant.",
      },
      {
        heading: "Comment en profiter concrètement",
        bullets: [
          "Élargissez votre sélection de mains au bouton et au cutoff.",
          "Volez les blindes quand l'action vous arrive sans opposition.",
          "Prenez une carte gratuite quand l'adversaire checke et que vous avez un tirage.",
          "Resserrez fortement quand vous serez hors de position.",
        ],
      },
    ],
    takeaways: [
      "En position égale tout, plus d'informations égale de meilleures décisions.",
      "Ouvrez large près du bouton, serré en premier de parole.",
      "La position permet de jouer des mains qui seraient injouables sinon.",
    ],
    dealerNote:
      "Regarde où s'assoient les bons joueurs quand ils ont le choix : ils veulent les joueurs faibles à leur droite, pour parler après eux. La position, ça se cultive dès le choix du siège.",
  },
  {
    slug: "gestion-de-bankroll",
    level: "debutant",
    title: "La gestion de bankroll",
    short: "La gestion de bankroll",
    summary:
      "Le meilleur joueur du monde fait faillite s'il joue trop gros pour sa caisse. La gestion de bankroll est ce qui sépare le joueur qui dure de celui qui saute à la première mauvaise série.",
    minutes: 6,
    sections: [
      {
        heading: "La variance, votre vraie adversaire",
        body:
          "Même en jouant parfaitement, vous traverserez de longues séries de pertes. C'est la variance, et elle est inévitable. La bankroll sert d'amortisseur : assez profonde, elle vous laisse encaisser les coups durs sans jamais être ruiné.",
      },
      {
        heading: "Des repères simples",
        bullets: [
          "Cash game en jeu régulier et gros volume : visez 100 caves de votre limite, c'est ce qui vous garde dans le jeu malgré les downswings.",
          "Session plaisir, un coup de temps en temps : voyez votre cave comme le budget de votre soirée, une mise engagée pour vous amuser. Vous jouez libéré, sans pression, et tout ce que vous ramenez en quittant la table est du bonus.",
          "Tournois : visez 100 buy-ins ou plus, la variance y est énorme.",
          "Ne jouez jamais avec de l'argent dont vous avez besoin pour vivre.",
          "Descendez de limite sans honte quand la bankroll fond.",
        ],
      },
      {
        heading: "Le budget de loisir avant tout",
        body:
          "Si vous jouez pour le plaisir, fixez un budget que vous pouvez perdre sans que cela change quoi que ce soit à votre vie. Le poker doit rester un jeu. En cas de souci avec le jeu d'argent, parlez-en et faites-vous aider.",
      },
    ],
    takeaways: [
      "La bankroll absorbe la variance, c'est sa seule fonction.",
      "Pour jouer du volume : 100 caves en cash, 100 buy-ins ou plus en tournoi.",
      "Pour un coup plaisir : votre cave, c'est le budget de la soirée, engagé pour s'amuser. Le gain est un bonus.",
      "Descendre de limite est une force, pas un échec.",
      "Ne jouez jamais l'argent du quotidien.",
    ],
    dealerNote:
      "J'ai vu des joueurs très doués tout perdre parce qu'ils jouaient trois fois trop haut pour leur caisse. La discipline de bankroll n'est pas sexy, mais c'est elle qui te garde dans le jeu assez longtemps pour devenir bon.",
    partner: {
      name: "PokManager",
      url: "https://www.pokmanager.com/fr/",
      hook: "Tu veux suivre ta bankroll sérieusement ?",
      kind: "Gestion et suivi de bankroll",
      blurb:
        "PokManager fait partie de nos partenaires de confiance pour suivre tes sessions, ta bankroll et tes résultats, et garder le contrôle sur la durée.",
    },
  },
  // --------------------------- INTERMÉDIAIRE ---------------------------
  {
    slug: "penser-en-ranges",
    level: "intermediaire",
    title: "Penser en ranges plutôt qu'en mains",
    short: "Les ranges",
    summary:
      "Le débutant se demande « quelle est sa carte ? ». Le joueur aguerri se demande « quel est l'éventail de toutes ses cartes possibles ? ». Ce changement de regard est le grand saut vers le niveau supérieur.",
    minutes: 8,
    sections: [
      {
        heading: "Qu'est-ce qu'une range",
        body:
          "Une range, c'est l'ensemble des mains qu'un joueur peut avoir dans une situation donnée, vu ses actions. On ne devine plus une seule main : on raisonne sur tout l'éventail, et on ajuste cet éventail à chaque décision adverse.",
      },
      {
        heading: "Construire la range adverse",
        bullets: [
          "Partez de sa position d'ouverture : une ouverture en première position est plus forte qu'au bouton.",
          "Retirez les mains qu'il aurait jouées autrement (il aurait 3-bet ses As, par exemple).",
          "Affinez à chaque tour : ce qu'il mise, checke ou paie réduit l'éventail.",
          "À la river, sa range est souvent très lisible si vous avez suivi l'histoire du coup.",
        ],
      },
      {
        heading: "Penser sa propre range aussi",
        body:
          "Le bon joueur ne pense pas qu'à la range adverse : il pense à la sienne, telle que l'adversaire la perçoit. Si toutes vos grosses mises sont des monstres, vous ne serez jamais payé. Équilibrer sa range vient de là.",
      },
    ],
    takeaways: [
      "Raisonnez par éventail, pas par carte unique.",
      "La range se construit dès la première action et se rétrécit à chaque tour.",
      "Pensez aussi à votre propre range, vue par l'adversaire.",
    ],
    dealerNote:
      "Le jour où tu arrêtes de te demander « il a quoi ? » pour te demander « il a quoi parmi tout ce qu'il pourrait avoir ? », tu as changé de division.",
  },
  {
    slug: "le-c-bet",
    level: "intermediaire",
    title: "Le c-bet (continuation bet)",
    short: "Le c-bet",
    summary:
      "Vous avez relancé avant le flop, le flop tombe, c'est à vous : faut-il continuer à miser ? Le continuation bet est l'outil le plus utilisé du poker moderne, à condition de savoir quand l'employer.",
    minutes: 7,
    sections: [
      {
        heading: "Pourquoi le c-bet marche",
        body:
          "En relançant préflop, vous avez pris l'initiative et représenté de la force. La plupart du temps, le flop ne touche personne. Miser à nouveau met la pression sur un adversaire qui, le plus souvent, n'a rien et devra abandonner.",
      },
      {
        heading: "Quand miser, quand freiner",
        bullets: [
          "Misez plus volontiers sur les flops secs qui favorisent votre range (As ou Roi haut).",
          "Freinez sur les flops très humides et coordonnés qui touchent plutôt l'adversaire.",
          "Tenez compte du nombre d'adversaires : le c-bet passe beaucoup moins en multiway.",
          "Adaptez votre taille : une petite mise suffit souvent à faire le travail.",
        ],
      },
      {
        heading: "Ne pas c-bet en pilote automatique",
        body:
          "Le c-bet réflexe sur 100% des flops est devenu une fuite à mesure que les adversaires s'adaptent. Choisissez vos spots : misez quand le tableau et la range jouent pour vous, checkez quand ils jouent contre vous.",
      },
    ],
    takeaways: [
      "Le c-bet exploite la force que vous avez montrée préflop.",
      "Flop sec et tête haute : misez. Flop humide et multiway : prudence.",
      "Variez les tailles et ne misez pas en automatique.",
    ],
    dealerNote:
      "Le c-bet, c'est comme un bon bluff de croupier : ce n'est pas la carte qui compte, c'est l'histoire que tu racontes depuis le début du coup. Si l'histoire est cohérente, on te croit.",
  },
  {
    slug: "le-3-bet",
    level: "intermediaire",
    title: "Le 3-bet : relancer une relance",
    short: "Le 3-bet",
    summary:
      "Re-relancer avant le flop, le fameux 3-bet, est une arme à double tranchant : en valeur avec vos monstres, en bluff avec des mains choisies. Bien dosé, il vous rend redoutable et difficile à jouer.",
    minutes: 8,
    sections: [
      {
        heading: "Les deux raisons de 3-bet",
        bullets: [
          "Pour la valeur : isoler un adversaire et gonfler le pot avec vos meilleures mains (As-As, Rois, As-Roi).",
          "En bluff : faire coucher des mains correctes et prendre l'initiative, avec des mains qui bloquent les grosses combinaisons adverses.",
        ],
      },
      {
        heading: "Choisir ses bluffs de 3-bet",
        body:
          "Les meilleurs 3-bets de bluff utilisent des mains qui ont un peu de potentiel et qui bloquent les mains fortes de l'adversaire, comme As-5 assorti. L'As en main réduit le nombre d'As-As et As-Roi adverses, ce qui rend le bluff plus crédible et plus efficace.",
      },
      {
        heading: "La position, encore et toujours",
        body:
          "3-better en position est bien plus confortable : vous gardez l'initiative et l'avantage d'agir en dernier. Hors de position, resserrez votre range de 3-bet et penchez davantage vers la valeur.",
      },
    ],
    takeaways: [
      "3-bet en valeur avec les monstres, en bluff avec des mains qui bloquent.",
      "As-5 assorti est un meilleur bluff que Roi-Dame, à cause du blocage.",
      "Soyez plus agressif en position, plus serré hors de position.",
    ],
    dealerNote:
      "Un 3-bet bien construit, c'est un mélange : si tu ne re-relances qu'avec tes As, les bons joueurs s'en aperçoivent en une heure et ne te paient plus jamais.",
  },
  {
    slug: "le-squeeze",
    level: "intermediaire",
    title: "Le squeeze",
    short: "Le squeeze",
    summary:
      "Un joueur ouvre, un autre suit, et c'est à vous : le squeeze consiste à relancer cette situation pour rafler un pot déjà bien garni. Une des manoeuvres les plus rentables quand elle est bien choisie.",
    minutes: 6,
    sections: [
      {
        heading: "Pourquoi ça fonctionne",
        body:
          "Quand un joueur ouvre et qu'un autre se contente de suivre, ce dernier a rarement une main très forte (il aurait souvent re-relancé sinon). En relançant gros, vous mettez la pression sur deux joueurs à la fois : l'ouvreur, qui doit craindre le suiveur, et le suiveur, dont la main plafonnée est exposée.",
      },
      {
        heading: "Les bons spots de squeeze",
        bullets: [
          "Le suiveur a une range plafonnée (il aurait 3-bet ses meilleures mains).",
          "Vous avez une mise assez grosse pour rendre leur suivi non rentable.",
          "Vous êtes idéalement en position, ou avec une main qui se défend si on vous paie.",
          "L'argent déjà au milieu (le dead money) rend le coup rentable même sans grosse main.",
        ],
      },
    ],
    takeaways: [
      "Le squeeze punit l'ouverture suivie d'un simple call.",
      "Misez assez gros : vous attaquez deux joueurs en même temps.",
      "Le dead money au milieu fait une bonne partie du travail.",
    ],
    dealerNote:
      "Le squeeze, c'est saisir une fenêtre. Quand tu vois un open suivi d'un call mou, l'occasion est là. Encore faut-il oser appuyer sur le bouton.",
  },
  {
    slug: "cotes-et-pot-odds",
    level: "intermediaire",
    title: "Cotes, pot odds et implied odds",
    short: "Cotes et pot odds",
    summary:
      "Payer un tirage est rentable ou non selon un calcul simple : ce que ça coûte comparé à ce que ça peut rapporter. Maîtriser les cotes transforme des décisions au feeling en décisions mathématiques.",
    minutes: 8,
    sections: [
      {
        heading: "Compter ses outs",
        body:
          "Les outs sont les cartes qui améliorent votre main en main gagnante. Un tirage couleur a 9 outs, une quinte ouverte 8. La règle des 2 et 4 donne une estimation rapide : multipliez vos outs par 2 pour une carte à venir, par 4 pour deux cartes à venir.",
      },
      {
        heading: "Comparer la cote du pot et la cote du tirage",
        bullets: [
          "Cote du pot : ce que vous devez payer comparé à la taille du pot après votre paiement.",
          "Si la probabilité de toucher est meilleure que la cote demandée, le call est rentable.",
          "Exemple : 9 outs au flop donnent environ 35% sur deux cartes, soit une cote correcte face à une mise d'environ la moitié du pot.",
        ],
      },
      {
        heading: "Les implied odds",
        body:
          "Les cotes implicites tiennent compte de l'argent que vous gagnerez en plus si vous touchez. Un tirage parfois non rentable sur la cote immédiate devient rentable si l'adversaire vous paiera une grosse mise quand vous complétez. À l'inverse, méfiez-vous des reverse implied odds, quand toucher votre tirage peut vous coûter cher face à mieux.",
      },
    ],
    takeaways: [
      "Outs fois 2 par carte à venir, fois 4 pour les deux cartes.",
      "Comparez toujours la cote du pot à la cote de votre tirage.",
      "Les implied odds rendent rentables des tirages que la cote immédiate refuse.",
    ],
    dealerNote:
      "Tu n'as pas besoin d'être fort en maths. Apprends trois ou quatre repères de cotes par coeur, et tu prendras 90% de tes décisions de tirage correctement, sans jamais sortir une calculette.",
  },
  {
    slug: "le-semi-bluff",
    level: "intermediaire",
    title: "Le semi-bluff",
    short: "Le semi-bluff",
    summary:
      "Le semi-bluff est le bluff préféré des pros : vous misez avec une main qui n'est pas encore faite, mais qui peut le devenir. Vous pouvez gagner tout de suite en faisant coucher, ou plus tard en touchant.",
    minutes: 6,
    sections: [
      {
        heading: "Deux façons de gagner",
        body:
          "Quand vous misez un tirage couleur ou quinte, deux bonnes choses peuvent arriver : l'adversaire se couche et vous remportez le pot immédiatement, ou il paie et vous touchez votre tirage au tour suivant. Cette double porte de sortie rend le semi-bluff bien plus sûr qu'un bluff total.",
      },
      {
        heading: "Les bons candidats",
        bullets: [
          "Tirages couleur et quinte, surtout avec des cartes hautes en plus.",
          "Combo draws, qui combinent plusieurs tirages et multiplient les outs.",
          "Situations où votre mise peut faire coucher des mains meilleures que la vôtre à cet instant.",
        ],
      },
    ],
    takeaways: [
      "Le semi-bluff gagne soit tout de suite, soit plus tard : deux chances.",
      "Privilégiez les tirages avec des outs propres et des cartes hautes.",
      "C'est l'agression la moins risquée du poker, abusez-en intelligemment.",
    ],
    dealerNote:
      "Le semi-bluff, c'est l'agression intelligente : tu mets la pression tout en gardant un plan B dans ta poche. C'est exactement comme ça que jouent ceux que tu vois gagner à la télé.",
  },
  {
    slug: "push-or-fold-10bb",
    level: "intermediaire",
    title: "Push or fold à 10 BB en tournoi (6-max, sans ante)",
    short: "Push or fold (10 BB)",
    summary:
      "À tapis court en tournoi, on ne joue plus le poker normal : préflop, c'est soit tapis, soit poubelle. Voici quelles mains pousser à 10 BB selon ta position, sur une table à 6 sans ante, version simple à mémoriser.",
    minutes: 7,
    sections: [
      {
        heading: "Pourquoi push or fold",
        body:
          "Quand ton tapis tombe vers 10 grosses blindes ou moins, tu n'as plus assez de jetons pour jouer après le flop : si tu relances normalement et qu'on te paie, tu es déjà presque engagé. La solution des pros est radicale et simple : préflop, soit tu pousses tout ton tapis (all-in), soit tu te couches. Plus de limp, plus de petite relance, plus de call.",
      },
      {
        heading: "Pourquoi ça marche",
        bullets: [
          "En poussant, tu mets une grosse pression : très souvent tout le monde se couche et tu rafles les blindes sans même voir un flop.",
          "Quand on te paie, ta main a généralement une équité correcte : tu n'es presque jamais tirage mort.",
          "Tu supprimes toute décision difficile après le flop : pas de piège, pas d'hésitation.",
        ],
      },
      {
        heading: "Comment lire le mémo",
        body:
          "Choisis ta position au-dessus de la grille. Les mains en couleur sont à POUSSER, les mains sombres à JETER. Règle d'or : plus tu es proche du bouton, plus tu peux pousser large (moins de joueurs derrière toi, donc moins de risque de tomber sur un monstre). En small blind, tu n'as qu'un seul joueur derrière : tu pousses énormément de mains.",
      },
      {
        heading: "À adapter",
        body:
          "Ce mémo est une version simplifiée et vulgarisée (inspirée des charts Jennifear, la référence push/fold en tournoi) pour 10 BB, à 6 joueurs, sans ante. En pratique, on pousse un peu plus large dès qu'il y a des antes, et un peu plus serré près des places payées (ICM). Mais à 10 BB sans ante, suivre ces ranges te rendra déjà bien meilleur que la moyenne.",
      },
    ],
    takeaways: [
      "À 10 BB et moins, c'est push ou fold : pas de demi-mesure.",
      "Plus tu es proche du bouton, plus tu pousses large.",
      "Pousser fait souvent tout coucher : tu gagnes les blindes sans combat.",
      "En small blind, tu pousses une énorme partie de tes mains.",
    ],
    dealerNote:
      "À tapis court, les bons joueurs ne réfléchissent pas trois heures : push ou fold, point. Mémorise ces ranges et tu arrêteras de te faire grignoter par les blindes en attendant « la bonne main ».",
  },
  // ------------------------------ AVANCÉ ------------------------------
  {
    slug: "gto-explique",
    level: "avance",
    title: "Le GTO expliqué simplement",
    short: "Le GTO",
    summary:
      "GTO, pour Game Theory Optimal, fait peur à beaucoup de joueurs. Pourtant l'idée de base est simple : jouer une stratégie si équilibrée que personne ne peut l'exploiter, quoi qu'il fasse.",
    minutes: 8,
    sections: [
      {
        heading: "L'idée de l'équilibre",
        body:
          "Une stratégie GTO est un point d'équilibre : si vous la suivez, aucun adversaire ne peut gagner de l'argent contre vous en changeant sa propre stratégie. Vous ne cherchez plus à deviner l'adversaire, vous devenez impossible à contrer. C'est une stratégie de défense parfaite.",
      },
      {
        heading: "Ce que le GTO apporte en pratique",
        bullets: [
          "Le bon ratio entre mises de valeur et bluffs, pour ne jamais être exploitable.",
          "Des fréquences de défense qui empêchent l'adversaire de bluffer impunément.",
          "Des tailles de mise cohérentes avec toute votre range.",
          "Une base solide quand vous ne connaissez pas encore l'adversaire.",
        ],
      },
      {
        heading: "GTO n'est pas toujours le plus rentable",
        body:
          "Le GTO maximise la sécurité, pas forcément le gain. Contre des adversaires qui font de grosses erreurs, s'écarter de l'équilibre pour les punir rapporte davantage. Le GTO est votre base par défaut, le jeu exploitant est votre arme contre les faibles.",
      },
    ],
    takeaways: [
      "Le GTO est une stratégie qu'on ne peut pas exploiter.",
      "Il fixe les bons ratios valeur/bluff et les bonnes fréquences de défense.",
      "Il sécurise, mais ne maximise pas le gain contre les joueurs faibles.",
    ],
    dealerNote:
      "Ne te noie pas dans les solvers tout de suite. Comprends d'abord l'esprit du GTO : être équilibré, donc illisible. Le reste, ce sont des détails que tu affineras bien plus tard.",
  },
  {
    slug: "jeu-exploitant",
    level: "avance",
    title: "Le jeu exploitant",
    short: "Le jeu exploitant",
    summary:
      "Si le GTO est la défense parfaite, le jeu exploitant est l'attaque. Il consiste à s'écarter volontairement de l'équilibre pour punir les erreurs précises d'un adversaire donné. C'est là que se gagne le plus gros argent.",
    minutes: 7,
    sections: [
      {
        heading: "Repérer la fuite, puis l'attaquer",
        body:
          "Chaque joueur faible a un défaut récurrent : il paie trop, il se couche trop, il ne bluffe jamais. Le jeu exploitant identifie ce défaut et y répond directement. Contre un joueur qui paie trop, on arrête de bluffer et on mise gros en valeur. Contre un joueur qui se couche trop, on bluffe sans retenue.",
      },
      {
        heading: "Ajustements classiques",
        bullets: [
          "Adversaire qui suit tout (calling station) : misez fort en valeur, ne bluffez plus.",
          "Adversaire qui se couche trop (nit) : volez ses blindes et bluffez davantage.",
          "Adversaire ultra-agressif (maniac) : payez plus large et tendez-lui des pièges.",
          "Adversaire passif : misez vos mains moyennes pour la valeur, il ne vous punira pas.",
        ],
      },
    ],
    takeaways: [
      "Le jeu exploitant punit une erreur précise et identifiée.",
      "Contre qui paie trop : que de la valeur. Contre qui se couche trop : du bluff.",
      "S'écarter du GTO rapporte gros contre les joueurs faibles.",
    ],
    dealerNote:
      "À la table, l'information est partout : qui soupire, qui mise vite, qui ne se couche jamais. Le jeu exploitant, c'est simplement écouter ces signaux et en faire de l'argent.",
  },
  {
    slug: "les-blockers",
    level: "avance",
    title: "Les blockers",
    short: "Les blockers",
    summary:
      "Vos propres cartes vous renseignent sur celles que l'adversaire ne peut pas avoir. Ce concept, les blockers, affine vos bluffs et vos calls et fait partie de l'arsenal des meilleurs joueurs.",
    minutes: 6,
    sections: [
      {
        heading: "Le principe du blocage",
        body:
          "Si vous tenez l'As de coeur, l'adversaire ne peut pas avoir la couleur max à coeur ni la paire d'As avec cet As. Vous bloquez une partie de ses combinaisons fortes. Cette information guide vos décisions de bluff et de paiement.",
      },
      {
        heading: "Utiliser les blockers",
        bullets: [
          "Bluffez plus volontiers quand vous bloquez les mains fortes que l'adversaire représenterait.",
          "Payez plus large quand vous bloquez ses combinaisons de valeur, donc qu'il bluffe plus souvent.",
          "Choisissez vos bluffs de 3-bet et de river avec les bons blockers en main.",
        ],
      },
    ],
    takeaways: [
      "Vos cartes excluent certaines mains adverses : c'est le blocage.",
      "Bloquer ses mains fortes rend votre bluff plus crédible.",
      "Bloquer ses bluffs vous incite plutôt à payer.",
    ],
    dealerNote:
      "Les blockers, c'est de la lecture inversée : au lieu de deviner ce qu'il a, tu élimines ce qu'il ne peut pas avoir. Petit détail, grosse différence sur les gros coups.",
  },
  {
    slug: "la-mdf",
    level: "avance",
    title: "La MDF (Minimum Defense Frequency)",
    short: "La MDF",
    summary:
      "La MDF répond à une question clé : combien de fois dois-je défendre face à une mise pour ne pas me faire bluffer impunément ? Un repère théorique qui empêche les adversaires de vous exploiter.",
    minutes: 7,
    sections: [
      {
        heading: "L'idée derrière la MDF",
        body:
          "Si vous vous couchez trop souvent face aux mises, n'importe qui peut bluffer en profit garanti. La Minimum Defense Frequency est la part minimale de votre range que vous devez continuer à jouer pour rendre le bluff adverse non rentable.",
      },
      {
        heading: "Comment l'utiliser",
        bullets: [
          "Plus la mise adverse est grosse, moins vous avez besoin de défendre.",
          "Face à une mise de la taille du pot, défendre environ la moitié de sa range suffit en théorie.",
          "La MDF est un garde-fou, pas une loi : contre un adversaire qui ne bluffe jamais, couchez plus.",
        ],
      },
    ],
    takeaways: [
      "Trop se coucher rend les bluffs adverses gratuits.",
      "Plus la mise est grosse, moins vous défendez.",
      "La MDF est un repère par défaut, à ajuster contre les joueurs déséquilibrés.",
    ],
    dealerNote:
      "La MDF, c'est ta protection contre les voleurs. Mais souviens-toi : contre quelqu'un qui ne bluffe jamais, la meilleure défense, c'est de te coucher. La théorie sert la lecture, elle ne la remplace pas.",
  },
  {
    slug: "equilibrage-des-ranges",
    level: "avance",
    title: "Équilibrer son jeu",
    short: "Équilibrage des ranges",
    summary:
      "Un jeu équilibré est un jeu illisible. En mélangeant valeur et bluffs dans les mêmes lignes, vous empêchez l'adversaire de savoir quand vous êtes fort. C'est la clé pour rester rentable contre les bons joueurs.",
    minutes: 7,
    sections: [
      {
        heading: "Pourquoi équilibrer",
        body:
          "Si vous ne misez gros qu'avec des monstres, on ne vous paiera jamais. Si vous ne checkez qu'avec des mains faibles, on vous bluffera sans cesse. Équilibrer, c'est avoir à la fois de la valeur et des bluffs dans chaque ligne, pour que l'adversaire ne puisse jamais deviner.",
      },
      {
        heading: "Le bon ratio valeur/bluff",
        bullets: [
          "Plus votre mise est grosse, plus vous pouvez inclure de bluffs.",
          "À la river, calez votre nombre de bluffs sur votre nombre de mains de valeur, selon la taille de mise.",
          "Choisissez vos bluffs avec les bons blockers, pas au hasard.",
          "Contre des adversaires faibles, déséquilibrez volontairement pour les exploiter.",
        ],
      },
    ],
    takeaways: [
      "Un jeu équilibré est imprévisible, donc difficile à exploiter.",
      "Mélangez valeur et bluffs dans les mêmes lignes.",
      "L'équilibrage sert contre les bons, pas contre les faibles que vous exploitez.",
    ],
    dealerNote:
      "L'équilibrage, c'est le dernier étage. Ne t'y attaque que quand le reste est solide. Contre la majorité des joueurs, exploiter leurs erreurs rapportera toujours plus que d'être parfaitement équilibré.",
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function lessonsByLevel(level: Level): Lesson[] {
  return LESSONS.filter((l) => l.level === level);
}

export const LEVEL_ORDER: Level[] = ["debutant", "intermediaire", "avance"];
