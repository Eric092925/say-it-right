"use client";

import { AppMode } from "@/lib/types";
import { Mic, MessageSquareText } from "lucide-react";

interface ModeSelectorProps {
  mode: AppMode;
  onSelectMode: (mode: AppMode) => void;
}

export default function ModeSelector({ mode, onSelectMode }: ModeSelectorProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 shadow-inner">
        <button
          type="button"
          onClick={() => onSelectMode("word")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            mode === "word"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md shadow-slate-950/5 scale-[1.02]"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
          aria-pressed={mode === "word"}
        >
          <Mic className="w-4 h-4" />
          <span>Word Mode</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMode("message")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            mode === "message"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md shadow-slate-950/5 scale-[1.02]"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
          aria-pressed={mode === "message"}
        >
          <MessageSquareText className="w-4 h-4" />
          <span>Message Mode</span>
        </button>
      </div>
    </div>
  );
}
