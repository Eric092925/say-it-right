"use client";

import { useState } from "react";
import {
  SpeakingDifficulty,
  SpeakingTestQuestion,
  SpeakingTestResult,
  VoiceGender,
  SPEAKING_LEVELS,
} from "@/lib/speaking/types";
import { AccentOption, ACCENT_OPTIONS } from "@/lib/types";
import { getTestExercises } from "@/lib/speaking/exercises";
import { aggregateTestScores } from "@/lib/speaking/scoring";
import { speakText, stopSpeech } from "@/lib/speech";
import { RecordingResult } from "@/lib/speaking/recorder";
import VoiceRecorder from "./VoiceRecorder";
import TestResult from "./TestResult";
import {
  Award,
  Volume2,
  BookOpen,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Lock,
  X,
} from "lucide-react";

interface SpeakingTestProps {
  onSwitchToPractice: () => void;
}

export default function SpeakingTest({ onSwitchToPractice }: SpeakingTestProps) {
  // Setup State
  const [level, setLevel] = useState<SpeakingDifficulty>("Intermediate");
  const [accent, setAccent] = useState<AccentOption>("Australian");
  const [gender, setGender] = useState<VoiceGender>("Female");
  const [isTestActive, setIsTestActive] = useState(false);

  // Active Test State
  const [questions, setQuestions] = useState<SpeakingTestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Completed Test State
  const [finalResult, setFinalResult] = useState<SpeakingTestResult | null>(null);

  const currentQuestion = questions[currentIndex];

  // Start 10-Question Test
  const handleStartTest = () => {
    const testExercises = getTestExercises(level);
    const initialQuestions: SpeakingTestQuestion[] = testExercises.map((ex, i) => ({
      questionNumber: i + 1,
      exercise: ex,
      listenCount: 0,
      maxListens: 2, // Blueprint Section 15: Maximum 2 times per question
      isCompleted: false,
    }));

    setQuestions(initialQuestions);
    setCurrentIndex(0);
    setFinalResult(null);
    setIsTestActive(true);
  };

  // Handle Listening (Max 2 Times per Question)
  const handleListen = (textToSpeak?: string) => {
    if (!currentQuestion || currentQuestion.listenCount >= currentQuestion.maxListens) return;

    const text = textToSpeak || currentQuestion.exercise.targetText;
    if (!text) return;

    if (isAudioPlaying) {
      stopSpeech();
      setIsAudioPlaying(false);
      return;
    }

    // Increment listen counter
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex] = {
      ...currentQuestion,
      listenCount: currentQuestion.listenCount + 1,
    };
    setQuestions(updatedQuestions);

    speakText(
      text,
      accent,
      () => setIsAudioPlaying(true),
      () => setIsAudioPlaying(false),
      () => setIsAudioPlaying(false),
      gender
    );
  };

  // Handle Single Speaking Attempt (No Retries Allowed in Test Mode)
  const handleRecordingComplete = async (recording: RecordingResult) => {
    if (!currentQuestion) return;
    setIsSubmitting(true);
    stopSpeech();
    setIsAudioPlaying(false);

    try {
      const response = await fetch("/api/speaking/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audioBase64: recording.audioBase64,
          mimeType: recording.mimeType,
          targetText: currentQuestion.exercise.targetText,
          accent,
          level,
          durationSeconds: recording.durationSeconds,
        }),
      });

      const data = await response.json();
      const scoreResult = data.success && data.data ? data.data : undefined;

      const updatedQuestions = [...questions];
      updatedQuestions[currentIndex] = {
        ...currentQuestion,
        isCompleted: true,
        scoreResult,
      };
      setQuestions(updatedQuestions);

      // Advance to next question or complete test
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Test complete: aggregate all 10 questions
        const aggregated = aggregateTestScores(updatedQuestions);
        setFinalResult({
          overallScore: aggregated.overallScore,
          accuracyScore: aggregated.accuracyScore,
          fluencyScore: aggregated.fluencyScore,
          summary: aggregated.summary,
          level,
          accent,
          gender,
          questions: updatedQuestions,
          completedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error("Test submission error:", err);
      // Even on technical error, advance so test is not stuck
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetakeTest = () => {
    stopSpeech();
    handleStartTest();
  };

  const handleResetToSetup = () => {
    stopSpeech();
    setIsTestActive(false);
    setQuestions([]);
    setCurrentIndex(0);
    setFinalResult(null);
  };

  // ==========================================
  // VIEW 1: Final Scorecard Result
  // ==========================================
  if (finalResult) {
    return (
      <TestResult
        result={finalResult}
        onPracticeAgain={onSwitchToPractice}
        onRetakeTest={handleRetakeTest}
      />
    );
  }

  // ==========================================
  // VIEW 2: Test Setup Screen (Blueprint Section 16)
  // ==========================================
  if (!isTestActive) {
    return (
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-lifted animate-slide-up">
        {/* Header */}
        <div className="pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Structured Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            10-Question Speaking Assessment
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Evaluate your pronunciation accuracy and speaking fluency under structured testing conditions.
          </p>
        </div>

        {/* Configuration Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {SPEAKING_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`py-2.5 px-1.5 rounded-xl text-xs font-semibold border transition-all ${
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Reference Accent
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {ACCENT_OPTIONS.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => setAccent(acc.id)}
                  className={`py-2.5 px-1 rounded-xl text-xs font-semibold border transition-all truncate ${
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
        </div>

        {/* Test Rules Banner (Blueprint Section 15) */}
        <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 mb-8 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <div className="font-bold text-slate-900 dark:text-white mb-1">
            Test Conditions & Rules:
          </div>
          <div className="flex items-start gap-2 text-xs sm:text-sm">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">•</span>
            <span><strong>Listening:</strong> Maximum 2 listens per question. After 2 listens, audio is locked.</span>
          </div>
          <div className="flex items-start gap-2 text-xs sm:text-sm">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">•</span>
            <span><strong>Speaking:</strong> Exactly 1 speaking attempt per question. No retries.</span>
          </div>
          <div className="flex items-start gap-2 text-xs sm:text-sm">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">•</span>
            <span><strong>Exercises:</strong> A diverse mixture of Sentences, Conversations, and Passages.</span>
          </div>
          <div className="flex items-start gap-2 text-xs sm:text-sm">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">•</span>
            <span><strong>Results:</strong> Immediate feedback is hidden between questions; full report displayed at the end.</span>
          </div>
        </div>

        {/* Start Test CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onSwitchToPractice}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:underline"
          >
            ← Switch to Practice Mode
          </button>

          <button
            type="button"
            onClick={handleStartTest}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all active:scale-95"
          >
            <span>Start Test</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: Active Test Question Runner
  // ==========================================
  const listensRemaining = currentQuestion.maxListens - currentQuestion.listenCount;
  const isListeningLocked = listensRemaining <= 0;

  return (
    <div className="w-full space-y-6">
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted animate-slide-up">
        {/* Progress Bar & Header */}
        <div className="pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <button
              type="button"
              onClick={handleResetToSetup}
              aria-label="Quit test and return to setup"
              className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/50 text-slate-700 hover:text-rose-600 dark:text-slate-200 dark:hover:text-rose-400 border border-slate-200 hover:border-rose-300 dark:border-slate-700 dark:hover:border-rose-800/80 shadow-sm transition-all active:scale-95 group"
            >
              <X className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 transition-colors" />
              <span>Quit Test</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {currentQuestion.exercise.level}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
              {currentQuestion.exercise.topic}
            </span>
            <span className="text-xs text-slate-400 ml-auto capitalize">
              {currentQuestion.exercise.type}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {currentQuestion.exercise.title}
          </h3>
        </div>

        {/* Question Exercise Content */}
        <div className="py-6 border-b border-slate-100 dark:border-slate-800">
          {currentQuestion.exercise.type === "sentence" && (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
              <p className="text-lg sm:text-xl text-slate-900 dark:text-white font-medium leading-relaxed">
                "{currentQuestion.exercise.targetText}"
              </p>
            </div>
          )}

          {currentQuestion.exercise.type === "conversation" && currentQuestion.exercise.turns && (
            <div className="space-y-3">
              {currentQuestion.exercise.turns.map((turn, i) => (
                <div
                  key={i}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    turn.isUser
                      ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-200/80 dark:border-indigo-800/80"
                      : "bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5">
                    {turn.speaker} {turn.isUser && "(Your Turn to Speak)"}
                  </div>
                  <p className="text-base sm:text-lg text-slate-900 dark:text-white font-medium">
                    "{turn.text}"
                  </p>
                </div>
              ))}
            </div>
          )}

          {currentQuestion.exercise.type === "passage" && (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Passage ({currentQuestion.exercise.wordCount} words)</span>
              </div>
              <p className="text-base sm:text-lg text-slate-900 dark:text-white font-normal leading-relaxed">
                {currentQuestion.exercise.targetText}
              </p>
            </div>
          )}
        </div>

        {/* Action Controls: Strictly max 2 listens, 1 recording attempt */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Strict Listen Button (Blueprint Section 15) */}
            <button
              type="button"
              onClick={() => handleListen()}
              disabled={isListeningLocked || isAudioPlaying}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border transition-all ${
                isListeningLocked
                  ? "bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 border-dashed border-slate-200 dark:border-slate-800 cursor-not-allowed"
                  : isAudioPlaying
                  ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 animate-pulse"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 shadow-sm"
              }`}
            >
              {isListeningLocked ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Listen limit reached (2/2)</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    {isAudioPlaying
                      ? "Stop Listening"
                      : `Listen (${currentQuestion.listenCount + 1}/2)`}
                  </span>
                </>
              )}
            </button>

            {/* Quick Gender Toggle during test */}
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
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
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
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                👨 Male
              </button>
            </div>
          </div>

          {/* Voice Recorder */}
          <div className="w-full sm:w-auto">
            <VoiceRecorder
              onRecordingComplete={handleRecordingComplete}
              isProcessing={isSubmitting}
              disabled={isAudioPlaying}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
