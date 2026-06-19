"use client";

import { useState } from "react";

/** Equite exacte d'un tirage en fonction du nombre d'outs et des cartes a venir. */
function equityFromOuts(outs: number, cardsToCome: 1 | 2): number {
  const unseen = cardsToCome === 2 ? 47 : 46; // flop vu (5 cartes connues) vs turn vu (6)
  if (cardsToCome === 1) {
    return outs / unseen;
  }
  // 2 cartes a venir : 1 - P(rater les deux)
  const missFirst = (unseen - outs) / unseen;
  const missSecond = (unseen - 1 - outs) / (unseen - 1);
  return 1 - missFirst * missSecond;
}

function pct(x: number) {
  return `${(x * 100).toFixed(1)} %`;
}

export function OddsCalculator() {
  const [pot, setPot] = useState(100);
  const [toCall, setToCall] = useState(50);
  const [outs, setOuts] = useState(9);
  const [cardsToCome, setCardsToCome] = useState<1 | 2>(2);

  const safePot = Math.max(0, pot);
  const safeCall = Math.max(0, toCall);
  const safeOuts = Math.min(21, Math.max(0, outs));

  // Cote du pot : equite minimale requise pour que suivre soit rentable.
  const requiredEquity = safeCall > 0 ? safeCall / (safePot + safeCall) : 0;
  const equity = equityFromOuts(safeOuts, cardsToCome);
  const ruleApprox = (safeOuts * (cardsToCome === 2 ? 4 : 2)) / 100;

  const profitable = equity > requiredEquity;
  const oddsRatio =
    requiredEquity > 0 ? (1 - requiredEquity) / requiredEquity : 0; // pot:call sous forme X:1

  return (
    <div className="card">
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
        <Field label="Pot actuel" value={pot} onChange={setPot} suffix="jetons" />
        <Field label="Mise a suivre" value={toCall} onChange={setToCall} suffix="jetons" />
        <Field label="Vos outs" value={outs} onChange={setOuts} suffix="cartes" max={21} />
        <div>
          <label className="label" style={{ fontSize: 11, color: "var(--muted)", display: "block", marginBottom: 6 }}>
            Cartes a venir
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            {([2, 1] as const).map((n) => (
              <button
                key={n}
                onClick={() => setCardsToCome(n)}
                className="label"
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 10,
                  border: "1px solid var(--line)",
                  background: cardsToCome === n ? "linear-gradient(180deg,var(--gold-soft),var(--gold))" : "transparent",
                  color: cardsToCome === n ? "#2a1d05" : "var(--muted)",
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                {n === 2 ? "Flop (2)" : "Turn (1)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div
        style={{
          marginTop: 22,
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        }}
      >
        <Stat label="Cote du pot (equite requise)" value={pct(requiredEquity)} sub={`soit ${oddsRatio.toFixed(1)} : 1`} />
        <Stat label="Votre equite (exacte)" value={pct(equity)} sub={`approx. regle : ${pct(ruleApprox)}`} />
      </div>

      <div
        style={{
          marginTop: 16,
          borderRadius: 14,
          padding: "16px 18px",
          border: `1px solid ${profitable ? "rgba(31,122,82,0.6)" : "rgba(226,72,61,0.5)"}`,
          background: profitable ? "rgba(31,122,82,0.12)" : "rgba(226,72,61,0.1)",
        }}
      >
        <div className="display" style={{ fontSize: 18, color: profitable ? "#8fe3b6" : "#f3a0a0" }}>
          {profitable ? "✅ Suivre est rentable" : "❌ Suivre n'est pas rentable"}
        </div>
        <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>
          {profitable
            ? `Votre equite (${pct(equity)}) depasse l'equite requise par la cote du pot (${pct(requiredEquity)}). Sur le long terme, ce call est gagnant.`
            : `Votre equite (${pct(equity)}) est inferieure a l'equite requise (${pct(requiredEquity)}). Sauf cotes implicites (gains futurs probables), il vaut mieux se coucher.`}
        </p>
      </div>

      <p style={{ color: "var(--faint)", fontSize: 12, marginTop: 14 }}>
        Rappel : la &quot;regle des 2 et 4&quot; multiplie vos outs par 4 (au flop, 2 cartes a venir) ou par
        2 (au turn, 1 carte a venir) pour estimer votre equite de tete. Ce calculateur affiche aussi
        la valeur exacte.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  suffix,
  max,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
  max?: number;
}) {
  return (
    <div>
      <label className="label" style={{ fontSize: 11, color: "var(--muted)", display: "block", marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type="number"
          min={0}
          max={max}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(parseInt(e.target.value || "0", 10))}
          style={{
            width: "100%",
            padding: "11px 14px",
            borderRadius: 10,
            border: "1px solid var(--line)",
            background: "var(--surface-2)",
            color: "var(--fg)",
            fontSize: 16,
            outline: "none",
          }}
        />
        {suffix && (
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--faint)", fontSize: 12 }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card" style={{ background: "var(--surface-2)", padding: 16 }}>
      <div className="label" style={{ fontSize: 10, color: "var(--muted)" }}>{label}</div>
      <div className="display" style={{ fontSize: 26, color: "var(--gold)", marginTop: 6 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--faint)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}
