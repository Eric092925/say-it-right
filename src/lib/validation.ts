import { WordResult, MessageResult, AccentOption, ToneOption } from "./types";

export function validateWordResult(data: unknown): WordResult | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const obj = data as Record<string, unknown>;

  // Check required fields
  const word = typeof obj.word === "string" ? obj.word.trim() : "";
  const meaning = typeof obj.meaning === "string" ? obj.meaning.trim() : "";
  const pronunciation = typeof obj.pronunciation === "string" ? obj.pronunciation.trim() : "";
  const ipa = typeof obj.ipa === "string" ? obj.ipa.trim() : "";
  const accent = typeof obj.accent === "string" ? (obj.accent.trim() as AccentOption) : "Australian";

  if (!word || !meaning || !pronunciation || !ipa) {
    return null;
  }

  return {
    type: "word",
    word,
    meaning,
    pronunciation,
    ipa,
    accent,
  };
}

export function validateMessageResult(data: unknown): MessageResult | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const obj = data as Record<string, unknown>;

  let versions: string[] = [];

  if (Array.isArray(obj.versions)) {
    versions = obj.versions
      .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
      .map((v) => v.trim());
  } else if (typeof obj.version === "string" && obj.version.trim()) {
    versions = [obj.version.trim()];
  } else if (typeof obj.improved === "string" && obj.improved.trim()) {
    versions = [obj.improved.trim()];
  } else if (typeof obj.message === "string" && obj.message.trim()) {
    versions = [obj.message.trim()];
  }

  if (versions.length === 0) {
    return null;
  }

  return {
    type: "message",
    versions: versions.slice(0, 3), // Max 3 versions
  };
}

export function cleanJsonString(str: string): string {
  let cleaned = str.trim();

  // Strip markdown code fences if present (```json ... ``` or ``` ...)
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }

  return cleaned.trim();
}

export function parseAndValidateAIResponse(rawResponseText: string, mode: "word" | "message"): WordResult | MessageResult | null {
  const cleaned = cleanJsonString(rawResponseText);

  try {
    const parsed = JSON.parse(cleaned);

    if (mode === "word") {
      return validateWordResult(parsed);
    } else {
      return validateMessageResult(parsed);
    }
  } catch (err) {
    // If strict JSON parsing fails, attempt regex extraction
    if (mode === "word") {
      try {
        const wordMatch = rawResponseText.match(/"word"\s*:\s*"([^"]+)"/i);
        const meaningMatch = rawResponseText.match(/"meaning"\s*:\s*"([^"]+)"/i);
        const pronMatch = rawResponseText.match(/"pronunciation"\s*:\s*"([^"]+)"/i);
        const ipaMatch = rawResponseText.match(/"ipa"\s*:\s*"([^"]+)"/i);
        const accentMatch = rawResponseText.match(/"accent"\s*:\s*"([^"]+)"/i);

        if (wordMatch && meaningMatch && pronMatch && ipaMatch) {
          return {
            type: "word",
            word: wordMatch[1],
            meaning: meaningMatch[1],
            pronunciation: pronMatch[1],
            ipa: ipaMatch[1],
            accent: (accentMatch ? accentMatch[1] : "Australian") as AccentOption,
          };
        }
      } catch {
        return null;
      }
    } else {
      try {
        const matches = Array.from(rawResponseText.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)).map(m => m[1]);
        if (matches.length > 0) {
          const plausible = matches.filter(m => m.length > 5 && !["message", "versions", "type", "tone"].includes(m.toLowerCase()));
          if (plausible.length > 0) {
            return {
              type: "message",
              versions: plausible.slice(0, 3),
            };
          }
        }
      } catch {
        return null;
      }
    }
    return null;
  }
}

export function looksLikeSingleTerm(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;
  // If <= 3 words and no sentence termination punctuation, treat as single term/name/place
  const words = trimmed.split(/\s+/);
  const hasSentencePunctuation = /[.?!;:\n]/.test(trimmed);
  return words.length <= 3 && !hasSentencePunctuation && trimmed.length < 50;
}
