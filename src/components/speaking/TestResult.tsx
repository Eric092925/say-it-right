"use client";

import { SpeakingTestResult } from "@/lib/speaking/types";
import { Award, RotateCcw, CheckCircle, ShieldAlert } from "lucide-react";

interface TestResultProps {
  result: SpeakingTestResult;
  onPracticeAgain: () => void;
  onRetakeTest: () => void;
}

export default function TestResult({
  result,
  onPracticeAgain,
  onRetakeTest,
}: TestResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 70) return "text-indigo-600 dark:text-indigo-400";
    return "text-amber-600 dark:text-amber-400";
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-lifted animate-slide-up">
      {/* Header Badge & Title */}
      <div className="text-center pb-8 border-b border-slate-100 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award className="w-4 h-4" />
          <span>Speaking Assessment Complete</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Speaking Test Result
        </h1>
        <div className="flex items-center justify-center gap-3 mt-2 text-sm text-slate-500 dark:text-slate-400">
          <span>Level: <strong>{result.level}</strong></span>
          <span>•</span>
          <span>Accent Reference: <strong>{result.accent}</strong></span>
        </div>

        {/* Overall Score */}
        <div className="mt-6 flex flex-col items-center">
          <div className="flex items-baseline gap-2">
            <span className={`text-6xl sm:text-7xl font-extrabold tracking-tight ${getScoreColor(result.overallScore)}`}>
              {result.overallScore}
            </span>
            <span className="text-2xl font-bold text-slate-400 dark:text-slate-500">/ 100</span>
          </div>
          <p className="max-w-xl text-slate-700 dark:text-slate-200 font-medium text-base sm:text-lg mt-4 leading-relaxed">
            {result.summary}
          </p>
        </div>
      </div>

      {/* Score Breakdown Table (Blueprint Section 18) */}
      <div className="py-8 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
          Performance Categories
        </h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm font-medium">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="py-4 px-5 text-slate-900 dark:text-white">
                  <div className="font-semibold">Pronunciation Accuracy</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                    Clarity of vowels, consonants, and word reproduction
                  </div>
                </td>
                <td className="py-4 px-5 text-right">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {result.accuracyScore}
                  </span>
                  <span className="text-xs text-slate-400 font-normal"> / 100</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="py-4 px-5 text-slate-900 dark:text-white">
                  <div className="font-semibold">Fluency</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                    Speech continuity, pacing rhythm, and absence of long pauses
                  </div>
                </td>
                <td className="py-4 px-5 text-right">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {result.fluencyScore}
                  </span>
                  <span className="text-xs text-slate-400 font-normal"> / 100</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 10-Question Summary List */}
      <div className="py-6 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          10-Question Breakdown
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {result.questions.map((q) => (
            <div
              key={q.questionNumber}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 text-center"
            >
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Q{q.questionNumber}
              </div>
              <div className="text-base font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
                {q.scoreResult?.overallScore || "--"}
              </div>
              <div className="text-[10px] text-slate-400 capitalize">
                {q.exercise.type}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
        <button
          type="button"
          onClick={onPracticeAgain}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Practice Again</span>
        </button>

        <button
          type="button"
          onClick={onRetakeTest}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-2xl font-bold text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
        >
          <span>Retake Test</span>
        </button>
      </div>

      {/* Mandatory Blueprint Disclaimer (Section 18) */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2.5 leading-relaxed">
        <ShieldAlert className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
        <div>
          <strong>Informational Notice:</strong> This assessment is designed solely for personal speaking practice and English pronunciation benchmarking. It does not represent an official language qualification, CEFR certification, or accredited score (such as IELTS or TOEFL).
        </div>
      </div>
    </div>
  );
}
