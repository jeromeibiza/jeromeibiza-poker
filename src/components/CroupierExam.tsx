"use client";

import { useEffect, useMemo, useState } from "react";
import { EXAM } from "@/lib/poker/examQuestions";

const PASS = 80; // sur 100
const KEY = "ph_croupier_exam";

export function CroupierExam() {
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(EXAM.length).fill(null));
  const [i, setI] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Date figée à l'ouverture (pour le certificat).
  const [today] = useState(() =>
    new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
  );

  useEffect(() => {
    if (submitted) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [submitted]);

  const answered = answers.filter((a) => a != null).length;
  const score = useMemo(
    () => answers.reduce<number>((s, a, k) => s + (a === EXAM[k].answer ? 1 : 0), 0),
    [answers],
  );
  const passed = score >= PASS;

  function pick(choice: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = choice;
      return next;
    });
  }

  function submit() {
    if (answered < EXAM.length) {
      const ok = window.confirm(
        `Il te reste ${EXAM.length - answered} question(s) sans réponse. Terminer l'examen quand même ?`,
      );
      if (!ok) return;
    }
    const sc = answers.reduce<number>((s, a, k) => s + (a === EXAM[k].answer ? 1 : 0), 0);
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ score: sc, passed: sc >= PASS, date: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
    setSubmitted(true);
  }

  function reset() {
    setAnswers(Array(EXAM.length).fill(null));
    setI(0);
    setSubmitted(false);
    setShowReview(false);
  }

  // ---------- Écran de résultat ----------
  if (submitted) {
    const wrong = answers
      .map((a, k) => ({ k, a }))
      .filter((x) => x.a !== EXAM[x.k].answer);

    return (
      <div>
        <div className="card" style={{ textAlign: "center", borderColor: passed ? "var(--gold)" : "var(--red)" }}>
          <div className="label" style={{ color: "var(--faint)", fontSize: 12 }}>Ton résultat</div>
          <div className="display" style={{ fontSize: 56, color: passed ? "var(--gold)" : "var(--red)", marginTop: 6 }}>
            {score}<span style={{ fontSize: 26, color: "var(--muted)" }}> / 100</span>
          </div>
          <div className="display" style={{ fontSize: 20, marginTop: 6 }}>
            {passed ? "Examen réussi !" : "Pas encore validé"}
          </div>
          <p style={{ color: "var(--muted)", marginTop: 10, marginBottom: 0 }}>
            {passed
              ? "Bravo, tu as les bases du métier de croupier. Ton certificat est ci-dessous."
              : `Il te faut ${PASS}/100 pour valider. Revois les modules concernés (voir la correction) et retente, tu y es presque.`}
          </p>
        </div>

        {passed && (
          <div className="exam-cert">
            <div className="exam-cert-inner">
              <div className="label" style={{ color: "var(--gold-soft)", letterSpacing: 2, fontSize: 12 }}>Certificat</div>
              <div className="display" style={{ fontSize: 26, marginTop: 8 }}>Croupier Poker</div>
              <div className="display" style={{ fontSize: 15, color: "var(--gold)", marginTop: 4 }}>Académie Jérôme Ibiza</div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 14, marginBottom: 0 }}>
                Délivré le {today} après réussite de l'examen final (score {score}/100).
              </p>
              <div className="exam-cert-xp">🏅 200 XP crédités sur ton compte jeromeibiza.com</div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
          <button type="button" className="btn btn-ghost" onClick={() => setShowReview((v) => !v)}>
            {showReview ? "Masquer la correction" : `Voir la correction (${wrong.length} erreur${wrong.length > 1 ? "s" : ""})`}
          </button>
          <button type="button" className="btn btn-gold" onClick={reset}>Recommencer l'examen</button>
        </div>

        {showReview && (
          <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
            {wrong.length === 0 ? (
              <div className="card">Sans-faute, rien à corriger. Chapeau.</div>
            ) : (
              wrong.map(({ k, a }) => {
                const q = EXAM[k];
                return (
                  <div key={k} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <strong>Q{k + 1}. {q.q}</strong>
                      <span className="pill" style={{ whiteSpace: "nowrap" }}>Module {q.m}</span>
                    </div>
                    <p style={{ color: "var(--red)", fontSize: 14, margin: "8px 0 2px" }}>
                      Ta réponse : {a == null ? "(aucune)" : q.choices[a]}
                    </p>
                    <p style={{ color: "var(--gold-soft)", fontSize: 14, margin: 0 }}>
                      Bonne réponse : {q.choices[q.answer]}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  }

  // ---------- Examen en cours ----------
  const q = EXAM[i];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
        <div className="label" style={{ color: "var(--gold)", fontSize: 13 }}>Question {i + 1} / {EXAM.length}</div>
        <div className="label" style={{ color: "var(--faint)", fontSize: 12 }}>{answered} / {EXAM.length} répondues</div>
      </div>
      <div className="exam-bar"><span style={{ width: `${(answered / EXAM.length) * 100}%` }} /></div>

      <div className="card" style={{ marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
          <h3 style={{ fontSize: 19, margin: 0 }}>{q.q}</h3>
          <span className="pill" style={{ whiteSpace: "nowrap" }}>Module {q.m}</span>
        </div>
        <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
          {q.choices.map((c, ci) => (
            <button
              key={ci}
              type="button"
              className={`exam-choice${answers[i] === ci ? " is-on" : ""}`}
              onClick={() => pick(ci)}
            >
              <span className="exam-choice-mark">{String.fromCharCode(65 + ci)}</span>
              <span>{c}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "space-between", flexWrap: "wrap" }}>
        <button type="button" className="btn btn-ghost" onClick={() => setI((x) => Math.max(0, x - 1))} disabled={i === 0}>
          ◀ Précédent
        </button>
        {i < EXAM.length - 1 ? (
          <button type="button" className="btn btn-gold" onClick={() => setI((x) => Math.min(EXAM.length - 1, x + 1))}>
            Suivant ▶
          </button>
        ) : (
          <button type="button" className="btn btn-gold" onClick={submit}>Terminer l'examen ✓</button>
        )}
      </div>

      <div className="exam-grid" aria-hidden>
        {EXAM.map((_, k) => (
          <button
            key={k}
            type="button"
            className={`exam-cell${k === i ? " is-cur" : ""}${answers[k] != null ? " is-done" : ""}`}
            onClick={() => setI(k)}
          >
            {k + 1}
          </button>
        ))}
      </div>

      <button type="button" className="btn btn-gold" style={{ marginTop: 16, width: "100%" }} onClick={submit}>
        Terminer l'examen et voir mon score
      </button>
    </div>
  );
}
