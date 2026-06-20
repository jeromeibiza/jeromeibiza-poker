import type { ReactNode } from "react";

export type TableSeat = {
  /** Texte court dans la pastille du siège (ex. "BTN", "Vous", "3"). */
  label: string;
  /** Légende sous le siège (ex. "Bouton", "Big blind"). */
  note?: string;
  /** Couleur d'accent du siège. */
  tone?: "gold" | "blue" | "muted";
  /** Affiche le jeton donneur "D" sur ce siège. */
  dealer?: boolean;
};

/**
 * Illustration schématique d'une table de poker vue de dessus : un feutre
 * ovale et les sièges des joueurs répartis autour. Purement décoratif et
 * pédagogique (aucune interaction). Palette bleu / or / noir.
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

  return (
    <figure className="ptable">
      <div className="ptable-area">
        <div className="ptable-felt">{center && <div className="ptable-center">{center}</div>}</div>

        {seats.map((s, i) => {
          // Siège 0 en bas, puis on tourne dans le sens horaire.
          const theta = ((90 + (i * 360) / n) * Math.PI) / 180;
          const left = 50 + 40 * Math.cos(theta);
          const top = 50 + 42 * Math.sin(theta);
          return (
            <div
              key={i}
              className={`ptable-seat tone-${s.tone ?? "muted"}`}
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span className="ptable-av">
                {s.label}
                {s.dealer && <span className="ptable-dealer" aria-label="bouton donneur">D</span>}
              </span>
              {s.note && <span className="ptable-note">{s.note}</span>}
            </div>
          );
        })}
      </div>
      {caption && <figcaption className="ptable-cap">{caption}</figcaption>}
    </figure>
  );
}
