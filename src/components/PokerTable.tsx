"use client";

import { useEffect, useState, type ReactNode } from "react";

/** 1 grosse blinde = 100 jetons (small blind 50, big blind 100). */
const CHIPS_PER_BB = 100;
const UNIT_KEY = "ph_poker_unit";

type Unit = "bb" | "chips";

export type TableSeat = {
  /** Texte court dans la pastille du siège (ex. "BTN", "Vous", "3"). */
  label: string;
  /** Légende sous le siège (ex. "Bouton", "Big blind"). */
  note?: string;
  /** Couleur d'accent du siège. */
  tone?: "gold" | "blue" | "muted";
  /** Ce siège a le bouton donneur (jeton "D" sur le feutre devant lui). */
  dealer?: boolean;
  /** Tapis du joueur, exprimé en grosses blindes (BB). */
  stack?: number;
  /** Mise du joueur sur ce tour, en grosses blindes (BB). */
  bet?: number;
  /** Cartes du joueur (le héros), affichées face visible devant son siège. */
  cards?: [string, string];
  /** Le joueur est en jeu mais ses cartes sont cachées (dos de carte). */
  hidden?: boolean;
};

/** Position d'un élément réparti autour de la table (en pourcentage). */
export function seatPos(i: number, n: number, rx = 40, ry = 42, offsetDeg = 0) {
  const theta = ((90 + (i * 360) / n + offsetDeg) * Math.PI) / 180;
  return { left: 50 + rx * Math.cos(theta), top: 50 + ry * Math.sin(theta) };
}

const fmtChips = (n: number) => Math.round(n).toLocaleString("fr-FR");
const fmtBB = (n: number) => `${Number.isInteger(n) ? String(n) : n.toFixed(1).replace(".", ",")} BB`;
const fmtAmount = (bb: number, unit: Unit) => (unit === "chips" ? fmtChips(bb * CHIPS_PER_BB) : fmtBB(bb));

/** Table 6 joueurs avec les positions (tapis de 100 BB chacun). */
export const TABLE_6MAX: TableSeat[] = [
  { label: "BTN", note: "Bouton", tone: "gold", dealer: true, stack: 100 },
  { label: "SB", note: "Small blind", tone: "blue", stack: 80 },
  { label: "BB", note: "Big blind", tone: "blue", stack: 120 },
  { label: "UTG", note: "Under the gun", stack: 95 },
  { label: "MP", note: "Milieu", stack: 110 },
  { label: "CO", note: "Cutoff", stack: 90 },
];

/** Table vue du croupier, pour les modules de l'académie. */
export const TABLE_DEALER: TableSeat[] = [
  { label: "Croupier", note: "Vous", tone: "gold", dealer: true },
  { label: "J1", tone: "blue", stack: 100 },
  { label: "J2", stack: 75 },
  { label: "J3", stack: 130 },
  { label: "J4", tone: "blue", stack: 60 },
  { label: "J5", stack: 95 },
];

/** Duel à 2 joueurs (heads-up). Le bouton est aussi la small blind. */
export const TABLE_HEADSUP: TableSeat[] = [
  { label: "BTN", note: "Bouton + SB", tone: "gold", dealer: true, stack: 100 },
  { label: "BB", note: "Big blind", tone: "blue", stack: 100 },
];

/** Table à 3 joueurs (Spin & Go), tapis de départ 25 BB. */
export const TABLE_SPIN: TableSeat[] = [
  { label: "BTN", note: "Bouton", tone: "gold", dealer: true, stack: 25 },
  { label: "SB", note: "Small blind", tone: "blue", stack: 25 },
  { label: "BB", note: "Big blind", tone: "blue", stack: 25 },
];

/** Table pleine à 9 joueurs (tournois, Sit & Go, mixed games). */
export const TABLE_FULL: TableSeat[] = [
  { label: "BTN", note: "Bouton", tone: "gold", dealer: true, stack: 100 },
  { label: "SB", note: "Small blind", tone: "blue", stack: 80 },
  { label: "BB", note: "Big blind", tone: "blue", stack: 120 },
  { label: "UTG", stack: 95 },
  { label: "UTG+1", stack: 60 },
  { label: "UTG+2", stack: 140 },
  { label: "MP", stack: 110 },
  { label: "HJ", stack: 90 },
  { label: "CO", stack: 105 },
];

const SUIT: Record<string, string> = { s: "♠", h: "♥", d: "♦", c: "♣" };

function MiniCard({ c, hl = false }: { c: string; hl?: boolean }) {
  const suit = c.slice(-1).toLowerCase();
  const rank = c.slice(0, -1).replace(/^t$/i, "10");
  const red = suit === "h" || suit === "d";
  return (
    <span className={`ptable-card${hl ? " is-hl" : ""}`} style={{ color: red ? "#cc2f44" : "#15110b" }}>
      <span className="ptable-card-r">{rank}</span>
      <span className="ptable-card-s">{SUIT[suit] ?? ""}</span>
    </span>
  );
}

/** Dos de carte (adversaire en jeu, cartes cachées). */
function CardBack() {
  return <span className="ptable-card ptable-card-back" aria-hidden />;
}

