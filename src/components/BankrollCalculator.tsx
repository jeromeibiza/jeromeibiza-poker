"use client";

import { useState } from "react";

const FORMATS = [
  {
    key: "cash",
    label: "Cash game",
    unit: "caves",
    min: 30,
    ok: 50,
    note: "En cash game, vise au moins 30 caves de ta limite, idéalement 50 pour encaisser la variance sans stress.",
  },
  {
    key: "mtt",
    label: "Tournois (MTT)",
    unit: "buy-ins",
    min: 100,
    ok: 200,
    note: "Les tournois ont une énorme variance (on touche le gros lot rarement) : 100 buy-ins est un minimum, 200+ pour jouer l'esprit tranquille.",
  },
  {
    key: "spin",
    label: "Spin & Go",
    unit: "buy-ins",
    min: 80,
    ok: 150,
    note: "Les Spins sont très variants (le jackpot tombe rarement) : vise 100 buy-ins ou plus pour tenir la distance.",
  },
];

function Field({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
}) {
  return (
    <label style={{ display: "block" }}>
      <span className="label" style={{ color: "var(--faint)", fontSize: 11, display: "block", marginBottom: 6 }}>
        {label}
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          style={{
            width: "100%",
            background: "var(--surface-2)",
            border: "1px solid var(--line)",
            borderRadius: 10,
            padding: "11px 13px",
            color: "var(--fg)",
            fontSize: 16,
            outline: 0,
          }}
        />
        {suffix && <span style={{ color: "var(--muted)" }}>{suffix}</span>}
      </span>
    </label>
  );
}

/** Calculateur de bankroll : combien de caves/buy-ins, et est-ce prudent ? */
export function BankrollCalculator() {
  const [fk, setFk] = useState("cash");
  const f = FORMATS.find((x) => x.key === fk) ?? FORMATS[0];
  const [bankroll, setBankroll] = useState(1000);
  const [buyin, setBuyin] = useState(20);

  const units = buyin > 0 ? Math.floor(bankroll / buyin) : 0;
  const verdict =
    units >= f.ok
      ? { label: "Confortable", color: "var(--gold)" }
      : units >= f.min
        ? { label: "Correct", color: "#3f7ff0" }
        : { label: "Prudence : grosse variance", color: "var(--red)" };

  return (
    <div className="card">
      <div className="label" style={{ color: "var(--faint)", fontSize: 11, marginBottom: 10 }}>
        Format joué
      </div>
      <div className="pf-tabs" role="group" aria-label="Format">
        {FORMATS.map((x) => (
          <button
            key={x.key}
            type="button"
            className={`pf-tab${fk === x.key ? " is-on" : ""}`}
            onClick={() => setFk(x.key)}
            aria-pressed={fk === x.key}
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
        <Field label="Ta bankroll" value={bankroll} onChange={setBankroll} suffix="€" />
        <Field label={`Prix d'une ${f.unit === "caves" ? "cave" : "entrée"}`} value={buyin} onChange={setBuyin} suffix="€" />
      </div>

      <div className="card" style={{ marginTop: 16, borderColor: verdict.color }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <span className="display" style={{ fontSize: 38, color: verdict.color }}>{units}</span>
          <span className="display" style={{ fontSize: 18 }}>{f.unit}</span>
          <span className="pill" style={{ color: verdict.color, borderColor: verdict.color }}>{verdict.label}</span>
        </div>
        <p style={{ color: "var(--muted)", marginTop: 10, marginBottom: 0 }}>{f.note}</p>
      </div>

      <p className="pf-note">
        Ce sont des repères pour qui veut jouer du volume, pas des règles gravées dans le marbre. Pour
        une soirée unique entre amis, ta « bankroll », c&apos;est simplement le budget que tu acceptes
        de mettre : une fois posé sur la table, considère-le comme dépensé et joue détendu.
      </p>
    </div>
  );
}
