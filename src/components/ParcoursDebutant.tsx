"use client";

import { useEffect, useState } from "react";
import { STEPS, FINAL_QUIZ, FINAL_PASS, type QuizQuestion } from "@/lib/poker/parcours";

const STORE_KEY = "ph_parcours_debutant_v1";

type Saved = { validated: string[]; examPassed: boolean; examScore: number | null; name: string };

function load(): Saved {
  if (typeof window === "undefined") return { validated: [], examPassed: false, examScore: null, name: "" };
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return { validated: [], examPassed: false, examScore: null, name: "" };
    const p = JSON.parse(raw);
    return {
      validated: Array.isArray(p.validated) ? p.validated : [],
      examPassed: !!p.examPassed,
      examScore: typeof p.examScore === "number" ? p.examScore : null,
      name: typeof p.name === "string" ? p.name : "",
    };
  } catch {
    return { validated: [], examPassed: false, examScore: null, name: "" };
  }
}

export function ParcoursDebutant() {
  const [mounted, setMounted] = useState(false);
  const [validated, setValidated] = useState<string[]>([]);
  const [examPassed, setExamPassed] = useState(false);
  const [examScore, setExamScore] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [activeId, setActiveId] = useState<string>(STEPS[0].id);

  // Chargement depuis localStorage après le montage (évite tout mismatch d'hydratation).
  useEffect(() => {
    const s = load();
    setValidated(s.validated);
    setExamPassed(s.examPassed);
    setExamScore(s.examScore);
    setName(s.name);
    const firstUnvalidated = STEPS.find((st) => !s.validated.includes(st.id));
    setActiveId(firstUnvalidated ? firstUnvalidated.id : "examen");
    setMounted(true);
  }, []);

  // Sauvegarde à chaque changement (une fois monté).
  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ validated, examPassed, examScore, name }),
      );
    } catch {
      /* stockage indisponible : on ignore */
    }
  }, [mounted, validated, examPassed, examScore, name]);

  const allValidated = validated.length === STEPS.length;
  const progress = Math.round((validated.length / STEPS.length) * 100);

  function validateStep(id: string) {
    setValidated((prev) => (prev.includes(id) ? prev : [...prev, id]));
    const idx = STEPS.findIndex((s) => s.id === id);
    const next = STEPS[idx + 1];
    setActiveId(next ? next.id : "examen");
  }

  function resetAll() {
    setValidated([]);
    setExamPassed(false);
    setExamScore(null);
    setActiveId(STEPS[0].id);
    try {
      window.localStorage.removeItem(STORE_KEY);
    } catch {
      /* ignore */
    }
  }

  return (
    <div>
      {/* Barre de progression */}
      <div className="card" style={{ position: "sticky", top: 72, zIndex: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span className="label" style={{ color: "var(--gold)", fontSize: 12 }}>
            Ta progression
          </span>
          <span className="label" style={{ fontSize: 12, color: "var(--muted)" }}>
            {validated.length} / {STEPS.length} étapes
            {examPassed && " · examen réussi ✅"}
          </span>
        </div>
        <div style={{ height: 10, borderRadius: 999, background: "var(--surface-2)", marginTop: 12, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${examPassed ? 100 : progress}%`,
              background: "linear-gradient(90deg, var(--felt), var(--gold))",
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Étapes */}
      <ol style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "grid", gap: 12 }}>
        {STEPS.map((step, i) => {
          const isValidated = validated.includes(step.id);
          const isUnlocked = i === 0 || validated.includes(STEPS[i - 1].id);
          const isOpen = mounted && activeId === step.id && isUnlocked;
          return (
            <li key={step.id}>
              <StepCard
                index={i}
                step={step}
                isValidated={isValidated}
                isUnlocked={isUnlocked}
                isOpen={isOpen}
                onToggle={() => isUnlocked && setActiveId(isOpen ? "" : step.id)}
                onValidated={() => validateStep(step.id)}
              />
            </li>
          );
        })}
      </ol>

      {/* Examen final */}
      <div style={{ marginTop: 22 }}>
        <ExamCard
          unlocked={allValidated}
          passed={examPassed}
          score={examScore}
          name={name}
          onName={setName}
          onResult={(score, passed) => {
            setExamScore(score);
            setExamPassed(passed);
          }}
        />
      </div>

      {/* Réinitialiser */}
      {mounted && (validated.length > 0 || examPassed) && (
        <div style={{ textAlign: "center", marginTop: 22 }}>
          <button onClick={resetAll} className="btn btn-ghost" style={{ fontSize: 12 }}>
            ↺ Recommencer le parcours
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Carte d'étape ---------- */

function StepCard({
  index,
  step,
  isValidated,
  isUnlocked,
  isOpen,
  onToggle,
  onValidated,
}: {
  index: number;
  step: (typeof STEPS)[number];
  isValidated: boolean;
  isUnlocked: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onValidated: () => void;
}) {
  const badge = isValidated ? "✓" : isUnlocked ? String(index + 1) : "🔒";
  const badgeColor = isValidated ? "var(--felt)" : isUnlocked ? "var(--gold)" : "var(--faint)";
  return (
    <div className="card" style={{ opacity: isUnlocked ? 1 : 0.6, padding: 0, overflow: "hidden" }}>
      <button
        onClick={onToggle}
        disabled={!isUnlocked}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          gap: 14,
          alignItems: "center",
          padding: 18,
          background: "transparent",
          border: "none",
          cursor: isUnlocked ? "pointer" : "not-allowed",
          textAlign: "left",
          color: "inherit",
        }}
      >
        <span
          className="display"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 38,
            height: 38,
            borderRadius: 10,
            border: `1px solid ${isValidated ? "rgba(31,122,82,0.6)" : "var(--line)"}`,
            color: badgeColor,
            fontSize: 17,
          }}
        >
          {badge}
        </span>
        <span style={{ flex: 1 }}>
          <span style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 18 }}>{step.emoji}</span>
            <span className="display" style={{ fontSize: 17 }}>{step.title}</span>
            <span className="pill">{step.minutes} min</span>
            {isValidated && <span className="pill pill-beginner">Validée</span>}
          </span>
          <span style={{ display: "block", color: "var(--muted)", fontSize: 14, marginTop: 6 }}>{step.intro}</span>
        </span>
        <span aria-hidden style={{ color: "var(--faint)", fontSize: 13 }}>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div style={{ padding: "0 18px 18px" }}>
          <div style={{ display: "grid", gap: 12 }}>
            {step.points.map((p, k) => (
              <div key={k} className="card" style={{ background: "var(--surface-2)", padding: 14 }}>
                {p.h && <div className="display" style={{ fontSize: 14, color: "var(--gold-soft)" }}>{p.h}</div>}
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: p.h ? 6 : 0 }}>{p.text}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="label" style={{ color: "var(--gold)", fontSize: 12, marginBottom: 10 }}>
              Quiz de validation — réponds juste pour débloquer la suite
            </div>
            <QuizBlock
              questions={step.quiz}
              requireAll
              alreadyPassed={isValidated}
              onSuccess={onValidated}
              successLabel="Étape validée ! Étape suivante débloquée 🔓"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Examen final ---------- */

function ExamCard({
  unlocked,
  passed,
  score,
  name,
  onName,
  onResult,
}: {
  unlocked: boolean;
  passed: boolean;
  score: number | null;
  name: string;
  onName: (n: string) => void;
  onResult: (score: number, passed: boolean) => void;
}) {
  if (!unlocked && !passed) {
    return (
      <div className="card" style={{ textAlign: "center", opacity: 0.75 }}>
        <div style={{ fontSize: 28 }}>🔒</div>
        <div className="display" style={{ fontSize: 18, marginTop: 8 }}>Examen final verrouillé</div>
        <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>
          Valide les 6 étapes ci-dessus pour débloquer l&apos;examen et obtenir ton certificat.
        </p>
      </div>
    );
  }

  if (passed) {
    return (
      <div className="felt" style={{ padding: "32px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>🏅</div>
        <div className="label" style={{ color: "#fbe8c2", fontSize: 12, marginTop: 8 }}>
          Certificat — Bases du poker
        </div>
        <div className="display" style={{ fontSize: 26, color: "#fff", marginTop: 6 }}>
          Félicitations{name ? `, ${name}` : ""} !
        </div>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, marginTop: 10, maxWidth: 460, marginInline: "auto" }}>
          Tu maîtrises les bases du poker {score !== null && `(${score}/${FINAL_QUIZ.length} à l'examen)`}.
          Tu es prêt pour la stratégie — ou pour passer de l&apos;autre côté de la table.
        </p>
        <input
          value={name}
          onChange={(e) => onName(e.target.value)}
          placeholder="Ton prénom (sur le certificat)"
          aria-label="Ton prénom"
          style={{
            marginTop: 16,
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(0,0,0,0.2)",
            color: "#fff",
            fontSize: 14,
            outline: "none",
            textAlign: "center",
          }}
        />
      </div>
    );
  }

  // Débloqué mais pas encore réussi : on affiche l'examen.
  return (
    <div className="card" style={{ borderColor: "rgba(232,176,75,0.4)" }}>
      <div className="display" style={{ fontSize: 20 }}>🎓 Examen final</div>
      <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>
        {FINAL_QUIZ.length} questions. Il t&apos;en faut au moins <strong>{FINAL_PASS}</strong> correctes
        pour décrocher ton certificat débutant.
      </p>
      <div style={{ marginTop: 16 }}>
        <QuizBlock
          questions={FINAL_QUIZ}
          requireAll={false}
          threshold={FINAL_PASS}
          onSuccess={(c) => onResult(c, true)}
          onFail={(c) => onResult(c, false)}
          successLabel="Examen réussi — certificat débloqué 🏅"
        />
      </div>
    </div>
  );
}

/* ---------- Bloc de quiz réutilisable ---------- */

function QuizBlock({
  questions,
  requireAll,
  threshold,
  alreadyPassed,
  onSuccess,
  onFail,
  successLabel,
}: {
  questions: QuizQuestion[];
  requireAll: boolean;
  threshold?: number;
  alreadyPassed?: boolean;
  onSuccess: (correct: number) => void;
  onFail?: (correct: number) => void;
  successLabel: string;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [checked, setChecked] = useState(false);

  if (alreadyPassed) {
    return (
      <div
        style={{
          borderRadius: 12,
          padding: "12px 16px",
          border: "1px solid rgba(31,122,82,0.5)",
          background: "rgba(31,122,82,0.12)",
          color: "#8fe3b6",
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        ✓ Quiz déjà validé. Tu peux relire le cours ci-dessus quand tu veux.
      </div>
    );
  }

  const allAnswered = answers.every((a) => a !== null);
  const correct = answers.reduce<number>((n, a, i) => n + (a === questions[i].answer ? 1 : 0), 0);
  const passed = requireAll ? correct === questions.length : correct >= (threshold ?? 0);

  function select(qi: number, oi: number) {
    if (checked) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qi] = oi;
      return next;
    });
  }

  function validate() {
    setChecked(true);
    if (passed) onSuccess(correct);
    else onFail?.(correct);
  }

  function retry() {
    setAnswers(questions.map(() => null));
    setChecked(false);
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {questions.map((q, qi) => (
        <div key={qi}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>
            {qi + 1}. {q.question}
          </div>
          <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const isAnswer = q.answer === oi;
              let border = "var(--line)";
              let bg = "var(--surface-2)";
              let color = "var(--fg)";
              if (checked) {
                if (isAnswer) {
                  border = "rgba(31,122,82,0.7)";
                  bg = "rgba(31,122,82,0.14)";
                  color = "#bdf0d2";
                } else if (selected) {
                  border = "rgba(226,72,61,0.6)";
                  bg = "rgba(226,72,61,0.12)";
                  color = "#f3a0a0";
                }
              } else if (selected) {
                border = "rgba(232,176,75,0.7)";
                bg = "rgba(232,176,75,0.1)";
              }
              return (
                <button
                  key={oi}
                  onClick={() => select(qi, oi)}
                  disabled={checked}
                  aria-pressed={selected}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    textAlign: "left",
                    padding: "11px 14px",
                    borderRadius: 10,
                    border: `1px solid ${border}`,
                    background: bg,
                    color,
                    cursor: checked ? "default" : "pointer",
                    fontSize: 14,
                  }}
                >
                  <span style={{ width: 18 }}>
                    {checked ? (isAnswer ? "✓" : selected ? "✕" : "") : selected ? "●" : "○"}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          {checked && (
            <p style={{ color: "var(--faint)", fontSize: 13, marginTop: 8 }}>{q.explain}</p>
          )}
        </div>
      ))}

      {!checked && (
        <button
          onClick={validate}
          disabled={!allAnswered}
          className="btn btn-gold"
          style={{ justifySelf: "start", opacity: allAnswered ? 1 : 0.5 }}
        >
          Valider mes réponses
        </button>
      )}

      {checked && passed && (
        <div
          style={{
            borderRadius: 12,
            padding: "12px 16px",
            border: "1px solid rgba(31,122,82,0.5)",
            background: "rgba(31,122,82,0.12)",
            color: "#8fe3b6",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          ✅ {successLabel}
        </div>
      )}

      {checked && !passed && (
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ color: "#f3a0a0", fontWeight: 600, fontSize: 14 }}>
            ❌ {correct}/{questions.length} — pas encore. Relis le cours et réessaie.
          </span>
          <button onClick={retry} className="btn btn-ghost" style={{ fontSize: 12 }}>
            ↺ Réessayer
          </button>
        </div>
      )}
    </div>
  );
}
