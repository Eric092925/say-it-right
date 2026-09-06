import { NextRequest, NextResponse } from "next/server";
import { getAIConfig } from "@/lib/ai";
import { calculateOverallScore, SPEAKING_ERRORS } from "@/lib/speaking/scoring";
import { evaluateSpeechFallback } from "@/lib/speaking/fallback-speech";
import { SpeakingScoreResult } from "@/lib/speaking/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const {
      audioBase64,
      mimeType,
      targetText,
      accent = "Australian",
      level = "Intermediate",
      durationSeconds = 3,
      transcribedText = "",
    } = body;

    if (!targetText || typeof targetText !== "string" || !targetText.trim()) {
      return NextResponse.json(
        { success: false, error: "Target text is required for speech evaluation." },
        { status: 400 }
      );
    }

    const cleanTargetText = targetText.trim();
    const config = getAIConfig();
    const apiKey = config.apiKey?.trim();

    // 1. Attempt AI Speech Analysis via Multimodal Gemini if audio is present
    if (apiKey && audioBase64 && typeof audioBase64 === "string" && audioBase64.length > 50) {
      // Clean mimeType to standard Google Gemini supported audio mime types
      let cleanMime = (mimeType || "audio/webm").toLowerCase().split(";")[0].trim();
      if (!cleanMime || cleanMime === "audio/mp4" || cleanMime === "audio/m4a") {
        cleanMime = "audio/mp4";
      } else if (cleanMime.includes("webm")) {
        cleanMime = "audio/webm";
      } else if (cleanMime.includes("wav")) {
        cleanMime = "audio/wav";
      } else if (cleanMime.includes("aac")) {
        cleanMime = "audio/aac";
      } else {
        cleanMime = "audio/webm";
      }

      const prompt = `You are a master linguistic pronunciation coach and speech assessment specialist for "Say It Right".
Target Reference Text: "${cleanTargetText}"
Target Regional Accent: "${accent}" English
Difficulty Level: "${level}"

Listen carefully to the user's recorded audio and evaluate their spoken delivery against the target reference text.

Provide a structured JSON response matching this schema exactly (no markdown formatting, no code fences, no preamble):
{
  "accuracyScore": <number 0-100 measuring phonetic accuracy, word clarity, and correct word reproduction against target text>,
  "fluencyScore": <number 0-100 measuring smoothness, rhythm, absence of unnatural hesitation, and appropriate speech rate>,
  "feedback": "<1-2 sentence concise user-facing feedback summary>",
  "transcription": "<transcription of what the user actually said>",
  "detailedFeedback": {
    "accuracyNotes": "<1 concise sentence regarding word and sound pronunciation>",
    "fluencyNotes": "<1 concise sentence regarding speech tempo, flow, and pauses>",
    "suggestedImprovement": "<1 actionable tip to improve>",
    "wordFeedback": [
      { "word": "example_word", "status": "accurate" }
    ]
  }
}

Evaluation Guidelines:
- If the user spoke clearly and matched the text, assign accuracy 85-98.
- If words were mispronounced, slurred, or omitted, reflect that in accuracyScore and set their status to "needs_work" or "missing" in wordFeedback.
- If speech was halting or had long pauses, reflect that in fluencyScore.
- If no speech or only background noise is detected, set accuracyScore: 0, fluencyScore: 0, feedback: "NO_SPEECH".
- Be constructive, encouraging, and accurate.`;

      const modelsToTry = [
        "gemini-flash-latest",
        "gemini-flash-lite-latest",
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
      ];

      for (let i = 0; i < modelsToTry.length; i++) {
        const model = modelsToTry[i];
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      inlineData: {
                        mimeType: cleanMime,
                        data: audioBase64,
                      },
                    },
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
              },
            }),
          });

          clearTimeout(timeoutId);

          if (res.ok) {
            const json = await res.json();
            const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (rawText) {
              const cleanedJsonText = rawText
                .replace(/^```(?:json)?\s*/i, "")
                .replace(/\s*```$/i, "")
                .trim();

              const parsed = JSON.parse(cleanedJsonText);

              // Check for silence / no speech detected
              if (
                parsed.feedback === "NO_SPEECH" ||
                (parsed.accuracyScore === 0 && parsed.fluencyScore === 0)
              ) {
                return NextResponse.json({
                  success: false,
                  error: SPEAKING_ERRORS.NO_SPEECH,
                });
              }

              const accuracyScore = Math.max(
                20,
                Math.min(100, Math.round(Number(parsed.accuracyScore) || 75))
              );
              const fluencyScore = Math.max(
                20,
                Math.min(100, Math.round(Number(parsed.fluencyScore) || 75))
              );
              const overallScore = calculateOverallScore(accuracyScore, fluencyScore);

              const result: SpeakingScoreResult = {
                overallScore,
                accuracyScore,
                fluencyScore,
                feedback:
                  parsed.feedback ||
                  "Good effort! Your pronunciation was clear and understandable.",
                detailedFeedback: parsed.detailedFeedback,
                transcription: parsed.transcription,
                source: "ai",
              };

              return NextResponse.json({
                success: true,
                data: result,
              });
            }
          }

          if (res.status === 429) {
            console.warn(`[Speaking API] Model ${model} hit rate limit. Trying next model...`);
            if (i < modelsToTry.length - 1) {
              await new Promise((r) => setTimeout(r, 600));
              continue;
            }
          }
        } catch (err: any) {
          clearTimeout(timeoutId);
          console.warn(`[Speaking API] Model ${model} attempt error:`, err?.message || err);
        }
      }
    }

    // 2. Deterministic Fallback Engine
    // Activates if Gemini is offline, rate-limited, or if client provided transcription
    const fallbackText =
      transcribedText && transcribedText.trim()
        ? transcribedText.trim()
        : cleanTargetText;

    const fallbackResult = evaluateSpeechFallback(
      cleanTargetText,
      fallbackText,
      durationSeconds
    );

    return NextResponse.json({
      success: true,
      data: fallbackResult,
    });
  } catch (error) {
    console.error("[/api/speaking/analyse error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: SPEAKING_ERRORS.ANALYSIS_FAILED,
      },
      { status: 500 }
    );
  }
}
