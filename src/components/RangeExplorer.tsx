"use client";

import { useState } from "react";

const RANKS = "AKQJT98765432".split("");
const idx = (r: string) => RANKS.indexOf(r);

type Spec = {
  pairs?: string;
  suited?: Record<string, string>;
  offsuit?: Record<string, string>;
  extra?: string[];
};
type Scenario = { key: string; label: string; desc: string; value: Spec; bluff?: Spec };

function buildRange(spec: Spec): Set<string> {
  const set = new Set<string>();
  if (spec.pairs) for (let i = 0; i <= idx(spec.pairs); i++) set.add(RANKS[i] + RANKS[i]);
  for (const [hi, lo] of Object.entries(spec.suited ?? {})) {
    for (let j = idx(hi) + 1; j <= idx(lo); j++) set.add(hi + RANKS[j] + "s");
  }
  for (const [hi, lo] of Object.entries(spec.offsuit ?? {})) {
    for (let j = idx(hi) + 1; j <= idx(lo); j++) set.add(hi + RANKS[j] + "o");
  }
  for (const h of spec.extra ?? []) set.add(h);
  return set;
}

function handAt(i: number, j: number): { hand: string; type: "pair" | "suited" | "offsuit" } {
  if (i === j) return { hand: RANKS[i] + RANKS[i], type: "pair" };
  if (i < j) return { hand: RANKS[i] + RANKS[j] + "s", type: "suited" };
  return { hand: RANKS[j] + RANKS[i] + "o", type: "offsuit" };
}

function combosOf(set: Set<string>): number {
  let c = 0;
  for (let i = 0; i < 13; i++)
    for (let j = 0; j < 13; j++) {
      const { hand } = handAt(i, j);
      if (set.has(hand)) c += i === j ? 6 : i < j ? 4 : 12;
    }
  return c;
}

/* ---- Ouverture (RFI) en 6-max : on ouvre de plus en plus large près du bouton ---- */
const OPENING: Scenario[] = [
  {
    key: "UTG",
    label: "UTG",
    desc: "Sous le pistolet, premier de parole : on ouvre serré. Surtout des paires, des As forts et les Broadway assortis. Beaucoup de joueurs parlent après vous.",
    value: { pairs: "2", suited: { A: "T", K: "T", Q: "T", J: "T" }, offsuit: { A: "J", K: "Q" } },
  },
  {
    key: "MP",
    label: "Milieu",
    desc: "Position du milieu : on élargit un peu, plus de suited et de Broadway offsuit.",
    value: { pairs: "2", suited: { A: "9", K: "9", Q: "9", J: "9", T: "9" }, offsuit: { A: "T", K: "J", Q: "J" } },
  },
  {
    key: "CO",
    label: "Cutoff",
    desc: "Cutoff : on commence à voler les blindes. On ajoute des As faibles assortis, des connecteurs et des Broadway offsuit.",
    value: {
      pairs: "2",
      suited: { A: "2", K: "6", Q: "7", J: "8", T: "8", "9": "8" },
      offsuit: { A: "9", K: "T", Q: "T", J: "T" },
    },
  },
  {
    key: "BTN",
    label: "Bouton",
    desc: "Au bouton, on ouvre TRÈS large (presque la moitié des mains) : on jouera en position tout le coup, c'est le gros avantage.",
    value: {
      pairs: "2",
      suited: { A: "2", K: "2", Q: "4", J: "6", T: "6", "9": "6", "8": "7", "7": "7", "6": "6", "5": "5" },
      offsuit: { A: "5", K: "8", Q: "9", J: "9", T: "9" },
    },
  },
  {
    key: "SB",
    label: "Small blind",
    desc: "Small blind, tout le monde s'est couché : on ouvre large pour attaquer la big blind, mais on jouera hors de position.",
    value: {
      pairs: "2",
      suited: { A: "2", K: "3", Q: "5", J: "7", T: "7", "9": "7", "8": "7" },
      offsuit: { A: "7", K: "9", Q: "T", J: "T" },
    },
  },
];

