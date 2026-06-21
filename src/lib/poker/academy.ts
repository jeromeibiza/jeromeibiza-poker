/**
 * Académie Croupier Poker Jérôme Ibiza, programme de formation gratuite.
 * 10 modules + examen final. Modules 1 à 9 rédigés ; le module 10 est l'examen.
 * Note : les procédures exactes varient selon le règlement de chaque salle ;
 * les principes enseignés ici sont les standards les plus répandus.
 */

export type ModuleSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type AcademyModule = {
  n: number;
  slug: string;
  title: string;
  emoji: string;
  summary: string;
  minutes: number;
  status: "complet" | "plan"; // complet = rédigé, plan = plan détaillé
  image?: string; // illustration Gemini, ex: "/academie/module-1.jpg" (bannière en tête de module)
  objectives: string[];
  sections: ModuleSection[];
};

export const MODULES: AcademyModule[] = [
  {
    n: 1,
    slug: "introduction-au-metier",
    title: "Introduction au métier de croupier poker",
    emoji: "🎩",
    summary: "Le rôle du dealer, les qualités requises et les évolutions de carrière possibles.",
    minutes: 12,
    status: "complet",
    objectives: [
      "Comprendre le rôle exact d'un croupier de poker",
      "Identifier les qualités et le savoir-être attendus",
      "Connaître les différents postes et l'évolution de carrière",
    ],
    sections: [
      {
        heading: "Le rôle du dealer",
        body:
          "Le croupier de poker est le chef d'orchestre de la table. Contrairement à la roulette ou au blackjack où il joue contre les clients, au poker le dealer ne joue jamais : les joueurs s'affrontent entre eux. Son rôle est d'assurer le bon déroulement de la partie. Il mélange et distribue les cartes, annonce l'action à voix haute, gère le pot, prélève le rake, dévoile les cartes communes, désigne le gagnant et lui pousse le pot. Il est aussi le garant des règles et le premier rempart contre les erreurs et la triche. Un bon croupier rend la table fluide, agréable et équitable, sans jamais se faire remarquer.",
      },
      {
        heading: "Les qualités requises",
        bullets: [
          "Dextérité manuelle : mélange, distribution et manipulation des jetons rapides et propres.",
          "Rigueur et concentration : aucune erreur sur le pot, les blindes ou l'ordre d'action.",
          "Calcul mental : annoncer les mises, faire la monnaie, calculer le rake et les side pots vite et juste.",
          "Sang-froid : gérer les litiges et les joueurs en tilt avec calme et autorité.",
          "Sens du service et diplomatie : rester courtois, neutre et professionnel en toutes circonstances.",
          "Endurance : tenir la concentration sur de longues sessions, souvent de nuit.",
          "Intégrité : l'honnêteté absolue est non négociable dans ce métier.",
        ],
      },
      {
        heading: "Les différents postes",
        body:
          "La filière poker en casino ou cardroom offre une vraie progression. On commence rarement au sommet : chaque poste se mérite.",
        bullets: [
          "Dealer : distribue et gère les tables de cash game et de tournoi.",
          "Senior Dealer : dealer expérimenté, affecté aux tables à fort enjeu et aux finales.",
          "Chip Runner : apporte les caves de jetons aux joueurs et fait le lien avec la caisse.",
          "Assistant Floor : seconde le floor, gère les listes d'attente et les changements de table.",
          "Floor (floorman) : superviseur de salle, tranche les litiges et fait appliquer les règles.",
          "Tournament Director (TD) : responsable de l'organisation et des décisions d'un tournoi.",
          "Poker Manager : dirige toute la salle de poker (planning, équipe, résultats).",
        ],
      },
      {
        heading: "L'évolution de carrière",
        body:
          "Un parcours typique démarre comme dealer, puis senior dealer après avoir fait ses preuves, avant d'évoluer vers le floor puis la direction de salle ou la direction de tournois. Beaucoup de croupiers freelance enchaînent les festivals internationaux (WSOP, EPT, WPT, Triton), une voie passionnante et bien rémunérée pour qui aime voyager. La maîtrise de l'anglais est alors un atout majeur.",
      },
    ],
  },
  {
    n: 2,
    slug: "manipulation-des-jetons",
    title: "La manipulation des jetons",
    emoji: "🔵",
    summary: "Couper, compter, faire de la monnaie et gérer une cave proprement.",
    minutes: 10,
    status: "complet",
    objectives: [
      "Couper et compter les jetons rapidement",
      "Faire de la monnaie sans erreur",
      "Gérer une cave et un rack",
    ],
    sections: [
      {
        heading: "Le code couleur et les valeurs",
        body:
          "Avant de manipuler, il faut lire une table d'un coup d'œil. Chaque dénomination a sa couleur. Les valeurs varient d'une salle à l'autre, mais une convention revient souvent et c'est celle qu'on apprend en premier. Vérifie toujours le code couleur affiché à ta salle avant de prendre une table.",
        bullets: [
          "Blanc : 1",
          "Rouge : 5",
          "Vert : 25",
          "Noir : 100",
          "Violet : 500",
          "Jaune ou orange : 1000",
        ],
      },
      {
        heading: "Couper et compter les jetons",
        body:
          "Le « chip cutting » consiste à séparer une pile en petits paquets vérifiables en un regard. La technique de base : on aligne une pile de référence, puis on coupe des paquets de même hauteur. On compte par 5 (des piles de cinq jetons) et par 20 (quatre piles de cinq). Avec l'habitude, l'œil reconnaît une pile de cinq ou de vingt instantanément, sans recompter jeton par jeton. C'est la compétence reine du métier : un croupier qui compte vite et juste fait gagner du temps à toute la table.",
      },
      {
        heading: "Faire la monnaie",
        body:
          "Faire la monnaie, c'est échanger une grosse dénomination contre des plus petites, ou l'inverse. Règle d'or : tout se fait sur la table, à la vue de tous, jamais dans les mains au-dessus du rack. On annonce le change, on pose les jetons reçus, on les compte visiblement, puis on rend l'équivalent. Cette transparence évite tout malentendu et protège le croupier comme le joueur.",
      },
      {
        heading: "Gérer le rack et la cave",
        body:
          "Le rack (ou float) est le plateau de jetons devant le croupier. Il se range par dénomination, du plus petit au plus grand, chaque emplacement bien fourni. Un rack propre et organisé permet de rendre la monnaie et de prélever le rake sans hésiter. Constituer une cave pour un joueur, c'est assembler un montant précis en jetons utilisables, vérifié à voix haute avant de le remettre.",
      },
      {
        heading: "Pousser le pot",
        body:
          "À la fin d'une main, on rassemble les mises au centre, on prélève le rake si la salle en prend un, puis on pousse le pot vers le gagnant d'un geste net et complet. On ne laisse jamais de jetons traîner et on ne pousse pas un pot tant que la main n'est pas formellement terminée. Un pot bien poussé, c'est une table qui avance.",
      },
    ],
  },
  {
    n: 3,
    slug: "manipulation-des-cartes",
    title: "La manipulation des cartes",
    emoji: "🃏",
    summary: "Wash, riffle, strip, cut et distribution : les gestes du dealer.",
    minutes: 11,
    status: "complet",
    objectives: [
      "Maîtriser le mélange complet (wash, riffle, strip, cut)",
      "Distribuer proprement et régulièrement",
      "Protéger le jeu contre la triche",
    ],
    sections: [
      {
        heading: "Le wash, le vrai mélange",
        body:
          "Le wash (ou scramble) est le mélange à plat qui ouvre une nouvelle donne ou un nouveau jeu. On étale les 52 cartes faces cachées sur le tapis et on les brasse en larges mouvements circulaires pendant quelques secondes. C'est le seul geste qui randomise réellement un jeu neuf ou ordonné : sans wash, les cartes gardent une trace de leur ordre précédent. On le fait à l'ouverture d'une partie et chaque fois que le jeu doit être totalement rebrassé.",
      },
      {
        heading: "Le riffle et le strip",
        body:
          "Une fois les cartes rassemblées, on enchaîne le mélange standard. Le riffle shuffle (effeuillage) : on sépare le jeu en deux paquets et on les entrelace. On en fait généralement deux. Le strip (ou box) : on prend de petits paquets par le dessus pour casser les séquences. La séquence type d'un croupier est riffle, riffle, strip, riffle, le tout fluide et silencieux, jeu maintenu bas sur le tapis pour ne rien exposer.",
      },
      {
        heading: "La coupe (cut)",
        body:
          "Avant de distribuer, on coupe le jeu. Le croupier propose la coupe ou la réalise lui-même selon la salle, en deux paquets francs, puis place la carte de coupe (cut card) sous le jeu pour masquer la carte du dessous. La cut card protège la dernière carte et évite qu'un joueur attentif ne la repère. Le jeu est alors prêt, ni vu ni connu.",
      },
      {
        heading: "La distribution (le pitch)",
        body:
          "La distribution, c'est le « pitch » : envoyer chaque carte à plat, une à une, vers le bon joueur. On commence toujours par le joueur à gauche du bouton (la small blind) et on tourne dans le sens horaire. La main qui tient le jeu reste basse et fermée pour ne jamais flasher une carte. Régularité et discrétion priment sur la vitesse : une carte qui glisse trop loin ou se retourne, c'est une faute à éviter.",
      },
      {
        heading: "Protéger le jeu",
        bullets: [
          "Garder le deck bas et couvert pour qu'aucune carte ne soit aperçue.",
          "Utiliser la cut card sous le jeu en permanence.",
          "Surveiller les cartes cornées ou marquées et les signaler.",
          "Ne jamais laisser un joueur toucher le talon (le paquet non distribué).",
          "Distribuer d'un geste régulier, sans flash ni carte exposée.",
        ],
      },
    ],
  },
  {
    n: 4,
    slug: "dealer-texas-holdem",
    title: "Dealer au Texas Hold'em",
    emoji: "♠",
    summary: "Ouverture de main, distribution, gestion du pot, side pots et showdown.",
    minutes: 12,
    status: "complet",
    objectives: [
      "Mener une main complète de A à Z",
      "Gérer le pot principal et les side pots",
      "Conduire un showdown sans erreur",
    ],
    sections: [
      {
        heading: "Ouvrir la main",
        body:
          "Tout commence par le bouton, qui désigne la position du donneur et tourne d'un siège à chaque main. On vérifie que la small blind et la big blind sont bien postées, puis on distribue deux cartes fermées à chaque joueur, une à la fois, en commençant par la small blind. Le tour de parole préflop débute alors par le joueur à gauche de la big blind.",
      },
      {
        heading: "Gérer les tours d'enchères",
        body:
          "À chaque tour, le croupier suit l'action, annonce qui doit parler et veille à ce que les mises soient valides. Une relance doit être annoncée ou posée en un seul mouvement : le « string bet » (mise en plusieurs gestes) est interdit et le croupier doit l'arrêter. On rassemble les mises au centre une fois le tour terminé, en gardant le pot lisible.",
      },
      {
        heading: "Le burn and turn",
        body:
          "Avant chaque carte commune, on « brûle » une carte, c'est-à-dire qu'on en écarte une face cachée. Puis on dévoile : trois cartes d'un coup pour le flop, une pour le turn, une pour la river. Brûler protège contre les cartes éventuellement marquées et standardise la procédure. On annonce souvent « burn and turn » en accompagnant le geste.",
      },
      {
        heading: "Constituer le pot",
        body:
          "Le pot doit toujours rester clair. Après chaque tour d'enchères, on amène les mises au centre, bien empilées par dénomination. Un pot en désordre, c'est une source d'erreurs et de litiges. Le croupier garde aussi en tête le montant total, utile pour le rake et pour répondre à un joueur qui demande la taille du pot quand la salle l'autorise.",
      },
      {
        heading: "Les side pots",
        body:
          "Quand un joueur fait tapis pour moins que les autres, on crée un pot principal et un ou plusieurs pots annexes (side pots). Le pot principal est plafonné au tapis du joueur all-in, multiplié par le nombre de joueurs qui suivent. Le surplus misé par les autres alimente le side pot, que le joueur à tapis ne peut pas gagner. Bien séparer ces pots est l'une des compétences techniques les plus importantes du module.",
      },
      {
        heading: "Conduire le showdown",
        body:
          "À l'abattage, l'ordre de dévoilement compte. Si la river a donné lieu à une mise, c'est le dernier à avoir misé ou relancé qui montre en premier. S'il y a eu check général, on montre dans le sens horaire à partir du bouton. Le croupier lit les mains, annonce la meilleure combinaison et pousse le pot au gagnant. En cas d'égalité, on partage proprement (split pot).",
      },
    ],
  },
  {
    n: 5,
    slug: "situations-cash-game",
    title: "Situations en cash game",
    emoji: "💵",
    summary: "Joueur absent, miss blind, changement de place, nouveau joueur, cave minimum.",
    minutes: 9,
    status: "complet",
    objectives: [
      "Appliquer les règles propres au cash game",
      "Gérer les entrées et sorties de joueurs",
      "Traiter les blindes manquées correctement",
    ],
    sections: [
      {
        heading: "Le joueur absent",
        body:
          "Un joueur peut s'éloigner un instant. S'il n'est pas à sa place pour agir, sa main est jetée (mucked) à son tour de parole. Tant qu'il occupe le siège, il continue de devoir les blindes quand elles passent sur lui, sauf s'il a signalé un « sit out ». Le croupier gère cela sans drame et sans ralentir la table.",
      },
      {
        heading: "La miss blind",
        body:
          "Quand un joueur rate sa big blind (parce qu'il s'est absenté), il ne peut pas reprendre la main gratuitement. À son retour, soit il poste la big blind manquée pour rentrer tout de suite, soit il attend que le bouton revienne naturellement à lui. La règle exacte dépend de la salle, mais le principe est constant : on ne saute pas son tour de blinde pour profiter des bonnes positions.",
      },
      {
        heading: "Changement de place et nouveau joueur",
        body:
          "Un nouvel arrivant entre en jeu soit en postant l'équivalent de la big blind, soit en attendant que la blinde arrive jusqu'à lui. Lors d'un changement de siège, le joueur reste soumis à ses obligations de blinde. Le croupier indique au floor toute place qui se libère et toute arrivée, afin que la liste d'attente soit tenue à jour.",
      },
      {
        heading: "Buy-in et cave minimum",
        body:
          "Chaque table a une cave minimum et souvent une cave maximum, exprimées en big blinds ou en montant. Le croupier vérifie que le buy-in d'un joueur respecte ces limites avant de lui constituer ses jetons. Un joueur peut recaver (remettre de l'argent) entre les mains, jamais au milieu d'une main en cours.",
      },
      {
        heading: "Le rat-holing",
        body:
          "Le « rat-holing » consiste à retirer discrètement des jetons de la table en cours de session pour protéger ses gains. C'est interdit : ce qu'on pose sur la table doit y rester jusqu'à ce qu'on quitte définitivement le siège. Le croupier veille à ce que personne ne fasse disparaître de jetons en cours de jeu.",
      },
    ],
  },
  {
    n: 6,
    slug: "situations-tournoi",
    title: "Situations en tournoi",
    emoji: "🏆",
    summary: "Cassage de table, chip race, redraw, balancing, changement de niveau.",
    minutes: 10,
    status: "complet",
    objectives: [
      "Gérer la structure d'un tournoi",
      "Équilibrer les tables (balancing)",
      "Conduire un chip race",
    ],
    sections: [
      {
        heading: "Le balancing",
        body:
          "En tournoi, les tables doivent rester équilibrées en nombre de joueurs. Dès qu'une table compte au moins un joueur de plus qu'une autre, on déplace un joueur pour rétablir l'équilibre. La règle courante veut qu'on déplace le joueur qui serait le prochain à payer la big blind, afin de ne léser personne. Le croupier signale le déséquilibre au floor, qui organise le mouvement.",
      },
      {
        heading: "Le cassage de table et le redraw",
        body:
          "Au fil des éliminations, on casse les tables les moins peuplées et on répartit leurs joueurs sur les sièges vides ailleurs. Lors d'un cassage, chaque joueur tire un nouveau siège (redraw). Le croupier de la table cassée aide à la transition, en s'assurant que les tapis suivent bien leurs propriétaires.",
      },
      {
        heading: "Le chip race",
        body:
          "Quand une dénomination de jetons devient inutile (les petites valeurs ne servent plus aux blindes), on procède à un chip race pour la retirer. On échange les petits jetons contre des plus gros, et pour les restes qui ne tombent pas juste, on tire des cartes : le joueur tirant la carte la plus haute reçoit le jeton arrondi. C'est une procédure encadrée, faite à la vue de tous.",
      },
      {
        heading: "Le changement de niveau",
        body:
          "Un tournoi suit une horloge. À chaque niveau, les blindes (et parfois les antes) augmentent. Le croupier annonce clairement le nouveau niveau dès qu'il démarre, ajuste les mises obligatoires et veille à ce que les joueurs postent les bons montants. Une erreur de niveau fausse toute la main.",
      },
      {
        heading: "Le temps et les pauses",
        body:
          "Le respect du tempo fait partie du métier. Le croupier maintient un rythme régulier de mains par niveau, gère les pauses prévues par la structure et applique, si la salle l'utilise, la règle du temps (clock) quand un joueur tarde trop à décider. Le but : un tournoi fluide et équitable pour tous.",
      },
    ],
  },
  {
    n: 7,
    slug: "gestion-des-erreurs",
    title: "La gestion des erreurs et litiges",
    emoji: "⚠️",
    summary: "Misdeal, carte retournée, jeton contesté, litige entre joueurs.",
    minutes: 9,
    status: "complet",
    objectives: [
      "Identifier et corriger un misdeal",
      "Réagir à une carte exposée",
      "Désamorcer un litige et appeler le floor",
    ],
    sections: [
      {
        heading: "Le misdeal",
        body:
          "Un misdeal est une donne irrégulière qui annule la main : on reprend les cartes et on redistribue. Les cas classiques sont un mauvais nombre de cartes distribuées, la première carte donnée au mauvais joueur, ou une carte exposée par le croupier en pleine distribution. Important : un misdeal ne peut plus être déclaré une fois qu'une action significative a eu lieu (des joueurs ont déjà agi sur leur main). Au moindre doute, le croupier appelle le floor.",
      },
      {
        heading: "La carte exposée",
        body:
          "Si le croupier expose une carte par erreur pendant la distribution, la procédure dépend du moment : selon les règles de la salle, la carte peut être remplacée et devenir la carte brûlée. En revanche, une carte exposée par la faute d'un joueur reste généralement la sienne : il en assume la conséquence. Le croupier applique le règlement sans improviser.",
      },
      {
        heading: "Le jeton ou la mise contestée",
        body:
          "Quand un joueur conteste le montant misé ou un jeton dans le pot, le croupier reconstitue la vérité de la table : il s'appuie sur ce qui est visible, sur les déclarations cohérentes des joueurs et, en dernier recours, sur le floor ou la vidéosurveillance. Tant que rien n'est tranché, on ne touche plus au pot.",
      },
      {
        heading: "Le litige entre joueurs",
        body:
          "Face à un désaccord, la règle d'or est la neutralité absolue. Le croupier ne prend jamais parti, garde son calme, fige la situation et lance le « Floor ! » qui appelle le superviseur. C'est le floor qui tranche. Le rôle du croupier est de décrire les faits, pas de juger.",
      },
      {
        heading: "L'action hors-tour et la mise irrégulière",
        body:
          "Quand un joueur agit avant son tour (action hors-tour), cette action peut être contraignante ou annulée selon ce qui s'est passé entre-temps. Une mise irrégulière (montant insuffisant, jetons cachés derrière) doit être corrigée immédiatement. Le croupier connaît ces règles pour réagir vite et garder la table sereine.",
      },
    ],
  },
  {
    n: 8,
    slug: "prelevement-du-rake",
    title: "Le prélèvement du rake",
    emoji: "🧾",
    summary: "Calcul du rake, jackpot drop et impact des side pots.",
    minutes: 8,
    status: "complet",
    objectives: [
      "Calculer le rake correctement",
      "Gérer le jackpot drop",
      "Prélever sur un pot avec side pots",
    ],
    sections: [
      {
        heading: "Qu'est-ce que le rake",
        body:
          "Le rake est la commission prélevée par la salle sur les parties de cash game. C'est ainsi que l'établissement se rémunère, puisqu'il ne joue pas. Le croupier prélève ce rake sur le pot, devant les joueurs, avant de pousser le pot au gagnant. En tournoi, il n'y a pas de rake sur les pots : la salle se rémunère via les droits d'entrée.",
      },
      {
        heading: "Le calcul du rake",
        body:
          "Le rake est en général un pourcentage du pot (souvent autour de 5 %) assorti d'un plafond appelé cap. Concrètement, on prélève le pourcentage jusqu'à un montant maximum fixé par la salle, et pas au-delà. Le croupier met de côté les jetons de rake au fur et à mesure, dans l'emplacement prévu, pour que tout reste transparent.",
      },
      {
        heading: "No flop, no drop",
        body:
          "La règle « no flop, no drop » est très répandue : si la main se termine avant le flop (tout le monde se couche préflop), aucun rake n'est prélevé. Le rake ne commence à courir qu'à partir du moment où un flop est distribué. Cette règle évite de taxer les mains qui ne vont nulle part.",
      },
      {
        heading: "Le jackpot drop",
        body:
          "Certaines salles prélèvent, en plus du rake, un petit montant fixe destiné à alimenter un jackpot, par exemple un bad beat jackpot (une grosse main perdante récompensée). Ce « jackpot drop » est séparé du rake et va dans un emplacement dédié. Le croupier ne confond jamais les deux prélèvements.",
      },
      {
        heading: "Rake et side pots",
        body:
          "Quand une main comporte des side pots, le rake se calcule sur l'ensemble mais se prélève proprement, sans pénaliser un joueur à tapis qui ne dispute que le pot principal. Le croupier prélève le montant dû une seule fois, en restant clair sur ce qui sort de chaque pot. Méthode et transparence avant tout.",
      },
    ],
  },
  {
    n: 9,
    slug: "annonces-du-dealer",
    title: "Les annonces du dealer",
    emoji: "📣",
    summary: "Le vocabulaire à annoncer à voix haute, en français et en anglais.",
    minutes: 8,
    status: "complet",
    objectives: [
      "Connaître toutes les annonces standards",
      "Annoncer clairement et au bon moment",
      "Maîtriser les annonces en anglais (festivals)",
    ],
    sections: [
      {
        heading: "Annoncer l'action",
        body:
          "La voix du croupier rythme la table. On annonce à qui revient la parole, et on répète chaque décision pour que tout le monde suive : « suit », « relance », « tapis », avec le montant quand il y en a un. Annoncer clairement évite les actions hors-tour et les malentendus. Une table où le dealer parle bien est une table qui ne se dispute pas.",
        bullets: [
          "« Parole à [siège] » pour désigner le joueur qui doit agir.",
          "« Relance à [montant] » quand un joueur relance.",
          "« Suit » (call) et « se couche » (fold).",
          "« Tapis » (all-in) avec le montant total.",
        ],
      },
      {
        heading: "Signaler au floor",
        body:
          "Le croupier est les yeux de la salle. Quand une place se libère, il annonce « place libre » (seat open) pour que le floor remplisse la table. Quand un joueur arrive, il signale « joueur en jeu » (player in). Ces annonces tiennent la liste d'attente à jour et gardent les tables pleines.",
      },
      {
        heading: "Annoncer les montants et le pot",
        body:
          "On annonce les montants de relance et, quand la salle l'autorise, la taille du pot si un joueur la demande. La clarté des chiffres est essentielle : un montant mal entendu, et c'est une mise contestée. Le croupier articule, montre les jetons et confirme avant de poursuivre.",
      },
      {
        heading: "Appeler le floor",
        body:
          "« Floor ! » est l'annonce qui appelle le superviseur en cas de litige, de doute sur une règle ou de décision à trancher. Le croupier l'utilise sans hésiter : appeler le floor n'est pas un aveu de faiblesse, c'est la bonne procédure. Mieux vaut un floor appelé pour rien qu'une mauvaise décision prise seul.",
      },
      {
        heading: "Le lexique bilingue",
        body:
          "En festival international, tout se dit en anglais. Le croupier doit basculer naturellement d'une langue à l'autre.",
        bullets: [
          "Suit = call",
          "Relance = raise",
          "Tapis = all-in",
          "Se coucher = fold",
          "Parole à = action on (player)",
          "Place libre = seat open",
          "Joueur en jeu = player in",
          "Abattage = showdown",
        ],
      },
    ],
  },
  {
    n: 10,
    slug: "examen-final",
    title: "Examen final & certification",
    emoji: "🎓",
    summary: "QCM de 100 questions, exercices pratiques et certification Jérôme Ibiza.",
    minutes: 60,
    status: "plan",
    objectives: [
      "Valider l'ensemble des connaissances",
      "Réussir les exercices pratiques",
      "Obtenir la certification Académie Croupier Jérôme Ibiza",
    ],
    sections: [
      {
        heading: "Au programme de l'examen",
        bullets: [
          "QCM de 100 questions couvrant les 9 modules.",
          "Exercices pratiques : mélange, distribution, calcul de side pots et de rake.",
          "Études de cas : litiges et situations délicates à résoudre.",
          "Certification « Croupier Poker, Académie Jérôme Ibiza » à la clé.",
        ],
      },
    ],
  },
];

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}
