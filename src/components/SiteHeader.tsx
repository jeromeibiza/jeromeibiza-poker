"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV, PRIMARY_NAV, SITE } from "@/lib/site";
import { SearchLauncher } from "@/components/SearchLauncher";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        background: "rgba(7, 11, 20, 0.82)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="wrap"
        style={{ display: "flex", alignItems: "center", gap: 16, height: 64 }}
      >
        <Link
          href="/"
          aria-label={SITE.name}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "linear-gradient(180deg,var(--gold-soft),var(--gold))",
              color: "#1a1305",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            ♠
          </span>
          <span
            className="display"
            style={{ fontSize: 18, letterSpacing: 1 }}
          >
            Poker Hub
          </span>
        </Link>

        <SearchLauncher variant="button" />

        <nav
          aria-label="Navigation principale"
          style={{ display: "flex", gap: 4, marginLeft: 8 }}
          className="primary-nav"
        >
          {PRIMARY_NAV.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="label nav-link"
              style={{ fontSize: 13, padding: "8px 12px", borderRadius: 999, color: "var(--muted)" }}
            >
              {s.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
          <Link href="/academie-croupier" className="btn btn-gold cta-desktop" style={{ fontSize: 12, padding: "10px 16px" }}>
            🎓 Formation croupier
          </Link>
          <button
            aria-label="Menu"
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="menu-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 12,
              border: "1px solid var(--line)",
              background: "transparent",
              color: "var(--fg)",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            {open ? "✕" : "☰"}
          </button>

          {open && (
            <>
              {/* Cliquer en dehors ferme le menu */}
              <div
                aria-hidden
                onClick={() => setOpen(false)}
                style={{ position: "fixed", inset: 0, zIndex: 55 }}
              />
              <nav className="menu-dropdown" aria-label="Menu du site">
                {NAV.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setOpen(false)}>
                    <span aria-hidden style={{ fontSize: 18, width: 22, textAlign: "center" }}>{s.emoji}</span>
                    <span className="label" style={{ fontSize: 13 }}>{s.label}</span>
                  </Link>
                ))}
                <Link href="/a-propos" onClick={() => setOpen(false)}>
                  <span aria-hidden style={{ fontSize: 18, width: 22, textAlign: "center" }}>👤</span>
                  <span className="label" style={{ fontSize: 13 }}>À propos</span>
                </Link>
              </nav>
            </>
          )}
        </div>
      </div>

      <style>{`
        .nav-link:hover { color: var(--fg); background: rgba(255,255,255,0.04); }
        .menu-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: min(280px, calc(100vw - 24px));
          background: linear-gradient(180deg, var(--surface), var(--surface-2));
          border: 1px solid var(--line);
          border-radius: 16px;
          box-shadow: 0 22px 55px -18px rgba(0,0,0,0.85);
          padding: 8px;
          z-index: 60;
          max-height: calc(100vh - 88px);
          overflow-y: auto;
          display: grid;
          gap: 2px;
          animation: menuIn 0.14s ease;
        }
        @keyframes menuIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .menu-dropdown a {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border-radius: 10px;
          color: var(--fg);
        }
        .menu-dropdown a .label { color: var(--fg); transition: color 0.12s ease; }
        .menu-dropdown a:hover { background: rgba(255,255,255,0.06); }
        .menu-dropdown a:hover .label { color: var(--gold-soft); }
        @media (max-width: 900px) {
          .primary-nav { display: none !important; }
          .cta-desktop { display: none !important; }
        }
      `}</style>
    </header>
  );
}
