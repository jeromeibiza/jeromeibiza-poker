"use client";

import { useState } from "react";
import { seatPos } from "@/components/PokerTable";

type Pos = { abbr: string; name: string; group: string; desc: string };

/** Ordre des sièges autour de la table, en commençant par le bouton en bas. */
const SEAT_ORDER = ["BTN", "SB", "BB", "UTG", "UTG+1", "MP", "HJ", "CO"];

function toneFor(abbr: string): "gold" | "blue" | "muted" {
  if (abbr === "BTN") return "gold";
  if (abbr === "SB" || abbr === "BB") return "blue";
  return "muted";
}

/**
 * Table interactive : on clique sur une position pour mettre à jour l'affichage
 * (le centre du tapis et la fiche sous la table). Fond uni, bouton donneur sur
 * le feutre devant le siège du bouton.
 */
export function PositionsExplorer({ positions }: { positions: Pos[] }) {
  const seated = SEAT_ORDER.map((a) => positions.find((p) => p.abbr === a)).filter(
    (p): p is Pos => Boolean(p),
  );
  const n = seated.length;
  const [sel, setSel] = useState(0);
  const current = seated[sel];
  const btn = seatPos(0, n, 24, 23);

  return (
    <div>
      <figure className="ptable">
        <div className="ptable-area">
          <div className="ptable-felt">
            <div className="ptable-center">
              <span style={{ fontSize: 26, color: "var(--gold-soft)", display: "block", lineHeight: 1.1 }}>
                {current.abbr}
              </span>
              <span style={{ display: "block", marginTop: 4 }}>{current.name}</span>
            </div>
          </div>

          <span
            className="ptable-felt-btn"
            style={{ left: `${btn.left}%`, top: `${btn.top}%` }}
            aria-label="bouton donneur (dealer)"
          >
            D
          </span>

          {seated.map((p, i) => {
            const pos = seatPos(i, n);
            const selected = i === sel;
            return (
              <button
                key={p.abbr}
                type="button"
                onClick={() => setSel(i)}
                aria-pressed={selected}
                className={`ptable-seat ptable-seat-btn tone-${toneFor(p.abbr)}${selected ? " is-selected" : ""}`}
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              >
                <span className="ptable-av">{p.abbr}</span>
                <span className="ptable-note">{p.group}</span>
              </button>
            );
          })}
        </div>
        <figcaption className="ptable-cap">Clique sur une position pour voir son rôle.</figcaption>
      </figure>

      <div className="card" style={{ marginTop: 12 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
          <span className="display" style={{ fontSize: 18, color: "var(--gold)" }}>{current.abbr}</span>
          <span className="display" style={{ fontSize: 16 }}>{current.name}</span>
          <span className="pill">{current.group}</span>
        </div>
        <p style={{ color: "var(--muted)", marginTop: 10, marginBottom: 0 }}>{current.desc}</p>
      </div>
    </div>
  );
}
