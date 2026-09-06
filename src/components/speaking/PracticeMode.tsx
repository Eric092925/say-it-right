"use client";

import { useState } from "react";
import {
  SpeakingDifficulty,
  SpeakingTopic,
  SpeakingExercise,
  SpeakingScoreResult,
  VoiceGender,
  SPEAKING_LEVELS,
  SPEAKING_TOPICS,
} from "@/lib/speaking/types";
import { AccentOption, ACCENT_OPTIONS } from "@/lib/types";
import { getPracticeExercises } from "@/lib/speaking/exercises";
import { speakText, stopSpeech } from "@/lib/speech";
import { RecordingResult } from "@/lib/speaking/recorder";
import VoiceRecorder from "./VoiceRecorder";
import PracticeFeedback from "./PracticeFeedback";
import {
  Volume2,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

interface PracticeModeProps {
  onSwitchToTest: () => void;
}

export default function PracticeMode({ onSwitchToTest }: PracticeModeProps) {
  // Setup State
  const [level, setLevel] = useState<SpeakingDifficulty>("Intermediate");
  const [accent, setAccent] = useState<AccentOption>("Australian");
  const [gender, setGender] = useState<VoiceGender>("Female");
  const [topic, setTopic] = useState<SpeakingTopic>("All Topics");
  const [exerciseCount, setExerciseCount] = useState<number>(5);

  // Active Session State
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [exercises, setExercises] = useState<SpeakingExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Current Exercise State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [currentScoreResult, setCurrentScoreResult] = useState<SpeakingScoreResult | null>(null);
  const [previousScore, setPreviousScore] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentExercise = exercises[currentIndex];

  // Start Practice Session
  const handleStartPractice = () => {
    const list = getPracticeExercises(level, topic, exerciseCount);
    if (list.length === 0) return;

    setExercises(list);
    setCurrentIndex(0);
    setCurrentScoreResult(null);
    setPreviousScore(null);
    setIsCompleted(false);
    setIsSessionActive(true);
  };

  // Play Reference Audio
  const handleListenReference = (textToSpeak?: string) => {
    const text = textToSpeak || currentExercise?.targetText || "";
    if (!text.trim()) return;

    if (isAudioPlaying) {
      stopSpeech();
      setIsAudioPlaying(false);
      return;
    }

    speakText(
      text,
      accent,
      () => setIsAudioPlaying(true),
      () => setIsAudioPlaying(false),
      () => setIsAudioPlaying(false),
      gender
    );
  };

  // Submit Spoken Recording for Analysis
  const handleRecordingComplete = async (recording: RecordingResult) => {
    if (!currentExercise) return;
    setIsAnalysing(true);

    try {
      const response = await fetch("/api/speaking/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audioBase64: recording.audioBase64,
          mimeType: recording.mimeType,
          targetText: currentExercise.targetText,
          accent,
          level,
          durationSeconds: recording.durationSeconds,
        }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        if (currentScoreResult) {
          setPreviousScore(currentScoreResult.overallScore);
        }
        setCurrentScoreResult(data.data);
      }
    } catch (err) {
      console.error("Speech analysis error:", err);
    } finally {
      setIsAnalysing(false);
    }
  };

  // Try Again on Current Exercise
  const handleTryAgain = () => {
    setCurrentScoreResult(null);
  };

  // Advance to Next Exercise
  const handleNextExercise = () => {
    stopSpeech();
    setIsAudioPlaying(false);

    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentScoreResult(null);
      setPreviousScore(null);
    } else {
      setIsCompleted(true);
    }
  };

  // Reset to Filter Setup
  const handleResetSession = () => {
    stopSpeech();
    setIsSessionActive(false);
    setExercises([]);
    setCurrentIndex(0);
    setCurrentScoreResult(null);
    setPreviousScore(null);
    setIsCompleted(false);
  };

  // ==========================================
  // VIEW 1: Filter Setup Screen
  // ==========================================
  if (!isSessionActive) {
    return (
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted animate-slide-up">
        <div className="pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Practice Setup
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Configure Your Speaking Session
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Listen to native reference English, practise speaking aloud, and receive instant feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* 1. Level Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SPEAKING_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                    level === lvl
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Accent Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Pronunciation Reference Accent
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ACCENT_OPTIONS.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => setAccent(acc.id)}
                  className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all truncate ${
                    accent === acc.id
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>{acc.flag} {acc.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Voice Gender Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Reference Voice Gender
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender("Female")}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                  gender === "Female"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                👩 Female Voice
              </button>
              <button
                type="button"
                onClick={() => setGender("Male")}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                  gender === "Male"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                👨 Male Voice
              </button>
            </div>
          </div>

          {/* 4. Topic Selector */}
          <div>
            <label htmlFor="topic-select" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Topic
            </label>
            <div className="relative">
              <select
                id="topic-select"
                value={topic}
                onChange={(e) => setTopic(e.target.value as SpeakingTopic)}
                className="appearance-none w-full bg-slate-50 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 font-medium text-sm rounded-xl pl-3.5 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer shadow-sm"
              >
                {SPEAKING_TOPICS.map((top) => (
                  <option key={top} value={top}>
                    {top}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* 5. Number of Exercises */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Number of Exercises
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 5, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setExerciseCount(num)}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                    exerciseCount === num
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {num} {num === 1 ? "Exercise" : "Exercises"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Selected: <strong>{level}</strong> • <strong>{accent}</strong> ({gender}) • <strong>{exerciseCount}</strong> items
          </div>
          <button
            type="button"
            onClick={handleStartPractice}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all active:scale-95"
          >
            <span>Start Practice</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: Session Completed Summary
  // ==========================================
  if (isCompleted) {
    return (
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-lifted animate-slide-up text-center">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Practice Complete!
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
          Great job! You have completed all {exercises.length} practice exercises in {level} {accent} English.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={handleResetSession}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practise Again</span>
          </button>

          <button
            type="button"
            onClick={onSwitchToTest}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Take 10-Question Test</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: Active Exercise Viewport
  // ==========================================
  return (
    <div className="w-full space-y-6">
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted animate-slide-up">
        {/* Progress & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Exercise {currentIndex + 1} of {exercises.length}
              </span>
              <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {currentExercise.level}
              </span>
              <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                {currentExercise.topic}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {currentExercise.title}
            </h3>
            {currentExercise.context && (
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Context: {currentExercise.context}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleResetSession}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:underline self-start sm:self-auto"
          >
            End Practice
          </button>
        </div>

        {/* Content Display: Sentence / Conversation / Passage */}
        <div className="py-6 border-b border-slate-100 dark:border-slate-800">
          {/* 1. Sentence Type */}
          {currentExercise.type === "sentence" && (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
              <p className="text-lg sm:text-xl text-slate-900 dark:text-white font-medium leading-relaxed">
                "{currentExercise.targetText}"
              </p>
            </div>
          )}

          {/* 2. Conversation Type */}
          {currentExercise.type === "conversation" && currentExercise.turns && (
            <div className="space-y-3">
              {currentExercise.turns.map((turn, i) => (
                <div
                  key={i}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    turn.isUser
                      ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-200/80 dark:border-indigo-800/80"
                      : "bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {turn.speaker} {turn.isUser && "(Your Turn to Speak)"}
                    </span>
                    {!turn.isUser && (
                      <button
                        type="button"
                        onClick={() => handleListenReference(turn.text)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen to {turn.speaker}</span>
                      </button>
                    )}
                  </div>
                  <p className="text-base sm:text-lg text-slate-900 dark:text-white font-medium">
                    "{turn.text}"
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 3. Passage Type */}
          {currentExercise.type === "passage" && (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Passage ({currentExercise.wordCount} words)</span>
              </div>
              <p className="text-base sm:text-lg text-slate-900 dark:text-white font-normal leading-relaxed">
                {currentExercise.targetText}
              </p>
            </div>
          )}
        </div>

        {/* Action Controls: Listen + Speak */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleListenReference()}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm border transition-all ${
                isAudioPlaying
                  ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 animate-pulse"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 shadow-sm"
              }`}
            >
              <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{isAudioPlaying ? "Stop Listening" : "Listen to Reference"}</span>
            </button>

            {/* Quick Gender Toggle during practice */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  stopSpeech();
                  setIsAudioPlaying(false);
                  setGender("Female");
                }}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  gender === "Female"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="Use female voice"
              >
                👩 Female
              </button>
              <button
                type="button"
                onClick={() => {
                  stopSpeech();
                  setIsAudioPlaying(false);
                  setGender("Male");
                }}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  gender === "Male"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="Use male voice"
              >
                👨 Male
              </button>
            </div>
          </div>

          {/* Microphone Voice Recorder */}
          <div className="w-full sm:w-auto">
            <VoiceRecorder
              onRecordingComplete={handleRecordingComplete}
              isProcessing={isAnalysing}
              disabled={isAudioPlaying}
            />
          </div>
        </div>
      </div>

      {/* Result & Detailed Feedback Card */}
      {currentScoreResult && (
        <PracticeFeedback
          result={currentScoreResult}
          previousScore={previousScore}
          onTryAgain={handleTryAgain}
          onNextExercise={handleNextExercise}
          onListenAgain={() => handleListenReference()}
          isLastExercise={currentIndex + 1 >= exercises.length}
        />
      )}
    </div>
  );
}
