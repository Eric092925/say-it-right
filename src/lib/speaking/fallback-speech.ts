import { SpeakingScoreResult, WordFeedbackItem } from "./types";
import { calculateOverallScore } from "./scoring";

/**
 * Clean a string into normalized lowercase word tokens.
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Standard Levenshtein distance between two strings.
 */
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Estimate syllable count for a given English text.
 */
function estimateSyllables(text: string): number {
  const words = tokenize(text);
  let total = 0;

  for (const word of words) {
    if (word.length <= 3) {
      total += 1;
      continue;
    }
    const clean = word.replace(/(?:[^laeiouy]|ed|es|e)$/, "").replace(/^y/, "");
    const matches = clean.match(/[aeiouy]{1,2}/g);
    total += matches ? Math.max(1, matches.length) : 1;
  }

  return Math.max(1, total);
}

/**
 * Fallback deterministic speech evaluation engine.
 * Used when external AI is temporarily unavailable, rate-limited, or offline.
 */
export function evaluateSpeechFallback(
  targetText: string,
  transcribedText: string,
  durationSeconds: number
): SpeakingScoreResult {
  const targetTokens = tokenize(targetText);
  const spokenTokens = tokenize(transcribedText);

  if (spokenTokens.length === 0) {
    return {
      overallScore: 0,
      accuracyScore: 0,
      fluencyScore: 0,
      feedback: "We couldn't detect your speech. Please try again.",
      source: "fallback",
    };
  }

  // 1. Calculate Pronunciation Accuracy
  let matchedCount = 0;
  const wordFeedback: WordFeedbackItem[] = [];

  for (let i = 0; i < targetTokens.length; i++) {
    const targetWord = targetTokens[i];
    // Find closest match in spoken tokens within nearby window
    let bestDist = Infinity;
    const windowStart = Math.max(0, i - 2);
    const windowEnd = Math.min(spokenTokens.length, i + 3);

    for (let j = windowStart; j < windowEnd; j++) {
      const dist = levenshtein(targetWord, spokenTokens[j]);
      if (dist < bestDist) {
        bestDist = dist;
      }
    }

    const maxLen = Math.max(targetWord.length, 1);
    const similarity = 1 - bestDist / maxLen;

    if (similarity >= 0.8) {
      matchedCount += 1;
      wordFeedback.push({ word: targetWord, status: "accurate" });
    } else if (similarity >= 0.45) {
      matchedCount += 0.5;
      wordFeedback.push({ word: targetWord, status: "needs_work" });
    } else {
      wordFeedback.push({ word: targetWord, status: "missing" });
    }
  }

  const baseAccuracy = Math.round((matchedCount / targetTokens.length) * 100);
  const accuracyScore = Math.max(35, Math.min(98, baseAccuracy));

  // 2. Calculate Fluency (Pacing & Cadence)
  const syllables = estimateSyllables(targetText);
  // Ideal speaking rate: 3.2 to 4.8 syllables per second
  const idealMinDuration = syllables / 4.8;
  const idealMaxDuration = syllables / 3.0;

  let fluencyScore = 85;

  if (durationSeconds < idealMinDuration * 0.7) {
    // Too rushed
    fluencyScore = Math.max(55, Math.round(70 - (idealMinDuration - durationSeconds) * 10));
  } else if (durationSeconds > idealMaxDuration * 1.5) {
    // Excessive hesitation or pauses
    const excess = durationSeconds - idealMaxDuration;
    fluencyScore = Math.max(50, Math.round(85 - excess * 6));
  } else {
    // Smooth natural pacing
    fluencyScore = Math.min(95, Math.round(85 + Math.random() * 8));
  }

  // Factor accuracy into fluency cap
  if (accuracyScore < 60) {
    fluencyScore = Math.min(fluencyScore, accuracyScore + 15);
  }

  const overallScore = calculateOverallScore(accuracyScore, fluencyScore);

  // 3. Generate Constructive Feedback
  let feedback = "";
  if (overallScore >= 85) {
    feedback = "Clear, articulate pronunciation with very natural flow and rhythm.";
  } else if (overallScore >= 70) {
    feedback = "Good overall attempt! Your words were mostly clear; focus on speaking with a smoother rhythm.";
  } else {
    feedback = "Keep practicing! Take your time listening to the reference audio and pronounce each syllable distinctly.";
  }

  const accuracyNotes =
    accuracyScore >= 85
      ? "Most words were pronounced accurately and matched the target text closely."
      : "A few words were slightly indistinct or substituted. Review the highlighted words below.";

  const fluencyNotes =
    fluencyScore >= 80
      ? "Good natural cadence with appropriate pacing."
      : "There were noticeable pauses or hesitant breaks in speech delivery.";

  const suggestedImprovement =
    accuracyScore < fluencyScore
      ? "Listen carefully to the reference pronunciation and focus on articulating stressed syllables clearly."
      : "Practise reading the phrase in one continuous breath to build smoother speech continuity.";

  return {
    overallScore,
    accuracyScore,
    fluencyScore,
    feedback,
    detailedFeedback: {
      accuracyNotes,
      fluencyNotes,
      suggestedImprovement,
      wordFeedback,
    },
    transcription: transcribedText,
    source: "fallback",
  };
}
