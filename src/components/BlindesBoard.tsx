"use client";

import { useState } from "react";
import { PokerTable, type TableSeat } from "@/components/PokerTable";

type Role = { seat: TableSeat; name: string; desc: string };

/** Table 6-max des blindes : jetons posés devant SB/BB, sièges cliquables. */
const ROLES: Role[] = [
  {
    seat: { label: "BTN", note: "Bouton", tone: "gold", dealer: true, stack: 100 },
    name: "Le bouton (donneur)",
    desc: "Le donneur ne paie aucune blinde et parle en dernier après le flop : la meilleure place de la table. Le jeton « D » est posé devant lui et avance d'un siège à chaque main.",
  },
  {
    seat: { label: "SB", note: "Small blind", tone: "blue", bet: 0.5, stack: 99.5 },
    name: "Small blind (petite blinde)",
    desc: "Le joueur juste à gauche du bouton. Il pose une mise obligatoire réduite (ici 0,5 BB) avant même de voir ses cartes. Mauvaise position : il parle en premier après le flop.",
  },
  {
    seat: { label: "BB", note: "Big blind", tone: "blue", bet: 1, stack: 99 },
    name: "Big blind (grosse blinde)",
    desc: "Le joueur suivant pose la grosse blinde (1 BB), l'unité de référence du poker. Il est le dernier à parler au préflop et peut « checker » gratuitement si personne ne relance.",
  },
  {
    seat: { label: "UTG", note: "Parle en 1er", stack: 100 },
    name: "Under the gun",
    desc: "Le premier à parler au préflop, juste à gauche de la grosse blinde. La position la plus difficile : beaucoup de joueurs parlent après vous, alors on y joue très serré.",
  },
  {
    seat: { label: "MP", note: "Milieu", stack: 100 },
    name: "Milieu (middle position)",
    desc: "Position intermédiaire. On peut ouvrir un peu plus de mains qu'en début de parole, mais la prudence reste de mise.",
  },
  {
    seat: { label: "CO", note: "Cutoff", stack: 100 },
    name: "Cutoff",
    desc: "Juste avant le bouton. Excellente place pour attaquer les blindes : peu de joueurs derrière vous, donc on ouvre large.",
  },
];

export function BlindesBoard() {
  const [sel, setSel] = useState(2); // big blind par défaut (l'unité de référence)
  const cur = ROLES[sel];

  return (
    <div>
      <PokerTable
        seats={ROLES.map((r) => r.seat)}
        pot={1.5}
        defaultUnit="bb"
        selectedIndex={sel}
        onSeatClick={setSel}
        caption="Clique sur un siège pour voir son rôle. Les jetons posés devant la SB et la BB sont les blindes : elles forment déjà le pot (1,5 BB) avant la première carte."
      />

      <div className="card pos-detail" style={{ marginTop: 12 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
          <span className="display" style={{ fontSize: 18, color: "var(--gold)" }}>{cur.seat.label}</span>
          <span className="display" style={{ fontSize: 16 }}>{cur.name}</span>
        </div>
        <p style={{ color: "var(--muted)", marginTop: 10, marginBottom: 0 }}>{cur.desc}</p>
      </div>
    </div>
  );
}
