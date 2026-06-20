"use client";

import { useEffect, useState } from "react";

/** Les paliers de multiplicateur typiques d'un Spin & Go, du plus courant au jackpot. */
const MULTS = ["×2", "×3", "×5", "×10", "×25", "×120", "×240", "×1200", "×12000", "×1000000"];

/**
 * Petit jackpot animé : les multiplicateurs défilent en boucle, comme la roue
 * tirée au sort avant chaque Spin & Go. S'arrête proprement au démontage.
 */
export function SpinMultiplier() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % MULTS.length), 520);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="spin-mult" aria-label="Multiplicateur de gains tiré au sort">
      <span className="spin-mult-label">Jackpot</span>
      <span key={i} className="spin-mult-val">{MULTS[i]}</span>
      <span className="spin-mult-sub">la mise</span>
    </div>
  );
}
