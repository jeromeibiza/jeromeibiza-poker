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

/**
 * Illustration schématique d'une table de poker vue de dessus, posée sur un
 * fond uni : feutre ovale, sièges des joueurs autour, et le jeton donneur "D"
 * directement sur le tapis devant le siège du bouton. Purement pédagogique.
 */
export function PokerTable({
  seats,
  center,
  caption,
}: {
  seats: TableSeat[];
  center?: ReactNode;
  caption?: string;
}) {
  const n = seats.length;
  const dealerIdx = seats.findIndex((s) => s.dealer);
  const btn = dealerIdx >= 0 ? seatPos(dealerIdx, n, 24, 23) : null;

  return (
    <figure className="ptable">
      <div className="ptable-area">
        <div className="ptable-felt">{center && <div className="ptable-center">{center}</div>}</div>

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
