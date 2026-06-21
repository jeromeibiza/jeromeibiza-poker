/**
 * Examen final de l'Académie Croupier : 100 questions (QCM) couvrant les 9 modules.
 * `m` = numéro du module d'où vient la question (pour la correction).
 */
export type ExamQuestion = { q: string; choices: string[]; answer: number; m: number };

export const EXAM: ExamQuestion[] = [
  // Module 1 -Introduction au métier
  { m: 1, q: "Au poker, quel est le statut du croupier ?", choices: ["Il joue contre les clients", "Il ne joue jamais, les joueurs s'affrontent entre eux", "Il mise pour le compte de la maison"], answer: 1 },
  { m: 1, q: "Le rôle principal du croupier de poker est de :", choices: ["Gagner le plus de pots possible", "Assurer le bon déroulement de la partie", "Conseiller les joueurs sur leurs mises"], answer: 1 },
  { m: 1, q: "Laquelle n'est PAS une qualité attendue d'un croupier ?", choices: ["La dextérité manuelle", "L'intégrité", "Prendre parti dans les litiges"], answer: 2 },
  { m: 1, q: "Le superviseur de salle qui tranche les litiges est :", choices: ["Le dealer", "Le floor (floorman)", "Le chip runner"], answer: 1 },
  { m: 1, q: "Qui apporte les caves de jetons aux joueurs ?", choices: ["Le chip runner", "Le senior dealer", "Le tournament director"], answer: 0 },
  { m: 1, q: "Le responsable de l'organisation et des décisions d'un tournoi est :", choices: ["Le floor", "Le tournament director (TD)", "Le poker manager"], answer: 1 },
  { m: 1, q: "Un parcours de carrière typique démarre comme :", choices: ["Floor", "Dealer", "Poker manager"], answer: 1 },
  { m: 1, q: "Pour enchaîner les festivals internationaux, quel atout est majeur ?", choices: ["La force physique", "La maîtrise de l'anglais", "Une licence de jeu"], answer: 1 },
  { m: 1, q: "Dans ce métier, l'honnêteté est :", choices: ["Souhaitable", "Non négociable", "Secondaire"], answer: 1 },
  { m: 1, q: "Le senior dealer est généralement affecté :", choices: ["Aux tables de débutants", "Aux tables à fort enjeu et aux finales", "À la caisse"], answer: 1 },
  { m: 1, q: "Le croupier est le premier rempart contre :", choices: ["Les pourboires", "Les erreurs et la triche", "La lenteur du jeu"], answer: 1 },

  // Module 2 -Manipulation des jetons
  { m: 2, q: "Dans la convention courante, le jeton blanc vaut :", choices: ["1", "5", "25"], answer: 0 },
  { m: 2, q: "Le jeton rouge vaut :", choices: ["5", "10", "25"], answer: 0 },
  { m: 2, q: "Le jeton vert vaut :", choices: ["20", "25", "50"], answer: 1 },
  { m: 2, q: "Le jeton noir vaut :", choices: ["50", "100", "500"], answer: 1 },
  { m: 2, q: "Le jeton violet vaut généralement :", choices: ["250", "500", "1000"], answer: 1 },
  { m: 2, q: "Le « chip cutting » consiste à :", choices: ["Laver les cartes", "Séparer une pile en paquets vérifiables d'un regard", "Mélanger les jetons entre eux"], answer: 1 },
  { m: 2, q: "On compte traditionnellement les jetons par :", choices: ["3 et 9", "5 et 20", "4 et 8"], answer: 1 },
  { m: 2, q: "Faire la monnaie doit se faire :", choices: ["Dans les mains, au-dessus du rack", "Sur la table, à la vue de tous", "Le plus discrètement possible"], answer: 1 },
  { m: 2, q: "Le rack (float) se range :", choices: ["En vrac", "Par dénomination, du plus petit au plus grand", "Par couleur, au hasard"], answer: 1 },
  { m: 2, q: "On pousse le pot au gagnant :", choices: ["Dès la river", "Une fois la main formellement terminée", "Avant l'abattage"], answer: 1 },
  { m: 2, q: "Avant de prendre une table, le croupier vérifie toujours :", choices: ["Le nombre de joueurs", "Le code couleur affiché de la salle", "L'état des cartes"], answer: 1 },

  // Module 3 -Manipulation des cartes
  { m: 3, q: "Le mélange à plat qui randomise réellement un jeu neuf est :", choices: ["Le riffle", "Le wash (scramble)", "Le strip"], answer: 1 },
  { m: 3, q: "Le « strip » (box) sert à :", choices: ["Entrelacer les deux paquets", "Casser les séquences en prélevant de petits paquets", "Couper le jeu en deux"], answer: 1 },
  { m: 3, q: "La séquence type d'un croupier est :", choices: ["Wash seul", "Riffle, riffle, strip, riffle", "Strip, strip, riffle"], answer: 1 },
  { m: 3, q: "La « cut card » (carte de coupe) sert à :", choices: ["Compter les cartes", "Masquer la carte du dessous du jeu", "Désigner le donneur"], answer: 1 },
  { m: 3, q: "La distribution (pitch) commence toujours par :", choices: ["Le bouton", "Le joueur à gauche du bouton (small blind)", "La big blind"], answer: 1 },
  { m: 3, q: "Pendant la distribution, la main qui tient le jeu reste :", choices: ["Haute et ouverte", "Basse et fermée", "Au-dessus du rack"], answer: 1 },
  { m: 3, q: "Que ne doit jamais toucher un joueur ?", choices: ["Ses propres cartes", "Le talon (le paquet non distribué)", "Ses jetons"], answer: 1 },
  { m: 3, q: "Entre la vitesse et la régularité/discrétion, le croupier privilégie :", choices: ["La vitesse", "La régularité et la discrétion", "Le spectacle"], answer: 1 },
  { m: 3, q: "Le wash se fait :", choices: ["À chaque main", "À l'ouverture d'une partie et quand le jeu doit être totalement rebrassé", "Jamais"], answer: 1 },
  { m: 3, q: "La coupe du jeu se fait :", choices: ["Après la distribution", "Avant de distribuer", "Pendant le flop"], answer: 1 },
  { m: 3, q: "Pour protéger le jeu, le croupier garde le deck :", choices: ["Haut et visible", "Bas et couvert", "Dans le rack"], answer: 1 },

  // Module 4 -Dealer au Texas Hold'em
  { m: 4, q: "Avant de distribuer, le croupier vérifie que :", choices: ["Les antes sont payées", "La small blind et la big blind sont postées", "Le rake est prélevé"], answer: 1 },
  { m: 4, q: "Le tour de parole préflop commence par :", choices: ["La small blind", "Le joueur à gauche de la big blind", "Le bouton"], answer: 1 },
  { m: 4, q: "Une mise effectuée en plusieurs gestes, interdite, s'appelle :", choices: ["Un string bet", "Un check-raise", "Un cap"], answer: 0 },
  { m: 4, q: "« Burn and turn » signifie :", choices: ["Brûler une carte puis dévoiler la suivante", "Retourner le pot", "Rebrasser le jeu"], answer: 0 },
  { m: 4, q: "Combien de cartes brûle-t-on avant le flop ?", choices: ["Zéro", "Une", "Trois"], answer: 1 },
  { m: 4, q: "Le flop dévoile :", choices: ["1 carte", "3 cartes", "5 cartes"], answer: 1 },
  { m: 4, q: "Un side pot se crée quand :", choices: ["Un joueur relance", "Un joueur fait tapis pour moins que les autres", "Il y a égalité"], answer: 1 },
  { m: 4, q: "Le pot principal est plafonné :", choices: ["Au pot total", "Au tapis du joueur all-in multiplié par le nombre de suiveurs", "Au double de la mise"], answer: 1 },
  { m: 4, q: "Le joueur à tapis pour le pot principal peut-il gagner le side pot ?", choices: ["Oui", "Non", "Seulement en cas d'égalité"], answer: 1 },
  { m: 4, q: "Si la river a donné lieu à une mise, qui montre en premier au showdown ?", choices: ["Le bouton", "Le dernier à avoir misé ou relancé", "La big blind"], answer: 1 },
  { m: 4, q: "Après un check général à la river, on montre :", choices: ["Personne", "Dans le sens horaire à partir du bouton", "Le plus gros tapis d'abord"], answer: 1 },
  { m: 4, q: "En cas d'égalité parfaite entre deux mains, le croupier :", choices: ["Rejoue la main", "Partage le pot (split)", "Donne au plus proche du bouton"], answer: 1 },

  // Module 5 -Situations en cash game
  { m: 5, q: "Un joueur absent à son tour de parole voit sa main :", choices: ["Conservée", "Jetée (mucked)", "Jouée automatiquement"], answer: 1 },
  { m: 5, q: "Tant qu'il occupe son siège, le joueur absent doit :", choices: ["Rien", "Payer les blindes quand elles passent (sauf sit out)", "Quitter la table"], answer: 1 },
  { m: 5, q: "Un joueur qui a raté sa big blind peut revenir :", choices: ["Gratuitement", "En postant la big blind manquée ou en attendant le bouton", "Jamais"], answer: 1 },
  { m: 5, q: "Un nouvel arrivant entre en jeu :", choices: ["Gratuitement", "En postant l'équivalent de la big blind ou en attendant la blinde", "En payant le rake"], answer: 1 },
  { m: 5, q: "La cave minimum d'une table s'exprime :", choices: ["En euros uniquement", "En big blinds ou en montant", "En nombre de jetons"], answer: 1 },
  { m: 5, q: "Un joueur peut recaver :", choices: ["Au milieu d'une main", "Entre les mains", "Jamais"], answer: 1 },
  { m: 5, q: "Le « rat-holing » consiste à :", choices: ["Cacher ses cartes", "Retirer discrètement des jetons de la table en cours de session", "Bluffer au tapis"], answer: 1 },
  { m: 5, q: "Le rat-holing est :", choices: ["Autorisé", "Interdit", "Toléré la nuit"], answer: 1 },
  { m: 5, q: "Ce qu'on pose sur la table doit y rester jusqu'à :", choices: ["La fin de la main", "Ce qu'on quitte définitivement le siège", "Le prochain bouton"], answer: 1 },
  { m: 5, q: "Le « sit out » permet au joueur :", choices: ["De continuer à payer les blindes", "De ne pas payer les blindes pendant son absence", "D'être éliminé"], answer: 1 },
  { m: 5, q: "Les places libres et les arrivées sont signalées :", choices: ["Aux joueurs", "Au floor", "À personne"], answer: 1 },

  // Module 6 -Situations en tournoi
  { m: 6, q: "En tournoi, les tables doivent rester :", choices: ["À 9 joueurs", "Équilibrées en nombre de joueurs", "Aléatoires"], answer: 1 },
  { m: 6, q: "Pour équilibrer, on déplace généralement le joueur qui :", choices: ["A le plus gros tapis", "Serait le prochain à payer la big blind", "Vient d'arriver"], answer: 1 },
  { m: 6, q: "Lors d'un cassage de table, chaque joueur :", choices: ["Garde sa place", "Tire un nouveau siège (redraw)", "Est éliminé"], answer: 1 },
  { m: 6, q: "Le chip race sert à :", choices: ["Accélérer les blindes", "Retirer une dénomination de jetons devenue inutile", "Prélever le rake"], answer: 1 },
  { m: 6, q: "Pour les restes d'un chip race, on départage :", choices: ["Au hasard", "En tirant des cartes (la plus haute gagne le jeton)", "Au tapis"], answer: 1 },
  { m: 6, q: "À chaque niveau de tournoi :", choices: ["Les blindes baissent", "Les blindes (et parfois les antes) augmentent", "Rien ne change"], answer: 1 },
  { m: 6, q: "Le croupier annonce le nouveau niveau :", choices: ["À la fin du niveau", "Dès qu'il démarre", "Jamais"], answer: 1 },
  { m: 6, q: "Le tournoi suit :", choices: ["Le rythme des joueurs", "Une horloge", "Le floor"], answer: 1 },
  { m: 6, q: "La « règle du temps » (clock) s'applique quand :", choices: ["Un joueur tarde trop à décider", "Le niveau change", "Un side pot existe"], answer: 0 },
  { m: 6, q: "Le chip race se déroule :", choices: ["En coulisses", "À la vue de tous", "Par le floor seul"], answer: 1 },
  { m: 6, q: "Un déséquilibre de tables est signalé :", choices: ["Par les joueurs", "Par le croupier au floor", "Par personne"], answer: 1 },

  // Module 7 -Gestion des erreurs et litiges
  { m: 7, q: "Un misdeal est :", choices: ["Une donne irrégulière qui annule la main", "Un très gros pot", "Un bluff raté"], answer: 0 },
  { m: 7, q: "Un misdeal ne peut plus être déclaré une fois que :", choices: ["Le flop est sorti", "Une action significative a eu lieu", "Le rake est prélevé"], answer: 1 },
  { m: 7, q: "Une carte exposée par la faute d'un joueur :", choices: ["Est remplacée", "Reste généralement la sienne", "Annule la main"], answer: 1 },
  { m: 7, q: "Face à une mise contestée, tant que rien n'est tranché :", choices: ["On continue normalement", "On ne touche plus au pot", "On rembourse le joueur"], answer: 1 },
  { m: 7, q: "Face à un litige entre joueurs, la règle d'or est :", choices: ["Donner raison au plus ancien", "La neutralité absolue", "Rejouer la main"], answer: 1 },
  { m: 7, q: "Qui tranche un litige ?", choices: ["Le croupier", "Le floor", "Les joueurs"], answer: 1 },
  { m: 7, q: "Le rôle du croupier dans un litige est de :", choices: ["Juger", "Décrire les faits", "Choisir un camp"], answer: 1 },
  { m: 7, q: "La première carte donnée au mauvais joueur est :", choices: ["Sans conséquence", "Un cas de misdeal", "La faute du joueur"], answer: 1 },
  { m: 7, q: "Une action hors-tour (avant son tour) peut être :", choices: ["Toujours valable", "Contraignante ou annulée selon ce qui s'est passé", "Toujours ignorée"], answer: 1 },
  { m: 7, q: "Une mise irrégulière (montant insuffisant) doit être :", choices: ["Acceptée telle quelle", "Corrigée immédiatement", "Rejouée au tour suivant"], answer: 1 },
  { m: 7, q: "Au moindre doute sur un misdeal, le croupier :", choices: ["Décide seul", "Appelle le floor", "Rembourse tout le monde"], answer: 1 },

  // Module 8 -Le prélèvement du rake
  { m: 8, q: "Le rake est :", choices: ["Un pourboire", "La commission prélevée par la salle en cash game", "Une mise obligatoire"], answer: 1 },
  { m: 8, q: "En tournoi, le rake sur les pots :", choices: ["Existe", "N'existe pas (la salle se rémunère via les droits d'entrée)", "Est doublé"], answer: 1 },
  { m: 8, q: "Le rake est généralement :", choices: ["Un montant fixe", "Un pourcentage du pot avec un plafond (cap)", "Aléatoire"], answer: 1 },
  { m: 8, q: "Le pourcentage de rake tourne souvent autour de :", choices: ["1 %", "5 %", "20 %"], answer: 1 },
  { m: 8, q: "« No flop, no drop » signifie :", choices: ["Pas de rake si la main se termine avant le flop", "Pas de jeu sans flop", "Pas de pot sans mise"], answer: 0 },
  { m: 8, q: "Le rake se prélève :", choices: ["Après avoir poussé le pot", "Sur le pot, devant les joueurs, avant de pousser", "À la caisse en fin de partie"], answer: 1 },
  { m: 8, q: "Le « jackpot drop » est :", choices: ["Le rake lui-même", "Un montant séparé alimentant un jackpot", "Un pourboire pour le croupier"], answer: 1 },
  { m: 8, q: "Le jackpot drop et le rake :", choices: ["Sont identiques", "Vont dans des emplacements séparés", "Sont optionnels"], answer: 1 },
  { m: 8, q: "Un « bad beat jackpot » récompense :", choices: ["Le meilleur joueur", "Une grosse main perdante", "Le croupier"], answer: 1 },
  { m: 8, q: "Sur une main avec side pots, le rake :", choices: ["Se prend deux fois", "Se prélève une seule fois, proprement", "N'est pas prélevé"], answer: 1 },

  // Module 9 -Les annonces du dealer
  { m: 9, q: "Le croupier répète chaque décision pour :", choices: ["Faire le spectacle", "Que tout le monde suive et éviter les malentendus", "Gagner du temps"], answer: 1 },
  { m: 9, q: "« Suit » se dit en anglais :", choices: ["Raise", "Call", "Fold"], answer: 1 },
  { m: 9, q: "« Relance » se dit :", choices: ["Call", "Raise", "Check"], answer: 1 },
  { m: 9, q: "« Tapis » (all-in) se dit :", choices: ["All-in", "Cap", "Pass"], answer: 0 },
  { m: 9, q: "« Se coucher » se dit :", choices: ["Fold", "Stand", "Pass"], answer: 0 },
  { m: 9, q: "« Place libre » se dit :", choices: ["Seat open", "Free chair", "Table open"], answer: 0 },
  { m: 9, q: "« Joueur en jeu » se dit :", choices: ["Player in", "New man", "Seat in"], answer: 0 },
  { m: 9, q: "« Abattage » se dit :", choices: ["Showdown", "Reveal", "Open cards"], answer: 0 },
  { m: 9, q: "« Parole à [siège] » se dit :", choices: ["Action on (player)", "Talk to", "Turn on"], answer: 0 },
  { m: 9, q: "Appeler le floor est :", choices: ["Un aveu de faiblesse", "La bonne procédure", "Interdit"], answer: 1 },
  { m: 9, q: "Quand une place se libère, le croupier annonce :", choices: ["Rien", "« Place libre » (seat open)", "Au manager uniquement"], answer: 1 },
  { m: 9, q: "La clarté des montants annoncés évite :", choices: ["Les pourboires", "Les mises contestées", "La triche"], answer: 1 },
];