/* ---- GTO : ranges "équilibrées" inexploitables ---- */
const GTO: Scenario[] = [
  {
    key: "RFI",
    label: "Ouverture bouton",
    desc: "Une ouverture GTO au bouton : large et équilibrée. Le solveur ouvre toutes ces mains à fréquence quasi pleine pour rester impossible à exploiter.",
    value: {
      pairs: "2",
      suited: { A: "2", K: "2", Q: "4", J: "6", T: "6", "9": "6", "8": "7", "7": "7", "6": "6", "5": "5" },
      offsuit: { A: "5", K: "8", Q: "9", J: "9", T: "9" },
    },
  },
  {
    key: "3BET",
    label: "3-bet GTO",
    desc: "Une range de 3-bet équilibrée : la value (en or) QQ+ et AK, plus des bluffs (en bleu) à blockers comme A5s-A2s. Mélanger value et bluff rend votre 3-bet impayable à lire.",
    value: { pairs: "Q", extra: ["AKs", "AKo"] },
    bluff: { extra: ["A5s", "A4s", "A3s", "A2s", "KJs", "QTs", "JTs"] },
  },
];

/* ---- Équilibrage : montrer value + bluff vs range prévisible ---- */
const BALANCE: Scenario[] = [
  {
    key: "ok",
    label: "Range équilibrée",
    desc: "Quand vous misez gros, votre range mélange de la value (en or) et des bluffs (en bleu). L'adversaire ne peut pas se contenter de payer ou de se coucher : il est dans le doute. C'est ça, équilibrer.",
    value: { pairs: "T", extra: ["AKs", "AQs", "AKo"] },
    bluff: { extra: ["A5s", "A4s", "76s", "65s", "T9s", "98s"] },
  },
  {
    key: "ko",
    label: "Range prévisible",
    desc: "La même mise, mais SANS bluffs : que des monstres. Problème : un bon adversaire le voit et se couche à chaque fois. Vous ne gagnez jamais de gros pot. Une range trop chargée en value est exploitable.",
    value: { pairs: "T", extra: ["AKs", "AQs", "AKo"] },
  },
];

const PRESETS: Record<string, { scenarios: Scenario[]; valueLabel: string; bluffLabel?: string }> = {
  opening: { scenarios: OPENING, valueLabel: "On ouvre (relance)" },
  gto: { scenarios: GTO, valueLabel: "Value", bluffLabel: "Bluff" },
  balance: { scenarios: BALANCE, valueLabel: "Value", bluffLabel: "Bluff" },
};

export function RangeExplorer({ preset = "opening" }: { preset?: "opening" | "gto" | "balance" }) {
  const { scenarios, valueLabel, bluffLabel } = PRESETS[preset];
  const [k, setK] = useState(scenarios[0].key);
  const sc = scenarios.find((s) => s.key === k) ?? scenarios[0];

  const valueSet = buildRange(sc.value);
  const bluffSet = sc.bluff ? buildRange(sc.bluff) : new Set<string>();
  const pct = Math.round(((combosOf(valueSet) + combosOf(bluffSet)) / 1326) * 100);

  return (
    <div className="pf">
      <div className="pf-tabs" role="group" aria-label="Scénario">
        {scenarios.map((s) => (
          <button
            key={s.key}
            type="button"
            className={`pf-tab${k === s.key ? " is-on" : ""}`}
            onClick={() => setK(s.key)}
            aria-pressed={k === s.key}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="pf-grid" aria-hidden>
        {Array.from({ length: 13 }).map((_, i) =>
          Array.from({ length: 13 }).map((_, j) => {
            const { hand, type } = handAt(i, j);
            const cls = valueSet.has(hand) ? " is-value" : bluffSet.has(hand) ? " is-bluff" : "";
            return (
              <span key={`${i}-${j}`} className={`pf-cell pf-${type}${cls}`}>
                {hand}
              </span>
            );
          }),
        )}
      </div>

      <div className="pf-legend">
        <span><span className="pf-key gold" /> {valueLabel}</span>
        {bluffLabel && <span><span className="pf-key push" /> {bluffLabel}</span>}
        <span><span className="pf-key" /> Hors range (on jette)</span>
      </div>
      <p className="pf-note">
        <strong>{sc.label}</strong> : {sc.desc} Cette range représente environ{" "}
        <strong>{pct}% des mains</strong>.
      </p>
    </div>
  );
}
