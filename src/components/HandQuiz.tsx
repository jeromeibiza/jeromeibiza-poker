"use client";

import { useState } from "react";
import { HANDS, type HandRank } from "@/lib/poker/hands";
import { Hand } from "@/components/PlayingCard";

function pickPair() {
  // Deux categories de mains differentes ; la plus petite "rank" gagne.
  const i = Math.floor(Math.random() * HANDS.length);
  let j = Math.floor(Math.random() * HANDS.length);
  while (j === i) j = Math.floor(Math.random() * HANDS.length);
  return [HANDS[i], HANDS[j]] as const;
}

export function HandQuiz() {
  const [pair, setPair] = useState(() => pickPair());
  const [answered, setAnswered] = useState<null | { chosen: number; correct: boolean }>(null);
  const [score, setScore] = useState({ good: 0, total: 0 });

  const winner = pair[0].rank < pair[1].rank ? 0 : 1;

  function choose(idx: number) {
    if (answered) return;
    const correct = idx === winner;
    setAnswered({ chosen: idx, correct });
    setScore((s) => ({ good: s.good + (correct ? 1 : 0), total: s.total + 1 }));
  }

  function next() {
    setPair(pickPair());
    setAnswered(null);
  }

  return (
    <div className="card" style={{ borderColor: "rgba(232,176,75,0.3)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div className="label" style={{ color: "var(--gold)", fontSize: 13 }}>
          Entraînement · Quelle main gagne ?
        </div>
        <div className="pill">Score {score.good}/{score.total}</div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: 12,
          alignItems: "center",
          marginTop: 18,
        }}
      >
        <QuizCard hand={pair[0]} onPick={() => choose(0)} answered={!!answered} isWinner={winner === 0} />
        <span
          className="display"
          style={{ fontSize: 22, color: "var(--faint)", textAlign: "center" }}
        >
          VS
        </span>
        <QuizCard hand={pair[1]} onPick={() => choose(1)} answered={!!answered} isWinner={winner === 1} />
      </div>

      {answered && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <p style={{ color: answered.correct ? "#8fe3b6" : "#f3a0a0", fontWeight: 600 }}>
            {answered.correct ? "✅ Correct !" : "❌ Raté."} {pair[winner].name} bat {pair[1 - winner].name}.
          </p>
          <button onClick={next} className="btn btn-gold" style={{ marginTop: 12 }}>
            Main suivante →
          </button>
        </div>
      )}
    </div>
  );
}

function QuizCard({
  hand,
  onPick,
  answered,
  isWinner,
}: {
  hand: HandRank;
  onPick: () => void;
  answered: boolean;
  isWinner: boolean;
}) {
  const border = answered
    ? isWinner
      ? "rgba(31,122,82,0.85)"
      : "rgba(226,72,61,0.5)"
    : "var(--line)";
  return (
    <button
      onClick={onPick}
      disabled={answered}
      className="card card-hover"
      style={{
        cursor: answered ? "default" : "pointer",
        borderColor: border,
        background: "var(--surface-2)",
        textAlign: "center",
      }}
    >
      <span style={{ display: "flex", justifyContent: "center" }}>
        <Hand cards={hand.cards} size={0.72} />
      </span>
      <span className="display" style={{ display: "block", fontSize: 15, marginTop: 12 }}>
        {hand.name}
      </span>
      {answered && (
        <span
          className="label"
          style={{ display: "block", fontSize: 11, marginTop: 6, color: isWinner ? "#8fe3b6" : "var(--faint)" }}
        >
          {isWinner ? "Gagne" : "Perd"}
        </span>
      )}
    </button>
  );
}
