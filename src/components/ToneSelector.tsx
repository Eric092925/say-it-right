"use client";

import { ToneOption, TONE_OPTIONS } from "@/lib/types";
import { ChevronDown } from "lucide-react";

interface ToneSelectorProps {
  value: ToneOption;
  onChange: (tone: ToneOption) => void;
  disabled?: boolean;
}

export default function ToneSelector({ value, onChange, disabled }: ToneSelectorProps) {
  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="tone-select" className="sr-only">
        Select Message Tone
      </label>
      <div className="relative w-full">
        <select
          id="tone-select"
          value={value}
          onChange={(e) => onChange(e.target.value as ToneOption)}
          disabled={disabled}
          className="appearance-none w-full bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 font-medium text-sm rounded-xl pl-3.5 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          {TONE_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-1">
              {opt.emoji} {opt.label} — {opt.description}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}
