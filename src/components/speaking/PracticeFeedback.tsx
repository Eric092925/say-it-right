"use client";

import { useState } from "react";
import { SpeakingScoreResult } from "@/lib/speaking/types";
import {
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ArrowRight,
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

interface PracticeFeedbackProps {
  result: SpeakingScoreResult;
  previousScore?: number | null;
  onTryAgain: () => void;
  onNextExercise: () => void;
  onListenAgain: () => void;
  isLastExercise?: boolean;
}

export default function PracticeFeedback({
  result,
  previousScore,
  onTryAgain,
  onNextExercise,
  onListenAgain,
  isLastExercise = false,
}: PracticeFeedbackProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Score color helper
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 70) return "text-indigo-600 dark:text-indigo-400";
    return "text-amber-600 dark:text-amber-400";
  };

  const getScoreBadgeBg = (score: number) => {
    if (score >= 85) return "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800";
    if (score >= 70) return "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800";
    return "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800";
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted animate-slide-up mt-6">
      {/* Top Scores Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Practice Result
            </span>
            {result.source === "ai" ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                <Sparkles className="w-3 h-3 text-emerald-500" /> AI Assessed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                ⚡ Evaluated
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${getScoreColor(result.overallScore)}`}>
              {result.overallScore}
            </span>
            <span className="text-lg font-bold text-slate-400 dark:text-slate-500">/ 100</span>

            {/* Score progression if retried */}
            {typeof previousScore === "number" && previousScore !== result.overallScore && (
              <span className="ml-2 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Previous: {previousScore} → New: {result.overallScore}
              </span>
            )}
          </div>
        </div>

        {/* Sub-scores: Pronunciation Accuracy and Fluency */}
        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
          {/* Pronunciation Accuracy */}
          <div className={`px-4 py-3 rounded-2xl border ${getScoreBadgeBg(result.accuracyScore)}`}>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
              Accuracy
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                {result.accuracyScore}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/100</span>
            </div>
          </div>

          {/* Fluency */}
          <div className={`px-4 py-3 rounded-2xl border ${getScoreBadgeBg(result.fluencyScore)}`}>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
              Fluency
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                {result.fluencyScore}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Feedback Note */}
      <div className="py-5 border-b border-slate-100 dark:border-slate-800">
        <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 font-medium leading-relaxed">
          {result.feedback}
        </p>

        {/* Toggle Detailed Feedback */}
        {result.detailedFeedback && (
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>{showDetails ? "Hide Feedback" : "See Detailed Feedback"}</span>
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}

        {/* Expandable Details */}
        {showDetails && result.detailedFeedback && (
          <div className="mt-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in text-sm">
            {/* Accuracy Notes */}
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  Pronunciation Accuracy ({result.accuracyScore})
                </div>
                <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                  {result.detailedFeedback.accuracyNotes}
                </div>
              </div>
            </div>

            {/* Fluency Notes */}
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  Fluency ({result.fluencyScore})
                </div>
                <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                  {result.detailedFeedback.fluencyNotes}
                </div>
              </div>
            </div>

            {/* Suggested Improvement */}
            <div className="flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  Suggested Improvement
                </div>
                <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                  {result.detailedFeedback.suggestedImprovement}
                </div>
              </div>
            </div>

            {/* Word by Word Status if available */}
            {result.detailedFeedback.wordFeedback && result.detailedFeedback.wordFeedback.length > 0 && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Word Breakdown:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.detailedFeedback.wordFeedback.map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded text-xs font-mono font-medium ${
                        item.status === "accurate"
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60"
                          : item.status === "needs_work"
                          ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60"
                          : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60"
                      }`}
                    >
                      {item.word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons: Listen Again, Try Again, Next Exercise */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onListenAgain}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
          >
            <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Listen Again</span>
          </button>

          <button
            type="button"
            onClick={onTryAgain}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800/80 shadow-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onNextExercise}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all active:scale-95"
        >
          <span>{isLastExercise ? "Complete Practice" : "Next Exercise"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
