"use client";

import { useEffect, useState } from "react";
import { PokerTable, type TableSeat } from "@/components/PokerTable";

export type ReplayStep = {
  /** Phase du coup, en gros (ex. "Avant le flop", "Le flop"). */
  tag: string;
  /** Emoji d'illustration de l'étape. */
  emoji?: string;
  /** Titre de l'action, simple et direct. */
  title: string;
  /** Explication façon grand débutant (un enfant de 8 ans comprend). */
  text: string;
  seats: TableSeat[];
  board?: string[];
  /** Index des cartes du board à mettre en surbrillance dorée (la carte qui vient de tomber). */
  boardHighlight?: number[];
  pot?: number;
};

/**
 * Mini-replayer pour grands débutants : déroule une main action par action,
 * avec une explication très visible et en temps réel à chaque étape.
 */
export function HandReplayer({
  steps,
  defaultUnit,
  numbered = false,
}: {
  steps: ReplayStep[];
  defaultUnit?: "bb" | "chips";
  /** Affiche un bandeau d'étapes numérotées cliquables (mode grand débutant). */
  numbered?: boolean;
}) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const atEnd = i === steps.length - 1;
  const step = steps[i];

  useEffect(() => {
    if (!playing) return;
    if (atEnd) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setI((x) => Math.min(x + 1, steps.length - 1)), 3200);
    return () => clearTimeout(id);
  }, [playing, i, atEnd, steps.length]);

  function togglePlay() {
    if (playing) setPlaying(false);
    else if (atEnd) {
      setI(0);
      setPlaying(true);
    } else setPlaying(true);
  }

  return (
    <div className="replayer">
      {numbered && (
        <div className="replayer-steplist" role="tablist" aria-label="Étapes de la main">
          {steps.map((s, k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={k === i}
              className={`replayer-stepbtn${k === i ? " is-on" : ""}`}
              onClick={() => {
                setPlaying(false);
                setI(k);
              }}
            >
              <span className="replayer-stepbtn-n">{k + 1}</span>
              <span className="replayer-stepbtn-t">{s.tag}</span>
            </button>
          ))}
        </div>
      )}

      <PokerTable
        seats={step.seats}
        board={step.board}
        boardHighlight={step.boardHighlight}
        pot={step.pot}
        defaultUnit={defaultUnit}
      />

      {/* Explication en temps réel, très visible */}
      <div className="replayer-explain" key={i}>
        <div className="replayer-explain-head">
          <span className="replayer-tag">{step.emoji ? `${step.emoji} ` : ""}{step.tag}</span>
          <span className="replayer-step">Étape {i + 1} sur {steps.length}</span>
        </div>
        <div className="replayer-title">{step.title}</div>
        <p className="replayer-text">{step.text}</p>
      </div>

      <div className="replayer-controls">
        <button
          type="button"
          className="btn btn-ghost replayer-nav"
          onClick={() => {
            setPlaying(false);
            setI((x) => Math.max(0, x - 1));
          }}
          disabled={i === 0}
          aria-label="Étape précédente"
        >
          ◀ Précédent
        </button>
        <button type="button" className="btn btn-gold" onClick={togglePlay}>
          {playing ? "❚❚ Pause" : atEnd ? "↺ Revoir depuis le début" : "▶ Dérouler la main"}
        </button>
        <button
          type="button"
          className="btn btn-ghost replayer-nav"
          onClick={() => {
            setPlaying(false);
            setI((x) => Math.min(steps.length - 1, x + 1));
          }}
          disabled={atEnd}
          aria-label="Étape suivante"
        >
          Suivant ▶
        </button>
      </div>

      <div className="replayer-dots">
        {steps.map((_, k) => (
          <button
            key={k}
            type="button"
            className={`replayer-dot${k === i ? " is-on" : ""}`}
            onClick={() => {
              setPlaying(false);
              setI(k);
            }}
            aria-label={`Aller à l'étape ${k + 1}`}
            aria-current={k === i ? "step" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
