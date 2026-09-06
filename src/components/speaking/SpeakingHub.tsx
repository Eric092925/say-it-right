"use client";

import { useState } from "react";
import PracticeMode from "./PracticeMode";
import SpeakingTest from "./SpeakingTest";
import { BookOpen, Award } from "lucide-react";

export type SpeakingSubMode = "practice" | "test";

export default function SpeakingHub() {
  const [subMode, setSubMode] = useState<SpeakingSubMode>("practice");

  return (
    <div className="w-full flex flex-col items-center">
      {/* Speaking Header & Subtitle (Blueprint Section 3) */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Speaking
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-1.5 max-w-md mx-auto">
          Practice your English pronunciation and fluency.
        </p>
      </div>

      {/* Sub-mode Navigation Toggle: [ Practice ] [ Test ] */}
      <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 shadow-inner mb-8">
        <button
          type="button"
          onClick={() => setSubMode("practice")}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
            subMode === "practice"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md scale-[1.02]"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
          aria-pressed={subMode === "practice"}
        >
          <BookOpen className="w-4 h-4" />
          <span>Practice</span>
        </button>

        <button
          type="button"
          onClick={() => setSubMode("test")}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
            subMode === "test"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md scale-[1.02]"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
          aria-pressed={subMode === "test"}
        >
          <Award className="w-4 h-4" />
          <span>Test</span>
        </button>
      </div>

      {/* Sub-mode Content */}
      <div className="w-full">
        {subMode === "practice" && (
          <PracticeMode onSwitchToTest={() => setSubMode("test")} />
        )}
        {subMode === "test" && (
          <SpeakingTest onSwitchToPractice={() => setSubMode("practice")} />
        )}
      </div>
    </div>
  );
}
