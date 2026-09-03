"use client";

import { useState } from "react";
import { ToneOption } from "@/lib/types";
import ToneSelector from "./ToneSelector";
import { Sparkles, Loader2, MessageSquare } from "lucide-react";

interface MessageInputProps {
  initialMessage?: string;
  initialTone?: ToneOption;
  isLoading: boolean;
  onSubmit: (message: string, tone: ToneOption) => void;
}

const SAMPLE_MESSAGES = [
  "Can you send me the report when you have time?",
  "I won't be able to make tomorrow's meeting due to a conflict.",
  "We need to discuss pushing the project deadline back a week.",
];

export default function MessageInput({
  initialMessage = "",
  initialTone = "Professional",
  isLoading,
  onSubmit,
}: MessageInputProps) {
  const [message, setMessage] = useState(initialMessage);
  const [tone, setTone] = useState<ToneOption>(initialTone);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || isLoading) return;
    onSubmit(message.trim(), tone);
  };

  const handleChipClick = (sample: string) => {
    setMessage(sample);
    onSubmit(sample, tone);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
        Improve your message
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        Polish emails, messages, and requests with natural phrasing and precise tone adjustment.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Textarea */}
        <div className="relative">
          <label htmlFor="message-textarea" className="sr-only">
            Type your message
          </label>
          <textarea
            id="message-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type or paste your message here..."
            maxLength={5000}
            rows={4}
            disabled={isLoading}
            className="w-full bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-base font-normal rounded-2xl p-4 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all resize-y shadow-inner leading-relaxed"
          />

          <div className="flex justify-between items-center text-xs text-slate-400 dark:text-slate-500 px-1 mt-1.5">
            <span>Limit 5,000 characters</span>
            <span>{message.length} / 5,000</span>
          </div>
        </div>

        {/* Tone Selector & Submit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
              Tone:
            </span>
            <ToneSelector
              value={tone}
              onChange={(newTone) => {
                setTone(newTone);
                if (message.trim() && !isLoading) {
                  onSubmit(message.trim(), newTone);
                }
              }}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/35 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-150"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Polishing...</span>
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
          Try an example message:
        </span>
        <div className="space-y-2">
          {SAMPLE_MESSAGES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(sample)}
              disabled={isLoading}
              className="w-full text-left text-xs font-medium px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/60 dark:border-slate-700/60 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="truncate">&quot;{sample}&quot;</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
