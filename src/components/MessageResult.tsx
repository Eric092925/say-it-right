"use client";

import { MessageResult as MessageResultType, ToneOption, TONE_OPTIONS } from "@/lib/types";
import VersionSelector, { VersionKey } from "./VersionSelector";
import CopyButton from "./CopyButton";
import ListenButton from "./ListenButton";
import { RotateCw, FileText, Sparkles } from "lucide-react";

interface MessageResultProps {
  originalMessage: string;
  result: MessageResultType;
  tone: ToneOption;
  selectedVersion: VersionKey;
  onSelectVersion: (version: VersionKey) => void;
  onRegenerate: () => void;
  isRegenerating?: boolean;
  canRegenerate?: boolean;
  generationCount?: number;
}

export default function MessageResult({
  originalMessage,
  result,
  tone,
  selectedVersion,
  onSelectVersion,
  onRegenerate,
  isRegenerating = false,
  canRegenerate = true,
  generationCount = 1,
}: MessageResultProps) {
  const versions = result.versions || [];
  const isOriginal = selectedVersion === "original";

  let currentText = "";
  if (isOriginal) {
    currentText = originalMessage;
  } else {
    const safeIndex = Math.min(
      Math.max(0, Number(selectedVersion)),
      Math.max(0, versions.length - 1)
    );
    currentText = versions[safeIndex] || versions[0] || originalMessage;
  }

  const toneConfig = TONE_OPTIONS.find((t) => t.id === tone) || TONE_OPTIONS[0];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted animate-slide-up mt-8">
      {/* Header: Title, Tone/Original Badge, and Version Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {isOriginal ? "Original Draft" : "Message Result"}
            </span>
            {isOriginal ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <FileText className="w-3 h-3 text-slate-500" /> Original
              </span>
            ) : (
              <>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                  {toneConfig.emoji} {toneConfig.label}
                </span>
                {result.source === "ai" ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                    <Sparkles className="w-3 h-3 text-emerald-500" /> AI Powered ({result.model || "Gemini"})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                    ⚡ Smart Engine
                  </span>
                )}
              </>
            )}
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {isOriginal ? "Original message" : "Improved message"}
          </h2>
        </div>

        {/* Version Dropdown Selector (Original, Version 1, Version 2, Version 3) */}
        <VersionSelector
          totalVersions={versions.length}
          hasOriginal={Boolean(originalMessage)}
          selectedVersion={selectedVersion}
          onSelectVersion={onSelectVersion}
        />
      </div>

      {/* Message Body (Displays Original or Selected Improved Version) */}
      <div className="py-6 border-b border-slate-100 dark:border-slate-800">
        <div
          className={`rounded-2xl p-6 border transition-all duration-200 ${
            isOriginal
              ? "bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800"
              : "bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-100/80 dark:border-indigo-900/40"
          }`}
        >
          <p className="text-lg sm:text-xl text-slate-800 dark:text-slate-100 leading-relaxed font-medium select-text">
            {currentText}
          </p>
        </div>
      </div>

      {/* Action Buttons: Copy, Listen, Regenerate */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <CopyButton text={currentText} label="Copy" size="md" />
          <ListenButton
            text={currentText}
            accent="Australian"
            label={isOriginal ? "Listen (Original)" : "Listen"}
            size="md"
          />
        </div>

        {/* Regenerate Button (Max 3 Limit) */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onRegenerate}
            disabled={!canRegenerate || isRegenerating}
            title={
              !canRegenerate
                ? "Maximum 3 versions limit reached"
                : "Generate next improved version"
            }
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              canRegenerate
                ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95"
                : "bg-slate-100/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-dashed border-slate-200 dark:border-slate-800"
            }`}
          >
            <RotateCw
              className={`w-4 h-4 ${isRegenerating ? "animate-spin text-indigo-600" : ""}`}
            />
            <span>
              {canRegenerate
                ? `Regenerate (${generationCount}/3)`
                : "Regenerate (3/3 limit reached)"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
