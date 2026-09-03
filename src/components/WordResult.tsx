"use client";

import { WordResult as WordResultType, AccentOption, ACCENT_OPTIONS } from "@/lib/types";
import ListenButton from "./ListenButton";
import AccentSelector from "./AccentSelector";
import { BookOpen, Sparkles, Volume2, Globe } from "lucide-react";

interface WordResultProps {
  result: WordResultType;
  onAccentChange: (accent: AccentOption) => void;
  isLoading?: boolean;
}

export default function WordResult({
  result,
  onAccentChange,
  isLoading = false,
}: WordResultProps) {
  const currentAccentConfig = ACCENT_OPTIONS.find((a) => a.id === result.accent) || ACCENT_OPTIONS[0];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted animate-slide-up mt-8">
      {/* Top Header: Word Title + Accent Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Word Pronunciation
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white mt-1">
            {result.word}
          </h1>
        </div>

        {/* Accent switcher right on result card for quick switching */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Globe className="w-4 h-4 text-slate-400 ml-1.5" />
          <AccentSelector
            value={result.accent}
            onChange={onAccentChange}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Grid of Results: Meaning, Easy Pronunciation, IPA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-slate-100 dark:border-slate-800">
        {/* Meaning Block */}
        <div className="md:col-span-2 bg-slate-50/80 dark:bg-slate-950/40 rounded-2xl p-5 border border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Meaning</span>
          </div>
          <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
            {result.meaning}
          </p>
        </div>

        {/* Easy Pronunciation (Phonetic Respelling) */}
        <div className="bg-indigo-50/60 dark:bg-indigo-950/30 rounded-2xl p-5 border border-indigo-100 dark:border-indigo-900/40">
          <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Easy pronunciation</span>
          </div>
          <p className="text-2xl font-bold tracking-wide text-indigo-950 dark:text-indigo-100 font-mono">
            {result.pronunciation}
          </p>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
            CAPITALS indicate stressed syllable
          </span>
        </div>

        {/* IPA */}
        <div className="bg-slate-50/80 dark:bg-slate-950/40 rounded-2xl p-5 border border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <Volume2 className="w-4 h-4 text-indigo-500" />
            <span>IPA (Phonetic Alphabet)</span>
          </div>
          <p className="text-2xl font-semibold tracking-wide text-slate-800 dark:text-slate-200 font-mono">
            {result.ipa}
          </p>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
            International standard phonetic notation
          </span>
        </div>
      </div>

      {/* Footer / Listen Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
          <span>{currentAccentConfig.flag}</span>
          <span>{currentAccentConfig.label} Pronunciation</span>
        </div>

        <ListenButton
          text={result.word}
          accent={result.accent}
          label="Listen"
          size="lg"
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
}
