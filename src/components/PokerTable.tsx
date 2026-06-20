import type { ReactNode } from "react";

export type TableSeat = {
  /** Texte court dans la pastille du siège (ex. "BTN", "Vous", "3"). */
  label: string;
  /** Légende sous le siège (ex. "Bouton", "Big blind"). */
  note?: string;
  /** Couleur d'accent du siège. */
  tone?: "gold" | "blue" | "muted";
  /** Ce siège a le bouton donneur (le jeton "D" s'affiche sur le feutre devant lui). */
  dealer?: boolean;
  /** Montant misé par ce siège, affiché en jeton devant lui (ex. "9 BB"). */
  bet?: string;
  /** Cartes du joueur (le héros), affichées devant son siège. */
  cards?: [string, string];
};

/** Position d'un élément réparti autour de la table (en pourcentage). */
export function seatPos(i: number, n: number, rx = 40, ry = 42) {
  // Siège 0 en bas, puis on tourne dans le sens horaire.
  const theta = ((90 + (i * 360) / n) * Math.PI) / 180;
  return { left: 50 + rx * Math.cos(theta), top: 50 + ry * Math.sin(theta) };
}

/** Table 6 joueurs avec les positions, pour illustrer une situation de jeu. */
export const TABLE_6MAX: TableSeat[] = [
  { label: "BTN", note: "Bouton", tone: "gold", dealer: true },
  { label: "SB", note: "Small blind", tone: "blue" },
  { label: "BB", note: "Big blind", tone: "blue" },
  { label: "UTG", note: "Under the gun" },
  { label: "MP", note: "Milieu" },
  { label: "CO", note: "Cutoff" },
];

/** Table vue du croupier, pour les modules de l'académie. */
export const TABLE_DEALER: TableSeat[] = [
  { label: "Croupier", note: "Vous", tone: "gold", dealer: true },
  { label: "J1", tone: "blue" },
  { label: "J2" },
  { label: "J3" },
  { label: "J4", tone: "blue" },
  { label: "J5" },
];

/** Duel à 2 joueurs (heads-up). En heads-up, le bouton est aussi la small blind. */
export const TABLE_HEADSUP: TableSeat[] = [
  { label: "BTN", note: "Bouton + SB", tone: "gold", dealer: true },
  { label: "BB", note: "Big blind", tone: "blue" },
];

/** Table à 3 joueurs (Spin & Go). */
export const TABLE_SPIN: TableSeat[] = [
  { label: "BTN", note: "Bouton", tone: "gold", dealer: true },
  { label: "SB", note: "Small blind", tone: "blue" },
  { label: "BB", note: "Big blind", tone: "blue" },
];

/** Table pleine à 9 joueurs (tournois, Sit & Go, mixed games). */
export const TABLE_FULL: TableSeat[] = [
  { label: "BTN", note: "Bouton", tone: "gold", dealer: true },
  { label: "SB", note: "Small blind", tone: "blue" },
  { label: "BB", note: "Big blind", tone: "blue" },
  { label: "UTG" },
  { label: "UTG+1" },
  { label: "UTG+2" },
  { label: "MP" },
  { label: "HJ" },
  { label: "CO" },
];

const SUIT: Record<string, string> = { s: "♠", h: "♥", d: "♦", c: "♣" };

/** Mini carte à jouer (board ou main du héros). Code type "As", "Kh", "Td", "2c". */
function MiniCard({ c }: { c: string }) {
  const suit = c.slice(-1).toLowerCase();
  const rank = c.slice(0, -1).replace(/^t$/i, "10");
  const red = suit === "h" || suit === "d";
  return (
    <span className="ptable-card" style={{ color: red ? "#cc2f44" : "#15110b" }}>
      <span className="ptable-card-r">{rank}</span>
      <span className="ptable-card-s">{SUIT[suit] ?? ""}</span>
    </span>
  );
}

/**
 * Illustration schématique d'une table de poker vue de dessus, posée sur un
 * fond uni : feutre ovale, sièges des joueurs autour, jeton donneur "D" sur le
 * tapis, et de quoi représenter une vraie situation (mises en jetons, pot,
 * cartes communes, main du héros).
 */
export function PokerTable({
  seats,
  center,
  caption,
  pot,
  board,
}: {
  seats: TableSeat[];
  center?: ReactNode;
  caption?: string;
  pot?: string;
  board?: string[];
}) {
  const n = seats.length;
  const dealerIdx = seats.findIndex((s) => s.dealer);
  const btn = dealerIdx >= 0 ? seatPos(dealerIdx, n, 21, 20) : null;
  const hasScene = (board && board.length > 0) || !!pot;

  return (
    <figure className="ptable">
      <div className="ptable-area">
        <div className="ptable-felt">
          {hasScene ? (
            <div className="ptable-scene">
              {board && board.length > 0 && (
                <div className="ptable-board">
                  {board.map((c, k) => (
                    <MiniCard key={k} c={c} />
                  ))}
                </div>
              )}
              {pot && <div className="ptable-pot">Pot {pot}</div>}
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

        {/* Mises (jetons devant les sièges) */}
        {seats.map((s, i) => {
          if (!s.bet) return null;
          const p = seatPos(i, n, 29, 28);
          return (
            <span
              key={`bet-${i}`}
              className={`ptable-bet tone-${s.tone ?? "muted"}`}
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
            >
              {s.bet}
            </span>
          );
        })}

        {/* Cartes du héros */}
        {seats.map((s, i) => {
          if (!s.cards) return null;
          const p = seatPos(i, n, 35, 34);
          return (
            <span
              key={`cards-${i}`}
              className="ptable-hero-cards"
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
            >
              <MiniCard c={s.cards[0]} />
              <MiniCard c={s.cards[1]} />
            </span>
          );
        })}

        {/* Sièges */}
        {seats.map((s, i) => {
          const p = seatPos(i, n);
          return (
            <div
              key={i}
              className={`ptable-seat tone-${s.tone ?? "muted"}`}
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
            >
              <span className="ptable-av">{s.label}</span>
              {s.note && <span className="ptable-note">{s.note}</span>}
            </div>
          );
        })}
      </div>
      {caption && <figcaption className="ptable-cap">{caption}</figcaption>}
    </figure>
  );
}
