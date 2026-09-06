"use client";

import { useState } from "react";
import ModeSelector from "@/components/ModeSelector";
import WordInput from "@/components/WordInput";
import WordResult from "@/components/WordResult";
import MessageInput from "@/components/MessageInput";
import MessageResult from "@/components/MessageResult";
import SpeakingHub from "@/components/speaking/SpeakingHub";
import { VersionKey } from "@/components/VersionSelector";
import {
  AppMode,
  AccentOption,
  ToneOption,
  WordResult as WordResultType,
  MessageResult as MessageResultType,
  ApiResponse,
} from "@/lib/types";
import { AlertCircle, Sparkles } from "lucide-react";

export default function HomePage() {
  const [mode, setMode] = useState<AppMode>("word");

  // Word Mode State
  const [currentWord, setCurrentWord] = useState<string>("");
  const [currentAccent, setCurrentAccent] = useState<AccentOption>("Australian");
  const [wordResult, setWordResult] = useState<WordResultType | null>(null);
  const [isWordLoading, setIsWordLoading] = useState(false);

  // Message Mode State
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [currentTone, setCurrentTone] = useState<ToneOption>("Professional");
  const [messageResult, setMessageResult] = useState<MessageResultType | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<VersionKey>(0);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [generationCount, setGenerationCount] = useState(1);

  // Error State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle Word Search
  const handleWordSubmit = async (word: string, accent: AccentOption) => {
    if (!word.trim()) return;

    setCurrentWord(word.trim());
    setCurrentAccent(accent);
    setIsWordLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "word",
          input: word.trim(),
          accent,
        }),
      });

      const data: ApiResponse = await response.json();

      if (data.success && data.data.type === "word") {
        setWordResult(data.data);
      } else {
        setErrorMessage(
          !data.success ? data.error : "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.error("Word search error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsWordLoading(false);
    }
  };

  // Handle Word Accent Change
  const handleAccentChange = (newAccent: AccentOption) => {
    setCurrentAccent(newAccent);
    if (wordResult) {
      handleWordSubmit(wordResult.word, newAccent);
    }
  };

  // Handle Message Submit
  const handleMessageSubmit = async (
    message: string,
    tone: ToneOption,
    isRegen = false
  ) => {
    if (!message.trim()) return;

    setCurrentMessage(message.trim());
    setCurrentTone(tone);
    setIsMessageLoading(true);
    setErrorMessage(null);

    const targetVersionNumber = isRegen ? generationCount + 1 : 1;
    const existingVersions = isRegen && messageResult ? messageResult.versions : [];

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "message",
          input: message.trim(),
          tone,
          versionNumber: targetVersionNumber,
          previousVersions: existingVersions,
        }),
      });

      const data: ApiResponse = await response.json();

      if (data.success && data.data.type === "message") {
        const newVersionText = data.data.versions[0] || "";
        if (isRegen && messageResult) {
          const updatedVersions = [...existingVersions, newVersionText];
          setMessageResult({
            ...data.data,
            source: messageResult.source === "ai" || data.data.source === "ai" ? "ai" : "fallback",
            model: data.data.model || messageResult.model,
            versions: updatedVersions,
          });
          setSelectedVersion(updatedVersions.length - 1);
          setGenerationCount(updatedVersions.length);
        } else {
          setMessageResult({
            ...data.data,
            versions: [newVersionText],
          });
          setSelectedVersion(0);
          setGenerationCount(1);
        }
      } else {
        setErrorMessage(
          !data.success ? data.error : "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.error("Message rewrite error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsMessageLoading(false);
    }
  };

  // Handle Message Regeneration (generates next version on demand)
  const handleRegenerate = () => {
    if (generationCount >= 3 || !currentMessage || isMessageLoading) return;
    handleMessageSubmit(currentMessage, currentTone, true);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Pronounce it better. Write it better.</span>
      </div>

      {/* Mode Selector Toggle */}
      <ModeSelector
        mode={mode}
        onSelectMode={(newMode) => {
          setMode(newMode);
          setErrorMessage(null);
        }}
      />

      {/* Error Message Toast/Banner */}
      {errorMessage && (
        <div className="w-full mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 flex items-center gap-3 animate-fade-in shadow-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" />
          <div className="flex-1 text-sm font-medium">{errorMessage}</div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-xs font-bold text-rose-800 dark:text-rose-200 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Mode 1: Word Mode */}
      {mode === "word" && (
        <div className="w-full">
          <WordInput
            initialWord={currentWord}
            initialAccent={currentAccent}
            isLoading={isWordLoading}
            onSubmit={handleWordSubmit}
          />

          {wordResult && (
            <WordResult
              result={wordResult}
              onAccentChange={handleAccentChange}
              isLoading={isWordLoading}
            />
          )}
        </div>
      )}

      {/* Mode 2: Message Mode */}
      {mode === "message" && (
        <div className="w-full">
          <MessageInput
            initialMessage={currentMessage}
            initialTone={currentTone}
            isLoading={isMessageLoading}
            onSubmit={(msg, tone) => handleMessageSubmit(msg, tone, false)}
          />

          {messageResult && (
            <MessageResult
              originalMessage={currentMessage}
              result={messageResult}
              tone={currentTone}
              selectedVersion={selectedVersion}
              onSelectVersion={setSelectedVersion}
              onRegenerate={handleRegenerate}
              isRegenerating={isMessageLoading}
              canRegenerate={generationCount < 3}
              generationCount={generationCount}
            />
          )}
        </div>
      )}

      {/* Mode 3: Speaking Mode */}
      {mode === "speaking" && (
        <div className="w-full">
          <SpeakingHub />
        </div>
      )}
    </div>
  );
}
