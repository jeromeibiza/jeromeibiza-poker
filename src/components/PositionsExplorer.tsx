"use client";

import { useState } from "react";
import { PokerTable, type TableSeat } from "@/components/PokerTable";

type Pos = { abbr: string; name: string; group: string; desc: string };

/** Ordre des sièges autour de la table, en commençant par le bouton en bas. */
const SEAT_ORDER = ["BTN", "SB", "BB", "UTG", "UTG+1", "MP", "HJ", "CO"];

function toneFor(abbr: string): "gold" | "blue" | "muted" {
  if (abbr === "BTN") return "gold";
  if (abbr === "SB" || abbr === "BB") return "blue";
  return "muted";
}

/**
 * Table interactive des positions, bâtie sur le composant universel PokerTable :
 * sièges cliquables (la position choisie s'affiche au centre et dans la fiche
 * sous la table), tapis par joueur, bascule BB / jetons et bouton donneur.
 */
export function PositionsExplorer({ positions }: { positions: Pos[] }) {
  const seated = SEAT_ORDER.map((a) => positions.find((p) => p.abbr === a)).filter(
    (p): p is Pos => Boolean(p),
  );
  const [sel, setSel] = useState(0);
  const current = seated[sel];

  const seats: TableSeat[] = seated.map((p) => ({
    label: p.abbr,
    note: p.group,
    tone: toneFor(p.abbr),
    dealer: p.abbr === "BTN",
    stack: 100,
  }));

  return (
    <div>
      <PokerTable
        seats={seats}
        selectedIndex={sel}
        onSeatClick={setSel}
        caption="Clique sur une position pour voir son rôle."
        center={
          <span>
            <span style={{ fontSize: 26, color: "var(--gold-soft)", display: "block", lineHeight: 1.1 }}>
              {current.abbr}
            </span>
            <span style={{ display: "block", marginTop: 4 }}>{current.name}</span>
          </span>
        }
      />

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
