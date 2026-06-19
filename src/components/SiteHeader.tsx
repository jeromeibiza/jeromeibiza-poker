"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV, PRIMARY_NAV, SITE } from "@/lib/site";

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

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/academie-croupier" className="btn btn-gold cta-desktop" style={{ fontSize: 12, padding: "10px 16px" }}>
            🎓 Formation croupier
          </Link>
          <button
            aria-label="Ouvrir le menu"
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
        </div>
      </div>

      {open && (
        <div className="wrap" style={{ paddingBottom: 18 }}>
          <div className="grid-cards" style={{ marginTop: 4 }}>
            {NAV.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="card card-hover"
                style={{ padding: 16 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{s.emoji}</span>
                  <span className="display" style={{ fontSize: 16 }}>{s.label}</span>
                </div>
                <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 14 }}>{s.desc}</p>
              </Link>
            ))}
            <Link
              href="/a-propos"
              onClick={() => setOpen(false)}
              className="card card-hover"
              style={{ padding: 16 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>👤</span>
                <span className="display" style={{ fontSize: 16 }}>À propos</span>
              </div>
              <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 14 }}>
                Qui est Jérôme Ibiza, le croupier derrière le hub.
              </p>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .nav-link:hover { color: var(--fg); background: rgba(255,255,255,0.04); }
        @media (max-width: 900px) {
          .primary-nav { display: none !important; }
          .cta-desktop { display: none !important; }
        }
      `}</style>
    </header>
  );
}
