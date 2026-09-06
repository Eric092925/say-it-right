"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, Loader2, AlertCircle } from "lucide-react";
import { AudioRecorder, RecordingResult } from "@/lib/speaking/recorder";
import { SPEAKING_ERRORS } from "@/lib/speaking/scoring";

interface VoiceRecorderProps {
  onRecordingComplete: (result: RecordingResult) => void;
  isProcessing?: boolean;
  disabled?: boolean;
  maxSeconds?: number;
}

export default function VoiceRecorder({
  onRecordingComplete,
  isProcessing = false,
  disabled = false,
  maxSeconds = 45,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [recorderError, setRecorderError] = useState<string | null>(null);

  const recorderRef = useRef<AudioRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (recorderRef.current) {
        recorderRef.current.cleanup();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleStartRecording = async () => {
    if (disabled || isProcessing || isRecording) return;
    setRecorderError(null);
    setSecondsElapsed(0);
    setVolumeLevel(0);

    const recorder = new AudioRecorder();
    recorderRef.current = recorder;

    try {
      await recorder.start((level) => {
        setVolumeLevel(level);
      });

      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setSecondsElapsed((prev) => {
          const next = prev + 1;
          if (next >= maxSeconds) {
            handleStopRecording();
          }
          return next;
        });
      }, 1000);
    } catch (err: any) {
      setIsRecording(false);
      setRecorderError(err?.message || SPEAKING_ERRORS.MIC_DENIED);
    }
  };

  const handleStopRecording = async () => {
    if (!recorderRef.current || !isRecording) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsRecording(false);
    setVolumeLevel(0);

    try {
      const result = await recorderRef.current.stop();

      if (!result.hasSpeech) {
        setRecorderError(SPEAKING_ERRORS.NO_SPEECH);
        return;
      }

      onRecordingComplete(result);
    } catch (err: any) {
      setRecorderError(err?.message || SPEAKING_ERRORS.ANALYSIS_FAILED);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-2">
      {/* Error alert if mic denied or no speech */}
      {recorderError && (
        <div className="w-full mb-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 flex items-center gap-3 text-sm animate-fade-in shadow-sm">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
          <span className="flex-1">{recorderError}</span>
          <button
            type="button"
            onClick={() => setRecorderError(null)}
            className="text-xs font-semibold text-rose-800 dark:text-rose-200 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        {!isRecording ? (
          <button
            type="button"
            onClick={handleStartRecording}
            disabled={disabled || isProcessing}
            className={`relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-base transition-all shadow-md active:scale-95 ${
              disabled || isProcessing
                ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-300 dark:border-slate-700"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20 hover:shadow-indigo-500/35 border border-indigo-500 hover:scale-[1.02]"
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analysing Speech...</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 text-indigo-100" />
                <span>Start Speaking</span>
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 p-2.5 pl-5 rounded-2xl shadow-md animate-fade-in">
            {/* Pulsing Recording Indicator */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600"></span>
              </span>
              <span className="text-sm font-bold text-rose-700 dark:text-rose-300 tracking-wide">
                Recording...
              </span>
              <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                {formatTimer(secondsElapsed)} / {formatTimer(maxSeconds)}
              </span>
            </div>

            {/* Audio volume visualizer bar */}
            <div className="hidden sm:flex items-center gap-0.5 h-6 w-16 px-1">
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((threshold, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-75 ${
                    volumeLevel >= threshold
                      ? "bg-rose-500 h-full"
                      : "bg-rose-200 dark:bg-rose-900/40 h-2"
                  }`}
                />
              ))}
            </div>

            {/* Manual Stop Button */}
            <button
              type="button"
              onClick={handleStopRecording}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-sm transition-all active:scale-95"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
