"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SEARCH_INDEX, PRESET_QUERIES } from "@/lib/poker/searchIndex";

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function SiteSearch({
  autoFocus = false,
  onSelect,
}: {
  autoFocus?: boolean;
  onSelect?: () => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const nq = norm(q.trim());

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const results =
    nq.length >= 1
      ? SEARCH_INDEX.filter((it) => norm(`${it.title} ${it.cat}`).includes(nq)).slice(0, 8)
      : [];

  return (
    <div className="search">
      <div className="search-box">
        <span className="search-ico" aria-hidden>🔎</span>
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une leçon, un format, le glossaire..."
          aria-label="Rechercher sur le site"
        />
        {q && (
          <button type="button" className="search-clear" aria-label="Effacer" onClick={() => setQ("")}>
            ✕
          </button>
        )}
      </div>

      {nq.length >= 1 ? (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((r) => (
              <Link key={r.href} href={r.href} className="search-result" onClick={onSelect}>
                <span>{r.title}</span>
                <span className="search-cat">{r.cat}</span>
              </Link>
            ))
          ) : (
            <div className="search-empty">
              Aucun résultat pour « {q} ». Essaie le{" "}
              <Link href="/glossaire" className="link" onClick={onSelect}>glossaire</Link>.
            </div>
          )}
        </div>
      ) : (
        <div className="search-presets">
          <span className="search-presets-label">Recherches populaires :</span>
          {PRESET_QUERIES.map((p) => (
            <button key={p} type="button" className="search-preset" onClick={() => setQ(p)}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
