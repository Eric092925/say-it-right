import { AccentOption } from "../types";

export type SpeakingDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type VoiceGender = "Female" | "Male";

export const VOICE_GENDERS: VoiceGender[] = ["Female", "Male"];

export const SPEAKING_LEVELS: SpeakingDifficulty[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

export type SpeakingTopic =
  | "All Topics"
  | "Daily Life"
  | "Travel"
  | "Food"
  | "Shopping"
  | "Work"
  | "Business"
  | "Social Conversation"
  | "Interview";

export const SPEAKING_TOPICS: SpeakingTopic[] = [
  "All Topics",
  "Daily Life",
  "Travel",
  "Food",
  "Shopping",
  "Work",
  "Business",
  "Social Conversation",
  "Interview",
];

export type ExerciseType = "sentence" | "conversation" | "passage";

export interface ConversationTurn {
  speaker: string; // e.g. "Staff", "User"
  text: string;
  isUser: boolean; // true if this is the line assigned to the user to speak
}

export interface SpeakingExercise {
  id: string;
  type: ExerciseType;
  level: SpeakingDifficulty;
  topic: SpeakingTopic;
  title: string;
  targetText: string; // The exact text the user is asked to speak
  context?: string; // Optional situational context
  turns?: ConversationTurn[]; // For conversation exercises
  fullPassage?: string; // For passage exercises
  wordCount: number;
}

export interface WordFeedbackItem {
  word: string;
  status: "accurate" | "needs_work" | "missing";
}

export interface DetailedFeedback {
  accuracyNotes: string;
  fluencyNotes: string;
  suggestedImprovement: string;
  wordFeedback?: WordFeedbackItem[];
}

export interface SpeakingScoreResult {
  overallScore: number; // Configurable: 60% accuracy + 40% fluency
  accuracyScore: number; // 0 - 100
  fluencyScore: number; // 0 - 100
  feedback: string; // Concise user-facing feedback summary
  detailedFeedback?: DetailedFeedback;
  transcription?: string; // Detected user speech
  source: "ai" | "fallback";
}

export interface SpeakingTestQuestion {
  questionNumber: number;
  exercise: SpeakingExercise;
  listenCount: number;
  maxListens: number;
  isCompleted: boolean;
  scoreResult?: SpeakingScoreResult;
}

export interface SpeakingTestResult {
  overallScore: number;
  accuracyScore: number;
  fluencyScore: number;
  summary: string;
  level: SpeakingDifficulty;
  accent: AccentOption;
  gender?: VoiceGender;
  questions: SpeakingTestQuestion[];
  completedAt: string;
}
