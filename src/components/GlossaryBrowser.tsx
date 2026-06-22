"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { Term } from "@/lib/poker/glossary";

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function GlossaryBrowser({ terms }: { terms: Term[] }) {
  const [q, setQ] = useState("");
  const [letter, setLetter] = useState<string | null>(null);

  // Pré-remplit la recherche depuis l'URL (?q=terme) : sert au maillage interne,
  // les liens « glossaire » des cours pointent vers /glossaire?q=<terme>. Lu en
  // effet (pas à l'init) pour éviter tout décalage d'hydratation.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("q");
    if (p) setQ(p);
  }, []);

  const sorted = useMemo(
    () => [...terms].sort((a, b) => a.term.localeCompare(b.term, "fr")),
    [terms],
  );

  const letters = useMemo(() => {
    const set = new Set(sorted.map((t) => t.term[0].toUpperCase()));
    return Array.from(set).sort();
  }, [sorted]);

  const filtered = useMemo(() => {
    const nq = normalize(q.trim());
    return sorted.filter((t) => {
      const matchLetter = !letter || t.term[0].toUpperCase() === letter;
      const matchQ =
        !nq || normalize(t.term).includes(nq) || normalize(t.def).includes(nq);
      return matchLetter && matchQ;
    });
  }, [sorted, q, letter]);

  return (
    <div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un terme (ex. bluff, ICM, range…)"
          aria-label="Rechercher un terme"
          style={{
            flex: "1 1 280px",
            padding: "12px 16px",
            borderRadius: 999,
            border: "1px solid var(--line)",
            background: "var(--surface-2)",
            color: "var(--fg)",
            fontSize: 15,
            outline: "none",
          }}
        />
        <span className="pill">{filtered.length} terme{filtered.length > 1 ? "s" : ""}</span>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
        <button
          onClick={() => setLetter(null)}
          className="label"
          style={letterBtn(letter === null)}
        >
          Tous
        </button>
        {letters.map((l) => (
          <button key={l} onClick={() => setLetter(l)} className="label" style={letterBtn(letter === l)}>
            {l}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "var(--muted)", marginTop: 24 }}>
          Aucun terme ne correspond. Essaie un autre mot-clé.
        </p>
      ) : (
        <dl style={{ display: "grid", gap: 12, marginTop: 22 }}>
          {filtered.map((t) => (
            <div key={t.term} className="card">
              <dt className="display" style={{ fontSize: 17, color: "var(--fg)" }}>
                {t.term}
              </dt>
              <dd style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 15 }}>
                {t.def}
                {t.example && (
                  <span style={{ display: "block", marginTop: 8, color: "var(--faint)", fontSize: 14, fontStyle: "italic" }}>
                    Exemple : {t.example}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function letterBtn(active: boolean): CSSProperties {
  return {
    minWidth: 34,
    height: 34,
    padding: "0 10px",
    borderRadius: 10,
    border: "1px solid var(--line)",
    background: active ? "linear-gradient(180deg,var(--gold-soft),var(--gold))" : "transparent",
    color: active ? "#2a1d05" : "var(--muted)",
    cursor: "pointer",
    fontSize: 13,
  };
}
