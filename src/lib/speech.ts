import { AccentOption, ACCENT_OPTIONS } from "./types";

export interface SpeechState {
  isPlaying: boolean;
  isSupported: boolean;
  currentText: string | null;
}

let activeUtterance: SpeechSynthesisUtterance | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function initVoices(): void {
  if (!isSpeechSupported()) return;

  const updateVoices = () => {
    try {
      cachedVoices = window.speechSynthesis.getVoices() || [];
    } catch {
      cachedVoices = [];
    }
  };

  updateVoices();
  if (typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return [];
  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  }
  return cachedVoices;
}

/**
 * Find the best matching voice for a requested accent option
 */
export function findBestVoiceForAccent(accent: AccentOption): SpeechSynthesisVoice | null {
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) return null;

  const accentConfig = ACCENT_OPTIONS.find((a) => a.id === accent) || ACCENT_OPTIONS[0];

  // 1. Exact locale match (e.g. "en-AU", "en-GB", "en-US", "en-CA", "en-NZ")
  let match = voices.find(
    (v) => v.lang.replace(/_/g, "-").toLowerCase() === accentConfig.locale.toLowerCase()
  );
  if (match) return match;

  // 2. Subtag / region match in voice name or lang
  match = voices.find((v) => {
    const langLower = v.lang.toLowerCase();
    const nameLower = v.name.toLowerCase();
    return accentConfig.subtags.some(
      (sub) =>
        langLower.includes(sub.toLowerCase()) ||
        nameLower.includes(sub.toLowerCase())
    );
  });
  if (match) return match;

  // 3. Any English voice
  match = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
  if (match) return match;

  // 4. Default voice
  return voices.find((v) => v.default) || voices[0] || null;
}

/**
 * Speak the specified text in the requested accent
 */
export function speakText(
  text: string,
  accent: AccentOption = "Australian",
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (errorMessage: string) => void
): () => void {
  if (!isSpeechSupported()) {
    onError?.("Speech synthesis is not supported in this browser.");
    return () => {};
  }

  const cleanText = text.trim();
  if (!cleanText) {
    onEnd?.();
    return () => {};
  }

  try {
    // Chrome bugfix: resume if stuck in paused state
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    // Cancel ongoing speech if already speaking
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    activeUtterance = utterance;

    // Resolve voice
    const voice = findBestVoiceForAccent(accent);
    const accentConfig = ACCENT_OPTIONS.find((a) => a.id === accent);

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = accentConfig ? accentConfig.locale : "en-AU";
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    let hasStarted = false;

    utterance.onstart = () => {
      hasStarted = true;
      onStart?.();
    };

    utterance.onend = () => {
      if (activeUtterance === utterance) {
        activeUtterance = null;
      }
      onEnd?.();
    };

    utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
      if (activeUtterance === utterance) {
        activeUtterance = null;
      }

      const errorType = event.error;

      // "canceled" or "interrupted" happens when user clicks stop or starts new audio; not a true error
      if (
        !errorType ||
        errorType === "canceled" ||
        errorType === "interrupted"
      ) {
        onEnd?.();
        return;
      }

      console.warn("[Say It Right Speech] Synthesis warning:", errorType);
      onError?.(errorType);
    };

    // Small delay ensures Chromium speech queue clears cleanly after cancel()
    setTimeout(() => {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("[Say It Right Speech] speak() invocation error:", err);
        onError?.(String(err));
      }
    }, 10);

    return () => {
      if (activeUtterance === utterance) {
        stopSpeech();
      }
    };
  } catch (err) {
    console.warn("[Say It Right Speech] Unexpected error:", err);
    onError?.(String(err));
    return () => {};
  }
}

export function stopSpeech(): void {
  if (isSpeechSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
    activeUtterance = null;
  }
}