/**
 * Table de poker vue de dessus, façon vrai client (PokerStars / Winamax) :
 * tapis affiché par joueur, bascule BB / jetons, bouton donneur sur le feutre,
 * mises et pot représentés en jetons. Posée sur un fond uni.
 */
export function PokerTable({
  seats,
  center,
  caption,
  pot,
  board,
  boardHighlight,
  defaultUnit = "bb",
  selectedIndex,
  onSeatClick,
}: {
  seats: TableSeat[];
  center?: ReactNode;
  caption?: string;
  pot?: number;
  board?: string[];
  boardHighlight?: number[];
  defaultUnit?: Unit;
  selectedIndex?: number;
  onSeatClick?: (i: number) => void;
}) {
  const [unit, setUnit] = useState<Unit>(defaultUnit);

  // Reprend le choix mémorisé de l'utilisateur s'il existe (sans casser l'hydratation).
  useEffect(() => {
    try {
      const v = window.localStorage.getItem(UNIT_KEY);
      if (v === "bb" || v === "chips") setUnit(v);
    } catch {
      /* ignore */
    }
  }, []);

  function choose(u: Unit) {
    setUnit(u);
    try {
      window.localStorage.setItem(UNIT_KEY, u);
    } catch {
      /* ignore */
    }
  }

  const n = seats.length;
  const dealerIdx = seats.findIndex((s) => s.dealer);
  const btn = dealerIdx >= 0 ? seatPos(dealerIdx, n, 23, 22, 26) : null;
  const hasScene = (board && board.length > 0) || pot != null;
  const headsUp = n === 2;

  return (
    <figure className="ptable">
      <div className="ptable-unit" role="group" aria-label="Unité d'affichage">
        <button type="button" className={unit === "bb" ? "is-on" : ""} onClick={() => choose("bb")}>BB</button>
        <button type="button" className={unit === "chips" ? "is-on" : ""} onClick={() => choose("chips")}>Jetons</button>
      </div>

      <div className="ptable-area">
        <div className="ptable-felt">
          {hasScene ? (
            <div className="ptable-scene">
              {board && board.length > 0 && (
                <div className="ptable-board">
                  {board.map((c, k) => (
                    <MiniCard key={k} c={c} hl={boardHighlight?.includes(k)} />
                  ))}
                </div>
              )}
              {pot != null && (
                <div className="ptable-pot">
                  <span className="ptable-pot-chips" aria-hidden>
                    <i /><i /><i />
                  </span>
                  Pot : {fmtAmount(pot, unit)}
                </div>
              )}
            </div>
          ) : (
            center && <div className="ptable-center">{center}</div>
          )}
        </div>

        {btn && (
          <span
            className="ptable-felt-btn"
            style={{ left: `${btn.left}%`, top: `${btn.top}%` }}
            aria-label="bouton donneur (dealer)"
          >
            D
          </span>
        )}

        {seats.map((s, i) => {
          if (s.bet == null) return null;
          const p = seatPos(i, n, 26, 24);
          return (
            <span
              key={`bet-${i}`}
              className={`ptable-bet tone-${s.tone ?? "muted"}`}
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
            >
              <span className="ptable-bet-chips" aria-hidden>
                <i /><i /><i />
              </span>
              {fmtAmount(s.bet, unit)}
            </span>
          );
        })}

        {seats.map((s, i) => {
          if (!s.cards && !s.hidden) return null;
          const p = seatPos(i, n, 35, 34);
          return (
            <span
              key={`cards-${i}`}
              className="ptable-hero-cards"
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
            >
              {s.cards ? (
                <>
                  <MiniCard c={s.cards[0]} />
                  <MiniCard c={s.cards[1]} />
                </>
              ) : (
                <>
                  <CardBack />
                  <CardBack />
                </>
              )}
            </span>
          );
        })}

        {seats.map((s, i) => {
          const p = seatPos(i, n);
          const selected = selectedIndex === i;
          const cls = `ptable-seat tone-${s.tone ?? "muted"}${onSeatClick ? " ptable-seat-btn" : ""}${selected ? " is-selected" : ""}`;
          const style = { left: `${p.left}%`, top: `${p.top}%` };
          const inner = (
            <>
              <span className="ptable-av">{s.label}</span>
              {s.note && <span className="ptable-note">{s.note}</span>}
              {s.stack != null && <span className="ptable-stack">{fmtAmount(s.stack, unit)}</span>}
            </>
          );
          return onSeatClick ? (
            <button
              key={i}
              type="button"
              className={cls}
              style={style}
              onClick={() => onSeatClick(i)}
              aria-pressed={selected}
            >
              {inner}
            </button>
          ) : (
            <div key={i} className={cls} style={style}>
              {inner}
            </div>
          );
        })}
      </div>

      {headsUp && (
        <div className="ptable-hu-note">
          Rappel : en heads-up (face à face), le joueur au bouton (D) est aussi la small blind.
        </div>
      )}
      {caption && <figcaption className="ptable-cap">{caption}</figcaption>}
    </figure>
  );
}
