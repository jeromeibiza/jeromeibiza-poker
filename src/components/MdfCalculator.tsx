"use client";

import { useState } from "react";

/** Tailles de mise courantes, en fraction du pot. */
const SIZES = [
  { label: "1/3 pot", f: 1 / 3 },
  { label: "1/2 pot", f: 0.5 },
  { label: "2/3 pot", f: 2 / 3 },
  { label: "Pot", f: 1 },
  { label: "1,5× pot", f: 1.5 },
  { label: "2× pot", f: 2 },
];

/** Calculateur de MDF (fréquence de défense minimale) selon la taille de mise. */
export function MdfCalculator() {
  const [i, setI] = useState(3); // mise pot par défaut
  const s = SIZES[i];
  const mdf = Math.round((1 / (1 + s.f)) * 100);
  const fold = 100 - mdf;

  return (
    <div className="card">
      <div className="label" style={{ color: "var(--faint)", fontSize: 11, marginBottom: 10 }}>
        L&apos;adversaire mise…
      </div>
      <div className="pf-tabs" role="group" aria-label="Taille de mise">
        {SIZES.map((x, k) => (
          <button
            key={x.label}
            type="button"
            className={`pf-tab${k === i ? " is-on" : ""}`}
            onClick={() => setI(k)}
            aria-pressed={k === i}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
          marginTop: 16,
        }}
      >
        <div className="card">
          <div className="label" style={{ color: "var(--faint)", fontSize: 11 }}>Défense minimale (MDF)</div>
          <div className="display" style={{ fontSize: 36, color: "var(--gold)", marginTop: 4 }}>{mdf} %</div>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4, marginBottom: 0 }}>
            de votre range à garder pour continuer
          </p>
        </div>
        <div className="card">
          <div className="label" style={{ color: "var(--faint)", fontSize: 11 }}>Fold maximum</div>
          <div className="display" style={{ fontSize: 36, marginTop: 4 }}>{fold} %</div>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4, marginBottom: 0 }}>
            que vous pouvez vous permettre de coucher
          </p>
        </div>
      </div>

      <p className="pf-note">
        Face à une mise de <strong>{s.label}</strong>, ne vous couchez pas plus de <strong>{fold}%</strong>{" "}
        du temps. Au-delà, l&apos;adversaire peut vous bluffer avec n&apos;importe quelle carte et
        gagner de l&apos;argent à coup sûr. Plus la mise est grosse, moins vous êtes obligé de défendre.
      </p>
    </div>
  );
}
