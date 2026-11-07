"use client";

import { useState } from "react";
import type { Lesson } from "@/lib/types";
import { cn } from "@/lib/utils";

export function LessonTabs({ lesson }: { lesson: Lesson }) {
  const [tab, setTab] = useState<"notes" | "quiz" | "terms">("notes");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
        {(["notes", "quiz", "terms"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition",
              tab === t ? "bg-white/10 text-white" : "text-white/50 hover:text-white/70"
            )}
          >
            {t === "notes" ? "Notes" : t === "quiz" ? "Quiz" : "Key Terms"}
          </button>
        ))}
      </div>

      {tab === "notes" && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white/70">Summary</h3>
          <p className="text-sm leading-relaxed text-white/80">{lesson.summary}</p>
        </div>
      )}

      {tab === "quiz" && <QuizPanel questions={lesson.quiz} />}

      {tab === "terms" && (
        <dl className="space-y-3">
          {lesson.keyTerms.map((kt) => (
            <div key={kt.term} className="space-y-1">
              <dt className="text-sm font-semibold text-white">{kt.term}</dt>
              <dd className="text-sm leading-relaxed text-white/60">{kt.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function QuizPanel({ questions }: { questions: Lesson["quiz"] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const q = questions[current];
  if (!q) return <p className="text-sm text-white/50">No quiz for this lesson yet.</p>;

  function handleSelect(idx: number) {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
  }

  function next() {
    setSelected(null);
    setRevealed(false);
    setCurrent((c) => Math.min(c + 1, questions.length - 1));
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-white/40">Question {current + 1} of {questions.length}</p>
      <p className="text-sm font-medium text-white">{q.question}</p>

      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={cn(
              "w-full rounded-lg border px-3 py-2 text-left text-sm transition",
              !revealed && "border-white/10 text-white/70 hover:border-white/20 hover:bg-white/5",
              revealed && i === q.correctIndex && "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
              revealed && i === selected && i !== q.correctIndex && "border-red-500/50 bg-red-500/10 text-red-400",
              revealed && i !== selected && i !== q.correctIndex && "border-white/5 text-white/30"
            )}
          >
            {opt}
          </button>
        ))}
      </div>

      {revealed && (
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="text-sm text-white/70">{q.explanation}</p>
        </div>
      )}

      {revealed && current < questions.length - 1 && (
        <button onClick={next} className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15">
          Next question
        </button>
      )}
    </div>
  );
}
