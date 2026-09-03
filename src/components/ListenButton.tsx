"use client";

import { useState, useEffect } from "react";
import { Volume2, Square } from "lucide-react";
import { speakText, stopSpeech, isSpeechSupported, initVoices } from "@/lib/speech";
import { AccentOption } from "@/lib/types";

interface ListenButtonProps {
  text: string;
  accent?: AccentOption;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ListenButton({
  text,
  accent = "Australian",
  label = "Listen",
  size = "md",
  className = "",
}: ListenButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const isSup = isSpeechSupported();
    setSupported(isSup);
    if (isSup) {
      initVoices();
    }

    return () => {
      stopSpeech();
    };
  }, []);

  const handleToggle = () => {
    if (!text.trim()) return;

    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
    } else {
      speakText(
        text,
        accent,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        (errorMessage) => {
          // Graceful handling of real speech playback issues
          console.warn("Speech playback notice:", errorMessage);
          setIsPlaying(false);
        }
      );
    }
  };

  if (!supported) {
    return null;
  }

  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5",
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isPlaying ? "Stop audio playback" : `Listen to ${label}`}
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 ${
        isPlaying
          ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 shadow-sm animate-pulse"
          : "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800/80 shadow-sm hover:shadow"
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <>
          <Square className="w-4 h-4 fill-current" />
          <span>Stop</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
