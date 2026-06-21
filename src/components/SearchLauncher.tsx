"use client";

import { useEffect, useState } from "react";
import { SearchPalette } from "@/components/SearchPalette";

/**
 * Déclencheur de recherche : un bouton "Rechercher" (header) ou une fausse barre
 * (home) qui ouvre la palette de commande. Chaque instance gère son propre état.
 */
export function SearchLauncher({ variant = "button" }: { variant?: "button" | "bar" }) {
  const [open, setOpen] = useState(false);

  // Raccourci clavier global Ctrl/Cmd + K (porté par l'instance du header).
  useEffect(() => {
    if (variant !== "button") return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant]);

  return (
    <>
      {variant === "bar" ? (
        <button type="button" className="search-bar-trigger" onClick={() => setOpen(true)}>
          <span className="search-ico" aria-hidden>🔎</span>
          <span className="search-bar-trigger-text">
            Rechercher une leçon, un format, le glossaire...
          </span>
          <span className="search-bar-trigger-kbd" aria-hidden>Ctrl K</span>
        </button>
      ) : (
        <button
          type="button"
          className="search-btn"
          onClick={() => setOpen(true)}
          aria-label="Rechercher"
        >
          <span aria-hidden style={{ fontSize: 15 }}>🔎</span>
          <span className="search-btn-text">Rechercher</span>
        </button>
      )}
      {open && <SearchPalette onClose={() => setOpen(false)} />}
    </>
  );
}
