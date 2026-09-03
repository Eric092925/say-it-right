"use client";

import { ChevronDown, Sparkles } from "lucide-react";

export type VersionKey = "original" | number;

interface VersionSelectorProps {
  totalVersions: number;
  hasOriginal?: boolean;
  selectedVersion: VersionKey;
  onSelectVersion: (version: VersionKey) => void;
}

export default function VersionSelector({
  totalVersions,
  hasOriginal = true,
  selectedVersion,
  onSelectVersion,
}: VersionSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
        Version:
      </span>
      <div className="relative inline-block">
        <select
          value={selectedVersion === "original" ? "original" : String(selectedVersion)}
          onChange={(e) => {
            const val = e.target.value;
            onSelectVersion(val === "original" ? "original" : Number(val));
          }}
          className="appearance-none bg-indigo-50/90 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-semibold text-xs rounded-lg pl-3 pr-8 py-1.5 border border-indigo-200 dark:border-indigo-800/80 hover:border-indigo-300 dark:hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer shadow-sm"
        >
          {hasOriginal && (
            <option value="original" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium">
              Original
            </option>
          )}
          {Array.from({ length: totalVersions }, (_, i) => (
            <option key={i} value={String(i)} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium">
              Version {i + 1}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-indigo-500 pointer-events-none" />
      </div>
    </div>
  );
}
