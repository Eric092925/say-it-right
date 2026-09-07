import { AccentOption, ACCENT_OPTIONS } from "./types";
import { VoiceGender } from "./speaking/types";

export interface SpeechState {
  isPlaying: boolean;
  isSupported: boolean;
  currentText: string | null;
}

export type { VoiceGender };

let activeUtterance: SpeechSynthesisUtterance | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function initVoices(): void {
  if (!isSpeechSupported()) return;

  const updateVoices = () => {
    try {
      const freshVoices = window.speechSynthesis.getVoices() || [];
      if (freshVoices.length > 0) {
        cachedVoices = freshVoices;
      }
    } catch {
      // Ignore voice query errors
    }
  };

  updateVoices();
  if (typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }
}

// Auto-initialize voices if running in browser
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  initVoices();
  try {
    window.speechSynthesis.addEventListener?.("voiceschanged", () => {
      try {
        const freshVoices = window.speechSynthesis.getVoices() || [];
        if (freshVoices.length > 0) {
          cachedVoices = freshVoices;
        }
      } catch {
        // Ignore
      }
    });
  } catch {
    // Ignore environments without addEventListener
  }
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return [];
  try {
    const live = window.speechSynthesis.getVoices();
    if (live && live.length > 0) {
      cachedVoices = live;
      return live;
    }
  } catch {
    // Fall back to cachedVoices
  }
  return cachedVoices;
}

/**
 * Known voice names across Windows, macOS, iOS, Android, and Chromium
 */
const KNOWN_MALE_NAMES = [
  "david", "george", "james", "mark", "daniel", "oliver", "russell",
  "lee", "tom", "guy", "brian", "richard", "ryan", "william", "arthur",
  "gordon", "aaron", "fred", "malcolm", "nathan", "evan", "rishi", "alex",
  "matthew", "justin", "joey", "sean", "michael", "christopher", "jamie"
];

const KNOWN_FEMALE_NAMES = [
  "zira", "susan", "hazel", "catherine", "hayley", "samantha", "victoria",
  "serena", "fiona", "karen", "jenny", "aria", "stephanie", "linda", "heather",
  "natasha", "olivia", "ava", "allison", "kate", "matilda", "moira", "tessa", "sonia",
  "joanna", "kendra", "kimberly", "salli", "amy", "emma", "nicole", "nicky", "zoe"
];

// Android Google TTS patterns:
// Male: en-au-x-aub, en-gb-x-rjs, en-us-x-tpf, en-us-x-iom, en-us-x-gfn, or explicit #male
// Female: en-au-x-afh, en-gb-x-fis, en-us-x-sfg, en-us-x-iol, or explicit #female
const ANDROID_MALE_PATTERN = /en-au-x-aub|en-gb-x-rjs|en-us-x-tpf|en-us-x-iom|en-us-x-gfn|#male/i;
const ANDROID_FEMALE_PATTERN = /en-au-x-afh|en-gb-x-fis|en-us-x-sfg|en-us-x-iol|#female/i;

/**
 * Say It Right is an English practice app: ONLY English voices can ever be used!
 */
export function isEnglishVoice(voice: SpeechSynthesisVoice | null): boolean {
  if (!voice) return false;
  const lang = (voice.lang || "").trim().toLowerCase().replace(/_/g, "-");
  return lang === "en" || lang.startsWith("en-");
}

/**
 * Detect voice gender accurately without false positives (e.g. 'woman' matching 'man', or 'German' matching 'man')
 */
export function detectVoiceGender(voice: SpeechSynthesisVoice): VoiceGender | null {
  const name = (voice.name || "").toLowerCase();

  // 1. Android specific patterns
  if (ANDROID_MALE_PATTERN.test(name)) return "Male";
  if (ANDROID_FEMALE_PATTERN.test(name)) return "Female";

  // 2. Explicit whole-word checks (word boundary ensures 'woman' doesn't match 'man')
  const hasMaleWord = /\b(male|man|boy)\b/i.test(name);
  const hasFemaleWord = /\b(female|woman|girl)\b/i.test(name);

  if (hasFemaleWord && !hasMaleWord) return "Female";
  if (hasMaleWord && !hasFemaleWord) return "Male";

  // 3. Known names (whole words)
  const matchesFemaleName = KNOWN_FEMALE_NAMES.some((n) =>
    new RegExp(`\\b${n}\\b`, "i").test(name)
  );
  const matchesMaleName = KNOWN_MALE_NAMES.some((n) =>
    new RegExp(`\\b${n}\\b`, "i").test(name)
  );

  if (matchesFemaleName && !matchesMaleName) return "Female";
  if (matchesMaleName && !matchesFemaleName) return "Male";

  return null;
}

