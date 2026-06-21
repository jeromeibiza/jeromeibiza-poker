"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SEARCH_INDEX, PRESET_QUERIES, type SearchItem } from "@/lib/poker/searchIndex";

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const CAT_ICON: Record<string, string> = {
  Apprendre: "📘",
  Stratégie: "♠",
  Format: "🎲",
  "Poker en ligne": "💻",
  "Académie croupier": "🎓",
  Croupier: "🎓",
  Outils: "🧮",
  Page: "📄",
};

/** Palette de recherche (style command palette), panneau plein, navigation clavier. */
export function SearchPalette({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const nq = norm(q.trim());

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fermeture au clavier même si l'input n'a plus le focus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo<SearchItem[]>(
    () =>
      nq.length >= 1
        ? SEARCH_INDEX.filter((it) => norm(`${it.title} ${it.cat}`).includes(nq)).slice(0, 12)
        : [],
    [nq],
  );

  const groups = useMemo(() => {
    const m = new Map<string, SearchItem[]>();
    for (const r of results) {
      if (!m.has(r.cat)) m.set(r.cat, []);
      m.get(r.cat)!.push(r);
    }
    return [...m.entries()];
  }, [results]);

  useEffect(() => {
    setSel(0);
  }, [nq]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[sel]) go(results[sel].href);
    }
  };

  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div
        className="cmdk"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Recherche"
      >
        <div className="cmdk-top">
          <span className="cmdk-ico" aria-hidden>🔎</span>
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Rechercher une leçon, un format, le glossaire..."
            aria-label="Rechercher sur le site"
          />
          <button type="button" className="cmdk-esc" onClick={onClose}>
            Échap
          </button>
        </div>

        <div className="cmdk-body">
          {nq.length === 0 ? (
            <div className="cmdk-presets">
              <div className="cmdk-section">Recherches populaires</div>
              <div className="cmdk-chips">
                {PRESET_QUERIES.map((p) => (
                  <button key={p} type="button" className="cmdk-chip" onClick={() => setQ(p)}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="cmdk-empty">Aucun résultat pour « {q} ».</div>
          ) : (
            groups.map(([cat, items]) => (
              <div key={cat} className="cmdk-group">
                <div className="cmdk-section">{cat}</div>
                {items.map((it) => {
                  const idx = results.indexOf(it);
                  return (
                    <button
                      key={it.href}
                      type="button"
                      className={`cmdk-row${idx === sel ? " is-sel" : ""}`}
                      onMouseEnter={() => setSel(idx)}
                      onClick={() => go(it.href)}
                    >
                      <span className="cmdk-row-ico" aria-hidden>{CAT_ICON[it.cat] ?? "🃏"}</span>
                      <span className="cmdk-row-txt">
                        <span className="cmdk-row-title">{it.title}</span>
                        <span className="cmdk-row-cat">{it.cat}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="cmdk-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> pour naviguer</span>
          <span><kbd>Entrée</kbd> pour ouvrir</span>
          <span><kbd>Échap</kbd> pour fermer</span>
        </div>
      </div>
    </div>
  );
}
