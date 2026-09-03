export type AccentOption =
  | "Australian"
  | "British"
  | "American";

export interface AccentInfo {
  id: AccentOption;
  label: string;
  flag: string;
  locale: string;
  subtags: string[];
}

export const ACCENT_OPTIONS: AccentInfo[] = [
  { id: "Australian", label: "Australian", flag: "🇦🇺", locale: "en-AU", subtags: ["en-AU", "AU", "Australian"] },
  { id: "British", label: "British", flag: "🇬🇧", locale: "en-GB", subtags: ["en-GB", "GB", "British", "UK", "en-UK"] },
  { id: "American", label: "American", flag: "🇺🇸", locale: "en-US", subtags: ["en-US", "US", "American", "en"] },
];

export type ToneOption =
  | "Professional"
  | "Friendly"
  | "Polite"
  | "Confident"
  | "Casual";

export interface ToneInfo {
  id: ToneOption;
  label: string;
  emoji: string;
  description: string;
}

export const TONE_OPTIONS: ToneInfo[] = [
  { id: "Professional", label: "Professional", emoji: "👔", description: "Polished, clear, and business-ready" },
  { id: "Friendly", label: "Friendly", emoji: "😊", description: "Warm, engaging, and approachable" },
  { id: "Polite", label: "Polite", emoji: "🤝", description: "Courteous, considerate, and respectful" },
  { id: "Confident", label: "Confident", emoji: "🦁", description: "Direct, assertive, and decisive" },
  { id: "Casual", label: "Casual", emoji: "☕", description: "Relaxed, natural, and conversational" },
];

export type AppMode = "word" | "message";

export interface WordRequest {
  mode: "word";
  input: string;
  accent: AccentOption;
}

export interface WordResult {
  type: "word";
  word: string;
  meaning: string;
  pronunciation: string;
  ipa: string;
  accent: AccentOption;
}

export interface MessageRequest {
  mode: "message";
  input: string;
  tone: ToneOption;
}

export interface MessageResult {
  type: "message";
  versions: string[];
}

export type ApiSuccessResponse =
  | { success: true; data: WordResult }
  | { success: true; data: MessageResult };

export type ApiErrorResponse = {
  success: false;
  error: string;
  details?: string;
};

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;