export function isVoiceGenderMatch(
  voice: SpeechSynthesisVoice,
  gender: VoiceGender
): boolean {
  return detectVoiceGender(voice) === gender;
}

/**
 * Matches an English voice to the requested accent locale
 */
export function matchesAccentLocale(
  voice: SpeechSynthesisVoice,
  accent: AccentOption
): boolean {
  const lang = (voice.lang || "").toLowerCase().replace(/_/g, "-");
  const name = (voice.name || "").toLowerCase();

  if (accent === "Australian") {
    if (lang === "en-au" || lang.startsWith("en-au-")) return true;
    if (/\b(australia|australian)\b/i.test(name)) return true;
    if (/en-au-x-/i.test(name)) return true;
    return false;
  }

  if (accent === "British") {
    if (
      lang === "en-gb" ||
      lang === "en-uk" ||
      lang.startsWith("en-gb-") ||
      lang.startsWith("en-uk-")
    ) {
      return true;
    }
    if (/\b(british|united kingdom|uk|england|great britain)\b/i.test(name)) return true;
    if (/en-gb-x-/i.test(name)) return true;
    return false;
  }

  if (accent === "American") {
    if (lang === "en-us" || lang.startsWith("en-us-")) return true;
    if (/\b(united states|american|us)\b/i.test(name)) return true;
    if (/en-us-x-/i.test(name)) return true;
    return false;
  }

  return false;
}

/**
 * Find the best matching English voice for a requested accent and gender option.
 * Guarantees that:
 * 1. Only English voices are ever selected.
 * 2. If a specific accent lacks a Male voice (e.g. no AU Male voice installed on device),
 *    a real Male English voice from another region (e.g. UK Male or US Male) is preferred
 *    over forcing a female voice.
 */
export function findBestVoiceForAccent(
  accent: AccentOption,
  gender: VoiceGender = "Female"
): { voice: SpeechSynthesisVoice | null; isExplicitGenderMatch: boolean } {
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) return { voice: null, isExplicitGenderMatch: false };

  // STRICT RULE 1: ONLY English voices can ever be considered
  const englishVoices = voices.filter(isEnglishVoice);
  if (englishVoices.length === 0) {
    return { voice: null, isExplicitGenderMatch: false };
  }

  // Voices matching the requested accent locale
  const accentVoices = englishVoices.filter((v) => matchesAccentLocale(v, accent));

  // Priority 1: Exact Accent + Exact Gender match
  const exactMatch = accentVoices.find((v) => detectVoiceGender(v) === gender);
  if (exactMatch) {
    return { voice: exactMatch, isExplicitGenderMatch: true };
  }

  // Priority 2: Any English Voice + Exact Gender match
  // (e.g. if Australian Male voice is not installed on the user's phone,
  // use a real English Male voice like UK or US rather than a female voice)
  const englishGenderMatch = englishVoices.find((v) => detectVoiceGender(v) === gender);
  if (englishGenderMatch) {
    return { voice: englishGenderMatch, isExplicitGenderMatch: true };
  }

  // Priority 3: Exact Accent + Neutral/Unknown gender voice
  const neutralAccentVoice = accentVoices.find((v) => detectVoiceGender(v) === null);
  if (neutralAccentVoice) {
    return { voice: neutralAccentVoice, isExplicitGenderMatch: false };
  }

  // Priority 4: Exact Accent voice (opposite gender, will use pitch calibration)
  if (accentVoices.length > 0) {
    return { voice: accentVoices[0], isExplicitGenderMatch: false };
  }

  // Priority 5: Any English voice with neutral gender
  const neutralEnglish = englishVoices.find((v) => detectVoiceGender(v) === null);
  if (neutralEnglish) {
    return { voice: neutralEnglish, isExplicitGenderMatch: false };
  }

  // Priority 6: Default English voice
  const defaultEnglish = englishVoices.find((v) => v.default) || englishVoices[0];
  return { voice: defaultEnglish, isExplicitGenderMatch: false };
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
      // Strictly guarantee an English locale tag
      utterance.lang = accentConfig ? accentConfig.locale : "en-US";
    }

    utterance.rate = 0.95;

    // Pitch calibration based on gender
    if (gender === "Female") {
      utterance.pitch = isExplicitGenderMatch ? 1.0 : 1.15;
    } else {
      utterance.pitch = isExplicitGenderMatch ? 0.95 : 0.80;
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

