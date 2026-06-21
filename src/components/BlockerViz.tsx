"use client";

import { useState } from "react";
import { PlayingCard } from "@/components/PlayingCard";

const CARDS = [
  {
    code: "As",
    title: "l'As de pique",
    blocks: [
      "Réduit les paires d'As : AA passe de 6 à seulement 3 combinaisons possibles.",
      "Bloque la moitié des A-K : tous ceux qui contiennent l'As de pique deviennent impossibles.",
      "Bloque la couleur maximale à pique : personne ne peut détenir le flush à l'As de pique.",
    ],
  },
  {
    code: "Ks",
    title: "le Roi de pique",
    blocks: [
      "Réduit les paires de Rois : KK passe de 6 à 3 combinaisons.",
      "Bloque les A-K et K-Q qui contiennent le Roi de pique.",
      "Bloque les grosses couleurs à pique (Roi haut).",
    ],
  },
  {
    code: "Qh",
    title: "la Dame de cœur",
    blocks: [
      "Réduit les paires de Dames : QQ passe de 6 à 3 combinaisons.",
      "Bloque les A-Q et K-Q qui contiennent la Dame de cœur.",
      "Bloque une partie des tirages et couleurs à cœur.",
    ],
  },
];

/** Visualiseur de blockers : choisissez une carte en main, voyez ce qu'elle rend impossible. */
export function BlockerViz() {
  const [i, setI] = useState(0);
  const c = CARDS[i];

  return (
    <div className="card">
      <div className="label" style={{ color: "var(--faint)", fontSize: 11 }}>
        Vous tenez (cliquez une carte) :
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
        {CARDS.map((x, k) => (
          <button
            key={x.code}
            type="button"
            onClick={() => setI(k)}
            aria-pressed={k === i}
            style={{
              border: k === i ? "2px solid var(--gold)" : "2px solid transparent",
              borderRadius: 12,
              padding: 4,
              background: "transparent",
              cursor: "pointer",
              lineHeight: 0,
            }}
          >
            <PlayingCard code={x.code} size={1} />
          </button>
        ))}
      </div>

      <p style={{ marginTop: 16 }}>
        Avec <strong style={{ color: "var(--gold-soft)" }}>{c.title}</strong>{" "}en main, vous
        « bloquez » certaines mains de l&apos;adversaire :
      </p>
      <ul className="lb check">
        {c.blocks.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <p className="pf-note">
        Un <strong>blocker</strong>, c&apos;est une carte que vous tenez et qui rend impossibles
        certaines mains fortes de l&apos;adversaire. Moins il peut avoir de monstres, plus votre
        bluff a de chances de passer : c&apos;est un argument concret pour bluffer (ou non).
      </p>
    </div>
  );
}
