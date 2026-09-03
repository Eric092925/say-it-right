"use client";

import { useState } from "react";
import { AccentOption } from "@/lib/types";
import AccentSelector from "./AccentSelector";
import { Search, Sparkles, Loader2 } from "lucide-react";

interface WordInputProps {
  initialWord?: string;
  initialAccent?: AccentOption;
  isLoading: boolean;
  onSubmit: (word: string, accent: AccentOption) => void;
}

const POPULAR_EXAMPLES = [
  "Maroubra",
  "Worcestershire",
  "Melbourne",
  "Entrepreneur",
  "Leicester",
  "Canberra",
  "Quinoa",
];

export default function WordInput({
  initialWord = "",
  initialAccent = "Australian",
  isLoading,
  onSubmit,
}: WordInputProps) {
  const [word, setWord] = useState(initialWord);
  const [accent, setAccent] = useState<AccentOption>(initialAccent);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!word.trim() || isLoading) return;
    onSubmit(word.trim(), accent);
  };

  const handleChipClick = (example: string) => {
    setWord(example);
    onSubmit(example, accent);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
        What do you want to say?
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        Check pronunciation, meaning, and phonetic respelling for tricky words, suburbs, places, or names.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Input */}
        <div className="relative">
          <label htmlFor="word-input" className="sr-only">
            Enter a word, name or place
          </label>
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              id="word-input"
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter a word, name or place..."
              maxLength={100}
              autoComplete="off"
              disabled={isLoading}
              className="w-full bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-lg sm:text-xl font-medium rounded-2xl pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Accent Selector & Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
              English style:
            </span>
            <AccentSelector
              value={accent}
              onChange={(newAccent) => {
                setAccent(newAccent);
                if (word.trim() && !isLoading) {
                  onSubmit(word.trim(), newAccent);
                }
              }}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={!word.trim() || isLoading}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/35 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-150"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Finding...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Say It Right</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Suggested Quick Examples */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-3">
          Try an example:
        </span>
        <div className="flex flex-wrap gap-2">
          {POPULAR_EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => handleChipClick(example)}
              disabled={isLoading}
              className="text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
