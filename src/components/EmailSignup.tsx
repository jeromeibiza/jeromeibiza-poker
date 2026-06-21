"use client";

import { useState } from "react";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Formulaire de capture email (newsletter / liste). Poste vers /api/subscribe. */
export function EmailSignup({
  title = "Reçois la suite par email",
  subtitle,
  cta = "Je m'inscris",
  source,
}: {
  title?: string;
  subtitle?: string;
  cta?: string;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!EMAIL_RE.test(v)) {
      setState("err");
      setMsg("Adresse email invalide.");
      return;
    }
    setState("loading");
    setMsg("");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v, source }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) {
        setState("ok");
      } else {
        setState("err");
        setMsg(d?.error || "Une erreur est survenue. Réessaie plus tard.");
      }
    } catch {
      setState("err");
      setMsg("Connexion impossible. Réessaie plus tard.");
    }
  }

  if (state === "ok") {
    return (
      <div className="card signup" role="status">
        <div className="display" style={{ fontSize: 20 }}>Merci, c&apos;est noté ✅</div>
        <p style={{ color: "var(--muted)", marginTop: 8, marginBottom: 0 }}>
          Tu recevras la suite directement par email. À très vite.
        </p>
      </div>
    );
  }

  return (
    <div className="card signup">
      <div className="display" style={{ fontSize: 20 }}>{title}</div>
      {subtitle && <p style={{ color: "var(--muted)", marginTop: 8, marginBottom: 0 }}>{subtitle}</p>}
      <form onSubmit={submit} className="signup-form">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          aria-label="Adresse email"
          autoComplete="email"
        />
        <button type="submit" className="btn btn-gold" disabled={state === "loading"}>
          {state === "loading" ? "…" : cta}
        </button>
      </form>
      {state === "err" && (
        <p className="signup-err" role="alert">{msg}</p>
      )}
      <p className="signup-rgpd">
        Pas de spam, désinscription en un clic. Tes données ne sont jamais revendues.
      </p>
    </div>
  );
}
