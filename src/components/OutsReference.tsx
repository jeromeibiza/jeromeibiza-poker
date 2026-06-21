import type { ReactNode } from "react";

/** Tirages classiques, leurs outs et les chances de toucher (règle des 2 et 4). */
const DRAWS = [
  { name: "Tirage couleur", ex: "A♥ K♥ sur Q♥ 7♥ 2♠", outs: 9, flop: "35 %", turn: "20 %" },
  { name: "Quinte bilatérale", ex: "9♠ 8♦ sur 7♣ 6♥ 2♠", outs: 8, flop: "32 %", turn: "17 %" },
  { name: "Quinte par le ventre", ex: "J♦ T♦ sur A♣ K♠ 8♥", outs: 4, flop: "17 %", turn: "9 %" },
  { name: "Couleur + quinte", ex: "J♠ T♠ sur 9♠ 8♥ 2♠", outs: 15, flop: "54 %", turn: "33 %" },
  { name: "Deux overcards", ex: "A♦ K♣ sur 9♠ 7♥ 2♦", outs: 6, flop: "24 %", turn: "13 %" },
  { name: "Overcards + ventre", ex: "A♠ Q♠ sur J♥ T♦ 4♣", outs: 10, flop: "38 %", turn: "22 %" },
  { name: "Couleur + overcard", ex: "A♥ 5♥ sur K♥ 8♥ 2♠", outs: 12, flop: "45 %", turn: "26 %" },
  { name: "Paire → brelan", ex: "7♥ 7♦ sur K♠ 9♣ 2♥", outs: 2, flop: "8 %", turn: "4 %" },
];

/** Colore les symboles d'enseigne (cœur / carreau en rouge). */
function Cards({ text }: { text: string }): ReactNode {
  return (
    <>
      {[...text].map((ch, i) => {
        if (ch === "♥" || ch === "♦") return <span key={i} style={{ color: "#cc2f44" }}>{ch}</span>;
        if (ch === "♠" || ch === "♣") return <span key={i} style={{ color: "var(--fg)" }}>{ch}</span>;
        return ch;
      })}
    </>
  );
}

export function OutsReference() {
  return (
    <div>
      <div className="grid-cards">
        {DRAWS.map((d) => (
          <div key={d.name} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
              <div className="display" style={{ fontSize: 16 }}>{d.name}</div>
              <span className="pill pill-inter">{d.outs} outs</span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10, marginBottom: 0 }}>
              <Cards text={d.ex} />
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                <strong style={{ color: "var(--gold-soft)" }}>{d.flop}</strong> au flop
              </span>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                <strong style={{ color: "var(--gold-soft)" }}>{d.turn}</strong> au turn
              </span>
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: "var(--faint)", fontSize: 13, marginTop: 14 }}>
        Chances calculées avec la « règle des 2 et 4 » : multiplie tes outs par 4 au flop (2 cartes à
        venir), par 2 au turn (1 carte). C&apos;est une estimation de tête, suffisante pour décider vite.
      </p>
    </div>
  );
}
