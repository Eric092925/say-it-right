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

export type VoiceGender = "Female" | "Male";

const FEMALE_VOICE_HINTS = [
  "female",
  "woman",
  "girl",
  "zira",
  "susan",
  "hazel",
  "catherine",
  "hayley",
  "samantha",
  "victoria",
  "serena",
  "fiona",
  "karen",
  "jenny",
  "aria",
  "stephanie",
  "linda",
  "heather",
  "natasha",
  "olivia",
];

const MALE_VOICE_HINTS = [
  "male",
  "man",
  "boy",
  "david",
  "george",
  "james",
  "mark",
  "daniel",
  "oliver",
  "russell",
  "lee",
  "alex",
  "tom",
  "guy",
  "brian",
  "richard",
  "ryan",
];

export function isVoiceGenderMatch(
  voice: SpeechSynthesisVoice,
  gender: VoiceGender
): boolean {
  const name = voice.name.toLowerCase();
  const targetHints = gender === "Female" ? FEMALE_VOICE_HINTS : MALE_VOICE_HINTS;
  const oppositeHints = gender === "Female" ? MALE_VOICE_HINTS : FEMALE_VOICE_HINTS;

  if (oppositeHints.some((h) => name.includes(h))) {
    return false;
  }

  return targetHints.some((h) => name.includes(h));
}

/**
 * Find the best matching voice for a requested accent and gender option
 */
export function findBestVoiceForAccent(
  accent: AccentOption,
  gender: VoiceGender = "Female"
): { voice: SpeechSynthesisVoice | null; isExplicitGenderMatch: boolean } {
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) return { voice: null, isExplicitGenderMatch: false };

  const accentConfig = ACCENT_OPTIONS.find((a) => a.id === accent) || ACCENT_OPTIONS[0];

  // Candidate voices matching exact locale or subtags
  const localeMatches = voices.filter(
    (v) => v.lang.replace(/_/g, "-").toLowerCase() === accentConfig.locale.toLowerCase()
  );

  const subtagMatches = voices.filter((v) => {
    const langLower = v.lang.toLowerCase();
    const nameLower = v.name.toLowerCase();
    return accentConfig.subtags.some(
      (sub) =>
        langLower.includes(sub.toLowerCase()) ||
        nameLower.includes(sub.toLowerCase())
    );
  });

  const candidateVoices = [...new Set([...localeMatches, ...subtagMatches])];

  // 1. Explicit gender match in accent-matched voices
  const genderMatchedInAccent = candidateVoices.find((v) => isVoiceGenderMatch(v, gender));
  if (genderMatchedInAccent) {
    return { voice: genderMatchedInAccent, isExplicitGenderMatch: true };
  }

  // 2. Candidate voice that does not explicitly match the opposite gender
  const neutralAccentVoice = candidateVoices.find(
    (v) => !isVoiceGenderMatch(v, gender === "Female" ? "Male" : "Female")
  );
  if (neutralAccentVoice) {
    return { voice: neutralAccentVoice, isExplicitGenderMatch: false };
  }

  if (candidateVoices.length > 0) {
    return { voice: candidateVoices[0], isExplicitGenderMatch: false };
  }

  // 3. Any English voice matching gender
  const englishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  const genderMatchedEnglish = englishVoices.find((v) => isVoiceGenderMatch(v, gender));
  if (genderMatchedEnglish) {
    return { voice: genderMatchedEnglish, isExplicitGenderMatch: true };
  }

  // 4. Default voice
  const fallback = voices.find((v) => v.default) || voices[0] || null;
  return { voice: fallback, isExplicitGenderMatch: false };
}

/**
 * Speak the specified text in the requested accent and voice gender
 */
export function speakText(
  text: string,
  accent: AccentOption = "Australian",
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (errorMessage: string) => void,
  gender: VoiceGender = "Female"
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

    // Resolve voice and gender tuning
    const { voice, isExplicitGenderMatch } = findBestVoiceForAccent(accent, gender);
    const accentConfig = ACCENT_OPTIONS.find((a) => a.id === accent);

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = accentConfig ? accentConfig.locale : "en-AU";
    }

    utterance.rate = 0.95;

    // Pitch calibration based on gender
    if (gender === "Female") {
      utterance.pitch = isExplicitGenderMatch ? 1.02 : 1.15;
    } else {
      utterance.pitch = isExplicitGenderMatch ? 0.96 : 0.85;
    }

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
