"use client";

import { useEffect, useMemo, useState } from "react";
import { EXAM as EXAM_BASE } from "@/lib/poker/examQuestions";
import { EXAM_EXTRA } from "@/lib/poker/examQuestionsExtra";

// Banque complète = questions d'origine + lot validé par Jérôme via la review.
const EXAM = [...EXAM_BASE, ...EXAM_EXTRA];

const KEY = "ph_croupier_exam";
const FULL_N = 100; // examen complet : 100 questions tirées au hasard dans la banque
const QUICK_N = 40; // examen rapide
const PASS_RATIO = 0.8;

/** Mélange Fisher-Yates des index de l'examen (ordre aléatoire à chaque tentative). */
function shuffledIndices(): number[] {
  const a = EXAM.map((_, k) => k);
  for (let j = a.length - 1; j > 0; j--) {
    const r = Math.floor(Math.random() * (j + 1));
    [a[j], a[r]] = [a[r], a[j]];
  }
  return a;
}

export function CroupierExam() {
  const [mode, setMode] = useState<null | "full" | "quick">(null);
  const [quiz, setQuiz] = useState<number[]>([]); // index ORIGINAUX dans EXAM, dans l'ordre présenté
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [i, setI] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [name, setName] = useState("");

  const [doneDate, setDoneDate] = useState(""); // date réelle de complétion (posée au submit)

  useEffect(() => {
    if (submitted) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [submitted]);

  function start(kind: "full" | "quick") {
    const all = shuffledIndices();
    const q = all.slice(0, kind === "quick" ? QUICK_N : FULL_N);
    setQuiz(q);
    setAnswers(Array(q.length).fill(null));
    setI(0);
    setSubmitted(false);
    setShowReview(false);
    setName("");
    setMode(kind);
  }

  const total = quiz.length;
  const passNeeded = Math.ceil(total * PASS_RATIO);
  const answered = answers.filter((a) => a != null).length;
  const score = useMemo(
    () => answers.reduce<number>((s, a, k) => s + (a === EXAM[quiz[k]].answer ? 1 : 0), 0),
    [answers, quiz],
  );
  const passed = score >= passNeeded;

  function pick(choice: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = choice;
      return next;
    });
  }

  function submit() {
    if (answered < total) {
      const ok = window.confirm(
        `Il te reste ${total - answered} question(s) sans réponse. Terminer l'examen quand même ?`,
      );
      if (!ok) return;
    }
    const sc = answers.reduce<number>((s, a, k) => s + (a === EXAM[quiz[k]].answer ? 1 : 0), 0);
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ score: sc, total, passed: sc >= passNeeded, date: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
    setDoneDate(new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }));
    setSubmitted(true);
  }

  function downloadCertificate() {
    const label = name.trim() || "Croupier";
    const slug =
      (name.trim() || "croupier")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase() || "croupier";
    try {
      const c = document.createElement("canvas");
      c.width = 1600;
      c.height = 1130;
      const ctx = c.getContext("2d");
      if (!ctx) {
        alert("Impossible de générer le certificat sur ce navigateur.");
        return;
      }

      const g = ctx.createLinearGradient(0, 0, 0, 1130);
      g.addColorStop(0, "#0f1626");
      g.addColorStop(1, "#0a0f1b");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 1600, 1130);

      ctx.strokeStyle = "#e8b04b";
      ctx.lineWidth = 6;
      ctx.strokeRect(40, 40, 1520, 1050);
      ctx.lineWidth = 2;
      ctx.strokeRect(62, 62, 1476, 1006);

      ctx.textAlign = "center";
      const cx = 800;
      ctx.fillStyle = "#e8b04b";
      ctx.font = "600 30px Georgia, 'Times New Roman', serif";
      ctx.fillText("ACADÉMIE CROUPIER · JÉRÔME IBIZA", cx, 180);
      ctx.fillStyle = "#f3f5f8";
      ctx.font = "bold 80px Georgia, 'Times New Roman', serif";
      ctx.fillText("CERTIFICAT DE RÉUSSITE", cx, 300);
      ctx.fillStyle = "#9fb0c8";
      ctx.font = "30px Georgia, 'Times New Roman', serif";
      ctx.fillText("Ce certificat atteste que", cx, 410);

      // Nom : police réduite tant qu'il dépasse la largeur utile, puis compression douce.
      let fs = 72;
      ctx.font = `bold ${fs}px Georgia, 'Times New Roman', serif`;
      while (ctx.measureText(label).width > 1380 && fs > 30) {
        fs -= 2;
        ctx.font = `bold ${fs}px Georgia, 'Times New Roman', serif`;
      }
      ctx.fillStyle = "#e8b04b";
      ctx.fillText(label, cx, 510, 1380);

      ctx.fillStyle = "#dfe6f0";
      ctx.font = "32px Georgia, 'Times New Roman', serif";
      ctx.fillText("a réussi l'examen final de croupier de poker", cx, 610);
      ctx.fillText(`avec un score de ${score} / ${total}.`, cx, 660);
      ctx.fillStyle = "#9fb0c8";
      ctx.font = "26px Georgia, 'Times New Roman', serif";
      ctx.fillText(`Délivré le ${doneDate}`, cx, 745);

      ctx.beginPath();
      ctx.arc(cx, 885, 72, 0, Math.PI * 2);
      ctx.strokeStyle = "#e8b04b";
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = "#e8b04b";
      ctx.font = "64px Georgia, serif";
      ctx.fillText("♠", cx, 908);

      ctx.fillStyle = "#dfe6f0";
      ctx.font = "italic 40px Georgia, 'Times New Roman', serif";
      ctx.fillText("Jérôme Ibiza", cx, 1015);
      ctx.fillStyle = "#9fb0c8";
      ctx.font = "24px Georgia, 'Times New Roman', serif";
      ctx.fillText("Croupier professionnel", cx, 1055);

      c.toBlob((blob) => {
        if (!blob) {
          alert("Échec de la génération du certificat.");
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificat-croupier-${slug}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch {
      alert("Une erreur est survenue lors de la génération du certificat.");
    }
  }

  // ---------- Écran de choix du mode ----------
  if (mode === null) {
    return (
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        <button type="button" className="exam-start" onClick={() => start("full")}>
          <span className="pill">100 questions</span>
          <span className="display" style={{ fontSize: 20, marginTop: 10, display: "block" }}>Examen complet</span>
          <span style={{ color: "var(--muted)", fontSize: 14, marginTop: 8, display: "block" }}>
            Les 100 questions, dans un ordre mélangé. Il faut 80/100 pour valider et obtenir le certificat.
          </span>
        </button>
        <button type="button" className="exam-start" onClick={() => start("quick")}>
          <span className="pill">40 questions</span>
          <span className="display" style={{ fontSize: 20, marginTop: 10, display: "block" }}>Examen rapide</span>
          <span style={{ color: "var(--muted)", fontSize: 14, marginTop: 8, display: "block" }}>
            40 questions tirées au hasard parmi les 100. Il faut 32/40 (80%). Parfait pour s&apos;entraîner et rejouer.
          </span>
        </button>
      </div>
    );
  }

  // ---------- Écran de résultat ----------
  if (submitted) {
    const wrong = answers.map((a, k) => ({ k, a })).filter((x) => x.a !== EXAM[quiz[x.k]].answer);

    return (
      <div>
        <div className="card" role="status" style={{ textAlign: "center", borderColor: passed ? "var(--gold)" : "var(--red)" }}>
          <div className="label" style={{ color: "var(--faint)", fontSize: 12 }}>Ton résultat</div>
          <div className="display" style={{ fontSize: 56, color: passed ? "var(--gold)" : "var(--red)", marginTop: 6 }}>
            {score}<span style={{ fontSize: 26, color: "var(--muted)" }}> / {total}</span>
          </div>
          <div className="display" style={{ fontSize: 20, marginTop: 6 }}>
            {passed ? "Examen réussi !" : "Pas encore validé"}
          </div>
          <p style={{ color: "var(--muted)", marginTop: 10, marginBottom: 0 }}>
            {passed
              ? "Bravo, tu as les bases du métier de croupier. Récupère ton certificat ci-dessous."
              : `Il te faut ${passNeeded}/${total} pour valider. Revois les modules concernés (voir la correction) et retente, tu y es presque.`}
          </p>
        </div>

        {passed && (
          <>
            <div className="exam-cert">
              <div className="exam-cert-inner">
                <div className="label" style={{ color: "var(--gold-soft)", letterSpacing: 2, fontSize: 12 }}>Certificat</div>
                <div className="display" style={{ fontSize: 26, marginTop: 8 }}>{name.trim() || "Croupier"}</div>
                <div className="display" style={{ fontSize: 15, color: "var(--gold)", marginTop: 4 }}>Croupier Poker · Académie Jérôme Ibiza</div>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 14, marginBottom: 0 }}>
                  Examen final réussi le {doneDate} (score {score}/{total}).
                </p>
                <div className="exam-cert-xp">🏅 200 XP crédités sur ton compte jeromeibiza.com</div>
              </div>
            </div>

            <div className="card" style={{ marginTop: 14 }}>
              <label style={{ display: "block" }}>
                <span className="label" style={{ color: "var(--faint)", fontSize: 11, display: "block", marginBottom: 6 }}>
                  Ton nom et prénom (apparaît sur le certificat)
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Jean Dupont"
                  maxLength={40}
                  style={{
                    width: "100%",
                    background: "var(--surface-2)",
                    border: "1px solid var(--line)",
                    borderRadius: 10,
                    padding: "11px 13px",
                    color: "var(--fg)",
                    fontSize: 16,
                    outline: 0,
                  }}
                />
              </label>
              <button
                type="button"
                className="btn btn-gold"
                style={{ marginTop: 14 }}
                onClick={downloadCertificate}
                disabled={!name.trim()}
              >
                ⬇ Télécharger mon certificat (PNG)
              </button>
              {!name.trim() && (
                <p style={{ color: "var(--faint)", fontSize: 13, marginTop: 8, marginBottom: 0 }}>
                  Saisis ton nom pour générer le certificat.
                </p>
              )}
            </div>
          </>
        )}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
          <button type="button" className="btn btn-ghost" onClick={() => setShowReview((v) => !v)}>
            {showReview ? "Masquer la correction" : `Voir la correction (${wrong.length} erreur${wrong.length > 1 ? "s" : ""})`}
          </button>
          <button type="button" className="btn btn-gold" onClick={() => setMode(null)}>Refaire un examen</button>
        </div>

        {showReview && (
          <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
            {wrong.length === 0 ? (
              <div className="card">Sans-faute, rien à corriger. Chapeau.</div>
            ) : (
              wrong.map(({ k, a }) => {
                const q = EXAM[quiz[k]];
                return (
                  <div key={k} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <strong>{q.q}</strong>
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
  const q = EXAM[quiz[i]];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
        <div className="label" style={{ color: "var(--gold)", fontSize: 13 }}>Question {i + 1} / {total}</div>
        <div className="label" style={{ color: "var(--faint)", fontSize: 12 }}>{answered} / {total} répondues</div>
      </div>
      <div className="exam-bar"><span style={{ width: `${total ? (answered / total) * 100 : 0}%` }} /></div>

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
              aria-pressed={answers[i] === ci}
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
        {i < total - 1 ? (
          <button type="button" className="btn btn-gold" onClick={() => setI((x) => Math.min(total - 1, x + 1))}>
            Suivant ▶
          </button>
        ) : (
          <button type="button" className="btn btn-gold" onClick={submit}>Terminer l&apos;examen ✓</button>
        )}
      </div>

      <nav className="exam-grid" aria-label="Aller à une question">
        {quiz.map((_, k) => (
          <button
            key={k}
            type="button"
            className={`exam-cell${k === i ? " is-cur" : ""}${answers[k] != null ? " is-done" : ""}`}
            onClick={() => setI(k)}
            aria-label={`Question ${k + 1}${answers[k] != null ? ", répondue" : ", sans réponse"}${k === i ? ", question actuelle" : ""}`}
            aria-current={k === i ? "true" : undefined}
          >
            {k + 1}
          </button>
        ))}
      </nav>

      <button type="button" className="btn btn-gold" style={{ marginTop: 16, width: "100%" }} onClick={submit}>
        Terminer l&apos;examen et voir mon score
      </button>
    </div>
  );
}
