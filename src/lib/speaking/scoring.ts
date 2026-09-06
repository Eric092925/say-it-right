import { SpeakingScoreResult, SpeakingTestQuestion } from "./types";

/**
 * Configurable weights for Say It Right Speaking scoring model.
 * As defined in Phase 2 Blueprint Section 22:
 * Overall = 60% Pronunciation Accuracy + 40% Fluency
 */
export const SCORING_WEIGHTS = {
  ACCURACY_WEIGHT: 0.6,
  FLUENCY_WEIGHT: 0.4,
} as const;

/**
 * Calculate the overall score from accuracy and fluency using the configured weights.
 */
export function calculateOverallScore(
  accuracyScore: number,
  fluencyScore: number
): number {
  const weighted =
    accuracyScore * SCORING_WEIGHTS.ACCURACY_WEIGHT +
    fluencyScore * SCORING_WEIGHTS.FLUENCY_WEIGHT;
  return Math.max(0, Math.min(100, Math.round(weighted)));
}

/**
 * Standard conservative error messages (Blueprint Section 23).
 * A technical failure must NOT automatically become a score of 0.
 */
export const SPEAKING_ERRORS = {
  NO_SPEECH: "We couldn't detect your speech. Please try again.",
  NOISE: "We couldn't hear your speech clearly. Please try again in a quieter place.",
  ANALYSIS_FAILED: "We couldn't analyse your recording. Please try again.",
  MIC_DENIED:
    "Microphone access is required for speaking practice. Please allow microphone access in your browser settings and try again.",
  MIC_NOT_FOUND: "No microphone was detected on your device.",
  UNSUPPORTED:
    "Audio recording is not supported in this browser. Please try using a modern browser like Chrome, Edge, or Safari.",
} as const;

/**
 * Generate a concise, natural summary for a test result.
 */
export function generateTestSummary(
  accuracy: number,
  fluency: number,
  overall: number
): string {
  if (overall >= 88) {
    if (fluency >= 85) {
      return "Outstanding speech delivery! Your pronunciation was exceptionally clear with smooth, natural rhythm throughout.";
    }
    return "Excellent pronunciation accuracy across all exercises. Practise maintaining a slightly smoother rhythm to elevate fluency even further.";
  }

  if (overall >= 75) {
    if (accuracy > fluency) {
      return "Strong pronunciation overall. Focus on linking words naturally and reducing hesitation between sentences.";
    }
    return "Good conversational flow and cadence! Work on articulating key consonants and vowel lengths for crisper clarity.";
  }

  if (overall >= 60) {
    return "Good effort! Regular practice with sentence rhythm and clear syllable stress will significantly boost both your clarity and confidence.";
  }

  return "A solid foundation to build upon. Take your time listening to the reference pronunciation before speaking, and practise phrases in short, comfortable chunks.";
}

/**
 * Aggregate scores across all completed test questions.
 */
export function aggregateTestScores(questions: SpeakingTestQuestion[]): {
  overallScore: number;
  accuracyScore: number;
  fluencyScore: number;
  summary: string;
} {
  const completed = questions.filter((q) => q.isCompleted && q.scoreResult);

  if (completed.length === 0) {
    return {
      overallScore: 0,
      accuracyScore: 0,
      fluencyScore: 0,
      summary: "No questions were completed.",
    };
  }

  const totalAccuracy = completed.reduce(
    (sum, q) => sum + (q.scoreResult?.accuracyScore || 0),
    0
  );
  const totalFluency = completed.reduce(
    (sum, q) => sum + (q.scoreResult?.fluencyScore || 0),
    0
  );

  const avgAccuracy = Math.round(totalAccuracy / completed.length);
  const avgFluency = Math.round(totalFluency / completed.length);
  const avgOverall = calculateOverallScore(avgAccuracy, avgFluency);
  const summary = generateTestSummary(avgAccuracy, avgFluency, avgOverall);

  return {
    overallScore: avgOverall,
    accuracyScore: avgAccuracy,
    fluencyScore: avgFluency,
    summary,
  };
}
