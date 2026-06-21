"use client";

import { useState } from "react";
import { PokerTable, type TableSeat } from "@/components/PokerTable";

type Phase = {
  n: number;
  title: string;
  text: string;
  seats: TableSeat[];
  board?: string[];
  pot?: number;
};

/** Une main complète, expliquée phase par phase pour un grand débutant. */
const PHASES: Phase[] = [
  {
    n: 1,
    title: "Les blindes",
    text: "On démarre. Le donneur (le jeton D) est sur J4. Les deux joueurs juste à sa gauche posent une mise obligatoire (en or) : la « small blind » et la « big blind ». Ça crée déjà un pot à gagner.",
    seats: [
      { label: "Vous", note: "votre siège", tone: "blue", stack: 100 },
      { label: "J2", stack: 100 },
      { label: "J3", stack: 100 },
      { label: "J4", note: "Donneur", tone: "gold", dealer: true, stack: 100 },
      { label: "J5", note: "Small blind", tone: "gold", bet: 0.5, stack: 99.5 },
      { label: "J6", note: "Big blind", tone: "gold", bet: 1, stack: 99 },
    ],
    pot: 1.5,
  },
  {
    n: 2,
    title: "La donne (préflop)",
    text: "Le donneur distribue 2 cartes à chaque joueur. Les vôtres sont face visible (un As et un Roi), celles des autres sont cachées : on voit juste qu'ils sont tous en jeu. C'est le premier tour de mises.",
    seats: [
      { label: "Vous", note: "vos cartes", tone: "blue", cards: ["As", "Ks"], stack: 100 },
      { label: "J2", hidden: true, stack: 100 },
      { label: "J3", hidden: true, stack: 100 },
      { label: "J4", note: "Donneur", tone: "gold", dealer: true, hidden: true, stack: 100 },
      { label: "J5", tone: "gold", bet: 0.5, hidden: true, stack: 99.5 },
      { label: "J6", tone: "gold", bet: 1, hidden: true, stack: 99 },
    ],
    pot: 1.5,
  },
  {
    n: 3,
    title: "Le flop",
    text: "Le donneur retourne les 3 premières cartes communes au milieu : le « flop ». Elles sont pour tout le monde. Ici, avec votre Roi, vous avez maintenant une paire de Rois !",
    seats: [
      { label: "Vous", note: "paire de Rois", tone: "blue", cards: ["As", "Ks"], stack: 100 },
      { label: "J2", hidden: true, stack: 100 },
      { label: "J3", hidden: true, stack: 100 },
      { label: "J4", note: "Donneur", tone: "gold", dealer: true, hidden: true, stack: 100 },
      { label: "J5", hidden: true, stack: 99.5 },
      { label: "J6", hidden: true, stack: 99 },
    ],
    board: ["Kh", "9d", "4c"],
    pot: 6,
  },
  {
    n: 4,
    title: "Le turn",
    text: "Une 4ᵉ carte commune apparaît : le « turn ». Nouveau tour de mises. Votre paire de Rois tient toujours.",
    seats: [
      { label: "Vous", note: "vous", tone: "blue", cards: ["As", "Ks"], stack: 100 },
      { label: "J2", hidden: true, stack: 100 },
      { label: "J3", hidden: true, stack: 100 },
      { label: "J4", note: "Donneur", tone: "gold", dealer: true, hidden: true, stack: 100 },
      { label: "J5", hidden: true, stack: 99.5 },
      { label: "J6", hidden: true, stack: 99 },
    ],
    board: ["Kh", "9d", "4c", "7s"],
    pot: 6,
  },
  {
    n: 5,
    title: "La river",
    text: "La 5ᵉ et dernière carte commune : la « river ». Dernier tour de mises avant de comparer les mains.",
    seats: [
      { label: "Vous", note: "vous", tone: "blue", cards: ["As", "Ks"], stack: 100 },
      { label: "J2", hidden: true, stack: 100 },
      { label: "J3", hidden: true, stack: 100 },
      { label: "J4", note: "Donneur", tone: "gold", dealer: true, hidden: true, stack: 100 },
      { label: "J5", hidden: true, stack: 99.5 },
      { label: "J6", hidden: true, stack: 99 },
    ],
    board: ["Kh", "9d", "4c", "7s", "2h"],
    pot: 6,
  },
  {
    n: 6,
    title: "Le showdown",
    text: "Tout le monde dévoile sa main : la meilleure combinaison de 5 cartes gagne. Votre paire de Rois bat la main de J5, vous remportez le pot !",
    seats: [
      { label: "Vous", note: "gagne !", tone: "gold", cards: ["As", "Ks"], stack: 106 },
      { label: "J2", hidden: true, stack: 100 },
      { label: "J3", note: "couché", tone: "muted", stack: 100 },
      { label: "J4", note: "Donneur", dealer: true, hidden: true, stack: 100 },
      { label: "J5", note: "perd", tone: "muted", cards: ["Qc", "Jd"], stack: 94 },
      { label: "J6", note: "couché", tone: "muted", stack: 99 },
    ],
    board: ["Kh", "9d", "4c", "7s", "2h"],
    pot: 6,
  },
];

/**
 * Déroulement d'une main, cliquable étape par étape (pour grand débutant).
 * On clique 1, 2, 3... et la table affiche la phase correspondante.
 */
export function HandWalkthrough() {
  const [active, setActive] = useState(0);
  const p = PHASES[active];

  return (
    <div>
      <PokerTable seats={p.seats} board={p.board} pot={p.pot} defaultUnit="chips" />

      <div className="replayer-explain" key={active}>
        <div className="replayer-explain-head">
          <span className="replayer-tag">Étape {p.n}</span>
          <span className="replayer-step">{active + 1} sur {PHASES.length}</span>
        </div>
        <div className="replayer-title">{p.title}</div>
        <p className="replayer-text">{p.text}</p>
      </div>

      <ol className="walk-steps">
        {PHASES.map((ph, i) => (
          <li key={ph.n}>
            <button
              type="button"
              className={`walk-step${i === active ? " is-on" : ""}`}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
            >
              <span className="walk-num">{ph.n}</span>
              <span className="walk-label">{ph.title}</span>
              {i === active && <span className="walk-go" aria-hidden>✓</span>}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
