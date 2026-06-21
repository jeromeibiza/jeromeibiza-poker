"use client";

import { useState } from "react";

const RANKS = "AKQJT98765432".split("");
const idx = (r: string) => RANKS.indexOf(r);

type Spec = {
  pairs: string;
  suited: Record<string, string>;
  offsuit: Record<string, string>;
};

/**
 * Ranges de push (all-in) à ~10 BB, par position, simplifiées pour mémoriser.
 * Inspirées des charts Jennifear (push/fold MTT). Plus on est proche du bouton,
 * plus on pousse large.
 */
const POSITIONS: { key: string; label: string; spec: Spec }[] = [
  {
    key: "UTG",
    label: "UTG (début)",
    spec: { pairs: "2", suited: { A: "7", K: "T", Q: "T", J: "T" }, offsuit: { A: "T", K: "Q" } },
  },
  {
    key: "MP",
    label: "Milieu",
    spec: {
      pairs: "2",
      suited: { A: "4", K: "9", Q: "9", J: "9", T: "9" },
      offsuit: { A: "9", K: "T", Q: "J" },
    },
  },
  {
    key: "CO",
    label: "Cutoff",
    spec: {
      pairs: "2",
      suited: { A: "2", K: "7", Q: "8", J: "8", T: "8", "9": "8" },
      offsuit: { A: "7", K: "9", Q: "T", J: "T" },
    },
  },
  {
    key: "BTN",
    label: "Bouton",
    spec: {
      pairs: "2",
      suited: { A: "2", K: "2", Q: "4", J: "6", T: "6", "9": "6", "8": "6", "7": "6" },
      offsuit: { A: "2", K: "6", Q: "8", J: "8", T: "9" },
    },
  },
  {
    key: "SB",
    label: "Small blind",
    spec: {
      pairs: "2",
      suited: { A: "2", K: "2", Q: "2", J: "4", T: "5", "9": "5", "8": "5", "7": "5", "6": "5", "5": "4" },
      offsuit: { A: "2", K: "3", Q: "6", J: "7", T: "7", "9": "8" },
    },
  },
];

function buildRange(spec: Spec): Set<string> {
  const set = new Set<string>();
  for (let i = 0; i <= idx(spec.pairs); i++) set.add(RANKS[i] + RANKS[i]);
  for (const [hi, lo] of Object.entries(spec.suited)) {
    for (let j = idx(hi) + 1; j <= idx(lo); j++) set.add(hi + RANKS[j] + "s");
  }
  for (const [hi, lo] of Object.entries(spec.offsuit)) {
    for (let j = idx(hi) + 1; j <= idx(lo); j++) set.add(hi + RANKS[j] + "o");
  }
  return set;
}

const RANGES: Record<string, Set<string>> = Object.fromEntries(
  POSITIONS.map((p) => [p.key, buildRange(p.spec)]),
);

function handAt(i: number, j: number): { hand: string; type: "pair" | "suited" | "offsuit" } {
  if (i === j) return { hand: RANKS[i] + RANKS[i], type: "pair" };
  if (i < j) return { hand: RANKS[i] + RANKS[j] + "s", type: "suited" };
  return { hand: RANKS[j] + RANKS[i] + "o", type: "offsuit" };
}

export function PushFoldChart() {
  const [pos, setPos] = useState("BTN");
  const range = RANGES[pos];

  let combos = 0;
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 13; j++) {
      const { hand } = handAt(i, j);
      if (range.has(hand)) combos += i === j ? 6 : i < j ? 4 : 12;
    }
  }
  const pct = Math.round((combos / 1326) * 100);

  return (
    <div className="pf">
      <div className="pf-tabs" role="group" aria-label="Position à la table">
        {POSITIONS.map((p) => (
          <button
            key={p.key}
            type="button"
            className={`pf-tab${pos === p.key ? " is-on" : ""}`}
            onClick={() => setPos(p.key)}
            aria-pressed={pos === p.key}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="pf-grid" aria-hidden>
        {Array.from({ length: 13 }).map((_, i) =>
          Array.from({ length: 13 }).map((_, j) => {
            const { hand, type } = handAt(i, j);
            const push = range.has(hand);
            return (
              <span key={`${i}-${j}`} className={`pf-cell pf-${type}${push ? " push" : ""}`}>
                {hand}
              </span>
            );
          }),
        )}
      </div>

      <div className="pf-legend">
        <span><span className="pf-key push" /> Pousse (all-in)</span>
        <span><span className="pf-key gold" /> Paire à pousser</span>
        <span><span className="pf-key" /> À jeter</span>
      </div>
      <p className="pf-note">
        Ces ranges supposent que <strong>tout le monde s&apos;est couché jusqu&apos;à vous</strong> (vous
        êtes le premier à entrer dans le coup). Depuis {POSITIONS.find((p) => p.key === pos)?.label},
        vous poussez alors environ <strong>{pct}% de vos mains</strong>.
      </p>
    </div>
  );
}
