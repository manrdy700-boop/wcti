"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS } from "@/data/questions";
import { computeScores, pickWinner } from "@/lib/scoring";

export default function QuizPage() {
  const router = useRouter();
  const total = QUESTIONS.length;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const question = QUESTIONS[current];
  const progress = useMemo(
    () => Math.round(((current + (submitting ? 1 : 0)) / total) * 100),
    [current, submitting, total]
  );

  function handlePick(optionIndex: number) {
    if (submitting) return;
    const nextAnswers = [...answers];
    nextAnswers[current] = optionIndex;
    setAnswers(nextAnswers);

    if (current < total - 1) {
      // 给一点点点击反馈再切到下一题，体验更自然
      setTimeout(() => setCurrent(current + 1), 120);
    } else {
      setSubmitting(true);
      // 这里只是同步计算，给一点点延迟让 progress 动起来
      setTimeout(() => {
        const scores = computeScores(nextAnswers);
        const winner = pickWinner(scores);
        router.push(`/result/${winner}`);
      }, 250);
    }
  }

  function handleBack() {
    if (current === 0) return;
    setCurrent(current - 1);
  }

  return (
    <div className="flex flex-col">
      {/* Progress */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-xs font-medium text-slate-400">
          第 <span className="text-slate-100">{current + 1}</span> / {total} 题
        </div>
        <Link href="/" className="text-xs text-slate-400 hover:text-slate-200">
          退出
        </Link>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div key={question.id} className="mt-8 animate-pop">
        <h2 className="text-xl font-bold leading-snug text-slate-50 sm:text-2xl">
          {question.prompt}
        </h2>
        <div className="mt-6 flex flex-col gap-3">
          {question.options.map((option, idx) => {
            const isSelected = answers[current] === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handlePick(idx)}
                disabled={submitting}
                className={[
                  "group flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-base transition active:scale-[0.98] disabled:cursor-not-allowed",
                  isSelected
                    ? "border-amber-400 bg-amber-400/10 text-slate-50"
                    : "border-white/10 bg-white/5 text-slate-100 hover:border-white/30 hover:bg-white/10"
                ].join(" ")}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={[
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition",
                      isSelected
                        ? "bg-amber-400 text-slate-950"
                        : "bg-white/10 text-slate-200 group-hover:bg-white/20"
                    ].join(" ")}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option.label}</span>
                </span>
                <span
                  className={[
                    "text-slate-500 transition",
                    isSelected ? "translate-x-0.5 text-amber-400" : "group-hover:translate-x-0.5"
                  ].join(" ")}
                >
                  →
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={current === 0 || submitting}
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-30"
        >
          ← 上一题
        </button>
        <span className="text-xs text-slate-500">
          {submitting ? "正在为你匹配..." : "选择即进入下一题"}
        </span>
      </div>
    </div>
  );
}
